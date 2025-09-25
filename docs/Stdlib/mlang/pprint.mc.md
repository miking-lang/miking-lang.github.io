import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# pprint.mc  
  

Pretty Printing for MLang programs.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/bool.mc"} style={S.link}>bool.mc</a>, <a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>mexpr/ast-builder.mc</a>, <a href={"/docs/Stdlib/mexpr/info.mc"} style={S.link}>mexpr/info.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>mexpr/pprint.mc</a>, <a href={"/docs/Stdlib/mlang/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mlang/ast-builder.mc"} style={S.link}>ast-builder.mc</a>  
  
## Languages  
  

          <DocBlock title="MLangIdentifierPrettyPrint" kind="lang" link="/docs/Stdlib/mlang/pprint.mc/lang-MLangIdentifierPrettyPrint">

```mc
lang MLangIdentifierPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang MLangIdentifierPrettyPrint = IdentifierPrettyPrint
  sem pprintLangName (env: PprintEnv) =
  | name ->
    match pprintEnvGetStr env name with (env,str) in
    let s = pprintLangString str in
    (env, s)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="UsePrettyPrint" kind="lang" link="/docs/Stdlib/mlang/pprint.mc/lang-UsePrettyPrint">

```mc
lang UsePrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang UsePrettyPrint = PrettyPrint + UseDeclAst + MLangIdentifierPrettyPrint
  sem pprintDeclCode (indent : Int) (env: PprintEnv) =
  | DeclUse t ->
    match pprintLangName env t.ident with (env,ident) in
    (env, join ["use ", ident])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TyUsePrettyPrint" kind="lang" link="/docs/Stdlib/mlang/pprint.mc/lang-TyUsePrettyPrint">

```mc
lang TyUsePrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang TyUsePrettyPrint = MExprPrettyPrint + TyUseAst + MLangIdentifierPrettyPrint
  sem getTypeStringCode (indent : Int) (env : PprintEnv) =
  | TyUse t ->
    match pprintLangName env t.ident with (env, ident) in
    match getTypeStringCode indent env t.inty with (env, inty) in
    (env, join ["use ", ident, pprintNewline indent,
                "in", pprintNewline indent,
                inty])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="QualifiedNamePrettyPrint" kind="lang" link="/docs/Stdlib/mlang/pprint.mc/lang-QualifiedNamePrettyPrint">

```mc
lang QualifiedNamePrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang QualifiedNamePrettyPrint = MExprPrettyPrint + QualifiedTypeAst +
                                MLangIdentifierPrettyPrint
  sem getTypeStringCode (indent : Int) (env : PprintEnv) =
  | TyQualifiedName t ->
    let prefix = if t.pos then "< " else "> " in
    match pprintLangName env t.lhs with (env, lhs) in
    match pprintTypeName env t.rhs with (env, rhs) in

    if and (null t.plus) (null t.minus) then
      (env, join [prefix, lhs, "::", rhs])
    else
      let pprintList = lam env. lam pairs.
        mapAccumL (lam env. lam pair.
          match pair with (t, c) in
          match pprintTypeName env t with (env, t) in
          match pprintTypeName env c with (env, c) in
          (env, join [t, "::", c])
        ) env pairs
      in

      let plus = if null t.plus then "" else
        match pprintList env t.plus with (env, plus) in
        concat " + " (strJoin ", " plus) in

      let minus = if null t.minus then "" else
        match pprintList env t.minus with (env, minus) in
        concat " - " (strJoin ", " minus) in

      (env, join [prefix, "(", lhs, "::", rhs, plus, minus, ")"])

end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LangDeclPrettyPrint" kind="lang" link="/docs/Stdlib/mlang/pprint.mc/lang-LangDeclPrettyPrint">

