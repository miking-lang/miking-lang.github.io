import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# HoleAstBase  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Hole" kind="syn">

```mc
syn Hole
```



<ToggleWrapper text="Code..">
```mc
syn Hole =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmHole {default : Expr,
            depth : Int,
            ty : Type,
            info : Info,
            inner : Hole}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoTm" kind="sem">

```mc
sem infoTm : Ast_Expr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTm =
  | TmHole h -> h.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyTm" kind="sem">

```mc
sem tyTm : Ast_Expr -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyTm =
  | TmHole {ty = ty} -> ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withType" kind="sem">

```mc
sem withType : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withType (ty : Type) =
  | TmHole t -> TmHole {t with ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeExpr" kind="sem">

```mc
sem symbolizeExpr : SymEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeExpr (env : SymEnv) =
  | TmHole h -> TmHole h
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="default" kind="sem">

```mc
sem default : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem default =
  | TmHole {default = default} -> default
  | t -> smap_Expr_Expr default t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | TmHole _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintHole" kind="sem">

```mc
sem pprintHole : HoleAstBase_Hole -> _a
```



<ToggleWrapper text="Code..">
```mc
sem pprintHole =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode (indent : Int) (env : PprintEnv) =
  | TmHole t ->
    match pprintCode indent env t.default with (env, default) then
      match pprintHole t.inner with (keyword, bindings) then
        (env, join
          [ "hole ("
          , keyword
          , " {"
          , "depth = ", int2string t.depth, ", "
          , "default = ", default, ", "
          , strJoin ", "
            (map (lam b : (String, String). join [b.0, " = ", b.1])
               bindings)
          ,  "}"
          , ")"
          ])
      else never
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="next" kind="sem">

```mc
sem next : all a. Option Ast_Expr -> Int -> Ast_Expr -> a
```



<ToggleWrapper text="Code..">
```mc
sem next (last : Option Expr) (stepSize : Int) =
  | TmHole {inner = inner} ->
    hnext last stepSize inner
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hnext" kind="sem">

```mc
sem hnext : all a. Option Ast_Expr -> Int -> HoleAstBase_Hole -> a
```



<ToggleWrapper text="Code..">
```mc
sem hnext (last : Option Expr) (stepSize : Int) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="domainSize" kind="sem">

```mc
sem domainSize : all a. Int -> Ast_Expr -> a
```



<ToggleWrapper text="Code..">
```mc
sem domainSize (stepSize : Int) =
  | TmHole {inner = inner} ->
    hdomainSize stepSize inner
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hdomainSize" kind="sem">

```mc
sem hdomainSize : all a. Int -> HoleAstBase_Hole -> a
```



<ToggleWrapper text="Code..">
```mc
sem hdomainSize (stepSize : Int) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="domain" kind="sem">

```mc
sem domain : all a. Int -> Ast_Expr -> a
```



<ToggleWrapper text="Code..">
```mc
sem domain (stepSize : Int) =
  | TmHole {inner = inner} ->
    hdomain stepSize inner
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hdomain" kind="sem">

```mc
sem hdomain : all a. Int -> HoleAstBase_Hole -> a
```



<ToggleWrapper text="Code..">
```mc
sem hdomain (stepSize : Int) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sample" kind="sem">

```mc
sem sample : all a. Int -> Ast_Expr -> a
```



<ToggleWrapper text="Code..">
```mc
sem sample (stepSize : Int) =
  | TmHole {inner = inner} ->
    hsample stepSize inner
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hsample" kind="sem">

```mc
sem hsample : all a. Int -> HoleAstBase_Hole -> a
```



<ToggleWrapper text="Code..">
```mc
sem hsample (stepSize : Int) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  | TmHole ({default = default} & t) ->
    k (TmHole {t with default = normalizeTerm t.default})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isKeyword" kind="sem">

```mc
sem isKeyword : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isKeyword =
  | TmHole _ -> true
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
  | "hole" -> Some (1, lam lst. head lst)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_mkHole" kind="sem">

```mc
sem _mkHole : Info -> Ast_Type -> (Map String Ast_Expr -> HoleAstBase_Hole) -> (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem _mkHole (info : Info) (hty : Type) (holeMap : Map String Expr -> Hole)
              (validate : Expr -> Expr) =
  | arg ->
    use RecordAst in
    match arg with TmRecord {bindings = bindings} then
      let bindings: Map String Expr = mapFromSeq cmpString
        (map (lam t : (SID, Expr). (sidToString t.0, t.1))
           (mapBindings bindings)) in
      let default = _lookupExit info "default" bindings in
      let depth = mapLookupOrElse (lam. int_ 0) "depth" bindings in
      validate
        (TmHole { default = default
                , depth = _expectConstInt info "depth" depth
                , info = info
                , ty = hty
                , inner = holeMap bindings})
    else error "impossible"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hty" kind="sem">

```mc
sem hty : Info -> HoleAstBase_Hole -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem hty : Info -> Hole -> Type
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr (env: TCEnv) =
  | TmHole t ->
    let default = typeCheckExpr env t.default in
    let ty = hty t.info t.inner in
    unify env [t.info] ty (tyTm default);
    TmHole {{t with default = default}
               with ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fromInt" kind="sem">

```mc
sem fromInt : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem fromInt =
  | TmHole t -> hfromInt t.inner
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="toInt" kind="sem">

```mc
sem toInt : Ast_Expr -> Ast_Expr -> Int
```



<ToggleWrapper text="Code..">
```mc
sem toInt (e: Expr) =
  | TmHole t -> htoInt t.info e t.inner
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hfromInt" kind="sem">

```mc
sem hfromInt : HoleAstBase_Hole -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem hfromInt : Hole -> (Expr -> Expr)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="htoInt" kind="sem">

```mc
sem htoInt : Info -> Ast_Expr -> HoleAstBase_Hole -> Int
```



<ToggleWrapper text="Code..">
```mc
sem htoInt : Info -> Expr -> Hole -> Int
```
</ToggleWrapper>
</DocBlock>

