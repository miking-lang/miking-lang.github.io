import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DPrintViaPprintLoader  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Hook" kind="syn">

```mc
syn Hook
```



<ToggleWrapper text="Code..">
```mc
syn Hook =
  | DPrintViaPprintHook ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="enableDPrintViaPprint" kind="sem">

```mc
sem enableDPrintViaPprint : MCoreLoader_Loader -> MCoreLoader_Loader
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem enableDPrintViaPprint = | loader ->
    if hasHook (lam x. match x with DPrintViaPprintHook _ then true else false) loader then loader else

    let loader = enablePprintGeneration loader in
    let loader = addHook loader (DPrintViaPprintHook ()) in
    loader
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_postTypecheck" kind="sem">

```mc
sem _postTypecheck : MCoreLoader_Loader -> Ast_Decl -> MCoreLoader_Hook -> (MCoreLoader_Loader, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem _postTypecheck loader decl = | DPrintViaPprintHook _ ->
    recursive let work = lam loader. lam tm.
      match tm with TmConst {val = CDPrint _, ty = ty} then
        match unwrapType ty with TyArrow {from = from} in
        match pprintFunctionsFor [from] loader with (loader, [pprint]) in
        let x = nameSym "x" in
        let pprint = nulam_ x (semi_
          (printError_ (app_ pprint (nvar_ x)))
          (flushStderr_ unit_)) in
        (loader, pprint)
      else smapAccumL_Expr_Expr work loader tm
    in smapAccumL_Decl_Expr work loader decl
```
</ToggleWrapper>
</DocBlock>

