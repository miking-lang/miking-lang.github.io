import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TokenSHDeclAst  
  

  
  
  
## Types  
  

          <DocBlock title="TokenSHDeclRecord" kind="type">

```mc
type TokenSHDeclRecord : { info: Info, name: Option { i: Info, v: Name }, properties: [{ val: SHExpr, name: { i: Info, v: String } }] }
```



<ToggleWrapper text="Code..">
```mc
type TokenSHDeclRecord =
    {info: Info, name: Option {i: Info, v: Name}, properties: [{val: SHExpr, name: {i: Info, v: String}}]}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="SHDecl" kind="syn">

```mc
syn SHDecl
```



<ToggleWrapper text="Code..">
```mc
syn SHDecl =
  | TokenSHDecl TokenSHDeclRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_SHDecl_SHExpr" kind="sem">

```mc
sem smapAccumL_SHDecl_SHExpr : all a. (a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)) -> a -> SelfhostBaseAst_SHDecl -> (a, SelfhostBaseAst_SHDecl)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHDecl_SHExpr f acc =
  | TokenSHDecl x ->
    match
      match
        let properties = x.properties in
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
          properties
      with
        (acc, properties)
      in
      (acc, { x with properties = properties })
    with
      (acc, x)
    in
    (acc, TokenSHDecl
        x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_SHDecl_info" kind="sem">

```mc
sem get_SHDecl_info : SelfhostBaseAst_SHDecl -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_SHDecl_info =
  | TokenSHDecl target ->
    target.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_SHDecl_info" kind="sem">

```mc
sem set_SHDecl_info : Info -> SelfhostBaseAst_SHDecl -> SelfhostBaseAst_SHDecl
```



<ToggleWrapper text="Code..">
```mc
sem set_SHDecl_info val =
  | TokenSHDecl target ->
    TokenSHDecl
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

