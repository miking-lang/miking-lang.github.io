import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# util.mc  
  

\# Small string & hashmap utilities  
  
A collection of helper functions:  
  
These utilities simplify common operations used across other modules.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/hashmap.mc"} style={S.link}>hashmap.mc</a>, <a href={"/docs/Stdlib/sys.mc"} style={S.link}>sys.mc</a>, <a href={"/docs/Stdlib/stdlib.mc"} style={S.link}>stdlib.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>, <a href={"/docs/Stdlib/ext/file-ext.mc"} style={S.link}>ext/file-ext.mc</a>  
  
## Variables  
  

          <DocBlock title="changeExt" kind="let">

```mc
let changeExt fileName ext : String -> String -> String
```

<Description>{`Changes the extension of a file.  
If the file has an extension, it's replaced; if not, the extension is added.  
Example: changeExt "test.txt" "md" =\> "test.md"`}</Description>


<ToggleWrapper text="Code..">
```mc
let changeExt : (String -> String -> String) = lam fileName. lam ext.
    match findiLast (eqc '.') fileName with Some i then
        concat (subsequence fileName 0 (addi 1 i)) ext
    else
        concat fileName (cons '.' ext)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest changeExt "file.txt" "md" with "file.md"
utest changeExt "noext" "md" with "noext.md"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="splitOnL" kind="let">

```mc
let splitOnL f arr : all a. (a -> Bool) -> [a] -> {left: [a], right: [a]}
```

<Description>{`Splits an array \`arr\` into \{ left, right \} at the first element matching predicate \`f\`.  
The matched element goes in \`left\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let splitOnL : all a. (a -> Bool) -> [a] -> { left: [a], right: [a] } = lam f. lam arr.
    recursive let work = lam arr.
        switch arr
        case [] then { left = [], right = [] }
        case [x] ++ rest then
            if f x then
                { left = [x], right = rest }      
            else
                let res = work rest in
                { res with left = cons x res.left }
        end in
    work arr
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest splitOnL (lam x. eqi x 3) [1,2,3,4,5] with { left = [1,2,3], right = [4,5] }
utest splitOnL (lam x. eqi x 9) [1,2,3] with { left = [1,2,3], right = [] }
utest splitOnL (lam x. true) [1,2,3] with { left = [1], right = [2,3] }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="splitOnR" kind="let">

```mc
let splitOnR f arr : all a. (a -> Bool) -> [a] -> {left: [a], right: [a]}
```

<Description>{`Splits an array \`arr\` into \{ left, right \} just before the first element matching predicate \`f\`.  
The matched element stays in \`right\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let splitOnR : all a. (a -> Bool) -> [a] -> { left: [a], right: [a] } = lam f. lam arr.
    recursive let work = lam arr.
        switch arr
        case [] then { left = [], right = [] }
        case [x] ++ rest then
            if f x then
                { left = [], right = arr }      
            else
                let res = work rest in
                { res with left = cons x res.left }
        end in
    work arr
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest splitOnR (lam x. eqi x 3) [1,2,3,4,5] with { left = [1,2], right = [3,4,5] }
utest splitOnR (lam x. eqi x 9) [1,2,3] with { left = [1,2,3], right = [] }
utest splitOnR (lam x. true) [1,2,3] with { left = [], right = [1,2,3] }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hmTraits" kind="let">

```mc
let hmTraits  : HashMapTraits String
```



<ToggleWrapper text="Code..">
```mc
let hmTraits = hashmapStrTraits
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hmInsert" kind="let">

```mc
let hmInsert x : all v. String -> v -> HashMap String v -> HashMap String v
```



<ToggleWrapper text="Code..">
```mc
let hmInsert = lam x. hashmapInsert hmTraits x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hmMem" kind="let">

```mc
let hmMem x : all v. String -> HashMap String v -> Bool
```



<ToggleWrapper text="Code..">
```mc
let hmMem = lam x. hashmapMem hmTraits x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hmValues" kind="let">

```mc
let hmValues x : all v. HashMap String v -> [v]
```



<ToggleWrapper text="Code..">
```mc
let hmValues = lam x. hashmapValues hmTraits x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hmKeys" kind="let">

```mc
let hmKeys x : all v. HashMap String v -> [String]
```



<ToggleWrapper text="Code..">
```mc
let hmKeys = lam x. hashmapKeys hmTraits x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hmLookup" kind="let">

```mc
let hmLookup x : all v. String -> HashMap String v -> Option v
```



<ToggleWrapper text="Code..">
```mc
let hmLookup = lam x. hashmapLookup hmTraits x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hmLen" kind="let">

```mc
let hmLen x : all v. HashMap String v -> Int
```



<ToggleWrapper text="Code..">
```mc
let hmLen = lam x. hashmapCount hmTraits x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normalizePath" kind="let">

