import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LambdaLiftNameAnonymous  
  

Adds a name to all anonymous functions by wrapping them in a let\-expression.  
These are all lambda expressions that are not part of the right\-hand side of  
a let\-expression or a recursive binding.

  
  
  
## Semantics  
  

          <DocBlock title="nameAnonymousLambdas" kind="sem">

```mc
sem nameAnonymousLambdas : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem nameAnonymousLambdas = | tm -> nameAnonymousLambdasWork false tm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameAnonymousLambdasDecl" kind="sem">

```mc
sem nameAnonymousLambdasDecl : Ast_Decl -> Ast_Decl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem nameAnonymousLambdasDecl =
  | d -> smap_Decl_Expr (nameAnonymousLambdasWork false) d
  | DeclLet x ->
    let body = nameAnonymousLambdasWork true x.body in
    DeclLet {x with body = body}
  | DeclRecLets x ->
    let f = lam binding. {binding with body = nameAnonymousLambdasWork true binding.body} in
    let bindings = map f x.bindings in
    DeclRecLets {x with bindings = bindings}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameAnonymousLambdasWork" kind="sem">

```mc
sem nameAnonymousLambdasWork : Bool -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem nameAnonymousLambdasWork named =
  | tm -> smap_Expr_Expr (nameAnonymousLambdasWork false) tm
  | tm & TmLam t ->
    let tm = smap_Expr_Expr (nameAnonymousLambdasWork true) tm in
    if named then tm else
    let lamName = nameSym "anon" in
    let ty = tyTm tm in
    bind_ (nlet_ lamName ty tm) (withType ty (nvar_ lamName))
  | TmDecl x ->
    let decl = nameAnonymousLambdasDecl x.decl in
    let inexpr = nameAnonymousLambdasWork false x.inexpr in
    TmDecl {x with decl = decl, inexpr = inexpr}
```
</ToggleWrapper>
</DocBlock>

