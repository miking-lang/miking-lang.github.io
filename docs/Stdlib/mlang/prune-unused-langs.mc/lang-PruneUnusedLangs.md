import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PruneUnusedLangs  
  

  
  
  
## Semantics  
  

          <DocBlock title="pruneProgram" kind="sem">

```mc
sem pruneProgram : Set String -> MLangTopLevel_MLangProgram -> MLangTopLevel_MLangProgram
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pruneProgram usedLangs =
  | prog ->
    {prog with decls = map (pruneDecl usedLangs) prog.decls}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pruneDecl" kind="sem">

```mc
sem pruneDecl : Set String -> Ast_Decl -> Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pruneDecl usedLangs =
  | DeclLang d & decl ->
    if setMem (nameGetStr d.ident) usedLangs then
      decl
    else
      DeclLang {d with decls = filter filterUnusedLangFragment d.decls}
  | decl -> decl
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="filterUnusedLangFragment" kind="sem">

```mc
sem filterUnusedLangFragment : Ast_Decl -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem filterUnusedLangFragment =
  | DeclSem _  -> false
  | DeclCosem _ -> false
  | _ -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectUsedLangs_Prog" kind="sem">

```mc
sem collectUsedLangs_Prog : MLangTopLevel_MLangProgram -> Set String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectUsedLangs_Prog =
  | prog ->
    let acc = setEmpty cmpString in
    let acc = foldl collectUsedLangs_Decl acc prog.decls in
    collectUsedLangs_Expr acc prog.expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectUsedLangs_Decl" kind="sem">

```mc
sem collectUsedLangs_Decl : Set String -> Ast_Decl -> Set String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectUsedLangs_Decl acc =
  | decl ->
    let acc = sfold_Decl_Decl collectUsedLangs_Decl acc decl in
    let acc = sfold_Decl_Expr collectUsedLangs_Expr acc decl in
    sfold_Decl_Type collectUsedLangs_Type acc decl
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectUsedLangs_Expr" kind="sem">

```mc
sem collectUsedLangs_Expr : Set String -> Ast_Expr -> Set String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectUsedLangs_Expr acc =
  | TmDecl (x & {decl = DeclUse t}) & tm ->
    let acc = setInsert (nameGetStr t.ident) acc in
    let acc = sfold_Expr_Expr collectUsedLangs_Expr acc x.inexpr in
    sfold_Expr_Type collectUsedLangs_Type acc tm
  | tm ->
    let acc = sfold_Expr_Expr collectUsedLangs_Expr acc tm in
    sfold_Expr_Type collectUsedLangs_Type acc tm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectUsedLangs_Type" kind="sem">

```mc
sem collectUsedLangs_Type : Set String -> Ast_Type -> Set String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectUsedLangs_Type acc =
  | TyUse t ->
    let acc = setInsert (nameGetStr t.ident) acc in
    sfold_Type_Type collectUsedLangs_Type acc t.inty
  | ty ->
    sfold_Type_Type collectUsedLangs_Type acc ty
```
</ToggleWrapper>
</DocBlock>

