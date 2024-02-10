---
sidebar_position: 2
---

# Algebraic Effects

*Note that this feature is still in an experimental stage.*

Miking's standard library includes support for working with effectful computations.

The relevant file is `stdlib/effect.mc`, inspired by algebraic effects / free(er) monads.  To learn more, see e.g., [^1],[^2],[^3].

## Overview

The main part of the library is the `Effect` fragment, which defines a type `Eff a` representing generic effectful computations.  Users may extend `Eff` with their own effectful operations along with handlers for those operations.

Effects interact well with language fragment composition.  To use a given effect, simply include the corresponding fragment and start using the effectful operations.  A `sem` clause in one language fragment may use a given effect (e.g., a read-only context) without interfering with the definitions of other clauses (e.g., without having to add an extra parameter even in clauses where the context is unused).  The only requirement is that the `sem` returns an `Eff`-type.

In addition to `stdlib/effect.mc`, there is also `stdlib/mexpr/ast-effect.mc`, which contains variations of an `smapEff`-function which can be used to map effectful operations over MExpr AST nodes.

## A small example

For example, consider the following fragment:
```mc
lang TestLang = Reader + NonDet
  sem getInt : Ctx -> Int

  sem effProg : () -> Eff Int
  sem effProg = | () ->
    bind (choose [0,1]) (lam i.
    bind (choose [2,3]) (lam j.
    bind (ask getInt) (lam k.
    return (addi (addi i j) k))))

end
```

The fragment `TestLang` imports two effects: read-only context (`Reader`) and non-determinism (`NonDet`).  `effProg` defines an effectful program which uses both effects.  The program first chooses two numbers `i \in [0,1]` and `j \in [2,3]`, then reads a number `k` from the context, and then returns the sum of the three.  Note that the context type is kept abstract, we only declare a sem `getInt : Ctx -> Int` for extracting an integer from it.

To run the program, we provide a concrete implementation of `getInt` and a value for the context:

```mc
lang TestLangImpl = TestLang
  syn Ctx = | ICtx Int
  sem getInt = | ICtx i -> i
end

mexpr

use TestLangImpl in

utest runEff (handleND (handleReader (ICtx 7) (effProg ()))) 
with [9,10,10,11] in ()
```

Here, the `Reader` effect is first handled using `handleReader` with a context `ICtx 7`, and then the nondeterminism effect is resolved using `handleND`.  When all effects are handled, `runEff` can be used to extract the final value, in this case `[9,10,10,11]`.

## A larger example

Now, we show a larger example demonstrating an interpreter for the lambda calculus plus integers and addition written modularly using MLang's language fragments.
The interpreter is structured into two fragments: the `Arith` fragment which defines the semantics for integers and addition, and the `Lam` fragment which defines the semantics for variables, functions and applications.
Note how `Arith` does not deal with variables at all, and yet it can be seamlessly composed with `Lam`, which (implicitly) needs to pass around a variable context using the `Reader` effect.

```mc
include "common.mc"
include "effect.mc"
include "map.mc"

lang Eval
  syn Expr =
  syn Value =

  sem eval : Expr -> Eff Value
end

lang Arith = Eval + Failure
  syn Expr =
  | Lit Int
  | Add (Expr, Expr)

  syn Value =
  | VInt Int

  syn Failure =
  | InvalidAddition ()

  sem evalAdd : (Value, Value) -> Eff Value
  sem evalAdd =
  | (VInt i, VInt j) -> return (VInt (addi i j))
  | _ -> fail (InvalidAddition ())

  sem eval =
  | Lit i -> return (VInt i)
  | Add (e1, e2) ->
    bind (eval e1) (lam v1.
      bind (eval e2) (lam v2.
        evalAdd (v1, v2)))
end


lang Lam = Eval + Reader + Failure
  syn Expr =
  | Lam (String, Expr)
  | Var String
  | App (Expr, Expr)

  syn Value =
  | VClos (Map String Value, String, Expr)

  syn Failure =
  | MissingVariable String
  | InvalidApplication ()

  sem getVarCtx : Ctx -> Map String Value
  sem putVarCtx : Map String Value -> Ctx -> Ctx

  sem eval =
  | Var s ->
    bind (ask getVarCtx) (lam ctx.
      match mapLookup s ctx with Some v then return v
      else fail (MissingVariable s))
  | Lam (s, e) ->
    bind (ask getVarCtx) (lam ctx.
      return (VClos (ctx, s, e)))
  | App (e1, e2) ->
    bind (eval e1) (lam v1.
      bind (eval e2) (lam v2.
        match v1 with VClos (ctx, s, e) then
          local (putVarCtx (mapInsert s v2 ctx)) (eval e)
        else fail (InvalidApplication ())))
end


lang EvalClient = Arith + Lam
  syn Ctx = | Vars (Map String Value)

  sem getVarCtx =
  | Vars ctx -> ctx
  sem putVarCtx ctx =
  | _ -> Vars ctx
end

mexpr


use EvalClient in

let formatFailure : Failure -> String = lam f.
  switch f
  case InvalidAddition () then "Attempted to add non-integer values!"
  case InvalidApplication () then "Attempted to apply non-function value!"
  case MissingVariable s then join ["Unknown variable ", s, " encountered!"]
  end
in

let formatValue : Value -> String = lam v.
  switch v
  case VInt i then int2string i
  case VClos _ then "<function>"
  end
in

let e : Expr =
  App (Lam ("x", Add (Var "x", Lit 5)), Lit 7)
in

let result : Either String Value =
  runEff
    (handleFail formatFailure
       (handleReader (Vars (mapEmpty cmpString))
          (eval e)))
in

let output =
  switch result
  case Right v then formatValue v
  case Left s then join ["ERROR: ", s]
  end
in

printLn output
```


## Limitations

There are three main limitations of the implementation at current. The first is that effectful computations have to be written in explicit monadic style as seen above.  The second is that there is no static check that all effects have been handled.  Trying to extract a value from an effectful computation without handling all effects will give a runtime error.  The third limitation is that the runtime performance is not very good.  There are techniques for improving the efficiency (e.g., [^3]), but these are not implemented currently.

[^1]: https://v2.ocaml.org/manual/effects.html
[^2]: https://okmij.org/ftp/Haskell/extensible/more.pdf
[^3]: https://okmij.org/ftp/Computation/free-monad.html
