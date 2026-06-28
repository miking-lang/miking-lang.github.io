import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordAst  
  

TmRecord and TmRecordUpdate \-\-

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmRecord {bindings : Map SID Expr,
              ty : Type,
              info : Info}
  | TmRecordUpdate {rec : Expr,
                    key : SID,
                    value : Expr,
                    ty : Type,
                    info : Info}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoTm" kind="sem">

```mc
sem infoTm : Ast_Expr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTm =
  | TmRecord r -> r.info
  | TmRecordUpdate r -> r.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyTm" kind="sem">

```mc
sem tyTm : Ast_Expr -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyTm =
  | TmRecord t -> t.ty
  | TmRecordUpdate t -> t.ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withInfo" kind="sem">

```mc
sem withInfo : Info -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withInfo info =
  | TmRecord t -> TmRecord {t with info = info}
  | TmRecordUpdate t -> TmRecordUpdate {t with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withType" kind="sem">

```mc
sem withType : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withType (ty : Type) =
  | TmRecord t -> TmRecord {t with ty = ty}
  | TmRecordUpdate t -> TmRecordUpdate {t with ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Expr_Expr" kind="sem">

```mc
sem smapAccumL_Expr_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Expr_Expr f acc =
  | TmRecord t ->
    match mapMapAccum (lam acc. lam. lam e. f acc e) acc t.bindings with (acc, bindings) then
      (acc, TmRecord {t with bindings = bindings})
    else never
  | TmRecordUpdate t ->
    match f acc t.rec with (acc, rec) then
      match f acc t.value with (acc, value) then
        (acc, TmRecordUpdate {{t with rec = rec} with value = value})
      else never
    else never
```
</ToggleWrapper>
</DocBlock>

