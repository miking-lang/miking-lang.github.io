import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheck" kind="sem">

```mc
sem typeCheck : Ast_Expr -> Ast_Expr
```

<Description>{`Type check 'tm', with FreezeML\-style type inference. Returns the  
term annotated with its type. The resulting type contains no  
unification variables or links.  
IMPORTANT: Assumes that aliases in 'tm' have been replaced with TyAlias  
nodes \(this is done in the symbolization step\).No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem typeCheck =
  | tm ->
    removeMetaVarExpr (typeCheckLeaveMeta tm)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeCheckLeaveMeta" kind="sem">

```mc
sem typeCheckLeaveMeta : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem typeCheckLeaveMeta =
  | tm -> typeCheckExpr typcheckEnvDefault tm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```

<Description>{`Type check \`expr' under the type environment \`env'. The resulting  
type may contain unification variables and links.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | tm ->
    dprint tm;
    print "\n";
    errorSingle [infoTm tm] "Unmatched term expression in 'typeCheckExpr'"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeCheckDecl" kind="sem">

```mc
sem typeCheckDecl : TCEnv -> Ast_Decl -> (TCEnv, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem typeCheckDecl env =
  | d ->
    dprint d;
    print "\n";
    errorSingle [infoDecl d] "Unmatched decl in 'typeCheckDecl'"
```
</ToggleWrapper>
</DocBlock>

