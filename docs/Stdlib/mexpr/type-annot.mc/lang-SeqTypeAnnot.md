import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotExpr" kind="sem">

```mc
sem typeAnnotExpr : {tyEnv: Map Name Ast_Type, conEnv: Map Name Ast_Type, varEnv: Map Name Ast_Type} -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotExpr (env : TypeEnv) =
  | TmSeq t ->
    let tms = map (typeAnnotExpr env) t.tms in
    let elemTy =
      if eqi (length tms) 0 then ityunknown_ t.info
      else
        let types = map (lam term. tyTm term) tms in
        match optionFoldlM (compatibleType env.tyEnv) (ityunknown_ t.info) types
        with Some ty then
          ty
        else (ityunknown_ t.info)
    in
    TmSeq {{t with tms = tms}
              with ty = ityseq_ t.info elemTy}
```
</ToggleWrapper>
</DocBlock>

