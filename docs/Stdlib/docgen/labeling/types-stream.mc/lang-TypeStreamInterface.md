import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeStreamInterface  
  

  
  
  
## Types  
  

          <DocBlock title="TypeStreamContext" kind="type">

```mc
type TypeStreamContext : { stack: [Expr] }
```

<Description>{`A context holding a stack of expressions yet to be processed.    `}</Description>


<ToggleWrapper text="Code..">
```mc
type TypeStreamContext = { stack: [Expr] }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TypeStreamNextResult" kind="type">

```mc
type TypeStreamNextResult : { ctx: TypeStreamContext, t: Option Type, skipped: [{ name: String, body: Expr, t: Type }] }
```

<Description>{`The result of a typeStreamNext query.  
Includes:  
\- The updated context  
\- The optional type found  
\- A list of skipped bindings that were not relevant to the query.`}</Description>


<ToggleWrapper text="Code..">
```mc
type TypeStreamNextResult = { ctx: TypeStreamContext, t: Option Type, skipped: [{ name: String, body: Expr, t: Type }] }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="typeStreamNext" kind="sem">

```mc
sem typeStreamNext : String -> TypeStreamInterface_TypeStreamContext -> TypeStreamInterface_TypeStreamNextResult
```

<Description>{`Searches the top of the context stack for a let\-binding whose identifier matches the provided name.  
\- If the top does not match, it is skipped and added to the skipped list.  
\- If the stack is empty, returns None for the type and an unchanged context.        No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem typeStreamNext name =
    | { stack = [_] ++ stack } ->
        typeStreamNext name { stack = stack }
    | { stack = [] } & ctx -> { t = None {}, ctx = ctx, skipped = [] }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeStreamPop" kind="sem">

```mc
sem typeStreamPop : TypeStreamInterface_TypeStreamContext -> {ast: Ast_Expr, ctx: TypeStreamInterface_TypeStreamContext}
```

<Description>{`Removes and returns the top expression \(Expr\) from the stack, updating the context accordingly.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem typeStreamPop =
        | { stack = [ast] ++ stack } & ctx -> { ast = ast, ctx = { ctx with stack = stack }}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="checkAndEnd" kind="sem">

```mc
sem checkAndEnd : String -> _a -> Ast_Type -> Ast_Expr -> TypeStreamInterface_TypeStreamContext -> {t: Option Ast_Type, ctx: TypeStreamInterface_TypeStreamContext, skipped: [{t: Ast_Type, body: Ast_Expr, name: String}]}
```

<Description>{`Utility function that:  
\- Immediately returns the type if the provided identifier matches the target name.  
\- Otherwise, recursively invokes typeStreamNext, adding the current item to the skipped list.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem checkAndEnd name ident t body =
    | ctx -> if eqString name ident.0 then
            { t = Some t, ctx = ctx, skipped = [] }
        else  
            let res = typeStreamNext name ctx in
            { res with skipped = cons { name = ident.0, body = body, t = t } res.skipped }
```
</ToggleWrapper>
</DocBlock>

