import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | TmDecl _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode indent env =
  | TmDecl x ->
    match pprintDeclCode indent env x.decl with (env, decl) in
    match pprintCode indent env x.inexpr with (env, inexpr) in
    let inSep = if gti (length decl) env.optSingleLineLimit
      then pprintNewline indent
      else " " in
    ( env
    , join [decl, inSep, "in", pprintNewline indent, inexpr]
    )
```
</ToggleWrapper>
</DocBlock>

