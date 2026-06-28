import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# main-renderer.mc  
  

\# Renderer Composition  
  
This module aggregates all renderer implementations into a single \`Renderer\`.  
  
It imports:  
\- \`RawRenderer\`      → generic fallback, delegates to underlying format  
\- \`HtmlRenderer\`     → generates HTML pages  
\- \`MarkdownRenderer\` → generates Markdown output  
\- \`MdxRenderer\`      → generates MDX output \(for Docusaurus integration\)  
  
The resulting \`Renderer\` is the union of all these modules, implementing the  
\`RendererInterface\` and providing format\-dispatched rendering.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/rendering/renderers/html-renderer.mc"} style={S.link}>./html-renderer.mc</a>, <a href={"/docs/Stdlib/docgen/rendering/renderers/raw-renderer.mc"} style={S.link}>./raw-renderer.mc</a>, <a href={"/docs/Stdlib/docgen/rendering/renderers/md-renderer.mc"} style={S.link}>./md-renderer.mc</a>, <a href={"/docs/Stdlib/docgen/rendering/renderers/mdx-renderer.mc"} style={S.link}>./mdx-renderer.mc</a>  
  
## Languages  
  

          <DocBlock title="Renderer" kind="lang" link="/docs/Stdlib/docgen/rendering/renderers/main-renderer.mc/lang-Renderer">

```mc
lang Renderer
```

<Description>{`Unification of all the renderers, language used in ../renderer.mc.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang Renderer = RawRenderer + HtmlRenderer + MarkdownRenderer + MdxRenderer end
```
</ToggleWrapper>
</DocBlock>

