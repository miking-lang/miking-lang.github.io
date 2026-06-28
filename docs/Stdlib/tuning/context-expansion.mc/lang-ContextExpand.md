import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ContextExpand  
  

Fragment for transforming a program with holes.

  
  
  
## Semantics  
  

          <DocBlock title="contextExpand" kind="sem">

```mc
sem contextExpand : all a. CallCtxEnv -> Ast_Expr -> ({table: [Ast_Expr], cleanup: a -> (), tempDir: String, tempFile: String}, Ast_Expr)
```

<Description>{`'contextExpand public t' eliminates all holes in the expression 't' and and  
 replace them by lookups in a static table.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem contextExpand (env : CallCtxEnv) =
  | t ->
    let lookup = _lookupFromInt env (lam i.
      tensorGetExn_ tyint_ (nvar_ contextExpansionTableName) (seq_ [int_ i]))
    in
    let ast = _contextExpandWithLookup env lookup t in
    let tempDir = sysTempDirMake () in
    let tuneFile = sysJoinPath tempDir ".tune" in
    let ast = _wrapReadFile env tuneFile ast in
    ( { table = _initAssignments env
      , tempDir = tempDir
      , tempFile = tuneFile
      , cleanup = lam. sysTempDirDelete tempDir (); ()
      }, ast )
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="insert" kind="sem">

```mc
sem insert : CallCtxEnv -> LookupTable -> Ast_Expr -> Ast_Expr
```

<Description>{`'insert public table t' replaces the holes in expression 't' by the values  
in 'table'`}</Description>


<ToggleWrapper text="Code..">
```mc
sem insert (env : CallCtxEnv) (table : LookupTable) =
  | t ->
    _contextExpandWithLookup env (_lookupFromInt env (lam i. get table i)) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_lookupFromInt" kind="sem">

```mc
sem _lookupFromInt : CallCtxEnv -> (Int -> Ast_Expr) -> Int -> Ast_Expr
```

<Description>{`Converts the ith table entry from an integer to the type of the hole`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _lookupFromInt (env: CallCtxEnv) (lookup: Int -> Expr) =
  | i ->
    fromInt (get env.idx2hole i) (lookup i)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_contextExpandWithLookup" kind="sem">

```mc
sem _contextExpandWithLookup : CallCtxEnv -> (Int -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem _contextExpandWithLookup (env : CallCtxEnv) (lookup : Int -> Expr) =
  -- Hole: lookup the value depending on call history.
  | TmDecl (x & {decl = DeclLet ({ body = TmHole { depth = depth }, ident = ident} & t)}) ->
    let lookupGlobal = lam info.
      lookup (callCtxHole2Idx (ident, info) [] env)
    in
    let body =
      if eqi depth 0 then lookupGlobal t.info
      else
        let funDefined = callCtxHole2Fun (ident, t.info) env in
        if nameInfoEq funDefined callGraphTop then
          -- Context-sensitive hole on top-level: handle as a global hole
          lookupGlobal t.info
        else match callCtxFunLookup funDefined.0 env with Some iv then
          let tree = mapFindExn (ident, t.info) env.contexts in
          let res = contextExpansionLookupCallCtx lookup tree iv env in
          res
        else
          -- Context-sensitive hole without any incoming calls
          lookupGlobal t.info
    in TmDecl { x with decl = DeclLet {t with body = body}
              , inexpr = _contextExpandWithLookup env lookup x.inexpr}

  | tm ->
    smap_Expr_Expr (_contextExpandWithLookup env lookup) tm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_initAssignments" kind="sem">

```mc
sem _initAssignments : CallCtxEnv -> [Ast_Expr]
```

<Description>{`Find the initial mapping from holes to values`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _initAssignments =
  | env ->
    let env : CallCtxEnv = env in
    map (lam h. default h) env.idx2hole
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_wrapReadFile" kind="sem">

```mc
sem _wrapReadFile : CallCtxEnv -> String -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem _wrapReadFile (env : CallCtxEnv) (tuneFile : String) =
  | tm ->
    use BootParser in
    let impl = parseMExprStringKeywordsExn [] "
    let eqSeq = lam eq. lam s1. lam s2.
      recursive let work = lam s1. lam s2.
        match (s1, s2) with ([h1] ++ t1, [h2] ++ t2) then
          if eq h1 h2 then work t1 t2
          else false
        else true
      in
      let n1 = length s1 in
      let n2 = length s2 in
      let ndiff = subi n1 n2 in
      if eqi ndiff 0 then work s1 s2
      else false
    in

    let eqString = eqSeq eqc in

    let join = lam seqs. foldl concat [] seqs in

    let eqStringSlice = lam s1. lam s2. lam o2. lam n2.
      recursive let work = lam i.
        if eqi i n2 then true
        else if eqc (get s1 i) (get s2 (addi o2 i)) then work (addi i 1)
        else false
      in
      if eqi (length s1) n2 then
      work 0
      else false
    in

    -- Splits s on delim
    let strSplit = lam delim. lam s.
      let n = length s in
      let m = length delim in
      recursive let work = lam acc. lam lastMatch. lam i.
        if lti (subi n m) i then
          snoc acc (subsequence s lastMatch n)
        else if eqStringSlice delim s i m then
          let nexti = addi i m in
          work (snoc acc (subsequence s lastMatch (subi i lastMatch))) nexti nexti
        else
          work acc lastMatch (addi i 1)
      in
      if null delim then [s]
      else work [] 0 0
    in

    recursive let any = lam p. lam seq.
      if null seq
      then false
      else if p (head seq) then true else any p (tail seq)
    in

    let isWhitespace = lam c. any (eqc c) [' ', '\n', '\t', '\r'] in

    let strTrim = lam s.
      recursive
      let strTrim_init = lam s.
        if null s then s
        else if isWhitespace (head s)
        then strTrim_init (tail s)
        else s
      in reverse (strTrim_init (reverse (strTrim_init s)))
    in

    let string2int = lam s.
      recursive
      let string2int_rechelper = lam s.
        let len = length s in
        let last = subi len 1 in
        if eqi len 0
        then 0
        else
          let lsd = subi (char2int (get s last)) (char2int '0') in
          let rest = muli 10 (string2int_rechelper (subsequence s 0 last)) in
          addi rest lsd
      in
      match s with [] then 0 else
      if eqc '-' (head s)
      then negi (string2int_rechelper (tail s))
      else string2int_rechelper s
    in

    let seq2Tensor = lam seq.
      let t = tensorCreateDense [length seq] (lam is. get seq (get is 0)) in
      t
    in

    ()
    " in

    use MExprSym in
    let impl = symbolize impl in
    let implDecls =
      recursive let work = lam acc. lam tm. match tm with TmDecl x
        then work (snoc acc x.decl) x.inexpr
        else acc in
      work [] impl in

    let getName : String -> Expr -> Name = lam s. lam expr.
      use MExprFindSym in
      match findName s expr with Some n then n
      else error (concat "not found: " s) in

    let string2intName = getName "string2int" impl in
    let strSplitName = getName "strSplit" impl in
    let strTrimName = getName "strTrim" impl in
    let seq2TensorName = getName "seq2Tensor" impl in

    let fileContent = nameSym "fileContent" in
    let strVals = nameSym "strVals" in
    let i = nameSym "i" in
    let p = nameSym "p" in
    let nbr = nameSym "n" in
    bindall_
      (concat implDecls
      -- Parse tune file
      [ nulet_ fileContent (readFile_ (str_ tuneFile))
      , nulet_ strVals (appf2_ (nvar_ strSplitName) (str_ "\n")
          (app_ (nvar_ strTrimName) (nvar_ fileContent)))
      , nulet_ nbr (app_ (nvar_ string2intName) (head_ (nvar_ strVals)))
      , nulet_ strVals (subsequence_ (nvar_ strVals) (int_ 1) (nvar_ nbr))
      , let x = nameSym "x" in
        nulet_ strVals (map_ (nulam_ x
          (get_ (appf2_ (nvar_ strSplitName) (str_ ": ") (nvar_ x)) (int_ 1)))
          (nvar_ strVals))
      -- Convert strings into values
      , nulet_ contextExpansionTableName (map_ (nvar_ string2intName) (nvar_ strVals))
      -- Convert table into a tensor (for constant-time lookups)
      , nulet_ contextExpansionTableName (app_ (nvar_ seq2TensorName) (nvar_ contextExpansionTableName))
      ])
      tm
```
</ToggleWrapper>
</DocBlock>

