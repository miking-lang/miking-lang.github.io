import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordProjectionSyntaxSugarPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="isTupleLabel" kind="sem">

```mc
sem isTupleLabel : SID -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isTupleLabel =| label -> forAll isDigit (sidToString label)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchIsProj" kind="sem">

```mc
sem matchIsProj : Map SID Ast_Pat -> Name -> Option SID
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchIsProj bindings =| exprName ->
    let binds = mapBindings bindings in
    match binds with [(fieldLabel, PatNamed {ident = PName patName})]
    then
      if nameEq patName exprName then Some fieldLabel else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isTupleProj" kind="sem">

```mc
sem isTupleProj : Ast_Expr -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isTupleProj =
  | TmMatch
    { pat = PatRecord {bindings = bindings}
    , thn = TmVar {ident = exprName}
    , els = TmNever _
    }
    ->
    optionMapOr false isTupleLabel (matchIsProj bindings exprName)
  | _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | TmMatch
    { pat = PatRecord {bindings = bindings}
    , thn = TmVar {ident = exprName}
    , els = TmNever _
    }
    -> optionIsSome (matchIsProj bindings exprName)
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
  | TmMatch (t & {els = TmNever _}) -> pprintTmMatchIn indent env t
  | TmMatch (t &
    { pat = PatRecord {bindings = bindings}
    , thn = TmVar {ident = exprName}
    , els = TmNever _
    , target = expr
    })
    ->
    match matchIsProj bindings exprName with Some fieldLabel then
      -- NOTE(oerikss, 2023-05-29): nested tuple projections are parsed as
      -- floats if we do not group them.
      if and (isTupleLabel fieldLabel) (isTupleProj expr) then
        match pprintCode indent env expr with (env, expr) in
        (env, join ["(", expr, ").", pprintProjString fieldLabel])
      else
        match printParen indent env expr with (env, expr) in
        (env, join [expr, ".", pprintProjString fieldLabel])
    else pprintTmMatchIn indent env t
```
</ToggleWrapper>
</DocBlock>