```mc
lang LangDeclPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang LangDeclPrettyPrint = PrettyPrint + LangDeclAst + MLangIdentifierPrettyPrint
  sem pprintDeclSequenceCode : Int -> PprintEnv -> [Decl] -> (PprintEnv, String)
  sem pprintDeclSequenceCode (indent : Int) (env : PprintEnv) =
  | decls ->
    let declFoldResult = foldl (lam acc. lam decl.
      match acc with (env, accDecls) in
      match pprintDeclCode indent env decl with (env, declString) in
      (env, snoc accDecls declString)
    ) (env, []) decls in
    match declFoldResult with (env, declStrings) in
    (env, strJoin (pprintNewline indent) declStrings)

  sem pprintDeclCode (indent : Int) (env : PprintEnv) =
  | DeclLang t ->
    match pprintLangName env t.ident with (env, langNameStr) in
    match
      mapAccumL pprintLangName env t.includes
    with (env, inclStrs) in
    match pprintDeclSequenceCode (pprintIncr indent) env t.decls
    with (env, declSeqStr) in
    let inclEqStr =
      if eqi (length inclStrs) 0 then
        ""
      else
        let nl = pprintNewline (pprintIncr indent) in
        concat (concat " =" nl)
               (strJoin (concat nl "+ ") inclStrs)
    in
    let langContents =
      if eqString declSeqStr "" then ""
      else join [pprintNewline (pprintIncr indent), declSeqStr]
    in
    (env, join ["lang ", langNameStr, inclEqStr, langContents,
                pprintNewline indent, "end"])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SynDeclPrettyPrint" kind="lang" link="/docs/Stdlib/mlang/pprint.mc/lang-SynDeclPrettyPrint">

```mc
lang SynDeclPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang SynDeclPrettyPrint = PrettyPrint + SynDeclAst + DataPrettyPrint
  sem pprintDeclCode (indent : Int) (env : PprintEnv) =
  | DeclSyn t ->
    match pprintTypeName env t.ident with (env, typeNameStr) in
    match mapAccumL pprintEnvGetStr env t.params with (env, params) in
    let params = join (map (concat " ") params) in
    match
      mapAccumL (lam env. lam syndef.
        match pprintConName env syndef.ident with (env, str) in
        match getTypeStringCode (pprintIncr indent) env syndef.tyIdent
        with (env, ty) in
        (env, join ["| ", str, " ", ty])
      ) env t.defs
    with (env, defStrings) in

    let eqSym = switch t.declKind
      case BaseKind _ then " ="
      case SumExtKind _ then " +="
    end in

    (env, strJoin (pprintNewline indent)
                  (cons (join ["syn ", typeNameStr, params, eqSym]) defStrings))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SemDeclPrettyPrint" kind="lang" link="/docs/Stdlib/mlang/pprint.mc/lang-SemDeclPrettyPrint">

