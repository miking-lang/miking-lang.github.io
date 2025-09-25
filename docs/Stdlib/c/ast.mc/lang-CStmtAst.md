import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CStmtAst  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
C STATEMENTS \-\-  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
  
## Syntaxes  
  

          <DocBlock title="CStmt" kind="syn">

```mc
syn CStmt
```



<ToggleWrapper text="Code..">
```mc
syn CStmt =
  | CSDef     { ty: CType, id: Option Name, init: Option CInit }
  | CSIf      { cond: CExpr, thn: [CStmt], els: [CStmt] }
  | CSSwitch  { cond: CExpr, body: [(Int, [CStmt])], default: Option [CStmt] }
  | CSWhile   { cond: CExpr, body: [CStmt] }
  | CSExpr    { expr: CExpr }
  | CSComp    { stmts: [CStmt] }
  | CSRet     { val: Option CExpr }
  | CSCont    {}
  | CSBreak   {}
  | CSNop     {}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumLCStmtCStmt" kind="sem">

```mc
sem smapAccumLCStmtCStmt : all acc. (acc -> CStmtAst_CStmt -> (acc, CStmtAst_CStmt)) -> acc -> CStmtAst_CStmt -> (acc, CStmtAst_CStmt)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumLCStmtCStmt f acc =
  | CSIf t ->
    match mapAccumL f acc t.thn with (acc, thn) in
    match mapAccumL f acc t.els with (acc, els) in
    (acc, CSIf {{t with thn = thn} with els = els})
  | CSSwitch t ->
    let bodyFn = lam acc. lam caseArg : (Int, [CStmt]).
      match caseArg with (i, stmts) in
      match mapAccumL f acc stmts with (acc, stmts) in
      (acc, (i, stmts))
    in
    match mapAccumL bodyFn acc t.body with (acc, body) in
    match optionMapAccum (mapAccumL f) acc t.default with (acc, default) in
    (acc, CSSwitch {{t with body = body} with default = default})
  | CSWhile t ->
    match mapAccumL f acc t.body with (acc, body) in
    (acc, CSWhile {t with body = body})
  | CSComp t ->
    match mapAccumL f acc t.stmts with (acc, stmts) in
    (acc, CSComp {t with stmts = stmts})
  | stmt -> (acc, stmt)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_CStmt_CStmt" kind="sem">

```mc
sem smap_CStmt_CStmt : (CStmtAst_CStmt -> CStmtAst_CStmt) -> CStmtAst_CStmt -> CStmtAst_CStmt
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_CStmt_CStmt f =
  | stmt ->
    match smapAccumLCStmtCStmt (lam. lam a. ((), f a)) () stmt with (_, stmt) in
    stmt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_CStmt_CStmt" kind="sem">

```mc
sem sfold_CStmt_CStmt : all acc. (acc -> CStmtAst_CStmt -> acc) -> acc -> CStmtAst_CStmt -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_CStmt_CStmt f acc =
  | stmt ->
    match smapAccumLCStmtCStmt (lam acc. lam a. (f acc a, a)) acc stmt
    with (acc, _) in
    acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_CStmt_CExpr" kind="sem">

```mc
sem sfold_CStmt_CExpr : all acc. (acc -> CExprTypeAst_CExpr -> acc) -> acc -> CStmtAst_CStmt -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_CStmt_CExpr f acc =
  | CSDef t -> optionMapOrElse (lam. acc) (sfold_CInit_CExpr f acc) t.init
  | CSIf t ->
    let sf = sfold_CStmt_CExpr f in
    foldl sf (foldl sf (f acc t.cond) t.thn) t.els
  | CSSwitch t -> error "TODO"
  | CSWhile t -> error "TODO"
  | CSExpr t -> f acc t.expr
  | CSComp t -> error "TODO"
  | CSRet t -> optionMapOrElse (lam. acc) (f acc) t.val
  | CSCont _ -> acc
  | CSBreak _ -> acc
  | CSNop _ -> acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_CStmt_CExpr" kind="sem">

```mc
sem smap_CStmt_CExpr : (CExprTypeAst_CExpr -> CExprTypeAst_CExpr) -> CStmtAst_CStmt -> CStmtAst_CStmt
```



<ToggleWrapper text="Code..">
```mc
sem smap_CStmt_CExpr (f: CExpr -> CExpr) =
  | CSDef t ->
    let init = optionMap (smap_CInit_CExpr f) t.init in
    CSDef { t with init = init }
  | CSIf t ->
    let sf = smap_CStmt_CExpr f in
    CSIf {{{ t with cond = f t.cond}
               with thn = map (smap_CStmt_CExpr f) t.thn }
               with els = map (smap_CStmt_CExpr f) t.els }
  | CSSwitch t -> error "TODO"
  | CSWhile t -> error "TODO"
  | CSExpr t -> CSExpr { t with expr = f t.expr }
  | CSComp t -> error "TODO"
  | CSRet t -> CSRet { t with val = optionMap f t.val }
  | CSCont _ & t -> t
  | CSBreak _ & t -> t
  | CSNop _ & t -> t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sreplace_CStmt_CStmt" kind="sem">

```mc
sem sreplace_CStmt_CStmt : (CStmtAst_CStmt -> [CStmtAst_CStmt]) -> CStmtAst_CStmt -> CStmtAst_CStmt
```



<ToggleWrapper text="Code..">
```mc
sem sreplace_CStmt_CStmt (f: CStmt -> [CStmt]) =
  | CSDef t -> CSDef t
  | CSIf t ->
    let thn = join (map f t.thn) in
    let els = join (map f t.els) in
    CSIf {{ t with thn = thn } with els = els }
  | CSSwitch t -> error "TODO"
  | CSWhile t -> error "TODO"
  | CSExpr t -> CSExpr t
  | CSComp t -> error "TODO"
  | CSRet t -> CSRet t
  | CSCont t -> CSCont t
  | CSBreak t -> CSBreak t
  | CSNop t -> CSNop t
```
</ToggleWrapper>
</DocBlock>

