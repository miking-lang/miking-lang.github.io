import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# optparse-applicative.mc  
  

This file implements an argument parser using an applicative  
interface, inspired by \(but with many less features than\)  
https://hackage.haskell.org/package/optparse\-applicative

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>, <a href={"/docs/Stdlib/either.mc"} style={S.link}>either.mc</a>, <a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Types  
  

          <DocBlock title="OptName" kind="type">

```mc
type OptName
```



<ToggleWrapper text="Code..">
```mc
type OptName
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptReader" kind="type">

```mc
type OptReader
```



<ToggleWrapper text="Code..">
```mc
type OptReader a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptItem" kind="type">

```mc
type OptItem
```



<ToggleWrapper text="Code..">
```mc
type OptItem a =
  { reader : OptReader a
  , shortForm : String
  , description : String
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptParser" kind="type">

```mc
type OptParser
```



<ToggleWrapper text="Code..">
```mc
type OptParser a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParserSearchRet" kind="type">

```mc
type ParserSearchRet
```



<ToggleWrapper text="Code..">
```mc
type ParserSearchRet r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptParseMode" kind="type">

```mc
type OptParseMode
```



<ToggleWrapper text="Code..">
```mc
type OptParseMode
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptMissing" kind="type">

```mc
type OptMissing
```



<ToggleWrapper text="Code..">
```mc
type OptMissing
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptParseResult" kind="type">

```mc
type OptParseResult
```



<ToggleWrapper text="Code..">
```mc
type OptParseResult a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DescTree" kind="type">

```mc
type DescTree
```



<ToggleWrapper text="Code..">
```mc
type DescTree
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptDesc" kind="type">

```mc
type OptDesc : { shortForm: String, description: String }
```



<ToggleWrapper text="Code..">
```mc
type OptDesc = {shortForm : String, description : String}
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="OptShort" kind="con">

```mc
con OptShort : Char -> OptName
```



<ToggleWrapper text="Code..">
```mc
con OptShort : Char -> OptName
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptLong" kind="con">

```mc
con OptLong : String -> OptName
```



<ToggleWrapper text="Code..">
```mc
con OptLong : String -> OptName
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptWithArg" kind="con">

```mc
con OptWithArg : all a . { names: [OptName], parse: String -> Either String a } -> OptReader a
```



<ToggleWrapper text="Code..">
```mc
con OptWithArg : all a. {names : [OptName], parse : String -> Either String a} -> OptReader a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptNoArg" kind="con">

```mc
con OptNoArg : all a . { names: [OptName], value: a } -> OptReader a
```



<ToggleWrapper text="Code..">
```mc
con OptNoArg : all a. {names : [OptName], value : a} -> OptReader a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptPositional" kind="con">

```mc
con OptPositional : all a . { parse: String -> Either String a } -> OptReader a
```



<ToggleWrapper text="Code..">
```mc
con OptPositional : all a. {parse : String -> Either String a} -> OptReader a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptWithSpecificArg" kind="con">

```mc
con OptWithSpecificArg : all a . { names: [OptName], parse: String -> Option a } -> OptReader a
```

<Description>{`NOTE\(vipa, 2025\-04\-11\): This kind of option is experimental, and  
notably absent from the original Haskell library. Normal options  
with arguments match regardless of the shape of their arguments,  
but can raise an error if the argument is malformed. A "Specific"  
option can check its argument to determine if it should match, but  
cannot raise an error if it is malformed. For example, given a  
"Specific" option with short name "\-x" that only matches the  
argument "true", means that the command line "\-x" raises "\-x  
requires an argument" and "\-x false" raises "unexpected option \-x".`}</Description>


<ToggleWrapper text="Code..">
```mc
con OptWithSpecificArg : all a. {names : [OptName], parse : String -> Option a} -> OptReader a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="NilP" kind="con">

```mc
con NilP : all a . a -> OptParser a
```



<ToggleWrapper text="Code..">
```mc
con NilP : all a. a -> OptParser a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptP" kind="con">

```mc
con OptP : all a . OptItem a -> OptParser a
```



<ToggleWrapper text="Code..">
```mc
con OptP : all a. OptItem a -> OptParser a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AltP" kind="con">

```mc
con AltP : all a . (OptParser a, OptParser a) -> OptParser a
```



<ToggleWrapper text="Code..">
```mc
con AltP : all a. (OptParser a, OptParser a) -> OptParser a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MultP" kind="con">

