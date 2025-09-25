import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypePEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalBindThis" kind="sem">

```mc
sem pevalBindThis : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem pevalBindThis =
  | TmDecl {decl = DeclType _} -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalBindTop" kind="sem">

```mc
sem pevalBindTop : PEvalCtx_PEvalCtx -> (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem pevalBindTop ctx k =
  | TmDecl (x & {decl = DeclType _}) -> TmDecl {x with inexpr = pevalBindTop ctx k x.inexpr}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalEval" kind="sem">

```mc
sem pevalEval : PEvalCtx_PEvalCtx -> (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem pevalEval ctx k =
  | TmDecl (x & {decl = DeclType _}) -> TmDecl {x with inexpr = pevalBind ctx k x.inexpr}
```
</ToggleWrapper>
</DocBlock>

