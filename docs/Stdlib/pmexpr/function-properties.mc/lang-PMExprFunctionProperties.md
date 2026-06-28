import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprFunctionProperties  
  

  
  
  
## Semantics  
  

          <DocBlock title="isAssociative" kind="sem">

```mc
sem isAssociative : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAssociative =
  | t -> isAssociativeH (setEmpty cmpExpr) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isAssociativeH" kind="sem">

```mc
sem isAssociativeH : Set Ast_Expr -> Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAssociativeH (assocFunctions : Set Expr) =
  | TmConst {val = CAddi _} -> true
  | TmConst {val = CMuli _} -> true
  | TmConst {val = CConcat _} -> true
  | t -> setMem t assocFunctions
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isCommutative" kind="sem">

```mc
sem isCommutative : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isCommutative =
  | t -> isCommutativeH (setEmpty cmpExpr) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isCommutativeH" kind="sem">

```mc
sem isCommutativeH : Set Ast_Expr -> Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isCommutativeH (commFunctions : Set Expr) =
  | TmConst {val = CAddi _} -> true
  | TmConst {val = CMuli _} -> true
  | t -> setMem t commFunctions
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getNeutralElement" kind="sem">

```mc
sem getNeutralElement : Ast_Expr -> Option Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem getNeutralElement =
  | t -> getNeutralElementH (mapEmpty cmpExpr) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getNeutralElementH" kind="sem">

```mc
sem getNeutralElementH : Map Ast_Expr Ast_Expr -> Ast_Expr -> Option Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem getNeutralElementH (neutralElementMap : Map Expr Expr) =
  | TmConst {val = CAddi _} ->
    Some (TmConst {val = CInt {val = 0}, ty = TyInt {info = NoInfo ()},
                   info = NoInfo ()})
  | TmConst {val = CMuli _} ->
    Some (TmConst {val = CInt {val = 1}, ty = TyInt {info = NoInfo ()},
                   info = NoInfo ()})
  | TmConst {val = CConcat _} ->
    Some (TmSeq {tms = [], ty = TySeq {ty = TyUnknown {info = NoInfo ()},
                                       info = NoInfo ()},
                 info = NoInfo ()})
  | t -> mapLookup t neutralElementMap
```
</ToggleWrapper>
</DocBlock>

