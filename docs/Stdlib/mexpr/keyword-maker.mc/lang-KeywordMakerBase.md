import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# KeywordMakerBase  
  

The base fragment that includes the keyword maker, but  
no checks for incorrect bindings in e.g. let or lam.  
See the separate fragments to include this.

  
  
  
## Semantics  
  

          <DocBlock title="isKeyword" kind="sem">

```mc
sem isKeyword : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isKeyword =
  | _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isTypeKeyword" kind="sem">

```mc
sem isTypeKeyword : Ast_Type -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isTypeKeyword =
  | _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchKeywordString" kind="sem">

```mc
sem matchKeywordString : Info -> String -> Option _a
```



<ToggleWrapper text="Code..">
```mc
sem matchKeywordString (info: Info) =
  | _ -> None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchTypeKeywordString" kind="sem">

```mc
sem matchTypeKeywordString : Info -> String -> Option (Int, [Ast_Type] -> Ast_Type)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchTypeKeywordString (info: Info) =
  | _ -> None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="makeKeywordError" kind="sem">

```mc
sem makeKeywordError : all a. Info -> Int -> Int -> String -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem makeKeywordError (info: Info) (n1: Int) (n2: Int) =
  | ident -> errorSingle [info] (join ["Unexpected number of arguments for construct '",
             ident, "'. ", "Expected ", int2string n1,
             " arguments, but found ", int2string n2, "."])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="makeKeywords" kind="sem">

```mc
sem makeKeywords : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem makeKeywords =
  | expr ->
    let expr = makeExprKeywords [] expr in
    let expr = mapPre_Expr_Expr (lam expr.
        smap_Expr_Type (makeTypeKeywords []) expr
      ) expr
    in expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="makeExprKeywords" kind="sem">

```mc
sem makeExprKeywords : [Ast_Expr] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem makeExprKeywords (args: [Expr]) =
  | TmApp r ->
     let rhs = makeExprKeywords [] r.rhs in
     let lhs = makeExprKeywords (cons rhs args) r.lhs in
     if isKeyword lhs then lhs
     else TmApp {r with lhs = lhs, rhs = rhs}
  | TmVar r ->
     let ident = nameGetStr r.ident in
     match matchKeywordString r.info ident with Some n then
       match n with (noArgs, f) then
         if eqi noArgs (length args) then f args
         else makeKeywordError r.info noArgs (length args) ident
       else never
     else TmVar r
  | expr -> smap_Expr_Expr (makeExprKeywords []) expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="makeTypeKeywords" kind="sem">

```mc
sem makeTypeKeywords : [Ast_Type] -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem makeTypeKeywords args =
  | TyApp r ->
    let rhs = makeTypeKeywords [] r.rhs in
    let lhs = makeTypeKeywords (cons rhs args) r.lhs in
    if isTypeKeyword lhs then lhs
    else TyApp {r with lhs = lhs, rhs = rhs}
  | TyCon r ->
    let ident = nameGetStr r.ident in
    match matchTypeKeywordString r.info ident with Some n then
       match n with (noArgs, f) then
         if eqi noArgs (length args) then f args
         else makeKeywordError r.info noArgs (length args) ident
       else never
     else TyCon r
  | ty -> smap_Type_Type (makeTypeKeywords []) ty
```
</ToggleWrapper>
</DocBlock>

