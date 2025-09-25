import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEdgePatTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotPat" kind="sem">

```mc
sem typeAnnotPat : TypeEnv -> Ast_Type -> Ast_Pat -> (TypeEnv, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotPat (env : TypeEnv) (expectedTy : Type) =
  | PatSeqEdge t ->
    let elemTy =
      match expectedTy with TySeq {ty = elemTy} then elemTy
      else ityunknown_ t.info in
    let expectedTy = match expectedTy with TySeq _
      then expectedTy
      else tyseq_ elemTy in
    match mapAccumL (lam acc. lam pat. typeAnnotPat acc elemTy pat) env t.prefix with (env, prefix) then
      let env: TypeEnv = env in
      let env: TypeEnv =
        match t.middle with PName n then
          {env with varEnv = mapInsert n expectedTy env.varEnv}
        else env
      in
      match mapAccumL (lam acc. lam pat. typeAnnotPat acc elemTy pat) env t.postfix with (env, postfix) then
        (env, PatSeqEdge {{{t with prefix = prefix} with postfix = postfix} with ty = expectedTy})
      else never
    else never
```
</ToggleWrapper>
</DocBlock>

