import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprUtestSizeConstraint  
  

  
  
  
## Semantics  
  

          <DocBlock title="findDimension" kind="sem">

```mc
sem findDimension : Map Name Ast_Type -> Int -> Ast_Expr -> Option (Name, Int)
```

<Description>{`Attempts to find the dimension of a sequence to which a length expression  
refers. By using \`head s\` one can refer to inner dimensions of a sequence.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findDimension (params : Map Name Type) (dim : Int) =
  | TmVar {ident = id} -> if mapMem id params then Some (id, dim) else None ()
  | TmApp {lhs = TmConst {val = CHead _}, rhs = s} ->
    findDimension params (addi dim 1) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="replaceUtestsWithSizeConstraintH" kind="sem">

```mc
sem replaceUtestsWithSizeConstraintH : Map Name Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem replaceUtestsWithSizeConstraintH (params : Map Name Type) =
  | TmDecl (x & {decl = DeclUtest t}) ->
    let generateSizeEquality = lam s1 : Expr. lam s2 : Expr.
      match findDimension params 1 s1 with Some (x1, d1) then
        match findDimension params 1 s2 with Some (x2, d2) then
          let ty = tyWithInfo t.info tyunit_ in
          let inexpr = replaceUtestsWithSizeConstraintH params x.inexpr in
          let eq = TmParallelSizeEquality {x1 = x1, d1 = d1, x2 = x2, d2 = d2,
                                           ty = ty, info = t.info} in
          Some (TmDecl {decl = DeclLet {ident = nameNoSym "", tyAnnot = ty, tyBody = ty, body = eq,
                       info = t.info}, inexpr = inexpr, ty = x.ty, info = x.info})
        else None ()
      else None () in
    let generateSizeCoercion = lam s : Expr. lam id : Name. lam sizeId : Name.
      let inexpr = replaceUtestsWithSizeConstraintH params x.inexpr in
      let coercion =
        TmParallelSizeCoercion {e = s, size = sizeId,
                                ty = tyTm s, info = infoTm s} in
      TmDecl {decl = DeclLet {ident = id, tyAnnot = tyTm s, tyBody = tyTm s, body = coercion,
             info = t.info}, inexpr = inexpr, ty = x.ty, info = x.info} in
    let result =
      match t.tusing with None _ | Some (TmConst {val = CEqi _}) then
        let p = (t.test, t.expected) in
        match p with (TmApp {lhs = TmConst {val = CLength _}, rhs = s1},
                      TmApp {lhs = TmConst {val = CLength _}, rhs = s2}) then
          generateSizeEquality s1 s2
        else match p with (TmApp {lhs = TmConst {val = CLength _},
                             rhs = s & (TmVar {ident = id})},
                      TmVar {ident = expectedId}) then
          Some (generateSizeCoercion s id expectedId)
        else match p with (TmVar {ident = testId},
                           TmApp {lhs = TmConst {val = CLength _},
                                  rhs = s & (TmVar {ident = id})}) then
          Some (generateSizeCoercion s id testId)
        else None ()
      else None () in
    match result with Some e then e
    else replaceUtestsWithSizeConstraintH params x.inexpr
  | t -> smap_Expr_Expr (replaceUtestsWithSizeConstraintH params) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="replaceUtestsWithSizeConstraint" kind="sem">

```mc
sem replaceUtestsWithSizeConstraint : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem replaceUtestsWithSizeConstraint =
  | TmLam t ->
    recursive let extractLambdas = lam acc : Map Name Type. lam e : Expr.
      match e with TmLam t then
        let acc = mapInsert t.ident t.tyParam acc in
        extractLambdas acc t.body
      else (acc, e) in
    recursive let replaceFunctionBody = lam body : Expr. lam e : Expr.
      match e with TmLam t then
        TmLam {t with body = replaceFunctionBody body t.body}
      else body in
    match extractLambdas (mapEmpty nameCmp) (TmLam t) with (params, body) in
    let newBody = replaceUtestsWithSizeConstraintH params body in
    replaceFunctionBody newBody (TmLam t)
  | TmDecl (x & {decl = DeclUtest _}) -> replaceUtestsWithSizeConstraint x.inexpr
  | t -> smap_Expr_Expr replaceUtestsWithSizeConstraint t
```
</ToggleWrapper>
</DocBlock>

