import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ArithFloatPEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalReadbackH" kind="sem">

```mc
sem pevalReadbackH : PEvalCtx_PEvalCtx -> Ast_Expr -> (PEvalCtx_PEvalCtx, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem pevalReadbackH ctx =
  | t & TmConst (r & { val = CFloat v }) ->
    if ltf v.val 0. then
      let b = astBuilder r.info in
      (ctx, b.negf (b.float (negf v.val)))
    else (ctx, t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (c & (CAddf _ | CMulf _), args & [!TmConst _, TmConst _]) ->
    -- NOTE(oerikss, 2022-02-15): We move constants to the lhs for associative
    -- operators to make later simplifications easier.
    delta info (c, reverse args)
  | (c & CAddf _,
     args & [TmConst {val = CFloat x}, y & !TmConst {val = CFloat _}]) ->
    if eqf x.val 0. then y else
      let b = astBuilder info in
      b.appSeq (b.uconst c) args
  | (c & CAddf _, [x & TmVar r1, y & TmVar r2]) ->
    let b = astBuilder info in
    if nameEqSymUnsafe r1.ident r2.ident then b.mulf (b.float 2.) y
    else b.appSeq (b.uconst c) [x, y]
  | (c & CMulf _,
     args & [TmConst {val = CFloat x}, y & !TmConst {val = CFloat _}]) ->
    let b = astBuilder info in
    if eqf x.val 0. then b.float 0.
    else if eqf x.val 1. then y
    else b.appSeq (b.uconst c) args
  | (c & CSubf _,
     args & [TmConst {val = CFloat x}, y & !TmConst {val = CFloat _}]) ->
    let b = astBuilder info in
    if eqf x.val 0. then b.negf y else b.appSeq (b.uconst c) args
  | (c & CSubf _, args & [x & !TmConst {val = CFloat _}, TmConst {val = CFloat y}]) ->
    let b = astBuilder info in
    if eqf y.val 0. then x else b.appSeq (b.uconst c) args
  | (c & CSubf _, [x & TmVar r1, y & TmVar r2]) ->
    let b = astBuilder info in
    if nameEqSymUnsafe r1.ident r2.ident then b.float 0.
    else b.appSeq (b.uconst c) [x, y]
  | (c & (CDivf _), args & [TmConst {val = CFloat x}, y & !TmConst {val = CFloat _}]) ->
    let b = astBuilder info in
    if eqf x.val 0. then b.float 0. else b.appSeq (b.uconst c) args
  | (c & (CDivf _), args & [x, TmConst {val = CFloat y}]) ->
    let b = astBuilder info in
    if eqf y.val 0. then errorSingle [info] "Division by zero"
    else if eqf y.val 1. then x
    else b.appSeq (b.uconst c) args
```
</ToggleWrapper>
</DocBlock>

