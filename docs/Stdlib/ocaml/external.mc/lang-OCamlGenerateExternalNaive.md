import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlGenerateExternalNaive  
  

A naive implementation of external generation where we just pick the  
implementation with the lowest cost with respect to the type given at the  
external term definition.

  
  
  
## Semantics  
  

          <DocBlock title="chooseExternalImpls" kind="sem">

```mc
sem chooseExternalImpls : Map String [ExternalImpl] -> GenerateEnv -> Ast_Expr -> GenerateEnv
```



<ToggleWrapper text="Code..">
```mc
sem chooseExternalImpls implsMap env =
  | TmDecl {decl = DeclExt {ident = ident, tyIdent = tyIdent}, inexpr = inexpr, info = info} ->
    let identStr = nameGetStr ident in
    let impls = mapLookup identStr implsMap in

    let cost = lam ty1. lam ty2.
      match convertData info env uunit_ (ty1, ty2) with (cost, _) in cost
    in

    match impls with Some (![] & impls) then
      let impl =
        minOrElse
          (lam. error "impossible")
          (lam r1 : ExternalImpl. lam r2 : ExternalImpl.
             let cost1 = cost r1.ty tyIdent in
             let cost2 = cost r2.ty tyIdent in
             subi cost1 cost2)
        impls
      in
      let env = { env with exts = mapInsert ident [impl] env.exts } in
      chooseExternalImpls implsMap env inexpr
    else
      let errMsg = join ["No implementation for external ", identStr, "."] in
      let errMsg =
        match mapLookup identStr globalExternalImplsMap with Some impls then
          join [
            errMsg,
            " Try to install one of the following set of OCaml packages: ",
            strJoin " "
              (map
                (lam x: ExternalImpl. join ["[", strJoin "," x.libraries, "]"])
                impls)
          ]
        else errMsg
      in
      errorSingle [info] errMsg
  | t -> sfold_Expr_Expr (chooseExternalImpls implsMap) env t
```
</ToggleWrapper>
</DocBlock>

