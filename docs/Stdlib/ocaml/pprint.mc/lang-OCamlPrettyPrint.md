import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintOcamlTops" kind="sem">

```mc
sem pprintOcamlTops : [OCamlTopAst_Top] -> String
```



<ToggleWrapper text="Code..">
```mc
sem pprintOcamlTops =
  | tops ->
    let env = collectTopNames tops in
    match mapAccumL pprintTop env tops with (_, tops) then
      strJoin "\n" tops
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_nameSymString" kind="sem">

```mc
sem _nameSymString : ((String, Symbol) -> (String, Symbol)) -> Name -> String
```



<ToggleWrapper text="Code..">
```mc
sem _nameSymString (esc : Name -> Name) =
  | name ->
    join [ nameGetStr (esc name)
         , "\'"
         , (int2string (sym2hash (optionGetOrElse
                                   (lam. error "Expected symbol")
                                   (nameGetSym name))))]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_nameNoSymString" kind="sem">

```mc
sem _nameNoSymString : String -> ((String, Symbol) -> (String, Symbol)) -> Name -> String
```



<ToggleWrapper text="Code..">
```mc
sem _nameNoSymString (prefix : String) (esc : Name -> Name) =
  | name ->
    concat prefix (nameGetStr (esc name))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintConName" kind="sem">

```mc
sem pprintConName : PprintEnv -> Name -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintConName (env : PprintEnv) =
  | name ->
    (env,
     if nameHasSym name then
       _nameSymString escapeConName name
     else
       _nameNoSymString noSymConPrefix escapeConName name)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintVarName" kind="sem">

