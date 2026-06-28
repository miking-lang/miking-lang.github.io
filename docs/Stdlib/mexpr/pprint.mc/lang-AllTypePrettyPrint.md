import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AllTypePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="typePrecedence" kind="sem">

```mc
sem typePrecedence : Ast_Type -> Int
```



<ToggleWrapper text="Code..">
```mc
sem typePrecedence =
  | TyAll _ -> 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : all a. Int -> PprintEnv -> Ast_Type -> (a, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode (indent : Int) (env: PprintEnv) =
  | TyAll t ->
    match pprintVarName env t.ident with (env, idstr) in
    match
      match t.kind with Mono () | Poly () then (env, "") else
        match getKindStringCode indent env t.kind with (env, kistr) in
        (env, concat "::" kistr)
    with (env, kistr) in
    match getTypeStringCode indent env t.ty with (env, tystr) in
    (env, join ["all ", idstr, kistr, ". ", tystr])
```
</ToggleWrapper>
</DocBlock>

