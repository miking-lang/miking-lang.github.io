import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# pprint.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>mexpr/pprint.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mlang/pprint.mc"} style={S.link}>mlang/pprint.mc</a>, <a href={"/docs/Stdlib/extrec/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/extrec/ast-builder.mc"} style={S.link}>ast-builder.mc</a>  
  
## Languages  
  

          <DocBlock title="ExtRecTermPrettyPrint" kind="lang" link="/docs/Stdlib/extrec/pprint.mc/lang-ExtRecTermPrettyPrint">

```mc
lang ExtRecTermPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang ExtRecTermPrettyPrint = TypePrettyPrint + PrettyPrint + ExtRecordAst
  sem isAtomic =
  | TmExtRecord  _ -> true
  | TmExtExtend _ | TmExtExtend _ -> false

  sem pprintDeclCode indent env =
  | DeclRecType t ->
    match pprintTypeName env t.ident with (env, name) in
    match mapAccumL pprintEnvGetStr env t.params with (env, paramsStr) in
    (env, join ["rectype ", name, " ", strJoin " " paramsStr])
  | DeclRecField t ->
    let ty =  typeToString env t.tyIdent in
    (env, join ["recfield ", t.label, " : ", ty])

  sem pprintCode (indent : Int) (env: PprintEnv) =
  | TmExtRecord {bindings = bindings, ident = ident} ->
    let innerIndent = pprintIncr (pprintIncr indent) in
      match
        mapMapAccum
          (lam env. lam k. lam v.
             match pprintCode innerIndent env v with (env, str) in
             (env,
              join [k, " = ", str]))
           env bindings
      with (env, bindMap) in
      let binds = mapValues bindMap in
      let merged =
        strJoin ", " binds
      in
      (env,join ["{", nameGetStr ident, " of ", merged, "}"])
  | TmExtExtend {bindings = bindings, e = e} ->
    match pprintCode indent env e with (env, eStr) in
    let innerIndent = pprintIncr (pprintIncr indent) in
      match
        mapMapAccum
          (lam env. lam k. lam v.
             match pprintCode innerIndent env v with (env, str) in
             (env,
              join [k, " = ", str]))
           env bindings
      with (env, bindMap) in
      let binds = mapValues bindMap in
      let merged =
        strJoin ", " binds
      in
      (env, join [
        "{extend ",
        eStr,
        " with ",
        merged,
        "}"
      ])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DeclCosynPrettyPrint" kind="lang" link="/docs/Stdlib/extrec/pprint.mc/lang-DeclCosynPrettyPrint">

```mc
lang DeclCosynPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang DeclCosynPrettyPrint = DeclPrettyPrint + CosynDeclAst
  sem pprintDeclCode indent env =
  | DeclCosyn t ->
    match pprintTypeName env t.ident with (env, typeNameStr) in
    match mapAccumL pprintEnvGetStr env t.params with (env, params) in
    let params = join (map (concat " ") params) in

    match getTypeStringCode indent env t.ty with (env, typeStr) in
    let eqSym = if t.isBase then " = " else " *= " in

    (env, join ["cosyn ", typeNameStr, params, eqSym, typeStr])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CopatPrettyPrint" kind="lang" link="/docs/Stdlib/extrec/pprint.mc/lang-CopatPrettyPrint">

```mc
lang CopatPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang CopatPrettyPrint = CopatAst
  sem getCopatStringCode indent env =
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecordCopatPrettyPrint" kind="lang" link="/docs/Stdlib/extrec/pprint.mc/lang-RecordCopatPrettyPrint">

```mc
lang RecordCopatPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang RecordCopatPrettyPrint = RecordCopatAst + CopatPrettyPrint + MExprIdentifierPrettyPrint
  sem getCopatStringCode indent env =
  | RecordCopat c ->
    (env, join ["{ ", strJoin ", " c.fields, " }"])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DeclCosemPrettyPrint" kind="lang" link="/docs/Stdlib/extrec/pprint.mc/lang-DeclCosemPrettyPrint">