```mc
lang SemDeclPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang SemDeclPrettyPrint = PrettyPrint + SemDeclAst + UnknownTypeAst
  sem pprintDeclCode (indent : Int) (env : PprintEnv) =
  | DeclSem t ->
    match pprintEnvGetStr env t.ident with (env, baseStr) in
    match
      match t.tyAnnot with !TyUnknown _ then
        -- sem typedecl
        match getTypeStringCode indent env t.tyAnnot with (env, tyStr) in
        (env, Some (join ["sem ", baseStr, " : ", tyStr]))
      else (env, None ())
    with (env, mDecl) in
    match
      match (t.args, t.cases) with !(None _, []) then
        -- sem impl
        match
          match t.args with Some args in
          mapAccumL (lam env. lam arg.
            match pprintEnvGetStr env arg.ident with (env, baseStr) in
            match arg.tyAnnot with TyUnknown _ then
              (env, baseStr)
            else
              match getTypeStringCode indent env arg.tyAnnot with (env, tyStr) in
              (env, join ["(", baseStr, " : ", tyStr, ")"])
          ) env args
        with (env, argStrs) in
        match
          mapAccumL (lam env. lam semcase.
            match getPatStringCode (pprintIncr indent) env semcase.pat
            with (env, patStr) in
            match pprintCode (pprintIncr indent) env semcase.thn
            with (env, exprStr) in
            (env, join ["| ", patStr, " ->", pprintNewline (pprintIncr indent), exprStr])
          ) env t.cases
        with (arg, caseStrs) in

        let eqSym = switch t.declKind
          case BaseKind _ then " ="
          case SumExtKind _ then " +="
          case _ then "?"
        end in

        let final = strJoin (pprintNewline indent) (
                cons (join ["sem ", baseStr, strJoin " " (cons "" argStrs), eqSym])
                     caseStrs) in
        (env, Some final)
      else (env, None ())
    with (env, mImpl) in
    (env, strJoin "\n" (mapOption identity [mDecl, mImpl]))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IncludeDeclPrettyPrint" kind="lang" link="/docs/Stdlib/mlang/pprint.mc/lang-IncludeDeclPrettyPrint">

```mc
lang IncludeDeclPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang IncludeDeclPrettyPrint = PrettyPrint + IncludeDeclAst
  sem pprintDeclCode (indent : Int) (env : PprintEnv) =
  | DeclInclude t -> (env, join ["include \"", escapeString t.path, "\""])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MLangTopLevelPrettyPrint" kind="lang" link="/docs/Stdlib/mlang/pprint.mc/lang-MLangTopLevelPrettyPrint">

```mc
lang MLangTopLevelPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang MLangTopLevelPrettyPrint = PrettyPrint + MLangTopLevel
  sem mlang2str : MLangProgram -> String
  sem mlang2str =
  | prog -> match pprintMLangProgram 0 pprintEnvEmpty prog with (_, s) in s

  sem pprintMLangProgram (indent : Int) (env : PprintEnv) =
  | {decls = decls, expr = expr} ->
    match mapAccumL (pprintDeclCode indent) env decls with (env, declStrs) in
    match pprintCode indent env expr with (env, exprStr) in
    (env, strJoin (pprintNewline indent) (concat declStrs ["mexpr", exprStr]))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MLangPrettyPrint" kind="lang" link="/docs/Stdlib/mlang/pprint.mc/lang-MLangPrettyPrint">

```mc
lang MLangPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang MLangPrettyPrint = MExprPrettyPrint +

  -- Extended expressions and types
  UsePrettyPrint + TyUsePrettyPrint + QualifiedNamePrettyPrint +

  -- Declarations
  LangDeclPrettyPrint + SynDeclPrettyPrint + SemDeclPrettyPrint +
  IncludeDeclPrettyPrint +


  -- Top-level pretty printer
  MLangTopLevelPrettyPrint
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="pprintLangString" kind="let">

```mc
let pprintLangString str : String -> String
```

<Description>{`Language fragment string parser translation`}</Description>


