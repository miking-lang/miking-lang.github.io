import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# language-composer.mc  
  

Establishes an inclusion relationship between the declarations of semantic   
functions and syntax fragments.  
  
The first purpose of this transformation is is to find any included syn or sem  
declarations when we have an explicit declaration. In the program below,   
this transformation will establish the fact that L1.f and L2.f both   
include L0.f and that L12.f includes both L1.f and L2.f.   
\`\`\`  
lang L0 =   
  sem f = ...  
end  
lang L1 = L0  
  sem f = ...  
end  
lang L2 = L0  
  sem f = ...  
end  
lang L12 = L1 \+ L2   
  sem f = ...  
end  
\`\`\`  
  
The second purpose of this transformation is to create explicit declarations  
for semantic functions and syntax fragements that are implicitly extended   
through language composition. In the program below, this transformation  
will generate a semantic function declaration called L12.f that includes   
L1.f and L2.f.  
lang L0 =   
  sem f = ...  
end  
lang L1 = L0  
  sem f = ...  
end  
lang L2 = L0  
  sem f = ...  
end  
lang L12 = L1 \+ L2   
end  
\`\`\`

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mlang/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mlang/ast-builder.mc"} style={S.link}>ast-builder.mc</a>, <a href={"/docs/Stdlib/extrec/ast.mc"} style={S.link}>extrec/ast.mc</a>, <a href={"/docs/Stdlib/extrec/ast-builder.mc"} style={S.link}>extrec/ast-builder.mc</a>, <a href={"/docs/Stdlib/mexpr/info.mc"} style={S.link}>mexpr/info.mc</a>, <a href={"/docs/Stdlib/bool.mc"} style={S.link}>bool.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>, <a href={"/docs/Stdlib/error.mc"} style={S.link}>error.mc</a>, <a href={"/docs/Stdlib/tuple.mc"} style={S.link}>tuple.mc</a>, <a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>  
  
## Types  
  

          <DocBlock title="DeclInfo" kind="type">

```mc
type DeclInfo
```

<Description>{`This info type contains a subset of the data in a DeclSem, DeclSyn, or DeclType.\\  
Specifically, they contain the data required for the creation of explicit  
declarations for implicitly included syns and sems. We create a special  
DeclInfo type for this so that we do not have to carry around the constructors  
and cases.`}</Description>


<ToggleWrapper text="Code..">
```mc
type DeclInfo
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ComposerContext" kind="type">

```mc
type ComposerContext : { langMap: Map (String, String) DeclInfo }
```



<ToggleWrapper text="Code..">
```mc
type ComposerContext = {
  langMap : Map (String, String) DeclInfo
}
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="TypeInfo" kind="con">

```mc
con TypeInfo : { ident: Name, orig: String, info: Info } -> DeclInfo
```



<ToggleWrapper text="Code..">
```mc
con TypeInfo : use ExtendedMLang in {ident : Name,
                                orig : String,
                                info : Info} -> DeclInfo
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SemInfo" kind="con">

```mc
con SemInfo : { ident: Name, info: Info, orig: String, ty: Type, args: Option [{ ident: Name, tyAnnot: Type }] } -> DeclInfo
```



<ToggleWrapper text="Code..">
```mc
con SemInfo : use ExtendedMLang in {ident : Name,
                               info : Info,
                               orig : String,
                               ty : Type,
                               args : Option [{ident : Name, tyAnnot: Type}]} -> DeclInfo
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SynInfo" kind="con">

```mc
con SynInfo : { ident: Name, info: Info, orig: String, params: [Name] } -> DeclInfo
```



<ToggleWrapper text="Code..">
```mc
con SynInfo : use ExtendedMLang in {ident : Name,
                               info : Info,
                               orig : String,
                               params : [Name]} -> DeclInfo
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ProdInfo" kind="con">

```mc
con ProdInfo : { ident: Name, info: Info, orig: String } -> DeclInfo
```