```mc
con MultP : all x . all a . (OptParser (x -> a), OptParser x) -> OptParser a
```

<Description>{`NOTE\(vipa, 2025\-03\-26\): We don't actually handle existentials  
properly, when we pattern match on \`MultP\` the \`x\` will be  
instantiated to \*anything\*, instead of some unknowable type. Be  
\*very\* cautious when unwrapping it.`}</Description>


<ToggleWrapper text="Code..">
```mc
con MultP : all x. all a. (OptParser (x -> a), OptParser x) -> OptParser a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PSROk" kind="con">

```mc
con PSROk : all r . ([String], OptParser r) -> ParserSearchRet r
```



<ToggleWrapper text="Code..">
```mc
con PSROk : all r. ([String], OptParser r) -> ParserSearchRet r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PSRNotFound" kind="con">

```mc
con PSRNotFound : all r . () -> ParserSearchRet r
```



<ToggleWrapper text="Code..">
```mc
con PSRNotFound : all r. () -> ParserSearchRet r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PSRError" kind="con">

```mc
con PSRError : all r . String -> ParserSearchRet r
```



<ToggleWrapper text="Code..">
```mc
con PSRError : all r. String -> ParserSearchRet r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OPMBoth" kind="con">

```mc
con OPMBoth : () -> OptParseMode
```



<ToggleWrapper text="Code..">
```mc
con OPMBoth : () -> OptParseMode
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OPMPositional" kind="con">

```mc
con OPMPositional : () -> OptParseMode
```



<ToggleWrapper text="Code..">
```mc
con OPMPositional : () -> OptParseMode
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptMissingOpt" kind="con">

```mc
con OptMissingOpt : String -> OptMissing
```



<ToggleWrapper text="Code..">
```mc
con OptMissingOpt : String -> OptMissing
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptMissingMult" kind="con">

```mc
con OptMissingMult : [OptMissing] -> OptMissing
```



<ToggleWrapper text="Code..">
```mc
con OptMissingMult : [OptMissing] -> OptMissing
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptMissingAlt" kind="con">

```mc
con OptMissingAlt : [OptMissing] -> OptMissing
```



<ToggleWrapper text="Code..">
```mc
con OptMissingAlt : [OptMissing] -> OptMissing
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptParseOk" kind="con">

```mc
con OptParseOk : all a . a -> OptParseResult a
```



<ToggleWrapper text="Code..">
```mc
con OptParseOk : all a. a -> OptParseResult a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptParseMissing" kind="con">

```mc
con OptParseMissing : all a . OptMissing -> OptParseResult a
```



<ToggleWrapper text="Code..">
```mc
con OptParseMissing : all a. OptMissing -> OptParseResult a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OptParseError" kind="con">

```mc
con OptParseError : all a . String -> OptParseResult a
```



<ToggleWrapper text="Code..">
```mc
con OptParseError : all a. String -> OptParseResult a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DescTreeOpt" kind="con">

```mc
con DescTreeOpt : OptDesc -> DescTree
```



<ToggleWrapper text="Code..">
```mc
con DescTreeOpt : OptDesc -> DescTree
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DescTreeMult" kind="con">

```mc
con DescTreeMult : [DescTree] -> DescTree
```



<ToggleWrapper text="Code..">
```mc
con DescTreeMult : [DescTree] -> DescTree
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DescTreeAlt" kind="con">

```mc
con DescTreeAlt : { alts: [DescTree], optional: Bool } -> DescTree
```



<ToggleWrapper text="Code..">
```mc
con DescTreeAlt : {alts : [DescTree], optional : Bool} -> DescTree
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="eqOptName" kind="let">

```mc
let eqOptName a b : OptName -> OptName -> Bool
```



<ToggleWrapper text="Code..">
```mc
let eqOptName : OptName -> OptName -> Bool
  = lam a. lam b. switch (a, b)
    case (OptShort a, OptShort b) then eqc a b
    case (OptLong a, OptLong b) then eqString a b
    case _ then false
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optNameToStr" kind="let">

```mc
let optNameToStr a : OptName -> String
```



<ToggleWrapper text="Code..">
```mc
let optNameToStr : OptName -> String
  = lam a. switch a
    case OptShort c then ['-', c]
    case OptLong str then concat "--" str
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optPure" kind="let">

```mc
let optPure a : all a. a -> OptParser a
```



<ToggleWrapper text="Code..">
```mc
let optPure
  : all a. a -> OptParser a
  = lam a. NilP a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optApply" kind="let">

