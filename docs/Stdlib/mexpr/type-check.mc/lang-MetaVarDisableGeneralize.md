import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MetaVarDisableGeneralize  
  

  
  
  
## Semantics  
  

          <DocBlock title="weakenMetaVars" kind="sem">

```mc
sem weakenMetaVars : Level -> Ast_Type -> ()
```



<ToggleWrapper text="Code..">
```mc
sem weakenMetaVars (lvl : Level) =
  | TyMetaVar t & ty ->
    switch deref t.contents
    case Unbound r then
      sfold_Kind_Type (lam. lam ty. weakenMetaVars lvl ty) () r.kind;
      let kind = match r.kind with Poly _ then Mono () else r.kind in
      modref t.contents (Unbound {r with level = mini lvl r.level, kind = kind})
    case Link tyL then
      weakenMetaVars lvl tyL
    end
  | ty ->
    sfold_Type_Type (lam. lam ty. weakenMetaVars lvl ty) () ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="disableRecordGeneralize" kind="sem">

```mc
sem disableRecordGeneralize : Level -> Ast_Type -> ()
```



<ToggleWrapper text="Code..">
```mc
sem disableRecordGeneralize (lvl : Level) =
  | TyMetaVar t & ty ->
    switch deref t.contents
    case Unbound {kind = Record _} then
      weakenMetaVars lvl ty
    case Unbound _ then ()
    case Link tyL then
      disableRecordGeneralize lvl tyL
    end
  | ty ->
    sfold_Type_Type (lam. lam ty. disableRecordGeneralize lvl ty) () ty
```
</ToggleWrapper>
</DocBlock>

