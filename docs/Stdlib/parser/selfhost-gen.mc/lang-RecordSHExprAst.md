import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordSHExprAst  
  

  
  
  
## Types  
  

          <DocBlock title="RecordSHExprRecord" kind="type">

```mc
type RecordSHExprRecord : { info: Info, fields: [{ val: SHExpr, name: { i: Info, v: String } }] }
```



<ToggleWrapper text="Code..">
```mc
type RecordSHExprRecord =
    {info: Info, fields: [{val: SHExpr, name: {i: Info, v: String}}]}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="SHExpr" kind="syn">

```mc
syn SHExpr
```



<ToggleWrapper text="Code..">
```mc
syn SHExpr =
  | RecordSHExpr RecordSHExprRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_SHExpr_SHExpr" kind="sem">

```mc
sem smapAccumL_SHExpr_SHExpr : all a. (a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)) -> a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHExpr_SHExpr f acc =
  | RecordSHExpr x ->
    match
      match
        let fields = x.fields in
        mapAccumL
          (lam acc1.
             lam x1: {val: SHExpr, name: {i: Info, v: String}}.
               match
                 let val1 = x1.val in
                 f acc1 val1
               with
                 (acc1, val1)
               in
               (acc1, { x1 with val = val1 }))
          acc
          fields
      with
        (acc, fields)
      in
      (acc, { x with fields = fields })
    with
      (acc, x)
    in
    (acc, RecordSHExpr
        x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_SHExpr_info" kind="sem">

```mc
sem get_SHExpr_info : SelfhostBaseAst_SHExpr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_SHExpr_info =
  | RecordSHExpr target ->
    target.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_SHExpr_info" kind="sem">

```mc
sem set_SHExpr_info : Info -> SelfhostBaseAst_SHExpr -> SelfhostBaseAst_SHExpr
```



<ToggleWrapper text="Code..">
```mc
sem set_SHExpr_info val =
  | RecordSHExpr target ->
    RecordSHExpr
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

