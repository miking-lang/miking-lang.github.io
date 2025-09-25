import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprFindSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="findNamesOfStrings" kind="sem">

```mc
sem findNamesOfStrings : [String] -> Ast_Expr -> [Option Name]
```

<Description>{`Finds the names corresponding to a provided sequence of strings in a given  
AST. If 'id' is the first bound name matching a provided string, then  
'Some id' is the result corresponding to that input string. If no name is  
found for a provided string, 'None' is the corresponding result for that  
string.  
  
The function assumes the provided sequence of strings are distinct.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findNamesOfStrings strs =
  | t ->
    let result : Map Int Name =
      findNamesOfStringsExpr
        (mapFromSeq cmpString (mapi (lam i. lam x. (x, i)) strs))
        (mapEmpty subi) t in
    create (length strs) (lam i. mapLookup i result)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findNamesOfStringsExn" kind="sem">

```mc
sem findNamesOfStringsExn : [String] -> Ast_Expr -> [Name]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findNamesOfStringsExn strs =
  | t ->
    let r = findNamesOfStrings strs t in
    map (lam n. match n with Some n then n else error (join ["Couldn't find name"])) r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findName" kind="sem">

```mc
sem findName : String -> Ast_Expr -> Option Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findName str =
  | t ->
    match findNamesOfStrings [str] t with [Some id] then
      Some id
    else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findNamesOfStringsExpr" kind="sem">

```mc
sem findNamesOfStringsExpr : Map String Int -> Map Int Name -> Ast_Expr -> Map Int Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findNamesOfStringsExpr strs acc =
  | TmDecl (x & {decl = DeclLet t}) ->
    let acc = checkIdentifier strs acc t.ident in
    let acc = findNamesOfStringsExpr strs acc t.body in
    findNamesOfStringsExpr strs acc x.inexpr
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let findNamesBinding = lam acc. lam binding.
      checkIdentifier strs acc binding.ident
    in
    let findNamesBindingBody = lam acc. lam binding.
      findNamesOfStringsExpr strs acc binding.body
    in
    let acc = foldl findNamesBinding acc t.bindings in
    let acc = foldl findNamesBindingBody acc t.bindings in
    findNamesOfStringsExpr strs acc x.inexpr
  | TmDecl (x & {decl
    = DeclType {ident = ident, tyIdent = tyIdent}
    | DeclConDef {ident = ident, tyIdent = tyIdent}
    | DeclExt {ident = ident, tyIdent = tyIdent}
    }) ->
    let acc = checkIdentifier strs acc ident in
    let acc = findNamesOfStringsType strs acc tyIdent in
    findNamesOfStringsExpr strs acc x.inexpr
  | t -> sfold_Expr_Expr (findNamesOfStringsExpr strs) acc t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findNamesOfStringsType" kind="sem">

```mc
sem findNamesOfStringsType : Map String Int -> Map Int Name -> Ast_Type -> Map Int Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findNamesOfStringsType strs acc =
  | TyCon {ident = ident} | TyVar {ident = ident} ->
    checkIdentifier strs acc ident
  | ty -> sfold_Type_Type (findNamesOfStringsType strs) acc ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="checkIdentifier" kind="sem">

```mc
sem checkIdentifier : Map String Int -> Map Int Name -> Name -> Map Int Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem checkIdentifier strs acc =
  | id ->
    match mapLookup (nameGetStr id) strs with Some index then
      if mapMem index acc then acc
      else mapInsert index id acc
    else acc
```
</ToggleWrapper>
</DocBlock>

