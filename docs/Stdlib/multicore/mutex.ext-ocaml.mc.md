import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# mutex.ext-ocaml.mc  
  

  
  
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


          <DocBlock title="tymutex_" kind="let">

```mc
let tymutex_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tymutex_ = tyunknown_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mutexExtMap" kind="let">

```mc
let mutexExtMap  : Map String [{ty: Ast_Type, expr: String, libraries: [String], cLibraries: [String]}]
```



<ToggleWrapper text="Code..">
```mc
let mutexExtMap =
  use OCamlTypeAst in
  mapFromSeq cmpString
  [ ("externalMutexCreate", [
    impl
    { expr = "Mutex.create"
    , ty = tyarrow_ otyunit_ tymutex_
    }]),

    ("externalMutexLock", [
    impl
    { expr = "Mutex.lock"
    , ty = tyarrow_ tymutex_ otyunit_
    }]),

    ("externalMutexRelease", [
    impl
    { expr = "Mutex.unlock"
    , ty = tyarrow_ tymutex_ otyunit_
    }]),

    ("externalMutexTryLock", [
    impl
    { expr = "Mutex.try_lock"
    , ty = tyarrow_ tymutex_ tybool_
    }])
  ]
```
</ToggleWrapper>
</DocBlock>

