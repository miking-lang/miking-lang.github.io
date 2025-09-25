import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Cmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpExpr" kind="sem">

```mc
sem cmpExpr : Ast_Expr -> Ast_Expr -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpExpr (lhs: Expr) =
  | rhs /- : Expr -/ -> cmpExprH (lhs, rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpExprH" kind="sem">

```mc
sem cmpExprH : (Ast_Expr, Ast_Expr) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpExprH =
  -- Default case when expressions are not the same
  | (lhs, rhs) /- (Expr, Expr) -/ ->
    let res = subi (constructorTag lhs) (constructorTag rhs) in
    if eqi res 0 then
      errorMulti [(infoTm lhs, ""), (infoTm rhs, "")]
        "Missing case in cmpExprH for expressions with equal indices."
    else res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpDecl" kind="sem">

```mc
sem cmpDecl : Ast_Decl -> Ast_Decl -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpDecl (lhs : Decl) =
  | rhs -> cmpDeclH (lhs, rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpDeclH" kind="sem">

```mc
sem cmpDeclH : (Ast_Decl, Ast_Decl) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpDeclH =
  | (lhs, rhs) ->
    let res = subi (constructorTag lhs) (constructorTag rhs) in
    if eqi res 0 then
      errorMulti [(infoDecl lhs, ""), (infoDecl rhs, "")]
        "Missing case in cmpDeclH for declarations with equal indices."
    else res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpConst" kind="sem">

```mc
sem cmpConst : all a. ConstAst_Const -> a -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpConst (lhs: Const) =
  | rhs /- : Const -/ -> cmpConstH (lhs, rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpConstH" kind="sem">

```mc
sem cmpConstH : all a. (ConstAst_Const, a) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpConstH =
  -- Default case for constants that contain no data
  | (lhs, rhs) /- (Const, Const) -/ ->
    subi (constructorTag lhs) (constructorTag rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpPat" kind="sem">

```mc
sem cmpPat : Ast_Pat -> Ast_Pat -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpPat (lhs: Pat) =
  | rhs /- : Pat -/ -> cmpPatH (lhs, rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpPatH" kind="sem">

```mc
sem cmpPatH : (Ast_Pat, Ast_Pat) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpPatH =
  -- Default case when patterns are not the same
  | (lhs, rhs) /- (Pat, Pat) -/ ->
    let res = subi (constructorTag lhs) (constructorTag rhs) in
    if eqi res 0 then
      errorMulti [(infoPat lhs, ""), (infoPat rhs, "")]
        "Missing case in cmpPatH for patterns with equal indices."
    else res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpType" kind="sem">

```mc
sem cmpType : Ast_Type -> Ast_Type -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpType (lhs: Type) =
  | rhs /- : Type -/ -> cmpTypeH (unwrapType lhs, unwrapType rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpTypeH" kind="sem">

```mc
sem cmpTypeH : (Ast_Type, Ast_Type) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpTypeH =
  -- Default case when types are not the same
  | (lhs, rhs) /- (Type, Type) -/ ->
    let res = subi (constructorTag lhs) (constructorTag rhs) in
    if eqi res 0 then
      use MExprPrettyPrint in
      errorMulti [(infoTy lhs, (type2str lhs)), (infoTy rhs, (type2str rhs))]
        "Missing case in cmpTypeH for types with equal indices."
    else res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpKind" kind="sem">

```mc
sem cmpKind : _a -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpKind =
  -- Default case when kinds are not the same
  | (lhs, rhs) /- (Kind, Kind) -/ ->
    let res = subi (constructorTag lhs) (constructorTag rhs) in
    if eqi res 0 then
      errorSingle []
        "Missing case in cmpKind for types with equal indices."
    else res
```
</ToggleWrapper>
</DocBlock>

