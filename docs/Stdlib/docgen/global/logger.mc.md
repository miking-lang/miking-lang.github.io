import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# logger.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/global/util.mc"} style={S.link}>util.mc</a>, <a href={"/docs/Stdlib/docgen/global/format.mc"} style={S.link}>format.mc</a>  
  
## Types  
  

          <DocBlock title="Logger" kind="type">

```mc
type Logger : String -> ()
```



<ToggleWrapper text="Code..">
```mc
type Logger = String -> ()
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="message" kind="let">

```mc
let message kind namespace message : String -> String -> Logger
```

<Description>{`Print a log message with a given kind, namespace, and message.`}</Description>


<ToggleWrapper text="Code..">
```mc
let message : String -> String -> Logger = lam kind. lam namespace. lam message.
    printLn (join [kind, " from ", namespace, ": ", message])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="warn" kind="let">

```mc
let warn m1 m2 : String -> Logger
```

<Description>{`Display a warning message.`}</Description>


<ToggleWrapper text="Code..">
```mc
let warn : String -> Logger = lam m1. lam m2. message "WARNING" m1 m2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parsingWarn" kind="let">

```mc
let parsingWarn  : Logger
```



<ToggleWrapper text="Code..">
```mc
let parsingWarn : Logger = warn "Parsing"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extractingWarn" kind="let">

```mc
let extractingWarn  : Logger
```



<ToggleWrapper text="Code..">
```mc
let extractingWarn : Logger = warn "Extracting"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderingWarn" kind="let">

```mc
let renderingWarn  : Logger
```



<ToggleWrapper text="Code..">
```mc
let renderingWarn : Logger = warn "Rendering"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="labelingWarn" kind="let">

```mc
let labelingWarn  : Logger
```



<ToggleWrapper text="Code..">
```mc
let labelingWarn : Logger = warn "Labeling"
```
</ToggleWrapper>
</DocBlock>

