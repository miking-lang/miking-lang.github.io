import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TensorOpTypeAst  
  

  
  
  
## Semantics  
  

          <DocBlock title="tyConstBase" kind="sem">

```mc
sem tyConstBase : Bool -> ConstAst_Const -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyConstBase d =
  | CTensorCreateUninitInt _ -> tytensorcreateuninitint_
  | CTensorCreateUninitFloat _ -> tytensorcreateuninitfloat_
  | CTensorCreateInt _ -> tytensorcreateint_
  | CTensorCreateFloat _ -> tytensorcreatefloat_
  | CTensorCreate _ -> mktyall_ "a" (lam a. tytensorcreate_ a)
  | CTensorGetExn _ -> mktyall_ "a" (lam a. tytensorgetexn_ a)
  | CTensorSetExn _ -> mktyall_ "a" (lam a. tytensorsetexn_ a)
  | CTensorLinearGetExn _ -> mktyall_ "a" (lam a. tytensorlineargetexn_ a)
  | CTensorLinearSetExn _ -> mktyall_ "a" (lam a. tytensorlinearsetexn_ a)
  | CTensorRank _ -> mktyall_ "a" (lam a. tytensorrank_ a)
  | CTensorShape _ -> mktyall_ "a" (lam a. tytensorshape_ a)
  | CTensorReshapeExn _ -> mktyall_ "a" (lam a. tytensorreshapeexn_ a)
  | CTensorCopy _ -> mktyall_ "a" (lam a. tytensorcopy_ a)
  | CTensorTransposeExn _ -> mktyall_ "a" (lam a. tytensortransposeexn_ a)
  | CTensorSliceExn _ -> mktyall_ "a" (lam a. tytensorsliceexn_ a)
  | CTensorSubExn _ -> mktyall_ "a" (lam a. tytensorsubexn_ a)
  | CTensorIterSlice _ -> mktyall_ "a" (lam a. tytensoriteri_ a)
  | CTensorEq _ -> mktyall_ "a" (lam a. mktyall_ "b" (lam b. tytensoreq_ a b))
  | CTensorToString _ -> mktyall_ "a" (lam a. tytensortostring_ a)
```
</ToggleWrapper>
</DocBlock>

