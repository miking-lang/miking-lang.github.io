import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# rendering-options.mc  
  

\# Rendering Options  
  
Throughout the rendering process, we keep track of a \`RenderingOptions\` object.    
This structure stores essential information that controls how documentation is generated.  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/global/format-language.mc"} style={S.link}>./../global/format-language.mc</a>, <a href={"/docs/Stdlib/docgen/global/format.mc"} style={S.link}>./../global/format.mc</a>, <a href={"/docs/Stdlib/docgen/rendering/rendering-types.mc"} style={S.link}>./rendering-types.mc</a>  
  
## Types  
  

          <DocBlock title="RenderingOptions" kind="type">

```mc
type RenderingOptions : { fmt: Format, noStdlib: Bool, outputFolder: String, urlPrefix: String, fmtLang: FormatLanguage, letDepth: Option Int, nameContext: HashMap String String, jsSearchCode: String, log: Logger }
```

<Description>{`\#\# RenderingOptions  
  
The configuration object passed around during rendering.`}</Description>


<ToggleWrapper text="Code..">
```mc
type RenderingOptions = use Formats in use FormatLanguages in
    {
        fmt: Format, 
        noStdlib: Bool, 
        outputFolder: String, 
        urlPrefix: String, 
        fmtLang: FormatLanguage, 
        letDepth: Option Int, 
        nameContext: HashMap String String,
        jsSearchCode: String,
        log: Logger
    }
```
</ToggleWrapper>
</DocBlock>

