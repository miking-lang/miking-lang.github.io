import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LangDeclPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintDeclSequenceCode" kind="sem">

```mc
sem pprintDeclSequenceCode : Int -> PprintEnv -> [Ast_Decl] -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintDeclSequenceCode (indent : Int) (env : PprintEnv) =
  | decls ->
    let declFoldResult = foldl (lam acc. lam decl.
      match acc with (env, accDecls) in
      match pprintDeclCode indent env decl with (env, declString) in
      (env, snoc accDecls declString)
    ) (env, []) decls in
    match declFoldResult with (env, declStrings) in
    (env, strJoin (pprintNewline indent) declStrings)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode (indent : Int) (env : PprintEnv) =
  | DeclLang t ->
    match pprintLangName env t.ident with (env, langNameStr) in
    match
      mapAccumL pprintLangName env t.includes
    with (env, inclStrs) in
    match pprintDeclSequenceCode (pprintIncr indent) env t.decls
    with (env, declSeqStr) in
    let inclEqStr =
      if eqi (length inclStrs) 0 then
        ""
      else
        let nl = pprintNewline (pprintIncr indent) in
        concat (concat " =" nl)
               (strJoin (concat nl "+ ") inclStrs)
    in
    let langContents =
      if eqString declSeqStr "" then ""
      else join [pprintNewline (pprintIncr indent), declSeqStr]
    in
    (env, join ["lang ", langNameStr, inclEqStr, langContents,
                pprintNewline indent, "end"])
```
</ToggleWrapper>
</DocBlock>

