import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IntTypeAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
  | TyInt {info : Info}
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
  | TyInt t -> TyInt {t with info = info}
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
  | TyInt r -> r.info
```
</ToggleWrapper>
</DocBlock>

