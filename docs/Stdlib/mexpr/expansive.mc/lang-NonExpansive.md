import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NonExpansive  
  

  
  
  
## Types  
  

          <DocBlock title="Guarded" kind="type">

```mc
type Guarded : Bool
```

<Description>{`We define non\-expansive and "guarded" non\-expansive terms,  
following the FreezeML paper \(see type\-check.mc\).  Non\-expansive  
terms are syntactic values and terms where no subterm contains a  
function application.  "Guarded" non\-expansive terms additionally  
have no frozen variable in tail position, i.e., the type is  
guaranteed to have no leading quantifiers.`}</Description>


<ToggleWrapper text="Code..">
```mc
type Guarded = Bool
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="nonExpansive" kind="sem">

```mc
sem nonExpansive : NonExpansive_Guarded -> Ast_Expr -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem nonExpansive (guarded : Guarded) =
  | t ->
    sfold_Expr_Expr (lam v. lam tm.
      if v then nonExpansive false tm else false) true t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nonExpansiveDecl" kind="sem">

```mc
sem nonExpansiveDecl : Ast_Decl -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem nonExpansiveDecl =
  | d ->
    sfold_Decl_Expr (lam v. lam tm. if v then nonExpansive false tm else false) true d
```
</ToggleWrapper>
</DocBlock>

