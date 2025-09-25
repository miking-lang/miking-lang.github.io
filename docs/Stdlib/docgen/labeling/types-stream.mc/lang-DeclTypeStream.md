import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclTypeStream  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeStreamNext" kind="sem">

```mc
sem typeStreamNext : String -> TypeStreamInterface_TypeStreamContext -> TypeStreamInterface_TypeStreamNextResult
```



<ToggleWrapper text="Code..">
```mc
sem typeStreamNext name =
  | { stack = [TmDecl ({ decl = decl, inexpr = inexpr } & tm)] ++ stack } & ctx ->
            switch decl
            case DeclRecLets { bindings = [] } then
                typeStreamNext name { stack = cons inexpr stack }
            case DeclRecLets ({ bindings = [b] ++ bindings } & dl) then
                let ctx = { ctx with stack = concat [b.body, TmDecl { tm with decl = DeclRecLets { dl with bindings = bindings } } ] stack } in
                checkAndEnd name b.ident (b.tyBody) b.body ctx
            case DeclLet { ident = ident, body = body, tyBody = tyBody } then
                let ctx = { ctx with stack = concat [body, inexpr] stack } in
                checkAndEnd name ident tyBody body ctx
            case DeclUtest { test = test, expected = expected, tusing = tusing, tonfail = tonfail }  then
                let arr = [inexpr] in
                let arr = match tusing with Some tusing then cons tusing arr else arr in
                let arr = match tusing with Some tonfail then cons tonfail arr else arr in
                let arr = concat [test, expected] arr in
                typeStreamNext name { stack = concat arr stack }
            case _ then typeStreamNext name { ctx with stack = cons inexpr stack }
            end
```
</ToggleWrapper>
</DocBlock>

