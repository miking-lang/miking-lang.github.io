import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UnknownTypeAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
  | TyUnknown {info : Info}
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
sem tyWithInfo info =
  | TyUnknown t -> TyUnknown {t with info = info}
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
  | TyUnknown r -> r.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sremoveUnknown" kind="sem">

```mc
sem sremoveUnknown : Ast_Type -> Option Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem sremoveUnknown =
  | TyUnknown _ -> None ()
  | ty -> Some ty
```
</ToggleWrapper>
</DocBlock>