```mc
let optApply f a : all a. all b. OptParser (a -> b) -> OptParser a -> OptParser b
```



<ToggleWrapper text="Code..">
```mc
let optApply
  : all a. all b. OptParser (a -> b) -> OptParser a -> OptParser b
  = lam f. lam a.
    MultP (f, a)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optOr" kind="let">

```mc
let optOr a b : all a. OptParser a -> OptParser a -> OptParser a
```



<ToggleWrapper text="Code..">
```mc
let optOr
  : all a. OptParser a -> OptParser a -> OptParser a
  = lam a. lam b. AltP (a, b)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_optItemMap" kind="let">

```mc
let _optItemMap f o : all a. all b. (a -> b) -> OptItem a -> OptItem b
```



<ToggleWrapper text="Code..">
```mc
let _optItemMap : all a. all b. (a -> b) -> OptItem a -> OptItem b
  = lam f. lam o.
    { reader = switch o.reader
      case OptWithArg x then
        OptWithArg {names = x.names, parse = lam s. eitherMapRight f (x.parse s)}
      case OptWithSpecificArg x then
        OptWithSpecificArg {names = x.names, parse = lam s. optionMap f (x.parse s)}
      case OptNoArg x then
        OptNoArg {names = x.names, value = f x.value}
      case OptPositional x then
        OptPositional {parse = lam s. eitherMapRight f (x.parse s)}
      end
    , shortForm = o.shortForm
    , description = o.description
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optMap2" kind="let">

```mc
let optMap2 f a b : all a. all b. all c. (a -> b -> c) -> OptParser a -> OptParser b -> OptParser c
```



<ToggleWrapper text="Code..">
```mc
let optMap2
  : all a. all b. all c. (a -> b -> c) -> OptParser a -> OptParser b -> OptParser c
  = lam f. lam a. lam b. optApply (optMap f a) b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optMap3" kind="let">

```mc
let optMap3 f a b c : all a. all b. all c. all d. (a -> b -> c -> d) -> OptParser a -> OptParser b -> OptParser c -> OptParser d
```



<ToggleWrapper text="Code..">
```mc
let optMap3
  : all a. all b. all c. all d. (a -> b -> c -> d) -> OptParser a -> OptParser b -> OptParser c -> OptParser d
  = lam f. lam a. lam b. lam c. optApply (optApply (optMap f a) b) c
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optMap4" kind="let">

```mc
let optMap4 f a b c d : all a. all b. all c. all d. all e. (a -> b -> c -> d -> e) -> OptParser a -> OptParser b -> OptParser c -> OptParser d -> OptParser e
```



<ToggleWrapper text="Code..">
```mc
let optMap4
  : all a. all b. all c. all d. all e. (a -> b -> c -> d -> e) -> OptParser a -> OptParser b -> OptParser c -> OptParser d -> OptParser e
  = lam f. lam a. lam b. lam c. lam d. optApply (optApply (optApply (optMap f a) b) c) d
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optMap5" kind="let">

```mc
let optMap5 f a b c d e : all a. all b. all c. all d. all e. all f. (a -> b -> c -> d -> e -> f) -> OptParser a -> OptParser b -> OptParser c -> OptParser d -> OptParser e -> OptParser f
```



