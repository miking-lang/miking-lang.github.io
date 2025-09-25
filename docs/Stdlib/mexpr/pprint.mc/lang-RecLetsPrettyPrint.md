import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode indent env =
  | TmDecl {decl = DeclRecLets {bindings = []}, inexpr = inexpr} ->
    pprintCode indent env inexpr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode indent env =
  | DeclRecLets x ->
    let i = indent in
    let ii = pprintIncr i in
    let f = lam env. lam bind : DeclLetRecord.
      pprintLetAssignmentCode ii env {
        ident = bind.ident, body = bind.body, tyAnnot = bind.tyAnnot}
    in
    match mapAccumL f env x.bindings with (env,bindingStrs) in
    let joinedBindings = strJoin (pprintNewline ii) bindingStrs in
    (env,join ["recursive", pprintNewline ii,
               joinedBindings])
```
</ToggleWrapper>
</DocBlock>

