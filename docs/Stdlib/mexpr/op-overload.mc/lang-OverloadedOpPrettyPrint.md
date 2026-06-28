import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OverloadedOpPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getOpStringCode" kind="sem">

```mc
sem getOpStringCode : Int -> PprintEnv -> OverloadedOpAst_Op -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getOpStringCode: Int -> PprintEnv -> Op -> (PprintEnv, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="opIsAtomic" kind="sem">

```mc
sem opIsAtomic : OverloadedOpAst_Op -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem opIsAtomic: Op -> Bool
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode indent env =
  | TmOverloadedOp x -> getOpStringCode indent env x.op
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | TmOverloadedOp x -> opIsAtomic x.op
```
</ToggleWrapper>
</DocBlock>

