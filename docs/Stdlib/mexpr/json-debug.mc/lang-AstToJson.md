import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AstToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprToJson" kind="sem">

```mc
sem exprToJson : Ast_Expr -> JsonValue
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem exprToJson =
  | tm -> error (join ["Missing case in exprToJson ", info2str (infoTm tm)])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | ty -> error (join ["Missing case in typeToJson ", info2str (infoTy ty)])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="kindToJson" kind="sem">

```mc
sem kindToJson : Ast_Kind -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem kindToJson : Kind -> JsonValue
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patToJson" kind="sem">

```mc
sem patToJson : Ast_Pat -> JsonValue
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patToJson =
  | pat -> error (join ["Missing case in patToJson ", info2str (infoPat pat)])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="declToJson" kind="sem">

```mc
sem declToJson : Ast_Decl -> JsonValue
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem declToJson =
  | decl -> error (join ["Missing case in declToJson ", info2str (infoDecl decl)])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optToNull" kind="sem">

```mc
sem optToNull : Option JsonValue -> JsonValue
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem optToNull =
  | Some x -> x
  | None _ -> JsonNull ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameToJson" kind="sem">

```mc
sem nameToJson : Name -> JsonValue
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem nameToJson = | name ->
    JsonArray [JsonString (nameGetStr name), optToNull (optionMap (lam x. JsonInt (sym2hash x)) (nameGetSym name))]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patNameToJson" kind="sem">

```mc
sem patNameToJson : PatName -> JsonValue
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patNameToJson =
  | PName n -> nameToJson n
  | PWildcard _ -> JsonString "_"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoToJson" kind="sem">

```mc
sem infoToJson : Info -> JsonValue
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem infoToJson = | info -> JsonString (info2str info)
```
</ToggleWrapper>
</DocBlock>

