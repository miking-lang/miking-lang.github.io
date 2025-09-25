import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# _testKeywordMaker  
  

A test fragment that is used to test the approach. This  
fragment can be used as a template when using the keyword maker.

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```

<Description>{`Example terms that will be used to represent the values of the  
the keyword expressions \(the new language constructs\). The term  
first demonstrates a construct without arguments, and the third term  
an example where the construct has exactly 2 arguments. The second  
and forth terms show that a keyword also can start with a capital letter.  
Note that the special case of a keyword with capital letter with zero arguments  
is not allowed because MCore does not support constructors with zero arguments.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmNoArgs {info: Info}
  | TmOneArg {arg1: Expr, info: Info}
  | TmTwoArgs {arg1: Expr, arg2: Expr, info: Info}
  | TmThreeArgs {arg1: Expr, arg2: Expr, arg3: Expr, info: Info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Type" kind="syn">

```mc
syn Type
```



<ToggleWrapper text="Code..">
```mc
syn Type =
  | TyNoArgs {info: Info}
  | TyOneArg {arg1: Type, info: Info}
  | TyTwoArgs {arg1: Type, arg2: Type, info: Info}
  | TyThreeArgs {arg1: Type, arg2: Type, arg3: Type, info: Info}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="isKeyword" kind="sem">

```mc
sem isKeyword : Ast_Expr -> Bool
```

<Description>{`States that the new terms are indeed mapping from keywords`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isKeyword =
  | TmNoArgs _ -> true
  | TmOneArg _ -> true
  | TmTwoArgs _ -> true
  | TmThreeArgs _ -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isTypeKeyword" kind="sem">

```mc
sem isTypeKeyword : Ast_Type -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isTypeKeyword =
  | TyNoArgs _ -> true
  | TyOneArg _ -> true
  | TyTwoArgs _ -> true
  | TyThreeArgs _ -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchKeywordString" kind="sem">

```mc
sem matchKeywordString : Info -> String -> Option (Int, [Ast_Expr] -> Ast_Expr)
```

<Description>{`Defines the new mapping from keyword to new terms`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchKeywordString (info: Info) =
  | "noargs" -> Some (0, lam lst. TmNoArgs{info = info})
  | "OneArg" -> Some (1, lam lst. TmOneArg{arg1 = get lst 0, info = info})
  | "twoargs" -> Some (2, lam lst. TmTwoArgs{arg1 = get lst 0, arg2 = get lst 1, info = info})
  | "ThreeArgs" -> Some (3, lam lst. TmThreeArgs{arg1 = get lst 0, arg2 = get lst 1,
                                                 arg3 = get lst 2, info = info})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchTypeKeywordString" kind="sem">

```mc
sem matchTypeKeywordString : Info -> String -> Option (Int, [Ast_Type] -> Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem matchTypeKeywordString (info: Info) =
  | "TyNoArgs" -> Some (0, lam lst. TyNoArgs{info = info})
  | "TyOneArg" -> Some (1, lam lst. TyOneArg{arg1 = get lst 0, info = info})
  | "TyTwoArgs" -> Some (2, lam lst. TyTwoArgs{arg1 = get lst 0, arg2 = get lst 1, info = info})
  | "TyThreeArgs" -> Some (3, lam lst. TyThreeArgs{arg1 = get lst 0, arg2 = get lst 1,
                                                 arg3 = get lst 2, info = info})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Expr_Expr" kind="sem">

```mc
sem smap_Expr_Expr : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```

<Description>{`smap for the new terms`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Expr_Expr (f : Expr -> Expr) =
  | TmNoArgs t -> TmNoArgs t
  | TmOneArg t -> TmOneArg {t with arg1 = f t.arg1}
  | TmTwoArgs t -> TmTwoArgs {{t with arg1 = f t.arg1} with arg2 = f t.arg2}
  | TmThreeArgs t -> TmThreeArgs {{{t with arg1 = f t.arg1}
                                      with arg2 = f t.arg2} with arg3 = f t.arg3}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Type_Type" kind="sem">

```mc
sem smap_Type_Type : (Ast_Type -> Ast_Type) -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem smap_Type_Type (f : Type -> Type) =
  | TyNoArgs t -> TyNoArgs t
  | TyOneArg t -> TyOneArg {t with arg1 = f t.arg1}
  | TyTwoArgs t -> TyTwoArgs {{t with arg1 = f t.arg1} with arg2 = f t.arg2}
  | TyThreeArgs t -> TyThreeArgs {{{t with arg1 = f t.arg1}
                                      with arg2 = f t.arg2} with arg3 = f t.arg3}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option {conEnv: [(Name, Name)], varEnv: [(Name, Name)]}
```

<Description>{`Equality of the new terms`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
  | TmNoArgs _ ->
      match lhs with TmNoArgs _ then Some free else None ()
  | TmOneArg r ->
      match lhs with TmOneArg l then
        eqExprH env free l.arg1 r.arg1
      else None ()
  | TmTwoArgs r ->
      match lhs with TmTwoArgs l then
        match eqExprH env free l.arg1 r.arg1 with Some free then
          eqExprH env free l.arg2 r.arg2
        else None ()
      else None ()
  | TmThreeArgs r ->
      match lhs with TmThreeArgs l then
        match eqExprH env free l.arg1 r.arg1 with Some free then
          match eqExprH env free l.arg2 r.arg2 with Some free then
            eqExprH env free l.arg3 r.arg3
          else None ()
        else None ()
      else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqTypeH" kind="sem">

```mc
sem eqTypeH : EqTypeEnv -> EqTypeFreeEnv -> Ast_Type -> Ast_Type -> Option EqTypeFreeEnv
```



<ToggleWrapper text="Code..">
```mc
sem eqTypeH (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) (lhs : Type) =
  | TyNoArgs _ ->
      match unwrapType lhs with TyNoArgs _ then Some free
      else None ()
  | TyOneArg r ->
      match unwrapType lhs with TyOneArg l then
        eqTypeH typeEnv free l.arg1 r.arg1
      else None ()
  | TyTwoArgs r ->
      match unwrapType lhs with TyTwoArgs l then
        match eqTypeH typeEnv free l.arg1 r.arg1 with Some free then
          eqTypeH typeEnv free l.arg2 r.arg2
        else None ()
      else None ()
  | TyThreeArgs r ->
      match unwrapType lhs with TyThreeArgs l then
        match eqTypeH typeEnv free l.arg1 r.arg1 with Some free then
          match eqTypeH typeEnv free l.arg2 r.arg2 with Some free then
            eqTypeH typeEnv free l.arg3 r.arg3
          else None ()
        else None ()
      else None ()
```
</ToggleWrapper>
</DocBlock>

