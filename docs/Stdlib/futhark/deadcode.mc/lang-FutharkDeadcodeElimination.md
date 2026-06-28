import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkDeadcodeElimination  
  

  
  
  
## Semantics  
  

          <DocBlock title="deadcodeEliminationType" kind="sem">

```mc
sem deadcodeEliminationType : Set Name -> FutharkTypeAst_FutType -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem deadcodeEliminationType (used : Set Name) =
  | FTyArray {dim = Some (NamedDim id)} -> setInsert id used
  | t -> sfold_FType_FType deadcodeEliminationType used t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="deadcodeEliminationExpr" kind="sem">

```mc
sem deadcodeEliminationExpr : Set Name -> FutharkExprAst_FutExpr -> (Set Name, FutharkExprAst_FutExpr)
```



<ToggleWrapper text="Code..">
```mc
sem deadcodeEliminationExpr (used : Set Name) =
  | FEVar t -> (setInsert t.ident used, FEVar t)
  | FELet (t & {body = FESizeEquality _}) ->
    match deadcodeEliminationExpr used t.inexpr with (used, inexpr) in
    (used, FELet {t with inexpr = inexpr})
  | FELet t ->
    match deadcodeEliminationExpr used t.inexpr with (used, inexpr) in
    if setMem t.ident used then
      match deadcodeEliminationExpr used t.body with (used, body) in
      let body =
        let default = lam. FELet {{t with body = body} with inexpr = inexpr} in
        match inexpr with FEVar {ident = id} then
          if nameEq t.ident id then
            match t.tyBody with FTyRecord _ then body
            else default ()
          else default ()
        else default () in
      (used, body)
    else (used, inexpr)
  | t ->
    let used = deadcodeEliminationType used (tyFutTm t) in
    smapAccumL_FExpr_FExpr deadcodeEliminationExpr used t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="deadcodeEliminationDecl" kind="sem">

```mc
sem deadcodeEliminationDecl : FutharkAst_FutDecl -> FutharkAst_FutDecl
```



<ToggleWrapper text="Code..">
```mc
sem deadcodeEliminationDecl =
  | FDeclFun t ->
    match deadcodeEliminationExpr (setEmpty nameCmp) t.body with (_, body) in
    FDeclFun {t with body = body}
  | t -> t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="deadcodeElimination" kind="sem">

```mc
sem deadcodeElimination : FutharkAst_FutProg -> FutharkAst_FutProg
```



<ToggleWrapper text="Code..">
```mc
sem deadcodeElimination =
  | FProg t -> FProg {t with decls = map deadcodeEliminationDecl t.decls}
```
</ToggleWrapper>
</DocBlock>

