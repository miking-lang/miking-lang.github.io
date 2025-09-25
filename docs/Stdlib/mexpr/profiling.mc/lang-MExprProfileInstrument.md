import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprProfileInstrument  
  

  
  
  
## Semantics  
  

          <DocBlock title="collectToplevelFunctions" kind="sem">

```mc
sem collectToplevelFunctions : Map Name (Int, Info) -> Ast_Expr -> Map Name (Int, Info)
```



<ToggleWrapper text="Code..">
```mc
sem collectToplevelFunctions (env : ProfileEnv) =
  | _ -> env
  | TmDecl x ->
    collectToplevelFunctions env x.inexpr
  | TmDecl (x & {decl = DeclLet t}) ->
    let env =
      match t.body with TmLam _ then
        let idx = mapSize env in
        mapInsert t.ident (idx, t.info) env
      else env in
    collectToplevelFunctions env x.inexpr
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let collectBinding : ProfileEnv -> DeclLetRecord -> ProfileEnv =
      lam env. lam binding.
      match binding.body with TmLam _ then
        let idx = mapSize env in
        mapInsert binding.ident (idx, binding.info) env
      else env
    in
    let env = foldl collectBinding env t.bindings in
    collectToplevelFunctions env x.inexpr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="instrumentProfilingCalls" kind="sem">

```mc
sem instrumentProfilingCalls : Int -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem instrumentProfilingCalls (functionIndex : Int) =
  | TmLam t ->
    TmLam {t with body = instrumentProfilingCalls functionIndex t.body}
  | t ->
    bindall_ [
      ulet_ "" (app_ (var_ "pushCallStack") (int_ functionIndex)),
      ulet_ "tmp" t,
      ulet_ "" (app_ (var_ "popCallStack") unit_)]
      (var_ "tmp")
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="instrumentProfilingH" kind="sem">

```mc
sem instrumentProfilingH : Map Name (Int, Info) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem instrumentProfilingH (env : ProfileEnv) =
  | TmDecl (x & {decl = DeclLet t}) ->
    match mapLookup t.ident env with Some (idx, _)
    then TmDecl
      { x with decl = DeclLet {t with body = instrumentProfilingCalls idx t.body}
      , inexpr = instrumentProfilingH env x.inexpr
      }
    else TmDecl {x with inexpr = instrumentProfilingH env x.inexpr}
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let instrumentBinding : DeclLetRecord -> DeclLetRecord =
      lam binding.
      match mapLookup binding.ident env with Some (idx, _) then
        {binding with body = instrumentProfilingCalls idx binding.body}
      else binding
    in TmDecl
    {x with decl = DeclRecLets {t with bindings = map instrumentBinding t.bindings}
    , inexpr = instrumentProfilingH env x.inexpr
    }
  | TmDecl x -> TmDecl {x with inexpr = instrumentProfilingH env x.inexpr}
  | t -> t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="instrumentProfiling" kind="sem">

```mc
sem instrumentProfiling : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem instrumentProfiling =
  | t ->
    let emptyEnv = mapEmpty nameCmp in
    let env = collectToplevelFunctions emptyEnv t in
    let initDecls =
      recursive let work = lam acc. lam tm.
        match tm with TmDecl x
        then work (snoc acc x.decl) x.inexpr
        else acc in
      work [] (parseMExprStringKeywordsExn [] (_profilerInitStr env)) in
    bindall_ (snoc initDecls (ulet_ "" (instrumentProfilingH env t)))
      (getProfilerReportCode ())
```
</ToggleWrapper>
</DocBlock>

