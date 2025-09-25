import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OpVarAst  
  

  
  
  
## Types  
  

          <DocBlock title="TmOpVarRec" kind="type">

```mc
type TmOpVarRec : { ident: Name, ty: Type, info: Info, frozen: Bool, scaling: OpCost }
```



<ToggleWrapper text="Code..">
```mc
type TmOpVarRec = {ident : Name, ty : Type, info : Info, frozen : Bool, scaling : OpCost}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmOpVar TmOpVarRec
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="tyTm" kind="sem">

```mc
sem tyTm : Ast_Expr -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyTm =
  | TmOpVar x -> x.ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withType" kind="sem">

```mc
sem withType : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withType ty =
  | TmOpVar x -> TmOpVar {x with ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoTm" kind="sem">

```mc
sem infoTm : Ast_Expr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTm =
  | TmOpVar x -> x.info
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
  | TmOpVar x -> TmOpVar {x with info = info}
```
</ToggleWrapper>
</DocBlock>

