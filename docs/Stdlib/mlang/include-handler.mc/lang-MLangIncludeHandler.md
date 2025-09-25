import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MLangIncludeHandler  
  

  
  
  
## Semantics  
  

          <DocBlock title="parseAndHandleIncludes" kind="sem">

```mc
sem parseAndHandleIncludes : String -> MLangTopLevel_MLangProgram
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parseAndHandleIncludes =| path ->
    let dir = filepathConcat (sysGetCwd ()) (dirname path) in
    let libs = addCWDtoLibs stdlibMCoreLibs in
    let included = ref (setEmpty cmpString) in
    handleIncludesFile included dir libs path
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="handleIncludesProgram" kind="sem">

```mc
sem handleIncludesProgram : Ref (Set String) -> String -> Map String String -> MLangTopLevel_MLangProgram -> MLangTopLevel_MLangProgram
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem handleIncludesProgram included dir libs =| prog ->
    let f = lam decls. lam decl.
      concat decls (flattenIncludes included dir libs decl) in
    {prog with decls = foldl f [] prog.decls}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="handleIncludesFile" kind="sem">

```mc
sem handleIncludesFile : Ref (Set String) -> String -> Map String String -> String -> MLangTopLevel_MLangProgram
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem handleIncludesFile included dir libs =| path ->
    let s = deref included in

    if setMem path s then
      {decls = [], expr = uunit_}
    else
      match result.consume (parseMLangFile path) with (_, errOrProg) in
      switch errOrProg
        case Left err then errorMulti err (join [
          " * File '",
          path,
          "' could not be parsed!"
        ])
        case Right prog then
          modref included (setInsert path s);
          handleIncludesProgram included dir libs prog
      end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="flattenIncludes" kind="sem">

```mc
sem flattenIncludes : Ref (Set String) -> String -> Map String String -> Ast_Decl -> [Ast_Decl]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem flattenIncludes included dir libs =
  | DeclInclude {path = path, info = info} ->
    let path = findPath dir libs info path in
    let prog = handleIncludesFile included (dirname path) libs path in
    prog.decls
  | other -> [other]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findPath" kind="sem">

```mc
sem findPath : String -> Map String String -> Info -> String -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findPath dir libs info =| path ->
    let libs = mapInsert "current" dir libs in
    let prefixes = mapValues libs in
    let paths = map (lam prefix. filepathConcat prefix path) prefixes in

    let existingFiles = filter sysFileExists paths in
    let existingFilesAsSet = setOfSeq cmpString existingFiles in

    switch (setSize existingFilesAsSet)
      case 0 then
        errorSingle [info] "File not found!"
      case 1 then
        head (setToSeq existingFilesAsSet)
      case _ then
        -- TODO(voorberg, 09/05/2024): This happens because we dont properly
        -- deal with libraries yet. The code does not yet realise that
        -- some absolute path is equal to some relative path.
        warnSingle [info] "Multiple files found" ;
        head (setToSeq existingFilesAsSet)
    end
```
</ToggleWrapper>
</DocBlock>