```mc
sem pprintVarName : PprintEnv -> Name -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintVarName (env : PprintEnv) =
  | name ->
    (env,
     match mapLookup name env.nameMap with Some n then n
     else if nameHasSym name then
       _nameSymString escapeName name
     else
       _nameNoSymString noSymVarPrefix escapeName name)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintLabelString" kind="sem">

```mc
sem pprintLabelString : SID -> String
```



<ToggleWrapper text="Code..">
```mc
sem pprintLabelString =
  | s -> escapeLabelString (sidToString s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | TmPlaceholder _ -> true
  | TmLam _ -> false
  | TmDecl {decl = DeclLet _} -> false
  | TmDecl {decl = DeclRecLets _} -> false
  | TmRecord _ -> true
  | TmRecordUpdate _ -> true
  | OTmArray _ -> true
  | OTmMatch _ -> false
  | OTmTuple _ -> true
  | OTmConApp {args = []} -> true
  | OTmConApp _ -> false
  | OTmVarExt _ -> true
  | OTmExprExt _ -> false
  | OTmConAppExt _ -> false
  | OTmString _ -> true
  | OTmLabel _ -> true
  | OTmRecord _ -> true
  | OTmProject _ -> true
  | OTmRecordUpdate _ -> true
  | OTmLam _ -> false
  | TmVar _ -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patPrecedence" kind="sem">

```mc
sem patPrecedence : Ast_Pat -> Int
```



<ToggleWrapper text="Code..">
```mc
sem patPrecedence =
  | OPatRecord _ -> 0
  | OPatCon {args = ![]} -> 2
  | OPatConExt _ -> 2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getConstStringCode" kind="sem">

```mc
sem getConstStringCode : Int -> ConstAst_Const -> String
```



<ToggleWrapper text="Code..">
```mc
sem getConstStringCode (indent : Int) =
  | CUnsafeCoerce _ -> "(fun x -> x)"
  -- NOTE(oerikss, 2023-10-06): Integer and float constant can here be both
  -- negative and positive. Note that -0 = 0, which is the reason for the
  -- condition on grouping below.
  | CInt {val = n} ->
    if eqi n 0 then "0"
    else
      let str = int2string n in
      if leqi n 0 then join ["(", str, ")"] else str
  | CFloat {val = f} ->
    if eqf f 0. then "0."
    else
      if eqf f (divf 1. 0.) then "infinity"
      else
        if eqf f (negf (divf 1. 0.)) then "neg_infinity"
        else
          let str = float2string f in
          if leqf f 0. then join ["(", str, ")"] else str
  | CAddi _ -> "Int.add"
  | CSubi _ -> "Int.sub"
  | CMuli _ -> "Int.mul"
  | CDivi _ -> "Int.div"
  | CModi _ -> "Int.rem"
  | CNegi _ -> "Int.neg"
  | CAddf _ -> "Float.add"
  | CSubf _ -> "Float.sub"
  | CMulf _ -> "Float.mul"
  | CDivf _ -> "Float.div"
  | CNegf _ -> "Float.neg"
  | CBool {val = b} -> if b then "true" else "false"
  | CEqi _ -> "((=) : int -> int -> bool)"
  | CLti _ -> "((<) : int -> int -> bool)"
  | CLeqi _ -> "((<=) : int -> int -> bool)"
  | CGti _ -> "((>) : int -> int -> bool)"
  | CGeqi _ -> "((>=) : int -> int -> bool)"
  | CNeqi _ -> "((<>) : int -> int -> bool)"
  | CSlli _ -> "Int.shift_left"
  | CSrli _ -> "Int.shift_right_logical"
  | CSrai _ -> "Int.shift_right"
  | CEqf _ -> "((=) : float -> float -> bool)"
  | CLtf _ -> "((<) : float -> float -> bool)"
  | CLeqf _ -> "((<=) : float -> float -> bool)"
  | CGtf _ -> "((>) : float -> float -> bool)"
  | CGeqf _ -> "((>=) : float -> float -> bool)"
  | CNeqf _ -> "((<>) : float -> float -> bool)"
  | CInt2float _ -> "float_of_int"
  | CChar {val = c} -> int2string (char2int c)
  | CEqc _ -> "Int.equal"
  | CChar2Int _ -> "Fun.id"
  | CInt2Char _ -> "Fun.id"
  | CRef _ -> "ref"
  | CModRef _ -> "(:=)"
  | CDeRef _ -> "(!)"
  | CConstructorTag _ -> intrinsicOpConTag "constructor_tag"
  | CFloorfi _ -> intrinsicOpFloat "floorfi"
  | CCeilfi _ -> intrinsicOpFloat "ceilfi"
  | CRoundfi _ -> intrinsicOpFloat "roundfi"
  | CStringIsFloat _ -> intrinsicOpFloat "string_is_float"
  | CString2float _ -> intrinsicOpFloat "string2float"
  | CFloat2string _ -> intrinsicOpFloat "float2string"
  | CCreate _ -> intrinsicOpSeq "create"
  | CCreateList _ -> intrinsicOpSeq "create_list"
  | CCreateRope _ -> intrinsicOpSeq "create_rope"
  | CIsList _ -> intrinsicOpSeq "is_list"
  | CIsRope _ -> intrinsicOpSeq "is_rope"
  | CLength _ -> intrinsicOpSeq "length"
  | CConcat _ -> intrinsicOpSeq "concat"
  | CGet _ -> intrinsicOpSeq "get"
  | CSet _ -> intrinsicOpSeq "set"
  | CCons _ -> intrinsicOpSeq "cons"
  | CSnoc _ -> intrinsicOpSeq "snoc"
  | CSplitAt _ -> intrinsicOpSeq "split_at"
  | CReverse _ -> intrinsicOpSeq "reverse"
  | CHead _ -> intrinsicOpSeq "head"
  | CTail _ -> intrinsicOpSeq "tail"
  | CNull _ -> intrinsicOpSeq "null"
  | CMap _ -> intrinsicOpSeq "map"
  | CMapi _ -> intrinsicOpSeq "mapi"
  | CIter _ -> intrinsicOpSeq "iter"
  | CIteri _ -> intrinsicOpSeq "iteri"
  | CFoldl _ -> intrinsicOpSeq "Helpers.fold_left"
  | CFoldr _ -> intrinsicOpSeq "Helpers.fold_right"
  | CSubsequence _ -> intrinsicOpSeq "subsequence"
  | CPrint _ -> intrinsicOpIO "print"
  | CPrintError _ -> intrinsicOpIO "print_error"
  | CDPrint _ -> intrinsicOpIO "dprint"
  | CFlushStdout _ -> intrinsicOpIO "flush_stdout"
  | CFlushStderr _ -> intrinsicOpIO "flush_stderr"
  | CReadLine _ -> intrinsicOpIO "read_line"
  | CArgv _ -> intrinsicOpSys "argv"
  | CFileRead _ -> intrinsicOpFile "read"
  | CFileWrite _ -> intrinsicOpFile "write"
  | CFileExists _ -> intrinsicOpFile "exists"
  | CFileDelete _ -> intrinsicOpFile "delete"
  | CError _ -> intrinsicOpSys "error"
  | CExit _ -> intrinsicOpSys "exit"
  | CCommand _ -> intrinsicOpSys "command"
  | CEqsym _ -> intrinsicOpSymb "eqsym"
  | CGensym _ -> intrinsicOpSymb "gensym"
  | CSym2hash _ -> intrinsicOpSymb "hash"
  | CRandIntU _ -> intrinsicOpRand "int_u"
  | CRandSetSeed _ -> intrinsicOpRand "set_seed"
  | CWallTimeMs _ -> intrinsicOpTime "get_wall_time_ms"
  | CSleepMs _ -> intrinsicOpTime "sleep_ms"
  | CTensorIterSlice _ -> intrinsicOpTensor "iter_slice"
  | CTensorCreateUninitInt _ -> intrinsicOpTensor "uninit_int_packed"
  | CTensorCreateUninitFloat _ -> intrinsicOpTensor "uninit_float_packed"
  | CTensorCreateInt _ -> intrinsicOpTensor "create_int_packed"
  | CTensorCreateFloat _ -> intrinsicOpTensor "create_float_packed"
  | CTensorCreate _ -> intrinsicOpTensor "create_generic_packed"
  | CTensorRank _ -> intrinsicOpTensor "rank"
  | CTensorShape _ -> intrinsicOpTensor "shape"
  | CTensorGetExn _ -> intrinsicOpTensor "get_exn"
  | CTensorSetExn _ -> intrinsicOpTensor "set_exn"
  | CTensorLinearGetExn _ -> intrinsicOpTensor "linear_get_exn"
  | CTensorLinearSetExn _ -> intrinsicOpTensor "linear_set_exn"
  | CTensorReshapeExn _ -> intrinsicOpTensor "reshape_exn"
  | CTensorCopy _ -> intrinsicOpTensor "copy"
  | CTensorTransposeExn _ -> intrinsicOpTensor "transpose_exn"
  | CTensorSliceExn _ -> intrinsicOpTensor "slice_exn"
  | CTensorSubExn _ -> intrinsicOpTensor "sub_exn"
  | CTensorEq _ -> intrinsicOpTensor "equal"
  | CTensorToString _ -> intrinsicOpTensor "to_string"
  | CBootParserParseMExprString _ -> intrinsicOpBootparser "parseMExprString"
  | CBootParserParseMLangString _ -> intrinsicOpBootparser "parseMLangString"
  | CBootParserParseMLangFile _ -> intrinsicOpBootparser "parseMLangFile"
  | CBootParserParseMCoreFile _ -> intrinsicOpBootparser "parseMCoreFile"
  | CBootParserGetId _ -> intrinsicOpBootparser "getId"
  | CBootParserGetTerm _ -> intrinsicOpBootparser "getTerm"
  | CBootParserGetTop _ -> intrinsicOpBootparser "getTop"
  | CBootParserGetDecl _ -> intrinsicOpBootparser "getDecl"
  | CBootParserGetType _ -> intrinsicOpBootparser "getType"
  | CBootParserGetString _ -> intrinsicOpBootparser "getString"
  | CBootParserGetInt _ -> intrinsicOpBootparser "getInt"
  | CBootParserGetFloat _ -> intrinsicOpBootparser "getFloat"
  | CBootParserGetListLength _ -> intrinsicOpBootparser "getListLength"
  | CBootParserGetConst _ -> intrinsicOpBootparser "getConst"
  | CBootParserGetPat _ -> intrinsicOpBootparser "getPat"
  | CBootParserGetCopat _ -> intrinsicOpBootparser "getCopat"
  | CBootParserGetInfo _ -> intrinsicOpBootparser "getInfo"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectTopNames" kind="sem">

```mc
sem collectTopNames : [OCamlTopAst_Top] -> PprintEnv
```



<ToggleWrapper text="Code..">
```mc
sem collectTopNames =
  | tops ->
    let maybeAdd = lam name. lam str. lam env: PprintEnv.
      match mapLookup str env.strings with Some _ then
        env
      else
        {{env with nameMap = mapInsert name str env.nameMap}
              with strings = setInsert str env.strings}
    in
    let f = lam top. lam env.
      switch top
      case OTopLet t then
        maybeAdd t.ident (escapeVarString t.ident.0) env
      case OTopRecLets t then
        let f = lam binding : OCamlTopBinding. lam env.
          maybeAdd binding.ident (escapeVarString binding.ident.0) env
        in foldr f env t.bindings
      case top then
        env
      end
    in
    foldr f pprintEnvEmpty tops
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintTop" kind="sem">

```mc
sem pprintTop : PprintEnv -> OCamlTopAst_Top -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintTop (env : PprintEnv) =
  | OTopTypeDecl t ->
    let indent = 0 in
    match pprintVarName env t.ident with (env, ident) in
    match getTypeStringCode indent env t.ty with (env, ty) in
    (env, join ["type ", ident, " = ", ty, ";;"])
  | OTopVariantTypeDecl t ->
    let indent = 0 in
    let f = lam env. lam ident. lam ty.
      match pprintConName env ident with (env, ident) then
        let isUnit = match ty with TyRecord {fields = fields} then
          mapIsEmpty fields else false in
        if isUnit then
          (env, join ["| ", ident])
        else match getTypeStringCode indent env ty with (env, ty) then
          (env, join ["| ", ident, " of ", ty])
        else never
      else never
    in
    match pprintVarName env t.ident with (env, ident) then
      match mapMapAccum f env t.constrs with (env, constrs) then
        let constrs = strJoin (pprintNewline (pprintIncr indent))
                              (mapValues constrs) in
        (env, join ["type ", ident, " =", pprintNewline (pprintIncr indent),
                    constrs, ";;"])
      else never
    else never
  | OTopCExternalDecl t ->
    -- NOTE(larshum, 2022-03-10): Externals are declared before type
    -- definitions, so we cannot refer to them here. The below function
    -- produces a type string with the correct number of arguments, but
    -- otherwise unspecified types.
    recursive let objTypeString = lam ty.
      match ty with TyArrow {from = from, to = to} then
        join [objTypeString from, " -> ", objTypeString to]
      else "Obj.t" in
    match pprintVarName env t.ident with (env, ident) in
    let ty = objTypeString t.ty in
    (env, join ["external ", ident, " : ", ty, " = ",
                "\"", nameGetStr t.bytecodeIdent, "\" ",
                "\"", nameGetStr t.nativeIdent, "\";;"])
  | OTopLet t ->
    let indent = 0 in
    match pprintVarName env t.ident with (env, ident) in
    match collectParameters env t.body with (env, parameters, body) in
    match pprintCode (pprintIncr indent) env body with (env, body) in
    ( env
    , join
      [ "let ", ident, join (map (cons ' ') parameters), " =", pprintNewline (pprintIncr indent)
      , body, ";;"
      ]
    )
  | OTopRecLets {bindings = []} -> (env, "")
  | OTopRecLets {bindings = bindings} ->
    let indent = 0 in
    let f = lam env. lam bind.
      match pprintVarName env bind.ident with (env, ident) in
      match collectParameters env bind.body with (env, parameters, body) in
      let indent = pprintIncr (pprintIncr indent) in
      match pprintCode indent env body with (env, body) in
      ( env
      , join
        [ ident, join (map (cons ' ') parameters), " ="
        , pprintNewline indent , body
        ]
      ) in
    match mapAccumL f env bindings with (env, bindings) in
    ( env
    , join
      [ "let rec ", strJoin (concat (pprintNewline indent) "and ") bindings
      , ";;"
      ]
    )
  | OTopExpr {expr = expr} ->
    let indent = 0 in
    match pprintCode indent env expr with (env, code) then
      (env, concat code ";;")
    else never
  | OTopTryWith {try = try, arms = arms} ->
    let i = pprintIncr 0 in
    let ii = pprintIncr i in
    let iii = pprintIncr ii in
    match pprintCode i env try with (env, try) in
    let pprintArm = lam env. lam arm. match arm with (pat, expr) then
      match getPatStringCode ii env pat with (env, pat) then
        match printParen iii env expr with (env, expr) then
          (env, join [pprintNewline i, "| ", pat, " ->", pprintNewline iii, expr])
        else never
      else never
    else never in
    match mapAccumL pprintArm env arms with (env, arms) then
      (env, join ["try", pprintNewline i, try, pprintNewline 0,
                  "with", join arms])
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectParameters" kind="sem">

```mc
sem collectParameters : PprintEnv -> Ast_Expr -> (PprintEnv, [String], Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectParameters env =
  | TmLam x ->
    match pprintVarName env x.ident with (env, param) in
    match collectParameters env x.body with (env, params, body) in
    (env, cons param params, body)
  | OTmLam x ->
    match pprintVarName env x.ident with (env, param) in
    let param = match x.label with Some label
      then join ["~", label, ":", param]
      else param in
    match collectParameters env x.body with (env, params, body) in
    (env, cons param params, body)
  | tm -> (env, [], tm)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode (indent : Int) (env: PprintEnv) =
  | TmPlaceholder _ -> (env, "(Obj.magic ())")
  | TmVar {ident = ident} -> pprintVarName env ident
  | OTmVarExt {ident = ident} -> (env, ident)
  | OTmExprExt {expr = expr} -> (env, expr)
  | OTmConApp {ident = ident, args = []} -> pprintConName env ident
  | OTmConApp {ident = ident, args = [arg]} ->
    match pprintConName env ident with (env, ident) then
      match printParen indent env arg with (env, arg) then
        (env, join [ident, " ", arg])
      else never
    else never
  | OTmConApp {ident = ident, args = args} ->
    match pprintConName env ident with (env, ident) then
      match mapAccumL (pprintCode indent) env args with (env, args) then
        (env, join [ident, " (", strJoin ", " args, ")"])
      else never
    else never
  | OTmConAppExt {ident = ident, args = []} -> (env, ident)
  | OTmConAppExt {ident = ident, args = [arg]} ->
    match printParen indent env arg with (env, arg) then
      (env, join [ident, " ", arg])
    else never
  | OTmConAppExt {ident = ident, args = args} ->
    match mapAccumL (pprintCode indent) env args with (env, args) then
      (env, join [ident, " (", strJoin ", " args, ")"])
    else never
  | t & (TmLam _ | OTmLam _) ->
    match collectParameters env t with (env, params, body) in
    match pprintCode (pprintIncr indent) env body with (env, body) in
    (env, join ["fun ", strJoin " " params, " ->", pprintNewline (pprintIncr indent), body])
  | TmDecl (x & {decl = DeclLet t}) ->
    match pprintVarName env t.ident with (env,str) in
    match collectParameters env t.body with (env, parameters, body) in
    match pprintCode (pprintIncr indent) env body with (env, body) in
    match pprintCode indent env x.inexpr with (env, inexpr) in
    ( env
    , join
      [ "let ", str, join (map (cons ' ') parameters), " =", pprintNewline (pprintIncr indent)
      , body, pprintNewline indent
      , "in", pprintNewline indent
      , inexpr
      ]
    )
  | TmRecord t ->
    if mapIsEmpty t.bindings then (env, "()")
    else
      let innerIndent = pprintIncr (pprintIncr indent) in
      let orderedLabels = recordOrderedLabels (mapKeys t.bindings) in
      match
        mapAccumL (lam env. lam k.
          let v = mapFindExn k t.bindings in
          match pprintCode innerIndent env v with (env, str) then
            (env, join [pprintLabelString k, " =", pprintNewline innerIndent,
                        "(", str, ")"])
          else never) env orderedLabels
      with (env, binds) then
        let merged =
          strJoin (concat ";" (pprintNewline (pprintIncr indent))) binds
        in
        (env, join ["{ ", merged, " }"])
      else never
  | TmRecordUpdate t ->
    let i = pprintIncr indent in
    let ii = pprintIncr i in
    match pprintCode i env t.rec with (env,rec) then
      match pprintCode ii env t.value with (env,value) then
        (env,join ["{ ", rec, pprintNewline i,
                   "with", pprintNewline i,
                   pprintLabelString t.key, " =", pprintNewline ii, value,
                   " }"])
      else never
    else never
  | OTmRecordUpdate {rec = rec, updates = updates} ->
    let i = pprintIncr indent in
    let ii = pprintIncr i in
    let pprintUpdate = lam env. lam update.
      match update with (key, value) in
      match pprintCode ii env value with (env, value) in
      (env, join [pprintLabelString key, " =", pprintNewline ii, value])
    in
    let pprintUpdates = lam env. lam updates.
      match mapAccumL pprintUpdate env updates with (env, updates) in
      (env, strJoin (concat ";" (pprintNewline i)) updates)
    in
    match pprintCode i env rec with (env, rec) in
    match pprintUpdates env updates with (env, updates) in
    (env, join ["{ ", rec, pprintNewline i,
                "with", pprintNewline i, updates, " }"])
  | TmDecl {decl = DeclRecLets {bindings = []}, inexpr = inexpr} -> pprintCode indent env inexpr
  | TmDecl {decl = DeclRecLets {bindings = bindings}, inexpr = inexpr} ->
    let f = lam env. lam bind.
      match pprintVarName env bind.ident with (env, ident) in
      match collectParameters env bind.body with (env, parameters, body) in
      let indent = pprintIncr (pprintIncr indent) in
      match pprintCode indent env body with (env, body) in
      ( env
      , join
        [ ident, join (map (cons ' ') parameters), " ="
        , pprintNewline indent , body
        ]
      ) in
    match mapAccumL f env bindings with (env, bindings) in
    match pprintCode indent env inexpr with (env, inexpr) in
    ( env
    , join
      [ "let rec ", strJoin (concat (pprintNewline indent) "and ") bindings
      , pprintNewline indent, "in ", inexpr
      ]
    )
  | OTmArray t ->
    let asChar = lam x. match x with TmConst {val = CChar {val = c}} then Some c else None () in
    let strComment =
      match optionMapM asChar t.tms with Some str then
        join [" (* \"", escapeString str, "\" *)"]
      else "" in
    match mapAccumL (lam env. lam tm. pprintCode (pprintIncr indent) env tm)
                    env t.tms
    with (env,tms) then
      let merged =
        strJoin (concat ";" (pprintNewline (pprintIncr indent)))
                (map (lam t. join ["(", t, ")"]) tms)
      in
      (env,join ["[| ", merged, " |]", strComment])
    else never
  | OTmTuple {values = values} ->
    match mapAccumL (pprintCode indent) env values
    with (env, values) then
      (env, join ["(", strJoin ", " values, ")"])
    else never
  | OTmMatch {
    target = target,
    arms
      = [ (PatBool {val = true}, thn), (PatBool {val = false}, els) ]
      | [ (PatBool {val = false}, els), (PatBool {val = true}, thn) ]
    } ->
    let i = indent in
    let ii = pprintIncr i in
    match pprintCode ii env target with (env, target) then
      match pprintCode ii env thn with (env, thn) then
        match pprintCode ii env els with (env, els) then  -- NOTE(vipa, 2020-11-30): if we add sequential composition (\\`;\\`) this will be wrong, it should be \\`printParen\\` instead of \\`printCode\\`.
          (env, join ["if", pprintNewline ii,
                      target, pprintNewline i,
                      "then", pprintNewline ii,
                      thn, pprintNewline i,
                      "else", pprintNewline ii,
                      els])
        else never
      else never
    else never
  | OTmMatch { target = target, arms = [(pat, expr)] } ->
    let i = indent in
    let ii = pprintIncr i in
    match pprintCode ii env target with (env, target) then
      match getPatStringCode ii env pat with (env, pat) then
        match pprintCode i env expr with (env, expr) then  -- NOTE(vipa, 2020-11-30): the NOTE above with the same date does not apply here; \\`let\\` has lower precedence than \\`;\\`
          (env, join ["let", pprintNewline ii,
                      pat, pprintNewline i,
                      "=", pprintNewline ii,
                      target, pprintNewline i,
                      "in", pprintNewline i,
                      expr])
        else never
      else never
    else never
  | OTmMatch {target = target, arms = arms} ->
    let i = indent in
    let ii = pprintIncr i in
    let iii = pprintIncr ii in
    match pprintCode ii env target with (env, target) then
      let pprintArm = lam env. lam arm. match arm with (pat, expr) then
        match getPatStringCode ii env pat with (env, pat) then
          match printParen iii env expr with (env, expr) then
            (env, join [pprintNewline i, "| ", pat, " ->", pprintNewline iii, expr])
          else never
        else never
      else never in
      match mapAccumL pprintArm env arms with (env, arms) then
        (env, join ["match", pprintNewline ii, target, pprintNewline i,
                    "with", join arms])
      else never
    else never
  | OTmString t -> (env, join ["\"", t.text, "\""])
  | OTmLabel {label = label, arg = arg} ->
    match pprintCode indent env arg with (env, arg) then
      (env, join ["~", label, ":(", arg, ")"])
    else never
  | OTmRecord {bindings = bindings, tyident = tyident} ->
    let innerIndent = pprintIncr (pprintIncr indent) in
    match unzip bindings with (labels, tms) in
    match mapAccumL (pprintCode innerIndent) env tms with (env, tms) in
    let strs =
      mapi
        (lam i. lam t.
          join [get labels i, " =", pprintNewline innerIndent, "(", t, ")"])
        tms
    in
    match getTypeStringCode indent env tyident with (env, tystr) in
    let tystr =
      -- NOTE(larshum, 2022-04-06): Do not add type annotations for an inlined
      -- record.
      match tyident with OTyInlinedRecord _ then ""
      else concat " : " tystr
    in
    let merged =
      strJoin (concat ";" (pprintNewline (pprintIncr indent))) strs
    in
    (env, join ["({", merged , "}", tystr, ")"])
  | OTmProject {field = field, tm = tm} ->
    match pprintCode indent env tm with (env, tm) then
      (env, join [tm, ".", field])
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getPatStringCode" kind="sem">

```mc
sem getPatStringCode : Int -> {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> Ast_Pat -> ({count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool}, String)
```



<ToggleWrapper text="Code..">
```mc
sem getPatStringCode (indent : Int) (env : PprintEnv) =
  | OPatRecord {bindings = bindings} ->
    let labels = map pprintLabelString (mapKeys bindings) in
    let pats = mapValues bindings in
    match mapAccumL (getPatStringCode indent) env pats with (env, pats) then
      let strs = mapi (lam i. lam p. join [get labels i, " = ", p]) pats in
      (env, join ["{", strJoin ";" strs, "}"])
    else never
  | OPatTuple {pats = pats} ->
    match mapAccumL (getPatStringCode indent) env pats with (env, pats) then
      (env, join ["(", strJoin ", " pats, ")"])
    else never
  | OPatCon {ident = ident, args = []} -> pprintConName env ident
  | OPatCon {ident = ident, args = [arg]} ->
    match pprintConName env ident with (env, ident) then
      match printPatParen indent 3 env arg with (env, arg) then
        (env, join [ident, " ", arg])
      else never
    else never
  | OPatCon {ident = ident, args = args} ->
    match pprintConName env ident with (env, ident) then
      match mapAccumL (getPatStringCode indent) env args with (env, args) then
        (env, join [ident, " (", strJoin ", " args, ")"])
      else never
    else never
  | OPatConExt {ident = ident, args = []} -> (env, ident)
  | OPatConExt {ident = ident, args = [arg]} ->
    match printPatParen indent 3 env arg with (env, arg) then
      (env, join [ident, " ", arg])
    else never
  | OPatConExt {ident = ident, args = args} ->
    match mapAccumL (getPatStringCode indent) env args with (env, args) then
      (env, join [ident, " (", strJoin ", " args, ")"])
    else never
```
</ToggleWrapper>
</DocBlock>

