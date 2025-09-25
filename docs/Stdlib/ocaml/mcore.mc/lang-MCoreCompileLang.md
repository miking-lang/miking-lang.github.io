import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MCoreCompileLang  
  

  
  
  
## Semantics  
  

          <DocBlock title="collectLibraries" kind="sem">

```mc
sem collectLibraries : Map Name [ExternalImpl] -> Set String -> ([String], [String])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectLibraries extNameMap =
  | syslibs ->
    let f = lam s. lam str. setInsert str s in
    let g = lam acc : (Set String, Set String). lam impl :  ExternalImpl.
      match acc with (libs, clibs) then
        (foldl f libs impl.libraries, foldl f clibs impl.cLibraries)
      else never
    in
    let h = lam acc. lam. lam impls. foldl g acc impls in
    match mapFoldWithKey h (setEmpty cmpString, setEmpty cmpString) extNameMap
    with (libs, clibs) then
      (setToSeq libs, setToSeq clibs)
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileMCore" kind="sem">

```mc
sem compileMCore : all a. Ast_Expr -> Hooks a -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileMCore ast =
  | hooks ->
    let ast = removeTypeAscription ast in

    match typeLift ast with (env, ast) in
    match generateTypeDecls env with (env, typeTops) in
    let env : GenerateEnv =
      chooseExternalImpls (externalGetSupportedExternalImpls ()) env ast
    in
    let exprTops = generateTops env ast in
    let exprTops = hooks.postprocessOcamlTops exprTops in

    -- List OCaml packages availible on the system.
    let syslibs =
      setOfSeq cmpString
        (map (lam x : (String, String). x.0) (externalListOcamlPackages ()))
    in

    -- Collect external library dependencies
    match collectLibraries env.exts syslibs with (libs, clibs) in
    let ocamlProg =
      use OCamlPrettyPrint in
      pprintOcamlTops (concat typeTops exprTops)
    in

    -- If option --debug-generate, print the AST
    hooks.debugGenerate ocamlProg;

    -- If option --exit-before, exit the program
    hooks.exitBefore ();

    -- Compile OCaml AST
    hooks.compileOcaml libs clibs ocamlProg
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileRunMCore" kind="sem">

```mc
sem compileRunMCore : String -> [String] -> Ast_Expr -> ExecResult
```

<Description>{`Compiles and runs the given MCore AST, using the given standard in and  
program arguments. The return value is a record containing the return code,  
the standard out and the standard error, based on the result of running the  
program.  
  
If the compilation fails, the compile error will be printed and the program  
will exit.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileRunMCore stdin args =
  | ast ->
    let compileOcaml = lam libs. lam clibs. lam ocamlProg.
      let options = {optimize = true, libraries = libs, cLibraries = clibs} in
      let cunit : CompileResult = ocamlCompileWithConfig options ocamlProg in
      let res = cunit.run stdin args in
      cunit.cleanup ();
      res
    in
    compileMCore ast (mkEmptyHooks compileOcaml)
```
</ToggleWrapper>
</DocBlock>

