import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqOpTypeAst  
  

  
  
  
## Semantics  
  

          <DocBlock title="tyConstBase" kind="sem">

```mc
sem tyConstBase : Bool -> ConstAst_Const -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyConstBase d =
  | CSet _ -> mktyall_ "a" (lam a. tyarrows_ [tyseq_ a, tyint_, a, tyseq_ a])
  | CGet _ -> mktyall_ "a" (lam a. tyarrows_ [tyseq_ a, tyint_, a])
  | CCons _ -> mktyall_ "a" (lam a. tyarrows_ [a, tyseq_ a, tyseq_ a])
  | CSnoc _ -> mktyall_ "a" (lam a. tyarrows_ [tyseq_ a, a, tyseq_ a])
  | CConcat _ -> mktyall_ "a" (lam a. tyarrows_ [tyseq_ a, tyseq_ a, tyseq_ a])
  | CLength _ -> mktyall_ "a" (lam a. tyarrow_ (tyseq_ a) tyint_)
  | CReverse _ -> mktyall_ "a" (lam a. tyarrow_ (tyseq_ a) (tyseq_ a))
  | CHead _ -> mktyall_ "a" (lam a. tyarrow_ (tyseq_ a) a)
  | CTail _ -> mktyall_ "a" (lam a. tyarrow_ (tyseq_ a) (tyseq_ a))
  | CNull _ -> mktyall_ "a" (lam a. tyarrow_ (tyseq_ a) tybool_)
  | CMap _ ->
    mktyall_ "a" (lam a. mktyall_ "b" (lam b.
      tyarrows_ [ tyarrow_ a b, tyseq_ a, tyseq_ b ]))
  | CMapi _ ->
    mktyall_ "a" (lam a. mktyall_ "b" (lam b.
      tyarrows_ [ tyarrows_ [tyint_, a, b], tyseq_ a, tyseq_ b ]))
  | CIter _ ->
    mktyall_ "a" (lam a. tyarrows_ [tyarrow_ a tyunit_, tyseq_ a, tyunit_])
  | CIteri _ ->
    mktyall_ "a" (lam a. tyarrows_ [ tyarrows_ [tyint_, a, tyunit_],
                                     tyseq_ a, tyunit_ ])
  | CFoldl _ ->
    mktyall_ "a" (lam a. mktyall_ "b" (lam b.
      tyarrows_ [tyarrows_ [a, b, a], a, tyseq_ b, a ]))
  | CFoldr _ ->
    mktyall_ "a" (lam a. mktyall_ "b" (lam b.
      tyarrows_ [tyarrows_ [b, a, a], a, tyseq_ b, a ]))
  | CCreate _ ->
    mktyall_ "a" (lam a. tyarrows_ [tyint_, tyarrow_ tyint_ a, tyseq_ a])
  | CCreateList _ ->
    mktyall_ "a" (lam a. tyarrows_ [tyint_, tyarrow_ tyint_ a, tyseq_ a])
  | CCreateRope _ ->
    mktyall_ "a" (lam a. tyarrows_ [tyint_, tyarrow_ tyint_ a, tyseq_ a])
  | CIsList _ -> mktyall_ "a" (lam a. tyarrow_ (tyseq_ a) tybool_)
  | CIsRope _ -> mktyall_ "a" (lam a. tyarrow_ (tyseq_ a) tybool_)
  | CSplitAt _ ->
    mktyall_ "a" (lam a. tyarrows_ [ tyseq_ a, tyint_,
                                     tytuple_ [tyseq_ a, tyseq_ a]])
  | CSubsequence _ ->
    mktyall_ "a" (lam a. tyarrows_ [ tyseq_ a, tyint_, tyint_, tyseq_ a])
```
</ToggleWrapper>
</DocBlock>

