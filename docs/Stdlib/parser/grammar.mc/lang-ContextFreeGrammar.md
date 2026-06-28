import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ContextFreeGrammar  
  

TODO\(johnwikman, 2023\-05\-13\): Ast inclusion is temporary until polymorphism  
properly works in MLang. Remove this when polymorhpism works such that the  
type is available in the body, and generalize the Expr uses

  
  
  
## Types  
  

          <DocBlock title="Production" kind="type">

```mc
type Production : { nt: Name, terms: [Term], action: Expr }
```



<ToggleWrapper text="Code..">
```mc
type Production = {
    -- Name of the non-terminal associated with this rule
    nt: Name,
    -- The terms associated with this rule
    terms: [Term],
    -- The semantic action to take when reducing on this rule. This action
    -- expression has to be fully typed, with a type on the form
    --   tyState -> tyArg1 -> tyArg2 -> ... -> tyArgn -> tyRet
    -- where tyState is an arbitrary state type that has to be the same type
    -- for all actions in the syntax definition.
    action: Expr
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SyntaxDef" kind="type">

```mc
type SyntaxDef : { entrypoint: Name, productions: [Production], initActionState: Expr }
```



<ToggleWrapper text="Code..">
```mc
type SyntaxDef = {
    entrypoint: Name,
    productions: [Production],
    -- thing that generates the initial action state, i.e. let state = <Expr> in
    initActionState: Expr
  }
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="Term" kind="syn">

```mc
syn Term
```



