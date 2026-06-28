import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# externals.mc  
  

Various functions for manipulating externals in MExpr ASTs

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mexpr/boot-parser.mc"} style={S.link}>boot-parser.mc</a>, <a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>ast-builder.mc</a>, <a href={"/docs/Stdlib/mexpr/eq.mc"} style={S.link}>eq.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/sys.mc"} style={S.link}>sys.mc</a>  
  
## Languages  
  

          <DocBlock title="Externals" kind="lang" link="/docs/Stdlib/mexpr/externals.mc/lang-Externals">

```mc
lang Externals
```



<ToggleWrapper text="Code..">
```mc
lang Externals = ExtDeclAst + VarAst

  -- Removes the given set of external definitions from the program.
  sem removeExternalDefs : Set String -> Expr -> Expr
  sem removeExternalDefs env =
  | TmDecl (x & {decl = DeclExt t}) ->
    let inexpr = removeExternalDefs env x.inexpr in
    if setMem (nameGetStr t.ident) env then inexpr
    else TmDecl {x with inexpr = inexpr}
  | expr -> smap_Expr_Expr (removeExternalDefs env) expr

  sem getExternalIds : Expr -> Set String
  sem getExternalIds =
  | expr -> getExternalIdsH (setEmpty cmpString) expr
  sem getExternalIdsH : Set String -> Expr -> Set String
  sem getExternalIdsH acc =
  | TmDecl {decl = DeclExt t, inexpr = inexpr} -> getExternalIdsH (setInsert (nameGetStr t.ident) acc) inexpr
  | expr -> sfold_Expr_Expr getExternalIdsH acc expr

end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Test" kind="lang" link="/docs/Stdlib/mexpr/externals.mc/lang-Test">

```mc
lang Test
```



<ToggleWrapper text="Code..">
```mc
lang Test = Externals + MExprEq + BootParser
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_error" kind="let">

```mc
let _error  : String
```



<ToggleWrapper text="Code..">
```mc
let _error = "Error in externals.mc: not an external in externalsMap"
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```

<Description>{`\-\-\-\-\-\-\-\-\-  
TESTS \-\-  
\-\-\-\-\-\-\-\-\-`}</Description>


<ToggleWrapper text="Code..">
```mc
mexpr
use Test in

let parse = parseMExprStringExn
  { defaultBootParserParseMExprStringArg with allowFree = true } in
let ast1 = parse "
  external a: Int -> Int in
  external b: Float -> Float in
  a 1; b 1.0
" in
let ast2 = parse "
  external b: Float -> Float in
  a 1; b 1.0
" in
let ast3 = parse "
  external a: Int -> Int in
  a 1; b 1.0
" in

utest removeExternalDefs (setOfSeq cmpString ["a"]) ast1
with ast2
using eqExpr in

utest removeExternalDefs (setOfSeq cmpString ["b"]) ast1
with ast3
using eqExpr in

utest getExternalIds ast1 with setOfSeq cmpString ["a", "b"]
using setEq in

utest getExternalIds ast2 with setOfSeq cmpString ["b"]
using setEq in

()
```
</ToggleWrapper>
</DocBlock>

