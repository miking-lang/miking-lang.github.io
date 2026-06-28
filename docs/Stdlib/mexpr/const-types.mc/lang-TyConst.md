import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TyConst  
  

  
  
  
## Semantics  
  

          <DocBlock title="tyConst" kind="sem">

```mc
sem tyConst : ConstAst_Const -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tyConst =
  | c -> tyConstBase false c
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyConstBase" kind="sem">

```mc
sem tyConstBase : Bool -> ConstAst_Const -> Ast_Type
```

<Description>{`tyConstBase takes a parameter deciding whether to disable constructor sets  
for builtin types \(Symbol, Ref, BootParseTree\)`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tyConstBase : Bool -> Const -> Type
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mkConst" kind="sem">

```mc
sem mkConst : Info -> ConstAst_Const -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mkConst info = | c -> TmConst
  { info = info
  , val = c
  , ty = tyConst c
  }
```
</ToggleWrapper>
</DocBlock>

