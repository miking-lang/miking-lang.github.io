import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# _testOverloadedOp  
  

A test language fragment. This fragment can be used as a template to create  
overloaded operators.

  
  
  
## Syntaxes  
  

          <DocBlock title="Op" kind="syn">

```mc
syn Op
```



<ToggleWrapper text="Code..">
```mc
syn Op =
  | OAdd
  | ONeg
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="opMkTypes" kind="sem">

```mc
sem opMkTypes : Info -> TCEnv -> OverloadedOpAst_Op -> {params: [Ast_Type], return: Ast_Type}
```



<ToggleWrapper text="Code..">
```mc
sem opMkTypes info env =
  | OAdd _ ->
    let ty = newmonovar env.currentLvl info in
    {params = [ty, ty], return = ty}
  | ONeg _ ->
    let ty = newmonovar env.currentLvl info in
    {params = [ty], return = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="resolveOp" kind="sem">

```mc
sem resolveOp : Info -> {op: OverloadedOpAst_Op, params: [Ast_Type], return: Ast_Type} -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem resolveOp info =
  | x & {op = OAdd _, params = [TyInt _] ++ _}   -> mkConst info (CAddi ())
  | x & {op = OAdd _, params = [TyFloat _] ++ _} -> mkConst info (CAddf ())

  | x & {op = ONeg _, params = [TyInt _] ++ _}   -> mkConst info (CNegi ())
  | x & {op = ONeg _, params = [TyFloat _] ++ _} -> mkConst info (CNegf ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getOpStringCode" kind="sem">

```mc
sem getOpStringCode : Int -> PprintEnv -> OverloadedOpAst_Op -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getOpStringCode indent env =
  | OAdd _ -> (env, "+")
  | ONeg _ -> (env, "-")
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="opIsAtomic" kind="sem">

```mc
sem opIsAtomic : OverloadedOpAst_Op -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem opIsAtomic =
  | (OAdd _) | (ONeg _) -> true
```
</ToggleWrapper>
</DocBlock>

