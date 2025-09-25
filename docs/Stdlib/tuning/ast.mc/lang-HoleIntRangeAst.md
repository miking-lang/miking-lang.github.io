import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# HoleIntRangeAst  
  

An integer hole \(range of integers\).

  
  
  
## Syntaxes  
  

          <DocBlock title="Hole" kind="syn">

```mc
syn Hole
```



<ToggleWrapper text="Code..">
```mc
syn Hole =
  | HIntRange {min : Int,
               max : Int}
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
  | HIntRange h ->
    let size = hdomainSize stepSize (HIntRange h) in
    let i = randIntU 0 size in
    int_ (addi h.min (muli i stepSize))
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
  | HIntRange {min = min, max = max} ->
    match last with None () then Some (int_ min)
    else match last with Some (TmConst {val = CInt {val = i}}) then
      if eqi i max then
        None ()
      else
        let next = addi i stepSize in
        utest geqi next min with true in
        if leqi next max then Some (int_ next)
        else None ()
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
  | HIntRange {min = min, max = max} ->
    let len = addi (subi max min) 1 in
    let r = divi len stepSize in
    let m = if eqi 0 (modi len stepSize) then 0 else 1 in
    addi r m
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
  | HIntRange ({min = min} & h) ->
    map (lam i. int_ (addi min (muli i stepSize)))
      (create (hdomainSize stepSize (HIntRange h)) (lam i. i))
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
  | "IntRange" ->
    Some (1,
      let validate = lam expr.
        match expr
        with TmHole {default = TmConst {val = CInt {val = i}},
                     inner = HIntRange {min = min, max = max}}
        then
          if and (leqi min i) (geqi max i) then expr
          else errorSingle [info] "Default value is not within range"
        else errorSingle [info] "Not a hole" in

      lam lst. _mkHole info tyint_
        (lam m: Map String Expr.
           let min = _expectConstInt info "min" (_lookupExit info "min" m) in
           let max = _expectConstInt info "max" (_lookupExit info "max" m) in
           if leqi min max then
             HIntRange {min = min, max = max}
           else errorSingle [info] (join ["Empty domain: ", int2string min, "..", int2string max]))
        validate (get lst 0))
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
  | HIntRange {min = min, max = max} ->
    ("IntRange", [("min", int2string min), ("max", int2string max)])
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
  | HIntRange {} -> TyInt {info = info}
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
  | HIntRange {} ->
    lam e. e
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
  | HIntRange {} ->
    match v with TmConst {val = CInt {val = i}} then i
    else errorSingle [info] "Expected an Int expression"
```
</ToggleWrapper>
</DocBlock>

