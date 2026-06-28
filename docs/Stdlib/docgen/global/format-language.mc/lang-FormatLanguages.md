import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FormatLanguages  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="FormatLanguage" kind="syn">

```mc
syn FormatLanguage
```

<Description>{`Represents the supported output languages for MDX rendering.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn FormatLanguage =
    | Js {}
    | Ts {}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="formatLanguageToStr" kind="sem">

```mc
sem formatLanguageToStr : FormatLanguages_FormatLanguage -> String
```

<Description>{`Converts a \`FormatLanguage\` into its string representation.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem formatLanguageToStr =
    | Js {} -> "Js"
    | Ts {} -> "Ts"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="defaultFormatLanguage" kind="sem">

```mc
sem defaultFormatLanguage : () -> FormatLanguages_FormatLanguage
```

<Description>{`Returns the default output language.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem defaultFormatLanguage =
    | _ -> Ts {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="formatLanguageGetExt" kind="sem">

```mc
sem formatLanguageGetExt : FormatLanguages_FormatLanguage -> String
```

<Description>{`Returns the file extension associated with a \`FormatLanguage\`.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem formatLanguageGetExt =
    | Ts {} -> "tsx"
    | Js {} -> "jsx"
```
</ToggleWrapper>
</DocBlock>

