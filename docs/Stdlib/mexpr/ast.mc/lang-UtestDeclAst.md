import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestDeclAst  
  

DeclUtest \-\-

  
  
  
## Syntaxes  
  

          <DocBlock title="Decl" kind="syn">

```mc
syn Decl
```



<ToggleWrapper text="Code..">
```mc
syn Decl =
  | DeclUtest {test : Expr,
               expected : Expr,
               tusing : Option Expr,
               tonfail : Option Expr,
               info : Info}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoDecl" kind="sem">

```mc
sem infoDecl : Ast_Decl -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoDecl =
  | DeclUtest d -> d.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="declWithInfo" kind="sem">

```mc
sem declWithInfo : Info -> Ast_Decl -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
sem declWithInfo info =
  | DeclUtest d -> DeclUtest {d with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Decl_Expr" kind="sem">

```mc
sem smapAccumL_Decl_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Decl -> (acc, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Decl_Expr f acc =
  | DeclUtest x ->
    match f acc x.test with (acc, test) in
    match f acc x.expected with (acc, expected) in
    match optionMapAccum f acc x.tusing with (acc, tusing) in
    match optionMapAccum f acc x.tonfail with (acc, tonfail) in
    (acc, DeclUtest {x with test = test,
                            expected = expected,
                            tusing = tusing,
                            tonfail = tonfail})
```
</ToggleWrapper>
</DocBlock>

