import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmSeq t ->
    let elemTy = newpolyvar env.currentLvl t.info in
    let tms = map (typeCheckExpr env) t.tms in
    iter (lam tm. unify env [infoTm tm] elemTy (tyTm tm)) tms;
    TmSeq {t with tms = tms, ty = ityseq_ t.info elemTy}
```
</ToggleWrapper>
</DocBlock>

