import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# runtime-check.mc  
  

Instruments runtime safety checks in an AST. The current version includes  
bounds checking for sequence intrinsics such as get and set, and checking  
for division by zero.  
  
If a defined constraint is violated, the program will exit and print an  
error message referring to the intrinsic function used in the call \- i.e.  
not to the place where it was fully applied.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>, <a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>mexpr/ast-builder.mc</a>, <a href={"/docs/Stdlib/mexpr/cmp.mc"} style={S.link}>mexpr/cmp.mc</a>, <a href={"/docs/Stdlib/mexpr/eq.mc"} style={S.link}>mexpr/eq.mc</a>, <a href={"/docs/Stdlib/mexpr/const-arity.mc"} style={S.link}>mexpr/const-arity.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>mexpr/pprint.mc</a>  
  
## Languages  
  

          <DocBlock title="MExprRuntimeCheck" kind="lang" link="/docs/Stdlib/mexpr/runtime-check.mc/lang-MExprRuntimeCheck">

```mc
lang MExprRuntimeCheck
```



<ToggleWrapper text="Code..">
```mc
lang MExprRuntimeCheck = MExprAst + MExprArity + MExprCmp + MExprPrettyPrint
  -- This function returns a sequence of conditions that are to be checked at
  -- runtime for a given intrinsic. Each condition consists of a string
  -- message, which is printed if the condition turns out to be false, and an
  -- expression node which defines how the condition is checked. For an
  -- intrinsic with n parameters, the variables 0 up to n-1 represent its
  -- parameters in declaration order.
  sem intrinsicRuntimeConditions : Const -> [(String, Expr)]
  sem intrinsicRuntimeConditions =
  | CDivi _ | CModi _ -> [(_divByZeroMsg, _nonZeroCond (var_ "1"))]
  | CGet _ | CSet _ ->
    [ (_negIndexSeqAccessMsg, _nonNegativeCond (var_ "1"))
    , (_outOfBoundsSeqMsg, _lessThanLengthCond (var_ "1") (var_ "0")) ]
  | CHead _ -> [(_headEmptyMsg, _nonEmptySequenceCond (var_ "0"))]
  | CTail _ -> [(_tailEmptyMsg, _nonEmptySequenceCond (var_ "0"))]
  | CSplitAt _ ->
    [ (_splitAtNegIndexMsg, _nonNegativeCond (var_ "1"))
    , (_splitAtBeyondEndOfSeqMsg, leqi_ (var_ "1") (length_ (var_ "0"))) ]
  | CSubsequence _ ->
    [ (_subseqNegativeIndexMsg, _nonNegativeCond (var_ "1"))
    , (_subseqNegativeLenMsg, _nonNegativeCond (var_ "2")) ]
  | CTensorGetExn _ | CTensorSetExn _ ->
    [ (_tensorDimMismatchMsg, _tensorRankEq (var_ "0") (var_ "1"))
    , (_tensorShapeMismatchMsg, _tensorIdxShapeCond (var_ "0") (var_ "1")) ]
  | CTensorLinearGetExn _ | CTensorLinearSetExn _ ->
    [ (_negIndexTensorAccessMsg, _nonNegativeCond (var_ "1"))
    , (_outOfBoundsTensorMsg, _lessThanTensorSizeCond (var_ "0") (var_ "1")) ]
  | CTensorSliceExn _ ->
    [ (_tensorDimMismatchMsg, _tensorSliceIdxCond (var_ "0") (var_ "1"))
    , (_tensorShapeMismatchMsg, _tensorIdxShapeCond (var_ "0") (var_ "1")) ]
  | CTensorSubExn _ ->
    [ (_tensorSubNegativeOffsetMsg, _nonNegativeCond (var_ "1")),
      (_tensorSubNegativeLenMsg, _nonNegativeCond (var_ "2")),
      (_tensorSubBoundsMsg, _tensorSubBoundsCond (var_ "0") (var_ "1") (var_ "2")) ]
  | _ -> []

  sem collectUsedRuntimeCheckedIntrinsics : Set Const -> Expr -> Set Const
  sem collectUsedRuntimeCheckedIntrinsics used =
  | TmConst t ->
    if null (intrinsicRuntimeConditions t.val) then used
    else setInsert t.val used
  | t -> sfold_Expr_Expr collectUsedRuntimeCheckedIntrinsics used t

  sem defineRuntimeCheckedFunction : Name -> (Const, Name) -> Decl
  sem defineRuntimeCheckedFunction errId =
  | (intrinsic, id) ->
    -- NOTE(larshum, 2021-11-29): We don't store an info field for the
    -- runtime-checked intrinsic functions because they should catch runtime
    -- errors. In such cases, they will print the info of the intrinsic where
    -- the call originated from.
    recursive let generateCheck = lam infoId. lam cond : (String, Expr).
      ulet_ ""
        (if_ cond.1
          unit_
          (app_ (nvar_ errId) (concat_ (var_ infoId) (str_ cond.0)))) in
    recursive let addParam = lam acc : Expr. lam paramId : Name.
      nulam_ paramId acc in
    let conditions = intrinsicRuntimeConditions intrinsic in
    let arity = constArity intrinsic in
    let intrinsicArgs = create arity (lam i. int2string i) in
    let callBody = appSeq_ (uconst_ intrinsic) (map (lam a. var_ a) intrinsicArgs) in
    let infoId = "i" in
    let checks = map (generateCheck infoId) conditions in
    let body = bindall_ checks callBody in
    nulet_ id (ulams_ (cons infoId intrinsicArgs) body)

  sem defineRuntimeCheckedFunctions : [Const] -> (Map Const Name, [Decl])
  sem defineRuntimeCheckedFunctions =
  | used ->
    let errorFunctionId = nameSym "errfn" in
    let errorFunction =
      nulet_ errorFunctionId (ulam_ "msg"
        (bind_
          (ulet_ "" (printError_ (concat_ (var_ "msg") (str_ "\n"))))
          (exit_ (int_ 1)))) in
    let intrinsicName = lam c : Const.
      nameSym (cons '_' (getConstStringCode 0 c)) in
    let usedWithId = zip used (map intrinsicName used) in
    let intrinsicMap : Map Const Name = mapFromSeq cmpConst usedWithId in
    let runtimeCheckedFunctions =
      map (defineRuntimeCheckedFunction errorFunctionId) usedWithId in
    (intrinsicMap, cons errorFunction runtimeCheckedFunctions)

  sem callRuntimeCheckedFunctions : Map Const Name -> Expr -> Expr
  sem callRuntimeCheckedFunctions intrinsicIds =
  | TmConst t ->
    let charWithInfo = lam info. lam c.
      TmConst {val = CChar {val = c}, ty = TyUnknown {info = info},
               info = info} in
    let strWithInfo = lam info. lam str.
      TmSeq {tms = map (charWithInfo info) str, ty = TyUnknown {info = info},
             info = info} in
    match mapLookup t.val intrinsicIds with Some runtimeFuncId then
      let infoStr = infoErrorString t.info "" in
      TmApp {
        lhs = TmVar {ident = runtimeFuncId, ty = TyUnknown {info = t.info},
                     info = t.info, frozen = false},
        rhs = strWithInfo t.info infoStr,
        ty = TyUnknown {info = t.info}, info = t.info}
    else TmConst t
  | t -> smap_Expr_Expr (callRuntimeCheckedFunctions intrinsicIds) t

  sem injectRuntimeChecks : Expr -> Expr
  sem injectRuntimeChecks =
  | t ->
    let used = collectUsedRuntimeCheckedIntrinsics (setEmpty cmpConst) t in
    if mapIsEmpty used then t
    else
      let used = setToSeq used in
      match defineRuntimeCheckedFunctions used with (intrinsicIds, functions) in
      let t = callRuntimeCheckedFunctions intrinsicIds t in
      bindall_ functions t
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TestLang" kind="lang" link="/docs/Stdlib/mexpr/runtime-check.mc/lang-TestLang">

```mc
lang TestLang
```



<ToggleWrapper text="Code..">
```mc
lang TestLang = MExprRuntimeCheck + MExprPrettyPrint + MExprEq
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_divByZeroMsg" kind="let">

