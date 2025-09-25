import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CarriedSeq  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="CarriedType" kind="syn">

```mc
syn CarriedType
```



<ToggleWrapper text="Code..">
```mc
syn CarriedType =
  | SeqType CarriedType
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
  | SeqType ty -> tyseq_ (carriedRepr ty)
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
  | SeqType ty ->
    match carriedSMapAccumL f targetTy ty with Some mkNew then Some
      (lam accName. lam valName.
        let innerAcc = nameSym "acc" in
        let innerVal = nameSym "x" in
        appf3_
          (var_ "mapAccumL")
          (nulam_ innerAcc
            (nlam_ innerVal (carriedRepr ty)
              (mkNew innerAcc innerVal)))
          (nvar_ accName)
          (nvar_ valName)
      )
    else None ()
```
</ToggleWrapper>
</DocBlock>

