import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TyUsePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode (indent : Int) (env : PprintEnv) =
  | TyUse t ->
    match pprintLangName env t.ident with (env, ident) in
    match getTypeStringCode indent env t.inty with (env, inty) in
    (env, join ["use ", ident, pprintNewline indent,
                "in", pprintNewline indent,
                inty])
```
</ToggleWrapper>
</DocBlock>