```mc
let normalizePath path : String -> String
```

<Description>{`Normalizes a file path by resolving '.', '..', and redundant slashes.  
Supports both absolute and relative paths.`}</Description>


<ToggleWrapper text="Code..">
```mc
let normalizePath = lam path.
    let isAbsolute = match path with "/" ++ s then true else false in
    let components = strSplit "/" path in
    recursive let process = lam comps. lam stack.
        switch comps
        case [] then stack
        case ["."] ++ rest then process rest stack
        case [""] ++ rest then process rest stack
        case [".."] ++ rest then
            (switch stack
             case ([] | [".."] ++ _) then process rest (cons ".." stack)
             case [_] ++ tl then process rest tl end)
        case [comp] ++ rest then process rest (cons comp stack) end
    in
    let cleaned = reverse (process components []) in
    let result = strJoin "/" cleaned in
    if isAbsolute then cons '/'  result
    else result
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest normalizePath "repo1/../repo2" with "repo2"
utest normalizePath "/repo1/../repo2" with "/repo2"
utest normalizePath "../../repo2" with "../../repo2"
utest normalizePath "./a/./b/../c" with "a/c"
utest normalizePath "/a/b/../../c" with "/c"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="goHere" kind="let">

```mc
let goHere currentLoc target : String -> String -> {path: String, isStdlib: Bool}
```

<Description>{`Resolves a path based on current location and target.  
If the target is absolute, it is returned normalized.  
If the file exists at the concatenated location, it's returned.  
Otherwise, the target is assumed to be from the standard library.`}</Description>


<ToggleWrapper text="Code..">
```mc
let goHere : String -> String -> { path: String, isStdlib: Bool } = lam currentLoc. lam target.
    let currentLoc = match currentLoc with "" then "./" else currentLoc in
    match target with "" then { path = currentLoc, isStdlib = false } else
    let path = if strStartsWith "/" target then target
               else join [currentLoc, "/", target] in
    if sysFileExists path then
        { path = normalizePath path, isStdlib = strStartsWith stdlibLoc path }
    else
        { path = join [stdlibLoc, "/", target], isStdlib = true }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="readOrNever" kind="let">

```mc
let readOrNever fileName : String -> String
```

<Description>{`Try to open a file in a String, panic if it fails`}</Description>


<ToggleWrapper text="Code..">
```mc
let readOrNever : String -> String = lam fileName.
    match fileReadOpen fileName with Some rc then
        let s = fileReadString rc in
        fileReadClose rc;
        s
    else
        error (join ["Failed to read a file: file ", fileName, " doesn't exists."])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="strLongestCommonPrefix" kind="let">

```mc
let strLongestCommonPrefix a b : String -> String -> String
```

<Description>{`Returns the longest common prefix between two strings.`}</Description>


<ToggleWrapper text="Code..">
```mc
let strLongestCommonPrefix : String -> String -> String = lam a. lam b.
    match a with "" then ""
    else match b with "" then ""
    else match findi (lam x. neqChar x.0 x.1) (zip a b) with Some i then subsequence a 0 i
    else if gti (length a) (length b) then b
    else a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="concatIfNot" kind="let">

```mc
let concatIfNot x1 f x2 : all a. [a] -> ([a] -> Bool) -> [a] -> [a]
```

<Description>{`Concatenates two lists if the first one does not satisfy the given predicate.`}</Description>


<ToggleWrapper text="Code..">
```mc
let concatIfNot : all a. [a] -> ([a] -> Bool) -> [a] -> [a] =
    lam x1. lam f. lam x2. if not (f x1) then concat x1 x2 else x1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="count" kind="let">

```mc
let count f arr : all a. (a -> Bool) -> [a] -> Int
```

<Description>{`Counts how many elements of a list satisfy the given predicate.`}</Description>


<ToggleWrapper text="Code..">
```mc
let count : all a. (a -> Bool) -> [a] -> Int = lam f. lam arr.
    foldl (lam counter. lam x. if f x then addi 1 counter else counter) 0 arr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="strFullTrim" kind="let">

```mc
let strFullTrim s : String -> String
```

<Description>{`Trims whitespace and newlines at the beginning and end of a string.`}</Description>


<ToggleWrapper text="Code..">
```mc
let strFullTrim = lam s.
  recursive
  let work = lam s.
    if eqString s ""
    then s
    else match head s with '\n' | ' ' | '\t' then work (tail s)
    else s
  in
  reverse (work (reverse s))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pwd" kind="let">

```mc
let pwd  : String
```



<ToggleWrapper text="Code..">
```mc
let pwd = sysGetCwd ()
```
</ToggleWrapper>
</DocBlock>

