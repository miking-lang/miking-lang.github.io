import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateConstraints" kind="sem">

```mc
sem generateConstraints : CFA_GenFun
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraints graph =
  | TmDecl {decl = DeclLet { ident = ident, body = TmVar t, info = info }} ->
    let cstr = CstrDirect {
      lhs = name2intAcc graph.ia t.info t.ident,
      rhs = name2intAcc graph.ia info ident
    } in
    { graph with cstrs = cons cstr graph.cstrs }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exprName" kind="sem">

```mc
sem exprName : Ast_Expr -> Name
```



<ToggleWrapper text="Code..">
```mc
sem exprName =
  | TmVar t -> t.ident
```
</ToggleWrapper>
</DocBlock>

