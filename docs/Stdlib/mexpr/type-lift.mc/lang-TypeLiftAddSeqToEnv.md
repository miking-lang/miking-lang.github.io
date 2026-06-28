import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeLiftAddSeqToEnv  
  

Define function for adding sequence types to environment

  
  
  
## Semantics  
  

          <DocBlock title="addSeqToEnv" kind="sem">

```mc
sem addSeqToEnv : TypeLiftBase_TypeLiftEnv -> Ast_Type -> (TypeLiftBase_TypeLiftEnv, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem addSeqToEnv (env: TypeLiftEnv) =
  | TySeq {info = info, ty = innerTy} & ty ->
    match mapLookup innerTy env.seqs with Some name then
      let tycon = nitycon_ name info in
      (env, tycon)
    else
      let name = nameSym "Seq" in
      let tycon = nitycon_ name info in
      let env = {{env with seqs = mapInsert innerTy name env.seqs}
                      with typeEnv = assocSeqInsert name ty env.typeEnv}
      in
      (env, tycon)
```
</ToggleWrapper>
</DocBlock>

