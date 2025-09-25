import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaLanguageFragmentFix  
  

  
  
  
## Semantics  
  

          <DocBlock title="_eliminateFailureCodeInSemanticFunctionBody" kind="sem">

```mc
sem _eliminateFailureCodeInSemanticFunctionBody : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _eliminateFailureCodeInSemanticFunctionBody =
  | TmLam t ->
    TmLam {t with body = _eliminateFailureCodeInSemanticFunctionBody t.body}
  | TmMatch t ->
    TmMatch {t with els = _eliminateFailureCodeInSemanticFunctionBody t.els}
  | TmDecl {decl = DeclLet {
      body = TmApp {lhs = TmConst {val = CDPrint _}}},
      inexpr = TmApp {lhs = TmConst {val = CError _},
                      rhs = TmSeq _},
      info = info} ->
    -- NOTE(larshum, 2022-03-29): If we find an expression that corresponds to
    -- what is (currently) generated when compiling a semantic function, we
    -- replace it with a never term (which is compiled correctly).
    TmNever {ty = TyUnknown {info = info}, info = info}
  | t -> t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_eliminateFailureCodeInSemanticFunction" kind="sem">

```mc
sem _eliminateFailureCodeInSemanticFunction : LetDeclAst_DeclLetRecord -> LetDeclAst_DeclLetRecord
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _eliminateFailureCodeInSemanticFunction =
  | recLetBinding ->
    let recLetBinding : DeclLetRecord = recLetBinding in
    let body = _eliminateFailureCodeInSemanticFunctionBody recLetBinding.body in
    {recLetBinding with body = body}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fixLanguageFragmentSemanticFunction" kind="sem">

```mc
sem fixLanguageFragmentSemanticFunction : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem fixLanguageFragmentSemanticFunction =
  | TmDecl x -> TmDecl {x with inexpr = fixLanguageFragmentSemanticFunction x.inexpr}
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let bindings = map _eliminateFailureCodeInSemanticFunction t.bindings in
    TmDecl
    { x with decl = DeclRecLets {t with bindings = bindings}
    , inexpr = fixLanguageFragmentSemanticFunction x.inexpr
    }
  | t -> t
```
</ToggleWrapper>
</DocBlock>

