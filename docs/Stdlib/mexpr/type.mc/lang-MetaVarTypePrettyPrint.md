import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MetaVarTypePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="typePrecedence" kind="sem">

```mc
sem typePrecedence : Ast_Type -> Int
```



<ToggleWrapper text="Code..">
```mc
sem typePrecedence =
  | TyMetaVar t ->
    switch deref t.contents
    case Unbound _ then
      100000
    case Link ty then
      typePrecedence ty
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode (indent : Int) (env : PprintEnv) =
  | TyMetaVar t ->
    switch deref t.contents
    case Unbound t then
      match pprintVarName env t.ident with (env, idstr) in
      (env, cons '_' idstr)
    case Link ty then
      getTypeStringCode indent env ty
    end
```
</ToggleWrapper>
</DocBlock>