```mc
let _divByZeroMsg  : String
```

<Description>{`NOTE\(larshum, 2021\-11\-29\): The error messages and the error conditions are  
defined here so that they can be reused in the unit tests.`}</Description>


<ToggleWrapper text="Code..">
```mc
let _divByZeroMsg = "Division by zero"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_negIndexSeqAccessMsg" kind="let">

```mc
let _negIndexSeqAccessMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _negIndexSeqAccessMsg = "Negative index used to access sequence"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_outOfBoundsSeqMsg" kind="let">

```mc
let _outOfBoundsSeqMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _outOfBoundsSeqMsg = "Out of bounds access in sequence"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_headEmptyMsg" kind="let">

```mc
let _headEmptyMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _headEmptyMsg = "Head on empty sequence"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tailEmptyMsg" kind="let">

```mc
let _tailEmptyMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _tailEmptyMsg = "Tail on empty sequence"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_splitAtNegIndexMsg" kind="let">

```mc
let _splitAtNegIndexMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _splitAtNegIndexMsg = "Split at using negative index"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_splitAtBeyondEndOfSeqMsg" kind="let">

```mc
let _splitAtBeyondEndOfSeqMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _splitAtBeyondEndOfSeqMsg = "Split at index out of bounds"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_subseqNegativeIndexMsg" kind="let">

```mc
let _subseqNegativeIndexMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _subseqNegativeIndexMsg = "Subsequence using negative index"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_subseqNegativeLenMsg" kind="let">

