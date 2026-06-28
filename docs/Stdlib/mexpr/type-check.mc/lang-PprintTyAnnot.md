import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PprintTyAnnot  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr = | FakeExpr {id : Int, result : Ref String, real : Expr}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type = | FakeType {id : Int, result : Ref String, real : Type}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Pat" kind="syn">

```mc
syn Pat
```



<ToggleWrapper text="Code..">
```mc
syn Pat  = | FakePat  {id : Int, result : Ref String, real : Pat}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | FakeExpr x -> isAtomic x.real
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patIsAtomic" kind="sem">

```mc
sem patIsAtomic : all a. Ast_Pat -> a
```



<ToggleWrapper text="Code..">
```mc
sem patIsAtomic =
  | FakePat x -> patIsAtomic x.real
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typePrecedence" kind="sem">

```mc
sem typePrecedence : Ast_Type -> Int
```



<ToggleWrapper text="Code..">
```mc
sem typePrecedence =
  | FakeType x -> typePrecedence x.real
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode indent env =
  | FakeExpr x ->
    match pprintAnnotExpr indent env x.real with (env, real) in
    modref x.result real;
    (env, cons '!' (cons '!' (int2string x.id)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getPatStringCode" kind="sem">

```mc
sem getPatStringCode : Int -> {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> Ast_Pat -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getPatStringCode indent env =
  | FakePat x ->
    match pprintAnnotPat indent env x.real with (env, real) in
    modref x.result real;
    (env, cons '!' (cons '!' (int2string x.id)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode indent env =
  | FakeType x ->
    match pprintAnnotType indent env x.real with (env, real) in
    modref x.result real;
    (env, cons '!' (cons '!' (int2string x.id)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoTm" kind="sem">

```mc
sem infoTm : Ast_Expr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTm =
  | FakeExpr x -> infoTm x.real
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoPat" kind="sem">

```mc
sem infoPat : Ast_Pat -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoPat =
  | FakePat x -> infoPat x.real
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoTy" kind="sem">

```mc
sem infoTy : Ast_Type -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTy =
  | FakeType x -> infoTy x.real
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="subSwap" kind="sem">

```mc
sem subSwap : all a. (a -> Int -> (Ref String, a)) -> [Ref String] -> a -> ([Ref String], a)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem subSwap mkPlaceholder acc = | a ->
    match mkPlaceholder a (length acc) with (newRef, fake) in
    (snoc acc newRef, fake)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mkFakeExpr" kind="sem">

```mc
sem mkFakeExpr : Ast_Expr -> Int -> (Ref String, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem mkFakeExpr real = | id ->
    let r = ref "" in
    (r, FakeExpr {id = id, result = r, real = real})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mkFakeType" kind="sem">

```mc
sem mkFakeType : Ast_Type -> Int -> (Ref String, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem mkFakeType real = | id ->
    let r = ref "" in
    (r, FakeType {id = id, result = r, real = real})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mkFakePat" kind="sem">

```mc
sem mkFakePat : Ast_Pat -> Int -> (Ref String, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem mkFakePat real = | id ->
    let r = ref "" in
    (r, FakePat {id = id, result = r, real = real})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintAst" kind="sem">

```mc
sem pprintAst : Ast_Expr -> Annotator_Output
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintAst = | tm ->
    match pprintAnnotExpr 0 pprintEnvEmpty tm with (_, output) in
    finalize output
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sdisconnectMetas" kind="sem">

```mc
sem sdisconnectMetas : Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sdisconnectMetas =
  | TyMetaVar t ->
    let contents = switch deref t.contents
      case Unbound u then
        Unbound u
      case Link ty then
        Link (sdisconnectMetas ty)
      end in
    TyMetaVar {t with contents = ref contents}
  | ty -> ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintAnnotExpr" kind="sem">

```mc
sem pprintAnnotExpr : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, Annotator_Output)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintAnnotExpr indent env =
  | orig & x ->
    let subs = [] in
    match smapAccumL_Expr_Expr (subSwap mkFakeExpr) subs x with (subs, x) in
    match smapAccumL_Expr_Type (subSwap mkFakeType) subs x with (subs, x) in
    match smapAccumL_Expr_Pat (subSwap mkFakePat) subs x with (subs, x) in
    match pprintCode indent env x with (env, x) in
    match getTypeStringCode 0 env (_removeAliases (tyTm orig)) with (env, ty) in
    (env, annotate ty (_fixOutput (infoTm orig) x subs))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintAnnotPat" kind="sem">

```mc
sem pprintAnnotPat : Int -> PprintEnv -> Ast_Pat -> (PprintEnv, Annotator_Output)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintAnnotPat indent env =
  | orig & x ->
    let subs = [] in
    match smapAccumL_Pat_Expr (subSwap mkFakeExpr) subs x with (subs, x) in
    match smapAccumL_Pat_Type (subSwap mkFakeType) subs x with (subs, x) in
    match smapAccumL_Pat_Pat (subSwap mkFakePat) subs x with (subs, x) in
    match getPatStringCode indent env x with (env, x) in
    match getTypeStringCode 0 env (_removeAliases (tyPat orig)) with (env, ty) in
    (env, annotate ty (_fixOutput (infoPat orig) x subs))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintAnnotType" kind="sem">

```mc
sem pprintAnnotType : Int -> PprintEnv -> Ast_Type -> (PprintEnv, Annotator_Output)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintAnnotType indent env =
  | orig & x ->
    let subs = [] in
    match smapAccumL_Type_Type (subSwap mkFakeType) subs (sdisconnectMetas x) with (subs, x) in
    match getTypeStringCode indent env x with (env, x) in
    match getTypeStringCode 0 env (_removeAliases orig) with (env, ty) in
    (env, annotate ty (_fixOutput (infoTy orig) x subs))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_removeAliases" kind="sem">

```mc
sem _removeAliases : Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _removeAliases =
  | TyAlias x -> _removeAliases x.content
  | ty -> smap_Type_Type _removeAliases ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_fixOutput" kind="sem">

```mc
sem _fixOutput : Info -> String -> [Ref String] -> Annotator_Output
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _fixOutput info str = | subs ->
    recursive let splitWhile : all a. (a -> Bool) -> [a] -> ([a], [a]) = lam pred. lam seq.
      match seq with [x] ++ rest then
        if pred x then
          match splitWhile pred rest with (passing, rest) in
          (cons x passing, rest)
        else ([], seq)
      else ([], [])
    in
    recursive let work = lam acc. lam str.
      switch str
      case ['!', '!', c & ('0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9')] ++ str then
        match splitWhile isDigit (cons c str) with (number, str) in
        let idx = string2int number in
        if geqi idx (length subs) then
          warnSingle [info] "Compiler error: got a '!!idx' without a corresponding entry in 'subs', which should not be possible.";
          work (join [acc, "!!", number]) str
        else
          let acc = concat acc (deref (get subs idx)) in
          work acc str
      case [c] ++ str then
        work (snoc acc c) str
      case [] then
        acc
      end
    in work "" (escapeContent str)
```
</ToggleWrapper>
</DocBlock>

