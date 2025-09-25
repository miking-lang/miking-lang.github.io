import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotPat" kind="sem">

```mc
sem typeAnnotPat : TypeEnv -> Ast_Type -> Ast_Pat -> _a
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotPat (env : TypeEnv) (expectedTy : Type) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeAnnotExpr" kind="sem">

```mc
sem typeAnnotExpr : {tyEnv: Map Name Ast_Type, conEnv: Map Name Ast_Type, varEnv: Map Name Ast_Type} -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotExpr (env : TypeEnv) =
  | TmMatch t ->
    let target = typeAnnotExpr env t.target in
    match typeAnnotPat env (tyTm target) t.pat with (thnEnv, pat) then
      let thn = typeAnnotExpr thnEnv t.thn in
      let els = typeAnnotExpr env t.els in
      let ty =
        match compatibleType env.tyEnv (tyTm thn) (tyTm els) with Some ty
        then ty
        else (ityunknown_ t.info) in
      TmMatch {{{{{t with target = target}
                     with thn = thn}
                     with els = els}
                     with ty = ty}
                     with pat = pat}
    else never
```
</ToggleWrapper>
</DocBlock>

