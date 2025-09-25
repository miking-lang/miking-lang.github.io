import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CharPat  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Pat" kind="syn">

```mc
syn Pat
```



<ToggleWrapper text="Code..">
```mc
syn Pat =
  | PatChar {val : Char,
             info : Info,
             ty : Type}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="infoPat" kind="sem">

```mc
sem infoPat : Ast_Pat -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoPat =
  | PatChar r -> r.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withInfoPat" kind="sem">

```mc
sem withInfoPat : Info -> Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem withInfoPat info =
  | PatChar r -> PatChar {r with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyPat" kind="sem">

```mc
sem tyPat : Ast_Pat -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyPat =
  | PatChar r -> r.ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withTypePat" kind="sem">

```mc
sem withTypePat : Ast_Type -> Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem withTypePat (ty : Type) =
  | PatChar r -> PatChar {r with ty = ty}
```
</ToggleWrapper>
</DocBlock>

