import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RandomNumberGeneratorEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CRandIntU _, [TmConst {val = CInt lo}, TmConst (t & {val = CInt hi})]) ->
    TmConst {t with val = CInt {val = randIntU lo.val hi.val}}
  | (CRandSetSeed _, [TmConst {val = CInt n}]) ->
    randSetSeed n.val;
    uunit_
```
</ToggleWrapper>
</DocBlock>

