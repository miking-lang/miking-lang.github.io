import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlRecordUpdate  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | OTmRecordUpdate {rec : Expr, updates : [(SID, Expr)]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_Expr_Expr" kind="sem">

```mc
sem smapAccumL_Expr_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Expr_Expr f acc =
  | OTmRecordUpdate t ->
    let updatesFunc = lam acc. lam update.
      match update with (key, value) in
      match f acc value with (acc, value) in
      (acc, (key, value))
    in
    match f acc t.rec with (acc, rec) in
    match mapAccumL updatesFunc acc t.updates with (acc, updates) in
    (acc, OTmRecordUpdate {t with rec = rec, updates = updates})
```
</ToggleWrapper>
</DocBlock>

