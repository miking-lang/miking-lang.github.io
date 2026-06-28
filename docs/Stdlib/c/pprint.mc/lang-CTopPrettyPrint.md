import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CTopPrettyPrint  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
C TOP\-LEVEL \-\-  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
  
## Semantics  
  

          <DocBlock title="printCTop" kind="sem">

```mc
sem printCTop : Int -> PprintEnv -> CTopAst_CTop -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem printCTop (indent : Int) (env: PprintEnv) =
  | CTTyDef { ty = ty, id = id } ->
    match cPprintEnvGetStr env id with (env,id) then
      match printCDef env ty id (None ()) with (env,str) then
        (env, join ["typedef ", str, ";"])
      else never
    else never

  | CTDef { ty = ty, id = id, init = init } ->
    match cPprintEnvGetOptStr env id with (env,id) then
      match printCDef env ty id init with (env,str) then
        (env, join [str, ";"])
      else never
    else never

  | CTFun { ret = ret, id = id, params = params, body = body } ->
    let i = indent in
    let ii = pprintIncr indent in
    match cPprintEnvGetStr env id with (env,id) then
      let f = lam env. lam t: (CType,Name).
        match cPprintEnvGetStr env t.1 with (env,t1) then
          printCDef env t.0 t1 (None ())
        else never in
      match mapAccumL f env params with (env,params) then
        let params = join ["(", strJoin ", " params, ")"] in
        match printCType (join [id, params]) env ret with (env,ty) then
          match printCStmts ii env body with (env,body) then
            (env, join [ty, " {", pprintNewline ii, body, pprintNewline i, "}"])
          else never
        else never
      else never
    else never
```
</ToggleWrapper>
</DocBlock>

