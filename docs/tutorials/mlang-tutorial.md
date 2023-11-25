---
sidebar_position: 2
---

# MLang tutorial

MLang is a superset of MExpr, and is used to define and compose
reusable language fragments. It also supports top-level
definitions and simple file inclusion. The definitions can be
translated into pure MExpr definitions, and can be run as any
other MExpr programs.

### Top-Level Definitions and Includes

Values, types, and data constructors can be defined top-level,
before the `mexpr` keyword of an MCore program. The syntax is
identical to that of the corresponding MExpr definitions, without
the trailing `in`:

```mc
let id = lam x. x
type T
con Foo : Int -> T

mexpr

utest id (Foo 42) with Foo 42 in
()
```

The translation into MExpr is straightforward: the definitions are
simply moved into the beginning of the `mexpr` program. The
usefulness of top-level definitions becomes more apparent when
adding included files. A file can be included using the syntax

```mc
include "path/to/prog.mc"
```

before any top-level definitions in a file.
The string is a file path relative to the file that contains the `include`.
To refer to files from other libraries, the path can be prefixed with a _namespace_ using the syntax

```mc
include "mylib::prog.mc"
```

The environment variable `MCORE_LIBS` specifies the location associated with each namespace as a colon-separated list of `name=path` pairs.
For instance, with `MCORE_LIBS=mylib=/path/to/mylib`, the snippet above would include the file `/path/to/mylib/prog.mc`.
The standard library namespace `stdlib` is used as a fallback path to search from if no namespace is given and the file is not found relative to the original file.
Files are included transitively in a depth-first fashion, and files that are included from several files are only included once.
File inclusions that form a loop are not allowed.

Including a file is equivalent to inserting all the top-level
definitions of that file. There are no namespaces and no
disambiguation; if a name defined in an included file is shadowed
in the including file, the included definition becomes
unavailable.


### Language Fragments

A language fragment contains definitions of (abstract) syntax, and
semantics ("interpreters") for that fragment. Any number of
language fragments can be defined before the `mexpr` keyword in an
MCore program. For example, here is a language fragment for simple
arithmetics:

```mc
lang Arith
  syn Expr =
  | Num Int
  | Add (Expr, Expr)

  sem eval =
  | Num n -> Num n
  | Add (e1,e2) ->
    match eval e1 with Num n1 then
      match eval e2 with Num n2 then
        Num (addi n1 n2)
      else error "Not a number"
    else error "Not a number"
end
```

The fragment defines a syntactic form with two cases called
`Expr`, and an interpreter called `eval`. An interpreter in MLang
is a function that is always defined by cases over its last
argument (here, `eval` takes only a single argument). The body of
a case is a regular MExpr term, which has access to the name of
the value (if any) carried by the current syntactic form.

In the main MExpr program, a language fragment can be opened by
a `use` expression:

```mc
mexpr
use Arith in
utest eval (Add (Num 2, Num 3)) with Num 5 in
()
```

A `use` is translated into a series of MExpr definitions that
match the syntax and semantics of the specified language fragment.

An important feature of language fragments is that they can be
composed to form new language fragments. As an example, we might
want to extend our arithmetics language with booleans and `if`
expressions:

```mc
lang MyBool
  syn Expr =
  | True()
  | False()
  | If (Expr, Expr, Expr)

  sem eval =
  | True() -> True()
  | False() -> False()
  | If(cnd,thn,els) ->
    let cndVal = eval cnd in
    match cndVal with True() then eval thn
    else match cndVal with False() then eval els
    else error "Not a boolean"
end

lang ArithBool = Arith + MyBool

mexpr
use ArithBool in
utest eval (Add (If (False(), Num 0, Num 5), Num 2)) with Num 7 in
()
```

The language fragment `ArithBool` is indistinguishable from a
language fragment with all the syntactic and semantic cases of
`Arith` and `MyBool` merged. If we wanted, we could have added new
cases to the language composition as well, and refer to the syntax
and semantics of the fragments being composed:

```mc
lang ArithBool = Arith + MyBool
  syn Expr =
  | IsZero Expr

  sem eval =
  | IsZero e ->
    match eval e with Num n then
      if eqi n 0 then True() else False()
    else
      error "Not a number"
end
```
