import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtrecConappSugar  
  

  
  
  
## Semantics  
  

          <DocBlock title="handleConappSugar" kind="sem">

```mc
sem handleConappSugar : _a -> {expr: Ast_Expr, decls: [Ast_Decl]}
```



<ToggleWrapper text="Code..">
```mc
sem handleConappSugar =
  | prog ->
    let ctx = foldl (sfold_Decl_Decl collectConappSugarEnv) (mapEmpty nameCmp) prog.decls in
    let decls = map (handleConappSugar_Decl ctx) prog.decls in
    let expr = handleConappSugar_Expr ctx prog.expr in

    let decls = map (insertExtRecordPat_Decl ctx) decls in
    let expr = insertExtRecordPat_Expr ctx expr in

    {decls = decls, expr = expr}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectConappSugarEnv" kind="sem">

```mc
sem collectConappSugarEnv : Map Name Name -> Ast_Decl -> Map Name Name
```



<ToggleWrapper text="Code..">
```mc
sem collectConappSugarEnv acc =
  | DeclSyn d ->
    let work = lam acc. lam def.mapInsert def.ident def.tyName acc in
    foldl work acc d.defs
  | other ->
    sfold_Decl_Decl collectConappSugarEnv acc other
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="handleConappSugar_Decl" kind="sem">

```mc
sem handleConappSugar_Decl : Map Name Name -> Ast_Decl -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
sem handleConappSugar_Decl ctx =
  | decl ->
    let decl = smap_Decl_Decl (handleConappSugar_Decl ctx) decl in
    smap_Decl_Expr (handleConappSugar_Expr ctx) decl
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="handleConappSugar_Expr" kind="sem">

```mc
sem handleConappSugar_Expr : Map Name Name -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem handleConappSugar_Expr ctx =
  | TmConApp (app & {body = TmRecord rec}) ->
    match mapLookup app.ident ctx with Some recIdent then
      let bindings = mapToSeq rec.bindings in
      let work = lam p. (sidToString p.0, handleConappSugar_Expr ctx p.1) in
      let bindings = map work bindings in
      let bindings = mapFromSeq cmpString bindings in
      let r = TmExtRecord {bindings = bindings,
                           ident = recIdent,
                           ty = rec.ty,
                           info = rec.info} in
      TmConApp {app with body = r}
    else
      TmConApp {app with body = handleConappSugar_Expr ctx app.body}
  | other ->
    smap_Expr_Expr (handleConappSugar_Expr ctx) other
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="insertExtRecordPat_Decl" kind="sem">

```mc
sem insertExtRecordPat_Decl : Map Name Name -> Ast_Decl -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
sem insertExtRecordPat_Decl ctx =
  | decl ->
    let decl = smap_Decl_Decl (insertExtRecordPat_Decl ctx) decl in
    let decl = smap_Decl_Pat (insertExtRecordPat_Pat ctx) decl in
    smap_Decl_Expr (insertExtRecordPat_Expr ctx) decl
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="insertExtRecordPat_Expr" kind="sem">

```mc
sem insertExtRecordPat_Expr : Map Name Name -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem insertExtRecordPat_Expr ctx =
  | expr ->
    let expr = smap_Expr_Expr (insertExtRecordPat_Expr ctx) expr in
    smap_Expr_Pat (insertExtRecordPat_Pat ctx) expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="insertExtRecordPat_Pat" kind="sem">

```mc
sem insertExtRecordPat_Pat : Map Name Name -> Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem insertExtRecordPat_Pat ctx =
  | PatCon p & pat ->
    match mapLookup p.ident ctx with Some ident then
      PatCon {p with subpat = handleSubpat ctx ident p.subpat}
    else
      smap_Pat_Pat (insertExtRecordPat_Pat ctx) pat
  | pat ->
    smap_Pat_Pat (insertExtRecordPat_Pat ctx) pat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="handleSubpat" kind="sem">

```mc
sem handleSubpat : Map Name Name -> Name -> Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem handleSubpat ctx ident =
  | PatRecord p ->
    let bindings = mapMap (insertExtRecordPat_Pat ctx) p.bindings in
    PatExtRecord {bindings = bindings,
                  ident    = ident,
                  info     = p.info,
                  ty       = p.ty}
  | pat & (PatOr _ | PatAnd _) ->
    smap_Pat_Pat (handleSubpat ctx ident) pat
  | pat ->
    insertExtRecordPat_Pat ctx pat
```
</ToggleWrapper>
</DocBlock>

