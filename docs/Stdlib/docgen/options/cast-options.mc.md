import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# cast-options.mc  
  

\# Step\-Specific Options  
  
Some steps in the documentation pipeline require a set of arguments  
that are usually a subset of the full \`DocGenOptions\` type.  
Instead of passing the entire \`DocGenOptions\` record, or a large number of parameters,  
we define helper functions that convert \`DocGenOptions\` into step\-specific option types.  
  
This file provides basic utilities to cast \`DocGenOptions\` into  
\`ServerOptions\` and \`RenderingOptions\`.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/options/docgen-options.mc"} style={S.link}>./docgen-options.mc</a>, <a href={"/docs/Stdlib/docgen/server/server-options.mc"} style={S.link}>../server/server-options.mc</a>, <a href={"/docs/Stdlib/docgen/rendering/rendering-options.mc"} style={S.link}>../rendering/rendering-options.mc</a>, <a href={"/docs/Stdlib/hashmap.mc"} style={S.link}>hashmap.mc</a>  
  
## Variables  
  

          <DocBlock title="getServeOption" kind="let">

```mc
let getServeOption opt link : DocGenOptions -> String -> ServerOptions
```

<Description>{`Convert a global \`DocGenOptions\` record and a link string representing the URL of the opening file.  
into a \`ServerOptions\` record used by the server.`}</Description>


<ToggleWrapper text="Code..">
```mc
let getServeOption : DocGenOptions -> String -> ServerOptions  = lam opt. lam link.
    {
        fmt = opt.fmt,
        folder = opt.outputFolder,
        firstFile = opt.file,
        noOpen = opt.noOpen,
        link = link
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getRenderingOption" kind="let">

```mc
let getRenderingOption opt log : DocGenOptions -> Logger -> RenderingOptions
```

<Description>{`Convert a global \`DocGenOptions\` record into a \`RenderingOptions\` record  
used by the rendering step.`}</Description>


<ToggleWrapper text="Code..">
```mc
let getRenderingOption : DocGenOptions -> Logger -> RenderingOptions = use FormatLanguages in lam opt. lam log.
    {
        fmt = opt.fmt,
        noStdlib = opt.noStdlib,
        outputFolder = opt.outputFolder,
        urlPrefix = opt.urlPrefix,
        fmtLang = opt.fmtLang,
        letDepth = opt.letDepth,
        nameContext = hashmapEmpty (),
        jsSearchCode = "",
        log = log
    }
```
</ToggleWrapper>
</DocBlock>

