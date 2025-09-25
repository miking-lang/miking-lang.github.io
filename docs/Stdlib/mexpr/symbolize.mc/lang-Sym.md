import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Sym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeExpr" kind="sem">

```mc
sem symbolizeExpr : SymEnv -> Ast_Expr -> Ast_Expr
```

<Description>{`Symbolize with an environmentNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symbolizeExpr (env : SymEnv) =
  | t ->
    let t = smap_Expr_Expr (symbolizeExpr env) t in
    let t = smap_Expr_Type (symbolizeType env) t in
    t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeDecl" kind="sem">

```mc
sem symbolizeDecl : SymEnv -> Ast_Decl -> (SymEnv, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symbolizeDecl env =
  | d ->
    let d = smap_Decl_Expr (symbolizeExpr env) d in
    let d = smap_Decl_Type (symbolizeType env) d in
    (env, d)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeType" kind="sem">

```mc
sem symbolizeType : SymEnv -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symbolizeType env =
  | t -> smap_Type_Type (symbolizeType env) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeTopExpr" kind="sem">

```mc
sem symbolizeTopExpr : SymEnv -> Ast_Expr -> SymEnv
```

<Description>{`Same as symbolizeExpr, but also return an env with all names bound at the  
top\-level`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symbolizeTopExpr (env : SymEnv) =
  | t ->
    let t = symbolizeExpr env t in
    addTopNames env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeKind" kind="sem">

```mc
sem symbolizeKind : Info -> SymEnv -> Ast_Kind -> Ast_Kind
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symbolizeKind info env =
  | t -> smap_Kind_Type (symbolizeType env) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizePat" kind="sem">

```mc
sem symbolizePat : all ext. SymEnv -> Map String Name -> Ast_Pat -> (Map String Name, Ast_Pat)
```

<Description>{`TODO\(vipa, 2020\-09\-23\): env is constant throughout symbolizePat,  
so it would be preferrable to pass it in some other way, a reader  
monad or something. patEnv on the other hand changes, it would be  
nice to pass via state monad or something.  env is the  
environment from the outside, plus the names added thus far in  
the pattern patEnv is only the newly added namesNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symbolizePat env patEnv =
  | t -> smapAccumL_Pat_Pat (symbolizePat env) patEnv t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolize" kind="sem">

```mc
sem symbolize : Ast_Expr -> Ast_Expr
```

<Description>{`Symbolize with builtin environment`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symbolize =
  | expr ->
    let env = symEnvDefault in
    symbolizeExpr env expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeAllowFree" kind="sem">

```mc
sem symbolizeAllowFree : Ast_Expr -> Ast_Expr
```

<Description>{`Symbolize with builtin environment and ignore errors`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symbolizeAllowFree =
  | expr ->
    let env = { symEnvDefault with allowFree = true } in
    symbolizeExpr env expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addTopNames" kind="sem">

```mc
sem addTopNames : SymEnv -> Ast_Expr -> SymEnv
```

<Description>{`Add top\-level identifiers \(along the spine of the program\) in \`t\`  
to the given environment.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addTopNames (env : SymEnv) =
  | _ -> env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="declAddDefinition" kind="sem">

```mc
sem declAddDefinition : SymEnv -> Ast_Decl -> SymEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem declAddDefinition env =
  | _ -> env
```
</ToggleWrapper>
</DocBlock>

