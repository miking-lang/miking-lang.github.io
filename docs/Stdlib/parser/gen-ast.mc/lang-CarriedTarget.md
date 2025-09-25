import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CarriedTarget  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="CarriedType" kind="syn">

```mc
syn CarriedType
```



<ToggleWrapper text="Code..">
```mc
syn CarriedType =
  | TargetType {targetable : Bool, ty : Type}
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
sem carriedRepr =
  | TargetType {ty = ty} -> ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="carriedSMapAccumL" kind="sem">

```mc
sem carriedSMapAccumL : (Ast_Expr -> Ast_Expr -> Ast_Expr) -> Ast_Type -> CarriedTypeBase_CarriedType -> Option (Name -> Name -> Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem carriedSMapAccumL f targetTy =
  | TargetType {targetable = false} -> None ()
  | TargetType {targetable = true, ty = ty} ->
    if eqType ty targetTy
    then Some (lam accName. lam valName. f (nvar_ accName) (nvar_ valName))
    else None ()
```
</ToggleWrapper>
</DocBlock>

