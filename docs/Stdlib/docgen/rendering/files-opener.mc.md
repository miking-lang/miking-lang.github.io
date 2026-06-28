import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# files-opener.mc  
  

\# file\-opener.mc  
This module provides an API to open documentation output  
files according to the renderIt field in the object.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/rendering/renderers/objects-renderer.mc"} style={S.link}>./renderers/objects-renderer.mc</a>, <a href={"/docs/Stdlib/docgen/rendering/rendering-options.mc"} style={S.link}>./rendering-options.mc</a>, <a href={"/docs/Stdlib/ext/file-ext.mc"} style={S.link}>ext/file-ext.mc</a>  
  
## Types  
  

          <DocBlock title="FileOpenerResult" kind="type">

```mc
type FileOpenerResult : { wc: Option WriteChannel, write: String -> (), path: String }
```

<Description>{`Result of opening a file for writing.`}</Description>


<ToggleWrapper text="Code..">
```mc
type FileOpenerResult = {
    wc: Option WriteChannel,   -- Optional write channel if the file is open
    write: String -> (),       -- Function to write a string to the file
    path: String               -- Path of the opened file
}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="fileOpenerOpen" kind="let">

```mc
let fileOpenerOpen tree opt : ObjectTree -> RenderingOptions -> Option FileOpenerResult
```

<Description>{`Attempts to open the output file for a given object.`}</Description>


<ToggleWrapper text="Code..">
```mc
let fileOpenerOpen : ObjectTree -> RenderingOptions -> Option FileOpenerResult =
    use ObjectsRenderer in lam tree. lam opt.
    let obj = objTreeObj tree in
    
    if objRenderIt obj then
        let path = concat opt.outputFolder (objLink obj opt) in
         match fileWriteOpen path with Some wc then
             Some {
                 wc = Some wc,
                 write = fileWriteString wc,
                 path = path
             }
         else
             renderingWarn (concat "Failed to open " path); None {}

    else
        Some {
             wc = None {},
             write = lam. (),
             path = ""
         } 
```
</ToggleWrapper>
</DocBlock>

