import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CarriedTypeBase  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="CarriedType" kind="syn">

```mc
syn CarriedType
```



<ToggleWrapper text="Code..">
```mc
syn CarriedType =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="carriedRepr" kind="sem">

```mc
sem carriedRepr : CarriedTypeBase_CarriedType -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem carriedRepr : CarriedType -> Type
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="carriedSMapAccumL" kind="sem">

```mc
sem carriedSMapAccumL : (Ast_Expr -> Ast_Expr -> Ast_Expr) -> Ast_Type -> CarriedTypeBase_CarriedType -> Option (Name -> Name -> Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem carriedSMapAccumL : (Expr -> Expr -> Expr) -> Type -> CarriedType -> Option (Name -> Name -> Expr)
```
</ToggleWrapper>
</DocBlock>

