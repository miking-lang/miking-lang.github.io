import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UseToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="declToJson" kind="sem">

```mc
sem declToJson : Ast_Decl -> JsonValue
```

<Description>{`TODO\(vipa, 2024\-05\-17\): This should probably actually be a Decl,  
it's just not a good idea to do a \`use\` on the top\-level right  
now because of how includes work.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem declToJson =
  | DeclUse x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclUse")
    , ("ident", nameToJson x.ident)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

