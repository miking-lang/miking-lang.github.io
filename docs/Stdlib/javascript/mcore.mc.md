import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# mcore.mc  
  

Defines functions for compiling an MCore program to JS.  
Used in the src/main/compile.mc file.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/javascript/compile.mc"} style={S.link}>javascript/compile.mc</a>  
  
## Variables  
  

          <DocBlock title="platformMapJS" kind="let">

```mc
let platformMapJS  : Map String CompileJSTargetPlatform
```



<ToggleWrapper text="Code..">
```mc
let platformMapJS = mapFromSeq cmpString
  [("generic", CompileJSTP_Generic ())
  ,("node", CompileJSTP_Node ())
  ,("bun", CompileJSTP_Bun ())
  ,("web", CompileJSTP_Web ())]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileMCoreToJS" kind="let">

```mc
let compileMCoreToJS opts ast sourcePath : CompileJSOptions -> Ast_Expr -> String -> String
```



<ToggleWrapper text="Code..">
```mc
let compileMCoreToJS : use Ast in CompileJSOptions -> Expr -> String -> String =
  lam opts. lam ast. lam sourcePath.
  let outfile = javascriptCompileFile opts ast sourcePath in
  printLn (concat "Successfully compiled file to: " outfile);
  outfile
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parseJSTarget" kind="let">

```mc
let parseJSTarget target : String -> CompileJSTargetPlatform
```



<ToggleWrapper text="Code..">
```mc
let parseJSTarget : String -> CompileJSTargetPlatform =
  lam target.
  match mapLookup target platformMapJS with Some p then
    printLn (concat "Target JavaScript platform: " target); p
  else error (join ["Invalid value for --js-target: '", target, "'\nAccepted values: ", strJoin ", " (mapKeys platformMapJS)])
```
</ToggleWrapper>
</DocBlock>