<ToggleWrapper text="Code..">
```mc
con ProdInfo : use ExtendedMLang in {ident : Name,
                                info : Info,
                                orig : String} -> DeclInfo
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CosynInfo" kind="con">

```mc
con CosynInfo : { ident: Name, info: Info, orig: String } -> DeclInfo
```



<ToggleWrapper text="Code..">
```mc
con CosynInfo : use ExtendedMLang in {ident : Name,
                                 info : Info, 
                                 orig : String} -> DeclInfo 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CosemInfo" kind="con">

```mc
con CosemInfo : { ident: Name, info: Info, orig: String, tyAnnot: Type, args: [{ ident: Name, tyAnnot: Type }] } -> DeclInfo
```



<ToggleWrapper text="Code..">
```mc
con CosemInfo : use ExtendedMLang in {ident : Name, 
                                      info : Info,
                                      orig : String,
                                      tyAnnot : Type,
                                      args : [{ident : Name, tyAnnot : Type}]} -> DeclInfo
```
</ToggleWrapper>
</DocBlock>

## Languages  
  

          <DocBlock title="ExtendedMLang" kind="lang" link="/docs/Stdlib/mlang/language-composer.mc/lang-ExtendedMLang">

```mc
lang ExtendedMLang
```



<ToggleWrapper text="Code..">
```mc
lang ExtendedMLang = MLangAst + CosynDeclAst + CosemDeclAst end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LanguageComposer" kind="lang" link="/docs/Stdlib/mlang/language-composer.mc/lang-LanguageComposer">

```mc
lang LanguageComposer
```



<ToggleWrapper text="Code..">
```mc
lang LanguageComposer = ExtendedMLang + ExtRecAst
  sem composeProgram : MLangProgram -> MLangProgram 
  sem composeProgram =| p ->
    let ctx = emptyComposerContext in 
    match mapAccumL composeLang ctx p.decls with (_, decls) in 
    {p with decls = decls}

  sem composeLang : ComposerContext -> Decl -> (ComposerContext, Decl)
  sem composeLang ctx =
  | DeclLang l -> 
    let includes = map nameGetStr l.includes in 
    match mapAccumL (handleDecl (nameGetStr l.ident) includes) ctx l.decls with (ctx, decls) in 

    let synOrSemNames = mapOption 
      (lam d. match d with DeclSem {ident = ident} then Some ident 
              else match d with DeclSyn {ident = ident} then Some ident
              else match d with SynDeclProdExt {ident = ident} then Some ident
              -- else match d with DeclCosyn {ident = ident} then Some ident
              else match d with DeclCosem {ident = ident} then Some ident
              else None ()) decls in 
    let synOrSemStrings = map nameGetStr synOrSemNames in 

    match addImplicitIncludes (nameGetStr l.ident) l.info includes synOrSemStrings ctx 
    with (ctx, generatedDecls) in 

    (ctx, DeclLang {l with decls = concat decls generatedDecls})
  | other -> (ctx, other)

  sem handleDecl : String -> [String] -> ComposerContext -> Decl -> (ComposerContext, Decl)
  sem handleDecl langStr includes ctx = 
  | decl & DeclSem d ->
    let identStr = nameGetStr d.ident in 
    let findMatchingInfo : String -> Option DeclInfo = lam incl.
      mapLookup (incl, identStr) ctx.langMap in 
    let foundIncludes : [DeclInfo] = mapOption findMatchingInfo includes in 
    
    let conflicts = filter isCosemInfo foundIncludes in 
    let errors = cons (d.info, nameGetStr d.ident) (map extractInfoName conflicts) in 

    if not (null conflicts) then
      errorMulti errors "The declared sem has an identifier that conflicts with included cosems!"
    else
      let includedSems = filter isSemInfo foundIncludes in 

      let includes = map projIdent includedSems in 
      (ctxWithDeclInfo ctx (langStr, nameGetStr d.ident) (decl2info langStr decl), 
       DeclSem {d with includes = includes})
  | decl & DeclCosem d ->
    let identStr = nameGetStr d.ident in 
    let findMatchingInfo : String -> Option DeclInfo = lam incl.
      mapLookup (incl, identStr) ctx.langMap in 
    let foundIncludes : [DeclInfo] = mapOption findMatchingInfo includes in 

    let conflicts = filter isSemInfo foundIncludes in 
    let errors = cons (d.info, nameGetStr d.ident) (map extractInfoName conflicts) in 

    if not (null conflicts) then
      errorMulti errors "The declared sem has an identifier that conflicts with included sems!"
    else
      let includedCosems = filter isCosemInfo foundIncludes in 

      let includes = map projIdent includedCosems in 
      (ctxWithDeclInfo ctx (langStr, nameGetStr d.ident) (decl2info langStr decl), 
       DeclCosem {d with includes = includes})
  | decl & DeclSyn d ->
    let identStr = nameGetStr d.ident in 
    let findMatchingInfo : String -> Option DeclInfo = lam incl.
      mapLookup (incl, identStr) ctx.langMap in 
    let foundIncludes : [DeclInfo] = mapOption findMatchingInfo includes in 
    
    let conflicts = filter isTypeInfo foundIncludes in 

    let errors = cons (d.info, nameGetStr d.ident) (map extractInfoName conflicts) in 

    if not (null conflicts) then
      errorMulti errors "The declared syn has an identifier that conflicts with included types!"
    else
      let includedSyns = filter isSynInfo foundIncludes in 

      let includes = map projIdent includedSyns in 
      let info = {ident = d.ident, info = d.info} in 
      (ctxWithDeclInfo ctx (langStr, nameGetStr d.ident) (decl2info langStr decl), 
       DeclSyn {d with includes = includes})
  | decl & SynDeclProdExt d ->
    let identStr = nameGetStr d.ident in 
    let findMatchingInfo : String -> Option DeclInfo = lam incl.
      mapLookup (incl, identStr) ctx.langMap in 
    let foundIncludes : [DeclInfo] = mapOption findMatchingInfo includes in 
    
    let conflicts = filter isTypeInfo foundIncludes in 

    let errors = cons (d.info, nameGetStr d.ident) (map extractInfoName conflicts) in 

    if not (null conflicts) then
      errorMulti errors "The declared syn has an identifier that conflicts with included types!"
    else
      let includedSyns = filter (lam i. or (isProdInfo i) (isSynInfo i)) foundIncludes in 

      let includes = map projIdent includedSyns in 
      let info = {ident = d.ident, info = d.info} in 
      (ctxWithDeclInfo ctx (langStr, nameGetStr d.ident) (decl2info langStr decl), 
       SynDeclProdExt {d with includes = includes})
  | decl & DeclType d -> 
    let identStr = nameGetStr d.ident in 
    let findMatchingInfo : String -> Option DeclInfo = lam incl.
      mapLookup (incl, identStr) ctx.langMap in 
    let conflicts : [DeclInfo] = mapOption findMatchingInfo includes in 

    let errors = cons (d.info, nameGetStr d.ident) (map extractInfoName conflicts) in 

    if not (null conflicts) then
      errorMulti errors "The declared type has an identifier that conflicts with included types or syns!"
    else
      let info = decl2info langStr decl in 
      (ctxWithDeclInfo ctx (langStr, nameGetStr d.ident) info, decl)
  | decl & DeclCosyn d -> 
    let identStr = nameGetStr d.ident in 
    let findMatchingInfo : String -> Option DeclInfo = lam incl.
      mapLookup (incl, identStr) ctx.langMap in 
    let foundIncludes : [DeclInfo] = mapOption findMatchingInfo includes in 
    
    let conflicts = filter (lam i. or (isTypeInfo i) (isSynInfo i)) foundIncludes in 

    let errors = cons (d.info, nameGetStr d.ident) (map extractInfoName conflicts) in 

    if not (null conflicts) then
      errorMulti errors "The declared syn has an identifier that conflicts with included types!"
    else
      let includedSyns = filter isSynInfo foundIncludes in 

      let includes = map projIdent includedSyns in 
      let info = {ident = d.ident, info = d.info} in 
      (ctxWithDeclInfo ctx (langStr, nameGetStr d.ident) (decl2info langStr decl), 
       DeclCosyn {d with includes = includes})
  | decl -> 
    -- (ctx, decl) 
    error "Only Type, Syn, and Sem declarations can be contained inside of a langauge!"

  sem addImplicitIncludes langStr langInfo includes definedSynsSems =
  | ctx ->
    let includeSet = setOfSeq cmpString includes in 

    -- We are going to include elements from ctx.langMap that
    -- (1) that are not Type declarations.
    -- (2) that are not Cosyn declarations
    -- (3) belong to an included langauge
    -- (4) that have not already been included explicitly through a syn or sem
    let pred = lam k. lam v. 
      match k with (origLang, ident) in 
        allb [not (isTypeInfo v),
              not (isCosynInfo v),
              setMem origLang includeSet,
              not (seqMem eqString definedSynsSems ident)]
    in       
    let filteredCtx = mapFilterWithKey pred ctx.langMap in 

    -- Group the filtered element by the identifiers and put the results in the
    -- toBeGenerated map
    let f = lam acc. lam pair. 
      match pair with ((origLang, ident), info) in 
      let l = mapLookupOrElse (lam. []) ident acc in 
      mapInsert ident (cons ((origLang, ident), info) l) acc
    in 
    let toBeGenerated = foldl f (mapEmpty cmpString) (mapToSeq filteredCtx) in 

    -- Iterate over the the toBeGenerated map and add the newly generated
    -- sem or syn to the context and list of decls.
    let gen = lam ctx. lam pairs : [((String, String), DeclInfo)].
      let includes = map (lam p. match p with ((orig, ident), _) in (orig, ident)) pairs in 


      let pair = head pairs in 
      match pair with ((origLang, ident), info) in

      switch info 
        case SynInfo s then 
          let decl = DeclSyn {ident = s.ident,
                              params = s.params,
                              defs = [],
                              includes = includes,
                              info = langInfo,
                              declKind = sumext_kind_} in 
          let info = decl2info langStr decl in 
          (ctxWithDeclInfo ctx (langStr, nameGetStr s.ident) info, decl)
        case SemInfo s then
          let include2args = lam incl.
            match mapLookup incl ctx.langMap with Some info in 
            match info with SemInfo semInfo in
            semInfo.args
          in 
          let args = mapOption include2args includes in 
          let args = if null args then None () else Some (head args) in 
          let decl = DeclSem {ident = s.ident,
                              tyAnnot = s.ty,
                              tyBody = tyunknown_,
                              args = args,
                              cases = [],
                              includes = includes,
                              info = langInfo,
                              declKind = sumext_kind_} in 
          let info = decl2info langStr decl in 
          (ctxWithDeclInfo ctx (langStr, nameGetStr s.ident) info, decl)
        case CosemInfo s then
          let include2args = lam incl.
            match mapLookup incl ctx.langMap with Some info in 
            match info with CosemInfo semInfo in
            semInfo.args
          in 
          let includedArgs = map include2args includes in 
          let args = head includedArgs in 
          let decl = DeclCosem {ident = s.ident,
                                args = args,
                                cases = [],
                                includes = includes,
                                info = langInfo,
                                isBase = false,
                                tyAnnot = tyunknown_,
                                targetTyIdent = nameSym ""} in 
          let info = decl2info langStr decl in 
          (ctxWithDeclInfo ctx (langStr, nameGetStr s.ident) info, decl)
        case CosynInfo _ then 
          error "Encountered unexpected cosyn!"
        case _ then
          error "Encountered unexpected info (wildcard match)!"
      end 
    in 
    mapAccumL gen ctx (mapValues toBeGenerated)


