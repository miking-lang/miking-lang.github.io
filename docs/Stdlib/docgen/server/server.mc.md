import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# server.mc  
  

\# Server Entrypoint  
  
This module wires server options to the Python static server used for previewing  
generated documentation. It decides what to do based on the selected output format.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/server/python-server.mc"} style={S.link}>./python-server.mc</a>, <a href={"/docs/Stdlib/docgen/server/server-options.mc"} style={S.link}>./server-options.mc</a>, <a href={"/docs/Stdlib/docgen/options/cast-options.mc"} style={S.link}>../options/cast-options.mc</a>  
  
## Variables  
  

          <DocBlock title="startServer" kind="let">

```mc
let startServer opt : ServerOptions -> ()
```

<Description>{`\#\# startServer  
  
Starts the preview server or prints where the output was generated, depending on \`opt.fmt\`.  
If \`opt.noOpen\` is true, it performs no action.`}</Description>


<ToggleWrapper text="Code..">
```mc
let startServer : ServerOptions -> () = use Formats in lam opt.
    if opt.noOpen then () else
       switch opt.fmt
       case Md {} then pythonServerStart true opt    -- Serve Markdown with MD-aware flags
       case Html {} then pythonServerStart false opt -- Serve static HTML
       case Mdx {} then printLn (join ["Mdx generated in ", opt.folder, "."]) -- MDX not served here
       end
```
</ToggleWrapper>
</DocBlock>

