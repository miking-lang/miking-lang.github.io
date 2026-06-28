import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# nested-accelerate.mc  
  

Defines a function for checking whether nested accelerated expressions occur  
within the program. This is currently not supported, so we explicitly  
prevent it.  
  
This can easily be checked after the extraction has taken place. The key  
observation is that the accelerated expressions are the entry points of the  
accelerated code, produced from extraction. Therefore, if the accelerated  
code contains a call to one of these functions, the original program makes  
use of nested acceleration.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/lamlift.mc"} style={S.link}>mexpr/lamlift.mc</a>, <a href={"/docs/Stdlib/mexpr/symbolize.mc"} style={S.link}>mexpr/symbolize.mc</a>, <a href={"/docs/Stdlib/pmexpr/ast.mc"} style={S.link}>pmexpr/ast.mc</a>, <a href={"/docs/Stdlib/pmexpr/extract.mc"} style={S.link}>pmexpr/extract.mc</a>  
  
## Languages  
  

          <DocBlock title="PMExprNestedAccelerate" kind="lang" link="/docs/Stdlib/pmexpr/nested-accelerate.mc/lang-PMExprNestedAccelerate">

```mc
lang PMExprNestedAccelerate
```



<ToggleWrapper text="Code..">
```mc
lang PMExprNestedAccelerate = PMExprAst
  sem checkIdentifiers : Set Name -> Expr -> ()
  sem checkIdentifiers env =
  | TmVar t ->
    if setMem t.ident env then
      errorSingle [t.info] _nestedAccMsg
    else ()
  | t -> sfold_Expr_Expr (lam. lam t. checkIdentifiers env t) () t

  sem containsNestedAccelerate : Set Name -> Expr -> ()
  sem containsNestedAccelerate env =
  | TmDecl (x & {decl = DeclLet t}) ->
    checkIdentifiers env t.body;
    containsNestedAccelerate env x.inexpr
  | TmDecl (x & {decl = DeclRecLets t}) ->
    iter (lam bind. checkIdentifiers env bind.body) t.bindings;
    containsNestedAccelerate env x.inexpr
  | TmDecl {decl = DeclType _ | DeclConDef _ | DeclUtest _ | DeclExt _, inexpr = inexpr} ->
    containsNestedAccelerate env inexpr
  | _ -> ()

  sem checkNestedAccelerate : Set Name -> Expr -> ()
  sem checkNestedAccelerate accelerateIds =
  | t -> containsNestedAccelerate accelerateIds t
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_nestedAccMsg" kind="let">

```mc
let _nestedAccMsg  : String
```



<ToggleWrapper text="Code..">
```mc
let _nestedAccMsg = join [
  "The accelerated expression is used within another accelerated expression, ",
  "which is not supported."]
```
</ToggleWrapper>
</DocBlock>