```mc
let _subseqNegativeLenMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _subseqNegativeLenMsg = "Subsequence using negative length"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tensorDimMismatchMsg" kind="let">

```mc
let _tensorDimMismatchMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _tensorDimMismatchMsg = "Wrong number of dimensions used to access tensor"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tensorShapeMismatchMsg" kind="let">

```mc
let _tensorShapeMismatchMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _tensorShapeMismatchMsg = "Invalid indices used to access tensor"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_negIndexTensorAccessMsg" kind="let">

```mc
let _negIndexTensorAccessMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _negIndexTensorAccessMsg = "Negative index used to access tensor"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_outOfBoundsTensorMsg" kind="let">

```mc
let _outOfBoundsTensorMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _outOfBoundsTensorMsg = "Out of bounds access in tensor"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tensorSubNegativeOffsetMsg" kind="let">

```mc
let _tensorSubNegativeOffsetMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _tensorSubNegativeOffsetMsg = "Subtensor using negative offset"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tensorSubNegativeLenMsg" kind="let">

```mc
let _tensorSubNegativeLenMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _tensorSubNegativeLenMsg = "Subtensor using negative length"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tensorSubBoundsMsg" kind="let">

```mc
let _tensorSubBoundsMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _tensorSubBoundsMsg = "Subtensor out of bounds"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_nonEmptySequenceCond" kind="let">

```mc
let _nonEmptySequenceCond s : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _nonEmptySequenceCond = lam s. gti_ (length_ s) (int_ 0)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_nonZeroCond" kind="let">

```mc
let _nonZeroCond x : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _nonZeroCond = lam x. neqi_ x (int_ 0)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_nonNegativeCond" kind="let">

