import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# const-transformer.mc  
  

Transform TmVar with identifiers that match the names of contants to TmConst  
  
When parsing an MLang program using \`boot\-parser.mc\`, constants such as   
\`addi\`, \`map\` and \`null\` are reprsented in the AST as \`TmVar\`s with "addi",  
"map" and "null" as identifiers. This transformations converts such intrinsics  
to \`CAddi\`, \`CMap\`, and \`CNull\`.   
  
The transformation is done in accordance to a provided mapping from strings  
constants that is passed through the \`builtins\` parameter. The typical definition  
of this mapping can be found in \`stdlib/mexper/builtin.mc\`.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mlang/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>, <a href={"/docs/Stdlib/mexpr/const-transformer.mc"} style={S.link}>mexpr/const-transformer.mc</a>, <a href={"/docs/Stdlib/extrec/ast.mc"} style={S.link}>extrec/ast.mc</a>  
  
## Languages  
  

          <DocBlock title="MLangConstTransformer" kind="lang" link="/docs/Stdlib/mlang/const-transformer.mc/lang-MLangConstTransformer">

```mc
lang MLangConstTransformer
```



<ToggleWrapper text="Code..">
```mc
lang MLangConstTransformer = MLangAst + ConstTransformer + CosemDeclAst
  sem constTransformProgram : [(String, Const)] -> MLangProgram -> MLangProgram
  sem constTransformProgram builtins =
  | prog ->
    {decls = map (constTransformDecl builtins) prog.decls,
     expr = constTransform builtins prog.expr}

  sem constTransformDecl : [(String, Const)] -> Decl -> Decl
  sem constTransformDecl builtins = 
  | DeclLang d -> 
    DeclLang {d with decls = map (constTransformDecl builtins) d.decls}
  | DeclSem d ->
    let transformCase = lam c. {c with thn = constTransform builtins c.thn} in
    DeclSem {d with cases = map transformCase d.cases}
  | DeclCosem d ->
    let transformCase = lam c. (c.0, constTransform builtins c.1) in
    DeclCosem {d with cases = map transformCase d.cases}
  | DeclLet d -> 
    DeclLet {d with body = constTransform builtins d.body}
  | DeclRecLets d ->
    let transformBinding = lam b. 
      {b with body = constTransform builtins b.body} in 
    DeclRecLets {d with bindings = map transformBinding d.bindings}
  | DeclUtest d ->
    DeclUtest {d with test = constTransform builtins d.test,
                      expected = constTransform builtins d.test,
                      tusing = optionMap (constTransform builtins) d.tusing}
  | d -> d
  
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

()
```
</ToggleWrapper>
</DocBlock>

