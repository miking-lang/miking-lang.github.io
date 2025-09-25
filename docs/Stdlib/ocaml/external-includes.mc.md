import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# external-includes.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/sys.mc"} style={S.link}>sys.mc</a>, <a href={"/docs/Stdlib/ocaml/ast.mc"} style={S.link}>ocaml/ast.mc</a>, <a href={"/docs/Stdlib/set.mc"} style={S.link}>set.mc</a>, <a href={"/docs/Stdlib/ext/ext-test.ext-ocaml.mc"} style={S.link}>ext/ext-test.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/ext/math-ext.ext-ocaml.mc"} style={S.link}>ext/math-ext.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/ext/dist-ext.ext-ocaml.mc"} style={S.link}>ext/dist-ext.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/ext/matrix-ext.ext-ocaml.mc"} style={S.link}>ext/matrix-ext.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/ext/file-ext.ext-ocaml.mc"} style={S.link}>ext/file-ext.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/ext/toml-ext.ext-ocaml.mc"} style={S.link}>ext/toml-ext.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/ext/async-ext.ext-ocaml.mc"} style={S.link}>ext/async-ext.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/ext/rtppl-ext.ext-ocaml.mc"} style={S.link}>ext/rtppl-ext.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/ext/arr-ext.ext-ocaml.mc"} style={S.link}>ext/arr-ext.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/ext/mat-ext.ext-ocaml.mc"} style={S.link}>ext/mat-ext.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/ext/cblas-ext.ext-ocaml.mc"} style={S.link}>ext/cblas-ext.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/sundials/sundials.ext-ocaml.mc"} style={S.link}>sundials/sundials.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/sundials/ida.ext-ocaml.mc"} style={S.link}>sundials/ida.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/sundials/cvode.ext-ocaml.mc"} style={S.link}>sundials/cvode.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/sundials/kinsol.ext-ocaml.mc"} style={S.link}>sundials/kinsol.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/multicore/atomic.ext-ocaml.mc"} style={S.link}>multicore/atomic.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/multicore/thread.ext-ocaml.mc"} style={S.link}>multicore/thread.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/multicore/mutex.ext-ocaml.mc"} style={S.link}>multicore/mutex.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/multicore/cond.ext-ocaml.mc"} style={S.link}>multicore/cond.ext-ocaml.mc</a>, <a href={"/docs/Stdlib/ext/reflection-ext.ext-ocaml.mc"} style={S.link}>ext/reflection-ext.ext-ocaml.mc</a>  
  
## Types  
  

          <DocBlock title="ExternalImpl" kind="type">

```mc
type ExternalImpl : { expr: String, ty: Type, libraries: [String], cLibraries: [String] }
```



<ToggleWrapper text="Code..">
```mc
type ExternalImpl = {
  expr : String,
  ty : use Ast in Type,
  libraries : [String],
  cLibraries : [String]
}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="globalExternalImplsMap" kind="let">

```mc
let globalExternalImplsMap  : Map String [ExternalImpl]
```

<Description>{`NOTE\(oerikss, 2021\-04\-30\) Add your external maps here. This is a temporary  
solution. In the end we want to provide these definitions outside the  
compiler \(which will require some parsing\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let globalExternalImplsMap : Map String [ExternalImpl] =
  foldl1 mapUnion
    [
      extTestMap,               -- For testing purposes
      mathExtMap,
      arrExtMap,
      matExtMap,
      cblasExtMap,
      sundialsExtMap,
      idaExtMap,
      cvodeExtMap,
      kinsolExtMap,
      atomicExtMap,
      threadExtMap,
      mutexExtMap,
      condExtMap,
      distExtMap,
      matrixExtMap,
      fileExtMap,
      tomlExtMap,
      asyncExtMap,
      rtpplExtMap,
      reflectionMap
    ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="externalListOcamlPackages" kind="let">

```mc
let externalListOcamlPackages _ : () -> [(String, String)]
```

<Description>{`List OCaml packages available on the system. These are returned on the format  
\(name, version\). If \`dune\` is not available on the system, an empty  
sequence is returned.`}</Description>


<ToggleWrapper text="Code..">
```mc
let externalListOcamlPackages : () -> [(String, String)] = lam.
  let res = mapEmpty cmpString in
  if sysCommandExists "ocamlfind" then
    match sysRunCommand ["ocamlfind", "list"] "" "." with
      {stdout = stdout, returncode = returncode}
    then
      if eqi 0 returncode then
        -- Format is: \\`name (version: info)\\` delimited by newline
        let pkgs = map (strSplit "(version: ") (strSplit "\n" stdout) in
        let pkgs =
          map (lam x. (strTrim (head x), (init (join ((tail x)))))) pkgs
        in
        pkgs
      else
        printError
          (join
            ["externalListOcamlPackages: failed to run \\`ocamlfind list\\`",
             " cannot automatically find ocaml packages available the system\n"]);
        flushStderr;
        []
    else never
  else
    printError
      (join
        ["externalListOcamlPackages: ocamlfind not in PATH, cannot",
         " automatically find ocaml packages available the system\n"]);
    flushStderr;
    []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="externalGetSupportedExternalImpls" kind="let">

```mc
let externalGetSupportedExternalImpls _ : () -> Map String [ExternalImpl]
```

<Description>{`Filters all external implementations defined in \`globalExternalImplsMap\` to  
implementations supported on the current system.`}</Description>


<ToggleWrapper text="Code..">
```mc
let externalGetSupportedExternalImpls : () -> Map String [ExternalImpl] = lam.
  let syslibs =
    setOfSeq cmpString
      (map (lam x : (String, String). x.0) (externalListOcamlPackages ()))
  in
  -- We are unable to list available OCaml packages for this system so we
  -- assume that all dependencies are met.
  if setIsEmpty syslibs then globalExternalImplsMap
  -- Filter implementations to include only those with met dependencies on this
  -- system.
  else
    let newMap = mapEmpty cmpString in
    mapFoldWithKey
      (lam acc : Map String [ExternalImpl].
       lam x : String.
       lam impls : [ExternalImpl].
        let impls =
          filter
            (lam impl : ExternalImpl.
              forAll (lam lib. setMem lib syslibs) impl.libraries)
          impls
        in
        match impls with [] then acc else mapInsert x impls acc)
        (mapEmpty cmpString)
        globalExternalImplsMap
```
</ToggleWrapper>
</DocBlock>

