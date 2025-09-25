import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OpImplPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode indent env =
  | DeclOpImpl x ->
    let newIndent = pprintIncr indent in
    match pprintEnvGetStr env x.ident with (env, ident) in
    match getTypeStringCode newIndent env x.specType with (env, specType) in
    match pprintCode newIndent env x.body with (env, body) in
    let start = concat (pprintNewline indent) "* " in
    let str = join
      [ "letimpl<scope:", int2string x.reprScope, ">[", float2string x.selfCost, "] "
      , ident, " : ", specType, " ="
      , pprintNewline newIndent, body
      ] in
    (env, str)
```
</ToggleWrapper>
</DocBlock>

