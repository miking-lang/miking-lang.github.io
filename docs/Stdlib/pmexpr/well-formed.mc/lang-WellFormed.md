import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# WellFormed  
  

An extensible language fragment for defining well\-formedness rules on  
expressions.

  
  
  
## Syntaxes  
  

          <DocBlock title="WFError" kind="syn">

```mc
syn WFError
```



<ToggleWrapper text="Code..">
```mc
syn WFError =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="wellFormednessBackendName" kind="sem">

```mc
sem wellFormednessBackendName : () -> String
```

<Description>{`Defines a name for the well\-formedness backend. This is used when  
reporting well\-formedness errors.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem wellFormednessBackendName : () -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintWellFormedError" kind="sem">

```mc
sem pprintWellFormedError : WellFormed_WFError -> (Info, String)
```

<Description>{`Translates a well\-formedness error node to an info\-string tuple which can  
be passed to errorMulti.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintWellFormedError : WFError -> (Info, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wellFormedExprH" kind="sem">

```mc
sem wellFormedExprH : [WellFormed_WFError] -> Ast_Expr -> [WellFormed_WFError]
```

<Description>{`Defines the well\-formedness relation for an expression. A well\-formed  
expression will return the accumulated sequence of errors, while one that  
is ill\-formed will return the accumulator extended with errors  
corresponding to the failed well\-formedness checks.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem wellFormedExprH : [WFError] -> Expr -> [WFError]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wellFormedExpr" kind="sem">

```mc
sem wellFormedExpr : Ast_Expr -> [WellFormed_WFError]
```

<Description>{`Checks well\-formedness within an AST node. The result is a possibly empty  
sequence of well\-formedness errors.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem wellFormedExpr =
  | t -> reverse (wellFormedExprH [] t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wellFormedTypeH" kind="sem">

```mc
sem wellFormedTypeH : [WellFormed_WFError] -> Ast_Type -> [WellFormed_WFError]
```



<ToggleWrapper text="Code..">
```mc
sem wellFormedTypeH : [WFError] -> Type -> [WFError]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wellFormedType" kind="sem">

```mc
sem wellFormedType : Ast_Type -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem wellFormedType =
  | t -> reverse (wellFormedTypeH [] t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wellFormed" kind="sem">

```mc
sem wellFormed : Ast_Expr -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem wellFormed =
  | t ->
    let errors = wellFormedExpr t in
    if null errors then ()
    else
      let cmpSection = lam a. lam b.
        match (a, b) with ((i1, s1), (i2, s2)) in
        let c = infoCmp i1 i2 in
        if eqi c 0 then cmpString s1 s2 else c in
      let eqSection = lam a. lam b. eqi (cmpSection a b) 0 in
      let sections =
        distinctSorted
         eqSection
            (sort
              cmpSection
              (map pprintWellFormedError errors)) in
      let msg = join ["Well-formedness check failed for ",
                      wellFormednessBackendName (), " backend."] in
      errorMulti sections msg
```
</ToggleWrapper>
</DocBlock>

