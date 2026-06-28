import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataCPS  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprCps" kind="sem">

```mc
sem exprCps : CPSEnv -> Option Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprCps env k =
  | TmDecl (x & {decl = DeclLet { body = TmConApp _ }}) ->
    TmDecl {x with inexpr = exprCps env k x.inexpr}
  | TmDecl (x & {decl = DeclConDef t}) ->
    TmDecl {x with inexpr = exprCps env k x.inexpr}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exprTyCps" kind="sem">

```mc
sem exprTyCps : CPSEnv -> Ast_Expr -> Ast_Expr
```

<Description>{`We do not transform the top\-level arrow type of the condef \(due to  
the nested smap\_Type\_Type\), as data values are constructed as usual even  
in CPS.  
NOTE\(dlunde,2022\-07\-13\): We currently ignore TyAll wrapping the top\-level  
arrow type.  
NOTE\(dlunde,2022\-07\-13\): Issues can arise here if the top\-level arrow type  
of a condef is a type variable that was defined earlier with TmType. It is  
then CPS transformed.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem exprTyCps env =
  | TmDecl {decl = DeclConDef t} & e ->
    recursive let rec = lam ty.
      match ty with TyAll b then TyAll { b with ty = rec b.ty }
      else match ty with TyArrow _ & t then smap_Type_Type (tyCps env) t
      else errorSingle [t.info]
        "Error in CPS: Problem with TmConDef in exprTyCps"
    in smap_Expr_Type rec e
```
</ToggleWrapper>
</DocBlock>

