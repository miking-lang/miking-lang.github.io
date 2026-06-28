import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchFreeVars  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeVarsExpr" kind="sem">

```mc
sem freeVarsExpr : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeVarsExpr acc =
  | TmMatch r ->
    freeVarsExpr
      (freeVarsExpr
         (bindVarsPat
            (freeVarsExpr acc r.thn)
            r.pat)
         r.els)
      r.target
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bindVarsPat" kind="sem">

```mc
sem bindVarsPat : Set Name -> Ast_Pat -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem bindVarsPat acc =
  | PatNamed {ident = PName ident} -> setRemove ident acc
  | pat & (PatSeqEdge {middle = PName ident}) ->
    let acc = setRemove ident acc in
    sfold_Pat_Pat bindVarsPat acc pat
  | pat -> sfold_Pat_Pat bindVarsPat acc pat
```
</ToggleWrapper>
</DocBlock>

