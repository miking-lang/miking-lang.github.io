import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# log.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>  
  
## Types  
  

          <DocBlock title="LogLevel" kind="type">

```mc
type LogLevel : Int
```



<ToggleWrapper text="Code..">
```mc
type LogLevel = Int
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="logLevel" kind="let">

```mc
let logLevel  : {off: Int, info: Int, debug: Int, error: Int, warning: Int}
```



<ToggleWrapper text="Code..">
```mc
let logLevel = {
  off = 0,
  error = 1,
  warning = 2,
  info = 3,
  debug = 4
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_logLevel" kind="let">

```mc
let _logLevel  : Ref Int
```

<Description>{`Reference to that keeps track of loglevel`}</Description>


<ToggleWrapper text="Code..">
```mc
let _logLevel = ref logLevel.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_logLevelToString" kind="let">

```mc
let _logLevelToString lvl : LogLevel -> String
```



<ToggleWrapper text="Code..">
```mc
let _logLevelToString = lam lvl : LogLevel.
  if eqi lvl logLevel.error then "ERROR"
  else if eqi lvl logLevel.warning then "WARNING"
  else if eqi lvl logLevel.info then "INFO"
  else if eqi lvl logLevel.debug then "DEBUG"
  else ""
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="logSetLogLevel" kind="let">

```mc
let logSetLogLevel lvl : LogLevel -> ()
```

<Description>{`Sets the log level`}</Description>


<ToggleWrapper text="Code..">
```mc
let logSetLogLevel = lam lvl : LogLevel. modref _logLevel lvl
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="logLevelPrinted" kind="let">

```mc
let logLevelPrinted lvl : Int -> Bool
```

<Description>{`Checks if given level is printed under the current log level`}</Description>


<ToggleWrapper text="Code..">
```mc
let logLevelPrinted = lam lvl. leqi lvl (deref _logLevel)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="logMsg" kind="let">

```mc
let logMsg lvl msg : LogLevel -> (() -> String) -> ()
```

<Description>{`\`log lvl msg\` logs the message \`msg\` at the log level \`lvl\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let logMsg = lam lvl : LogLevel. lam msg : () -> String.
  if eqi lvl logLevel.off then ()
  else if logLevelPrinted lvl then
    printError (join ["LOG ", _logLevelToString lvl, ":\t", msg (), "\n"]);
    flushStderr ()
  else ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="logInfo" kind="let">

```mc
let logInfo  : (() -> String) -> ()
```



<ToggleWrapper text="Code..">
```mc
let logInfo = logMsg logLevel.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="logError" kind="let">

```mc
let logError  : (() -> String) -> ()
```



<ToggleWrapper text="Code..">
```mc
let logError = logMsg logLevel.error
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="logWarning" kind="let">

```mc
let logWarning  : (() -> String) -> ()
```



<ToggleWrapper text="Code..">
```mc
let logWarning = logMsg logLevel.warning
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="logDebug" kind="let">

```mc
let logDebug  : (() -> String) -> ()
```



<ToggleWrapper text="Code..">
```mc
let logDebug = logMsg logLevel.debug
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr

-- logSetLogLevel logLevel.error;

-- logError "Some error!";
-- logWarning "Some warning!";
-- logInfo "Some info!";
-- logDebug "Some debug info!";

()
```
</ToggleWrapper>
</DocBlock>