```mc
let _nonNegativeCond x : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _nonNegativeCond = lam x. geqi_ x (int_ 0)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_lessThanLengthCond" kind="let">

```mc
let _lessThanLengthCond x s : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _lessThanLengthCond = lam x. lam s. lti_ x (length_ s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tensorRankEq" kind="let">

```mc
let _tensorRankEq t idxs : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _tensorRankEq = lam t. lam idxs. eqi_ (utensorRank_ t) (length_ idxs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tensorIdxShapeCond" kind="let">

```mc
let _tensorIdxShapeCond t idxs : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _tensorIdxShapeCond = lam t. lam idxs.
  let sh = nameSym "sh" in
  let acc = nameSym "acc" in
  let i1 = nameSym "i" in
  let i2 = nameSym "i" in
  -- Checks that all indices in the sequence of indices are non-negative and
  -- less than the corresponding dimension of the tensor.
  foldl_
    (nulam_ acc (nulam_ i1
      (if_ (nvar_ acc)
        (if_ (geqi_ (get_ idxs (nvar_ i1)) (int_ 0))
          (lti_ (get_ idxs (nvar_ i1)) (get_ (utensorShape_ t) (nvar_ i1)))
          false_)
        false_)))
    true_
    (create_ (length_ idxs) (nulam_ i2 (nvar_ i2)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_lessThanTensorSizeCond" kind="let">

```mc
let _lessThanTensorSizeCond t linIdx : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _lessThanTensorSizeCond = lam t. lam linIdx.
  use MExprAst in
  lti_ linIdx (foldl_ (uconst_ (CMuli ())) (int_ 1) (utensorShape_ t))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tensorSliceIdxCond" kind="let">

```mc
let _tensorSliceIdxCond t idxs : Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _tensorSliceIdxCond = lam t. lam idxs.
  leqi_ (length_ idxs) (utensorRank_ t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tensorSubBoundsCond" kind="let">

```mc
let _tensorSubBoundsCond t ofs len : Ast_Expr -> Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let _tensorSubBoundsCond = lam t. lam ofs. lam len.
  leqi_ (addi_ ofs len) (head_ (utensorShape_ t))
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr

use TestLang in

let i = Info {filename = "test.txt", row1 = 1, col1 = 5, row2 = 1, col2 = 20} in

let id = lam c : Const. nameSym (cons '_' (getConstStringCode 0 c)) in
let errorFunctionId = nameSym "errfn" in
let err = lam msg. app_ (nvar_ errorFunctionId) (concat_ (var_ "i") (str_ msg)) in

let divId = id (CDivi ()) in
let expectedDivi =
  ulet_ "_divi" (ulam_ "i" (ulam_ "0" (ulam_ "1" (bind_
    (ulet_ ""
      (if_ (_nonZeroCond (var_ "1")) unit_ (err _divByZeroMsg)))
    (divi_ (var_ "0") (var_ "1")))))) in
utest defineRuntimeCheckedFunction errorFunctionId (CDivi (), divId)
with expectedDivi using eqDecl in

let headId = id (CHead ()) in
let expectedHead =
  ulet_ "_head" (ulam_ "i" (ulam_ "0" (bind_
    (ulet_ ""
      (if_ (_nonEmptySequenceCond (var_ "0")) unit_ (err _headEmptyMsg)))
    (head_ (var_ "0"))))) in
utest defineRuntimeCheckedFunction errorFunctionId (CHead (), headId)
with expectedHead using eqDecl in

let subseqId = id (CSubsequence ()) in
let expectedSubseq =
  ulet_ "_subsequence" (ulam_ "i" (ulam_ "0" (ulam_ "1" (ulam_ "2" (bindall_ [
    ulet_ ""
      (if_ (_nonNegativeCond (var_ "1"))
        unit_
        (err _subseqNegativeIndexMsg)),
    ulet_ ""
      (if_ (_nonNegativeCond (var_ "2"))
        unit_
        (err _subseqNegativeLenMsg))]
    (subsequence_ (var_ "0") (var_ "1") (var_ "2"))))))) in
utest defineRuntimeCheckedFunction errorFunctionId (CSubsequence (), subseqId)
with expectedSubseq using eqDecl in

let tensorGetId = id (CTensorGetExn ()) in
let expectedTensorGet =
  ulet_ "_tensorGet" (ulam_ "i" (ulam_ "0" (ulam_ "1" (bindall_ [
    ulet_ ""
      (if_ (_tensorRankEq (var_ "0") (var_ "1"))
        unit_
        (err _tensorDimMismatchMsg)),
    ulet_ ""
      (if_ (_tensorIdxShapeCond (var_ "0") (var_ "1"))
        unit_
        (err _tensorShapeMismatchMsg))]
    (utensorGetExn_ (var_ "0") (var_ "1")))))) in
utest defineRuntimeCheckedFunction errorFunctionId (CTensorGetExn (), tensorGetId)
with expectedTensorGet using eqDecl in

()
```
</ToggleWrapper>
</DocBlock>

