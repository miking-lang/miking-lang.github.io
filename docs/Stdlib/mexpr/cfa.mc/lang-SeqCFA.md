import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateConstraints" kind="sem">

```mc
sem generateConstraints : CFA_GenFun
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraints graph =
  | TmDecl {decl = DeclLet { ident = ident, body = TmSeq t, info = info }} ->
    let names = foldl (lam acc: [IName]. lam t: Expr.
      match t with TmVar t then
        cons (name2intAcc graph.ia t.info t.ident) acc
      else acc) [] t.tms
    in
    let av: AbsVal = AVSet { names = setOfSeq subi names } in
    let cstr = CstrInit { lhs = av, rhs = name2intAcc graph.ia info ident } in
    { graph with cstrs = cons cstr graph.cstrs }
```
</ToggleWrapper>
</DocBlock>

