import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CExprTypePrettyPrint  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
C TYPES AND EXPRESSIONS \-\-  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
  
## Semantics  
  

          <DocBlock title="printCType" kind="sem">

```mc
sem printCType : String -> PprintEnv -> CExprTypeAst_CType -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem printCType (decl: String) (env: PprintEnv) =

  | CTyVar { id = id } ->
    match cPprintEnvGetStr env id with (env,id) then
      (env, _joinSpace id decl)
    else never

  | CTyChar {} -> (env, _joinSpace "char" decl)
  | CTyInt {}  -> (env, _joinSpace "int" decl)
  | CTyInt32 {} -> (env, _joinSpace "int32_t" decl)
  | CTyInt64 {} -> (env, _joinSpace "int64_t" decl)
  | CTyFloat {} -> (env, _joinSpace "float" decl)
  | CTyDouble {} -> (env, _joinSpace "double" decl)
  | CTyVoid {} -> (env, _joinSpace "void" decl)
  | CTyPtr { ty = ty } -> printCType (join ["(*", decl, ")"]) env ty

  | CTyFun { ret = ret, params = params } ->
    match mapAccumL (printCType "") env params with (env,params) then
      let params = join ["(", strJoin ", " params, ")"] in
      printCType (join [decl, params]) env ret
    else never

  | CTyArray { ty = ty, size = size } ->
    let subscr =
      match size with Some size then printCExpr env size else (env,"") in
    match subscr with (env,subscr) then
      printCType (join [decl, "[", subscr, "]"]) env ty
    else never

  | CTyStruct { id = id, mem = mem } ->
    let idtup =
      match id with Some id then cPprintEnvGetStr env id else (env, "") in
    match idtup with (env,id) then
      match mem with Some mem then
        let f = lam env. lam t: (CType, Option Name).
          match t.1 with Some n then
            match cPprintEnvGetStr env n with (env,n) then
              printCType n env t.0
            else never
          else match t.1 with None _ then
            printCType "" env t.0
          else never
        in
        match mapAccumL f env mem with (env,mem) then
          let mem = map (lam s. join [s,";"]) mem in
          let mem = strJoin " " mem in
          (env, _joinSpace (join [_joinSpace "struct" id, " {", mem, "}"]) decl)
        else never
      else match mem with None _ then
        (env, _joinSpace (_joinSpace "struct" id) decl)
      else never
    else never

  | CTyUnion { id = id, mem = mem } ->
    let idtup =
      match id with Some id then cPprintEnvGetStr env id else (env, "") in
    match idtup with (env,id) then
      match mem with Some mem then
        let f = lam env. lam t: (CType, Option Name).
          match t.1 with Some n then
            match cPprintEnvGetStr env n with (env,n) then
              printCType n env t.0
            else never
          else printCType "" env t.0
        in
        match mapAccumL f env mem with (env,mem) then
          let mem = map (lam s. join [s,";"]) mem in
          let mem = strJoin " " mem in
          (env, _joinSpace (join [_joinSpace "union" id, " {", mem, "}"]) decl)
        else never
      else (env, _joinSpace (_joinSpace "union " id) decl)
    else never

  | CTyEnum { id = id, mem = mem } ->
    let idtup =
      match id with Some id then cPprintEnvGetStr env id else (env, "") in
    match idtup with (env,id) then
      match mem with Some mem then
        match mapAccumL cPprintEnvGetStr env mem with (env,mem) then
          let mem = strJoin ", " mem in
          (env, _joinSpace (join [_joinSpace "enum" id, " {", mem, "}"]) decl)
        else never
      else (env, _joinSpace (_joinSpace "enum" id) decl)
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printCExpr" kind="sem">

```mc
sem printCExpr : PprintEnv -> CExprTypeAst_CExpr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem printCExpr (env: PprintEnv) =

  | CEVar { id = id } -> cPprintEnvGetStr env id

  -- NOTE(larshum, 2021-09-03): We might need to add parentheses around
  -- applications in the future, if we add support for scope resolution
  -- (see https://en.cppreference.com/w/cpp/language/operator_precedence).
  | CEApp { fun = fun, args = args } ->
    match cPprintEnvGetStr env fun with (env,fun) then
      match mapAccumL printCExpr env args with (env,args) then
        (env, join [fun, "(", (strJoin ", " args), ")"])
      else never
    else never

  | CEInt   { i = i } -> (env, int2string i)
  | CEFloat { f = f } -> (env, float2string f)
  | CEChar  { c = c } -> (env, ['\'', c, '\''])

  | CEString { s = s } -> (env, join ["\"", escapeString s, "\""])

  | CEBinOp { op = op, lhs = lhs, rhs = rhs } ->
    match printCExpr env lhs with (env,lhs) then
      match printCExpr env rhs with (env,rhs) then
        (env, _par (printCBinOp lhs rhs op))
      else never
    else never

  | CEUnOp { op = op, arg = arg } ->
    match printCExpr env arg with (env,arg) then
      (env, _par (printCUnOp arg op))
    else never

  | CEMember { lhs = lhs, id = id } ->
    match cPprintEnvGetStr env id with (env,id) then
      match printCExpr env lhs with (env,lhs) then
        (env, _par (join [lhs, ".", escapeIdentifier id]))
      else never
    else never

  | CEArrow { lhs = lhs, id = id } ->
    match cPprintEnvGetStr env id with (env,id) then
      match printCExpr env lhs with (env,lhs) then
        (env, _par (join [lhs, "->", escapeIdentifier id]))
      else never
    else never

  | CECast { ty = ty, rhs = rhs } ->
    match printCType "" env ty with (env,ty) then
      match printCExpr env rhs with (env,rhs) then
        (env, _par (join ["( ", ty, " ) ", rhs]))
      else never
    else never

  | CESizeOfType { ty = ty } ->
    match printCType "" env ty with (env,ty) then
      (env, _par (join ["sizeof(", ty, ")"]))
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printCBinOp" kind="sem">

```mc
sem printCBinOp : String -> String -> CExprTypeAst_CBinOp -> String
```



<ToggleWrapper text="Code..">
```mc
sem printCBinOp (lhs: String) (rhs: String) =
  | COAssign    {} -> join [lhs, " = ", rhs]
  | COSubScript {} -> join [lhs, "[", rhs, "]"]
  | COOr        {} -> join [lhs, " || ", rhs]
  | COAnd       {} -> join [lhs, " && ", rhs]
  | COEq        {} -> join [lhs, " == ", rhs]
  | CONeq       {} -> join [lhs, " != ", rhs]
  | COLt        {} -> join [lhs, " < ", rhs]
  | COGt        {} -> join [lhs, " > ", rhs]
  | COLe        {} -> join [lhs, " <= ", rhs]
  | COGe        {} -> join [lhs, " >= ", rhs]
  | COShiftL    {} -> join [lhs, " << ", rhs]
  | COShiftR    {} -> join [lhs, " >> ", rhs]
  | COAdd       {} -> join [lhs, " + ", rhs]
  | COSub       {} -> join [lhs, " - ", rhs]
  | COMul       {} -> join [lhs, " * ", rhs]
  | CODiv       {} -> join [lhs, " / ", rhs]
  | COMod       {} -> join [lhs, " % ", rhs]
  | COBOr       {} -> join [lhs, " | ", rhs]
  | COBAnd      {} -> join [lhs, " & ", rhs]
  | COXor       {} -> join [lhs, " ^ ", rhs]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printCUnOp" kind="sem">

```mc
sem printCUnOp : String -> CExprTypeAst_CUnOp -> String
```



<ToggleWrapper text="Code..">
```mc
sem printCUnOp (arg: String) =
  | COSizeOf {} -> join ["sizeof(", arg, ")"]
  | CODeref  {} -> join ["*", arg]
  | COAddrOf {} -> join ["&", arg]
  | CONeg    {} -> join ["-", arg]
  | CONot    {} -> join ["~", arg]
```
</ToggleWrapper>
</DocBlock>