<ToggleWrapper text="Code..">
```mc
let pprintLangString = lam str.
  _parserStr str "#lang" _isValidIdentContents
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr


use MLangPrettyPrint in

let prog: MLangProgram = {
  decls = [
    decl_include_ "common.mc",
    decl_include_ "string.mc",
    decl_langi_ "Test1" [] [],
    decl_langi_ "test2" ["Test1"] [],
    decl_langi_ "The 3rd Test" ["Test1", "test2"] [],
    ext_ "my_external" false (tyarrow_ tyfloat_ tystr_),
    ext_ "my_external2" true (tyarrow_ tyint_ tystr_),
    decl_lang_ "Foo" [
      decl_syn_ "Bar" [
        ("Apple", tyint_),
        ("Pear", tyseq_ tyfloat_)
      ],
      decl_usem_ "getFruit" ["x"] [
        (pcon_ "Apple" (pvar_ "i"), appf1_ (var_ "int2string") (var_ "i")),
        (pcon_ "Pear" (pvar_ "fs"),
         bind_
           (ulet_ "strJoin" (unit_))
           (appf2_ (var_ "strJoin")
                  (var_ "x")
                  (appf2_ (var_ "map") (var_ "float2string") (var_ "fs")))
         )
      ]
    ],
    type_ "MyType" ["x"] tyunknown_,
    condef_ "MyCon" (tyall_ "x" (tyarrows_ [tyseq_ (tyvar_ "x"), tyapp_ (tycon_ "MyType") (tyvar_ "x")])),
    ureclets_ [
      ("rec_foo", ulams_ ["x"] (appf1_ (var_ "printLn") (var_ "x"))),
      ("rec_bar", ulams_ ["y"] (appf2_ (var_ "concat") (var_ "y") (var_ "y")))
    ],
    ureclets_ [
      ("rec_babar", ulams_ ["z"] (seq_ [var_ "z"]))
    ],
    ureclets_ [],
    utest_ (appf1_ (var_ "rec_babar") (int_ 5)) (seq_ [int_ 5]),
    ulet_ "foo" (
      ulams_ ["x", "y"] (bind_
        (use_ "Foo")
        (concat_ (appf1_ (var_ "getFruit")
                        (conapp_ "Apple" (var_ "x")))
                (appf1_ (var_ "float2string") (var_ "y")))
      )
    )
  ],
  expr = appf1_ (var_ "printLn")
                (appf2_ (var_ "foo") (int_ 10) (float_ 0.5))
} in

print (mlang2str prog); print "\n";
utest length (mlang2str prog) with 0 using geqi in

let prog2: MLangProgram = {
  decls = [
    decl_include_ "common.mc",
    decl_include_ "string.mc",
    decl_langi_ "Test1" [] [],
    decl_langi_ "test2" ["Test1"] [],
    decl_langi_ "The 3rd Test" ["Test1", "test2"] [],
    ext_ "my_external" false (tyarrow_ tyfloat_ tystr_),
    ext_ "my_external2" true (tyarrow_ tyint_ tystr_),
    decl_lang_ "Foo" [
      decl_syn_ "Bar" [
        ("Apple", tyint_),
        ("Pear", tyseq_ tyfloat_)
      ],
      decl_usem_ "getFruit" ["x"] [
        (pcon_ "Apple" (pvar_ "i"), appf1_ (var_ "int2string") (var_ "i")),
        (pcon_ "Pear" (pvar_ "fs"),
         bind_
           (ulet_ "strJoin" unit_)
           (appf2_ (var_ "strJoin")
                  (var_ "x")
                  (appf2_ (var_ "map") (var_ "float2string") (var_ "fs")))
         )
      ]
    ],
    type_ "MyType" ["x"] tyunknown_,
    condef_ "MyCon" (tyall_ "x" (tyarrows_ [tyseq_ (tyvar_ "x"), tyapp_ (tycon_ "MyType") (tyvar_ "x")])),
    ureclets_ [
      ("rec_foo", ulams_ ["x"] (appf1_ (var_ "printLn") (var_ "x"))),
      ("rec_bar", ulams_ ["y"] (appf2_ (var_ "concat") (var_ "y") (var_ "y")))
    ],
    ureclets_ [
      ("rec_babar", ulams_ ["z"] (seq_ [var_ "z"]))
    ],
    ureclets_ [],
    utest_ (appf1_ (var_ "rec_babar") (int_ 5)) (seq_ [int_ 5]),
    ulet_ "foo" (
      ulams_ ["x", "y"] (bind_
        (use_ "Foo")
        (concat_ (appf1_ (var_ "getFruit")
                        (conapp_ "Apple" (var_ "x")))
                (appf1_ (var_ "float2string") (var_ "y")))
      )
    )
  ],
  expr = appf1_ (var_ "printLn")
                (appf2_ (var_ "foo") (int_ 10) (float_ 0.5))
} in

print (mlang2str prog2); print "\n\n";

()
```
</ToggleWrapper>
</DocBlock>

