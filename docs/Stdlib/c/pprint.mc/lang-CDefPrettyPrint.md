import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CDefPrettyPrint  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
HELPER FRAGMENT FOR DEFINITIONS \-\-  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
  
## Semantics  
  

          <DocBlock title="printCDef" kind="sem">

```mc
sem printCDef : PprintEnv -> CExprTypeAst_CType -> String -> Option CInitAst_CInit -> (PprintEnv, String)
```

<Description>{`Helper function for printing declarations and definitions`}</Description>


<ToggleWrapper text="Code..">
```mc
sem printCDef (env: PprintEnv) (ty: CType) (id: String) =
  | init ->
    match printCType id env ty with (env,decl) then
      match init with Some init then
        match printCInit env init with (env,init) then
          (env, join [decl, " = ", init])
        else never
      else match init with None _ then
        (env, decl)
      else never
    else never
```
</ToggleWrapper>
</DocBlock>

