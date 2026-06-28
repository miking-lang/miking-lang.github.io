import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqTotPatTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckPat" kind="sem">

```mc
sem typeCheckPat : TCEnv -> Map Name Ast_Type -> Ast_Pat -> (Map Name Ast_Type, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckPat env patEnv =
  | PatSeqTot t ->
    let elemTy = newvar env.currentLvl t.info in
    match mapAccumL (typeCheckPat env) patEnv t.pats with (patEnv, pats) in
    iter (lam pat. unify env [infoPat pat] elemTy (tyPat pat)) pats;
    (patEnv, PatSeqTot {t with pats = pats, ty = ityseq_ t.info elemTy})
```
</ToggleWrapper>
</DocBlock>

