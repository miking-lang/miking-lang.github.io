import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CStmtPrettyPrint  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
C STATEMENTS \-\-  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
  
## Semantics  
  

          <DocBlock title="printCStmts" kind="sem">

```mc
sem printCStmts : Int -> PprintEnv -> [CStmtAst_CStmt] -> (PprintEnv, String)
```

<Description>{`Print a line\-separated list of statements at the given indentation level.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem printCStmts (indent: Int) (env: PprintEnv) =
  | stmts ->
    match mapAccumL (printCStmt indent) env stmts with (env,stmts) then
      (env, strJoin (pprintNewline indent) stmts)
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printCStmt" kind="sem">

```mc
sem printCStmt : Int -> PprintEnv -> CStmtAst_CStmt -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem printCStmt (indent: Int) (env: PprintEnv) =

  | CSDef { ty = ty, id = id, init = init } ->
    match cPprintEnvGetOptStr env id with (env,id) then
      match printCDef env ty id init with (env,str) then
        (env, join [str, ";"])
      else never
    else never

  | CSIf { cond = cond, thn = thn, els = els } ->
    let i = indent in
    let ii = pprintIncr i in
    match printCExpr env cond with (env,cond) then
      match printCStmts ii env thn with (env,thn) then
        match printCStmts ii env els with (env,els) then
          (env, join ["if (", cond, ") {", pprintNewline ii,
                      thn, pprintNewline i,
                      "} else {", pprintNewline ii,
                      els, pprintNewline i,
                      "}"])
        else never
      else never
    else never

  | CSSwitch { cond = cond, body = body, default = default } ->
    let i = indent in
    let ii = pprintIncr i in
    let iii = pprintIncr ii in
    match printCExpr env cond with (env,cond) then
      let f = lam env. lam t: (Int, [CStmt]).
        match printCStmts iii env t.1 with (env,t1) then
          (env,(t.0,t1))
        else never in
      match mapAccumL f env body with (env,body) then
        let f = lam t: (Int, String).
          join ["case ", int2string t.0, ":", pprintNewline iii, t.1] in
        let body = strJoin (pprintNewline ii) (map f body) in
        let str = join ["switch (", cond, ") {", pprintNewline ii, body] in
        match default with Some default then
          match printCStmts iii env default with (env,default) then
            (env, join [str, pprintNewline ii,
                       "default:", pprintNewline iii,
                       default, pprintNewline i,
                       "}"])
          else never
        else (env, join [str, pprintNewline ii, "}"])
      else never
    else never

  | CSWhile { cond = cond, body = body } ->
    let i = indent in
    let ii = pprintIncr i in
    match printCExpr env cond with (env,cond) then
      match printCStmts ii env body with (env,body) then
        (env, join ["while (", cond, ") {", pprintNewline ii,
                    body, pprintNewline i,
                    "}"])
      else never
    else never

  | CSExpr { expr = expr } ->
    match printCExpr env expr with (env,expr) then
      (env, join [expr, ";"])
    else never

  | CSNop {} -> (env, ";")

  | CSComp { stmts = stmts } ->
    let i = indent in
    let ii = pprintIncr i in
    match printCStmts ii env stmts with (env,stmts) then
      (env, join ["{", pprintNewline ii, stmts, pprintNewline i, "}"])
    else never

  | CSRet { val = val } ->
    match val with Some val then
      match printCExpr env val with (env,val) then
        (env, join ["return ", val, ";"])
      else never
    else (env, "return;")

  | CSCont { } -> (env, "continue;")
  | CSBreak { } -> (env, "break;")
```
</ToggleWrapper>
</DocBlock>

