import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BootParser  
  

  
  
  
## Types  
  

          <DocBlock title="BootParserParseMCoreFileArg" kind="type">

```mc
type BootParserParseMCoreFileArg : { keepUtests: Bool, pruneExternalUtests: Bool, pruneExternalUtestsWarning: Bool, eliminateDeadCode: Bool, externalsExclude: [String], keywords: [String], allowFree: Bool, builtin: [(String, Const)] }
```



<ToggleWrapper text="Code..">
```mc
type BootParserParseMCoreFileArg = {
    -- Should we keep utests
    keepUtests : Bool,

    -- Prune external dependent utests
    pruneExternalUtests : Bool,

    -- Warn on pruned external dependent utests
    pruneExternalUtestsWarning : Bool,

    -- Run dead code elimination
    eliminateDeadCode : Bool,

    -- Exclude pruning of utest for externals with whose dependencies are met on
    -- this system.
    externalsExclude : [String],

    -- Additional keywords
    keywords : [String],

    -- Allow free variables
    allowFree : Bool,

    -- The builtins to replace with constants
    builtin : [(String,Const)]
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BootParserParseMExprStringArg" kind="type">

```mc
type BootParserParseMExprStringArg : { keywords: [String], allowFree: Bool, builtin: [(String, Const)] }
```



<ToggleWrapper text="Code..">
```mc
type BootParserParseMExprStringArg = {

    -- Additional keywords
    keywords : [String],

    -- Allow free variables
    allowFree : Bool,

    -- The builtins to replace with constants
    builtin : [(String,Const)]
  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="_defaultBootParserParseMCoreFileArg" kind="sem">

```mc
sem _defaultBootParserParseMCoreFileArg : () -> BootParser_BootParserParseMCoreFileArg
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _defaultBootParserParseMCoreFileArg =
  | _ -> {
    keepUtests = true,
    pruneExternalUtests = false,
    pruneExternalUtestsWarning = true,
    eliminateDeadCode = true,
    externalsExclude = [],
    keywords = [],
    allowFree = false,
    builtin = builtin
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_defaultBootParserParseMExprStringArg" kind="sem">

```mc
sem _defaultBootParserParseMExprStringArg : () -> BootParser_BootParserParseMExprStringArg
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _defaultBootParserParseMExprStringArg =
  | _ -> {
    keywords = [],
    allowFree = false,
    builtin = builtin
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseMCoreFile" kind="sem">

```mc
sem parseMCoreFile : BootParser_BootParserParseMCoreFileArg -> String -> Ast_Expr
```

<Description>{`Parse a complete MCore file, including MLang code  
This function returns the final MExpr AST. The MCore  
file can refer to other files using include statements`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parseMCoreFile (arg : BootParserParseMCoreFileArg) =
  | filename ->
    let t =
      bootParserParseMCoreFile
        (
          arg.keepUtests,
          arg.pruneExternalUtests,
          arg.externalsExclude,
          arg.pruneExternalUtestsWarning,
          arg.eliminateDeadCode,
          arg.allowFree
        )
        arg.keywords
        filename
    in
    constTransform arg.builtin (matchTerm t (bootParserGetId t))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseMExprString" kind="sem">

```mc
sem parseMExprString : all w. BootParser_BootParserParseMExprStringArg -> String -> Result w (Info, String) Ast_Expr
```

<Description>{`Parses an MExpr string and returns the final MExpr AST or a list of error  
messages and associated infos.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parseMExprString arg =
  | str ->
    let t =
      bootParserParseMExprString
        (
          arg.allowFree,
        )
        arg.keywords
        str
    in
    if eqi (bootParserGetId t) 600 /- Error -/ then
      let n = glistlen t 0 in
      let infos = create n (lam i. ginfo t i) in
      let msgs = create n (lam i. gstr t i) in
      foldl1 result.withAnnotations (zipWith (curry result.err) infos msgs)
    else
      result.ok (constTransform arg.builtin (matchTerm t (bootParserGetId t)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseMExprStringExn" kind="sem">

```mc
sem parseMExprStringExn : BootParser_BootParserParseMExprStringArg -> String -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parseMExprStringExn arg =
  | str ->
    switch result.consume (parseMExprString arg str)
    case (_, Left es) then
      error (join [
        "parseMExprStringExn failed with the error message:\n",
        join (map (lam e. join ["\n", infoErrorString e.0 e.1, "\n"]) es)
      ])
    case (_, Right ast) then ast
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseMExprStringKeywords" kind="sem">

```mc
sem parseMExprStringKeywords : all w. [String] -> String -> Result w (Info, String) Ast_Expr
```

<Description>{`Parses an MExpr string with additional keywords, using the default  
boot\-parser arguments.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parseMExprStringKeywords keywords =
  | str ->
    parseMExprString
      { _defaultBootParserParseMExprStringArg () with keywords = keywords }
      str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseMExprStringKeywordsExn" kind="sem">

```mc
sem parseMExprStringKeywordsExn : [String] -> String -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parseMExprStringKeywordsExn keywords =
  | str ->
    parseMExprStringExn
      { _defaultBootParserParseMExprStringArg () with keywords = keywords }
      str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="gterm" kind="sem">

```mc
sem gterm : BootParseTree -> Int -> Ast_Expr
```

<Description>{`Get term help function`}</Description>


<ToggleWrapper text="Code..">
```mc
sem gterm (t:Unknown) =
  | n -> let t2 = bootParserGetTerm t n in
         matchTerm t2 (bootParserGetId t2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchTerm" kind="sem">

```mc
sem matchTerm : BootParseTree -> Int -> Ast_Expr
```

<Description>{`Match term from ID`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchTerm (t:Unknown) =
  | 100 /-TmVar-/ ->
    TmVar {ident = gname t 0,
           ty = TyUnknown { info = ginfo t 0 },
           info = ginfo t 0,
           frozen = neqi (gint t 0) 0}
  | 101 /-TmApp-/ ->
    TmApp {lhs = gterm t 0,
           rhs = gterm t 1,
           ty = TyUnknown { info = ginfo t 0 },
           info = ginfo t 0}
  | 102 /-TmLam-/ ->
    TmLam {ident = gname t 0,
           tyAnnot = gtype t 0,
           tyParam = TyUnknown { info = ginfo t 0 },
           ty = TyUnknown { info = ginfo t 0 },
           info = ginfo t 0,
           body = gterm t 0}
  | 103 /-TmLet-/ -> TmDecl
    { decl = DeclLet
      { ident = gname t 0
      , tyAnnot = gtype t 0
      , tyBody = TyUnknown { info = ginfo t 0 }
      , body = gterm t 0
      , info = ginfo t 0
      }
    , inexpr = gterm t 1
    , ty = TyUnknown { info = ginfo t 0 }
    , info = ginfo t 0
    }
  | 104 /-TmRecLets-/ -> TmDecl
    { decl = DeclRecLets
      { bindings = create (glistlen t 0)
        (lam n.
          { ident = gname t n
          , tyAnnot = gtype t n
          , tyBody = TyUnknown { info = ginfo t (addi n 1)}
          , body = gterm t n
          , info = ginfo t (addi n 1)
          })
      , info = ginfo t 0
      }
    , inexpr = gterm t (glistlen t 0)
    , ty = TyUnknown { info = ginfo t 0 }
    , info = ginfo t 0
    }
  | 105 /-TmConst-/ ->
    let c = gconst t 0 in
    TmConst {val = gconst t 0,
             ty = TyUnknown { info = ginfo t 0 },
             info = ginfo t 0}
  | 106 /-TmSeq-/ ->
    TmSeq {tms = create (glistlen t 0) (lam n. gterm t n),
           ty =  TyUnknown { info = ginfo t 0 },
           info = ginfo t 0}
  | 107 /-TmRecord-/ ->
    let lst = create (glistlen t 0) (lam n. (gstr t n, gterm t n)) in
    TmRecord {bindings =
                mapFromSeq cmpSID
                  (map (lam b : (String,Expr). (stringToSid b.0, b.1)) lst),
              ty = TyUnknown { info = ginfo t 0 },
              info = ginfo t 0}
  | 108 /-TmRecordUpdate-/ ->
    TmRecordUpdate {rec = gterm t 0,
                   key = stringToSid (gstr t 0),
                   value = gterm t 1,
                   ty = TyUnknown { info = ginfo t 0 },
                   info = ginfo t 0}
  | 109 /-TmType-/ -> TmDecl
    { decl = DeclType
      { ident = gname t 0
      , params = map (gname t) (range 1 (glistlen t 0) 1)
      , tyIdent = gtype t 0
      , info = ginfo t 0
      }
    , ty = TyUnknown { info = ginfo t 0 }
    , inexpr = gterm t 0
    , info = ginfo t 0
    }
  | 110 /-TmConDef-/ -> TmDecl
    { decl = DeclConDef
      { ident = gname t 0
      , tyIdent = gtype t 0
      , info = ginfo t 0
      }
    , ty = TyUnknown { info = ginfo t 0 }
    , inexpr = gterm t 0
    , info = ginfo t 0
    }
  | 111 /-TmConApp-/ ->
    TmConApp {ident = gname t 0,
              body = gterm t 0,
              ty = TyUnknown { info = ginfo t 0 },
              info = ginfo t 0}
  | 112 /-TmMatch-/ ->
    TmMatch {target = gterm t 0,
             pat = gpat t 0,
             thn = gterm t 1,
             els = gterm t 2,
             ty = TyUnknown { info = ginfo t 0 },
             info = ginfo t 0}
  | 113 /-TmUtest-/ ->
    match
      switch glistlen t 0
      case 3 then (None (), None ())
      case 4 then (Some (gterm t 3), None ())
      case 5 then (Some (gterm t 3), Some (gterm t 4))
      case _ then error "BootParser.matchTerm: Invalid list length for tmUtest"
      end
      with (tusing, tonfail)
    in TmDecl
    { decl = DeclUtest
      { test = gterm t 0
      , expected = gterm t 1
      , tusing = tusing
      , tonfail = tonfail
      , info = ginfo t 0
      }
    , inexpr = gterm t 2
    , ty = TyUnknown { info = ginfo t 0 }
    , info = ginfo t 0
    }
  | 114 /-TmNever-/ ->
    TmNever {ty = TyUnknown { info = ginfo t 0 },
             info = ginfo t 0}
  | 115 /-TmExt-/ -> TmDecl
    { decl = DeclExt
      { ident = gname t 0
      , tyIdent = gtype t 0
      , effect = neqi (gint t 0) 0
      , info = ginfo t 0
      }
    , inexpr = gterm t 0
    , ty = TyUnknown { info = ginfo t 0 }
    , info = ginfo t 0
    }
  | _ -> error "Unknown expression"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="gtype" kind="sem">

```mc
sem gtype : BootParseTree -> Int -> Ast_Type
```

<Description>{`Get type help function`}</Description>


<ToggleWrapper text="Code..">
```mc
sem gtype(t:Unknown) =
  | n -> let t2 = bootParserGetType t n in
        matchType t2 (bootParserGetId t2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchType" kind="sem">

```mc
sem matchType : BootParseTree -> Int -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem matchType (t:Unknown) =
  | 200 /-TyUnknown-/ ->
    TyUnknown {info = ginfo t 0}
  | 201 /-TyBool-/ ->
    TyBool {info = ginfo t 0}
  | 202 /-TyInt-/ ->
    TyInt {info = ginfo t 0}
  | 203 /-TyFloat-/ ->
    TyFloat {info = ginfo t 0}
  | 204 /-TyChar-/ ->
    TyChar {info = ginfo t 0}
  | 205 /-TyArrow-/ ->
    TyArrow {info = ginfo t 0,
             from = gtype t 0,
             to = gtype t 1}
  | 206 /-TySeq-/ ->
    TySeq {info = ginfo t 0,
           ty = gtype t 0}
  | 207 /-TyRecord-/ ->
    let lst = create (glistlen t 0) (lam n. (gstr t n, gtype t n)) in
    TyRecord {info = ginfo t 0,
              fields =
                mapFromSeq cmpSID
                  (map (lam b : (String,Type). (stringToSid b.0, b.1)) lst)}
  | 208 /-TyVariant-/ ->
    if eqi (glistlen t 0) 0 then
      TyVariant {info = ginfo t 0,
                 constrs = mapEmpty nameCmp}
    else error "Parsing of non-empty variant types not yet supported"
  | 209 /-TyCon-/ ->
    let data =
      let makeData = lam positive.
        let cons = setOfSeq nameCmp (map (gname t) (range 1 (glistlen t 0) 1)) in
        TyData { info = ginfo t 0, universe = mapEmpty nameCmp,
                 positive = positive, cons = cons }
      in
      switch gint t 0
      case 0 then TyUnknown { info = ginfo t 0 }
      case 1 then makeData true
      case 2 then makeData false
      case 3 then TyVar { info = ginfo t 0, ident = gname t 1 }
      case _ then error "BootParser.matchTerm: Invalid data specifier for TyCon"
      end
    in
    TyCon {info = ginfo t 0,
           ident = gname t 0,
           data = data}
  | 210 /-TyVar-/ ->
    TyVar {info = ginfo t 0,
           ident = gname t 0}
  | 211 /-TyApp-/ ->
    TyApp {info = ginfo t 0,
           lhs = gtype t 0,
           rhs = gtype t 1}
  | 212 /-TyTensor-/ ->
    TyTensor {info = ginfo t 0,
              ty = gtype t 0}
  | 213 /-TyAll-/ ->
    let kind =
      switch gint t 0
      case 0 then Poly ()
      case 1 then
        let dlen = glistlen t 0 in
        let data =
          unfoldr
            (lam idx.
              if lti idx.0 dlen then
                let tname = gname t idx.1 in
                let totlen = glistlen t idx.0 in
                let upperidx = glistlen t (addi 1 idx.0) in
                let minidx = addi 1 idx.1 in
                let maxidx = addi totlen minidx in
                let cons = map (gname t) (range minidx maxidx 1) in
                let ks =
                  if eqi upperidx (negi 1) then
                    {lower = setOfSeq nameCmp cons, upper = None ()}
                  else
                    match splitAt cons upperidx with (lower, upper) in
                    {lower = setOfSeq nameCmp lower,
                     upper = Some (setOfSeq nameCmp upper)}
                in
                Some ((tname, ks), (addi 2 idx.0, maxidx))
              else None ())
            (1, 1)
        in
        Data {types = mapFromSeq nameCmp data}
      case _ then error "BootParser.matchTerm: Invalid data specifier for TyAll!"
      end
    in
    TyAll {info = ginfo t 0,
           ident = gname t 0,
           ty = gtype t 0,
           kind = kind}
  | _ -> error "Unknown type"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="gconst" kind="sem">

```mc
sem gconst : BootParseTree -> Int -> ConstAst_Const
```

<Description>{`Get constant help function`}</Description>


<ToggleWrapper text="Code..">
```mc
sem gconst(t:Unknown) =
  | n -> let t2 = bootParserGetConst t n in
         matchConst t2 (bootParserGetId t2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchConst" kind="sem">

```mc
sem matchConst : BootParseTree -> Int -> ConstAst_Const
```

<Description>{`Match constant from ID`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchConst (t:Unknown) =
  | 300 /-CBool-/   -> CBool {val = eqi (gint t 0) 1 }
  | 301 /-CInt-/    -> CInt {val = gint t 0 }
  | 302 /-CFloat-/  -> CFloat {val = gfloat t 0}
  | 303 /-CChar-/   -> CChar {val = int2char (gint t 0)}
  | 304 /-Cdprint-/ -> CDPrint {}
  | 305 /-Cerror-/  -> CError {}
  | _               -> error "Unknown constant"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="gpat" kind="sem">

```mc
sem gpat : BootParseTree -> Int -> Ast_Pat
```

<Description>{`Get pattern help function`}</Description>


<ToggleWrapper text="Code..">
```mc
sem gpat (t:Unknown) =
  | n -> let t2 = bootParserGetPat t n in
         matchPat t2 (bootParserGetId t2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchPat" kind="sem">

```mc
sem matchPat : BootParseTree -> Int -> Ast_Pat
```

<Description>{`Match pattern from ID`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchPat (t:Unknown) =
  | 400 /-PatNamed-/ ->
    PatNamed {ident = strToPatName (gstr t 0),
            info = ginfo t 0,
            ty = tyunknown_}
  | 401 /-PatSeqTot-/ ->
    PatSeqTot {pats = create (glistlen t 0) (lam n. gpat t n),
             info = ginfo t 0,
             ty = tyunknown_}
  | 402 /-PatSeqEdge-/ ->
    let len = glistlen t 0 in
    PatSeqEdge {prefix = create len (lam n. gpat t n),
              middle = strToPatName (gstr t 0),
              postfix = create (glistlen t 1) (lam n. gpat t (addi n len)),
              info = ginfo t 0,
              ty = tyunknown_}
  | 403 /-PatRecord-/ ->
    let lst = create (glistlen t 0) (lam n. (gstr t n, gpat t n)) in
    PatRecord {bindings =
               mapFromSeq cmpSID
                 (map (lam b : (String,Pat). (stringToSid b.0, b.1)) lst),
               info = ginfo t 0,
               ty = tyunknown_}
  | 404 /-PatCon-/ ->
     PatCon {ident = gname t 0,
             subpat = gpat t 0,
             info = ginfo t 0,
             ty = tyunknown_}
 | 405 /-PatInt-/ ->
     PatInt {val = gint t 0,
             info = ginfo t 0,
             ty = tyint_}
 | 406 /-PatChar-/ ->
     PatChar {val = int2char (gint t 0),
              info = ginfo t 0,
              ty = tychar_}
 | 407 /-PatBool-/ ->
     PatBool {val = eqi (gint t 0) 1,
              info = ginfo t 0,
              ty = tybool_}
 | 408 /-PatAnd-/ ->
     PatAnd {lpat = gpat t 0,
             rpat = gpat t 1,
             info = ginfo t 0,
             ty = tyunknown_}
 | 409 /-PatOr-/ ->
     PatOr {lpat = gpat t 0,
            rpat = gpat t 1,
            info = ginfo t 0,
            ty = tyunknown_}
 | 410 /-PatNot-/ ->
     PatNot {subpat = gpat t 0,
             info = ginfo t 0,
             ty = tyunknown_}
  | _ -> error "Unknown pattern"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ginfo" kind="sem">

```mc
sem ginfo : BootParseTree -> Int -> Info
```

<Description>{`Get info help function`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ginfo (t:Unknown) =
  | n -> let t2 = bootParserGetInfo t n in
         matchInfo t2 (bootParserGetId t2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchInfo" kind="sem">

```mc
sem matchInfo : BootParseTree -> Int -> Info
```

<Description>{`Match info from ID`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchInfo (t:Unknown) =
  | 500 /-Info-/ ->
      Info {filename = gstr t 0,
            row1 = gint t 0,
            col1 = gint t 1,
            row2 = gint t 2,
            col2 = gint t 3}
  | 501 /-NoInfo-/ ->
      NoInfo {}
  | _ -> error "Unknown info"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="strToPatName" kind="sem">

```mc
sem strToPatName : String -> PatName
```



<ToggleWrapper text="Code..">
```mc
sem strToPatName =
  | "" ->  PWildcard ()
  | x -> PName (nameNoSym x)
```
</ToggleWrapper>
</DocBlock>

