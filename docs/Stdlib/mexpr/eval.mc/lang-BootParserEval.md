import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BootParserEval  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Const" kind="syn">

```mc
syn Const
```



<ToggleWrapper text="Code..">
```mc
syn Const =
  | CBootParserTree {val : BootParseTree}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getConstStringCode" kind="sem">

```mc
sem getConstStringCode : Int -> ConstAst_Const -> String
```



<ToggleWrapper text="Code..">
```mc
sem getConstStringCode (indent : Int) =
  | CBootParserTree _ ->
    error "getConstStringCode not implemented for CBootParserTree!"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constArity" kind="sem">

```mc
sem constArity : ConstAst_Const -> Int
```



<ToggleWrapper text="Code..">
```mc
sem constArity =
  | CBootParserTree _ -> 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CBootParserParseMExprString _, [
    TmRecord {bindings = bs}, TmSeq {tms = seq1}, TmSeq {tms = seq2}
  ]) ->
    match
      map (lam b. mapLookup b bs) (map stringToSid ["0"])
      with [
        Some (TmConst {val = CBool {val = allowFree}})
      ]
    then
      let keywords =
        map
          (lam keyword.
            match keyword with TmSeq {tms = s} then
              _evalSeqOfCharsToString info s
            else
              errorSingle [info] (join [
                "Keyword of first argument passed to ",
                "bootParserParseMExprString not a sequence"
              ]))
          seq1 in
      let t =
        bootParserParseMExprString
          (allowFree,) keywords (_evalSeqOfCharsToString info seq2)
      in
      TmConst {
        val = CBootParserTree {val = t},
        ty = TyUnknown {info = NoInfo ()},
        info = NoInfo ()
      }
    else
      errorSingle [info]
        "First argument to bootParserParseMExprString incorrect record"
  | (CBootParserParseMLangString _, [TmSeq {tms = seq}]) ->
    let t = bootParserParseMLangString (_evalSeqOfCharsToString info seq) in
    TmConst {
        val = CBootParserTree {val = t},
        ty = TyUnknown {info = NoInfo ()},
        info = NoInfo ()
    }
  | (CBootParserParseMLangFile _, [TmSeq {tms = seq}]) ->
    let t = bootParserParseMLangFile (_evalSeqOfCharsToString info seq) in
    TmConst {
        val = CBootParserTree {val = t},
        ty = TyUnknown {info = NoInfo ()},
        info = NoInfo ()
    }
  | (CBootParserParseMCoreFile _, [
    TmRecord {bindings = bs}, TmSeq {tms = keywords}, TmSeq {tms = filename}
  ]) ->
    match
      map (lam b. mapLookup b bs) (map stringToSid ["0", "1", "2", "3", "4", "5"])
      with [
        Some (TmConst {val = CBool {val = keepUtests}}),
        Some (TmConst {val = CBool {val = pruneExternalUtests}}),
        Some (TmSeq {tms = externalsExclude}),
        Some (TmConst {val = CBool {val = warn}}),
        Some (TmConst {val = CBool {val = eliminateDeadCode}}),
        Some (TmConst {val = CBool {val = allowFree}})
      ]
    then
      let externalsExclude =
        map
          (lam x.
            match x with TmSeq {tms = s} then
              _evalSeqOfCharsToString info s
            else
              errorSingle [info] (join [
                "External identifier of first argument passed to ",
                "bootParserParseMCoreFile not a sequence"
              ]))
          externalsExclude
      in
      let pruneArg = (keepUtests,
                      pruneExternalUtests,
                      externalsExclude,
                      warn,
                      eliminateDeadCode,
                      allowFree)
      in
      let keywords =
        map
          (lam keyword.
            match keyword with TmSeq {tms = s} then
              _evalSeqOfCharsToString info s
            else
              errorSingle [info] (join [
                "Keyword of third argument passed to ",
                "bootParserParseMCoreFile not a sequence"
              ]))
          keywords
      in

      let filename = _evalSeqOfCharsToString info filename in
      let t = bootParserParseMCoreFile pruneArg keywords filename in
      TmConst {
        val = CBootParserTree {val = t},
        ty = TyUnknown {info = NoInfo ()},
        info = NoInfo ()
      }
    else
      errorSingle [info]
        "First argument to bootParserParseMCoreFile incorrect record"
  | (CBootParserGetId _, [TmConst {val = CBootParserTree {val = ptree}}]) ->
    TmConst {val = CInt {val = bootParserGetId ptree},
             ty = TyInt {info = NoInfo ()}, info = NoInfo ()}
  | (CBootParserGetTerm _, [
    TmConst {val = CBootParserTree {val = ptree}},
    TmConst {val = CInt {val = n}}
  ]) ->
    TmConst {val = CBootParserTree {val = bootParserGetTerm ptree n},
             ty = TyUnknown {info = NoInfo ()}, info = NoInfo ()}
  | (CBootParserGetTop _, [
    TmConst {val = CBootParserTree {val = ptree}},
    TmConst {val = CInt {val = n}}
  ]) ->
    TmConst {val = CBootParserTree {val = bootParserGetTop ptree n},
             ty = TyUnknown {info = NoInfo ()}, info = NoInfo ()}
  | (CBootParserGetDecl _, [
    TmConst {val = CBootParserTree {val = ptree}},
    TmConst {val = CInt {val = n}}
  ]) ->
    TmConst {val = CBootParserTree {val = bootParserGetDecl ptree n},
             ty = TyUnknown {info = NoInfo ()}, info = NoInfo ()}
  | (CBootParserGetType _, [
    TmConst {val = CBootParserTree {val = ptree}},
    TmConst {val = CInt {val = n}}
  ]) ->
    TmConst {val = CBootParserTree {val = bootParserGetType ptree n},
             ty = TyUnknown {info = NoInfo ()}, info = NoInfo ()}
  | (CBootParserGetString _, [
    TmConst {val = CBootParserTree {val = ptree}},
    TmConst {val = CInt {val = n}}
  ]) ->
    let str =
      map
        (lam c. TmConst {val = CChar {val = c},
                       ty = TyChar {info = NoInfo ()}, info = NoInfo ()})
        (bootParserGetString ptree n) in
    TmSeq {
      tms = str,
      ty = TySeq {ty = TyChar {info = NoInfo ()}, info = NoInfo ()},
      info = NoInfo ()
    }
  | (CBootParserGetInt _, [
    TmConst {val = CBootParserTree {val = ptree}},
    TmConst {val = CInt {val = n}}
  ]) ->
    TmConst {val = CInt {val = bootParserGetInt ptree n},
             ty = TyInt {info = NoInfo ()}, info = NoInfo ()}
  | (CBootParserGetFloat _, [
    TmConst {val = CBootParserTree {val = ptree}},
    TmConst {val = CInt {val = n}}
  ]) ->
    TmConst {val = CFloat {val = bootParserGetFloat ptree n},
             ty = TyFloat {info = NoInfo ()}, info = NoInfo ()}
  | (CBootParserGetListLength _, [
    TmConst {val = CBootParserTree {val = ptree}},
    TmConst {val = CInt {val = n}}
  ]) ->
    TmConst {val = CInt {val = bootParserGetListLength ptree n},
             ty = TyInt {info = NoInfo ()}, info = NoInfo ()}
  | (CBootParserGetConst _, [
    TmConst {val = CBootParserTree {val = ptree}},
    TmConst {val = CInt {val = n}}
  ]) ->
    TmConst {val = CBootParserTree {val = bootParserGetConst ptree n},
             ty = TyUnknown {info = NoInfo ()}, info = NoInfo ()}
  | (CBootParserGetPat _, [
    TmConst {val = CBootParserTree {val = ptree}},
    TmConst {val = CInt {val = n}}
  ]) ->
    TmConst {val = CBootParserTree {val = bootParserGetPat ptree n},
             ty = TyUnknown {info = NoInfo ()}, info = NoInfo ()}
  | (CBootParserGetCopat _, [
    TmConst {val = CBootParserTree {val = ptree}},
    TmConst {val = CInt {val = n}}
  ]) ->
    TmConst {val = CBootParserTree {val = bootParserGetCopat ptree n},
             ty = TyUnknown {info = NoInfo ()}, info = NoInfo ()}
  | (CBootParserGetInfo _, [
    TmConst {val = CBootParserTree {val = ptree}},
    TmConst {val = CInt {val = n}}
  ]) ->
    TmConst {val = CBootParserTree {val = bootParserGetInfo ptree n},
             ty = TyUnknown {info = NoInfo ()}, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>

