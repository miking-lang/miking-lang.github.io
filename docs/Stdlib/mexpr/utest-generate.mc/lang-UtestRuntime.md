import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestRuntime  
  

The language fragment for handling the utest runtime. This includes  
handling the caching of the loaded AST, as well as functions for  
accessing identifiers defined in the runtime file.

  
  
  
## Semantics  
  

          <DocBlock title="loadUtestRuntime" kind="sem">

```mc
sem loadUtestRuntime : () -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem loadUtestRuntime =
  | _ ->
    match deref _utestRuntimeCode with Some ast then ast
    else
      let ast = loadRuntime _utestRuntimeLoc in
      modref _utestRuntimeCode (Some ast);
      ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findRuntimeIds" kind="sem">

```mc
sem findRuntimeIds : () -> [Name]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findRuntimeIds =
  | _ ->
    match deref _utestRuntimeIds with Some ids then ids
    else
      let rt = loadUtestRuntime () in
      match optionMapM identity (findNamesOfStrings _utestRuntimeExpected rt)
      with Some ids then
        modref _utestRuntimeIds (Some ids);
        ids
      else error "Missing required identifiers in utest runtime file"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utestRunnerName" kind="sem">

```mc
sem utestRunnerName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem utestRunnerName =
  | _ -> get (findRuntimeIds ()) 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utestDefaultOnFailName" kind="sem">

```mc
sem utestDefaultOnFailName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem utestDefaultOnFailName =
  | _ -> get (findRuntimeIds ()) 1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utestExitOnFailureName" kind="sem">

```mc
sem utestExitOnFailureName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem utestExitOnFailureName =
  | _ -> get (findRuntimeIds ()) 2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="defaultPrettyPrintName" kind="sem">

```mc
sem defaultPrettyPrintName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem defaultPrettyPrintName =
  | _ -> get (findRuntimeIds ()) 3
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ppBoolName" kind="sem">

```mc
sem ppBoolName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ppBoolName =
  | _ -> get (findRuntimeIds ()) 4
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ppIntName" kind="sem">

```mc
sem ppIntName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ppIntName =
  | _ -> get (findRuntimeIds ()) 5
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ppFloatName" kind="sem">

```mc
sem ppFloatName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ppFloatName =
  | _ -> get (findRuntimeIds ()) 6
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ppCharName" kind="sem">

```mc
sem ppCharName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ppCharName =
  | _ -> get (findRuntimeIds ()) 7
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ppSeqName" kind="sem">

```mc
sem ppSeqName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ppSeqName =
  | _ -> get (findRuntimeIds ()) 8
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqBoolName" kind="sem">

```mc
sem eqBoolName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eqBoolName =
  | _ -> get (findRuntimeIds ()) 9
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqIntName" kind="sem">

```mc
sem eqIntName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eqIntName =
  | _ -> get (findRuntimeIds ()) 10
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqFloatName" kind="sem">

```mc
sem eqFloatName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eqFloatName =
  | _ -> get (findRuntimeIds ()) 11
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqCharName" kind="sem">

```mc
sem eqCharName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eqCharName =
  | _ -> get (findRuntimeIds ()) 12
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqSeqName" kind="sem">

```mc
sem eqSeqName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eqSeqName =
  | _ -> get (findRuntimeIds ()) 13
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="joinName" kind="sem">

```mc
sem joinName : () -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem joinName =
  | _ -> get (findRuntimeIds ()) 14
```
</ToggleWrapper>
</DocBlock>

