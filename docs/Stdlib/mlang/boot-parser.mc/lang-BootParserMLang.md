import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BootParserMLang  
  

  
  
  
## Semantics  
  

          <DocBlock title="parseMLangFile" kind="sem">

```mc
sem parseMLangFile : all a. String -> Result a (Info, String) MLangTopLevel_MLangProgram
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parseMLangFile =| filepath ->
    let p = bootParserParseMLangFile filepath in
    if eqi (bootParserGetId p) 600 /- Error -/ then
      let n = glistlen p 0 in
      let infos = create n (lam i. ginfo p i) in
      let msgs = create n (lam i. gstr p i) in
      foldl1 result.withAnnotations (zipWith (curry result.err) infos msgs)
    else
      result.ok (matchProgram p (bootParserGetId p))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseMLangString" kind="sem">

```mc
sem parseMLangString : all a. String -> Result a (Info, String) MLangTopLevel_MLangProgram
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parseMLangString =| str ->
    let p = bootParserParseMLangString str in
    if eqi (bootParserGetId p) 600 /- Error -/ then
      let n = glistlen p 0 in
      let infos = create n (lam i. ginfo p i) in
      let msgs = create n (lam i. gstr p i) in
      foldl1 result.withAnnotations (zipWith (curry result.err) infos msgs)
    else
      result.ok (matchProgram p (bootParserGetId p))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchProgram" kind="sem">

```mc
sem matchProgram : BootParseTree -> Int -> MLangTopLevel_MLangProgram
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchProgram p =
  | 700 ->
    let nIncludes = bootParserGetListLength p 0 in
    let nTops = bootParserGetListLength p 1 in

    let parseInclude = lam i.
      let inf = bootParserGetInfo p i in
      DeclInclude {path = bootParserGetString p i,
                   info = matchInfo inf (bootParserGetId inf)}
    in
    let includes = map parseInclude (range 0 nIncludes 1) in

    let parseDecl = lam i.
      let d = bootParserGetTop p i in
      matchTop d (bootParserGetId d)
    in
    let decls = map parseDecl (range 0 nTops 1) in

    let unparsedExpr = bootParserGetTerm p 0 in

    {decls = concat includes decls,
     expr = matchTerm unparsedExpr (bootParserGetId unparsedExpr)}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mergeSems" kind="sem">

```mc
sem mergeSems : [Ast_Decl] -> [Ast_Decl]
```

<Description>{`Semantic function declaration can be split into a type annotation and args  
\+ cases. This function merges sems into a single declaration.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mergeSems =| decls ->
    let work = lam acc : ([Decl], Map String Decl). lam decl : Decl.
      match acc with (res, m) in
      match decl with DeclSem s1 then
        let str = nameGetStr s1.ident in
        match mapLookup str m with Some (DeclSem s2) then
          match s1.tyAnnot with TyUnknown _ then
            let m = mapRemove str m in
            (res, mapInsert str (DeclSem {s1 with tyAnnot = s2.tyAnnot}) m)
          else
            let m = mapRemove str m in
            (res, mapInsert str (DeclSem {s1 with args = s2.args, cases = s2.cases}) m)
        else
          (res, mapInsert str decl m)
      else
        (cons decl res, m)
    in
    match foldl work ([], mapEmpty cmpString) decls with (res, m) in
    concat res (mapValues m)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mergeCosems" kind="sem">

