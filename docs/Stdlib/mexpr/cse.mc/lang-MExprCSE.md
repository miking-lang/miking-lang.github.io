import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprCSE  
  

  
  
  
## Semantics  
  

          <DocBlock title="cseFunction" kind="sem">

```mc
sem cseFunction : Bool -> Ast_Expr -> Ast_Expr
```

<Description>{`Runs CSE on the body of a function. That is, if it is an expression  
wrapped inside a sequence of lambda terms.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cseFunction (inLambda : Bool) =
  | TmLam t ->
    TmLam {t with body = cseFunction true t.body}
  | t -> if inLambda then cse t else t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cseDecl" kind="sem">

```mc
sem cseDecl : Ast_Decl -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
sem cseDecl =
  | DeclLet t -> DeclLet {t with body = cseFunction false t.body}
  | DeclRecLets t ->
    let bindings =
      map
        (lam bind : DeclLetRecord.
          {bind with body = cseFunction false bind.body})
        t.bindings in
    DeclRecLets {t with bindings = bindings}
  | d -> d
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cseGlobal" kind="sem">

```mc
sem cseGlobal : Ast_Expr -> Ast_Expr
```

<Description>{`Runs CSE globally within the body of each top\-level function.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cseGlobal =
  | TmDecl x ->
    let decl = cseDecl x.decl in
    let inexpr = cseGlobal x.inexpr in
    TmDecl {x with decl = decl, inexpr = inexpr}
  | t -> t
```
</ToggleWrapper>
</DocBlock>

