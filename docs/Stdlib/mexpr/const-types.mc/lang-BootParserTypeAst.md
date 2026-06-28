import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BootParserTypeAst  
  

  
  
  
## Semantics  
  

          <DocBlock title="tyConstBase" kind="sem">

```mc
sem tyConstBase : Bool -> ConstAst_Const -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyConstBase d =
  | CBootParserParseMExprString _ ->
    mktybootparsetree_ d (lam b.
      tyarrows_ [
        tytuple_ [tybool_],
        tyseq_ tystr_,
        tystr_,
        b
      ])
  | CBootParserParseMLangString _ ->
    mktybootparsetree_ d (lam b.
      tyarrows_ [
        tystr_,
        b
      ])
  | CBootParserParseMLangFile _ ->
    mktybootparsetree_ d (lam b.
      tyarrows_ [
        tystr_,
        b
      ])
  | CBootParserParseMCoreFile _ ->
    mktybootparsetree_ d (lam b.
      tyarrows_ [
        tytuple_ [tybool_, tybool_ ,tyseq_ tystr_, tybool_, tybool_, tybool_],
        tyseq_ tystr_,
        tystr_,
        b
      ])
  | CBootParserGetId _ -> mktybootparsetree_ d (lam b. tyarrow_ b tyint_)
  | CBootParserGetTerm _ -> mktybootparsetree_ d (lam b. tyarrows_ [b, tyint_, b])
  | CBootParserGetTop _ -> mktybootparsetree_ d (lam b. tyarrows_ [b, tyint_, b])
  | CBootParserGetDecl _ -> mktybootparsetree_ d (lam b. tyarrows_ [b, tyint_, b])
  | CBootParserGetType _ -> mktybootparsetree_ d (lam b. tyarrows_ [b, tyint_, b])
  | CBootParserGetString _ -> mktybootparsetree_ d (lam b. tyarrows_ [b, tyint_, tystr_])
  | CBootParserGetInt _ -> mktybootparsetree_ d (lam b. tyarrows_ [b, tyint_, tyint_])
  | CBootParserGetFloat _ -> mktybootparsetree_ d (lam b. tyarrows_ [b, tyint_, tyfloat_])
  | CBootParserGetListLength _ -> mktybootparsetree_ d (lam b. tyarrows_ [b, tyint_, tyint_])
  | CBootParserGetConst _ -> mktybootparsetree_ d (lam b. tyarrows_ [b, tyint_, b])
  | CBootParserGetPat _ -> mktybootparsetree_ d (lam b. tyarrows_ [b, tyint_, b])
  | CBootParserGetCopat _ -> mktybootparsetree_ d (lam b. tyarrows_ [b, tyint_, b])
  | CBootParserGetInfo _ -> mktybootparsetree_ d (lam b. tyarrows_ [b, tyint_, b])
```
</ToggleWrapper>
</DocBlock>

