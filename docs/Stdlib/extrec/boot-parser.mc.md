import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# boot-parser.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/extrec/pprint.mc"} style={S.link}>pprint.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/boot-parser.mc"} style={S.link}>mexpr/boot-parser.mc</a>, <a href={"/docs/Stdlib/mlang/boot-parser.mc"} style={S.link}>mlang/boot-parser.mc</a>, <a href={"/docs/Stdlib/mlang/pprint.mc"} style={S.link}>mlang/pprint.mc</a>, <a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/extrec/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/extrec/ast-builder.mc"} style={S.link}>ast-builder.mc</a>  
  
## Languages  
  

          <DocBlock title="ExtRecordBootParser" kind="lang" link="/docs/Stdlib/extrec/boot-parser.mc/lang-ExtRecordBootParser">

```mc
lang ExtRecordBootParser
```



<ToggleWrapper text="Code..">
```mc
lang ExtRecordBootParser = BootParserMLang + ExtRecordAst
  sem matchTerm t =
  | 117 ->
    let n = glistlen t 0 in
    let params = map (lam i. gname t (addi i 1)) (range 0 n 1) in
    TmDecl
    { decl = DeclRecType
      { ident = gname t 0
      , params = params
      , info = ginfo t 0
      }
    , ty = tyunknown_
    , inexpr = gterm t 0
    , info = ginfo t 0
    }
  | 118 -> TmDecl
    { decl = DeclRecField
      { label = gstr t 0
      , tyIdent = gtype t 0
      , info = ginfo t 0
      }
    , inexpr = gterm t 0
    , ty = tyunknown_
    , info = ginfo t 0
    }
  | 119 ->
    let n = glistlen t 0 in
    let ident = gname t 0 in
    let bindingPairs = map (lam i. (gstr t (addi 1 i), gterm t i)) (range 0 n 1) in
    TmExtRecord {bindings = mapFromSeq cmpString bindingPairs,
                 ident = ident,
                 ty = tyunknown_,
                 info = ginfo t 0}
  | 122 ->
    let n = glistlen t 0 in
    let ident = gname t 0 in
    let e = gterm t 0 in
    let bindingPairs = map (lam i. (gstr t i, gterm t (addi 1 i))) (range 0 n 1) in
    TmExtExtend {bindings = mapFromSeq cmpString bindingPairs,
                 e = e,
                 ty = tyunknown_,
                 info = ginfo t 0}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CosynBootParser" kind="lang" link="/docs/Stdlib/extrec/boot-parser.mc/lang-CosynBootParser">

```mc
lang CosynBootParser
```



<ToggleWrapper text="Code..">
```mc
lang CosynBootParser = BootParserMLang + CosynDeclAst + SynProdExtDeclAst
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
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CosemBootParser" kind="lang" link="/docs/Stdlib/extrec/boot-parser.mc/lang-CosemBootParser">

```mc
lang CosemBootParser
```



<ToggleWrapper text="Code..">
```mc
lang CosemBootParser = BootParserMLang + RecordCopatAst + CosemDeclAst
  sem matchDecl d =
  | 715 ->
    let nArgs = glistlen d 0 in
    let nCases = glistlen d 1 in
    let isBase = eqi (glistlen d 2) 0 in

    let parseArg = lam i.
      let i = addi 1 i in
      {ident = gname d i, tyAnnot = gtype d i} in
    let args = map parseArg (range 0 nArgs 1) in

    let parseCase = lam i. (gcopat d i, gterm d i) in
    let cases = map parseCase (range 0 nCases 1) in

    DeclCosem {info = ginfo d 0,
               ident = gname d 0,
               args = args,
               cases = cases,
               isBase = isBase,
               includes = [],
               tyAnnot = gtype d 0,
               targetTyIdent = nameSym ""}

  sem gcopat c =
  | n -> let c2 = bootParserGetCopat c n in
         matchCopat c2 (bootParserGetId c2)

  sem matchCopat c =
  | 800 ->
    let n = glistlen c 0 in
    RecordCopat {info = ginfo c 0,
                 fields = map (gstr c) (range 0 n 1)}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TyQualifiedNameBootParser" kind="lang" link="/docs/Stdlib/extrec/boot-parser.mc/lang-TyQualifiedNameBootParser">

```mc
lang TyQualifiedNameBootParser
```



<ToggleWrapper text="Code..">
```mc
lang TyQualifiedNameBootParser = BootParserMLang + QualifiedTypeAst
  sem matchType t =
  | 216 ->
    let plusLen = glistlen t 0 in
    let minusLen = glistlen t 1 in

    let parsePairs = lam offset. lam len. map
      (lam i. (gname t (addi i offset), gname t (addi (addi i offset) 1)))
      (range 0 len 2) in

    TyQualifiedName {pos = eqi (gint t 0) 1,
                     info = ginfo t 0,
                     lhs = gname t 0,
                     rhs = gname t 1,
                     plus = parsePairs 2 plusLen,
                     minus = parsePairs (addi 2 plusLen) minusLen}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ExtRecBootParser" kind="lang" link="/docs/Stdlib/extrec/boot-parser.mc/lang-ExtRecBootParser">

```mc
lang ExtRecBootParser
```



<ToggleWrapper text="Code..">
```mc
lang ExtRecBootParser = ExtRecordBootParser + CosynBootParser +
                        CosemBootParser + TyQualifiedNameBootParser
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MyPrettyPrint" kind="lang" link="/docs/Stdlib/extrec/boot-parser.mc/lang-MyPrettyPrint">

```mc
lang MyPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang MyPrettyPrint = MLangPrettyPrint + ExtRecPrettyPrint + DeclCosynPrettyPrint + DeclCosemPrettyPrint
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="gcopat" kind="let">

```mc
let gcopat tree i : BootParseTree -> Int -> BootParseTree
```



<ToggleWrapper text="Code..">
```mc
let gcopat = lam tree. lam i. bootParserGetCopat tree i
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
use ExtRecBootParser in
use MyPrettyPrint in
let parseProgram = lam str.
  match result.consume (parseMLangString str) with (_, Right p) in p
in

-- Test syn product extension
let str = strJoin "\n" [
  "lang L1",
  "  cosyn Env a = {x : a}",
  "end",
  "lang L2 = L1",
  "  cosyn Env a *= {y : a}",
  "end"
] in
let p = parseProgram str in
printLn (mlang2str p) ;

()
```
</ToggleWrapper>
</DocBlock>

