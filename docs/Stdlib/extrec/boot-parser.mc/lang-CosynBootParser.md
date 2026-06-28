import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CosynBootParser  
  

  
  
  
## Semantics  
  

          <DocBlock title="matchDecl" kind="sem">

```mc
sem matchDecl : BootParseTree -> Int -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
sem matchDecl d =
  | 714 ->
    let n = glistlen d 0 in
    let isBase = eqi (glistlen d 1) 0 in
    let params = map (lam i. gname d (addi i 1)) (range 0 n 1) in

    DeclCosyn {info = ginfo d 0,
               ident = gname d 0,
               ty = gtype d 0,
               isBase = isBase,
               params = params,
               includes = []}
  | 710 ->
    let nCons = glistlen d 0 in
    let nParams = if eqi nCons 0 then 0 else glistlen d 1 in

    let parseCon = lam i.
      let ident = gname d (addi i 1) in
      let ty = gtype d (addi i 1) in
      let tyName = nameNoSym (concat (gstr d (addi i 1)) "Type") in
      {ident = ident, tyIdent = ty, tyName = tyName}
    in

    -- When no global extension is given, boot will parse this as a unit type
    -- which is represented as an empty record.
    -- We check if we receive a unit type, then there is no global extension
    -- Otherwise we wrap the provided type in a Some.
    let globalTy = gtype d 0 in
    let globalTyOpt =
      match globalTy with TyRecord r then
        if mapIsEmpty r.fields then
          None ()
        else
          errorSingle [ginfo d 0] "* Global Product Extension are not supported."
          -- Some globalTy
      else
        Some globalTy
    in

    SynDeclProdExt {ident = gname d 0,
                    includes = [],
                    individualExts = map parseCon (range 0 nCons 1),
                    globalExt = globalTyOpt,
                    params = map (lam i. gname d (addi (addi 1 nCons) i)) (range 0 nParams 1),
                    info = ginfo d 0}
```
</ToggleWrapper>
</DocBlock>

