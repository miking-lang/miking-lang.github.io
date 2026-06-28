import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataTypeAst  
  

  
  
  
## Types  
  

          <DocBlock title="DataRec" kind="type">

```mc
type DataRec : { info: Info, universe: Map Name (Set Name), positive: Bool, cons: Set Name }
```



<ToggleWrapper text="Code..">
```mc
type DataRec =
    {info     : Info,
     universe : Map Name (Set Name),
     positive : Bool,
     cons     : Set Name}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
  | TyData DataRec
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="tyWithInfo" kind="sem">

```mc
sem tyWithInfo : Info -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyWithInfo info =
  | TyData t -> TyData {t with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoTy" kind="sem">

```mc
sem infoTy : Ast_Type -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTy =
  | TyData r -> r.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="computeData" kind="sem">

```mc
sem computeData : DataTypeAst_DataRec -> Map Name (Set Name)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem computeData =
  | r ->
    if r.positive then
      mapMap (setIntersect r.cons) r.universe
    else
      mapMap (lam x. setSubtract x r.cons) r.universe
```
</ToggleWrapper>
</DocBlock>

