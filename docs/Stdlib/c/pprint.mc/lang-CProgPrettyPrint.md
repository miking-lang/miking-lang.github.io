import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CProgPrettyPrint  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-  
C PROGRAM \-\-  
\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
  
## Semantics  
  

          <DocBlock title="printCProg" kind="sem">

```mc
sem printCProg : [Name] -> CProgAst_CProg -> String
```



<ToggleWrapper text="Code..">
```mc
sem printCProg (nameInit: [Name]) =
  | CPProg { includes = includes, tops = tops } ->
    let indent = 0 in
    let includes = map (lam inc. join ["#include ", inc]) includes in
    let addName = lam env. lam name.
      match pprintAddStr env name with Some env then env
      else error (join ["Duplicate name in printCProg: ", nameGetStr name])
    in
    let env = foldl addName pprintEnvEmpty (map nameNoSym cKeywords) in
    let env = foldl addName env nameInit in
    match mapAccumL (printCTop indent) env tops with (env,tops) then
      strJoin (pprintNewline indent) (join [includes, tops])
    else never
```
</ToggleWrapper>
</DocBlock>

