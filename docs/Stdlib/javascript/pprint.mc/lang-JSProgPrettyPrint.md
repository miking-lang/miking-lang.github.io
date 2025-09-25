import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# JSProgPrettyPrint  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
JavaScript PROGRAM \-\-  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
  
## Semantics  
  

          <DocBlock title="printJSProg" kind="sem">

```mc
sem printJSProg : JSProgAst_JSProg -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem printJSProg =
  | JSPProg { imports = imports, exprs = exprs } ->
    let indent = 0 in
    let imports = map (lam imp. join ["import '", imp, "';"]) imports in
    let env = pprintEnvEmpty in
    match mapAccumL (printJSExpr indent) env exprs with (env,exprs) in
    let importsStr = strJoin "\n" imports in
    let exprsStr = joinAsStatements indent exprs in
    join [importsStr, exprsStr]
```
</ToggleWrapper>
</DocBlock>

