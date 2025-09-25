import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TensorOpEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="_ofTmSeq" kind="sem">

```mc
sem _ofTmSeq : Info -> Ast_Expr -> [Int]
```



<ToggleWrapper text="Code..">
```mc
sem _ofTmSeq (info : Info) =
  | TmSeq {tms = tms} ->
    map
      (lam tm.
        match tm with TmConst {val = CInt {val = n}} then n
        else errorSingle [info] "Not an integer sequence")
      tms
  | tm -> dprint tm; errorSingle [info] "Not an integer sequence"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_toTmSeq" kind="sem">

```mc
sem _toTmSeq : [Int] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem _toTmSeq =
  | is ->
    let tms = map (lam i. int_ i) is in
    seq_ tms
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
  | (CTensorCreateUninitInt _, [shape]) ->
    TmTensor {val = TInt (tensorCreateUninitInt (_ofTmSeq info shape))}
  | (CTensorCreateUninitFloat _, [shape]) ->
    TmTensor {val = TFloat (tensorCreateUninitFloat (_ofTmSeq info shape))}
  | (CTensorCreateInt _, [shape, f]) ->
    let f = lam is.
      match apply (evalCtxEmpty ()) info (f, _toTmSeq is)
        with TmConst {val = CInt n} then n.val
      else errorSingle [info] "Expected integer from f in CTensorCreateInt"
    in
    TmTensor {val = TInt (tensorCreateCArrayInt (_ofTmSeq info shape) f)}
  | (CTensorCreateFloat _, [shape, f]) ->
    let f = lam is.
      match apply (evalCtxEmpty ()) info (f, _toTmSeq is)
        with TmConst {val = CFloat r} then r.val
      else errorSingle [info] "Expected float from f in CTensorCreateFloat"
    in
    TmTensor {val = TFloat (tensorCreateCArrayFloat (_ofTmSeq info shape) f)}
  | (CTensorCreate _, [shape, f]) ->
    let f = lam is. apply (evalCtxEmpty ()) info (f, _toTmSeq is) in
    TmTensor {val = TExpr (tensorCreateDense (_ofTmSeq info shape) f)}
  | (CTensorGetExn _, [TmTensor t, idx]) ->
    let idx = _ofTmSeq info idx in
    switch t.val
    case TInt t then
      let val = tensorGetExn t idx in
      int_ val
    case TFloat t then
      let val = tensorGetExn t idx in
      float_ val
    case TExpr t then
      let val = tensorGetExn t idx in
      val
    end
  | (CTensorSetExn _, [TmTensor t, idx, val]) ->
    let idx = _ofTmSeq info idx in
    switch (t.val, val)
    case (TInt t, TmConst {val = CInt v}) then
      tensorSetExn t idx v.val;
      uunit_
    case (TFloat t, TmConst {val = CFloat v}) then
      tensorSetExn t idx v.val;
      uunit_
    case (TExpr t, v) then
      tensorSetExn t idx v;
      uunit_
    case _ then error "Impossible case in delta!"
    end
  | (CTensorLinearGetExn _, [TmTensor t, TmConst {val = CInt n}]) ->
    switch t.val
      case TInt t then
      let val = tensorLinearGetExn t n.val in
      int_ val
      case TFloat t then
      let val = tensorLinearGetExn t n.val in
      float_ val
      case TExpr t then
      let val = tensorLinearGetExn t n.val in
      val
    end
  | (CTensorLinearSetExn _, [TmTensor t, TmConst {val = CInt n}, val]) ->
    switch (t.val, val)
    case (TInt t, TmConst {val = CInt {val = v}}) then
      tensorLinearSetExn t n.val v;
      uunit_
    case (TFloat t, TmConst {val = CFloat {val = v}}) then
      tensorLinearSetExn t n.val v;
      uunit_
    case (TExpr t, v) then
      tensorLinearSetExn t n.val v;
      uunit_
    case _ then error "Impossible case in delta!"
    end
  | (CTensorRank _, [TmTensor t]) ->
    switch t.val
      case TInt t then int_ (tensorRank t)
      case TFloat t then int_ (tensorRank t)
      case TExpr t then int_ (tensorRank t)
    end
  | (CTensorShape _, [TmTensor t]) ->
    switch t.val
      case TInt t then _toTmSeq (tensorShape t)
      case TFloat t then _toTmSeq (tensorShape t)
      case TExpr t then _toTmSeq (tensorShape t)
    end
  | (CTensorReshapeExn _, [TmTensor t, idx]) ->
    let idx = _ofTmSeq info idx in
    switch t.val
    case TInt t then
      let view = tensorReshapeExn t idx in
      TmTensor {val = TInt view}
    case TFloat t then
      let view = tensorReshapeExn t idx in
      TmTensor {val = TFloat view}
    case TExpr t then
      let view = tensorReshapeExn t idx in
      TmTensor {val = TExpr view}
    end
  | (CTensorCopy _, [TmTensor t]) ->
    switch t.val
    case TInt t then
      let tt = tensorCopy t in
      TmTensor {val = TInt tt}
    case TFloat t then
      let tt = tensorCopy t in
      TmTensor {val = TFloat tt}
    case TExpr t then
      let tt = tensorCopy t in
      TmTensor {val = TExpr tt}
    end
  | (CTensorTransposeExn _, [
    TmTensor t, TmConst {val = CInt n1}, TmConst {val = CInt n2}
  ]) ->
    switch t.val
      case TInt t then
      let tt = tensorTransposeExn t n1.val n2.val in
      TmTensor {val = TInt tt}
      case TFloat t then
      let tt = tensorTransposeExn t n1.val n2.val in
      TmTensor {val = TFloat tt}
      case TExpr t then
      let tt = tensorTransposeExn t n1.val n2.val in
      TmTensor {val = TExpr tt}
    end
  | (CTensorSliceExn _, [TmTensor t, idx]) ->
    let idx = _ofTmSeq info idx in
    switch t.val
    case TInt t then
      let view = tensorSliceExn t idx in
      TmTensor {val = TInt view}
    case TFloat t then
      let view = tensorSliceExn t idx in
      TmTensor {val = TFloat view}
    case TExpr t then
      let view = tensorSliceExn t idx in
      TmTensor {val = TExpr view}
    end
  | (CTensorSubExn _, [
    TmTensor t, TmConst {val = CInt ofs}, TmConst {val = CInt len}
  ]) ->
    switch t.val
      case TInt t then
      let view = tensorSubExn t ofs.val len.val in
      TmTensor {val = TInt view}
      case TFloat t then
      let view = tensorSubExn t ofs.val len.val in
      TmTensor {val = TFloat view}
      case TExpr t then
      let view = tensorSubExn t ofs.val len.val in
      TmTensor {val = TExpr view}
    end
  | (CTensorIterSlice _, [f, TmTensor t]) ->
    let mkg = lam mkt. lam i. lam r.
      let res =
        apply (evalCtxEmpty ()) info
          (apply (evalCtxEmpty ()) info (f, int_ i), TmTensor {val = mkt r})
      in
      ()
    in
    switch t.val
    case TInt t then
      let g = mkg (lam t. TInt t) in
      tensorIterSlice g t;
      uunit_
    case TFloat t then
      let g = mkg (lam t. TFloat t) in
      tensorIterSlice g t;
      uunit_
    case TExpr t then
      let g = mkg (lam t. TExpr t) in
      tensorIterSlice g t;
      uunit_
    end
  | (CTensorEq _, [eq, TmTensor t1, TmTensor t2]) ->
    let mkeq
      : all a. all b.
        (a -> Expr) -> (b -> Expr) -> Tensor[a] -> Tensor[b] -> Bool =
      lam wrapx. lam wrapy. lam t1. lam t2.
        let eq = lam x. lam y.
          match
            apply (evalCtxEmpty ()) info
              (apply (evalCtxEmpty ()) info (eq, wrapx x), wrapy y)
            with TmConst {val = CBool {val = b}}
          then b
          else errorSingle [info] "Invalid equality function"
        in
        tensorEq eq t1 t2
    in
    let result =
      switch t1.val
      case TInt t1 then
        switch t2.val
        case TInt t2 then mkeq int_ int_ t1 t2
        case TFloat t2 then mkeq int_ float_ t1 t2
        case TExpr t2 then mkeq int_ (lam x. x) t1 t2
        end
      case TFloat t1 then
        switch t2.val
        case TInt t2 then mkeq float_ int_ t1 t2
        case TFloat t2 then mkeq float_ float_ t1 t2
        case TExpr t2 then mkeq float_ (lam x. x) t1 t2
        end
      case TExpr t1 then
        switch t2.val
        case TInt t2 then mkeq (lam x. x) int_ t1 t2
        case TFloat t2 then mkeq (lam x. x) float_ t1 t2
        case TExpr t2 then mkeq (lam x. x) (lam x. x) t1 t2
        end
      end
    in
    bool_ result
  | (CTensorToString _, [el2str, TmTensor t]) ->
    let el2str = lam x.
      match apply (evalCtxEmpty ()) info (el2str, x) with TmSeq {tms = tms} then
        _evalSeqOfCharsToString info tms
      else errorSingle [info] "Invalid element to string function"
    in
    let str =
      switch t.val
      case TInt t then tensor2string (lam x. el2str (int_ x)) t
      case TFloat t then tensor2string (lam x. el2str (float_ x)) t
      case TExpr t then tensor2string el2str t
      end
    in
    seq_ (_evalStringToSeqOfChars str)
```
</ToggleWrapper>
</DocBlock>

