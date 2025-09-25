import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="eval" kind="sem">

```mc
sem eval : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem eval ctx =
  | TmRecord t ->
    let bs = mapMap (eval ctx) t.bindings in
    TmRecord {t with bindings = bs}
  | TmRecordUpdate u ->
    match eval ctx u.rec with TmRecord t then
      if mapMem u.key t.bindings then
        TmRecord
          {t with bindings = mapInsert u.key (eval ctx u.value) t.bindings}
      else errorSingle [u.info] "Key does not exist in record"
    else errorSingle [u.info] "Not updating a record"
```
</ToggleWrapper>
</DocBlock>

