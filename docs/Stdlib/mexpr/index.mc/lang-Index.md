import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Index  
  

  
  
  
## Types  
  

          <DocBlock title="IndexMap" kind="type">

```mc
type IndexMap : { name2int: Map Name Int, int2name: Tensor [Name] }
```



<ToggleWrapper text="Code..">
```mc
type IndexMap = {
    name2int: Map Name Int,
    int2name: Tensor[Name]
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IndexAcc" kind="type">

```mc
type IndexAcc : { map: Map Name Int, nextIndex: Int }
```



<ToggleWrapper text="Code..">
```mc
type IndexAcc = {
    map: Map Name Int,
    nextIndex: Int
  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="emptyAcc" kind="sem">

```mc
sem emptyAcc : () -> Index_IndexAcc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem emptyAcc =
  | _ -> { map = mapEmpty nameCmp, nextIndex = 0 }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addKey" kind="sem">

```mc
sem addKey : Name -> Index_IndexAcc -> Index_IndexAcc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addKey (name: Name) =
  | acc ->
    if mapMem name acc.map then acc
    else {{acc with map = mapInsert name acc.nextIndex acc.map }
               with nextIndex = addi 1 acc.nextIndex }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addKeyGet" kind="sem">

```mc
sem addKeyGet : Index_IndexAcc -> Name -> (Index_IndexAcc, Int)
```

<Description>{`Same as addKey, but return the new mapped\-to integer. Also reversed  
argument order for convenient mapAccumL.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addKeyGet acc =
  | name ->
    let i = acc.nextIndex in
    (addKey name acc, i)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="indexGen" kind="sem">

```mc
sem indexGen : Ast_Expr -> Index_IndexMap
```

<Description>{`Entry pointNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem indexGen =
  | t -> indexClose (indexAccGen t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="indexAccGen" kind="sem">

```mc
sem indexAccGen : Ast_Expr -> Index_IndexAcc
```

<Description>{`Alternative entry point, leaving the index open for more additionsNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem indexAccGen =
  | t -> indexAccGenH (emptyAcc ()) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="indexClose" kind="sem">

```mc
sem indexClose : Index_IndexAcc -> Index_IndexMap
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem indexClose =
  | acc ->
    let name2int = acc.map in
    let int2name: Tensor[Name] =
      tensorCreateDense [acc.nextIndex] (lam. nameNoSym "t") in
    mapMapWithKey (lam n. lam i. tensorLinearSetExn int2name i n) name2int;
    {name2int = name2int, int2name = int2name}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="indexAccGenH" kind="sem">

```mc
sem indexAccGenH : Index_IndexAcc -> Ast_Expr -> Index_IndexAcc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem indexAccGenH (acc: IndexAcc) =
  | t -> let acc = indexAdd acc t in sfold_Expr_Expr indexAccGenH acc t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="indexAdd" kind="sem">

```mc
sem indexAdd : Index_IndexAcc -> Ast_Expr -> Index_IndexAcc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem indexAdd (acc: IndexAcc) =
  | t -> acc
```
</ToggleWrapper>
</DocBlock>

