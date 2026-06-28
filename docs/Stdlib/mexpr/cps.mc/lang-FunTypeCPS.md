import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FunTypeCPS  
  

  
  
  
## Semantics  
  

          <DocBlock title="tyCps" kind="sem">

```mc
sem tyCps : CPSEnv -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyCps env =
  -- Function type a -> b becomes (b -> res) -> a -> res
  | TyArrow ({ from = from, to = to } & b) ->
    let i = tyWithInfo b.info in
    if env.partial then
      -- NOTE(dlunde,2022-06-14): It is not obvious how to transform the types
      -- when the CPS transformation is partial. For now, we simply replace
      -- arrow types with unknown and rely on the type checker to infer the new
      -- correct CPS types.
      (i tyunknown_)
    else
      let from = tyCps env from in
      let to = tyCps env to in
      -- NOTE(dlunde,2022-06-08): We replace all continuation return types with
      -- the unknown type. No polymorphism should be needed, as all of these
      -- unknown types should ultimately be the same type: the return type of the
      -- program (I think). This can easily be inferred by the type checker.
      let cont = i (tyarrow_ to (i tyunknown_)) in
      (i (tyarrow_ cont
          (TyArrow { b with from = from, to = (i tyunknown_) })))
```
</ToggleWrapper>
</DocBlock>