<ToggleWrapper text="Code..">
```mc
syn Term =
  | Terminal TokenRepr
  | NonTerminal Name
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="cfgTerm2string" kind="sem">

```mc
sem cfgTerm2string : ContextFreeGrammar_Term -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfgTerm2string =
  | Terminal t -> tokReprToStr t
  | NonTerminal n -> join (["NT(", nameGetStr n, ")"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfgTermCmp2" kind="sem">

```mc
sem cfgTermCmp2 : (ContextFreeGrammar_Term, ContextFreeGrammar_Term) -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfgTermCmp2 =
  | (Terminal t1, Terminal t2) -> tokReprCmp t1 t2
  | (NonTerminal n1, NonTerminal n2) -> nameCmp n1 n2
  | (l, r) -> subi (constructorTag l) (constructorTag r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfgTermCmp" kind="sem">

```mc
sem cfgTermCmp : ContextFreeGrammar_Term -> ContextFreeGrammar_Term -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfgTermCmp other =
  | t -> cfgTermCmp2 (other, t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfgTermEq" kind="sem">

```mc
sem cfgTermEq : ContextFreeGrammar_Term -> ContextFreeGrammar_Term -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfgTermEq other =
  | t -> eqi (cfgTermCmp other t) 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfgCmp2" kind="sem">

```mc
sem cfgCmp2 : (ContextFreeGrammar_SyntaxDef, ContextFreeGrammar_SyntaxDef) -> Int
```

<Description>{`Comparison between two grammars. This ignores the order in which  
productions are specified, but is strict in the naming equivalence.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfgCmp2 =
  | (l, r) ->
    -- OPT(johnwikman, 2023-05-15): We could try to set up a bijection between
    -- names of non-terminals in both grammars, which would allow for semantic
    -- equivalence between the grammars instead of just considering a more
    -- structural one. But maybe this should be its own comparison function.
    let cEntrypoint = nameCmp l.entrypoint r.entrypoint in
    if neqi cEntrypoint 0 then cEntrypoint else --continue
    let cInitActionState = cmpExpr l.initActionState r.initActionState in
    if neqi cInitActionState 0 then cInitActionState else --continue

    let prodCmp: Production -> Production -> Int = lam lp. lam rp.
      let cNt = nameCmp lp.nt rp.nt in
      if neqi cNt 0 then cNt else --continue
      let cTerms = seqCmp cfgTermCmp lp.terms rp.terms in
      if neqi cTerms 0 then cTerms else --continue
      cmpExpr lp.action rp.action
    in
    let lprods = sort prodCmp l.productions in
    let rprods = sort prodCmp r.productions in
    seqCmp prodCmp lprods rprods
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfgCmp" kind="sem">

```mc
sem cfgCmp : ContextFreeGrammar_SyntaxDef -> ContextFreeGrammar_SyntaxDef -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfgCmp other =
  | syntaxDef -> cfgCmp2 (other, syntaxDef)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfgEq" kind="sem">

```mc
sem cfgEq : ContextFreeGrammar_SyntaxDef -> ContextFreeGrammar_SyntaxDef -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfgEq other =
  | syntaxDef -> eqi (cfgCmp other syntaxDef) 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfg2string" kind="sem">

```mc
sem cfg2string : ContextFreeGrammar_SyntaxDef -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfg2string =
  | syntaxDef ->
    let m = foldl (lam m: Map Name [Production]. lam prod: Production.
      mapInsertWith concat prod.nt [prod] m
    ) (mapEmpty nameCmp) syntaxDef.productions in

    let lines = mapFoldWithKey (lam lines. lam name. lam prods.
      -- separating newline
      let lines = if null lines then lines else snoc lines "" in
      -- <name> ::= TERMS
      --          | TERMS
      let firstLinePrefix = join [nameGetStr name, " ::= "] in
      let nextLinePrefix = join [make (subi (length firstLinePrefix) 2) ' ', "| "] in
      foldli (lam lines. lam i. lam prod.
        let prodStr = strJoin " " (map cfgTerm2string prod.terms) in
        let prefix = if eqi i 0 then firstLinePrefix else nextLinePrefix in
        snoc lines (concat prefix prodStr)
      ) lines prods
    ) [] m in
    strJoin "\n" lines
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfgComposeFirst" kind="sem">

```mc
sem cfgComposeFirst : Int -> Map ContextFreeGrammar_Term (Set [TokenReprBase_TokenRepr]) -> [ContextFreeGrammar_Term] -> Set [TokenReprBase_TokenRepr]
```

<Description>{`The ComposeFirst\_n\(FIRST\_k, a1...an\) function for any sequence of terms a1 to an  
  if seq = \[Y\_1\]:  
    \-\- take the FIRST\_n available  
    return \{\[t\_1,...,t\_n\] | \[t\_1,t\_2,t\_3,t\_4,...\] in FIRST\_k\(Y\_1\)\}  
  else if seq = \[Y\_1\] \+\+ rest:  
    ret \<\- \{\}  
    for \[t\_1,..t\_i\] in FIRST\_k\(Y\_1\):  
      if i \>= n:  
        ret \<\- ret U \{\[t\_1,...,t\_n\]\}  
      else:  
        for \[t\_\{i\+1\},...t\_j\] in ComposeFirst\(n \- i, rest\):  
          ret \<\- ret U \{\[t\_1,..t\_i,t\_\{i\+1\},...t\_j\]\}  
    return retNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfgComposeFirst n firstMap =
  | [y1] ->
    -- Return first n from the firstMap
    setFold (lam acc: Set [TokenRepr]. lam y1_tokens: [TokenRepr].
    setInsert (subsequence y1_tokens 0 n) acc
    ) (setEmpty (seqCmp tokReprCmp)) (mapLookupOrElse (lam. setEmpty (seqCmp tokReprCmp)) y1 firstMap)
  | [y1, y2] ++ rest ->
    setFold (lam acc: Set [TokenRepr]. lam y1_tokens: [TokenRepr].
    if geqi (length y1_tokens) n then
      setInsert (subsequence y1_tokens 0 n) acc
    else
      setFold (lam acc: Set [TokenRepr]. lam rest_tokens: [TokenRepr].
        setInsert (concat y1_tokens rest_tokens) acc
      ) acc (cfgComposeFirst (subi n (length y1_tokens)) firstMap (cons y2 rest))
    ) (setEmpty (seqCmp tokReprCmp)) (mapLookupOrElse (lam. setEmpty (seqCmp tokReprCmp)) y1 firstMap)
  | [] ->
    setInsert [] (setEmpty (seqCmp tokReprCmp))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfgFirstK" kind="sem">

```mc
sem cfgFirstK : Int -> ContextFreeGrammar_SyntaxDef -> Map ContextFreeGrammar_Term (Set [TokenReprBase_TokenRepr])
```

<Description>{`Constructs the FIRST\(k\) set for any syntax definitionNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfgFirstK k =
  | syntaxDef ->
    -- Compile a set of all terms in the syntax definition
    let allTerms: Set Term = foldl (lam acc: Set Term. lam production: Production.
      let acc = setInsert (NonTerminal production.nt) acc in
      foldl (lam acc: Set Term. lam term: Term. setInsert term acc) acc production.terms
    ) (setEmpty cfgTermCmp) syntaxDef.productions in

    -- Initialize FIRST_k:
    --   for all terminals t:
    --     FIRSK_k(t) = {[t]}
    --   for all non-terminals S:
    --     FIRST_k(S) = {}
    let firstK: Map Term (Set [TokenRepr]) = setFold (lam acc: Map Term (Set [TokenRepr]). lam term: Term.
      switch term
      case Terminal t then mapInsert term (setInsert [t] (setEmpty (seqCmp tokReprCmp))) acc
      case NonTerminal _ then mapInsert term (setEmpty (seqCmp tokReprCmp)) acc
      end
    ) (mapEmpty cfgTermCmp) allTerms in

    -- loop until convergence:
    --   for each production S -> Y_1 Y_2 ... Y_n do:
    --     if n = 0:
    --       FIRST_k(S) <- FIRST_k(S) U {[]}  -- empty production
    --     else if for all Y_i, FIRST_k(Y_i) != ø:
    --       FIRST_k(S) <- FIRST_k(S) U ComposeFirst_k(FIRST_k, [Y_1,Y_2,...,Y_n])
    recursive let iterate = lam firstMap: Map Term (Set [TokenRepr]).
      let resultMap = foldl (lam firstMap: Map Term (Set [TokenRepr]). lam production: Production.
        if eqi (length production.terms) 0 then
          mapInsertWith setUnion (NonTerminal production.nt) (setInsert [] (setEmpty (seqCmp tokReprCmp))) firstMap
        else if any (lam term: Term. setIsEmpty (mapLookupOrElse (lam. setEmpty (seqCmp tokReprCmp)) term firstMap)) production.terms then
          firstMap -- one of symbols for these productions lack an instance of firskK, skip this for now
        else
          mapInsertWith setUnion (NonTerminal production.nt) (cfgComposeFirst k firstMap production.terms) firstMap
      ) firstMap (syntaxDef.productions) in
      if mapEq setEq resultMap firstMap then
        resultMap
      else
        iterate resultMap
    in
    iterate firstK
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfgRemoveUnreachable" kind="sem">

```mc
sem cfgRemoveUnreachable : ContextFreeGrammar_SyntaxDef -> ContextFreeGrammar_SyntaxDef
```

<Description>{`Removes all productions that are unreachable from the entrypointNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfgRemoveUnreachable =
  | syntaxDef ->
    let ntToIdx : Map Name [Int] = foldli (lam m. lam i. lam prod: Production.
      mapInsertWith concat prod.nt [i] m
    ) (mapEmpty nameCmp) syntaxDef.productions in
    let visited : Set Name = setEmpty nameCmp in
    let visited = setInsert syntaxDef.entrypoint visited in
    let idxQueue = mapLookupOr [] syntaxDef.entrypoint ntToIdx in
    recursive let iterate = lam idxQueue. lam visited.
      match idxQueue with [idx] ++ idxQueue then
        let prod: Production = get syntaxDef.productions idx in
        match foldl (lam acc. lam term.
          match acc with (visited, idxQueue) in
          match term with NonTerminal nt then
            if not (setMem nt visited) then
              let visited = setInsert nt visited in
              let idxQueue = concat idxQueue (mapLookupOr [] nt ntToIdx) in
              (visited, idxQueue)
            else acc
          else acc
        ) (visited, idxQueue) prod.terms with (visited, idxQueue) in
        iterate idxQueue visited
      else
        visited
    in
    let visited = iterate idxQueue visited in
    {syntaxDef with productions = filter (lam prod. setMem prod.nt visited) syntaxDef.productions}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfgRemoveUnparsable" kind="sem">

```mc
sem cfgRemoveUnparsable : ContextFreeGrammar_SyntaxDef -> ContextFreeGrammar_SyntaxDef
```

<Description>{`A stronger version of cfgRemoveUnreachable. Also removes any productions  
that contain non\-terminals without any production.  
  
loop until convergence:  
  R \<\- reachable non\-terminals in Grammar G  
  G \<\- remove productions in G that references a non\-terminal not in RNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfgRemoveUnparsable =
  | syntaxDef ->
    recursive let convergenceLoop = lam syntaxDef: SyntaxDef.
      let ntToIdx : Map Name [Int] = foldli (lam m. lam i. lam prod: Production.
        mapInsertWith concat prod.nt [i] m
      ) (mapEmpty nameCmp) syntaxDef.productions in
      -- Step 1, identify all reachable productions
      let visited : Set Name = setEmpty nameCmp in
      let idxQueue = mapLookupOr [] syntaxDef.entrypoint ntToIdx in
      let queued = setInsert syntaxDef.entrypoint visited in
      recursive let iterate = lam idxQueue. lam queued. lam visited.
        match idxQueue with [idx] ++ idxQueue then
          let prod: Production = get syntaxDef.productions idx in
          let visited = setInsert prod.nt visited in
          match foldl (lam acc. lam term.
            match acc with (queued, idxQueue) in
            match term with NonTerminal nt then
              if not (setMem nt queued) then
                let idxQueue = concat idxQueue (mapLookupOr [] nt ntToIdx) in
                (queued, idxQueue)
              else acc
            else acc
          ) (queued, idxQueue) prod.terms with (queued, idxQueue) in
          iterate idxQueue queued visited
        else
          visited
      in
      let visited = iterate idxQueue queued visited in
      -- Step 2, strip any production with references to unseen non-terminals
      let visitedTerm = lam t: Term. match t with NonTerminal nt then setMem nt visited else true in
      match foldl (lam acc. lam prod.
        match acc with (modified, newProductions) in
        if and (setMem prod.nt visited) (forAll visitedTerm prod.terms) then
          (modified, snoc newProductions prod)
        else
          (true, newProductions) -- modified, removed production
      ) (false, []) syntaxDef.productions with (modified, newProductions) in
      if modified then
        convergenceLoop {syntaxDef with productions = newProductions}
      else
        syntaxDef
    in
    convergenceLoop syntaxDef
```
</ToggleWrapper>
</DocBlock>