```mc
lang DeclCosemPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang DeclCosemPrettyPrint = DeclPrettyPrint + CosemDeclAst + RecordCopatPrettyPrint
  sem pprintDeclCode indent env =
  | DeclCosem t ->
    match pprintVarName env t.ident with (env, ident) in

    let pair = match t.tyAnnot with !TyUnknown _ then
      match getTypeStringCode indent env t.tyAnnot with (env, tyStr) in
      (env, Some (join ["cosem ", ident, " : ", tyStr]))
    else
      (env, None ()) in

    match pair with (env, typeAnnotStr) in

    let eqSym = if t.isBase then " = " else " *= " in

    let pprintCase = lam env. lam cs.
      match cs with (copat, tm) in
      match getCopatStringCode indent env copat with (env, copat) in
      match pprintCode (pprintIncr indent) env tm with (env, tm) in
      (env, join [pprintSpacing indent, "| ", copat, " <- ", "\n",
                  pprintSpacing (pprintIncr indent), tm]) in
    match mapAccumL pprintCase env t.cases with (env, str) in
    let str = strJoin "\n" str in

    let bodyStr = join ["cosem ", ident, eqSym, "\n", str] in

    match typeAnnotStr with Some typeAnnotStr then
      (env, join [typeAnnotStr, pprintNewline indent, bodyStr])
    else
      (env, bodyStr)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TypeAbsPrettyPrint" kind="lang" link="/docs/Stdlib/extrec/pprint.mc/lang-TypeAbsPrettyPrint">

```mc
lang TypeAbsPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang TypeAbsPrettyPrint = PrettyPrint + TypeAbsAst
  sem getTypeStringCode indent env =
  | TyAbs t ->
    match pprintVarName env t.ident with (env, ident) in
    match getTypeStringCode indent env t.body with (env, body) in
    (env, join ["Lam ", ident, ". ", body])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TypeAbsAppAst" kind="lang" link="/docs/Stdlib/extrec/pprint.mc/lang-TypeAbsAppAst">

```mc
lang TypeAbsAppAst
```



<ToggleWrapper text="Code..">
```mc
lang TypeAbsAppAst = PrettyPrint + TypeAbsAppAst
  sem getTypeStringCode indent env =
  | TyAbsApp t ->
    match getTypeStringCode indent env t.lhs with (env, lhs) in
    match getTypeStringCode indent env t.rhs with (env, rhs) in
    (env, join [lhs, " @ ", rhs])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PatExtRecordPrettyPrint" kind="lang" link="/docs/Stdlib/extrec/pprint.mc/lang-PatExtRecordPrettyPrint">

```mc
lang PatExtRecordPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang PatExtRecordPrettyPrint = PrettyPrint + ExtRecordPat
  sem getPatStringCode indent env =
  | PatExtRecord {ident = ident, bindings = bindings} ->
    match pprintTypeName env ident with (env, ident) in
    if mapIsEmpty bindings then (env, join ["{", ident, " of nothing}"])
    else match record2tuple bindings with Some pats then
      match mapAccumL (lam env. lam e. getPatStringCode indent env e) env pats
      with (env, tuplePats) in
      let merged =
        match tuplePats with [e]
        then concat e ","
        else strJoin ", " tuplePats in
      (env, join ["(", merged, ")"])
    else match
      mapMapAccum
        (lam env. lam k. lam v.
           match getPatStringCode indent env v with (env,str) in
           (env,join [pprintLabelString k, " = ", str]))
         env bindings
    with (env,bindMap) in
    (env,join ["{", ident, " of ", strJoin ", " (mapValues bindMap), "}"])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SynProdExtDeclPrettyPrint" kind="lang" link="/docs/Stdlib/extrec/pprint.mc/lang-SynProdExtDeclPrettyPrint">

```mc
lang SynProdExtDeclPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang SynProdExtDeclPrettyPrint = DeclPrettyPrint + SynProdExtDeclAst
  sem pprintDeclCode (indent : Int) (env : PprintEnv) =
  | SynDeclProdExt t ->
    match pprintTypeName env t.ident with (env, typeNameStr) in
    match mapAccumL pprintEnvGetStr env t.params with (env, params) in
    let params = join (map (concat " ") params) in
    match
      mapAccumL (lam env. lam indivExt.
        match pprintConName env indivExt.ident with (env, str) in
        match getTypeStringCode (pprintIncr indent) env indivExt.tyIdent
        with (env, ty) in
        (env, join ["| ", str, " ", ty])
      ) env t.individualExts
    with (env, indivExtStr) in

    match
      match t.globalExt with Some ext then
        match getTypeStringCode (pprintIncr indent) env ext
        with (env, str) in (env, str)
      else
        (env, "")
    with (env, globExtStr) in

    (env, strJoin (pprintNewline indent)
                  (cons (join ["syn ", typeNameStr, params, " *= ", globExtStr]) indivExtStr))

end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ExtRecPrettyPrint" kind="lang" link="/docs/Stdlib/extrec/pprint.mc/lang-ExtRecPrettyPrint">

```mc
lang ExtRecPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang ExtRecPrettyPrint = ExtRecTermPrettyPrint +
                         TypeAbsPrettyPrint + TypeAbsAppAst +
                         DeclCosemPrettyPrint +
                         DeclCosynPrettyPrint + PatExtRecordPrettyPrint +
                         MLangPrettyPrint + SynProdExtDeclPrettyPrint
end
```
</ToggleWrapper>
</DocBlock>