<ToggleWrapper text="Code..">
```mc
let optMap5
  : all a. all b. all c. all d. all e. all f. (a -> b -> c -> d -> e -> f) -> OptParser a -> OptParser b -> OptParser c -> OptParser d -> OptParser e -> OptParser f
  = lam f. lam a. lam b. lam c. lam d. lam e. optApply (optApply (optApply (optApply (optMap f a) b) c) d) e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optArgDef" kind="let">

```mc
let optArgDef  : all x. {arg: String, long: String, parse: String -> x, short: String, description: String}
```



<ToggleWrapper text="Code..">
```mc
let optArgDef : all x. {long : String, short : String, parse : String -> x, arg : String, description : String} =
  { long = ""
  , short = ""
  , parse = lam. error "No parser specified for optArgDef"
  , arg = "ARG"
  , description = ""
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optArgDefString" kind="let">

```mc
let optArgDefString  : all a. {arg: String, long: String, parse: String -> Either a String, short: String, description: String}
```



<ToggleWrapper text="Code..">
```mc
let optArgDefString =
  { optArgDef with parse = lam str.
    Right str
  , arg = "ARG"
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optArgDefInt" kind="let">

```mc
let optArgDefInt  : {arg: String, long: String, parse: String -> Either String Int, short: String, description: String}
```



<ToggleWrapper text="Code..">
```mc
let optArgDefInt =
  { optArgDef with parse = lam str.
    if stringIsInt str then Right (string2int str) else Left "not an integer"
  , arg = "INT"
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optArgDefFloat" kind="let">

```mc
let optArgDefFloat  : {arg: String, long: String, parse: String -> Either String Float, short: String, description: String}
```



<ToggleWrapper text="Code..">
```mc
let optArgDefFloat =
  { optArgDef with parse = lam str.
    if stringIsFloat str then Right (string2float str) else Left "not a float"
  , arg = "FLOAT"
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optArg" kind="let">

```mc
let optArg conf : all a. {arg: String, long: String, parse: String -> Either String a, short: String, description: String} -> OptParser a
```



<ToggleWrapper text="Code..">
```mc
let optArg : all a. {long : String, short : String, parse : String -> Either String a, arg : String, description : String} -> OptParser a = lam conf.
  let names = map (lam c. OptShort c) conf.short in
  let names = if null conf.long
    then names
    else cons (OptLong conf.long) names in
  let shortForm = match names with [name] ++ _
    then join [optNameToStr name, " ", conf.arg]
    else error "optArg called with neither 'long' nor 'short'" in
  OptP
  { reader = OptWithArg
    { names = names
    , parse = conf.parse
    }
  , shortForm = shortForm
  , description = conf.description
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optExactArg" kind="let">

```mc
let optExactArg str : String -> {arg: String, long: String, parse: String -> Option (), short: String, description: String}
```



<ToggleWrapper text="Code..">
```mc
let optExactArg = lam str.
  { optArgDef with arg = str
  , parse = lam other.
    if eqString str other then Some () else None ()
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optSpecificArg" kind="let">

```mc
let optSpecificArg conf : all a. {arg: String, long: String, parse: String -> Option a, short: String, description: String} -> OptParser a
```



<ToggleWrapper text="Code..">
```mc
let optSpecificArg : all a. {long : String, short : String, parse : String -> Option a, arg : String, description : String} -> OptParser a = lam conf.
  let names = map (lam c. OptShort c) conf.short in
  let names = if null conf.long
    then names
    else cons (OptLong conf.long) names in
  let shortForm = match names with [name] ++ _
    then join [optNameToStr name, " ", conf.arg]
    else error "optSpecificArg called with neither 'long' nor 'short'" in
  OptP
  { reader = OptWithSpecificArg
    { names = names
    , parse = conf.parse
    }
  , shortForm = shortForm
  , description = conf.description
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optNoArgDef" kind="let">

```mc
let optNoArgDef value : all a. a -> {long: String, short: String, value: a, description: String}
```



<ToggleWrapper text="Code..">
```mc
let optNoArgDef : all a. a -> {long : String, short : String, value : a, description : String} = lam value.
  { long = ""
  , short = ""
  , value = value
  , description = ""
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optNoArg" kind="let">

```mc
let optNoArg conf : all a. {long: String, short: String, value: a, description: String} -> OptParser a
```



<ToggleWrapper text="Code..">
```mc
let optNoArg : all a. {long : String, short : String, value : a, description : String} -> OptParser a = lam conf.
  let names = map (lam c. OptShort c) conf.short in
  let names = if null conf.long
    then names
    else cons (OptLong conf.long) names in
  let shortForm = match names with [name] ++ _
    then optNameToStr name
    else error "optNoArg called with neither 'long' nor 'short'" in
  OptP
  { reader = OptNoArg
    { names = names
    , value = conf.value
    }
  , shortForm = shortForm
  , description = conf.description
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optOptional" kind="let">

```mc
let optOptional o : all a. OptParser a -> OptParser (Option a)
```



<ToggleWrapper text="Code..">
```mc
let optOptional : all a. OptParser a -> OptParser (Option a)
  = lam o. optOr (optMap (lam x. Some x) o) (optPure (None ()))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optFlagDef" kind="let">

```mc
let optFlagDef  : all a. all a1. all a2. {long: [a1], short: [a2], description: [a]}
```



<ToggleWrapper text="Code..">
```mc
let optFlagDef =
  { long = ""
  , short = ""
  , description = ""
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optFlag" kind="let">

```mc
let optFlag conf : {long: String, short: String, description: String} -> OptParser Bool
```



<ToggleWrapper text="Code..">
```mc
let optFlag = lam conf.
  let names = map (lam c. OptShort c) conf.short in
  let names = if null conf.long
    then names
    else cons (OptLong conf.long) names in
  let shortForm = match names with [name] ++ _
    then optNameToStr name
    else error "optNoArg called with neither 'long' nor 'short'" in
  let present = OptP
    { reader = OptNoArg
      { names = names
      , value = true
      }
    , shortForm = shortForm
    , description = conf.description
    } in
  optOr present (optPure false)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optPosDef" kind="let">

```mc
let optPosDef  : all a. {arg: String, parse: String -> Either String a, description: String}
```



<ToggleWrapper text="Code..">
```mc
let optPosDef : all a. {parse : String -> Either String a, arg : String, description : String} =
  { parse = lam. error "No parse function given to optPosDef"
  , arg = "ARG"
  , description = ""
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optPosDefString" kind="let">

```mc
let optPosDefString  : {arg: String, parse: String -> Either String String, description: String}
```



<ToggleWrapper text="Code..">
```mc
let optPosDefString =
  { optPosDef with parse = lam str. Right str
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optPos" kind="let">

```mc
let optPos conf : all a. {arg: String, parse: String -> Either String a, description: String} -> OptParser a
```



<ToggleWrapper text="Code..">
```mc
let optPos : all a. {parse : String -> Either String a, arg : String, description : String} -> OptParser a
  = lam conf. OptP
    { reader = OptPositional {parse = conf.parse}
    , shortForm = conf.arg
    , description = conf.description
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_processOpt" kind="let">

```mc
let _processOpt name args item : all r. OptName -> [String] -> OptItem r -> ParserSearchRet r
```



<ToggleWrapper text="Code..">
```mc
let _processOpt : all r. OptName -> [String] -> OptItem r -> ParserSearchRet r
  = lam name. lam args. lam item. switch item.reader
    case OptWithArg x then
      if seqMem eqOptName x.names name then
        match args with [arg] ++ args then
          switch x.parse arg
          case Left err then
            PSRError (join ["Option '", optNameToStr name, "' was given a malformed argument: ", err])
          case Right a then
            PSROk (args, NilP a)
          end
        else PSRError (join ["Option '", optNameToStr name, "' requires an argument."])
      else PSRNotFound ()
    case OptWithSpecificArg x then
      if seqMem eqOptName x.names name then
        match args with [arg] ++ args then
          match x.parse arg with Some a then
            PSROk (args, NilP a)
          else PSRNotFound ()
        else PSRError (join ["Option '", optNameToStr name, "' requires an argument."])
      else PSRNotFound ()
    case OptNoArg x then
      if seqMem eqOptName x.names name then
        PSROk (args, NilP x.value)
      else PSRNotFound ()
    case OptPositional _ then
      PSRNotFound ()
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_processPos" kind="let">

```mc
let _processPos arg args item : all r. String -> [String] -> OptItem r -> ParserSearchRet r
```



<ToggleWrapper text="Code..">
```mc
let _processPos : all r. String -> [String] -> OptItem r -> ParserSearchRet r
  = lam arg. lam args. lam item. switch item.reader
    case OptPositional x then
      switch x.parse arg
      case Left err then
        PSRError (join ["Could not parse positional argument: ", err])
      case Right a then
        PSROk (args, NilP a)
      end
    case OptWithArg _ | OptWithSpecificArg _ | OptNoArg _ then
      PSRNotFound ()
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_optStepParser" kind="let">

```mc
let _optStepParser mode arg args p : all a. OptParseMode -> String -> [String] -> OptParser a -> (OptParseMode, ParserSearchRet a)
```



<ToggleWrapper text="Code..">
```mc
let _optStepParser
  : all a. OptParseMode -> String -> [String] -> OptParser a -> (OptParseMode, ParserSearchRet a)
  = lam mode. lam arg. lam args. lam p.
    switch (mode, arg)
    case (OPMBoth _, "--") then (OPMPositional (), PSROk (args, p))
    case (OPMBoth _, "--" ++ long) then
      let name = OptLong long in
      let f = lam item. _processOpt name args item in
      (mode, _searchParser #frozen"f" p)
    case (OPMBoth _, "-" ++ shorts) then
      recursive let work = lam args. lam p. lam names.
        match names with [n] ++ names then
          let name = OptShort n in
          let f = lam item. _processOpt name args item in
          switch _searchParser #frozen"f" p
          case PSROk (args, p) then work args p names
          case res & (PSRError _ | PSRNotFound _) then res
          end
        else PSROk (args, p)
      in
      (mode, work args p shorts)
    case (_, positional) then
      let f = lam item. _processPos positional args item in
      (mode, _searchParser #frozen"f" p)
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_optMissingMult" kind="let">

```mc
let _optMissingMult a b : OptMissing -> OptMissing -> OptMissing
```



<ToggleWrapper text="Code..">
```mc
let _optMissingMult : OptMissing -> OptMissing -> OptMissing
  = lam a. lam b. switch (a, b)
    case (OptMissingMult [], x) | (x, OptMissingMult []) then x
    case (OptMissingMult as, OptMissingMult bs) then OptMissingMult (concat as bs)
    case (OptMissingMult as, a) then OptMissingMult (snoc as a)
    case (b, OptMissingMult bs) then OptMissingMult (cons b bs)
    case (a, b) then OptMissingMult [a, b]
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_optMissingAlt" kind="let">

```mc
let _optMissingAlt a b : OptMissing -> OptMissing -> OptMissing
```



<ToggleWrapper text="Code..">
```mc
let _optMissingAlt : OptMissing -> OptMissing -> OptMissing
  = lam a. lam b. switch (a, b)
    case (OptMissingAlt as, OptMissingAlt bs) then OptMissingAlt (concat as bs)
    case (OptMissingAlt as, a) then OptMissingAlt (snoc as a)
    case (b, OptMissingAlt bs) then OptMissingAlt (cons b bs)
    case (a, b) then OptMissingAlt [a, b]
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optParse" kind="let">

```mc
let optParse p args : all a. all w. OptParser a -> [String] -> Either String a
```



<ToggleWrapper text="Code..">
```mc
let optParse
  : all a. all w. OptParser a -> [String] -> Either String a
  = lam p. lam args.
    recursive let work = lam mode. lam args. lam p.
      match args with [arg] ++ args then
        switch _optStepParser mode arg args p
        case (mode, PSROk (args, p)) then
          work mode args p
        case (_, PSRNotFound _) then
          Left (join ["Unexpected argument '", arg, "'"])
        case (_, PSRError err) then
          Left err
        end
      else switch optParserEval p
        case Left missing then
          Left (concat "Missing argument(s):\n" (_optMissingToString missing))
        case Right a then
          Right a
        end
    in work (OPMBoth ()) args p
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_optDescTreeMult" kind="let">

```mc
let _optDescTreeMult a b : DescTree -> DescTree -> DescTree
```



<ToggleWrapper text="Code..">
```mc
let _optDescTreeMult : DescTree -> DescTree -> DescTree
  = lam a. lam b. switch (a, b)
    case (DescTreeMult [], dt) | (dt, DescTreeMult []) then dt
    case (DescTreeMult as, DescTreeMult bs) then DescTreeMult (concat as bs)
    case (DescTreeMult as, a) then DescTreeMult (snoc as a)
    case (b, DescTreeMult bs) then DescTreeMult (cons b bs)
    case (a, b) then DescTreeMult [a, b]
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_optDescTreeAlt" kind="let">

```mc
let _optDescTreeAlt a b : DescTree -> DescTree -> DescTree
```



<ToggleWrapper text="Code..">
```mc
let _optDescTreeAlt : DescTree -> DescTree -> DescTree
  = lam a. lam b. switch (a, b)
    case (DescTreeAlt as, DescTreeAlt bs) then
      DescTreeAlt {alts = concat as.alts bs.alts, optional = or as.optional bs.optional}
    case (DescTreeAlt as, a) then
      DescTreeAlt {as with alts = snoc as.alts a}
    case (b, DescTreeAlt bs) then
      DescTreeAlt {bs with alts = cons b bs.alts}
    case (a, b) then
      DescTreeAlt {alts = [a, b], optional = false}
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_optDescSplitOnce" kind="let">

```mc
let _optDescSplitOnce dt : DescTree -> [DescTree]
```



<ToggleWrapper text="Code..">
```mc
let _optDescSplitOnce : DescTree -> [DescTree]
  = lam dt. switch dt
    case DescTreeOpt _ then [dt]
    case DescTreeMult dts then
      let f : all a. ([a], [a]) -> Option (([a], a, [a]), ([a], [a])) = lam split.
        match split with (pre ++ [here], rest)
        then Some ((pre, here, rest), (pre, cons here rest))
        else None () in
      let complexity = lam dt. match dt with DescTreeAlt {alts = alts}
        then foldl muli 1 (map (lam dt. match dt with DescTreeMult dts then length dts else 1) alts)
        else 1 in
      let foci = unfoldr f (dts, []) in
      let foci = map (lam x. (complexity x.1, x)) foci in
      let mostComplex = max (lam a. lam b. subi a.0 b.0) foci in
      match mostComplex with Some (_, (pre, here, post)) in
      let here = match here with DescTreeAlt x
        then if x.optional then cons (DescTreeMult []) x.alts else x.alts
        else [here] in
      let pre = DescTreeMult pre in
      let post = DescTreeMult post in
      map (lam here. _optDescTreeMult (_optDescTreeMult pre here) post) here
    case DescTreeAlt x then
      if x.optional then cons (DescTreeMult []) x.alts else x.alts
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optMap" kind="let">

```mc
let optMap f p : all a. all b. (a -> b) -> OptParser a -> OptParser b
```



<ToggleWrapper text="Code..">
```mc
let optMap
  : all a. all b. (a -> b) -> OptParser a -> OptParser b
  = lam f. lam p. switch p
    case NilP o then NilP (f o)
    case OptP o then OptP (_optItemMap f o)
    case AltP (a, b) then AltP (optMap f a, optMap f b)
    case MultP (a, b) then
      -- NOTE(vipa, 2025-03-26): Emulate an existential type by
      -- creating a new empty type
      type Never in
      let a : OptParser (Never -> a) = a in
      MultP (optMap (lam f2. lam x. f (f2 x)) a, b)
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optParserHelpText" kind="let">

```mc
let optParserHelpText appName bigDescription p : all a. String -> String -> OptParser a -> String
```



<ToggleWrapper text="Code..">
```mc
let optParserHelpText : all a. String -> String -> OptParser a -> String
  = lam appName. lam bigDescription. lam p.
    let bigDescription = switch bigDescription
      case "" then ""
      case _ ++ "\n\n" then bigDescription
      case _ ++ "\n" then snoc bigDescription '\n'
      case _ then concat bigDescription "\n\n"
      end in
    let dt = _describeTree p in

    let options = _optDescGetDescs dt in
    -- OPT(vipa, 2025-03-26): \\`distinct\\` is quadratic, could reduce to n log n
    let options = distinct (lam a. lam b. if eqString a.shortForm b.shortForm then eqString a.description b.description else false) options in
    let longest = foldl (lam acc. lam pair. maxi acc (length pair.shortForm)) 0 options in
    let padToLength = lam l. lam str. concat str (make (subi l (length str)) ' ') in
    let optToStr = lam pair. join ["  ", padToLength longest pair.shortForm, " ", pair.description] in
    let options = strJoin "\n" (map optToStr options) in

    let dt = _optDescTreeRemoveUnconditionalOptional dt in
    let dts = optionMapOr [] _optDescSplitOnce dt in
    let shortUsage = strJoin "\n" (map (lam dt. join [appName, " ", _optDescTreeToString dt]) dts) in

    join [shortUsage, "\n\n", bigDescription, "Options:\n", options]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optParserWithHelp" kind="let">

```mc
let optParserWithHelp appName bigDescription p : all a. String -> String -> OptParser a -> OptParser (Either String a)
```



<ToggleWrapper text="Code..">
```mc
let optParserWithHelp : all a. String -> String -> OptParser a -> OptParser (Either String a)
  = lam appName. lam bigDescription. lam p.
    let help = optNoArg
      { optNoArgDef (Left (optParserHelpText appName bigDescription p)) with short = "h"
      , long = "help"
      } in
    optOr (optMap (lam x. Right x) p) help
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optParseWithHelp" kind="let">

```mc
let optParseWithHelp appName bigDescription p args : all a. String -> String -> OptParser a -> [String] -> a
```



<ToggleWrapper text="Code..">
```mc
let optParseWithHelp : all a. String -> String -> OptParser a -> [String] -> a
  = lam appName. lam bigDescription. lam p. lam args.
    let p = optParserWithHelp appName bigDescription p in
    switch optParse p args
    case Left err then
      printLn err;
      exit 1
    case Right (Left help) then
      printLn help;
      exit 0
    case Right (Right res) then
      res
    end
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

type Example in
con Ex1 : {shared : Int, opt1 : Bool, extra : Bool} -> Example in
con Ex2 : {shared : Int, opt2 : Int} -> Example in

let shared : OptParser Int = optArg
  { optArgDef with
    long = "shared"
  , short = "s"
  , parse = lam s.
    if stringIsInt s then Right (string2int s) else Left "not an integer"
  , arg = "INT"
  , description = "shared is a thing"
  } in
let parseEx1 : OptParser Example =
  let mk = lam shared. lam opt1. lam extra. Ex1 {shared = shared, opt1 = opt1, extra = extra} in
  let opt1 : OptParser Bool = optNoArg
    { optNoArgDef true with
      long = "opt1"
    , description = "opt1 is here"
    } in
  let opt1 : OptParser Bool = optOr opt1 (optPure false) in
  let extra = optFlag {optFlagDef with long = "extra", description = "extra extra"} in
  optMap3 mk shared opt1 extra in
let parseEx2 : OptParser Example =
  let mk = lam shared. lam opt2. Ex2 {shared = shared, opt2 = opt2} in
  let yes : OptParser Int = optNoArg
    { optNoArgDef 0 with
      long = "yes"
    , description = "yes yes"
    } in
  let no : OptParser Int = optNoArg
    { optNoArgDef 1 with
      long = "no"
    , description = "no no"
    } in
  optApply (optMap mk shared) (optOr yes no) in

let thing : OptParser Float = optArg
  { optArgDef with
    long = "thing"
  , parse = lam s.
    if stringIsFloat s then Right (string2float s) else Left "not an float"
  , arg = "FLOAT"
  , description = "thing is a thing"
  } in

let filename : OptParser String = optPos {optPosDefString with arg = "FILENAME", description = "file and stuff"} in
let parser = optMap3 (lam a. lam b. lam c. (a, b, c)) (optOr parseEx1 parseEx2) thing (optOr filename (optPure "")) in

let test : [String] -> Either String (Example, Float, String)
  = lam args. optParse parser args in

utest test []
with Left "Missing argument(s):\n(--shared INT | --shared INT (--yes | --no)) --thing FLOAT" in

utest test ["--shared"]
with Left "Option '--shared' requires an argument." in

utest test ["--shared", "blue"]
with Left "Option '--shared' was given a malformed argument: not an integer" in

utest test ["--shared", "7", "--thing", "30"]
with Right ((Ex1 {opt1 = false, shared = 7, extra = false}), 30., "") in

utest test ["--shared", "7", "--opt1", "--thing", "30"]
with Right ((Ex1 {opt1 = true, shared = 7, extra = false}), 30., "") in

utest test ["--shared", "7", "file", "--opt1", "--thing", "30"]
with Right ((Ex1 {opt1 = true, shared = 7, extra = false}), 30., "file") in

utest test ["--opt1", "--shared", "7", "--thing", "30"]
with Right ((Ex1 {opt1 = true, shared = 7, extra = false}), 30., "") in

utest test ["--opt1"]
with Left "Missing argument(s):\n--shared INT --thing FLOAT" in

utest test ["--shared", "7", "--yes", "--thing", "30"]
with Right ((Ex2 {opt2 = 0, shared = 7}), 30., "") in

utest test ["--thing", "42.7", "--shared", "7", "--no"]
with Right ((Ex2 {opt2 = 1, shared = 7}), 42.7, "") in

utest test ["--shared", "7", "--no", "--opt1"]
with Left "Unexpected argument '--opt1'" in

let helpText = strJoin "\n"
  [ "test --shared INT [--opt1] [--extra] --thing FLOAT"
  , "test --shared INT (--yes | --no) --thing FLOAT"
  , ""
  , "This thing can do stuff."
  , ""
  , "Options:"
  , "  --shared INT  shared is a thing"
  , "  --opt1        opt1 is here"
  , "  --extra       extra extra"
  , "  --yes         yes yes"
  , "  --no          no no"
  , "  --thing FLOAT thing is a thing"
  , "  FILENAME      file and stuff"
  ] in
utest optParserHelpText "test" "This thing can do stuff." parser with helpText using eqString else lam l. lam. l in

let helpText = strJoin "\n"
  [ "test --shared INT [--opt1] [--extra] --thing FLOAT"
  , "test --shared INT (--yes | --no) --thing FLOAT"
  , ""
  , "Options:"
  , "  --shared INT  shared is a thing"
  , "  --opt1        opt1 is here"
  , "  --extra       extra extra"
  , "  --yes         yes yes"
  , "  --no          no no"
  , "  --thing FLOAT thing is a thing"
  , "  FILENAME      file and stuff"
  ] in
utest optParserHelpText "test" "" parser with helpText using eqString else lam l. lam. l in

()
```
</ToggleWrapper>
</DocBlock>

