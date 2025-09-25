import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# sys.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Types  
  

          <DocBlock title="ReturnCode" kind="type">

```mc
type ReturnCode : Int
```



<ToggleWrapper text="Code..">
```mc
type ReturnCode = Int
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ExecResult" kind="type">

```mc
type ExecResult : { stdout: String, stderr: String, returncode: ReturnCode }
```



<ToggleWrapper text="Code..">
```mc
type ExecResult = {stdout: String, stderr: String, returncode: ReturnCode}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_pathSep" kind="let">

```mc
let _pathSep  : String
```



<ToggleWrapper text="Code..">
```mc
let _pathSep = "/"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_tempBase" kind="let">

```mc
let _tempBase  : String
```



<ToggleWrapper text="Code..">
```mc
let _tempBase = "/tmp"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_null" kind="let">

```mc
let _null  : String
```



<ToggleWrapper text="Code..">
```mc
let _null = "/dev/null"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysCommandExists" kind="let">

```mc
let sysCommandExists cmd : String -> Bool
```



<ToggleWrapper text="Code..">
```mc
let sysCommandExists : String -> Bool = lam cmd.
  eqi 0 (command (join ["command -v ", cmd, " >/dev/null 2>&1"]))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest sysCommandExists "ls" with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ASSERT_MKDIR" kind="let">

```mc
let ASSERT_MKDIR  : ()
```



<ToggleWrapper text="Code..">
```mc
let #var"ASSERT_MKDIR" : () =
  if sysCommandExists "mkdir" then ()
  else error "Couldn't find 'mkdir' on PATH, exiting."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_commandListTime" kind="let">

```mc
let _commandListTime cmd : [String] -> (Float, Int)
```



<ToggleWrapper text="Code..">
```mc
let _commandListTime : [String] -> (Float, Int) = lam cmd.
  let cmd = strJoin " " cmd in
  let t1 = wallTimeMs () in
  let res = command cmd in
  let t2 = wallTimeMs () in
  (subf t2 t1, res)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_commandList" kind="let">

```mc
let _commandList cmd : [String] -> Int
```



