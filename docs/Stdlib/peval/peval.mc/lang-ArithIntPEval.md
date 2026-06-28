import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ArithIntPEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (c & (CAddi _ | CMuli _), args & [!TmConst _, TmConst _]) ->
    -- NOTE(oerikss, 2022-02-15): We move constants to the lhs for associative
    -- operators to make later simplifications easier.
    delta info (c, reverse args)
  | (c & CAddi _, args & [TmConst {val = CInt x}, y & TmVar _]) ->
    if eqi x.val 0 then y
    else
      let b = astBuilder info in
      b.appSeq (b.uconst c) args
  | (c & CAddi _, [x & TmVar r1, y & TmVar r2]) ->
    let b = astBuilder info in
    if nameEqSymUnsafe r1.ident r2.ident then b.muli (b.int 2) y
    else b.appSeq (b.uconst c) [x, y]
  | (c & CMuli _, args & [TmConst {val = CInt x}, y & TmVar _]) ->
    let b = astBuilder info in
    switch x.val
    case 0 then b.int 0
    case 1 then y
    case _ then b.appSeq (b.uconst c) args
    end
  | (c & CSubi _, args & [TmConst {val = CInt x}, y & TmVar _]) ->
    let b = astBuilder info in
    if eqi x.val 0 then b.negi y else b.appSeq (b.uconst c) args
  | (c & CSubi _, args & [x & TmVar _, TmConst {val = CInt y}]) ->
    let b = astBuilder info in
    if eqi y.val 0 then x else b.appSeq (b.uconst c) args
  | (c & CSubi _, [x & TmVar r1, y & TmVar r2]) ->
    let b = astBuilder info in
    if nameEqSymUnsafe r1.ident r2.ident then b.int 0
    else b.appSeq (b.uconst c) [x, y]
  | (c & (CDivi _),
     args & [TmConst {val = CInt x}, y & !TmConst {val = CInt _}]) ->
    let b = astBuilder info in
    if eqi x.val 0 then b.int 0 else b.appSeq (b.uconst c) args
  | (c & (CDivi _), args & [x, TmConst {val = CInt y}]) ->
    let b = astBuilder info in
    switch y.val
    case 0 then errorSingle [info] "Division by zero"
    case 1 then x
    case _ then b.appSeq (b.uconst c) args
    end
  | (c & (CModi _), args & [TmConst {val = CInt x}, !TmConst {val = CInt _}]) ->
    let b = astBuilder info in
    if eqi x.val 0 then b.int 0 else b.appSeq (b.uconst c) args
  | (c & (CModi _), args & [!TmConst {val = CInt _}, TmConst {val = CInt y}]) ->
    let b = astBuilder info in
    switch y.val
    case 0 then errorSingle [info] "Division by zero"
    case 1 then b.int 0
    case _ then b.appSeq (b.uconst c) args
    end
```
</ToggleWrapper>
</DocBlock>

