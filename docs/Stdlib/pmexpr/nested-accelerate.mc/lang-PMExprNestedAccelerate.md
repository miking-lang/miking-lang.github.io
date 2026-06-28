import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprNestedAccelerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="checkIdentifiers" kind="sem">

```mc
sem checkIdentifiers : Set Name -> Ast_Expr -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem checkIdentifiers env =
  | TmVar t ->
    if setMem t.ident env then
      errorSingle [t.info] _nestedAccMsg
    else ()
  | t -> sfold_Expr_Expr (lam. lam t. checkIdentifiers env t) () t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="containsNestedAccelerate" kind="sem">

```mc
sem containsNestedAccelerate : Set Name -> Ast_Expr -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem containsNestedAccelerate env =
  | TmDecl (x & {decl = DeclLet t}) ->
    checkIdentifiers env t.body;
    containsNestedAccelerate env x.inexpr
  | TmDecl (x & {decl = DeclRecLets t}) ->
    iter (lam bind. checkIdentifiers env bind.body) t.bindings;
    containsNestedAccelerate env x.inexpr
  | TmDecl {decl = DeclType _ | DeclConDef _ | DeclUtest _ | DeclExt _, inexpr = inexpr} ->
    containsNestedAccelerate env inexpr
  | _ -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="checkNestedAccelerate" kind="sem">

```mc
sem checkNestedAccelerate : Set Name -> Ast_Expr -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem checkNestedAccelerate accelerateIds =
  | t -> containsNestedAccelerate accelerateIds t
```
</ToggleWrapper>
</DocBlock>

