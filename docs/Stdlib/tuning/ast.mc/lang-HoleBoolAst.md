import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# HoleBoolAst  
  

A Boolean hole.

  
  
  
## Syntaxes  
  

          <DocBlock title="Hole" kind="syn">

```mc
syn Hole
```



<ToggleWrapper text="Code..">
```mc
syn Hole =
  | BoolHole {}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="hsample" kind="sem">

```mc
sem hsample : Int -> HoleAstBase_Hole -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem hsample (stepSize : Int) =
  | BoolHole {} ->
    get [true_, false_] (randIntU 0 2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hnext" kind="sem">

```mc
sem hnext : Option Ast_Expr -> Int -> HoleAstBase_Hole -> Option Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem hnext (last : Option Expr) (stepSize : Int) =
  | BoolHole {} ->
    match last with None () then Some false_
    else match last with Some (TmConst {val = CBool {val = false}}) then
      Some true_
    else match last with Some (TmConst {val = CBool {val = true}}) then
      None ()
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hdomainSize" kind="sem">

```mc
sem hdomainSize : Int -> HoleAstBase_Hole -> Int
```



<ToggleWrapper text="Code..">
```mc
sem hdomainSize (stepSize : Int) =
  | BoolHole {} -> 2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hdomain" kind="sem">

```mc
sem hdomain : Int -> HoleAstBase_Hole -> [Ast_Expr]
```



<ToggleWrapper text="Code..">
```mc
sem hdomain (stepSize : Int) =
  | BoolHole {} -> [true_, false_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fromString" kind="sem">

```mc
sem fromString : String -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem fromString =
  | "true" -> true
  | "false" -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchKeywordString" kind="sem">

```mc
sem matchKeywordString : Info -> String -> Option (Int, [Ast_Expr] -> Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem matchKeywordString (info : Info) =
  | "Boolean" ->
    Some (1,
      let validate = lam expr.
        match expr with TmHole {default = default} then
          match default with TmConst {val = CBool _} then expr
          else errorSingle [info] "Default value not a constant Boolean"
        else errorSingle [info] "Not a hole" in

      lam lst. _mkHole info tybool_ (lam. BoolHole {}) validate (get lst 0))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintHole" kind="sem">

```mc
sem pprintHole : HoleAstBase_Hole -> (String, [(String, String)])
```



<ToggleWrapper text="Code..">
```mc
sem pprintHole =
  | BoolHole {} ->
    ("Boolean", [])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hty" kind="sem">

```mc
sem hty : Info -> HoleAstBase_Hole -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem hty info =
  | BoolHole {} -> TyBool {info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hfromInt" kind="sem">

```mc
sem hfromInt : HoleAstBase_Hole -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem hfromInt =
  | BoolHole {} ->
    lam e. neqi_ (int_ 0) e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="htoInt" kind="sem">

```mc
sem htoInt : Info -> Ast_Expr -> HoleAstBase_Hole -> Int
```



<ToggleWrapper text="Code..">
```mc
sem htoInt info v =
  | BoolHole {} ->
    match v with TmConst {val = CBool {val = b}} then
      if b then 1 else 0
    else errorSingle [info] "Expected a Boolean expression"
```
</ToggleWrapper>
</DocBlock>

