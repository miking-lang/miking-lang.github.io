import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprBuildConfig  
  

  
  
  
## Types  
  

          <DocBlock title="BuildConfig" kind="type">

```mc
type BuildConfig : (String, String)
```



<ToggleWrapper text="Code..">
```mc
type BuildConfig = (String, String)
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="_duneBaseConfig" kind="sem">

```mc
sem _duneBaseConfig : String -> String -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _duneBaseConfig libstr =
  | flagstr ->
    strJoin "\n" [
      "(env",
      "  (dev",
      (join ["    (flags (", flagstr, "))"]),
      "    (ocamlc_flags (-without-runtime))))",
      "(executable",
      "  (name program)",
      join ["  (libraries ", libstr, ")"]]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_duneConfig" kind="sem">

```mc
sem _duneConfig : PMExprBuildBase_PMExprBuildOptions -> String -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _duneConfig options =
  | dir ->
    let libstr = strJoin " " (distinct eqString (cons "boot" options.libs)) in
    let flagstr =
      let clibstr =
        strJoin " " (map (concat "-cclib -l") (distinct eqString options.clibs))
      in
      concat ":standard -w a " clibstr
    in
    let buildCuda = hasAcceleratedCuda options.acceleratedCode in
    let buildFuthark = hasAcceleratedFuthark options.acceleratedCode in
    let baseConfig = _duneBaseConfig libstr flagstr in
    -- NOTE(larshum, 2022-05-16): Choose dune configurations based on which
    -- kinds of acceleration are used in the program.
    if and buildCuda buildFuthark then
      let linkFlags = join [
        "  (link_flags -I ", dir, " -cclib -l", cudaCodeName,
        "\n    -cclib -lcuda -cclib -lcudart -cclib -lnvrtc -cclib -lstdc++)"] in
      let foreignStubs = join [
        "  (foreign_stubs (language c) (names ", futharkCodeName, " ",
        futharkWrapperCodeName, ")))"] in
      strJoin "\n" [baseConfig, linkFlags, foreignStubs]
    else if buildCuda then
      let linkFlags = join [
        "  (link_flags -I ", dir, " -cclib -l", cudaCodeName, " -cclib -lcudart -cclib -lstdc++))"
      ] in
      strJoin "\n" [baseConfig, linkFlags]
    else if buildFuthark then
      let foreignStubs = join [
        "  (foreign_stubs (language c) (names ", futharkCodeName, " ",
        futharkWrapperCodeName, ")))"
      ] in
      strJoin "\n" [
        baseConfig,
        "  (link_flags -cclib -lcuda -cclib -lcudart -cclib -lnvrtc)",
        foreignStubs]
    else
      concat baseConfig ")"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_makefileConfig" kind="sem">

```mc
sem _makefileConfig : PMExprBuildBase_AcceleratedCode -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _makefileConfig =
  | acceleratedCode ->
    let buildCuda = hasAcceleratedCuda acceleratedCode in
    let buildFuthark = hasAcceleratedFuthark acceleratedCode in
    let cudaLibFile = join ["lib", cudaCodeName, ".a"] in
    let futharkCCodeFile = concat futharkCodeName ".c" in
    let futharkWrapperFile = concat futharkWrapperCodeName ".c" in
    let extraDependencies =
      if and buildCuda buildFuthark then
        strJoin " " [cudaLibFile, futharkCCodeFile, futharkWrapperFile]
      else if buildCuda then
        cudaLibFile
      else if buildFuthark then
        strJoin " " [futharkCCodeFile, futharkWrapperFile]
      else ""
    in
    let outdir = "_build/" in
    let outexec = concat outdir "default/program.exe" in
    let rebuildRules = strJoin "\n" [
      "clean:",
      join ["\trm -rf ", outdir, " ", extraDependencies],
      concat "rebuild: clean " outexec] in
    strJoin "\n" [
      join [outexec, ": program.ml ", extraDependencies],
      "\tdune build $@",
      join [cudaLibFile, ": ", cudaCodeName, ".cu"],
      "\tnvcc -I\\`ocamlc -where\\` $^ -lib -O3 -o $@",
      join [futharkCCodeFile, ": ", futharkCodeName, ".fut"],
      "\tfuthark cuda --library $^",
      rebuildRules]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="buildConfig" kind="sem">

```mc
sem buildConfig : PMExprBuildBase_PMExprBuildOptions -> String -> PMExprBuildConfig_BuildConfig
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem buildConfig options =
  | dir ->
    ( _duneConfig options dir
    , _makefileConfig options.acceleratedCode )
```
</ToggleWrapper>
</DocBlock>

