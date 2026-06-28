import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VariantNameTypeAst  
  

This type is added specifically for the type lifting to allow distinguishing  
between variant types in the type environment before their constructors have  
been added.

  
  
  
## Syntaxes  
  

          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
  | TyVariantName {ident : Name,
                   info : Info}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="tyWithInfo" kind="sem">

```mc
sem tyWithInfo : Info -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyWithInfo (info : Info) =
  | TyVariantName t -> TyVariantName {t with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoTy" kind="sem">

```mc
sem infoTy : Ast_Type -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTy =
  | TyVariantName r -> r.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqTypeH" kind="sem">

```mc
sem eqTypeH : {tyVarEnv: [(Name, Name)]} -> {freeTyFlex: [(Name, Name)], freeTyVars: [(Name, Name)]} -> Ast_Type -> Ast_Type -> Option EqTypeFreeEnv
```



<ToggleWrapper text="Code..">
```mc
sem eqTypeH (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) (lhs : Type) =
  | TyVariantName {ident = rid} ->
    match lhs with TyVariantName {ident = lid} then
      if nameEq lid rid then Some free else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

