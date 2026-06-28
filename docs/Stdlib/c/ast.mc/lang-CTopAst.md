import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CTopAst  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
C TOP\-LEVEL \-\-  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
  
## Syntaxes  
  

          <DocBlock title="CTop" kind="syn">

```mc
syn CTop
```



<ToggleWrapper text="Code..">
```mc
syn CTop =
  -- Type definitions are supported at this level.
  | CTTyDef { ty: CType, id: Name }
  | CTDef { ty: CType, id: Option Name, init: Option CInit }
  | CTFun { ret: CType, id: Name, params: [(CType,Name)], body: [CStmt] }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smap_CTop_CExpr" kind="sem">

```mc
sem smap_CTop_CExpr : (CExprTypeAst_CExpr -> CExprTypeAst_CExpr) -> CTopAst_CTop -> CTopAst_CTop
```



<ToggleWrapper text="Code..">
```mc
sem smap_CTop_CExpr (f: CExpr -> CExpr) =
  | CTTyDef _ & t -> t
  | CTDef t -> CTDef { t with init = optionMap (smap_CInit_CExpr f) t.init }
  | CTFun t -> CTFun { t with body = map (smap_CStmt_CExpr f) t.body }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sreplace_CTop_CStmt" kind="sem">

```mc
sem sreplace_CTop_CStmt : (CStmtAst_CStmt -> [CStmtAst_CStmt]) -> CTopAst_CTop -> CTopAst_CTop
```



<ToggleWrapper text="Code..">
```mc
sem sreplace_CTop_CStmt (f: CStmt -> [CStmt]) =
  | CTTyDef _ & t -> t
  | CTDef _ & t -> t
  | CTFun t -> CTFun { t with body = join (map f t.body) }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_CTop_CStmt" kind="sem">

```mc
sem sfold_CTop_CStmt : all acc. (acc -> CStmtAst_CStmt -> acc) -> acc -> CTopAst_CTop -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_CTop_CStmt f acc =
  | CTTyDef _ -> acc
  | CTDef _ -> acc
  | CTFun t -> foldl f acc t.body
```
</ToggleWrapper>
</DocBlock>