```mc
sem mergeCosems : [Ast_Decl] -> [Ast_Decl]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mergeCosems =| decls ->
    let work = lam acc : ([Decl], Map String Decl). lam decl : Decl.
      match acc with (res, m) in
      match decl with DeclCosem s1 then
        let str = nameGetStr s1.ident in
        match mapLookup str m with Some (DeclCosem s2) then
          match s1.tyAnnot with TyUnknown _ then
            let m = mapRemove str m in
            (res, mapInsert str (DeclCosem {s1 with tyAnnot = s2.tyAnnot}) m)
          else
            let m = mapRemove str m in
            (res, mapInsert str (DeclCosem {s1 with args = s2.args, cases = s2.cases}) m)
        else
          (res, mapInsert str decl m)
      else
        (cons decl res, m)
    in
    match foldl work ([], mapEmpty cmpString) decls with (res, m) in
    concat res (mapValues m)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchDecl" kind="sem">

```mc
sem matchDecl : BootParseTree -> Int -> Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchDecl d =
  | 702 ->
    let nCons = glistlen d 0 in
    let nParams = if eqi nCons 0 then 0 else glistlen d 1 in

    let parseCon = lam i.
      let ident = gname d (addi i 1) in
      let ty = gtype d i in
      let tyName = nameNoSym (concat (gstr d (addi i 1)) "Type") in
      {ident = ident, tyIdent = ty, tyName = tyName}
    in

    let kind = switch gint d 0
      case 0 then base_kind_
      case 1 then sumext_kind_
    end in

    DeclSyn {ident = gname d 0,
             includes = [],
             defs = map parseCon (range 0 nCons 1),
             params = map (lam i. gname d (addi (addi 1 nCons) i)) (range 0 nParams 1),
             info = ginfo d 0,
             declKind = kind}
  | 703 ->
    let nCases = glistlen d 0 in
    let nArgs = glistlen d 1 in
    let parseCase = lam i.
      {pat = gpat d i, thn = gterm d i}
    in
    let parseArg = (lam i. {ident = gname d i, tyAnnot = gtype d i}) in

    let args = if eqi nArgs -1 then
      None ()
    else
      Some (map (lam i. {ident = gname d i, tyAnnot = gtype d i}) (range 1 (addi 1 nArgs) 1))
    in

    let kind = switch gint d 0
      case 0 then base_kind_
      case 1 then sumext_kind_
    end in

    DeclSem {ident = gname d 0,
             tyAnnot = gtype d 0,
             tyBody = tyunknown_,
             args = args,
             cases = map parseCase (range 0 nCases 1),
             includes = [],
             info = ginfo d 0,
             declKind = kind}
  | 705 ->
    DeclType {ident = gname d 0,
              params = map (gname d) (range 1 (addi 1 (glistlen d 0)) 1),
              tyIdent = gtype d 0,
              info = ginfo d 0}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchTop" kind="sem">

```mc
sem matchTop : BootParseTree -> Int -> Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchTop d =
  | 701 ->
    let nIncludes = glistlen d 0 in
    let nDecls = glistlen d 1 in

    let includes = map (gname d) (range 1 (addi nIncludes 1) 1) in

    let parseDecl = lam i.
      let a = bootParserGetDecl d i in
      matchDecl a (bootParserGetId a)
    in

    let decls = map parseDecl (range 0 nDecls 1) in
    let decls = reverse (mergeSems decls) in
    let decls = reverse (mergeCosems decls) in



    DeclLang {ident = gname d 0,
              info = ginfo d 0,
              includes = includes,
              decls = decls}
  | 704 ->
    DeclLet {ident = gname d 0,
             tyAnnot = gtype d 0,
             tyBody = tyunknown_,
             body = gterm d 0,
             info = ginfo d 0}
  | 705 /-TmType-/ ->
    DeclType {ident = gname d 0,
              params = map (gname d) (range 1 (addi 1 (glistlen d 0)) 1),
              tyIdent = gtype d 0,
              info = ginfo d 0}
  | 706 ->
    DeclRecLets {bindings =
                 create (glistlen d 0)
                        (lam n. {ident = gname d n,
                                 tyAnnot = gtype d n,
                                 tyBody = TyUnknown { info = ginfo d (addi n 1)},
                                 body = gterm d n,
                                 info = ginfo d (addi n 1)}),
                 info = ginfo d 0}
  | 707 ->
    DeclConDef {ident = gname d 0,
                tyIdent = gtype d 0,
                info = ginfo d 0}
  | 708 ->
    DeclUtest {test = gterm d 0,
               expected = gterm d 1,
               tusing = if geqi (glistlen d 0) 3 then Some (gterm d 2) else None (),
               tonfail = if geqi (glistlen d 0) 4 then Some (gterm d 3) else None (),
               info = ginfo d 0}
  | 709 ->
    DeclExt {ident = gname d 0,
             tyIdent = gtype d 0,
             effect = neqi (gint d 0) 0,
             info = ginfo d 0}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchTerm" kind="sem">

```mc
sem matchTerm : BootParseTree -> Int -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem matchTerm t =
  | 116 -> TmDecl
    { decl = DeclUse {ident = gname t 0, info = ginfo t 0}
    , inexpr = gterm t 0
    , info = ginfo t 0
    , ty = tyunknown_
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchType" kind="sem">

```mc
sem matchType : BootParseTree -> Int -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem matchType t =
  | 214 ->
    TyUse {ident = gname t 0,
           info = ginfo t 0,
           inty = gtype t 0}
```
</ToggleWrapper>
</DocBlock>

