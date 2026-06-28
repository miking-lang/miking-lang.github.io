import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# arg.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
A simple and extensible library for command line  
argument parsing.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>, <a href={"/docs/Stdlib/char.mc"} style={S.link}>char.mc</a>, <a href={"/docs/Stdlib/math.mc"} style={S.link}>math.mc</a>  
  
## Types  
  

          <DocBlock title="ArgResult" kind="type">

```mc
type ArgResult
```



<ToggleWrapper text="Code..">
```mc
type ArgResult a = {
  strings : [String],
  options : a
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParseType" kind="type">

```mc
type ParseType
```



<ToggleWrapper text="Code..">
```mc
type ParseType
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ArgPart" kind="type">

```mc
type ArgPart
```



<ToggleWrapper text="Code..">
```mc
type ArgPart a = {
  options : a,
  fail : Ref (Option ParseType),
  str : String
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParseOption" kind="type">

```mc
type ParseOption : (String, String, String)
```



<ToggleWrapper text="Code..">
```mc
type ParseOption = (String, String, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParseConfig" kind="type">

```mc
type ParseConfig
```



<ToggleWrapper text="Code..">
```mc
type ParseConfig a = [([ParseOption], String, ArgPart a -> a)]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParseResult" kind="type">

```mc
type ParseResult
```



<ToggleWrapper text="Code..">
```mc
type ParseResult a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Options_argHelpOptions" kind="type">

```mc
type Options_argHelpOptions : { lineWidth: Int, indent: Int, spaceToText: Int }
```



<ToggleWrapper text="Code..">
```mc
type Options_argHelpOptions = {
  lineWidth : Int,
  indent : Int,
  spaceToText : Int
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Options_argParse" kind="type">

```mc
type Options_argParse : { args: [String], optionsStartWith: [String] }
```



<ToggleWrapper text="Code..">
```mc
type Options_argParse = {
  args : [String],
  optionsStartWith : [String]
}
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="ParseTypeInt" kind="con">

```mc
con ParseTypeInt : String -> ParseType
```



<ToggleWrapper text="Code..">
```mc
con ParseTypeInt : String -> ParseType
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParseTypeIntMin" kind="con">

```mc
con ParseTypeIntMin : (String, Int) -> ParseType
```



<ToggleWrapper text="Code..">
```mc
con ParseTypeIntMin : (String, Int) -> ParseType
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParseTypeFloat" kind="con">

```mc
con ParseTypeFloat : String -> ParseType
```



<ToggleWrapper text="Code..">
```mc
con ParseTypeFloat : String -> ParseType
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParseTypeFloatMin" kind="con">

```mc
con ParseTypeFloatMin : (String, Float) -> ParseType
```



<ToggleWrapper text="Code..">
```mc
con ParseTypeFloatMin : (String, Float) -> ParseType
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParseTypeFloatInterval" kind="con">

```mc
con ParseTypeFloatInterval : (String, Float, Float) -> ParseType
```



<ToggleWrapper text="Code..">
```mc
con ParseTypeFloatInterval : (String, Float, Float) -> ParseType
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParseTypeGeneric" kind="con">

```mc
con ParseTypeGeneric : (String, String) -> ParseType
```



<ToggleWrapper text="Code..">
```mc
con ParseTypeGeneric : (String, String) -> ParseType
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParseOK" kind="con">

```mc
con ParseOK : all a . ArgResult a -> ParseResult a
```



<ToggleWrapper text="Code..">
```mc
con ParseOK : all a. ArgResult a -> ParseResult a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParseFailUnknownOption" kind="con">

```mc
con ParseFailUnknownOption : all a . String -> ParseResult a
```



<ToggleWrapper text="Code..">
```mc
con ParseFailUnknownOption : all a. String -> ParseResult a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParseFailMissingOpArg" kind="con">

```mc
con ParseFailMissingOpArg : all a . String -> ParseResult a
```



<ToggleWrapper text="Code..">
```mc
con ParseFailMissingOpArg : all a. String -> ParseResult a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParseFailConversion" kind="con">

```mc
con ParseFailConversion : all a . (ParseType, String) -> ParseResult a
```



<ToggleWrapper text="Code..">
```mc
con ParseFailConversion : all a. (ParseType, String) -> ParseResult a
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="stringLineFormat" kind="let">

```mc
let stringLineFormat s width indent startPos : String -> Int -> Int -> Int -> String
```

<Description>{`Creates a new string with new lines, and breaks between words.  
Assumes that the string is currently at 'startPos', and  
also adds 'indent' number of spaces before the next line.`}</Description>


<ToggleWrapper text="Code..">
```mc
let stringLineFormat = lam s. lam width. lam indent. lam startPos.
  recursive
    let next = lam s. lam acc. lam w. lam pos. lam space.
      let pos = addi (length w) pos in
      if leqi pos width then
        let pos = addi pos (length space) in
        let acc = concat acc w in
        let acc = if leqi pos width then concat acc space else acc in
          work s acc [] pos
      else
        let acc = concat acc (cons '\n' (make indent ' ')) in
        let w = concat w space in
        work s (concat acc w) [] (addi indent (length w))
    let work = lam s. lam acc. lam w. lam pos.
      match s with [c] ++ rest then
        if eqChar c ' ' then
          next rest acc w pos " "
        else
          work rest acc (snoc w c) pos
      else
        if eqi (length w) 0 then acc
        else next s acc w pos ""
  in
    work s [] [] startPos
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argHelpOptions_defaults" kind="let">

```mc
let argHelpOptions_defaults  : {indent: Int, lineWidth: Int, spaceToText: Int}
```



<ToggleWrapper text="Code..">
```mc
let argHelpOptions_defaults = {
  lineWidth = 80,
  indent = 2,
  spaceToText = 2
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argHelpOptions_general" kind="let">

```mc
let argHelpOptions_general options opConfig : all a. Options_argHelpOptions -> ParseConfig a -> String
```



<ToggleWrapper text="Code..">
```mc
let argHelpOptions_general : all a.
  Options_argHelpOptions -> ParseConfig a -> String =
  lam options. lam opConfig.
  let opStrings = map (lam e.
    match e with (lst, _, _) then
      let s2 = map (lam triple. match triple with (s1,s2,s3) then join [s1,s2,s3] else never) lst in
      strJoin ", " s2
    else never) opConfig
  in
  let maxLen = foldl (lam acc. lam x. maxi (length x) acc) 0 opStrings in
  let opDesc = map (lam e. match e with (_, s, _) then s else never) opConfig in
  let f = lam x. lam desc.
    let start = join [make options.indent ' ', x,
                      make (addi (subi maxLen (length x)) options.spaceToText) ' '] in
    let before = addi (addi maxLen options.indent) options.spaceToText in
     let x = concat start (stringLineFormat desc options.lineWidth before before) in
     x
  in
    strJoin "\n" (zipWith f opStrings opDesc)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argHelpOptions" kind="let">

```mc
let argHelpOptions opConfig : all a. ParseConfig a -> String
```



<ToggleWrapper text="Code..">
```mc
let argHelpOptions = lam opConfig.
  argHelpOptions_general argHelpOptions_defaults opConfig
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argToString" kind="let">

```mc
let argToString p : all a. ArgPart a -> String
```



<ToggleWrapper text="Code..">
```mc
let argToString : all a. ArgPart a -> String = lam p.
  p.str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argToInt" kind="let">

```mc
let argToInt p : all a. ArgPart a -> Int
```



<ToggleWrapper text="Code..">
```mc
let argToInt : all a. ArgPart a -> Int = lam p.
  if stringIsInt p.str then string2int p.str
  else modref p.fail (Some (ParseTypeInt p.str)); 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argToFloat" kind="let">

```mc
let argToFloat p : all a. ArgPart a -> Float
```



<ToggleWrapper text="Code..">
```mc
let argToFloat : all a. ArgPart a -> Float = lam p.
  if stringIsFloat p.str then string2float p.str
  else modref p.fail (Some (ParseTypeFloat p.str)); 0.
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argToIntMin" kind="let">

```mc
let argToIntMin p minVal : all a. ArgPart a -> Int -> Int
```



<ToggleWrapper text="Code..">
```mc
let argToIntMin : all a. ArgPart a -> Int -> Int = lam p. lam minVal.
  let v = argToInt p in
  match deref p.fail with None () then
    if lti v minVal then
      modref p.fail (Some (ParseTypeIntMin (p.str, minVal))); v
    else
      v
  else
    v
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argToFloatMin" kind="let">

```mc
let argToFloatMin p minVal : all a. ArgPart a -> Float -> Float
```



<ToggleWrapper text="Code..">
```mc
let argToFloatMin : all a. ArgPart a -> Float -> Float = lam p. lam minVal.
  let v = argToFloat p in
  match deref p.fail with None () then
    if ltf v minVal then
      modref p.fail (Some (ParseTypeFloatMin (p.str, minVal))); v
    else
      v
  else
    v
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argToFloatInterval" kind="let">

```mc
let argToFloatInterval p minVal maxVal : all a. ArgPart a -> Float -> Float -> Float
```



<ToggleWrapper text="Code..">
```mc
let argToFloatInterval : all a. ArgPart a -> Float -> Float -> Float
  = lam p. lam minVal. lam maxVal.
  let v = argToFloat p in
  match deref p.fail with None () then
    if or (ltf v minVal) (gtf v maxVal) then
      modref p.fail (Some (ParseTypeFloatInterval (p.str, minVal, maxVal))); v
    else
      v
  else
    v
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argParse_defaults" kind="let">

```mc
let argParse_defaults  : {args: [String], optionsStartWith: [String]}
```



<ToggleWrapper text="Code..">
```mc
let argParse_defaults = {
  args = tail argv,
  optionsStartWith = ["-"]
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argParse_general" kind="let">

```mc
let argParse_general options argParseDefaults argParseConfig : all a. Options_argParse -> a -> ParseConfig a -> ParseResult a
```

<Description>{`Main argument parsing function.`}</Description>


<ToggleWrapper text="Code..">
```mc
let argParse_general : all a. Options_argParse -> a -> ParseConfig a -> ParseResult a =
  lam options : Options_argParse. lam argParseDefaults. lam argParseConfig.
  recursive
    -- Match one option
    let matchOption = lam str. lam confLst : ParseConfig a.
     match confLst with [(opLst, _, f)] ++ rest then
       match find (lam x. match x with (s, _, _)
                          then isPrefix eqChar s str else never) opLst
       with Some (s, sep, _)
       then Some (s, sep, f)
       else matchOption str rest
     else None ()
    -- Handle parsing of options
    let handleOptionParsing = lam f. lam o. lam opstr. lam s.
      let failCode = ref (None ()) in
      let argOptions = f {options = o, str = s, fail = failCode} in
      match deref failCode with Some pType then
        (Some (ParseFailConversion (pType, opstr)), argOptions)
      else
        (None (), argOptions)
    -- Main parsing loop
    let argMain = lam argOptions. lam strings. lam args.
      match args with [s] ++ xs then
        match matchOption s argParseConfig with Some (op, sep, f) then
          if eqi (length sep) 0 then
            -- No value to the option
            if eqString s op then
              let parse = handleOptionParsing f argOptions "" s in
              match parse with (Some ret, _) then
                ret
              else match parse with (None(), argOptions) then
                argMain argOptions strings xs
              else never
            else
              ParseFailUnknownOption s
          else
            -- TODO(davbr,2021-05-22): Add handling without space, e.g, "--foo=7"
            --                         and other separators than space
            if eqString s op then
              match xs with [s2] ++ xs then
                match matchOption s2 argParseConfig with Some _ then
                  ParseFailMissingOpArg s
                else
                  let parse = handleOptionParsing f argOptions s s2 in
                  match parse with (Some ret, _) then
                    ret
                  else match parse with (None(), argOptions) then
                    argMain argOptions strings xs
                  else never
              else
                 ParseFailMissingOpArg s
            else
              ParseFailUnknownOption s
        else
          if any (lam x. isPrefix eqChar x s) options.optionsStartWith then
            ParseFailUnknownOption s
          else
            -- Not an option, add to strings
            argMain argOptions (snoc strings s) xs
      else
        ParseOK {strings = strings, options = argOptions}
  in
    argMain argParseDefaults [] options.args
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argParse" kind="let">

```mc
let argParse  : _a -> ParseConfig _a -> ParseResult _a
```



<ToggleWrapper text="Code..">
```mc
let argParse = argParse_general argParse_defaults
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argPrintErrorString" kind="let">

```mc
let argPrintErrorString result : all a. ParseResult a -> String
```



<ToggleWrapper text="Code..">
```mc
let argPrintErrorString = lam result.
  switch result
  case ParseOK _ then
    "Parse OK."
  case ParseFailUnknownOption s then
    join ["Unknown option ", s, "."]
  case ParseFailMissingOpArg s then
    join ["Option ", s, " is missing an argument value."]
  case ParseFailConversion (ptype, s) then
    let receivedString = lam sval. join [", but received '", sval, "'."] in
    switch ptype
    case ParseTypeInt sval then
      join
        ["Option ", s, " expects an integer value", receivedString sval]
    case ParseTypeFloat sval then
      join ["Option ", s, " expects a float value", receivedString sval]
    case ParseTypeFloatMin (sval, minVal) then
      join ["Option ", s, " expects a float value of at least ",
            float2string minVal, receivedString sval]
    case ParseTypeFloatInterval (sval, minVal, maxVal) then
      join
        ["Option ", s, " expects a float value in the interval [",
         float2string minVal, ", ", float2string maxVal,
         "]", receivedString sval]
    case ParseTypeIntMin (sval, minVal) then
      join
        ["Option ", s, " expects an integer value of at least ",
         int2string minVal, receivedString sval]
    case ParseTypeGeneric (msg, sval) then join [msg, " '", sval, "'."]
    end
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="argPrintError" kind="let">

```mc
let argPrintError result : all a. all a1. ParseResult a -> a1
```



<ToggleWrapper text="Code..">
```mc
let argPrintError = lam result.
  error (join [argPrintErrorString result, "\n"])
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


let s1 = "This is a test that we can take a look at." in
let s2 = "This is a \n   test that we \n   can take a \n   look at." in
utest stringLineFormat s1 16 3 5 with s2 in
let s2 = "This is a test\n   that we can\n   take a look\n   at." in
utest stringLineFormat s1 14 3 0 with s2 in
let s2 = "This is a \n test that we\n can take a \n look at." in
utest stringLineFormat s1 13 1 0 with s2 in

type Options = {
  foo : Bool,
  fooExt : Bool,
  len : Int,
  message : String,
  real : Float,
  positiveReal : Float,
  intervalReal : Float,
  complex : (Float, Float)
} in

let default = {
  foo = false,
  fooExt = true,
  len = 7,
  message = "",
  real = 0.,
  positiveReal = 1.,
  intervalReal = 0.0,
  complex = (0., 0.)
} in

let config = [
  -- NOTE(2023-06-28,dlunde): We must handle the option "--foo-ext" before
  -- "--foo", as the latter is a prefix of the former. If we reverse their
  -- order in the config list, the parsing fails. Bug or feature?
  ([("--foo-ext", "", "")],
   "This is another boolean option. ",
   lam p. { p.options with fooExt = false }),
  ([("--foo", "", "")],
   "This is a boolean option. ",
   lam p. { p.options with foo = true }),
  ([("--len", " ", "<value>")],
   "A named argument followed by a space and then the integer value.",
   lam p. { p.options with len = argToIntMin p 1 }),
  ([("-m", " ", "<msg>"),("--message", " ", "<msg>")],
   "A string argument, with both short and long form arguments.",
   lam p. { p.options with message = argToString p }),
  ([("--real", " ", "<value>")],
   "A named argument followed by space and then the float value.",
   lam p. { p.options with real = argToFloat p }),
  ([("--positiveReal", " ", "<value>")],
   "A named argument followed by space and then the float value.",
   lam p. { p.options with positiveReal = argToFloatMin p 0. }),
  ([("--intervalReal", " ", "<value>")],
   "A named argument followed by space and then the float value.",
   lam p. { p.options with intervalReal = argToFloatInterval p 0. 1. }),
  ([("--complex", " ", "<value>")],
   "A complex argument with a custom parser and error message.",
   lam p.
     let strSplitTrim = lam delim. lam s. map strTrim (strSplit delim s) in
     match strSplitTrim "+i" p.str with [re, im] then
       if and (stringIsFloat re) (stringIsFloat im) then
         { p.options with complex = (string2float re, string2float im) }
       else
         modref
           p.fail
           (Some (ParseTypeGeneric ("Re or Im part not real in", p.str)));
         p.options
     else
       modref
         p.fail
         (Some
           (ParseTypeGeneric
             ("Could not identify Re and Im part in", p.str)));
       p.options)
] in

let testOptions = {
  argParse_defaults with
  args = [
    "file.mc",
    "--len", "12",
    "--foo",
    "--foo-ext",
    "-m",
    "mymsg",
    "--real", "1.",
    "--positiveReal", "1.",
    "--intervalReal", "0.1",
    "--complex", "1+i2",
    "f2"
  ]
} in
let argParseCustom = argParse_general testOptions in
let res : ArgResult Options =
  let r = argParseCustom default config in
  match r with ParseOK r then r
  else argPrintError r
in
let opt : Options = res.options in
utest res.strings with ["file.mc", "f2"] using eqSeq eqString in
utest opt.foo with true in
utest opt.fooExt with false in
utest opt.message with "mymsg" in
utest opt.len with 12 in

let testOptions = {argParse_defaults with args = ["--len", "noInt"]} in
let res = argParse_general testOptions default config in
utest res with ParseFailConversion (ParseTypeInt ("noInt"), "--len") in
utest argPrintErrorString res with
  "Option --len expects an integer value, but received 'noInt'."
in

let testOptions = {argParse_defaults with args = ["--real", "noFloat"]} in
let res = argParse_general testOptions default config in
utest res with ParseFailConversion (ParseTypeFloat ("noFloat"), "--real") in
utest argPrintErrorString res with
  "Option --real expects a float value, but received 'noFloat'."
in

let testOptions =
  {argParse_defaults with args = ["--positiveReal", "noFloat"]}
in
let res = argParse_general testOptions default config in
utest res with
  ParseFailConversion (ParseTypeFloat ("noFloat"), "--positiveReal")
in
utest argPrintErrorString res with
  "Option --positiveReal expects a float value, but received 'noFloat'."
in

let testOptions =
  {argParse_defaults with args = ["--positiveReal", "-1."]}
in
let res = argParse_general testOptions default config in
utest res with
  ParseFailConversion (ParseTypeFloatMin ("-1.", 0.), "--positiveReal")
in
utest argPrintErrorString res with
  "Option --positiveReal expects a float value of at least 0., but received '-1.'."
in


let testOptions =
  {argParse_defaults with args = ["--intervalReal", "noFloat"]}
in
let res = argParse_general testOptions default config in
utest res with
  ParseFailConversion (ParseTypeFloat ("noFloat"), "--intervalReal")
in
utest argPrintErrorString res with
  "Option --intervalReal expects a float value, but received 'noFloat'."
in

let testOptions =
  {argParse_defaults with args = ["--intervalReal", "-1."]}
in
let res = argParse_general testOptions default config in
utest res with
  ParseFailConversion (ParseTypeFloatInterval ("-1.", 0., 1.), "--intervalReal")
in
utest argPrintErrorString res with
  "Option --intervalReal expects a float value in the interval [0., 1.], but received '-1.'."
in


let testOptions = {argParse_defaults with args = ["--complex", "noComplex"]} in
let res = argParse_general testOptions default config in
utest res with
  ParseFailConversion
    (ParseTypeGeneric
      ("Could not identify Re and Im part in", "noComplex"), "--complex")
in
utest argPrintErrorString res with
  "Could not identify Re and Im part in 'noComplex'."
in

let testOptions = {argParse_defaults with args = ["--len", "-2"]} in
let res = argParse_general testOptions default config in
utest res with ParseFailConversion (ParseTypeIntMin ("-2", 1), "--len") in
utest argPrintErrorString res
  with
  "Option --len expects an integer value of at least 1, but received '-2'."
in

let testOptions = {argParse_defaults with args = ["--messageNo", "msg"]} in
let res = argParse_general testOptions default config in
utest res with ParseFailUnknownOption "--messageNo" in
utest argPrintErrorString res with "Unknown option --messageNo." in

let testOptions = {argParse_defaults with args = ["--message"]} in
let res = argParse_general testOptions default config in
utest res with ParseFailMissingOpArg "--message" in
utest argPrintErrorString res
with "Option --message is missing an argument value." in

let testOptions = {argParse_defaults
with args = ["--message", "--len", "78"]} in
let res = argParse_general testOptions default config in
utest res with ParseFailMissingOpArg "--message" in
utest argPrintErrorString res
with "Option --message is missing an argument value." in

let testOptions = {argParse_defaults with args = ["--unknown"]} in
let res = argParse_general testOptions default config in
utest res with ParseFailUnknownOption("--unknown") in


let text = argHelpOptions config in
--print "\n---\n"; print text; print "\n---\n";
utest length text with 838 in

()
```
</ToggleWrapper>
</DocBlock>

