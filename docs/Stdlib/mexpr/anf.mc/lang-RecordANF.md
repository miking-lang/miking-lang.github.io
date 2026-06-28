import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordANF  
  

Records and record updates can be seen as sequences of applications.

  
  
  
## Semantics  
  

          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  | TmRecord t ->
    mapMapK
      (lam e. lam k. normalizeName k e)
      t.bindings
      (lam bs. k (TmRecord {t with bindings = bs}))

  | TmRecordUpdate t ->
    normalizeName
      (lam vrec.
        normalizeName
          (lam vvalue.
            k (TmRecordUpdate {{t with rec = vrec}
                                  with value = vvalue}))
        t.value)
      t.rec
```
</ToggleWrapper>
</DocBlock>

