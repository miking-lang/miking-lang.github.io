import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# cond.ext-ocaml.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/ocaml/ast.mc"} style={S.link}>ocaml/ast.mc</a>, <a href={"/docs/Stdlib/multicore/mutex.ext-ocaml.mc"} style={S.link}>mutex.ext-ocaml.mc</a>  
  
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


          <DocBlock title="tycond_" kind="let">

```mc
let tycond_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tycond_ = tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="condExtMap" kind="let">

```mc
let condExtMap  : Map String [{ty: Ast_Type, expr: String, libraries: [String], cLibraries: [String]}]
```



<ToggleWrapper text="Code..">
```mc
let condExtMap =
  use OCamlTypeAst in
  mapFromSeq cmpString
  [ ("externalCondCreate", [
    impl
    { expr = "Condition.create"
    , ty = tyarrow_ otyunit_ tycond_
    }]),

    ("externalCondWait", [
    impl
    { expr = "Condition.wait"
    , ty = tyarrows_ [tycond_, tyunknown_, otyunit_]
    }]),

    ("externalCondSignal", [
    impl
    { expr = "Condition.signal"
    , ty = tyarrow_ tycond_ otyunit_
    }]),

    ("externalCondBroadcast", [
    impl
    { expr = "Condition.broadcast"
    , ty = tyarrow_ tycond_ otyunit_
    }])
  ]
```
</ToggleWrapper>
</DocBlock>

