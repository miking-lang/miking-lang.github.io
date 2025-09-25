import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaPMExprKernelCalls  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateKernelApplications" kind="sem">

```mc
sem generateKernelApplications : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem generateKernelApplications =
  | t ->
    let marked = markNonKernelFunctions t in
    promoteKernels marked t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="markNonKernelFunctions" kind="sem">

```mc
sem markNonKernelFunctions : Ast_Expr -> Set Name
```

<Description>{`Produces a set of identifiers corresponding to the functions that are used  
directly or indirectly by a parallel operation. Parallel keywords within  
such functions are not promoted to kernels.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem markNonKernelFunctions =
  | t -> markNonKernelFunctionsH (setEmpty nameCmp) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="markNonKernelFunctionsH" kind="sem">

```mc
sem markNonKernelFunctionsH : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem markNonKernelFunctionsH (marked : Set Name) =
  | TmDecl (x & {decl = DeclLet t}) ->
    let marked = markNonKernelFunctionsH marked x.inexpr in
    if setMem t.ident marked then
      markInBody marked t.body
    else markInUnmarkedBody marked t.body
  | tm & TmDecl (x & {decl = DeclRecLets t}) ->
    let bindMap : Map Name Expr =
      mapFromSeq nameCmp
        (map
          (lam bind : DeclLetRecord. (bind.ident, bind.body))
          t.bindings) in
    let markFunctionsInComponent = lam marked. lam comp.
      if any (lam e. setMem e marked) comp then
        foldl
          (lam marked. lam bindId.
            -- NOTE(larshum, 2022-08-09): The call graph construction includes
            -- nested functions. We are only interested in marking the bindings
            -- themselves, so we do nothing if it's not a binding.
            match mapLookup bindId bindMap with Some bindBody then
              markInBody marked bindBody
            else marked)
          marked comp
      else marked
    in
    let marked = markNonKernelFunctionsH marked x.inexpr in
    let g : Digraph Name Int = constructCallGraph tm in
    let sccs = digraphTarjan g in
    foldl markFunctionsInComponent marked (reverse sccs)
  | TmDecl x -> markNonKernelFunctionsH marked x.inexpr
  | t -> marked
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="markInUnmarkedBody" kind="sem">

```mc
sem markInUnmarkedBody : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem markInUnmarkedBody (marked : Set Name) =
  | TmParallelLoop t -> markInBody marked t.f
  | t -> sfold_Expr_Expr markInUnmarkedBody marked t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="markInBody" kind="sem">

```mc
sem markInBody : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem markInBody (marked : Set Name) =
  | TmVar (t & {ty = TyArrow _}) -> setInsert t.ident marked
  | t -> sfold_Expr_Expr markInBody marked t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="promoteKernels" kind="sem">

```mc
sem promoteKernels : Set Name -> Ast_Expr -> Ast_Expr
```

<Description>{`Promotes parallel operations used in functions that have not been marked  
to kernel operations.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem promoteKernels (marked : Set Name) =
  | TmDecl (x & {decl = DeclLet t}) ->
    let inexpr = promoteKernels marked x.inexpr in
    if setMem t.ident marked then TmDecl {x with inexpr = inexpr}
    else
      let body = promoteKernelsBody t.body in
      TmDecl {x with decl = DeclLet {t with body = body}, inexpr = inexpr}
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let promoteKernelBinding = lam binding : DeclLetRecord.
      if setMem binding.ident marked then binding
      else {binding with body = promoteKernelsBody binding.body}
    in
    let inexpr = promoteKernels marked x.inexpr in
    let bindings = map promoteKernelBinding t.bindings in
    TmDecl {x with decl = DeclRecLets {t with bindings = bindings}, inexpr = inexpr}
  | TmDecl x -> TmDecl {x with inexpr = promoteKernels marked x.inexpr}
  | t -> t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="promoteKernelsBody" kind="sem">

```mc
sem promoteKernelsBody : Ast_Expr -> Ast_Expr
```

<Description>{`TODO\(larshum, 2022\-03\-22\): Add support for sequence map and reduce  
kernels.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem promoteKernelsBody =
  | TmParallelLoop {n = n, f = f, ty = ty, info = info} ->
    TmLoopKernel {n = n, f = f, ty = ty, info = info}
  | t -> smap_Expr_Expr promoteKernelsBody t
```
</ToggleWrapper>
</DocBlock>

