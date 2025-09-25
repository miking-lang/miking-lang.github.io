import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# cosem-ty-annot.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mlang/ast.mc"} style={S.link}>mlang/ast.mc</a>, <a href={"/docs/Stdlib/mlang/pprint.mc"} style={S.link}>mlang/pprint.mc</a>, <a href={"/docs/Stdlib/extrec/ast.mc"} style={S.link}>extrec/ast.mc</a>  
  
## Types  
  

          <DocBlock title="CosemTyAnnotContext" kind="type">

```mc
type CosemTyAnnotContext : { baseMap: Map Name Name, tyAnnotMap: Map Name (Type) }
```



<ToggleWrapper text="Code..">
```mc
type CosemTyAnnotContext = {
  baseMap : Map Name Name,
  tyAnnotMap : Map Name (use Ast in Type)
}
```
</ToggleWrapper>
</DocBlock>

## Languages  
  

          <DocBlock title="CosemTyAnnot" kind="lang" link="/docs/Stdlib/extrec/cosem-ty-annot.mc/lang-CosemTyAnnot">

```mc
lang CosemTyAnnot
```



<ToggleWrapper text="Code..">
```mc
lang CosemTyAnnot = MLangAst + MLangPrettyPrint + ExtRecAst
  sem handleCosemTyAnnot : Map Name Name -> MLangProgram -> MLangProgram
  sem handleCosemTyAnnot baseMap =
  | prog ->
    let ctx = { baseMap = baseMap, tyAnnotMap = mapEmpty nameCmp} in
    match mapAccumL handleCosemTyAnnot_Decl ctx prog.decls
    with (_, decls) in

    {prog with decls = decls}

  sem handleCosemTyAnnot_Decl : CosemTyAnnotContext -> Decl -> (CosemTyAnnotContext, Decl)
  sem handleCosemTyAnnot_Decl ctx =
  | DeclCosem d ->
    match mapLookup d.ident ctx.baseMap with Some baseIdent in
    if d.isBase then
      ({ctx with tyAnnotMap = mapInsert baseIdent d.tyAnnot ctx.tyAnnotMap},
       DeclCosem {d with targetTyIdent = extractCosemTarget (d.info, d.ident) d.tyAnnot})
    else
      let tyAnnot = match mapLookup baseIdent ctx.tyAnnotMap
                    with Some tyAnnot then tyAnnot
                    else errorSingle [d.info] (join [
                      "* The cosem ", (nameGetStr d.ident), " is not a base cosem and does ",
                      "not have a type annotation!\n",
                      "* Please provide a type annotation for the cosem at the",
                      " base declaration."
                    ]) in
       (ctx, DeclCosem {d with tyAnnot = tyAnnot,
                               targetTyIdent = extractCosemTarget (d.info, d.ident) tyAnnot})
  | other ->
    (ctx, other)
  | DeclLang d ->
    match mapAccumL handleCosemTyAnnot_Decl ctx d.decls with (ctx, decls) in
    (ctx, DeclLang {d with decls = decls})

  sem extractCosemTarget : (Info, Name) -> Type -> Name
  sem extractCosemTarget ctx =
  | TyAll t -> extractCosemTarget ctx t.ty
  | TyArrow t -> extractCosemTarget ctx t.to
  | TyApp t -> extractCosemTarget ctx t.rhs
  | TyCon t -> t.ident
  | other ->
    errorSingle [ctx.0] (join [
      "* The base declaration of must have a type annotation!\n",
      "* Furthermore, the return type of a cosem type annotation should be an erec, but found: '\n",
      (type2str other),
      "'\n",
      "* Please provide an appropriate type annotation for the cosem at its base",
      "declaration."
    ])
end
```
</ToggleWrapper>
</DocBlock>

