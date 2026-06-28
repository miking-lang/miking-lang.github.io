import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqOpEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CMap _, [f, TmSeq s]) ->
    let f = lam x. apply (evalCtxEmpty ()) info (f, x) in
    TmSeq {s with tms = map f s.tms}
  | (CMapi _, [f, TmSeq s]) ->
    let f = lam i. lam x.
      apply (evalCtxEmpty ()) info (apply (evalCtxEmpty ()) info (f, int_ i), x)
    in
    TmSeq {s with tms = mapi f s.tms}
  | (CIter _, [f, TmSeq s]) ->
    let f = lam x. apply (evalCtxEmpty ()) info (f, x); () in
    iter f s.tms;
    uunit_
  | (CIteri _, [f, TmSeq s]) ->
    let f = lam i. lam x.
      apply (evalCtxEmpty ()) info
        (apply (evalCtxEmpty ()) info (f, int_ i), x); ()
    in
    iteri f s.tms;
    uunit_
  | (CFoldl _, [f, acc, TmSeq s]) ->
    let f = lam acc. lam x.
      apply (evalCtxEmpty ()) info (apply (evalCtxEmpty ()) info (f, acc), x)
    in
    foldl f acc s.tms
  | (CFoldr _, [f, acc, TmSeq s]) ->
    let f = lam x. lam acc.
      apply (evalCtxEmpty ()) info (apply (evalCtxEmpty ()) info (f, x), acc)
    in
    foldr f acc s.tms
  | (CCreate _, [TmConst {val = CInt n}, f]) ->
    let f = lam i. apply (evalCtxEmpty ()) info (f, int_ i) in
    TmSeq {tms = create n.val f, ty = tyunknown_, info = NoInfo ()}
  | (CCreateList _, [TmConst {val = CInt n}, f]) ->
    let f = lam i. apply (evalCtxEmpty ()) info (f, int_ i) in
    TmSeq {tms = createList n.val f, ty = tyunknown_, info = NoInfo ()}
  | (CCreateRope _, [TmConst {val = CInt n}, f]) ->
    let f = lam i. apply (evalCtxEmpty ()) info (f, int_ i) in
    TmSeq {tms = createRope n.val f, ty = tyunknown_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>

