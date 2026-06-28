import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# mcore.mc  
  

Defines functions for compiling \(and running\) an MCore program.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/remove-ascription.mc"} style={S.link}>mexpr/remove-ascription.mc</a>, <a href={"/docs/Stdlib/mexpr/type-annot.mc"} style={S.link}>mexpr/type-annot.mc</a>, <a href={"/docs/Stdlib/mexpr/type-lift.mc"} style={S.link}>mexpr/type-lift.mc</a>, <a href={"/docs/Stdlib/ocaml/generate.mc"} style={S.link}>ocaml/generate.mc</a>, <a href={"/docs/Stdlib/ocaml/pprint.mc"} style={S.link}>ocaml/pprint.mc</a>, <a href={"/docs/Stdlib/sys.mc"} style={S.link}>sys.mc</a>  
  
## Types  
  

          <DocBlock title="Hooks" kind="type">

```mc
type Hooks
```



<ToggleWrapper text="Code..">
```mc
type Hooks a =
  { debugGenerate : String -> ()
  , exitBefore : () -> ()
  , postprocessOcamlTops : [use OCamlTopAst in Top] -> [use OCamlTopAst in Top]
  , compileOcaml : [String] -> [String] -> String -> a
  }
```
</ToggleWrapper>
</DocBlock>

## Languages  
  

          <DocBlock title="MCoreCompileLang" kind="lang" link="/docs/Stdlib/ocaml/mcore.mc/lang-MCoreCompileLang">

```mc
lang MCoreCompileLang
```



<ToggleWrapper text="Code..">
```mc
lang MCoreCompileLang =
  MExprRemoveTypeAscription + MExprTypeLift +
  OCamlTypeDeclGenerate + OCamlGenerate + OCamlGenerateExternalNaive

  sem collectLibraries : Map Name [ExternalImpl] -> Set String -> ([String], [String])
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

  sem compileMCore : all a. Expr -> Hooks a -> a
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

  -- Compiles and runs the given MCore AST, using the given standard in and
  -- program arguments. The return value is a record containing the return code,
  -- the standard out and the standard error, based on the result of running the
  -- program.
  --
  -- If the compilation fails, the compile error will be printed and the program
  -- will exit.
  sem compileRunMCore : String -> [String] -> Expr -> ExecResult
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
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="mkEmptyHooks" kind="let">

```mc
let mkEmptyHooks compileOcaml : all a. ([String] -> [String] -> String -> a) -> Hooks a
```



<ToggleWrapper text="Code..">
```mc
let mkEmptyHooks : all a. ([String] -> [String] -> String -> a) -> Hooks a =
  lam compileOcaml.
  { debugGenerate = lam. ()
  , exitBefore = lam. ()
  , postprocessOcamlTops = lam tops. tops
  , compileOcaml = compileOcaml
  }
```
</ToggleWrapper>
</DocBlock>

