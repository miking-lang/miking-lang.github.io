import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode indent env =
  | DeclUtest x ->
    match pprintCode indent env x.test with (env,testStr) in
    match pprintCode indent env x.expected with (env,expectedStr) in
    match
      optionMapOr (env,"") (
        lam tusing.
          match pprintCode indent env tusing with (env,tusingStr) in
          (env,join [pprintNewline indent, "using ", tusingStr])
        ) x.tusing
    with (env,tusingStr) in
    (env,join ["utest ", testStr, pprintNewline indent,
               "with ", expectedStr, tusingStr])
```
</ToggleWrapper>
</DocBlock>

