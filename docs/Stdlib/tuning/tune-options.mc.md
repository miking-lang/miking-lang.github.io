import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# tune-options.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/assoc.mc"} style={S.link}>assoc.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>, <a href={"/docs/Stdlib/ext/toml-ext.mc"} style={S.link}>ext/toml-ext.mc</a>  
  
## Types  
  

          <DocBlock title="SearchMethod" kind="type">

```mc
type SearchMethod
```



<ToggleWrapper text="Code..">
```mc
type SearchMethod
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TuneOptions" kind="type">

```mc
type TuneOptions : { verbose: Bool, iters: Int, timeoutMs: Option Float, warmups: Int, method: SearchMethod, args: [String], epsilonMs: Float, stepSize: Int, ignoreErrors: Bool, exitEarly: Bool, seed: Option Int, dependencyAnalysis: Bool, cleanup: Bool, debugDependencyAnalysis: Bool, debugInstrumentation: Bool, debugExpansion: Bool, reduceDependencies: Float, printStats: Bool }
```

<Description>{`Options for tuning`}</Description>


<ToggleWrapper text="Code..">
```mc
type TuneOptions =
{ verbose : Bool
, iters : Int
, timeoutMs : Option Float
, warmups : Int
, method : SearchMethod
, args : [String]
, epsilonMs : Float
, stepSize : Int
, ignoreErrors : Bool
, exitEarly : Bool
, seed : Option Int
, dependencyAnalysis : Bool
, cleanup : Bool
, debugDependencyAnalysis : Bool
, debugInstrumentation : Bool
, debugExpansion : Bool
, reduceDependencies : Float
, printStats : Bool
}
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="Exhaustive" kind="con">

```mc
con Exhaustive : () -> SearchMethod
```



<ToggleWrapper text="Code..">
```mc
con Exhaustive         : () -> SearchMethod
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="tuneSearchMethodMap" kind="let">

```mc
let tuneSearchMethodMap  : [(String, SearchMethod)]
```



<ToggleWrapper text="Code..">
```mc
let tuneSearchMethodMap =
[ ("exhaustive", Exhaustive ())
]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneOptionsDefault" kind="let">

```mc
let tuneOptionsDefault  : TuneOptions
```

<Description>{`Default options`}</Description>


<ToggleWrapper text="Code..">
```mc
let tuneOptionsDefault : TuneOptions =
{ verbose = false
, iters = 10
, timeoutMs = None ()
, warmups = 1
, method = Exhaustive ()
, args = []
, epsilonMs = 10.0
, stepSize = 1
, ignoreErrors = false
, exitEarly = true
, seed = None ()
, dependencyAnalysis = true
, debugDependencyAnalysis = false
, debugInstrumentation = false
, debugExpansion = false
, reduceDependencies = 0.0
, cleanup = false
, printStats = false
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneOptionsFromToml" kind="let">

```mc
let tuneOptionsFromToml default tomlString : TuneOptions -> String -> TuneOptions
```



<ToggleWrapper text="Code..">
```mc
let tuneOptionsFromToml: TuneOptions -> String -> TuneOptions =
  lam default. lam tomlString.
    let toml = tomlBindings (tomlFromStringExn tomlString) in
    foldl (lam acc. lam bind: (String, TomlValue).
      match bind with (k,v) in
      switch k
      case "verbose" then {acc with verbose = tomlValueToBoolExn v}
      case "iters" then {acc with iters = tomlValueToIntExn v}
      case "timeoutMs" then {acc with timeoutMs = Some (tomlValueToFloatExn v)}
      case "warmups" then {acc with warmups = tomlValueToIntExn v}
      case "method" then
        let method = tomlValueToStringExn v in
        {acc with method = optionGetOrElse
          (lam. error (concat "Unknown method: " method))
          (assocLookup {eq=eqString} method tuneSearchMethodMap)}
      case "args" then {acc with args = tomlValueToStringSeqExn v}
      case "epsilonMs" then {acc with epsilonMs = tomlValueToFloatExn v}
      case "stepSize" then {acc with stepSize = tomlValueToIntExn v}
      case "ignoreErrors" then {acc with ignoreErrors = tomlValueToBoolExn v}
      case "exitEarly" then {acc with exitEarly = tomlValueToBoolExn v}
      case "seed" then {acc with seed = Some (tomlValueToIntExn v)}
      case "dependencyAnalysis" then
        {acc with dependencyAnalysis = tomlValueToBoolExn v}
      case "debugDependencyAnalysis" then
        {acc with debugDependencyAnalysis = tomlValueToBoolExn v}
      case "debugInstrumentation" then
        {acc with debugInstrumentation = tomlValueToBoolExn v}
      case "debugExpansion" then
        {acc with debugExpansion = tomlValueToBoolExn v}
      case "reduceDependencies" then
        {acc with reduceDependencies = tomlValueToFloatExn v}
      case "cleanup" then {acc with cleanup = tomlValueToBoolExn v}
      case "printStats" then {acc with printStats = tomlValueToBoolExn v}
      case key then error (concat "Unknown option: " key)
      end
    ) default toml
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

utest tuneOptionsFromToml tuneOptionsDefault
"
verbose = true
iters = 3
timeoutMs = 0.1
method = \"exhaustive\"
args = [\"3000 3 1\", \"20000 3 2\"]
epsilonMs = 1.0
stepSize = 102
ignoreErrors = true
exitEarly = false
seed = 42
dependencyAnalysis = false
debugDependencyAnalysis = true
debugInstrumentation = true
debugExpansion = false
reduceDependencies = 10.0
cleanup = true
printStats = true
"
with
{ verbose = true
, iters = 3
, timeoutMs = Some 0.1
, warmups = 1
, method = Exhaustive ()
, args = ["3000 3 1", "20000 3 2"]
, epsilonMs = 1.0
, stepSize = 102
, ignoreErrors = true
, exitEarly = false
, seed = Some 42
, dependencyAnalysis = false
, debugDependencyAnalysis = true
, debugInstrumentation = true
, debugExpansion = false
, reduceDependencies = 10.0
, cleanup = true
, printStats = true
}
in
()
```
</ToggleWrapper>
</DocBlock>

