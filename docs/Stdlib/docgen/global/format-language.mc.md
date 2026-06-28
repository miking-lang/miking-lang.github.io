import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# format-language.mc  
  

\# FormatLanguages Module  
  
Miking\-doc\-gen can generate MDX code. MDX is written in React, and React  
supports both TypeScript and JavaScript. This module defines a small language  
to indicate in which format the output should be produced.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Languages  
  

          <DocBlock title="FormatLanguages" kind="lang" link="/docs/Stdlib/docgen/global/format-language.mc/lang-FormatLanguages">

```mc
lang FormatLanguages
```



<ToggleWrapper text="Code..">
```mc
lang FormatLanguages
    -- Represents the supported output languages for MDX rendering.
    syn FormatLanguage =
    | Js {}
    | Ts {}

    -- Converts a \\`FormatLanguage\\` into its string representation.
    sem formatLanguageToStr : FormatLanguage -> String
    sem formatLanguageToStr =
    | Js {} -> "Js"
    | Ts {} -> "Ts"

    -- Returns the default output language.
    sem defaultFormatLanguage : () -> FormatLanguage
    sem defaultFormatLanguage =
    | _ -> Ts {}

    -- Returns the file extension associated with a \\`FormatLanguage\\`.
    sem formatLanguageGetExt : FormatLanguage -> String
    sem formatLanguageGetExt =
    | Ts {} -> "tsx"
    | Js {} -> "jsx"

end
```
</ToggleWrapper>
</DocBlock>

