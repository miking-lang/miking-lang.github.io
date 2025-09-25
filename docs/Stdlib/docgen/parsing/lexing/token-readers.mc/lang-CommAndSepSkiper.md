import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CommAndSepSkiper  
  

Contains skip utility function allowing to jump all the comments and separator until the next important token

  
  
  
## Semantics  
  

          <DocBlock title="skip" kind="sem">

```mc
sem skip : String -> String -> {skiped: [TokenReaderInterface_Token], stream: String, newToken: TokenReaderInterface_Token}
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem skip =
    | str -> lam first.
        let pos = { x = 1, y = 1 } in
        let firstSkiped = match first with "" then [] else [TokenSeparator { content = first }] in
        switch next str pos 
            case { token = (TokenSeparator {} | TokenComment {} | TokenMultiLineComment {}) & token, stream = stream } then
                let res = skip stream "" in
                let skiped = concat firstSkiped (cons token res.skiped) in
                { res with skiped = skiped }
            case { token = token, stream = stream } then { stream = stream, skiped = firstSkiped, newToken = token }
            end
```
</ToggleWrapper>
</DocBlock>

