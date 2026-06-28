import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CosemBootParser  
  

  
  
  
## Semantics  
  

          <DocBlock title="matchDecl" kind="sem">

```mc
sem matchDecl : BootParseTree -> Int -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="gcopat" kind="sem">

```mc
sem gcopat : BootParseTree -> Int -> CopatAst_Copat
```



<ToggleWrapper text="Code..">
```mc
sem gcopat c =
  | n -> let c2 = bootParserGetCopat c n in
         matchCopat c2 (bootParserGetId c2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchCopat" kind="sem">

```mc
sem matchCopat : BootParseTree -> Int -> CopatAst_Copat
```



<ToggleWrapper text="Code..">
```mc
sem matchCopat c =
  | 800 ->
    let n = glistlen c 0 in
    RecordCopat {info = ginfo c 0,
                 fields = map (gstr c) (range 0 n 1)}
```
</ToggleWrapper>
</DocBlock>

