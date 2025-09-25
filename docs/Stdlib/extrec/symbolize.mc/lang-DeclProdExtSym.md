import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclProdExtSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbProdExtDef" kind="sem">

```mc
sem symbProdExtDef : SymEnv -> [Name] -> NameEnv -> {ident: Name, tyName: Name, tyIdent: Ast_Type} -> (NameEnv, {ident: Name, tyName: Name, tyIdent: Ast_Type})
```



<ToggleWrapper text="Code..">
```mc
sem symbProdExtDef env params langEnv =
  | def ->
    let ident = getSymbol
      {kind = "Syn Type", info = [NoInfo ()], allowFree = false}
      langEnv.conEnv
      def.ident in

    -- Add syn params and syn idents to tyVarEnv
    let paramPairs = map (lam p. (nameGetStr p, p)) params in
    let paramMap = mapFromSeq cmpString paramPairs in

    -- Find the name of the associated extensible product type
    let tyName = getSymbol
      {kind = "Type Constructor", info = [NoInfo ()], allowFree = false}
      langEnv.tyConEnv
      def.tyName in

    let env = updateEnv env langEnv in
    let m = mapUnion env.currentEnv.tyVarEnv paramMap in
    let env = symbolizeUpdateTyVarEnv env m in

    let tyIdent = symbolizeType env def.tyIdent in

    (langEnv, {ident = ident, tyIdent = tyIdent, tyName = tyName})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeProdExt" kind="sem">

```mc
sem symbolizeProdExt : SymEnv -> NameEnv -> Ast_Decl -> (NameEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeProdExt env langEnv =
  | SynDeclProdExt s ->
    match mapAccumL (symbProdExtDef env s.params) langEnv s.individualExts with (langEnv, exts) in
    let decl = SynDeclProdExt {s with individualExts = exts,
                                      ident = nameSym (nameGetStr s.ident)} in
    (langEnv, decl)
```
</ToggleWrapper>
</DocBlock>

