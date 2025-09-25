import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlMatchGenerate  
  

NOTE\(larshum, 2022\-12\-21\): This language fragment defines the compilation of  
match\-expressions, for different kinds of patterns. We assume pattern  
lowering has been applied on the provided AST, which guarantees absence of  
AND, OR, and NOT patterns as well as nested patterns.

  
  
  
## Semantics  
  

          <DocBlock title="getPatName" kind="sem">

```mc
sem getPatName : PatName -> Option Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getPatName =
  | PWildcard _ -> None ()
  | PName id -> Some id
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getPatNamedId" kind="sem">

```mc
sem getPatNamedId : Ast_Pat -> Option Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getPatNamedId =
  | PatNamed {ident = id} -> getPatName id
  | p ->
    errorSingle [infoPat p] "Nested pattern found in OCaml code generation"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bindPat" kind="sem">

```mc
sem bindPat : Ast_Expr -> Ast_Expr -> Ast_Pat -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem bindPat acc target =
  | p ->
    match getPatNamedId p with Some patId then
      bind_ (nulet_ patId target) acc
    else acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectNestedMatches" kind="sem">

```mc
sem collectNestedMatches : all acc. GenerateEnv -> (Ast_Pat -> Bool) -> acc -> (acc -> MatchRecord -> acc) -> MatchRecord -> (acc, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectNestedMatches env isNestedPat acc addMatchCase =
  | t ->
    let t : MatchRecord = t in
    -- We assume that the target is a variable because otherwise there is no
    -- easy way to determine that the expressions are the same, as we don't
    -- have access to the outer scope where variables have been defined.
    let eqTarget =
      match t.target with TmVar {ident = ident} then
        lam t.
          match t with TmVar {ident = id} then
            nameEq ident id
          else false
      else never
    in
    recursive let collectMatchTerms = lam acc. lam t : MatchRecord.
      if eqTarget t.target then
        if isNestedPat t.pat then
          let acc = addMatchCase acc t in
          match t.els with TmMatch tm then
            collectMatchTerms acc tm
          else (acc, t.els)
        else (acc, TmMatch t)
      else (acc, TmMatch t)
    in
    collectMatchTerms acc t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectNestedMatchesByConstructor" kind="sem">

```mc
sem collectNestedMatchesByConstructor : GenerateEnv -> {ty: Ast_Type, els: Ast_Expr, pat: Ast_Pat, thn: Ast_Expr, info: Info, target: Ast_Expr} -> (Map Name [(Ast_Pat, Ast_Expr)], Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem collectNestedMatchesByConstructor (env : GenerateEnv) =
  | t ->
    collectNestedMatches env
      (lam pat. match pat with PatCon _ then true else false)
      (mapEmpty nameCmp)
      (lam acc. lam t : MatchRecord.
         match t.pat with PatCon pc then
           match mapLookup pc.ident acc with Some pats then
             let pats = cons (pc.subpat, t.thn) pats in
             mapInsert pc.ident pats acc
           else
             mapInsert pc.ident [(pc.subpat, t.thn)] acc
         else never) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateMatchBaseCase" kind="sem">

```mc
sem generateMatchBaseCase : GenerateEnv -> Ast_Expr -> Ast_Expr
```

<Description>{`NOTE\(larshum, 2022\-12\-21\): Defines the base case code generation of the  
match\-expression. This includes the default approach for translating  
patterns to OCaml.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateMatchBaseCase env =
  | TmMatch (t & {pat = PatNamed {ident = PWildcard _}}) -> generate env t.thn
  | TmMatch (t & {pat = PatNamed {ident = PName id}}) ->
    bind_
      (nulet_ id (generate env t.target))
      (generate env t.thn)
  | TmMatch (t & {pat = PatBool {val = val}}) ->
    let thn = generate env t.thn in
    let els = generate env t.els in
    _if (objMagic (generate env t.target))
      (if val then thn else els)
      (if val then els else thn)
  | TmMatch (t & {pat = PatInt {val = val}}) ->
    _if (eqi_ (objMagic (generate env t.target)) (int_ val))
      (generate env t.thn) (generate env t.els)
  | TmMatch (t & {pat = PatChar {val = val}}) ->
    _if (eqc_ (objMagic (generate env t.target)) (char_ val))
      (generate env t.thn) (generate env t.els)
  | TmMatch (t & {pat = PatSeqTot {pats = pats}}) ->
    let n = length pats in
    let targetId = nameSym "_target" in
    -- Bind the variables in the sequence pattern before evaluating the then
    -- branch expression, in case the branch is taken.
    let thn =
      foldl
        (lam acc. lam pi.
          match pi with (pat, idx) in
          bindPat acc (get_ (nvar_ targetId) (int_ idx)) pat)
        (generate env t.thn) (mapi (lam i. lam p. (p, i)) pats) in
    let cond =
      let target = nvar_ targetId in
      if eqi n 0 then null_ target
      else eqi_ (length_ target) (int_ n)
    in
    bind_
      (nulet_ targetId (objMagic (generate env t.target)))
      (_if cond thn (generate env t.els))
  | TmMatch (t & {pat = PatSeqEdge {prefix = prefix, middle = middle, postfix = postfix}}) ->
    let n1 = length prefix in
    let n2 = length postfix in
    let targetId = nameSym "_target" in
    let lenId = nameSym "n" in
    let cond = _isLengthAtLeast (nvar_ targetId) (addi_ (int_ n1) (int_ n2)) in
    -- NOTE(larshum, 2022-12-20): Add a binding for each of the non-wildcard
    -- patterns in the sequence pattern, starting with the postfix and prefix,
    -- followed by the middle.
    let prefixIndexedPats = mapi (lam i. lam p. (p, int_ i)) prefix in
    let postfixIndexedPats =
      mapi
        (lam i. lam p. (p, subi_ (nvar_ lenId) (int_ (addi i 1))))
        (reverse postfix) in
    let thn =
      let thn = generate env t.thn in
      let thn =
        foldl
          (lam acc. lam pi.
            match pi with (pat, idx) in
            bindPat acc (get_ (nvar_ targetId) idx) pat)
          thn (concat postfixIndexedPats prefixIndexedPats) in
      match middle with PName id then
        let midExpr =
          subsequence_ (nvar_ targetId) (int_ n1)
            (subi_ (nvar_ lenId) (addi_ (int_ n1) (int_ n2)))
        in
        bind_ (nulet_ id midExpr) thn
      else thn
    in
    bindall_ [
      nulet_ targetId (objMagic (generate env t.target)),
      nulet_ lenId (length_ (nvar_ targetId))]
      (_if cond thn (generate env t.els))
  | TmMatch (t & {pat = PatRecord {bindings = bindings, ty = ty}}) ->
    if mapIsEmpty bindings then
      generate env t.thn
    else
      match env with {records = records, constrs = constrs} in
      let targetTy = unwrapType ty in
      match lookupRecordFields targetTy constrs with Some fields then
        let fieldTypes = ocamlTypedFields fields in
        match mapLookup fieldTypes records with Some name then
          let recPat = OPatRecord {bindings = bindings} in
          let conPat = OPatCon {ident = name, args = [recPat]} in
          OTmMatch {
            target = objMagic (generate env t.target),
            arms = [(conPat, generate env t.thn)]}
        else
          let msg = join [
            "The OCaml code generation failed due to a bug in the ",
            "type-lifting.\nThe match pattern refers to a record type that ",
            "was not included in the type-lifting."] in
          errorSingle [t.info] msg
      else
        let msg = join [
          "Pattern refers to an unknown record type.\n",
          "The type must be known in the OCaml code generation."] in
        errorSingle [t.info] msg
  | TmMatch (t & {pat = PatCon {ident = ident, subpat = subpat}}) ->
    match env with {constrs = constrs} in
    match mapLookup ident constrs with Some innerTy then
      let containsRecord = match innerTy with TyRecord _ then true else false in
      let targetId = nameSym "_target" in
      -- NOTE(larshum, 2022-12-20): We make use of inline records in
      -- constructors when compiling to OCaml. In this case, we cannot access
      -- them directly, so we access them via the constructor directly.
      let ocamlSubpat =
        let patName =
          match innerTy with TyRecord {fields = fields} then
            if mapIsEmpty fields then None ()
            else Some (PWildcard ())
          else
            match getPatNamedId subpat with Some id then Some (PName id)
            else Some (PWildcard ())
        in
        optionMap
          (lam p. PatNamed {ident = p, info = infoPat subpat, ty = tyPat subpat})
          patName
      in
      let thn =
        let thn = generate env t.thn in
        if containsRecord then
          match getPatNamedId subpat with Some id then
            bind_ (nulet_ id (nvar_ targetId)) thn
          else thn
        else thn
      in
      let conPat =
        let args =
          match ocamlSubpat with Some pat then [pat]
          else []
        in
        OPatCon {ident = ident, args = args}
      in
      bind_
        (nulet_ targetId (objMagic (generate env t.target)))
        (OTmMatch {target = nvar_ targetId,
                   arms = [ (conPat, thn)
                          , (pvarw_, objMagic (generate env t.els)) ]})
    else
      let msg = join [
        "Match pattern refers to unknown type constructor ",
        nameGetStr ident] in
      errorSingle [t.info] msg
  | TmMatch {pat = PatAnd _ | PatOr _ | PatNot _, info = info} ->
    errorSingle [info] "Regular patterns are not supported by OCaml backend"
  | TmMatch t ->
    errorSingle [t.info] "Match expression is not supported by OCaml backend"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generate" kind="sem">

```mc
sem generate : GenerateEnv -> Ast_Expr -> Ast_Expr
```

<Description>{`NOTE\(larshum, 2022\-12\-21\): We define special\-case treatment for patterns  
that can be compiled to more readable and/or more efficient OCaml code  
than in the default case.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generate (env : GenerateEnv) =
  | TmMatch ({pat = PatInt _, target = TmVar _} & t) ->
    match
      collectNestedMatches env
        (lam pat. match pat with PatInt _ then true else false) []
        (lam acc. lam t : MatchRecord. snoc acc (t.pat, generate env t.thn)) t
    with (arms, defaultCase) in
		_omatch_ (objMagic (generate env t.target))
			(snoc arms (pvarw_, generate env defaultCase))
  | TmMatch ({pat = PatChar {val = c}, target = TmVar _} & t) ->
    match
      collectNestedMatches env
        (lam pat. match pat with PatChar _ then true else false) []
        (lam acc. lam t : MatchRecord.
          match t.pat with PatChar pc then
            let pat =
              PatInt {val = char2int pc.val, info = pc.info, ty = pc.ty}
            in snoc acc (pat, generate env t.thn)
          else
            error "Invalid pattern in generate!") t
    with (arms, defaultCase) in
		_omatch_ (objMagic (generate env t.target))
			(snoc arms (pvarw_, generate env defaultCase))
  | TmMatch (t & {pat = PatSeqEdge {prefix = [head], middle = tail, postfix = []}}) ->
    -- Applies special-case handling for matching on the head and tail of a
    -- sequence, as this can be compiled more efficiently (in particular, for
    -- lists).
    let targetId = nameSym "_target" in
    let headBind = optionMap
      (lam id. nulet_ id (head_ (nvar_ targetId)))
      (getPatNamedId head) in
    let tailBind = optionMap
      (lam id. nulet_ id (tail_ (nvar_ targetId)))
      (getPatName tail) in
    let thn = bindall_ (filterOption [headBind, tailBind]) (generate env t.thn) in
    bind_
      (nulet_ targetId (objMagic (generate env t.target)))
      (_if (null_ (nvar_ targetId)) (generate env t.els) thn)
  | TmMatch ({target = TmVar _, pat = PatCon pc, els = TmMatch em} & t) ->
    match collectNestedMatchesByConstructor env t with (arms, defaultCase) in
		-- Assign the term of the final else-branch to a variable so that we
		-- don't introduce unnecessary code duplication (the default case could
		-- be large).
		let defaultCaseName = nameSym "defaultCase" in
		let defaultCaseVal = ulam_ "" (generate env defaultCase) in
		let defaultCaseLet = nulet_ defaultCaseName defaultCaseVal in

		let toNestedMatch = lam target : Expr. lam patExpr : [(Pat, Expr)].
			assocSeqFold
				(lam acc. lam pat. lam thn. match_ target pat thn acc)
				(app_ (nvar_ defaultCaseName) uunit_)
				patExpr
		in
		let f = lam arm : (Name, [(Pat, Expr)]).
			match mapLookup arm.0 env.constrs with Some argTy then
				let patVarName = nameSym "x" in
				let target =
					match argTy with TyRecord _ then t.target
					else nvar_ patVarName
				in
				let isUnit = match argTy with TyRecord {fields = fields} then
					mapIsEmpty fields else false in
				let pat = if isUnit
					then OPatCon {ident = arm.0, args = []}-- TODO(vipa, 2021-05-12): this will break if there actually is an inner pattern that wants to look at the unit
					else OPatCon {ident = arm.0, args = [npvar_ patVarName]} in
				let innerPatternTerm = toNestedMatch (withType argTy (objMagic target)) arm.1 in
				(pat, generate env innerPatternTerm)
			else
				let msg = join [
					"Unknown constructor referenced in nested match expression: ",
					nameGetStr arm.0
				] in
				errorSingle [t.info] msg
		in
		let flattenedMatch =
			_omatch_ (objMagic (generate env t.target))
				(snoc
						(map f (mapBindings arms))
						(pvarw_, (app_ (nvar_ defaultCaseName) uunit_)))
		in bind_ defaultCaseLet flattenedMatch
  | TmMatch t -> generateMatchBaseCase env (TmMatch t)
```
</ToggleWrapper>
</DocBlock>

