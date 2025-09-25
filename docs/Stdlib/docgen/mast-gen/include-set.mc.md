import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# include-set.mc  
  

\# IncludeSet Module  
  
The IncludeSet provides utilities to track which files have been visited  
during code parsing/lexing. It stores each file name in a hashmap as a key,  
mapped with a value provided as a parameter. It is later used to map each  
path to its AST.  
  
When inserting a new name, the IncludeSet resolves the actual full path of  
the file from a given location. It also computes, throughout its lifetime, a  
common prefix of all resolved paths to help reduce page URL sizes.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/hashmap.mc"} style={S.link}>hashmap.mc</a>, <a href={"/docs/Stdlib/stdlib.mc"} style={S.link}>stdlib.mc</a>, <a href={"/docs/Stdlib/docgen/global/util.mc"} style={S.link}>../global/util.mc</a>  
  
## Types  
  

          <DocBlock title="IncludeSet" kind="type">

```mc
type IncludeSet
```

<Description>{`A set of included files with metadata.`}</Description>


<ToggleWrapper text="Code..">
```mc
type IncludeSet a =
    {
        baseLoc: String,
        set: HashMap String a,
        prefix: String,
        programStartPos: String
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IncludeSetInsertResult" kind="type">

```mc
type IncludeSetInsertResult
```

<Description>{`Result type for inserting a new element in the IncludeSet.`}</Description>


<ToggleWrapper text="Code..">
```mc
type IncludeSetInsertResult a = { inserted: Bool, includeSet: IncludeSet a, path: String, isStdlib: Bool }
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="includeSetNew" kind="let">

```mc
let includeSetNew baseLoc : all a. String -> IncludeSet a
```

<Description>{`Creates a new IncludeSet with a given base location.`}</Description>


<ToggleWrapper text="Code..">
```mc
let includeSetNew : all a. String -> IncludeSet a = lam baseLoc.
    { baseLoc = baseLoc, set = hashmapEmpty (), prefix = baseLoc, programStartPos = sysGetCwd () }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="includeSetPrefix" kind="let">

```mc
let includeSetPrefix set : all a. IncludeSet a -> String
```

<Description>{`Returns the current prefix stored in the IncludeSet.`}</Description>


<ToggleWrapper text="Code..">
```mc
let includeSetPrefix : all a. IncludeSet a -> String = lam set. set.prefix
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="includeSetInsert" kind="let">

```mc
let includeSetInsert set loc includeContent mapValue : all a. IncludeSet a -> String -> String -> a -> IncludeSetInsertResult a
```

<Description>{`Inserts a file path into the IncludeSet, resolving absolute paths and updating the prefix.`}</Description>


<ToggleWrapper text="Code..">
```mc
let includeSetInsert : all a. IncludeSet a -> String -> String -> a -> IncludeSetInsertResult a = lam set. lam loc. lam includeContent. lam mapValue.
    match goHere (dirname loc) includeContent with { path = path, isStdlib = isStdlib } in
    match goHere set.programStartPos path with { path = absPath, isStdlib = isStdlib } in

    let set = if isStdlib then set else  { set with prefix = strLongestCommonPrefix (dirname absPath) set.prefix } in
    
    let res = { inserted = false, includeSet = set, isStdlib = isStdlib, path = path } in
    if hmMem path set.set then res
    else { res with includeSet = { set with set = hmInsert path mapValue set.set }, inserted = true }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="includeSetReplace" kind="let">

```mc
let includeSetReplace set mapKey mapValue : all a. IncludeSet a -> String -> a -> IncludeSet a
```

<Description>{`Replaces or inserts a value in the IncludeSet with the given key.`}</Description>


<ToggleWrapper text="Code..">
```mc
let includeSetReplace : all a. IncludeSet a -> String -> a -> IncludeSet a = lam set. lam mapKey. lam mapValue.
    { set with set = hmInsert mapKey mapValue set.set }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="includeSetGetValue" kind="let">

```mc
let includeSetGetValue set key : all a. IncludeSet a -> String -> Option a
```

<Description>{`Looks up a value in the IncludeSet by key.`}</Description>


<ToggleWrapper text="Code..">
```mc
let includeSetGetValue: all a. IncludeSet a -> String -> Option a = lam set. lam key.
    hmLookup key set.set
```
</ToggleWrapper>
</DocBlock>

