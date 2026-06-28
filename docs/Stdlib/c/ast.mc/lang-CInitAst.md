import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CInitAst  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
C INITIALIZERS \-\-  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
  
## Syntaxes  
  

          <DocBlock title="CInit" kind="syn">

```mc
syn CInit
```



<ToggleWrapper text="Code..">
```mc
syn CInit =
  | CIExpr { expr: CExpr }
  | CIList { inits: [CInit] }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="sfold_CInit_CExpr" kind="sem">

```mc
sem sfold_CInit_CExpr : all acc. (acc -> CExprTypeAst_CExpr -> acc) -> acc -> CInitAst_CInit -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_CInit_CExpr f acc =
  | CIExpr t -> f acc t.expr
  | CIList t -> foldl (sfold_CInit_CExpr f) acc t.inits
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_CInit_CExpr" kind="sem">

```mc
sem smap_CInit_CExpr : (CExprTypeAst_CExpr -> CExprTypeAst_CExpr) -> CInitAst_CInit -> CInitAst_CInit
```



<ToggleWrapper text="Code..">
```mc
sem smap_CInit_CExpr (f: CExpr -> CExpr) =
  | CIExpr t -> CIExpr { t with expr = f t.expr }
  | CIList t -> CIList { t with inits = map (smap_CInit_CExpr f) t.inits }
```
</ToggleWrapper>
</DocBlock>

