import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# load-runtime.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/stdlib.mc"} style={S.link}>stdlib.mc</a>, <a href={"/docs/Stdlib/mexpr/symbolize.mc"} style={S.link}>mexpr/symbolize.mc</a>, <a href={"/docs/Stdlib/mexpr/boot-parser.mc"} style={S.link}>mexpr/boot-parser.mc</a>, <a href={"/docs/Stdlib/mexpr/type-check.mc"} style={S.link}>mexpr/type-check.mc</a>  
  
## Languages  
  

          <DocBlock title="MExprLoadRuntime" kind="lang" link="/docs/Stdlib/mexpr/load-runtime.mc/lang-MExprLoadRuntime">

```mc
lang MExprLoadRuntime
```



<ToggleWrapper text="Code..">
```mc
lang MExprLoadRuntime = BootParser + MExprSym + MExprTypeCheck

  sem loadRuntime : String -> Expr
  sem loadRuntime =
  | file ->
      let args = defaultBootParserParseMCoreFileArg in
      let utestRuntimeFile = concat stdlibLoc file in
      let ast = typeCheck (symbolize (parseMCoreFile args utestRuntimeFile)) in
      ast

  sem mergeWithHeader : Expr -> Expr -> Expr
  sem mergeWithHeader ast =
  | TmDecl x ->
    TmDecl {x with inexpr = mergeWithHeader ast x.inexpr, ty = tyTm ast}
  | _ -> ast

end
```
</ToggleWrapper>
</DocBlock>

