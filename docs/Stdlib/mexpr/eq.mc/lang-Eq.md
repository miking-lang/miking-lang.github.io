import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Eq  
  

Convenience fragment containing the function eqExpr. Should be included in  
all fragments below.

  
  
  
## Semantics  
  

          <DocBlock title="eqConst" kind="sem">

```mc
sem eqConst : all a. ConstAst_Const -> a -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem eqConst (lhs : Const) =
  | rhs /- : Const -/ -> eqConstH (lhs, rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqConstH" kind="sem">

```mc
sem eqConstH : all a. (ConstAst_Const, a) -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem eqConstH =
  -- Default case for constants that contain no data
  | (lhs, rhs) /- (Const, Const) -/ ->
    eqi (constructorTag lhs) (constructorTag rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqType" kind="sem">

```mc
sem eqType : all a. Ast_Type -> a -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem eqType (lhs : Type) =
  | rhs ->
    let emptyEnv = {tyVarEnv = biEmpty} in
    let emptyFree = {freeTyVars = biEmpty, freeTyFlex = biEmpty} in
    match eqTypeH emptyEnv emptyFree lhs rhs with Some _ then true else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqTypeH" kind="sem">

```mc
sem eqTypeH : all a. all a1. all a2. all a3. all a4. {tyVarEnv: [a]} -> {freeTyFlex: [a1], freeTyVars: [a2]} -> Ast_Type -> a3 -> Option a4
```

<Description>{`eqTypeH env free ty1 ty2 compares ty1 and ty2, returning  
\+ None \(\) if ty1 and ty2 are not alpha equivalent, and  
\+ Some free' if ty1 and ty2 are alpha equivalent, where free' is an  
  updated bijection between free variables.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eqTypeH (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) (lhs : Type) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqKind" kind="sem">

```mc
sem eqKind : EqTypeEnv -> EqTypeFreeEnv -> _a -> Option EqTypeFreeEnv
```



<ToggleWrapper text="Code..">
```mc
sem eqKind (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) =
  | (lhs, rhs) ->
    if eqi (constructorTag lhs) (constructorTag rhs) then Some free
    else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqExpr" kind="sem">

```mc
sem eqExpr : all a. Ast_Expr -> a -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem eqExpr (e1: Expr) =
  | e2 ->
    let empty = {varEnv = biEmpty, conEnv = biEmpty} in
    match eqExprH empty empty e1 e2 with Some _ then true else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : all a. all a1. all a2. all a3. all a4. all a5. {conEnv: [a], varEnv: [a1]} -> {conEnv: [a2], varEnv: [a3]} -> Ast_Expr -> a4 -> Option a5
```

<Description>{`eqExprH env free lhs rhs compares lhs and rhs, returning  
\+ None \(\) if lhs and rhs are not alpha equivalent, and  
\+ Some free' if lhs and rhs are alpha equivalent, where free' is an  
  updated bijection between free variables.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqDecl" kind="sem">

```mc
sem eqDecl : Ast_Decl -> Ast_Decl -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem eqDecl (d1: Decl) =
  | d2 ->
    let empty = {varEnv = biEmpty, conEnv = biEmpty} in
    match eqDeclH empty empty d1 d2 with Some _ then true else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqDeclH" kind="sem">

```mc
sem eqDeclH : EqEnv -> EqEnv -> Ast_Decl -> Ast_Decl -> Option (EqEnv, EqEnv)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eqDeclH env free lhs =
```
</ToggleWrapper>
</DocBlock>

