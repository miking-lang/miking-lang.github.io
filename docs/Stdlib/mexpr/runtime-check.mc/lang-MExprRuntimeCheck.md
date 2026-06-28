import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprRuntimeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="intrinsicRuntimeConditions" kind="sem">

```mc
sem intrinsicRuntimeConditions : ConstAst_Const -> [(String, Ast_Expr)]
```

<Description>{`This function returns a sequence of conditions that are to be checked at  
runtime for a given intrinsic. Each condition consists of a string  
message, which is printed if the condition turns out to be false, and an  
expression node which defines how the condition is checked. For an  
intrinsic with n parameters, the variables 0 up to n\-1 represent its  
parameters in declaration order.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectUsedRuntimeCheckedIntrinsics" kind="sem">

```mc
sem collectUsedRuntimeCheckedIntrinsics : Set ConstAst_Const -> Ast_Expr -> Set ConstAst_Const
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectUsedRuntimeCheckedIntrinsics used =
  | TmConst t ->
    if null (intrinsicRuntimeConditions t.val) then used
    else setInsert t.val used
  | t -> sfold_Expr_Expr collectUsedRuntimeCheckedIntrinsics used t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="defineRuntimeCheckedFunction" kind="sem">

```mc
sem defineRuntimeCheckedFunction : Name -> (ConstAst_Const, Name) -> Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="defineRuntimeCheckedFunctions" kind="sem">

```mc
sem defineRuntimeCheckedFunctions : [ConstAst_Const] -> (Map ConstAst_Const Name, [Ast_Decl])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="callRuntimeCheckedFunctions" kind="sem">

```mc
sem callRuntimeCheckedFunctions : Map ConstAst_Const Name -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="injectRuntimeChecks" kind="sem">

```mc
sem injectRuntimeChecks : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem injectRuntimeChecks =
  | t ->
    let used = collectUsedRuntimeCheckedIntrinsics (setEmpty cmpConst) t in
    if mapIsEmpty used then t
    else
      let used = setToSeq used in
      match defineRuntimeCheckedFunctions used with (intrinsicIds, functions) in
      let t = callRuntimeCheckedFunctions intrinsicIds t in
      bindall_ functions t
```
</ToggleWrapper>
</DocBlock>

