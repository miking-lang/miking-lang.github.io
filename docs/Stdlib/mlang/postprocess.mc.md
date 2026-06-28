import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# postprocess.mc  
  

This transformation converts the \`Name\`s of semantic functions to \`Name\`s   
with the same symbol, but also have a unique string in the shape of   
\<LangName\>\_\<SemName\>.   
  
This transformation is added because some parts of the exising MExpr  
transformations to OCaml do not respect the symbols fully and also require  
the strings of names to be unique. 

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/tuple.mc"} style={S.link}>tuple.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>mexpr/ast-builder.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>mexpr/pprint.mc</a>, <a href={"/docs/Stdlib/mexpr/utils.mc"} style={S.link}>mexpr/utils.mc</a>  
  
## Languages  
  

          <DocBlock title="PostProcess" kind="lang" link="/docs/Stdlib/mlang/postprocess.mc/lang-PostProcess">

```mc
lang PostProcess
```



<ToggleWrapper text="Code..">
```mc
lang PostProcess = MExprAst + MExprSubstitute
  sem buildMap : Map (String, String) Name -> Map Name Name
  sem buildMap =
  | m ->
    let pairs = mapToSeq m in
    let pairs = map (lam p. 
      match p with ((langStr, semStr), n) in (n, join [langStr, "_", semStr]))
      pairs in
    let pairs = map (lam p. match p with (n, str) in (n, nameSetStr n str)) pairs in
    mapFromSeq nameCmp pairs


  sem postprocess : Map (String, String) Name -> Expr -> Expr
  sem postprocess m =| e ->
    let m = buildMap m in 
    substituteIdentifiersExpr m e
end
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
use PostProcess in 
use MExprPrettyPrint in
let sym = nameSym "f" in 
let m = mapEmpty (tupleCmp2 cmpString cmpString) in 
let m = mapInsert ("LangName", "f") sym m in 

let e = nvar_ sym in 
let e = postprocess m e in 
match e with TmVar {ident = ident} in 
utest nameHasSym ident with true in 
()
```
</ToggleWrapper>
</DocBlock>

