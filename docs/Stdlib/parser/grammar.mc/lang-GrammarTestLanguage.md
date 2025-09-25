import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GrammarTestLanguage  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="TokenRepr" kind="syn">

```mc
syn TokenRepr
```



<ToggleWrapper text="Code..">
```mc
syn TokenRepr =
  | LParenRepr ()
  | RParenRepr ()
  | PlusRepr ()
  | TimesRepr ()
  | IntRepr ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="tokReprToStr" kind="sem">

```mc
sem tokReprToStr : TokenReprBase_TokenRepr -> String
```



<ToggleWrapper text="Code..">
```mc
sem tokReprToStr =
  | LParenRepr _ -> "<LParen>"
  | RParenRepr _ -> "<RParen>"
  | PlusRepr _ -> "<Plus>"
  | TimesRepr _ -> "<Times>"
  | IntRepr _ -> "<INT>"
```
</ToggleWrapper>
</DocBlock>

