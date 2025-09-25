import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TestLang  
  

  
  
  
## Semantics  
  

          <DocBlock title="iFail" kind="sem">

```mc
sem iFail : Int -> Failure_Failure
```



<ToggleWrapper text="Code..">
```mc
sem iFail : Int -> Failure
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cLog" kind="sem">

```mc
sem cLog : Char -> Writer_Log
```



<ToggleWrapper text="Code..">
```mc
sem cLog : Char -> Log
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="f" kind="sem">

```mc
sem f : Ast_Expr -> Effect_Eff Ast_Expr
```

<Description>{`Renames variables by concatenating its name to itself. variables with names  
'y' gives a warning 'b' and variables with names 'z' gives an error 1.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem f =
  | TmVar r ->
      let name = nameGetStr r.ident in
      match name with "z" then fail (iFail 1)
      else
        let newVar =
          TmVar { r with ident = nameSetStr r.ident (concat name name) }
        in
        match name with "y" then
          bind (tell (cLog 'b')) (lam. return newVar)
        else
          return newVar
  | e ->
    smapEff_Expr_Expr f e
```
</ToggleWrapper>
</DocBlock>

