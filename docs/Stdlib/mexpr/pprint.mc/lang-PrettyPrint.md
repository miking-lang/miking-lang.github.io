import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : all a. a -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patPrecedence" kind="sem">

```mc
sem patPrecedence : all a. a -> Int
```

<Description>{`Intentionally left blank`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patPrecedence =
  | p -> 100000
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typePrecedence" kind="sem">

```mc
sem typePrecedence : all a. a -> Int
```



<ToggleWrapper text="Code..">
```mc
sem typePrecedence =
  | ty -> 100000
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : all a. Int -> PprintEnv -> a -> _a1
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode (indent : Int) (env: PprintEnv) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintDeclCode" kind="sem">

```mc
sem pprintDeclCode : Int -> PprintEnv -> Ast_Decl -> (PprintEnv, String)
```

<Description>{`Intentionally left blankNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintDeclCode indent env =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getPatStringCode" kind="sem">

```mc
sem getPatStringCode : all a. Int -> {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> a -> _a1
```

<Description>{`Intentionally left blank`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getPatStringCode (indent : Int) (env: PprintEnv) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : all a. Int -> PprintEnv -> a -> _a1
```

<Description>{`Intentionally left blank`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode (indent : Int) (env : PprintEnv) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getKindStringCode" kind="sem">

```mc
sem getKindStringCode : all a. Int -> {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> a -> _a1
```

<Description>{`Intentionally left blank`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getKindStringCode (indent : Int) (env : PprintEnv) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exprToString" kind="sem">

```mc
sem exprToString : all a. {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> a -> String
```



<ToggleWrapper text="Code..">
```mc
sem exprToString (env: PprintEnv) =
  | expr ->
    match pprintCode 0 env expr with (_,str) in str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="declToString" kind="sem">

```mc
sem declToString : {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> Ast_Decl -> String
```



<ToggleWrapper text="Code..">
```mc
sem declToString (env: PprintEnv) =
  | decl ->
    match pprintDeclCode 0 env decl with (_,str) in str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exprToStringKeywords" kind="sem">

```mc
sem exprToStringKeywords : all a. [String] -> a -> String
```



<ToggleWrapper text="Code..">
```mc
sem exprToStringKeywords (keywords: [String]) =
  | expr ->
    let addName = lam env. lam name.
      match pprintAddStr env name with Some env then env
      else error
        (join ["Duplicate keyword in exprToStringKeywords: ", nameGetStr name])
    in
    let env = foldl addName pprintEnvEmpty (map nameSym keywords) in
    exprToString env expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeToString" kind="sem">

```mc
sem typeToString : all a. {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> a -> String
```



<ToggleWrapper text="Code..">
```mc
sem typeToString (env: PprintEnv) =
  | ty ->
    match getTypeStringCode 0 env ty with (_,str) in str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="kindToString" kind="sem">

```mc
sem kindToString : all a. {count: Map String Int, nameMap: Map Name String, strings: Set String, optSingleLineLimit: Int, optCompactMatchElse: Bool, optSingleLineConstSeq: Bool, optCompactRecordUpdate: Bool} -> a -> _a1
```



<ToggleWrapper text="Code..">
```mc
sem kindToString env =
  | kind ->
    match getKindStringCode 0 env kind with (_, str) in str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="expr2str" kind="sem">

```mc
sem expr2str : all a. a -> String
```



<ToggleWrapper text="Code..">
```mc
sem expr2str =
  | expr -> exprToString pprintEnvEmpty expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="decl2str" kind="sem">

```mc
sem decl2str : Ast_Decl -> String
```



<ToggleWrapper text="Code..">
```mc
sem decl2str =
  | decl -> declToString pprintEnvEmpty decl
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="type2str" kind="sem">

```mc
sem type2str : all a. a -> String
```



<ToggleWrapper text="Code..">
```mc
sem type2str =
  | ty -> typeToString pprintEnvEmpty ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pat2str" kind="sem">

```mc
sem pat2str : all a. a -> String
```



<ToggleWrapper text="Code..">
```mc
sem pat2str =
  | pat -> (getPatStringCode 0 pprintEnvEmpty pat).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="kind2str" kind="sem">

```mc
sem kind2str : all a. a -> _a1
```



<ToggleWrapper text="Code..">
```mc
sem kind2str =
  | kind -> kindToString pprintEnvEmpty kind
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printParen" kind="sem">

```mc
sem printParen : all a. Int -> PprintEnv -> a -> (PprintEnv, String)
```

<Description>{`Helper function for printing parentheses`}</Description>


<ToggleWrapper text="Code..">
```mc
sem printParen (indent : Int) (env: PprintEnv) =
  | expr ->
    let i = if isAtomic expr then indent else addi 1 indent in
    match pprintCode i env expr with (env,str) in
    if isAtomic expr then (env,str)
    else (env,join ["(", str, ")"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printArgs" kind="sem">

```mc
sem printArgs : all a. Int -> PprintEnv -> [a] -> (PprintEnv, String)
```

<Description>{`Helper function for printing a list of arguments`}</Description>


<ToggleWrapper text="Code..">
```mc
sem printArgs (indent : Int) (env : PprintEnv) =
  | exprs ->
    match mapAccumL (printParen indent) env exprs with (env,args) in
    if lti (foldl addi 0 (map length args)) env.optSingleLineLimit then
      (env, strJoin " " args)
    else
      (env, strJoin (pprintNewline indent) args)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printPatParen" kind="sem">

```mc
sem printPatParen : all a. Int -> Int -> PprintEnv -> a -> (_a1, String)
```

<Description>{`Helper function for printing parentheses \(around patterns\)`}</Description>


<ToggleWrapper text="Code..">
```mc
sem printPatParen (indent : Int) (prec : Int) (env : PprintEnv) =
  | pat ->
    let i = if leqi prec (patPrecedence pat) then indent
            else addi 1 indent in
    match getPatStringCode i env pat with (env, str) in
    if leqi prec (patPrecedence pat) then (env, str)
    else (env, join ["(", str, ")"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printTypeParen" kind="sem">

```mc
sem printTypeParen : all a. Int -> Int -> PprintEnv -> a -> (_a1, String)
```

<Description>{`Helper function for printing parentheses \(around types\)`}</Description>


<ToggleWrapper text="Code..">
```mc
sem printTypeParen (indent : Int) (prec : Int) (env : PprintEnv) =
  | ty ->
    let i = if leqi prec (typePrecedence ty) then indent
            else addi 1 indent in
    match getTypeStringCode i env ty with (env, str) in
    if leqi prec (typePrecedence ty) then (env, str)
    else (env, join ["(", str, ")"])
```
</ToggleWrapper>
</DocBlock>

