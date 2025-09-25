import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RemoveMetaVar  
  

  
  
  
## Semantics  
  

          <DocBlock title="removeMetaVarType" kind="sem">

```mc
sem removeMetaVarType : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem removeMetaVarType =
  | TyMetaVar t ->
    switch deref t.contents
    case Unbound {kind = Record x} then
      TyRecord {info = t.info, fields = mapMap removeMetaVarType x.fields}
    case Unbound _ then TyUnknown { info = t.info }
    case Link ty then removeMetaVarType ty
    end
  | ty ->
    smap_Type_Type removeMetaVarType ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="removeMetaVarExpr" kind="sem">

```mc
sem removeMetaVarExpr : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem removeMetaVarExpr =
  | tm ->
    let tm = smap_Expr_TypeLabel removeMetaVarType tm in
    let tm = smap_Expr_Type removeMetaVarType tm in
    let tm = smap_Expr_Pat removeMetaVarPat tm in
    smap_Expr_Expr removeMetaVarExpr tm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="removeMetaVarPat" kind="sem">

```mc
sem removeMetaVarPat : Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem removeMetaVarPat =
  | pat ->
    let pat = withTypePat (removeMetaVarType (tyPat pat)) pat in
    smap_Pat_Pat removeMetaVarPat pat
```
</ToggleWrapper>
</DocBlock>

