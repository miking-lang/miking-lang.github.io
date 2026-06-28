import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NormPatMatch  
  

  
  
  
## Semantics  
  

          <DocBlock title="matchNormpat" kind="sem">

```mc
sem matchNormpat : (Ast_Expr, NormPat_NormPat) -> [Map Name NormPat_NormPat]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchNormpat =
  | (e, np) ->
    mapOption (lam p. matchNPat (e, p)) np
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchNPat" kind="sem">

```mc
sem matchNPat : (Ast_Expr, NormPat_NPat) -> Option (Map Name NormPat_NormPat)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchNPat =
  | (TmVar x, p) -> Some (mapFromSeq nameCmp [(x.ident, [p])])
  | (!TmVar _ & e, SNPat p) -> matchSNPat (e, p)
  | (!TmVar _ & e, NPatNot cons) ->
    if optionMapOr false (lam x. setMem x cons) (exprToSimpleCon e) then None ()
    else Some (mapEmpty nameCmp)
  | _ ->
    error "Impossible match in matchNPat!"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchSNPat" kind="sem">

```mc
sem matchSNPat : (Ast_Expr, NormPat_SNPat) -> Option (Map Name NormPat_NormPat)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchSNPat =
  | (_, p) -> Some (mapEmpty nameCmp)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exprToSimpleCon" kind="sem">

```mc
sem exprToSimpleCon : Ast_Expr -> Option NormPat_SimpleCon
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem exprToSimpleCon =
  | _ -> None ()
```
</ToggleWrapper>
</DocBlock>

