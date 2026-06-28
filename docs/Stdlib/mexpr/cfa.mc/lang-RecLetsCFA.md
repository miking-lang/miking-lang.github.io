import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateConstraints" kind="sem">

```mc
sem generateConstraints : CFA_GenFun
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraints graph =
  | TmDecl {decl = DeclRecLets { bindings = bindings }} ->
    let cstrs = map (lam b: DeclLetRecord.
        match b.body with TmLam t then
          let av: AbsVal = AVLam {
            ident = name2intAcc graph.ia t.info t.ident,
            body = name2intAcc graph.ia (infoTm t.body) (exprName t.body)
          } in
          CstrInit { lhs = av, rhs = name2intAcc graph.ia b.info b.ident }
        else errorSingle [infoTm b.body] "Not a lambda in recursive let body"
      ) bindings
    in
    { graph with cstrs = concat cstrs graph.cstrs }
```
</ToggleWrapper>
</DocBlock>

