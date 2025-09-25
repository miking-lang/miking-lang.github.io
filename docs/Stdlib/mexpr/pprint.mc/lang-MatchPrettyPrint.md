import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | TmMatch _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getPatStringCode" kind="sem">

```mc
sem getPatStringCode : Int -> {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> Ast_Pat -> _a
```



<ToggleWrapper text="Code..">
```mc
sem getPatStringCode (indent : Int) (env: PprintEnv) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode (indent : Int) (env: PprintEnv) =
  | TmMatch t -> pprintTmMatchNormally indent env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintTmMatchBegin" kind="sem">

```mc
sem pprintTmMatchBegin : Int -> PprintEnv -> {ty: Ast_Type, els: Ast_Expr, pat: Ast_Pat, thn: Ast_Expr, info: Info, target: Ast_Expr} -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintTmMatchBegin (indent : Int) (env: PprintEnv) =
  | t ->
    let i = indent in
    let ii = pprintIncr indent in
    match pprintCode ii env t.target with (env,target) in
    match getPatStringCode ii env t.pat with (env,pat) in
    (env,join ["match", pprintNewline ii, target, pprintNewline i,
               "with", pprintNewline ii, pat, pprintNewline i])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintTmMatchNormally" kind="sem">

```mc
sem pprintTmMatchNormally : Int -> PprintEnv -> {ty: Ast_Type, els: Ast_Expr, pat: Ast_Pat, thn: Ast_Expr, info: Info, target: Ast_Expr} -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintTmMatchNormally (indent : Int) (env: PprintEnv) =
  | t ->
    let i = indent in
    let ii = pprintIncr indent in
    match (match (env.optCompactMatchElse, t.els) with (true, TmMatch _)
           then (i, " ") else (ii, pprintNewline ii))
      with (elseIndent, elseSpacing) in
    match pprintTmMatchBegin i env t with (env,begin) in
    match pprintCode ii env t.thn with (env,thn) in
    match pprintCode elseIndent env t.els with (env,els) in
    (env,join [begin,
               "then", pprintNewline ii, thn, pprintNewline i,
               "else", elseSpacing, els])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintTmMatchIn" kind="sem">

```mc
sem pprintTmMatchIn : Int -> PprintEnv -> {ty: Ast_Type, els: Ast_Expr, pat: Ast_Pat, thn: Ast_Expr, info: Info, target: Ast_Expr} -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintTmMatchIn (indent : Int) (env: PprintEnv) =
  | t ->
    let i = indent in
    let ii = pprintIncr indent in
    match pprintTmMatchBegin i env t with (env,begin) in
    match pprintCode ii env t.thn with (env,thn) in
    (env,join [begin, "in", pprintNewline i, thn])
```
</ToggleWrapper>
</DocBlock>

