import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# docgen.mc  
  

\# Miking Doc Gen  
  
This file defines the main execution pipeline for Miking doc gen.  
It chains together all major stages, starting from parsing and file loading,  
down to rendering and serving the generated documentation.  
  
Each stage transforms the \`ExecutionContext\` in sequence,  
progressively enriching it until the final output is produced.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/execution-context.mc"} style={S.link}>./execution-context.mc</a>  
  
## Variables  
  

          <DocBlock title="docgen" kind="let">

```mc
let docgen opt : DocGenOptions -> ()
```



<ToggleWrapper text="Code..">
```mc
let docgen : DocGenOptions -> () = lam opt.
    let execCtx = execContextNew opt in
    let execCtx = gen execCtx in
    let execCtx = parse execCtx in
    let execCtx = extract execCtx in
    let execCtx = label execCtx in
    let execCtx = render execCtx in
    let execCtx = serve execCtx in
    ()
```
</ToggleWrapper>
</DocBlock>

