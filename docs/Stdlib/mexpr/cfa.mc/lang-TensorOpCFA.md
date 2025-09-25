import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TensorOpCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="numConstIntermediates" kind="sem">

```mc
sem numConstIntermediates : ConstAst_Const -> Int
```



<ToggleWrapper text="Code..">
```mc
sem numConstIntermediates =
  | CTensorCreateInt _ -> 2
  | CTensorCreateFloat _ -> 2
  | CTensorCreate _ -> 2
  | CTensorIterSlice _ -> 4
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
  | ( CTensorCreateUninitInt _
    | CTensorCreateUninitFloat _
    | CTensorGetExn _
    | CTensorLinearGetExn _
    | CTensorReshapeExn _
    | CTensorCopy _
    | CTensorTransposeExn _
    | CTensorSliceExn _
    | CTensorSubExn _
    | CTensorShape _
    -- !! Higher-order !! --
    | CTensorCreateInt _
    | CTensorCreateFloat _
    | CTensorCreate _
    | CTensorIterSlice _
    -------------------
    ) & const -> addNewConst graph ident const

  | ( CTensorRank _
    | CTensorEq _
    | CTensorToString _ ) -> graph
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
  -- NOTE(2023-07-10,dlunde): We do not need to track integers and floats (at
  -- least in the basic analysis) and can therefore just initialize empty AVSets
  -- here.
  --
  | ( CTensorCreateUninitInt _
    | CTensorCreateUninitFloat _
    | CTensorShape _) ->
    -- NOTE(2023-07-12,dlunde): We can include CTensorShape here as well, since
    -- it only returns sequences of integers. For some analysis that want to
    -- track sequences of integer values (e.g., tensor shapes), this won't
    -- work.
    let av: AbsVal = AVSet { names = setEmpty subi } in
    [CstrInit { lhs = av, rhs = res }]
  | ( CTensorCreateInt _
    | CTensorCreateFloat _
    | CTensorCreate _ ) ->
    utest length args with 2 in
    let f = get args 1 in
    -- NOTE(2023-07-12,dlunde): We assume i is empty here. For some analysis
    -- that want to track sequences of integer values (e.g., tensor shapes),
    -- this won't work.
    match intermediates with [i,a1] in
    join [
      appConstraints f i a1,
      [CstrInit { lhs = AVSet {names = setOfSeq subi [a1]}, rhs = res }]
    ]
  | CTensorIterSlice _ ->
    utest length args with 2 in
    let f = get args 0 in
    let tensor = get args 1 in
    match intermediates with [ti,i,a1,empty] in
    join [
      [CstrSet {lhs = tensor, rhs = ti}],
      appConstraints f i a1,
      appConstraints a1 ti empty
    ]
  | ( CTensorGetExn _
    | CTensorLinearGetExn _ ) ->
    utest length args with 2 in
    [CstrSet { lhs = head args, rhs = res }]
  | CTensorReshapeExn _ ->
    utest length args with 2 in
    [CstrDirect {lhs = get args 0, rhs = res}]
  | CTensorCopy _ ->
    utest length args with 1 in
    [CstrDirect {lhs = get args 0, rhs = res}]
  | CTensorTransposeExn _ ->
    utest length args with 3 in
    [CstrDirect {lhs = get args 0, rhs = res}]
  | CTensorSliceExn _ ->
    utest length args with 2 in
    [CstrDirect {lhs = get args 0, rhs = res}]
  | CTensorSubExn _ ->
    utest length args with 3 in
    [CstrDirect {lhs = get args 0, rhs = res}]
```
</ToggleWrapper>
</DocBlock>

