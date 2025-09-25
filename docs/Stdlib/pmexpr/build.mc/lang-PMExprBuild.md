import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprBuild  
  

  
  
  
## Semantics  
  

          <DocBlock title="addAccelerateBackendFiles" kind="sem">

```mc
sem addAccelerateBackendFiles : [(String, String)] -> PMExprBuildBase_GpuCompileResult -> [(String, String)]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addAccelerateBackendFiles files =
  | FutharkCompileResult (futharkAst, wrapperAst) ->
    concat
      files
      [ (concat futharkWrapperCodeName ".c", _pprintCAst wrapperAst)
      , (concat futharkCodeName ".fut", _pprintFutharkAst futharkAst) ]
  | CudaCompileResult cudaAst ->
    concat
      files
      [ (concat cudaCodeName ".cu", _pprintCudaAst cudaAst)
      , ("cuda-utils.cuh", cudaUtilsCode) ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addFileData" kind="sem">

```mc
sem addFileData : PMExprBuildBase_PMExprBuildOptions -> PMExprBuildConfig_BuildConfig -> [(String, String)]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addFileData options =
  | (dune, make) ->
    let baseFiles = [
      ("program.ml", _pprintOCamlTops options.ocamlTops),
      ("program.mli", ""),
      ("dune", dune),
      ("dune-project", "(lang dune 2.0)"),
      ("Makefile", make)] in
    foldl addAccelerateBackendFiles baseFiles
      (mapValues options.acceleratedCode)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_writeFiles" kind="sem">

```mc
sem _writeFiles : String -> [(String, String)] -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _writeFiles dir =
  | files ->
    let tempfile = lam f. sysJoinPath dir f in
    iter
      (lam fstr : (String, String).
        match fstr with (filename, text) in
        writeFile (tempfile filename) text)
      files
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="buildBinaryUsingMake" kind="sem">

```mc
sem buildBinaryUsingMake : PMExprBuildBase_PMExprBuildOptions -> String -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem buildBinaryUsingMake options =
  | td ->
    let dir = sysTempDirName td in
    let r = sysRunCommand ["make"] "" dir in
    (if neqi r.returncode 0 then
      print (join ["Compilation failed:\n\n", r.stderr]);
      sysTempDirDelete td;
      exit 1
    else ());
    let binPath = sysJoinPath dir "_build/default/program.exe" in
    let destFile =
      match options.output with Some o then o
      else filenameWithoutExtension (filename options.file) in
    sysMoveFile binPath destFile;
    sysChmodWriteAccessFile destFile;
    sysTempDirDelete td ();
    ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="buildAccelerated" kind="sem">

```mc
sem buildAccelerated : PMExprBuildBase_PMExprBuildOptions -> ()
```

<Description>{`TODO: Update uses of 'acceleratedCode' such that we can make the build  
process extensible.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem buildAccelerated =
  | options ->
    let td = sysTempDirMake () in
    let dir = sysTempDirName td in
    let config = buildConfig options dir in
    let files = addFileData options config in
    _writeFiles dir files;
    (if options.debugGenerate then
      printLn (join ["Output files saved at '", dir, "'"]);
      exit 0
    else ());
    buildBinaryUsingMake options td
```
</ToggleWrapper>
</DocBlock>

