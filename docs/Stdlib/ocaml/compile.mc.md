import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# compile.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/sys.mc"} style={S.link}>sys.mc</a>  
  
## Types  
  

          <DocBlock title="CompileOptions" kind="type">

```mc
type CompileOptions : { optimize: Bool, libraries: [String], cLibraries: [String] }
```



<ToggleWrapper text="Code..">
```mc
type CompileOptions = {
  optimize : Bool,
  libraries : [String],
  cLibraries : [String]
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Program" kind="type">

```mc
type Program : String -> [String] -> ExecResult
```



<ToggleWrapper text="Code..">
```mc
type Program = String -> [String] -> ExecResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CompileResult" kind="type">

```mc
type CompileResult : { run: Program, cleanup: () -> (), binaryPath: String }
```



<ToggleWrapper text="Code..">
```mc
type CompileResult = {
  run : Program,
  cleanup : () -> (),
  binaryPath : String
}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="defaultCompileOptions" kind="let">

```mc
let defaultCompileOptions  : CompileOptions
```



<ToggleWrapper text="Code..">
```mc
let defaultCompileOptions : CompileOptions = {
  optimize = true,
  libraries = [],
  cLibraries = []
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ocamlCompileWithConfig" kind="let">

```mc
let ocamlCompileWithConfig options p : CompileOptions -> String -> CompileResult
```



<ToggleWrapper text="Code..">
```mc
let ocamlCompileWithConfig : CompileOptions -> String -> CompileResult
  = lam options : CompileOptions. lam p.
    let td = sysTempDirMake () in
    let dir = sysTempDirName td in
    let tempfile = lam f. sysJoinPath dir f in

    let libflags =
      joinMap (lam x. ["-package", x]) (distinct eqString (cons "boot" options.libraries))
    in
    let clibflags =
      joinMap (lam x. ["-cclib", concat "-l" x]) (distinct eqString options.cLibraries) in
    let otherflags =
      ["-linkpkg", "-thread", "-w", "-a"] in
    let flags = join
      [ clibflags, libflags, otherflags
      , if options.optimize
        then ["-O3"]
        else ["-linscan", "-inline", "1"]
      ] in
    let command = join
      [ ["ocamlfind", "ocamlopt"]
      , flags
      , ["program.mli", "program.ml", "-o", tempfile "program.exe"]
      ] in

    writeFile (tempfile "program.ml") p;
    writeFile (tempfile "program.mli") "";

    let r = sysRunCommand command "" dir in
    if neqi r.returncode 0 then
        print (join ["'", strJoin " " command, "' failed on program:\n\n",
                     readFile (tempfile "program.ml"),
                     "\n\nexit code: ",
                     int2string r.returncode,
                     "\n\nstandard out:\n", r.stdout,
                     "\n\nstandard error:\n", r.stderr]);
        sysTempDirDelete td;
        exit 1
    else ();

    {
      run =
        lam stdin. lam args.
          let command =
            cons (tempfile "program.exe") args
          in
          sysRunCommand command stdin (tempfile ""),
      cleanup = lam. sysTempDirDelete td (); (),
      binaryPath = tempfile "program.exe"
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ocamlCompile" kind="let">

```mc
let ocamlCompile  : String -> CompileResult
```



<ToggleWrapper text="Code..">
```mc
let ocamlCompile : String -> CompileResult =
  ocamlCompileWithConfig defaultCompileOptions
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr

let sym =
  ocamlCompile
  "print_int (Boot.Intrinsics.Mseq.length Boot.Intrinsics.Mseq.empty)"
in

let hello =
  ocamlCompile "print_string \"Hello World!\""
in

let echo =
  ocamlCompile "print_string (read_line ())"
in

let args =
  ocamlCompile "print_string (Sys.argv.(1))"
in

let err =
  ocamlCompile "Printf.eprintf \"Hello World!\""
in

let manyargs =
  ocamlCompile "Printf.eprintf \"%s %s\" (Sys.argv.(1)) (Sys.argv.(2))"
in

utest (sym.run "" []).stdout with "0" in
utest (hello.run "" []).stdout with "Hello World!" in
utest (echo.run "hello" []).stdout with "hello" in
utest (args.run "" ["world"]).stdout with "world" in
utest (err.run "" []).stderr with "Hello World!" in
utest (manyargs.run "" ["hello", "world"]).stderr with "hello world" in

sym.cleanup ();
hello.cleanup ();
echo.cleanup ();
args.cleanup ();
err.cleanup ();
manyargs.cleanup ();

()
```
</ToggleWrapper>
</DocBlock>

