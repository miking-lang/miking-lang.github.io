import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GeneratePrettyPrintBase  
  

  
  
  
## Semantics  
  

          <DocBlock title="prettyPrintId" kind="sem">

```mc
sem prettyPrintId : Info -> UtestBase_UtestEnv -> Ast_Type -> (UtestBase_UtestEnv, Name)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem prettyPrintId info env =
  | ty ->
    let id = prettyPrintIdH info env ty in
    ({env with pprint = mapInsert ty id env.pprint}, id)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prettyPrintIdH" kind="sem">

```mc
sem prettyPrintIdH : Info -> UtestBase_UtestEnv -> Ast_Type -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem prettyPrintIdH info env =
  | ty -> defaultPrettyPrintName ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generatePrettyPrintBody" kind="sem">

```mc
sem generatePrettyPrintBody : Info -> UtestBase_UtestEnv -> Ast_Type -> (Name, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generatePrettyPrintBody info env =
  | ty ->
    match mapLookup ty env.pprint with Some id then
      (id, generatePrettyPrintBodyH info env ty)
    else
      errorSingle [info]
        (concat "Cannot generate pretty-print function for type " (type2str ty))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generatePrettyPrintBodyH" kind="sem">

```mc
sem generatePrettyPrintBodyH : Info -> UtestBase_UtestEnv -> Ast_Type -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generatePrettyPrintBodyH info env =
  | ty -> _unit
```
</ToggleWrapper>
</DocBlock>

