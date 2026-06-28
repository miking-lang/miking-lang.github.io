import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Formats  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Format" kind="syn">

```mc
syn Format
```

<Description>{`Represents the supported output formats.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn Format =
    | Html {}
    | Md {}
    | Mdx {}
    | Raw { fmt : Format }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="unwrapRaw" kind="sem">

```mc
sem unwrapRaw : Formats_Format -> Formats_Format
```

<Description>{`Recursively unwraps a Raw format to get the underlying format.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unwrapRaw =
    | Raw { fmt = fmt } -> unwrapRaw fmt
    | fmt -> fmt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="formatFromStr" kind="sem">

```mc
sem formatFromStr : String -> Option Formats_Format
```

<Description>{`Converts a string into a \`Format\` if possible.  
Accepts various case\-insensitive aliases and extensions.    No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem formatFromStr =
     | "html" | "HTML" | "Html" | ".html" -> Some (Html {})
     | "md" | "Markdown" | "markdown" | "MARKDOWN" | "MD" | ".md" -> Some (Md {})
     | "mdx" | "MarkdownExtended" | "MarkdownExt" | "markdownext" | "MARKDOWNEXT" | "MDX" | ".mdx" -> Some (Mdx {})
     | _ -> None {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="formatToStr" kind="sem">

```mc
sem formatToStr : Formats_Format -> String
```

<Description>{`Converts a \`Format\` value back into a printable string.    No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem formatToStr =
    | Html {} -> "Html"
    | Md {} -> "Md"
    | Mdx {} -> "Mdx"
    | Raw { fmt = fmt } -> join ["Raw { fmt = ", formatToStr fmt, " }"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="formatGetExtension" kind="sem">

```mc
sem formatGetExtension : Formats_Format -> String
```

<Description>{`Returns the file extension associated with a given \`Format\`.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem formatGetExtension =
    | Html {} -> "html"
    | Md {} | Mdx {} -> "md"
    | Raw { fmt = fmt } -> formatGetExtension fmt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="defaultFormat" kind="sem">

```mc
sem defaultFormat : all a. a -> Formats_Format
```

<Description>{`Returns the default rendering format to use when none is specified.    `}</Description>


<ToggleWrapper text="Code..">
```mc
sem defaultFormat /- () -> Format -/ =
    | _ -> Html {}
```
</ToggleWrapper>
</DocBlock>