<ToggleWrapper text="Code..">
```mc
let _commandList = lam cmd : [String].
  match _commandListTime cmd with (_, res) then res else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_commandListTimeoutWrap" kind="let">

```mc
let _commandListTimeoutWrap timeoutSec cmd : Float -> [String] -> [String]
```



<ToggleWrapper text="Code..">
```mc
let _commandListTimeoutWrap : Float -> [String] -> [String] = lam timeoutSec. lam cmd.
  join [ ["timeout", "-k", "0.1", float2string timeoutSec, "bash", "-c", "\'{"]
       , cmd
       , ["\'}"]
       ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysFileExists" kind="let">

```mc
let sysFileExists file : String -> Bool
```



<ToggleWrapper text="Code..">
```mc
let sysFileExists: String -> Bool = lam file.
  if eqi (_commandList ["test", "-e", file]) 0 then true else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysCopyFile" kind="let">

```mc
let sysCopyFile fromFile toFile : String -> String -> Int
```



<ToggleWrapper text="Code..">
```mc
let sysCopyFile = lam fromFile. lam toFile.
  _commandList ["cp", "-f", fromFile, toFile]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysMoveFile" kind="let">

```mc
let sysMoveFile fromFile toFile : String -> String -> Int
```



<ToggleWrapper text="Code..">
```mc
let sysMoveFile = lam fromFile. lam toFile.
  _commandList ["mv", "-f", fromFile, toFile]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysDeleteFile" kind="let">

```mc
let sysDeleteFile file : String -> Int
```



<ToggleWrapper text="Code..">
```mc
let sysDeleteFile = lam file.
  _commandList ["rm", "-f", file]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysDeleteDir" kind="let">

```mc
let sysDeleteDir dir : String -> Int
```



<ToggleWrapper text="Code..">
```mc
let sysDeleteDir = lam dir.
  _commandList ["rm", "-rf", dir]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysChmodWriteAccessFile" kind="let">

```mc
let sysChmodWriteAccessFile file : String -> Int
```



<ToggleWrapper text="Code..">
```mc
let sysChmodWriteAccessFile = lam file.
  _commandList ["chmod", "+w", file]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysJoinPath" kind="let">

```mc
let sysJoinPath p1 p2 : String -> String -> String
```



<ToggleWrapper text="Code..">
```mc
let sysJoinPath = lam p1. lam p2.
  strJoin _pathSep [p1, p2]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysTempMake" kind="let">

```mc
let sysTempMake dir prefix _ : all a. Bool -> String -> a -> String
```



<ToggleWrapper text="Code..">
```mc
let sysTempMake = lam dir: Bool. lam prefix: String. lam.
  let maxTries = 10000 in
  recursive let mk = lam base. lam i.
    if lti i maxTries then
      let name = concat base (int2string i) in
      match
        _commandList [
          if dir then "mkdir" else "touch",
          sysJoinPath _tempBase name, "2>", _null
        ]
        with 0
      then name
      else mk base (addi i 1)
    else
      error "sysTempMake: Failed to make temporary directory."
  in
  let alphanumStr = create 10 (lam. randAlphanum ()) in
  let base = concat prefix alphanumStr in
  let name = mk base 0 in
  sysJoinPath _tempBase name
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysTempDirMakePrefix" kind="let">

```mc
let sysTempDirMakePrefix  : String -> () -> String
```



<ToggleWrapper text="Code..">
```mc
let sysTempDirMakePrefix: String -> () -> String = sysTempMake true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysTempFileMakePrefix" kind="let">

```mc
let sysTempFileMakePrefix  : String -> () -> String
```



<ToggleWrapper text="Code..">
```mc
let sysTempFileMakePrefix: String -> () -> String = sysTempMake false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysTempDirMake" kind="let">

```mc
let sysTempDirMake  : () -> String
```



<ToggleWrapper text="Code..">
```mc
let sysTempDirMake: () -> String = sysTempDirMakePrefix "miking-tmp."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysTempFileMake" kind="let">

```mc
let sysTempFileMake  : () -> String
```



<ToggleWrapper text="Code..">
```mc
let sysTempFileMake: () -> String = sysTempFileMakePrefix "miking-tmp."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysTempDirName" kind="let">

```mc
let sysTempDirName td : all a. a -> a
```



<ToggleWrapper text="Code..">
```mc
let sysTempDirName = lam td. td
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysTempDirDelete" kind="let">

```mc
let sysTempDirDelete td _ : all a. String -> a -> Int
```



<ToggleWrapper text="Code..">
```mc
let sysTempDirDelete = lam td. lam. sysDeleteDir td
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let d = sysTempDirMake () in
  let exists = sysFileExists (sysTempDirName d) in
  sysTempDirDelete d ();
  [exists, sysFileExists (sysTempDirName d)]
with [true, false]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysWithTempDir" kind="let">

```mc
let sysWithTempDir f : all a. (String -> a) -> a
```



<ToggleWrapper text="Code..">
```mc
let sysWithTempDir: all a. (String -> a) -> a = lam f.
  let path = sysTempDirMake () in
  let output = f path in
  -- NOTE(johnwikman,2025-03-20): This assumes \\`rm -rf\\` semantics, as opposed
  -- to the rmdir semantics which won't remove the directory unless it's empty.
  sysDeleteDir path;
  output
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  match sysWithTempDir (lam path.
    (sysFileExists path, path)
  ) with (inExists, path) in
  let outExists = sysFileExists path in
  [inExists, outExists]
with [true, false]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysWithTempFile" kind="let">

```mc
let sysWithTempFile f : all a. (String -> a) -> a
```



<ToggleWrapper text="Code..">
```mc
let sysWithTempFile: all a. (String -> a) -> a = lam f.
  let path = sysTempFileMake () in
  let output = f path in
  sysDeleteFile path;
  output
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  match sysWithTempFile (lam path.
    (sysFileExists path, path)
  ) with (inExists, path) in
  let outExists = sysFileExists path in
  [inExists, outExists]
with [true, false]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysRunCommandWithTimingTimeoutFileIO" kind="let">

```mc
let sysRunCommandWithTimingTimeoutFileIO timeoutSec cmd stdinFile stdoutFile stderrFile cwd : Option Float -> [String] -> String -> String -> String -> String -> (Float, ReturnCode)
```



<ToggleWrapper text="Code..">
```mc
let sysRunCommandWithTimingTimeoutFileIO
    : Option Float -> [String] -> String -> String -> String -> String
      -> (Float, ReturnCode) =
  lam timeoutSec. lam cmd. lam stdinFile.
  lam stdoutFile. lam stderrFile. lam cwd.
    let fullCmd =
    [ "cd", cwd, ";"
    , strJoin " " cmd
    , ">", stdoutFile
    , "2>", stderrFile
    , "<", stdinFile
    , ";"
    ] in
    let fullCmd =
      match timeoutSec with Some timeout then
        _commandListTimeoutWrap timeout fullCmd
      else fullCmd
    in
    match _commandListTime fullCmd with (ms, retCode) then
      (ms, retCode)
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysRunCommandWithTimingTimeout" kind="let">

```mc
let sysRunCommandWithTimingTimeout timeoutSec cmd stdin cwd : Option Float -> [String] -> String -> String -> (Float, ExecResult)
```



<ToggleWrapper text="Code..">
```mc
let sysRunCommandWithTimingTimeout : Option Float -> [String] -> String -> String -> (Float, ExecResult) =
  lam timeoutSec. lam cmd. lam stdin. lam cwd.
    let tempDir = sysTempDirMake () in
    let tempStdin = sysJoinPath tempDir "stdin.txt" in
    writeFile tempStdin stdin;
    let tempStdout = sysJoinPath tempDir "stdout.txt" in
    let tempStderr = sysJoinPath tempDir "stderr.txt" in
    let res = sysRunCommandWithTimingTimeoutFileIO
                timeoutSec cmd tempStdin tempStdout tempStderr cwd in
    -- NOTE(Linnea, 2021-04-14): Workaround for readFile bug #145
    _commandList ["echo", "", ">>", tempStdout];
    _commandList ["echo", "", ">>", tempStderr];
    let stdout = init (readFile tempStdout) in
    let stderr = init (readFile tempStderr) in
    sysTempDirDelete tempDir ();
    (res.0, {stdout = stdout, stderr = stderr, returncode = res.1})
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest sysRunCommandWithTimingTimeout (None ()) ["echo -n \"\""] "" "."; () with ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysRunCommandWithTimingFileIO" kind="let">

```mc
let sysRunCommandWithTimingFileIO  : [String] -> String -> String -> String -> String -> (Float, ReturnCode)
```



<ToggleWrapper text="Code..">
```mc
let sysRunCommandWithTimingFileIO : [String] -> String -> String -> String -> String -> (Float, ReturnCode) =
  sysRunCommandWithTimingTimeoutFileIO (None ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysRunCommandWithTiming" kind="let">

```mc
let sysRunCommandWithTiming  : [String] -> String -> String -> (Float, ExecResult)
```



<ToggleWrapper text="Code..">
```mc
let sysRunCommandWithTiming : [String] -> String -> String -> (Float, ExecResult) =
    sysRunCommandWithTimingTimeout (None ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysRunCommandFileIO" kind="let">

```mc
let sysRunCommandFileIO cmd stdinFile stdoutFile stderrFile cwd : [String] -> String -> String -> String -> String -> ReturnCode
```



<ToggleWrapper text="Code..">
```mc
let sysRunCommandFileIO : [String] -> String -> String -> String -> String -> ReturnCode =
  lam cmd. lam stdinFile. lam stdoutFile. lam stderrFile. lam cwd.
    match sysRunCommandWithTimingFileIO cmd stdinFile stdoutFile stderrFile cwd
    with (_, res) then res else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysRunCommand" kind="let">

```mc
let sysRunCommand cmd stdin cwd : [String] -> String -> String -> ExecResult
```



<ToggleWrapper text="Code..">
```mc
let sysRunCommand : [String] -> String -> String -> ExecResult =
  lam cmd. lam stdin. lam cwd.
    match sysRunCommandWithTiming cmd stdin cwd with (_, res) then res else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysGetCwd" kind="let">

```mc
let sysGetCwd _ : () -> String
```



<ToggleWrapper text="Code..">
```mc
let sysGetCwd : () -> String = lam. strTrim (sysRunCommand ["pwd"] "" ".").stdout
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysGetEnv" kind="let">

```mc
let sysGetEnv env : String -> Option String
```



<ToggleWrapper text="Code..">
```mc
let sysGetEnv : String -> Option String = lam env.
  let res = strTrim (sysRunCommand ["echo", concat "$" env] "" ".").stdout in
  if null res then None ()
  else Some res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sysAppendFile" kind="let">

```mc
let sysAppendFile filename str : String -> String -> ReturnCode
```



<ToggleWrapper text="Code..">
```mc
let sysAppendFile : String -> String -> ReturnCode =
  lam filename. lam str.
  let f = sysTempFileMake () in
  writeFile f str;
  let r = _commandList ["cat", f, ">>", filename] in
  sysDeleteFile f;
  r
```
</ToggleWrapper>
</DocBlock>

