import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppCompatibleType  
  

  
  
  
## Semantics  
  

          <DocBlock title="compatibleTypeBase" kind="sem">

```mc
sem compatibleTypeBase : all a. Map Name Ast_Type -> (Ast_Type, Ast_Type) -> Option a
```



<ToggleWrapper text="Code..">
```mc
sem compatibleTypeBase (tyEnv : Map Name Type) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reduceType" kind="sem">

```mc
sem reduceType : Map Name Ast_Type -> Ast_Type -> Option Ast_Type
```

<Description>{`NOTE\(dlunde,2021\-05\-05\): This is NOT how we want to handle TmApp in the  
end. We are now just discarding the RHS of all applications`}</Description>


<ToggleWrapper text="Code..">
```mc
sem reduceType (tyEnv : Map Name Type) =
  | TyApp t -> Some t.lhs
```
</ToggleWrapper>
</DocBlock>

