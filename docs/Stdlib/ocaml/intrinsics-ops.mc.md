import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# intrinsics-ops.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/ocaml/ast.mc"} style={S.link}>ocaml/ast.mc</a>  
  
## Variables  
  

          <DocBlock title="intrinsicOpSeq" kind="let">

```mc
let intrinsicOpSeq  : String -> String
```



<ToggleWrapper text="Code..">
```mc
let intrinsicOpSeq = use OCamlAst in
  concat "Boot.Intrinsics.Mseq."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicOpSymb" kind="let">

```mc
let intrinsicOpSymb  : String -> String
```



<ToggleWrapper text="Code..">
```mc
let intrinsicOpSymb = use OCamlAst in
  concat "Boot.Intrinsics.Symb."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicOpFloat" kind="let">

```mc
let intrinsicOpFloat  : String -> String
```



<ToggleWrapper text="Code..">
```mc
let intrinsicOpFloat = use OCamlAst in
  concat "Boot.Intrinsics.FloatConversion."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicOpFile" kind="let">

```mc
let intrinsicOpFile  : String -> String
```



<ToggleWrapper text="Code..">
```mc
let intrinsicOpFile = use OCamlAst in
  concat "Boot.Intrinsics.File."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicOpIO" kind="let">

```mc
let intrinsicOpIO  : String -> String
```



<ToggleWrapper text="Code..">
```mc
let intrinsicOpIO = use OCamlAst in
  concat "Boot.Intrinsics.IO."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicOpSys" kind="let">

```mc
let intrinsicOpSys  : String -> String
```



<ToggleWrapper text="Code..">
```mc
let intrinsicOpSys = use OCamlAst in
  concat "Boot.Intrinsics.MSys."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicOpRand" kind="let">

```mc
let intrinsicOpRand  : String -> String
```



<ToggleWrapper text="Code..">
```mc
let intrinsicOpRand = use OCamlAst in
  concat "Boot.Intrinsics.RNG."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicOpTime" kind="let">

```mc
let intrinsicOpTime  : String -> String
```



<ToggleWrapper text="Code..">
```mc
let intrinsicOpTime = use OCamlAst in
  concat "Boot.Intrinsics.Time."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicOpConTag" kind="let">

```mc
let intrinsicOpConTag  : String -> String
```



<ToggleWrapper text="Code..">
```mc
let intrinsicOpConTag = use OCamlAst in
  concat "Boot.Intrinsics.ConTag."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicOpTensor" kind="let">

```mc
let intrinsicOpTensor  : String -> String
```



<ToggleWrapper text="Code..">
```mc
let intrinsicOpTensor = use OCamlAst in
  concat "Boot.Intrinsics.T."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="intrinsicOpBootparser" kind="let">

```mc
let intrinsicOpBootparser  : String -> String
```



<ToggleWrapper text="Code..">
```mc
let intrinsicOpBootparser = use OCamlAst in
  concat "Boot.Bootparser."
```
</ToggleWrapper>
</DocBlock>

