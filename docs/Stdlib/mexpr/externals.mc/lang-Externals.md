import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Externals  
  

  
  
  
## Semantics  
  

          <DocBlock title="removeExternalDefs" kind="sem">

```mc
sem removeExternalDefs : Set String -> Ast_Expr -> Ast_Expr
```

<Description>{`Removes the given set of external definitions from the program.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem removeExternalDefs env =
  | TmDecl (x & {decl = DeclExt t}) ->
    let inexpr = removeExternalDefs env x.inexpr in
    if setMem (nameGetStr t.ident) env then inexpr
    else TmDecl {x with inexpr = inexpr}
  | expr -> smap_Expr_Expr (removeExternalDefs env) expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getExternalIds" kind="sem">

```mc
sem getExternalIds : Ast_Expr -> Set String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getExternalIds =
  | expr -> getExternalIdsH (setEmpty cmpString) expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getExternalIdsH" kind="sem">

```mc
sem getExternalIdsH : Set String -> Ast_Expr -> Set String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getExternalIdsH acc =
  | TmDecl {decl = DeclExt t, inexpr = inexpr} -> getExternalIdsH (setInsert (nameGetStr t.ident) acc) inexpr
  | expr -> sfold_Expr_Expr getExternalIdsH acc expr
```
</ToggleWrapper>
</DocBlock>

