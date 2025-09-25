import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# HoleCallGraph  
  

Construct a call graph from an AST. The nodes are named functions, and the  
edges are calls to named functions. Complexity O\(|V|\*|F|\), as we visit each  
node exactly once and each time potentially perform a graph union operation,  
which we assume has complexity O\(|F|\). V is the set of nodes in the AST and F  
is the set of nodes in the call graph \(i.e. set of functions in the AST\).

  
  
  
## Semantics  
  

          <DocBlock title="toCallGraph" kind="sem">

```mc
sem toCallGraph : Ast_Expr -> Digraph NameInfo (Name, Info)
```



<ToggleWrapper text="Code..">
```mc
sem toCallGraph =
  | arg ->
    let gempty = digraphAddVertex callGraphTop
      (digraphEmpty nameInfoCmp nameInfoEq) in
    let g = digraphAddVertices (_findVertices [] arg) gempty in
    let infoMap = mapFromSeq nameCmp (digraphVertices g) in
    let edges = _findEdges g callGraphTop infoMap [] arg in
    digraphAddEdges edges g
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_findVertices" kind="sem">

```mc
sem _findVertices : [NameInfo] -> Ast_Expr -> [(Name, Info)]
```



<ToggleWrapper text="Code..">
```mc
sem _findVertices (vertices: [NameInfo]) =
  | TmDecl (x & {decl = DeclLet t}) ->
    concat
      (_handleLetVertex _findVertices
        {ident = t.ident, body = t.body, info = t.info})
      (_findVertices vertices x.inexpr)

  | TmDecl (x & {decl = DeclRecLets t}) ->
    let res =
      foldl (lam acc. lam b : DeclLetRecord.
               concat acc
                 (_handleLetVertex _findVertices
                   {ident = b.ident, body = b.body, info = b.info}))
            [] t.bindings
    in concat res (_findVertices vertices x.inexpr)

  | tm ->
--    sfold_Expr_Expr concat [] (smap_Expr_Expr _findVertices tm)
    sfold_Expr_Expr _findVertices vertices tm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_findEdges" kind="sem">

```mc
sem _findEdges : Digraph (Name, Info) NameInfo -> NameInfo -> Map Name Info -> [(NameInfo, NameInfo, NameInfo)] -> Ast_Expr -> [(NameInfo, (Name, Info), (Name, Info))]
```



<ToggleWrapper text="Code..">
```mc
sem _findEdges (cg : CallGraph) (prev : NameInfo) (name2info : Map Name Info)
                 (edges : [(NameInfo, NameInfo, NameInfo)]) =
  | TmDecl (x & {decl = DeclLet ({body = TmApp a} & t)}) ->
    let resBody = _handleApps (t.ident, t.info) _findEdges prev cg name2info t.body in
    concat resBody (_findEdges cg prev name2info edges x.inexpr)

  | TmDecl (x & {decl = DeclLet ({body = TmLam lm} & t)}) ->
    let resBody = _findEdges cg (t.ident, t.info) name2info edges lm.body in
    concat resBody (_findEdges cg prev name2info [] x.inexpr)

  | TmDecl (x & {decl = DeclRecLets t}) ->
    let res =
      let handleBinding = lam g. lam b : DeclLetRecord.
        match b with { body = TmLam { body = lambody }, ident = ident, info = info } then
          _findEdges g (ident, info) name2info [] lambody
        else
          _findEdges g prev name2info [] b.body
      in foldl (lam acc. lam b. concat acc (handleBinding cg b)) [] t.bindings
    in concat res (_findEdges cg prev name2info edges x.inexpr)

  | tm ->
    sfold_Expr_Expr (_findEdges cg prev name2info) edges tm
```
</ToggleWrapper>
</DocBlock>

