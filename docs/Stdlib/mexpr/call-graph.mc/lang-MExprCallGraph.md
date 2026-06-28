import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprCallGraph  
  

  
  
  
## Semantics  
  

          <DocBlock title="constructCallGraph" kind="sem">

```mc
sem constructCallGraph : Ast_Expr -> Digraph Name Int
```



<ToggleWrapper text="Code..">
```mc
sem constructCallGraph =
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let g : Digraph Name Int = digraphEmpty nameCmp eqi in
    let g = _addGraphVertices g (TmDecl {x with inexpr = unit_}) in
    _addGraphCallEdges g t.bindings
  | t ->
    errorSingle [infoTm t] (join ["A call graph can only be constructed ",
                                    "from a recursive let-expression"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addGraphVertices" kind="sem">

```mc
sem _addGraphVertices : Digraph Name Int -> Ast_Expr -> Digraph Name Int
```



<ToggleWrapper text="Code..">
```mc
sem _addGraphVertices (g : Digraph Name Int) =
  | TmDecl {decl = DeclLet t, inexpr = inexpr} ->
    let g =
      match t.tyBody with TyArrow _ then digraphAddVertex t.ident g
      else g
    in
    let g = _addGraphVertices g t.body in
    _addGraphVertices g inexpr
  | TmDecl {decl = DeclRecLets t, inexpr = inexpr} ->
    let g =
      foldl
        (lam g. lam bind : DeclLetRecord. digraphAddVertex bind.ident g)
        g t.bindings in
    let g =
      foldl
        (lam g. lam bind : DeclLetRecord.
          _addGraphVertices g bind.body)
        g t.bindings in
    _addGraphVertices g inexpr
  | t -> sfold_Expr_Expr _addGraphVertices g t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addGraphCallEdges" kind="sem">

```mc
sem _addGraphCallEdges : Digraph Name Int -> [LetDeclAst_DeclLetRecord] -> Digraph Name Int
```



<ToggleWrapper text="Code..">
```mc
sem _addGraphCallEdges (g : Digraph Name Int) =
  | bindings /- : [DeclLetRecord] -/ ->
    let edges =
      foldl
        (lam edges. lam bind : DeclLetRecord.
          _findCallEdges bind.ident g edges bind.body)
        (mapEmpty nameCmp) bindings in
    mapFoldWithKey
      (lam g : Digraph Name Int. lam edgeSrc : Name. lam edgeDsts : Set Name.
        mapFoldWithKey
          (lam g : Digraph Name Int. lam edgeDst : Name. lam.
            digraphAddEdge edgeSrc edgeDst 0 g)
          g edgeDsts)
      g edges
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_findCallEdges" kind="sem">

```mc
sem _findCallEdges : Name -> Digraph Name Int -> Map Name (Set Name) -> Ast_Expr -> Map Name (Set Name)
```



<ToggleWrapper text="Code..">
```mc
sem _findCallEdges (src : Name) (g : Digraph Name Int)
                            (edges : Map Name (Set Name)) =
  | TmVar t ->
    if digraphHasVertex t.ident g then
      let outEdges =
        match mapLookup src edges with Some outEdges then
          setInsert t.ident outEdges
        else setOfSeq nameCmp [t.ident] in
      mapInsert src outEdges edges
    else edges
  | TmDecl {decl = DeclLet t, inexpr = inexpr} ->
    let letSrc = match t.tyBody with TyArrow _ then t.ident else src in
    let edges = _findCallEdges letSrc g edges t.body in
    _findCallEdges src g edges inexpr
  | TmDecl {decl = DeclRecLets t, inexpr = inexpr} ->
    let edges =
      foldl
        (lam edges : Map Name (Set Name). lam bind : DeclLetRecord.
          _findCallEdges bind.ident g edges bind.body)
        edges t.bindings in
    _findCallEdges src g edges inexpr
  | t -> sfold_Expr_Expr (_findCallEdges src g) edges t
```
</ToggleWrapper>
</DocBlock>

