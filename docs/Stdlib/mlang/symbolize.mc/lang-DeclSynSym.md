import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclSynSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeSynStep1" kind="sem">

```mc
sem symbolizeSynStep1 : SymEnv -> NameEnv -> Ast_Decl -> (NameEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeSynStep1 env langEnv =
  | DeclSyn s ->
    let env = updateEnv env langEnv in

    let ident = nameSym (nameGetStr s.ident) in
      match mapAccumL setSymbol env.currentEnv.tyVarEnv s.params with (_, params) in

      let synn = DeclSyn {s with params = params,
                                  ident = ident} in

      let tyConEnv = if eqi 0 (length s.includes) then
        mapInsert (nameGetStr ident) ident langEnv.tyConEnv
      else
        langEnv.tyConEnv
      in

      ({langEnv with tyConEnv = tyConEnv}, synn)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeDef" kind="sem">

```mc
sem symbolizeDef : Bool -> SymEnv -> Name -> [Name] -> NameEnv -> {ident: Name, tyName: Name, tyIdent: Ast_Type} -> (NameEnv, {ident: Name, tyName: Name, tyIdent: Ast_Type})
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeDef ignoreTyName
                   env
                   (synIdent : Name)
                   (params : [Name])
                   (langEnv : NameEnv) =
  | def ->
    match setSymbol langEnv.conEnv def.ident with (conEnv, ident) in

    match (if ignoreTyName
           then (langEnv.tyConEnv, def.tyName)
           else setSymbol langEnv.tyConEnv def.tyName)
    with (tyConEnv, tyName) in

    let langEnv = {langEnv with conEnv = conEnv,
                                tyConEnv = tyConEnv} in
    let env = updateEnv env langEnv in

    -- Add syn params and syn idents to tyVarEnv
    let paramPairs = map (lam p. (nameGetStr p, p)) params in
    let paramMap = mapFromSeq cmpString paramPairs in

    let m = mapUnion env.currentEnv.tyVarEnv paramMap in
    let env = symbolizeUpdateTyVarEnv env m in

    let tyIdent = symbolizeType env def.tyIdent in

    (langEnv, {ident = ident, tyIdent = tyIdent, tyName = tyName})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeSynStep2" kind="sem">

```mc
sem symbolizeSynStep2 : SymEnv -> NameEnv -> Ast_Decl -> (NameEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeSynStep2 env langEnv =
  | DeclSyn s ->
    let symbDef = symbolizeDef false env s.ident s.params in
    match mapAccumL symbDef langEnv s.defs with (langEnv, defs) in
    let decl = DeclSyn {s with defs = defs} in
    (langEnv, decl)
```
</ToggleWrapper>
</DocBlock>

