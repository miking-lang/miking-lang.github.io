import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeStream  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeStreamFromExpr" kind="sem">

```mc
sem typeStreamFromExpr : Ast_Expr -> TypeStreamInterface_TypeStreamContext
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem typeStreamFromExpr =
        | ast -> { stack = [ast] }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="buildTypeStream" kind="sem">

```mc
sem buildTypeStream : MAst -> TypeStreamInterface_TypeStreamContext
```

<Description>{`Builds a TypeStream, creates an AST via the compiler's parser. Then types this AST via compiler's typer.  
Note that meta vars are not removed here    No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem buildTypeStream = | ast -> typeStreamFromExpr ast.expr
```
</ToggleWrapper>
</DocBlock>

