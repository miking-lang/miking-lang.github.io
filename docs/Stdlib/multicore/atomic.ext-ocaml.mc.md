import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# atomic.ext-ocaml.mc  
  

  
  
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


          <DocBlock title="tyaref_" kind="let">

```mc
let tyaref_ _ : all a. a -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyaref_ = lam. tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tygeneric_" kind="let">

```mc
let tygeneric_ _ : all a. a -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tygeneric_ = lam. tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="atomicExtMap" kind="let">

```mc
let atomicExtMap  : Map String [{ty: Ast_Type, expr: String, libraries: [String], cLibraries: [String]}]
```



<ToggleWrapper text="Code..">
```mc
let atomicExtMap =
  use OCamlTypeAst in
  mapFromSeq cmpString
  [ ("externalAtomicMake", [
      impl
      { expr = "Atomic.make"
      , ty = tyarrow_ (tygeneric_ "a") (tyaref_ "a")
      }]),

    ("externalAtomicGet", [
      impl
      { expr = "Atomic.get"
      , ty = tyarrow_ (tyaref_ "a") (tygeneric_ "a")
      }]),

    ("externalAtomicExchange", [
      impl
      { expr = "Atomic.exchange"
      , ty = tyarrows_ [tyaref_ "a", tygeneric_ "a", tygeneric_ "a"]
      }]),

    ("externalAtomicCAS", [
      impl
      { expr = "Atomic.compare_and_set"
      , ty = tyarrows_ [ tyaref_ "a"
                       , tygeneric_ "a"
                       , tygeneric_ "a"
                       , tybool_
                       ]
      }]),

    ("externalAtomicFetchAndAdd", [
      impl
      { expr = "Atomic.fetch_and_add"
      , ty = tyarrows_ [tyaref_ "Int", tyint_, tyint_]
      }])
  ]
```
</ToggleWrapper>
</DocBlock>

