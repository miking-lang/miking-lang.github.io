import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqTotPatTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotPat" kind="sem">

```mc
sem typeAnnotPat : TypeEnv -> Ast_Type -> Ast_Pat -> (TypeEnv, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotPat (env : TypeEnv) (expectedTy : Type) =
  | PatSeqTot t ->
    let elemTy =
      match expectedTy with TySeq {ty = elemTy} then elemTy
      else ityunknown_ t.info
    in
    match mapAccumL (lam acc. lam pat. typeAnnotPat acc elemTy pat) env t.pats with (env, pats) then
      (env, PatSeqTot {{t with pats = pats} with ty = tyseq_ elemTy})
    else never
```
</ToggleWrapper>
</DocBlock>

