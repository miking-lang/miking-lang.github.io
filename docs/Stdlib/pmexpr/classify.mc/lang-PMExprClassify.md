import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprClassify  
  

  
  
  
## Types  
  

          <DocBlock title="ClassificationEnv" kind="type">

```mc
type ClassificationEnv : Map Name (Info, Class)
```



<ToggleWrapper text="Code..">
```mc
type ClassificationEnv = Map Name (Info, Class)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ClassificationResult" kind="type">

```mc
type ClassificationResult : Map Class (Map Name AccelerateData, Expr)
```



<ToggleWrapper text="Code..">
```mc
type ClassificationResult = Map Class (Map Name AccelerateData, Expr)
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="Class" kind="syn">

```mc
syn Class
```



<ToggleWrapper text="Code..">
```mc
syn Class =
  | Any ()
  | Cuda ()
  | Futhark ()
  | Invalid ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="cmpClass" kind="sem">

```mc
sem cmpClass : PMExprClassify_Class -> PMExprClassify_Class -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cmpClass lhs =
  | rhs -> subi (constructorTag lhs) (constructorTag rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lub" kind="sem">

```mc
sem lub : PMExprClassify_Class -> PMExprClassify_Class -> PMExprClassify_Class
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem lub lhs =
  | rhs -> lubH (lhs, rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lubH" kind="sem">

```mc
sem lubH : (PMExprClassify_Class, PMExprClassify_Class) -> PMExprClassify_Class
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem lubH =
  | (Any _, rhs) -> rhs
  | (lhs & !(Any _), Any _) -> lhs
  | (Cuda _, Cuda _) -> Cuda ()
  | (Futhark _, Futhark _) -> Futhark ()
  | _ -> Invalid ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="classify" kind="sem">

```mc
sem classify : Ast_Expr -> (Name, PMExprClassify_ClassificationEnv)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem classify =
  | e ->
    -- NOTE(larshum, 2022-06-02): We use an empty name as the name of the
    -- top-level expressions. It is returned with the classification map as its
    -- symbol must be known to distinguish it from sequencing expressions.
    let emptyNameId = nameSym "" in
    (emptyNameId, classifyH (mapEmpty nameCmp) emptyNameId e)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="classifyDecl" kind="sem">

```mc
sem classifyDecl : PMExprClassify_ClassificationEnv -> Name -> Ast_Decl -> PMExprClassify_ClassificationEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem classifyDecl env id =
  | DeclLet t -> classifyH env t.ident t.body
  | DeclRecLets t ->
    let bindMap : Map Name DeclLetRecord =
      mapFromSeq nameCmp
        (map (lam bind. (bind.ident, bind)) t.bindings) in
    let f : ClassificationEnv -> [Name] -> ClassificationEnv = lam env. lam binds.
      let bindingLub : Class -> Name -> Class = lam acc. lam bindId.
        match mapLookup bindId bindMap with Some binding then
          classifyBody env acc binding.body
        else errorSingle [t.info] "Classification of expression failed"
      in
      let lub = foldl bindingLub (Any ()) binds in
      foldl (lam env. lam bindId. mapInsert bindId (t.info, lub) env) env binds
    in
    -- NOTE(larshum, 2022-06-02): First, we assume all bindings are have been
    -- classified as 'Any'. Next, we classify them independently under this
    -- assumption. Finally, we propagate the classification results using the
    -- least upper bound of all classifications of each strongly connected
    -- component.
    let env =
      foldl
        (lam env. lam bind. mapInsert bind.ident (t.info, Any ()) env)
        env t.bindings in
    let env =
      foldl
        (lam env. lam bind. classifyH env bind.ident bind.body)
        env t.bindings in
    let g : Digraph Name Int = constructCallGraph (bind_ (DeclRecLets t) unit_) in
    let sccs = digraphTarjan g in
    foldl f env (reverse sccs)
  | DeclType _ | DeclConDef _ | DeclUtest _ | DeclExt _ -> env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="classifyH" kind="sem">

```mc
sem classifyH : PMExprClassify_ClassificationEnv -> Name -> Ast_Expr -> PMExprClassify_ClassificationEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem classifyH env id =
  | TmDecl x ->
    let env = classifyDecl env id x.decl in
    classifyH env id x.inexpr
  | e ->
    let class = classifyBody env (Any ()) e in
    mapInsert id (infoTm e, class) env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="classifyBody" kind="sem">

```mc
sem classifyBody : PMExprClassify_ClassificationEnv -> PMExprClassify_Class -> Ast_Expr -> PMExprClassify_Class
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem classifyBody env acc =
  | TmVar t ->
    match mapLookup t.ident env with Some (_, class) then
      lub acc class
    else acc
  | TmConst t -> lub acc (classifyConst t.val)
  | (TmLoop _ | TmLoopAcc _ | TmParallelLoop _ | TmPrintFloat _) & t ->
    sfold_Expr_Expr (classifyBody env) (lub acc (Cuda ())) t
  | ( TmFlatten _ | TmMap2 _ | TmParallelReduce _ | TmParallelSizeCoercion _
    | TmParallelSizeEquality _ ) & t ->
    sfold_Expr_Expr (classifyBody env) (lub acc (Futhark ())) t
  | e -> sfold_Expr_Expr (classifyBody env) acc e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="classifyConst" kind="sem">

```mc
sem classifyConst : ConstAst_Const -> PMExprClassify_Class
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem classifyConst =
  | CMap _ -> Futhark ()
  | _ -> Any ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="classifyAccelerated" kind="sem">

```mc
sem classifyAccelerated : Map Name PMExprExtractAccelerate_AccelerateData -> Ast_Expr -> PMExprClassify_ClassificationResult
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem classifyAccelerated accelerated =
  | ast ->
    match classify ast with (_, classification) in
    let classifiedAccelerateIds : Map Class (Map Name AccelerateData) =
      mapFoldWithKey
        (lam acc. lam id. lam entry.
          match entry with (info, class) in
          match mapLookup id accelerated with Some data then
            let cl =
              match class with Any _ then
                errorSingle [info]
                  (join [ "The accelerate expression does not use any "
                        , "parallel keywords. This is not allowed." ])
              else match class with Invalid _ then
                errorSingle [info]
                  (join [ "Accelerate expression uses parallel "
                        , "keywords of multiple backends" ])
              else class in
            let singleton = mapFromSeq nameCmp [(id, data)] in
            mapInsertWith mapUnion cl singleton acc
          else acc)
        (mapEmpty cmpClass) classification in
    mapMapWithKey
      (lam. lam data.
        let extractIds = mapMapWithKey (lam. lam. ()) data in
        (data, extractAccelerateTerms extractIds ast))
      classifiedAccelerateIds
```
</ToggleWrapper>
</DocBlock>

