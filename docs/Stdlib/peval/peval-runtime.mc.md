import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# peval-runtime.mc  
  

Defines the different functions that should be included in the AST during  
the specialize transformation.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/stringid.mc"} style={S.link}>stringid.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>mexpr/pprint.mc</a>, <a href={"/docs/Stdlib/peval/peval.mc"} style={S.link}>peval/peval.mc</a>, <a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>  
  
## Variables  
  

          <DocBlock title="toString" kind="let">

```mc
let toString x : Ast_Expr -> String
```



<ToggleWrapper text="Code..">
```mc
let toString = use MExprPrettyPrint in
  lam x. mexprToString x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalWithEnv" kind="let">

```mc
let pevalWithEnv env ast : Eval_EvalEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let pevalWithEnv = lam env. lam ast.
  use MExprPEval in pevalWithEnv env ast
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr

unsafeCoerce (pevalWithEnv, mapFromSeq, stringToSid, mapMapWithKey, toString, _noSymbol)
```
</ToggleWrapper>
</DocBlock>

