import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GetKind  
  

  
  
  
## Semantics  
  

          <DocBlock title="getKind" kind="sem">

```mc
sem getKind : TCEnv -> Ast_Type -> Ast_Kind
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getKind env =
  | TyVar {ident = n} ->
    optionMapOr (Poly ()) (lam x. x.1) (mapLookup n env.tyVarEnv)
  | TyMetaVar t ->
    match deref t.contents with Unbound r then r.kind
    else error "Non-unwrapped TyMetaVar in getKind!"
  | TyRecord r -> Record { fields = r.fields }
  | TyData r -> Data { types =
                         mapMap (lam cons. {lower = cons, upper = Some (setEmpty nameCmp)})
                                (computeData r) }
  | _ -> Poly ()
```
</ToggleWrapper>
</DocBlock>

