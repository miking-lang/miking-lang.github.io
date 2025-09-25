import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclCosynSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeCosynStep1" kind="sem">

```mc
sem symbolizeCosynStep1 : SymEnv -> NameEnv -> Ast_Decl -> (NameEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeCosynStep1 env langEnv =
  | DeclCosyn s ->
    let env = updateEnv env langEnv in

    let ident = if s.isBase then
      nameSym (nameGetStr s.ident)
    else
      getSymbol {kind = "Type Constructor", info = [s.info], allowFree = false} env.currentEnv.tyConEnv s.ident
    in
    match mapAccumL setSymbol env.currentEnv.tyVarEnv s.params with (_, params) in

    let synn = DeclCosyn {s with params = params,
                                  ident = ident} in

    let tyConEnv = if s.isBase then
      mapInsert (nameGetStr ident) ident langEnv.tyConEnv
    else
      langEnv.tyConEnv
    in

    ({langEnv with tyConEnv = tyConEnv}, synn)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeCosynStep2" kind="sem">

```mc
sem symbolizeCosynStep2 : SymEnv -> NameEnv -> Ast_Decl -> (NameEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeCosynStep2 env langEnv =
  | DeclCosyn s ->
    let env = updateEnv env langEnv in

    let paramPairs = map (lam p. (nameGetStr p, p)) s.params in
    let paramMap = mapFromSeq cmpString paramPairs in

    let env = updateEnv env langEnv in
    let m = mapUnion env.currentEnv.tyVarEnv paramMap in
    let env = symbolizeUpdateTyVarEnv env m in

    let synn = DeclCosyn {s with ty = symbolizeType env s.ty} in

    (langEnv, synn)
```
</ToggleWrapper>
</DocBlock>

