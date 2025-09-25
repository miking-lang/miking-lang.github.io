import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CosemTyAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="handleCosemTyAnnot" kind="sem">

```mc
sem handleCosemTyAnnot : Map Name Name -> MLangTopLevel_MLangProgram -> MLangTopLevel_MLangProgram
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem handleCosemTyAnnot baseMap =
  | prog ->
    let ctx = { baseMap = baseMap, tyAnnotMap = mapEmpty nameCmp} in
    match mapAccumL handleCosemTyAnnot_Decl ctx prog.decls
    with (_, decls) in

    {prog with decls = decls}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="handleCosemTyAnnot_Decl" kind="sem">

```mc
sem handleCosemTyAnnot_Decl : CosemTyAnnotContext -> Ast_Decl -> (CosemTyAnnotContext, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extractCosemTarget" kind="sem">

```mc
sem extractCosemTarget : (Info, Name) -> Ast_Type -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>

