import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AllTypeTCUnify  
  

  
  
  
## Semantics  
  

          <DocBlock title="unifyCheckBase" kind="sem">

```mc
sem unifyCheckBase : TCEnv -> [Info] -> Set Name -> MetaVarTypeAst_MetaVarRec -> Ast_Type -> ()
```



<ToggleWrapper text="Code..">
```mc
sem unifyCheckBase env info boundVars tv =
  | TyAll t ->
    match tv.kind with Mono _ then
      let msg = join [
        "* Encountered a monomorphic type used in a polymorphic position.\n",
        "* Perhaps you encountered the value restriction, or need a type annotation?\n",
        "* When type checking the expression\n"
      ] in
      errorSingle info msg
    else
      unifyCheckKind env info boundVars tv t.kind;
      unifyCheckType env info (setInsert t.ident boundVars) tv t.ty
```
</ToggleWrapper>
</DocBlock>

