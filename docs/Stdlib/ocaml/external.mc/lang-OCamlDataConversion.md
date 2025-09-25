import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlDataConversion  
  

  
  
  
## Semantics  
  

          <DocBlock title="convertDataInner" kind="sem">

```mc
sem convertDataInner : Info -> GenerateEnv -> Ast_Expr -> (Ast_Type, Ast_Type) -> (Int, Ast_Expr)
```

<Description>{`\`convertDataInner info env tm2 \(ty1, ty2\)\` converts the term \`t\` from  
\`ty1\` to \`ty2\`, returning a tuple \`\(cost, t2\)\`, where \`tm2\` is the  
converted term and \`cost\` which is the cost of the conversion. The cost is  
0 If, and only if, no conversion is necessary.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem convertDataInner
    : Info -> GenerateEnv -> Expr -> (Type, Type) -> (Int, Expr)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="convertData" kind="sem">

```mc
sem convertData : Info -> GenerateEnv -> Ast_Expr -> (Ast_Type, Ast_Type) -> (Int, Ast_Expr)
```

<Description>{`\`convertData\` wraps \`convertDataInner\`, performing common operations  
on types before conversions such as unwrapping type aliases. I.e. recursive  
calls to \`convertDataInner\` should in most cases go via this function.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem convertData info env t =
  | (ty1, ty2) ->
    let ty1 = unwrapType ty1 in
    let ty2 = unwrapType ty2 in
    convertDataInner info env t (ty1, ty2)
```
</ToggleWrapper>
</DocBlock>

