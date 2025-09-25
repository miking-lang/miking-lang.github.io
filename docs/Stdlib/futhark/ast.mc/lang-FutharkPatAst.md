import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkPatAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="FutPat" kind="syn">

```mc
syn FutPat
```



<ToggleWrapper text="Code..">
```mc
syn FutPat =
  | FPNamed { ident : PatName, ty : FutType, info : Info }
  | FPInt { val : Int, ty : FutType, info : Info }
  | FPBool { val : Bool, ty : FutType, info : Info }
  | FPRecord { bindings : Map SID FutPat, ty : FutType, info : Info }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoFutPat" kind="sem">

```mc
sem infoFutPat : FutharkPatAst_FutPat -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoFutPat =
  | FPNamed t -> t.info
  | FPInt t -> t.info
  | FPBool t -> t.info
  | FPRecord t -> t.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withInfoFutPat" kind="sem">

```mc
sem withInfoFutPat : Info -> FutharkPatAst_FutPat -> FutharkPatAst_FutPat
```



<ToggleWrapper text="Code..">
```mc
sem withInfoFutPat (info : Info) =
  | FPNamed t -> FPNamed {t with info = info}
  | FPInt t -> FPInt {t with info = info}
  | FPBool t -> FPBool {t with info = info}
  | FPRecord t -> FPRecord {t with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyFutPat" kind="sem">

```mc
sem tyFutPat : FutharkPatAst_FutPat -> FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
sem tyFutPat =
  | FPNamed t -> t.ty
  | FPInt t -> t.ty
  | FPBool t -> t.ty
  | FPRecord t -> t.ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withTypeFutPat" kind="sem">

```mc
sem withTypeFutPat : FutharkTypeAst_FutType -> FutharkPatAst_FutPat -> FutharkPatAst_FutPat
```



<ToggleWrapper text="Code..">
```mc
sem withTypeFutPat (ty : FutType) =
  | FPNamed t -> FPNamed {t with ty = ty}
  | FPInt t -> FPInt {t with ty = ty}
  | FPBool t -> FPBool {t with ty = ty}
  | FPRecord t -> FPRecord {t with ty = ty}
```
</ToggleWrapper>
</DocBlock>