end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="decl2info" kind="let">

```mc
let decl2info orig d : String -> Ast_Decl -> DeclInfo
```



<ToggleWrapper text="Code..">
```mc
let decl2info = lam orig. lam d.
  use ExtendedMLang in 
  use ExtRecAst in 
  switch d
    case DeclSem s then SemInfo {ident = s.ident,
                                 info = s.info,
                                 orig = orig,
                                 ty = s.tyAnnot,
                                 args = s.args}
    case DeclSyn s then SynInfo {ident = s.ident,
                                 info = s.info,
                                 orig = orig,
                                 params = s.params}
    case DeclType t then TypeInfo {ident = t.ident,
                                   orig = orig,
                                   info = t.info}     
    case SynDeclProdExt d then ProdInfo {ident = d.ident,
                                        info = d.info,
                                        orig = orig}
    case DeclCosyn d then CosynInfo {ident = d.ident, 
                                     info = d.info,
                                     orig = orig}
    case DeclCosem d then CosemInfo {ident = d.ident, 
                                     info = d.info,
                                     tyAnnot = d.tyAnnot,
                                     orig = orig,
                                     args = d.args}
  end                     
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isTypeInfo" kind="let">

```mc
let isTypeInfo i : DeclInfo -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isTypeInfo = lam i. match i with TypeInfo _ then true else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isSemInfo" kind="let">

