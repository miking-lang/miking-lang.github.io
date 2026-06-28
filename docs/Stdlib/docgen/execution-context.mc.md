import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# execution-context.mc  
  

\# Execution Context  
  
This module defines the \`ExecutionContext\`, the central state threaded through all  
stages of the documentation generation pipeline.  
  
\#\# ExecutionContext fields  
\- \`opt\`      : Parsed CLI options.  
\- \`mainFile\` : Path of the main input file.  
\- \`tokens\`   : Tokens from the lexer \(not always used directly\).  
\- \`docTree\`  : Parsed documentation tree, if available.  
\- \`ast\`      : The Miking AST, if generated.  
\- \`object\`   : The extracted object tree, if built.  
  
\#\# Step functions  
Each stage of the pipeline is a \`Step = ExecutionContext \-\> ExecutionContext\`.  
\- \`gen\`     : Build MAst from the main file.  
\- \`parse\`   : Build DocTree from MAst.  
\- \`extract\` : Extract ObjectTree from DocTree.  
\- \`label\`   : Label ObjectTree with semantic metadata.  
\- \`render\`  : Generate documentation files.  
\- \`serve\`   : Start preview server.  
  
If a step is called out of order, the \`crash\` function raises an error with details.  
  
The ExecutionContext also provides a logger for each steps.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/options/docgen-options.mc"} style={S.link}>./options/docgen-options.mc</a>, <a href={"/docs/Stdlib/docgen/options/cast-options.mc"} style={S.link}>./options/cast-options.mc</a>, <a href={"/docs/Stdlib/docgen/mast-gen/mast-generator.mc"} style={S.link}>./mast-gen/mast-generator.mc</a>, <a href={"/docs/Stdlib/docgen/parsing/parser.mc"} style={S.link}>./parsing/parser.mc</a>, <a href={"/docs/Stdlib/docgen/extracting/extracter.mc"} style={S.link}>./extracting/extracter.mc</a>, <a href={"/docs/Stdlib/docgen/labeling/labeler.mc"} style={S.link}>./labeling/labeler.mc</a>, <a href={"/docs/Stdlib/docgen/rendering/renderer.mc"} style={S.link}>./rendering/renderer.mc</a>, <a href={"/docs/Stdlib/docgen/server/server.mc"} style={S.link}>./server/server.mc</a>  
  
## Types  
  

          <DocBlock title="ExecutionContext" kind="type">

```mc
type ExecutionContext : { opt: DocGenOptions, mainFile: String, tokens: [Token], docTree: Option DocTree, ast: Option MAst, object: Option ObjectTree }
```



<ToggleWrapper text="Code..">
```mc
type ExecutionContext =  use TokenReader in {    
    opt: DocGenOptions,
    mainFile: String,
    tokens: [Token],
    docTree : Option DocTree,
    ast: Option MAst,
    object: Option ObjectTree
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Step" kind="type">

```mc
type Step : ExecutionContext -> ExecutionContext
```



<ToggleWrapper text="Code..">
```mc
type Step = ExecutionContext -> ExecutionContext
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="execContextNew" kind="let">

```mc
let execContextNew opt : DocGenOptions -> ExecutionContext
```



<ToggleWrapper text="Code..">
```mc
let execContextNew : DocGenOptions -> ExecutionContext = lam opt.
    if sysFileExists opt.file then
    {
        opt = opt,
        mainFile = opt.file,
        tokens = [],
        docTree = None {},
        object = None {},
        ast = None {}
    }
    else error (join ["The file ", opt.file, "doesn't exist."])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="crash" kind="let">

```mc
let crash miss func should : all a. String -> String -> String -> a
```



<ToggleWrapper text="Code..">
```mc
let crash = lam miss. lam func. lam should.
    error (join ["Execution context: ", miss, " is missing in the exection context, ", func, " function should be called after having call the ", should, " function."])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="buildLogger" kind="let">

```mc
let buildLogger ctx step : ExecutionContext -> String -> Logger
```



<ToggleWrapper text="Code..">
```mc
let buildLogger : ExecutionContext -> String -> Logger = lam ctx. lam step. if ctx.opt.debug then message "INFO" step else lam. ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="gen" kind="let">

```mc
let gen ctx : Step
```



<ToggleWrapper text="Code..">
```mc
let gen : Step = lam ctx.
    let log = buildLogger ctx "MExpr Generation" in
    { ctx with ast = Some (buildMAstFromFile log ctx.mainFile) }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parse" kind="let">

```mc
let parse ctx : Step
```



<ToggleWrapper text="Code..">
```mc
let parse : Step =  lam ctx.
    match ctx.ast with Some ast then
    let log = buildLogger ctx "Parsing" in
    { ctx with docTree = Some (parse log ctx.mainFile ast ) }
    else crash "ast" "parse" "gen"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extract" kind="let">

```mc
let extract ctx : Step
```



<ToggleWrapper text="Code..">
```mc
let extract : Step =  lam ctx.
    match ctx.docTree with Some docTree then
    let log = buildLogger ctx "Extracting" in 
    { ctx with object = Some (extract log docTree ctx.opt.letDepth ) }
    else crash "doc tree" "extract" "parse"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="label" kind="let">

```mc
let label ctx : Step
```



<ToggleWrapper text="Code..">
```mc
let label : Step =  lam ctx.
    match (ctx.object, ctx.ast) with (Some object, Some ast) then
    let log = buildLogger ctx "Labeling" in    
    { ctx with object = Some (label log object ast) }
    else crash "object" "label" "extract"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="render" kind="let">

```mc
let render ctx : Step
```



<ToggleWrapper text="Code..">
```mc
let render : Step =  lam ctx.
    match ctx.object with Some obj then
    let log = buildLogger ctx "Rendering" in 
    let opt = getRenderingOption ctx.opt log in
    render opt obj; ctx
    else crash "object" "render" "label (or extract)"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="serve" kind="let">

```mc
let serve ctx : Step
```



<ToggleWrapper text="Code..">
```mc
let serve : Step = use ObjectsRenderer in lam ctx.
    match ctx.object with Some obj then
    let log = buildLogger ctx "Serving" in
    let opt = getRenderingOption ctx.opt log in
    let link = objLink (objTreeObj obj) opt in
    let opt = getServeOption ctx.opt link in    
    startServer opt; ctx
    else crash "object" "serve" "render"
```
</ToggleWrapper>
</DocBlock>

