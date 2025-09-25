import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MLangConstTransformer  
  

  
  
  
## Semantics  
  

          <DocBlock title="constTransformProgram" kind="sem">

```mc
sem constTransformProgram : [(String, ConstAst_Const)] -> MLangTopLevel_MLangProgram -> MLangTopLevel_MLangProgram
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem constTransformProgram builtins =
  | prog ->
    {decls = map (constTransformDecl builtins) prog.decls,
     expr = constTransform builtins prog.expr}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constTransformDecl" kind="sem">

```mc
sem constTransformDecl : [(String, ConstAst_Const)] -> Ast_Decl -> Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>