```mc
let isSemInfo i : DeclInfo -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isSemInfo = lam i. match i with SemInfo _ then true else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isSynInfo" kind="let">

```mc
let isSynInfo i : DeclInfo -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isSynInfo = lam i. match i with SynInfo _ then true else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isProdInfo" kind="let">

```mc
let isProdInfo i : DeclInfo -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isProdInfo = lam i. match i with ProdInfo _ then true else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isCosynInfo" kind="let">

```mc
let isCosynInfo i : DeclInfo -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isCosynInfo = lam i. match i with CosynInfo _ then true else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isCosemInfo" kind="let">

```mc
let isCosemInfo i : DeclInfo -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isCosemInfo = lam i. match i with CosemInfo _ then true else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extractInfoName" kind="let">

```mc
let extractInfoName info : DeclInfo -> (Info, String)
```



<ToggleWrapper text="Code..">
```mc
let extractInfoName : DeclInfo -> (Info, String) = lam info.
  switch info 
    case TypeInfo t then (t.info, nameGetStr t.ident)
    case SemInfo s then (s.info, nameGetStr s.ident)
    case SynInfo s then (s.info, nameGetStr s.ident)
    case CosynInfo s then (s.info, nameGetStr s.ident)
    case CosemInfo s then (s.info, nameGetStr s.ident)
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="projIdent" kind="let">

