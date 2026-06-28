import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# prune-unused-langs.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mlang/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mlang/ast-builder.mc"} style={S.link}>ast-builder.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/set.mc"} style={S.link}>set.mc</a>, <a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>  
  
## Languages  
  

          <DocBlock title="PruneUnusedLangs" kind="lang" link="/docs/Stdlib/mlang/prune-unused-langs.mc/lang-PruneUnusedLangs">

```mc
lang PruneUnusedLangs
```



<ToggleWrapper text="Code..">
```mc
lang PruneUnusedLangs = MLangAst + MExprAst + ExtRecAst
  sem pruneProgram : Set String -> MLangProgram -> MLangProgram
  sem pruneProgram usedLangs =
  | prog ->
    {prog with decls = map (pruneDecl usedLangs) prog.decls}

  sem pruneDecl : Set String -> Decl -> Decl
  sem pruneDecl usedLangs =
  | DeclLang d & decl ->
    if setMem (nameGetStr d.ident) usedLangs then
      decl
    else
      DeclLang {d with decls = filter filterUnusedLangFragment d.decls}
  | decl -> decl

  sem filterUnusedLangFragment : Decl -> Bool
  sem filterUnusedLangFragment =
  | DeclSem _  -> false
  | DeclCosem _ -> false
  | _ -> true

  sem collectUsedLangs_Prog : MLangProgram -> Set String
  sem collectUsedLangs_Prog =
  | prog ->
    let acc = setEmpty cmpString in
    let acc = foldl collectUsedLangs_Decl acc prog.decls in
    collectUsedLangs_Expr acc prog.expr

  sem collectUsedLangs_Decl : Set String -> Decl -> Set String
  sem collectUsedLangs_Decl acc =
  | decl ->
    let acc = sfold_Decl_Decl collectUsedLangs_Decl acc decl in
    let acc = sfold_Decl_Expr collectUsedLangs_Expr acc decl in
    sfold_Decl_Type collectUsedLangs_Type acc decl

  sem collectUsedLangs_Expr : Set String -> Expr -> Set String
  sem collectUsedLangs_Expr acc =
  | TmDecl (x & {decl = DeclUse t}) & tm ->
    let acc = setInsert (nameGetStr t.ident) acc in
    let acc = sfold_Expr_Expr collectUsedLangs_Expr acc x.inexpr in
    sfold_Expr_Type collectUsedLangs_Type acc tm
  | tm ->
    let acc = sfold_Expr_Expr collectUsedLangs_Expr acc tm in
    sfold_Expr_Type collectUsedLangs_Type acc tm

  sem collectUsedLangs_Type : Set String -> Type -> Set String
  sem collectUsedLangs_Type acc =
  | TyUse t ->
    let acc = setInsert (nameGetStr t.ident) acc in
    sfold_Type_Type collectUsedLangs_Type acc t.inty
  | ty ->
    sfold_Type_Type collectUsedLangs_Type acc ty
end
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr ()
```
</ToggleWrapper>
</DocBlock>

