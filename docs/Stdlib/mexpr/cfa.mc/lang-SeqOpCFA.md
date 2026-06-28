import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqOpCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="numConstIntermediates" kind="sem">

```mc
sem numConstIntermediates : ConstAst_Const -> Int
```

<Description>{`The number`}</Description>


<ToggleWrapper text="Code..">
```mc
sem numConstIntermediates =
  | CFoldl _ -> 4
  | CFoldr _ -> 3
  | CMap _ -> 2
  | CMapi _ -> 4
  | CIter _ -> 2
  | CIteri _ -> 4
  | ( CCreate _
    | CCreateList _
    | CCreateRope _ )
    -> 2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : CFA_CFAGraphInit -> Info -> IName -> ConstAst_Const -> CFA_CFAGraphInit
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst graph info ident =
  | ( CSet _
    | CGet _
    | CCons _
    | CSnoc _
    | CConcat _
    | CReverse _
    | CHead _
    | CTail _
    | CSubsequence _
    | CSplitAt _
    -- !! Higher-order !! --
    | CFoldl _
    | CFoldr _
    | CMap _
    | CMapi _
    | CIter _
    | CIteri _
    | CCreate _
    | CCreateList _
    | CCreateRope _
    -----------------
    ) & const ->
      addNewConst graph ident const

  | ( CLength _
    | CNull _
    | CIsList _
    | CIsRope _
    ) -> graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateConstraintConst" kind="sem">

```mc
sem propagateConstraintConst : CFA_ConstPropFun
```



<ToggleWrapper text="Code..">
```mc
sem propagateConstraintConst res args intermediates =
  | CSet _ ->
    utest length args with 3 in
    let seq = get args 0 in
    let val = get args 2 in
    [CstrSetUnion {lhs = seq, rhs = val, res = res}]
  | CGet _ ->
    utest length args with 2 in
    [CstrSet {lhs = head args, rhs = res}]
  | CCons _ ->
    utest length args with 2 in
    let val = get args 0 in
    let seq = get args 1 in
    [CstrSetUnion {lhs = seq, rhs = val, res = res}]
  | CSnoc _ ->
    utest length args with 2 in
    let seq = get args 0 in
    let val = get args 1 in
    [CstrSetUnion {lhs = seq, rhs = val, res = res}]
  | CConcat _ ->
    utest length args with 2 in
    [
      CstrDirect {lhs = head args, rhs = res},
      CstrDirect {lhs = get args 1, rhs = res}
    ]
  | CReverse _ ->
    utest length args with 1 in
    [CstrDirect {lhs = head args, rhs = res}]
  | CHead _ ->
    utest length args with 1 in
    [CstrSet {lhs = head args, rhs = res}]
  | CTail _ ->
    utest length args with 1 in
    [CstrDirect {lhs = head args, rhs = res}]
  | CSubsequence _ ->
    utest length args with 3 in
    [CstrDirect {lhs = head args, rhs = res}]
  | CSplitAt _ ->
    utest length args with 2 in
    let seq = head args in
    let bindings = mapEmpty subi in
    let bindings = mapInsert (stringToSid "0") seq bindings in
    let bindings = mapInsert (stringToSid "1") seq bindings in
    [CstrInit {lhs = AVRec { bindings = bindings }, rhs = res}]

  -- !! Higher-order !! --
  | CFoldl _ ->
    utest length args with 3 in
    let seq = get args 2 in
    let f = head args in
    let acc = get args 1 in
    match intermediates with [li,a1,a2,a3] in
    join [
      [CstrDirect { lhs = acc, rhs = res }],
      [CstrSet { lhs = seq, rhs = li }],
      appConstraints f acc a1,
      appConstraints a1 li a2,
      [CstrDirect { lhs = a2, rhs = res }],
      appConstraints f a2 a3,
      appConstraints a3 li res
    ]
  | CFoldr _ ->
    utest length args with 3 in
    let seq = get args 2 in
    let f = head args in
    let acc = get args 1 in
    match intermediates with [li,a1,a2] in
    join [
      [CstrDirect { lhs = acc, rhs = res }],
      [CstrSet { lhs = seq, rhs = li }],
      appConstraints f li a1,
      appConstraints a1 acc a2,
      [CstrDirect { lhs = a2, rhs = res }],
      appConstraints a1 a2 res
    ]
  | CMap _ ->
    utest length args with 2 in
    let seq = get args 1 in
    let f = head args in
    match intermediates with [li,a1] in
    join [
      [CstrSet { lhs = seq, rhs = li }],
      appConstraints f li a1,
      [CstrInit { lhs = AVSet {names = setOfSeq subi [a1]}, rhs = res }]
    ]
  | CMapi _ ->
    utest length args with 2 in
    let seq = get args 1 in
    let f = head args in
    -- NOTE(2023-07-12,dlunde): We assume i is empty here. For some analysis
    -- that want to track integer values, this won't work.
    match intermediates with [li,i,a1,a2] in
    join [
      [CstrSet { lhs = seq, rhs = li }],
      appConstraints f i a1,
      appConstraints a1 li a2,
      [CstrInit { lhs = AVSet {names = setOfSeq subi [a2]}, rhs = res }]
    ]
  | CIter _ ->
    utest length args with 2 in
    let seq = get args 1 in
    let f = head args in
    match intermediates with [li,empty] in
    join [
      [CstrSet { lhs = seq, rhs = li }],
      appConstraints f li empty
    ]
  | CIteri _ ->
    utest length args with 2 in
    let seq = get args 1 in
    let f = head args in
    -- NOTE(2023-07-12,dlunde): We assume i is empty here. For some analysis
    -- that want to track integer values, this won't work.
    match intermediates with [li,i,a1,empty] in
    join [
      [CstrSet { lhs = seq, rhs = li }],
      appConstraints f i a1,
      appConstraints a1 li empty
    ]
  | ( CCreate _
    | CCreateList _
    | CCreateRope _
    ) ->
    utest length args with 2 in
    let f = get args 1 in
    -- NOTE(2023-07-12,dlunde): We assume i is empty here. For some analysis
    -- that want to track integer values, this won't work.
    match intermediates with [i,a1] in
    join [
      appConstraints f i a1,
      [CstrInit { lhs = AVSet {names = setOfSeq subi [a1]}, rhs = res }]
    ]
```
</ToggleWrapper>
</DocBlock>

