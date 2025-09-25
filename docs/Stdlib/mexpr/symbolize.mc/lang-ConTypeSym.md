import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConTypeSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeType" kind="sem">

```mc
sem symbolizeType : SymEnv -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeType env =
  | TyCon t ->
    let ident =
      getSymbol {kind = "type constructor",
                 info = [t.info],
                 allowFree = env.allowFree}
        env.currentEnv.tyConEnv t.ident
    in
    TyCon {t with ident = ident, data = symbolizeType env t.data}
```
</ToggleWrapper>
</DocBlock>

