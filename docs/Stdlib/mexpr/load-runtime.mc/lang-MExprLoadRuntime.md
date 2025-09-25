import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprLoadRuntime  
  

  
  
  
## Semantics  
  

          <DocBlock title="loadRuntime" kind="sem">

```mc
sem loadRuntime : String -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem loadRuntime =
  | file ->
      let args = defaultBootParserParseMCoreFileArg in
      let utestRuntimeFile = concat stdlibLoc file in
      let ast = typeCheck (symbolize (parseMCoreFile args utestRuntimeFile)) in
      ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mergeWithHeader" kind="sem">

```mc
sem mergeWithHeader : Ast_Expr -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mergeWithHeader ast =
  | TmDecl x ->
    TmDecl {x with inexpr = mergeWithHeader ast x.inexpr, ty = tyTm ast}
  | _ -> ast
```
</ToggleWrapper>
</DocBlock>

