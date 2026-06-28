import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IOTypeAst  
  

  
  
  
## Semantics  
  

          <DocBlock title="tyConstBase" kind="sem">

```mc
sem tyConstBase : Bool -> ConstAst_Const -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyConstBase d =
  | CPrint _ -> tyarrow_ tystr_ tyunit_
  | CPrintError _ -> tyarrow_ tystr_ tyunit_
  | CDPrint _ -> mktyall_ "a" (lam a. tyarrow_ a tyunit_)
  | CFlushStdout _ -> tyarrow_ tyunit_ tyunit_
  | CFlushStderr _ -> tyarrow_ tyunit_ tyunit_
  | CReadLine _ -> tyarrow_ tyunit_ tystr_
  | CReadBytesAsString _ -> tyarrow_ tyint_ (tytuple_ [tystr_, tystr_])
```
</ToggleWrapper>
</DocBlock>

