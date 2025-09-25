import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataTypeTCUnify  
  

  
  
  
## Semantics  
  

          <DocBlock title="unifyCheckData" kind="sem">

```mc
sem unifyCheckData : Map Name (Level, Ast_Type) -> Map Name (Level, [Name], Ast_Type) -> [Info] -> MetaVarTypeAst_MetaVarRec -> Map Name (Set Name) -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyCheckData conEnv tyConEnv info tv =
  | data ->
    let mkMsg = lam sort. lam n. join [
      "* Encountered a ", sort, " escaping its scope: ",
      nameGetStr n, "\n",
      "* When type checking the expression\n"
    ] in
    iter
      (lam tks.
        if optionMapOr true (lam r. lti tv.level r.0) (mapLookup tks.0 tyConEnv) then
          errorSingle info (mkMsg "type constructor" tks.0)
        else
          iter (lam k.
            if optionMapOr true (lam r. lti tv.level r.0) (mapLookup k conEnv) then
              errorSingle info (mkMsg "constructor" k)
            else ())
               (setToSeq tks.1))
      (mapBindings data)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyCheckBase" kind="sem">

```mc
sem unifyCheckBase : TCEnv -> [Info] -> Set Name -> MetaVarTypeAst_MetaVarRec -> Ast_Type -> ()
```



<ToggleWrapper text="Code..">
```mc
sem unifyCheckBase env info boundVars tv =
  | TyData t ->
    unifyCheckData env.conEnv env.tyConEnv info tv (computeData t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyCheckKind" kind="sem">

```mc
sem unifyCheckKind : TCEnv -> [Info] -> Set Name -> MetaVarTypeAst_MetaVarRec -> Ast_Kind -> ()
```



<ToggleWrapper text="Code..">
```mc
sem unifyCheckKind env info boundVars tv =
  | Data t ->
    unifyCheckData env.conEnv env.tyConEnv info tv
      (mapMap
         (lam ks. setUnion ks.lower (optionGetOr (setEmpty nameCmp) ks.upper))
         t.types)
```
</ToggleWrapper>
</DocBlock>

