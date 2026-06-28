import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprPromote  
  

  
  
  
## Semantics  
  

          <DocBlock title="getInnerFunction" kind="sem">

```mc
sem getInnerFunction : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem getInnerFunction =
  | TmLam t -> getInnerFunction t.body
  | TmApp t -> getInnerFunction t.lhs
  | tm & TmDecl {decl = DeclLet t, inexpr = TmVar {ident = id}} ->
    if nameEq t.ident id then
      getInnerFunction t.body
    else tm
  | t -> t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argumentsHaveSameType" kind="sem">

```mc
sem argumentsHaveSameType : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem argumentsHaveSameType =
  | f ->
    match tyTm f with TyArrow {from = a, to = TyArrow {from = b}} then
      eqType a b
    else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="promote" kind="sem">

```mc
sem promote : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem promote =
  | app & (TmApp {lhs = TmApp {lhs = TmApp {lhs = TmConst {val = CFoldl ()},
                                            rhs = f},
                               rhs = ne},
                  rhs = s}) ->
    -- NOTE(larshum, 2021-12-09): We can only parallelise the expression if
    -- both arguments passed to the function f have the same type. When they do
    -- not, the function cannot be flattening nor can it be associative.
    if argumentsHaveSameType f then
      let fBody = getInnerFunction f in

      -- NOTE(larshum, 2021-11-19): A fold using concat is not well-formed in
      -- PMExpr as the sizes are part of a sequence type there. However, since it
      -- is such a common pattern, we translate it to a well-formed flattening
      -- operation.
      match fBody with TmConst {val = CConcat ()} then
        TmFlatten {e = s, ty = tyTm app, info = infoTm app}
      else if isAssociative fBody then
        match getNeutralElement fBody with Some fNeutralElement then
          let fNeutralElement = withInfo (infoTm ne) fNeutralElement in
          if eqExpr ne fNeutralElement then
            TmParallelReduce {f = f, ne = ne, as = s, ty = tyTm app,
                              info = infoTm app}
          else
            -- NOTE(larshum, 2021-11-24): If the initial accumulator value is not
            -- the neutral element, we apply the function on this value and the
            -- result of a parallel reduce using the neutral element.
            TmApp {
              lhs = TmApp {
                lhs = f, rhs = ne,
                ty = TyArrow {from = tyTm ne, to = tyTm app,
                              info = infoTm app},
                info = infoTm app},
              rhs = TmParallelReduce {f = f, ne = fNeutralElement, as = s,
                                      ty = tyTm app, info = infoTm app},
              ty = tyTm app,
              info = infoTm app}
        else app
      else app
    else app
  | t -> smap_Expr_Expr promote t
```
</ToggleWrapper>
</DocBlock>

