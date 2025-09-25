import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# fileutils.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/sys.mc"} style={S.link}>sys.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>  
  
## Variables  
  

          <DocBlock title="filepathConcat" kind="let">

```mc
let filepathConcat dir path : String -> String -> String
```



<ToggleWrapper text="Code..">
```mc
let filepathConcat : String -> String -> String = lam dir. lam path.
  if eqc '/' (last dir) then
    concat dir path
  else
    join [dir, "/", path]
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest filepathConcat "a/b/c" "foo.mc" with "a/b/c/foo.mc"
utest filepathConcat "a/b/c/" "foo.mc" with "a/b/c/foo.mc"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dirname" kind="let">

```mc
let dirname filepath : String -> String
```



<ToggleWrapper text="Code..">
```mc
let dirname : String -> String = lam filepath.
  match findiLast (eqc '/') filepath with Some i then
    subsequence filepath 0 i
  else
    ""
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest dirname "foo.mc" with ""
utest dirname "a/b/c/foo.mc" with "a/b/c"
utest dirname "a/b/c/../foo.mc" with "a/b/c/.."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileutilsNormalize" kind="let">

```mc
let fileutilsNormalize path : String -> String
```



<ToggleWrapper text="Code..">
```mc
let fileutilsNormalize : String -> String = lam path.
  recursive let recur = lam zipper : ([String], [String]).
    switch zipper
    case (segments, []) then strJoin "/" segments
    case ([], [""] ++ after) then recur ([""], after)
    case (before, ["." | ""] ++ after) then recur (before, after)
    case (before ++ [_], [".."] ++ after) then recur (before, after)
    case (before, [here] ++ after) then recur (snoc before here, after)
    end in
  let path = match path with "/" ++ _
    then path
    else concat (sysGetCwd ()) (cons '/' path) in
  recur ([], strSplit "/" path)
```
</ToggleWrapper>
</DocBlock>

