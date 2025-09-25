import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | TmLam _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode (indent : Int) (env: PprintEnv) =
  | TmLam t ->
    match pprintVarName env t.ident with (env,str) in
    match getTypeStringCode indent env t.tyAnnot with (env, ty) in
    let ty = if eqString ty "Unknown" then "" else concat ": " ty in
    match pprintCode (pprintIncr indent) env t.body with (env,body) in
    (env,
     join ["lam ", str, ty, ".", pprintNewline (pprintIncr indent),
           body])
```
</ToggleWrapper>
</DocBlock>

