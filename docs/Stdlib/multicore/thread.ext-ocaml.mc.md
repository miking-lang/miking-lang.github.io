import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# thread.ext-ocaml.mc  
  

  
  
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


          <DocBlock title="tyathread_" kind="let">

```mc
let tyathread_ _ : all a. a -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyathread_ = lam. tyunknown_
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


          <DocBlock title="threadExtMap" kind="let">

```mc
let threadExtMap  : Map String [{ty: Ast_Type, expr: String, libraries: [String], cLibraries: [String]}]
```



<ToggleWrapper text="Code..">
```mc
let threadExtMap =
  use OCamlTypeAst in
  mapFromSeq cmpString
  [ ("externalThreadSpawn", [
      impl
      { expr = "Domain.spawn"
      , ty = tyarrow_ (tyarrow_ otyunit_ (tygeneric_ "a")) (tyathread_ "a")
      }]),

    ("externalThreadJoin", [
      impl
      { expr = "Domain.join"
      , ty = tyarrow_ (tyathread_ "a") (tygeneric_ "a")
      }]),

    ("externalThreadGetID", [
      impl
      { expr = "Domain.get_id"
      , ty = tyarrow_ (tyathread_ "a") tyint_
      }]),

    ("externalThreadSelf", [
      impl
      { expr = "Domain.self"
      , ty = tyarrow_ otyunit_ tyint_
      }]),

    ("externalThreadCPURelax", [
      impl
      { expr = "Domain.cpu_relax"
      , ty = tyarrow_ otyunit_ otyunit_
      }])
  ]
```
</ToggleWrapper>
</DocBlock>

