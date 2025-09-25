import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConTypeTCUnify  
  

  
  
  
## Semantics  
  

          <DocBlock title="unifyCheckBase" kind="sem">

```mc
sem unifyCheckBase : TCEnv -> [Info] -> Set Name -> MetaVarTypeAst_MetaVarRec -> Ast_Type -> ()
```



<ToggleWrapper text="Code..">
```mc
sem unifyCheckBase env info boundVars tv =
  | TyCon t ->
    if optionMapOr true (lam r. lti tv.level r.0) (mapLookup t.ident env.tyConEnv) then
      let msg = join [
        "* Encountered a type constructor escaping its scope: ",
        nameGetStr t.ident, "\n",
        "* When type checking the expression\n"
      ] in
      errorSingle info msg
    else
      unifyCheckType env info boundVars tv t.data
```
</ToggleWrapper>
</DocBlock>