```mc
let projIdent info : DeclInfo -> (String, String)
```



<ToggleWrapper text="Code..">
```mc
let projIdent = lam info. 
  switch info 
    case TypeInfo t then (t.orig, nameGetStr t.ident)
    case SemInfo t then (t.orig, nameGetStr t.ident)
    case SynInfo t then (t.orig, nameGetStr t.ident)
    case CosynInfo t then (t.orig, nameGetStr t.ident)
    case CosemInfo t then (t.orig, nameGetStr t.ident)
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="emptyComposerContext" kind="let">

```mc
let emptyComposerContext  : ComposerContext
```



<ToggleWrapper text="Code..">
```mc
let emptyComposerContext : ComposerContext = {
  langMap = mapEmpty (tupleCmp2 cmpString cmpString)
}  
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ctxWithDeclInfo" kind="let">

```mc
let ctxWithDeclInfo ctx s declInfo : ComposerContext -> (String, String) -> DeclInfo -> ComposerContext
```



<ToggleWrapper text="Code..">
```mc
let ctxWithDeclInfo = lam ctx. lam s. lam declInfo.
  {ctx with langMap = mapInsert s declInfo ctx.langMap}
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr 
use ExtendedMLang in
use LanguageComposer in 

let p : MLangProgram = {
  decls = [
    decl_lang_ "L0" [
      decl_sem_ "f" [] []
    ],
    decl_langi_ "L1" ["L0"] [
      decl_sem_ "f" [] []
    ],
    decl_langi_ "L2" ["L0"] [
      decl_sem_ "f" [] []
    ],
    decl_langi_ "L12" ["L1", "L2"] [
      decl_sem_ "f" [] []
    ]
  ],
  expr = uunit_
} in 
let p = composeProgram p in 
match get p.decls 0 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSem f0 in 
utest length f0.includes with 0 in 

match get p.decls 1 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSem f1 in 
utest length f1.includes with 1 in 

match get p.decls 2 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSem f2 in 
utest length f2.includes with 1 in 

match get p.decls 3 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSem f12 in 
utest length f12.includes with 2 in 

let p : MLangProgram = {
  decls = [
    decl_lang_ "L0" [
      decl_syn_ "S" []
    ],
    decl_langi_ "L1" ["L0"] [
      decl_syn_ "S" []
    ],
    decl_langi_ "L2" ["L0"] [
      decl_syn_ "S" []
    ],
    decl_langi_ "L12" ["L1", "L2"] [
      decl_syn_ "S" []
    ]
  ],
  expr = uunit_
} in 
let p = composeProgram p in 
match get p.decls 0 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSyn f0 in 
utest length f0.includes with 0 in 

match get p.decls 1 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSyn f1 in 
utest length f1.includes with 1 in 

match get p.decls 2 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSyn f2 in 
utest length f2.includes with 1 in 

match get p.decls 3 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSyn f12 in 
utest length f12.includes with 2 in 

let p : MLangProgram = {
  decls = [
    decl_lang_ "L0" [
      decl_sem_ "f" [] []
    ],
    decl_langi_ "L1" ["L0"] [
      decl_sem_ "f" [] []
    ],
    decl_langi_ "L2" ["L0"] [
      decl_sem_ "f" [] []
    ],
    decl_langi_ "L12" ["L1", "L2"] []
  ],
  expr = uunit_
} in 
let p = composeProgram p in 
match get p.decls 0 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSem f0 in 
utest length f0.includes with 0 in 

match get p.decls 1 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSem f1 in 
utest length f1.includes with 1 in 

match get p.decls 2 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSem f2 in 
utest length f2.includes with 1 in 

match get p.decls 3 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSem f12 in 
utest length f12.includes with 2 in 
utest nameGetStr f12.ident with "f" in 

let p : MLangProgram = {
  decls = [
    decl_lang_ "L0" [
      decl_syn_ "S" []
    ],
    decl_langi_ "L1" ["L0"] [
      decl_syn_ "S" []
    ],
    decl_langi_ "L2" ["L0"] [
      decl_syn_ "S" []
    ],
    decl_langi_ "L12" ["L1", "L2"] []
  ],
  expr = uunit_
} in 
let p = composeProgram p in 
match get p.decls 0 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSyn f0 in 
utest length f0.includes with 0 in 

match get p.decls 1 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSyn f1 in 
utest length f1.includes with 1 in 

match get p.decls 2 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSyn f2 in 
utest length f2.includes with 1 in 

match get p.decls 3 with DeclLang {decls = innerDecls} in 
match head innerDecls with DeclSyn f12 in 
utest length f12.includes with 2 in 
utest nameGetStr f12.ident with "S" in 

-- Test cosem composition
let p : MLangProgram = {
  decls = [
    decl_lang_ "L0" [
      decl_cosem_ "f" [] [] true
    ],
    decl_langi_ "L1" ["L0"] [
    ]
  ],
  expr = uunit_
} in 
let p = composeProgram p in 
match get p.decls 1 with DeclLang {decls = decls} in 
utest length decls with 1 in 

-- Test cosem composition
let p : MLangProgram = {
  decls = [
    decl_lang_ "L0" [
      decl_cosem_ "f" [] [] true
    ],
    decl_langi_ "L1" ["L0"] [
      decl_cosem_ "f" [] [] false
    ]
  ],
  expr = uunit_
} in 
let p = composeProgram p in 
match get p.decls 1 with DeclLang {decls = decls} in 
utest length decls with 1 in 
match head decls with DeclCosem d in
utest d.includes with [("L0", "f")] using eqSeq (tupleEq2 eqString eqString) in 

let p : MLangProgram = {
    decls = [
        decl_langi_ "L1" [] [
            decl_cosem_ "f" [] [] true
        ],
        decl_langi_ "L2" [] [
            decl_cosem_ "f" [] [] true
        ],
        decl_langi_ "L12" ["L1", "L2"] [
          decl_cosem_ "f" [] [] false
        ]        
    ],
    expr = bind_ (use_ "L2") (int_ 10)
} in 
let p = composeProgram p in
match get p.decls 2 with DeclLang {decls = decls} in 
utest length decls with 1 in 
match head decls with DeclCosem d in
utest length d.includes with 2 in 
utest seqMem (tupleEq2 eqString eqString) d.includes ("L1", "f") with true in
utest seqMem (tupleEq2 eqString eqString) d.includes ("L2", "f") with true in
()
```
</ToggleWrapper>
</DocBlock>

