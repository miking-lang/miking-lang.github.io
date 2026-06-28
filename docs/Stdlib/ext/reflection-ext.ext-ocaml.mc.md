import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# reflection-ext.ext-ocaml.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/ocaml/ast.mc"} style={S.link}>ocaml/ast.mc</a>  
  
## Variables  
  

          <DocBlock title="impl" kind="let">

```mc
let impl arg : all a. all a1. {ty: Ast_Type, expr: String} -> {ty: Ast_Type, expr: String, libraries: [a], cLibraries: [a1]}
```



<ToggleWrapper text="Code..">
```mc
let impl = lam arg : { expr : String, ty : use Ast in Type }.
  { expr = arg.expr, ty = arg.ty, libraries = [], cLibraries = [] }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reflectionMap" kind="let">

```mc
let reflectionMap  : Map String [{ty: Ast_Type, expr: String, libraries: [String], cLibraries: [String]}]
```



<ToggleWrapper text="Code..">
```mc
let reflectionMap =
  use OCamlTypeAst in
  mapFromSeq cmpString [
    ("isfloat", [
      impl {
        expr = "(fun x -> Obj.tag (Obj.repr x) = Obj.double_tag)",
        ty = tyarrows_ [tyfloat_, tybool_]
      }
    ])
  ]
```
</ToggleWrapper>
</DocBlock>

