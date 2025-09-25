import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConTypePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode (indent : Int) (env: PprintEnv) =
  | TyCon t ->
    match pprintTypeName env t.ident with (env, idstr) in
    let d = unwrapType t.data in
    match d with TyUnknown _ then (env, idstr) else
      match getTypeStringCode indent env t.data with (env, datastr) in
      match d with TyData _ then (env, concat idstr datastr) else
        (env, join [idstr, "{", datastr, "}"])
```
</ToggleWrapper>
</DocBlock>

