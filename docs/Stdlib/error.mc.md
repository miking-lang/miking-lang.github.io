import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# error.mc  
  

This module provides functions for highlighting sections of a file,
primarily intended for error reporting in a compiler.

The underlying workhorse is \`formatHighlights\`, which takes the source
of a file and a sequence of ranges to highlight \(\`Highlight\`s,
essentially \`Info\`s with some extra information\).

There is also a high\-level interface for reporting errors and
immediately exiting. This centers around the \`ErrorSection\` type:

\`\`\`
type ErrorSection = \{msg : String, multi : String, info : Info, infos : \[Info\]\}
let err : ErrorSection = \{msg = "", multi = "", info = NoInfo \(\), infos = \[\]\}
\`\`\`

An \`ErrorSection\` represents a single contiguous range in a file,
possibly with multiple sub\-ranges to highlight, and with an optional
related message. Typically you would construct this through record
updates on \`err\`, since most fields are optional:

\- \`infos\`: The ranges to highlight. Default to \[\`info\`\] if absent.
\- \`info\`: The complete section to display. Defaults to \`foldl
 mergeInfo \(NoInfo \(\)\) infos\` if absent.
\- \`msg\`: The message to display above the highlighted section, if any.
\- \`multi\`: Used instead of \`msg\` if present and \`infos\` contains at
 least two elements \(useful for pluralizing messages\).

There are three functions for displaying an error and immediately
exiting:
\- \`errorGeneral\` takes a sequence of \`ErrorSection\`s and a record with
 two fields \(both are optional\):
 \- \`single\`: The message to display if only one \`ErrorSection\` is
   given.
 \- \`multi\`: The message to display if more than one \`ErrorSection\` is
   given. Defaults to \`single\` if absent.
\- \`errorSingle\` is a helper for when you have only one section; it
 takes a sequence of \`Info\`s and the error message as a \`String\`.
\- \`errorMulti\` correspondingly handles the simplest case with multiple
 sections; it takes a sequence of \`\(Info, String\)\`, treating each as
 a section, as well as the error message as a \`String\`.



  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>, <a href={"/docs/Stdlib/char.mc"} style={S.link}>char.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/mexpr/info.mc"} style={S.link}>mexpr/info.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>  
  
## Types  
  

          <DocBlock title="Highlight" kind="type">

```mc
type Highlight
```



<ToggleWrapper text="Code..">
```mc
type Highlight
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="HighlightConfig" kind="type">

```mc
type HighlightConfig : { beforeSection: String -> String, afterSection: String -> String, irrelevant: String -> String, relevant: String -> String, added: String -> String }
```

<Description>{`Highlighting can be configured using the functions in this config.`}</Description>


<ToggleWrapper text="Code..">
```mc
type HighlightConfig =
  { beforeSection : String -> String  -- Called for the part before the section *on the same line* as the beginning
  , afterSection : String -> String   -- Called for the part after the section *on the same line* as the end
  , irrelevant : String -> String
  , relevant : String -> String
  , added : String -> String
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="InnerHighlight" kind="type">

```mc
type InnerHighlight
```



<ToggleWrapper text="Code..">
```mc
type InnerHighlight
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="HPos" kind="type">

```mc
type HPos : { row: Int, col: Int }
```



<ToggleWrapper text="Code..">
```mc
type HPos = { row : Int, col : Int }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="HInput" kind="type">

```mc
type HInput : { pos: HPos, rest: String }
```



<ToggleWrapper text="Code..">
```mc
type HInput = { pos : HPos, rest : String }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ErrorSection" kind="type">

```mc
type ErrorSection : { msg: String, multi: String, info: Info, infos: [Info] }
```



<ToggleWrapper text="Code..">
```mc
type ErrorSection = {msg : String, multi : String, info : Info, infos : [Info]}
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="Irrelevant" kind="con">

```mc
con Irrelevant : Info -> Highlight
```

<Description>{`A section of the code inside the area to be highlighted, but that  
is itself irrelevant. Optional, sections between other highlighted  
sections are irrelevant by default.`}</Description>


<ToggleWrapper text="Code..">
```mc
con Irrelevant : Info -> Highlight
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Relevant" kind="con">

```mc
con Relevant : Info -> Highlight
```

<Description>{`A section that is inside the highlighted area and is relevant,  
i.e., it should be highlighted in some way.`}</Description>


<ToggleWrapper text="Code..">
```mc
con Relevant : Info -> Highlight
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Added" kind="con">

```mc
con Added : { content: String, ensureSurroundedBySpaces: Bool } -> Highlight
```

<Description>{`Text to be added in the highlighted section, even though it is not  
present in the original input. If \`ensureSurroundedBySpaces\` is  
true then the added content will additionally be surrounded by a  
space on either side, from the original input if possible,  
otherwise added.`}</Description>


<ToggleWrapper text="Code..">
```mc
con Added : {content : String, ensureSurroundedBySpaces : Bool} -> Highlight
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IBefore" kind="con">

```mc
con IBefore : () -> InnerHighlight
```



<ToggleWrapper text="Code..">
```mc
con IBefore : () -> InnerHighlight
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IAfter" kind="con">

```mc
con IAfter : () -> InnerHighlight
```



<ToggleWrapper text="Code..">
```mc
con IAfter : () -> InnerHighlight
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IRelevant" kind="con">

```mc
con IRelevant : () -> InnerHighlight
```



<ToggleWrapper text="Code..">
```mc
con IRelevant : () -> InnerHighlight
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IIrrelevant" kind="con">

```mc
con IIrrelevant : () -> InnerHighlight
```



<ToggleWrapper text="Code..">
```mc
con IIrrelevant : () -> InnerHighlight
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IAdded" kind="con">

```mc
con IAdded : { ensureSurroundedBySpaces: Bool } -> InnerHighlight
```



<ToggleWrapper text="Code..">
```mc
con IAdded : {ensureSurroundedBySpaces : Bool} -> InnerHighlight
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_advanceRow" kind="let">

```mc
let _advanceRow pos : HPos -> HPos
```



<ToggleWrapper text="Code..">
```mc
let _advanceRow
  : HPos -> HPos
  = lam pos. {{ pos with row = addi pos.row 1 } with col = 0}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_advanceCol" kind="let">

```mc
let _advanceCol pos : HPos -> HPos
```



<ToggleWrapper text="Code..">
```mc
let _advanceCol
  : HPos -> HPos
  = lam pos. { pos with col = addi pos.col 1 }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_hposLessThan" kind="let">

```mc
let _hposLessThan a b : HPos -> HPos -> Bool
```



<ToggleWrapper text="Code..">
```mc
let _hposLessThan
  : HPos -> HPos -> Bool
  = lam a. lam b. or (lti a.row b.row) (and (eqi a.row b.row) (lti a.col b.col))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_advanceInput" kind="let">

```mc
let _advanceInput input : HInput -> Option (Char, HInput)
```



<ToggleWrapper text="Code..">
```mc
let _advanceInput
  : HInput -> Option (Char, HInput)
  = lam input.
    switch input.rest
    case "\n" ++ rest then Some ('\n', {pos = _advanceRow input.pos, rest = rest})
    case [c] ++ rest then Some (c, {pos = _advanceCol input.pos, rest = rest})
    case [] then None ()
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_splitInput" kind="let">

```mc
let _splitInput target input : HPos -> HInput -> (String, HInput)
```



<ToggleWrapper text="Code..">
```mc
let _splitInput
  : HPos -> HInput -> (String, HInput)
  = lam target. lam input.
    recursive let work = lam acc. lam input: HInput.
      if _hposLessThan input.pos target then
        match _advanceInput input with Some (c, input) then
          work (snoc acc c) input
        else (acc, input)
      else (acc, input)
    in work "" input
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getRange" kind="let">

```mc
let _getRange h : Highlight -> Option (HPos, HPos)
```



<ToggleWrapper text="Code..">
```mc
let _getRange
  : Highlight
  -> Option (HPos, HPos)
  = lam h.
    switch h
    case Irrelevant (Info x) then Some ({row = x.row1, col = x.col1}, {row = x.row2, col = x.col2})
    case Relevant (Info x) then Some ({row = x.row1, col = x.col1}, {row = x.row2, col = x.col2})
    case Added _ then None ()
    case _ then
      printLn "WARNING: (implementation error) missing info field in _getRange";
      None ()
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="formatHighlights" kind="let">

```mc
let formatHighlights config content highlights : HighlightConfig -> String -> [Highlight] -> String
```

<Description>{`Take a sequence of sections to be highlighted \(positioned through  
\`Info\` values\) belonging to a single file, in order, then produce a  
highlighted version of that section of the input file.`}</Description>


<ToggleWrapper text="Code..">
```mc
let formatHighlights
  : HighlightConfig
  -> String  -- File content
  -> [Highlight]
  -> String  -- Highlighted section after processing
  = lam config. lam content. lam highlights.
    let contentTooShort = lam. error "The file isn't long enough, some of the highlight is outside" in
    let input: HInput = { rest = content, pos = { row = 1, col = 0} } in
    let startPos: HPos =
      match findMap _getRange highlights with Some (startPos, _)
      then startPos
      else error "This highlight list doesn't have any info fields in it" in
    let endPos: HPos =
      match findMap _getRange (reverse highlights) with Some (_, endPos)
      then endPos
      else error "This highlight list doesn't have any info fields in it" in

    -- NOTE(vipa, 2022-03-04): Identify the sections and their content
    match _splitInput { startPos with col = 0 } input with (_, input) in
    match _splitInput startPos input with (before, input) in
    let sections = [(before, IBefore ())] in
    recursive let work = lam sections. lam input. lam highlights.
      match highlights with [h] ++ highlights then
        match _getRange h with Some (startPos, endPos) then
          match _splitInput startPos input with (irr, input) in
          match _splitInput endPos input with (sec, input) in
          let label =
            switch h
            case Relevant _ then IRelevant ()
            case Irrelevant _ then IIrrelevant ()
            case _ then error "impossible"
            end in
          work (concat sections [(irr, IIrrelevant ()), (sec, label)]) input highlights
        else match h with Added x then
          work (snoc sections (x.content, IAdded {ensureSurroundedBySpaces = x.ensureSurroundedBySpaces})) input highlights
        else
          work (snoc sections ("<NoInfo>", IAdded {ensureSurroundedBySpaces = true})) input highlights
      else (sections, input)
    in
    match work sections input highlights with (sections, input) in
    match _splitInput (_advanceRow endPos) input with (after, _) in
    let after = match after with after ++ "\n" then after else after in
    let sections = snoc sections (after, IAfter ()) in

    let sections = filter (lam x. match x with ([_] ++ _, _) then true else false) sections in

    -- NOTE(vipa, 2022-03-04): Format and concatenate the
    -- sections. This isn't just a concatMap because we need to fix
    -- padding for \\`Added\\` sections.
    recursive let work = lam acc. lam needsPreSpace. lam sections.
      match sections with [(content, label)] ++ sections then
        let needsPadding = match label with (IAdded {ensureSurroundedBySpaces = true}) then true else false in
        let needsPostSpace =
          match sections with [([c] ++ _, _)] ++ _
          then if isWhitespace c then false else true
          else false in
        let pre = if and needsPadding needsPreSpace then config.irrelevant " " else "" in
        let post = if and needsPadding needsPostSpace then config.irrelevant " " else "" in
        let f = switch label
          case IBefore _ then config.beforeSection
          case IAfter _ then config.afterSection
          case IRelevant _ then config.relevant
          case IIrrelevant _ then config.irrelevant
          case IAdded _ then config.added
          end in
        let nextNeedsPreSpace =
          match concat content post with _ ++ [c] then
            if isWhitespace c then false else true
          else error "impossible" in
        work (join [acc, pre, f content, post]) nextNeedsPreSpace sections

      else acc
    in
    work "" false sections
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="terminalHighlightAddedConfig" kind="let">

```mc
let terminalHighlightAddedConfig  : HighlightConfig
```



<ToggleWrapper text="Code..">
```mc
let terminalHighlightAddedConfig: HighlightConfig =
  { beforeSection = lam str. concat "[0m" str
  , afterSection = lam str. concat "[0m" str
  , irrelevant = lam str. concat "[0m" str
  , relevant = lam str. concat (concat "[37m" str) "[0m"
  , added = lam str. concat (concat "[31m" str) "[0m"
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="terminalHighlightErrorConfig" kind="let">

```mc
let terminalHighlightErrorConfig  : HighlightConfig
```



<ToggleWrapper text="Code..">
```mc
let terminalHighlightErrorConfig: HighlightConfig =
  { beforeSection = lam str. concat "[0m" str
  , afterSection = lam str. concat "[0m" str
  , irrelevant = lam str. concat "[0m" str
  , relevant = lam str. concat (concat "[31m" str) "[0m"
  , added = lam str. concat (concat "[31m" str) "[0m"
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="errorDefault" kind="let">

```mc
let errorDefault  : ErrorSection
```



<ToggleWrapper text="Code..">
```mc
let errorDefault : ErrorSection = {msg = "", multi = "", info = NoInfo (), infos = []}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoToSection" kind="let">

```mc
let infoToSection info : Info -> ErrorSection
```



<ToggleWrapper text="Code..">
```mc
let infoToSection : Info -> ErrorSection = lam info. {errorDefault with info = info}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_cachedContent" kind="let">

```mc
let _cachedContent  : Ref (Map String String)
```



<ToggleWrapper text="Code..">
```mc
let _cachedContent : Ref (Map String String) = ref (mapEmpty cmpString)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_readContent" kind="let">

```mc
let _readContent filename : String -> Option String
```



<ToggleWrapper text="Code..">
```mc
let _readContent : String -> Option String = lam filename.
  match mapLookup filename (deref _cachedContent) with c & Some content then c else
  -- TODO(vipa, 2022-05-17): This is technically a race condition, the
  -- file could be removed in-between the check and the read, but
  -- there's no better way to handle it atm.
  if fileExists filename then
    let content = readFile filename in
    modref _cachedContent (mapInsert filename content (deref _cachedContent));
    Some content
  else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_emptyOrNewlineTerm" kind="let">

```mc
let _emptyOrNewlineTerm str : String -> String
```



<ToggleWrapper text="Code..">
```mc
let _emptyOrNewlineTerm : String -> String = lam str.
  switch str
  case "" then str
  case _ ++ "\n" then str
  case str then snoc str '\n'
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_highlightSection" kind="let">

```mc
let _highlightSection section : ErrorSection -> (Info, String)
```



<ToggleWrapper text="Code..">
```mc
let _highlightSection
  : ErrorSection -> (Info, String)
  = lam section.
    let info = match section.info with NoInfo ()
      then foldl mergeInfo (NoInfo ()) section.infos
      else section.info in
    let infos = match section.infos with []
      then [section.info]
      else section.infos in
    let infos = map (lam x. Relevant x) infos in
    let infos =
      match section.info with Info x then
        let first = infoVal x.filename x.row1 x.col1 x.row1 x.col1 in
        let last = infoVal x.filename x.row2 x.col2 x.row2 x.col2 in
        snoc (cons (Irrelevant first) infos) (Irrelevant last)
      else infos in
    let msg = match section.infos with ![] & ![_]
      then match section.multi with !"" then section.multi else section.msg
      else section.msg in
    let msg = _emptyOrNewlineTerm msg in
    let msg =
      match info with Info {filename = filename} then
        match _readContent filename with Some content
        then concat msg (formatHighlights terminalHighlightErrorConfig content infos)
        else join [msg, "<Couldn't read '", filename, "', no highlight available>"]
      else msg in
    (info, _emptyOrNewlineTerm msg)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="errorMsg" kind="let">

```mc
let errorMsg sections msg : [ErrorSection] -> {multi: String, single: String} -> (Info, String)
```



<ToggleWrapper text="Code..">
```mc
let errorMsg
  : [ErrorSection] -> {single: String, multi: String} -> (Info, String)
  = lam sections. lam msg.
    switch map _highlightSection sections
    case [(info, inner)] then (info, concat (_emptyOrNewlineTerm msg.single) inner)
    case sections then
      let msg = match msg.multi with !"" then msg.multi else msg.single in
      match unzip sections with (infos, inners) in
      let info = foldl mergeInfo (NoInfo ()) infos in
      let msg = strJoin "\n" (cons (_emptyOrNewlineTerm msg) inners) in
      (info, msg)
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_partitionInfosByFile" kind="let">

```mc
let _partitionInfosByFile infos : [Info] -> [[Info]]
```



<ToggleWrapper text="Code..">
```mc
let _partitionInfosByFile : [Info] -> [[Info]] = lam infos.
  recursive let work = lam acc. lam info.
    match info with Info x then
      mapInsertWith concat x.filename [info] acc
    else acc
  in mapValues (foldl work (mapEmpty cmpString) infos)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_die" kind="let">

```mc
let _die msg : all a. (Info, String) -> a
```



<ToggleWrapper text="Code..">
```mc
let _die : all a. (Info, String) -> a = lam msg.
  printError (join ["\n", infoErrorString msg.0 msg.1, "\n"]);
  flushStderr ();
  exit 1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_warn" kind="let">

```mc
let _warn msg : (Info, String) -> ()
```



<ToggleWrapper text="Code..">
```mc
let _warn : (Info, String) -> () = lam msg.
  printError (join ["\n", infoWarningString msg.0 msg.1, "\n"]);
  flushStderr ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_general" kind="let">

```mc
let _general f sections msg : all a. ((Info, String) -> a) -> [ErrorSection] -> {multi: String, single: String} -> a
```



<ToggleWrapper text="Code..">
```mc
let _general = lam f. lam sections. lam msg. f (errorMsg sections msg)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="errorGeneral" kind="let">

```mc
let errorGeneral x : all a. [ErrorSection] -> {multi: String, single: String} -> a
```



<ToggleWrapper text="Code..">
```mc
let errorGeneral : all a. [ErrorSection] -> {single: String, multi: String} -> a
  = lam x. _general _die x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_single" kind="let">

```mc
let _single f infos msg : all a. ((Info, String) -> a) -> [Info] -> String -> a
```



<ToggleWrapper text="Code..">
```mc
let _single = lam f. lam infos. lam msg.
  let mkSection = lam infos. {errorDefault with infos = infos} in
  f (errorMsg (map mkSection (_partitionInfosByFile infos)) {single = msg, multi = ""})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="errorSingle" kind="let">

```mc
let errorSingle x : all a. [Info] -> String -> a
```



<ToggleWrapper text="Code..">
```mc
let errorSingle : all a. [Info] -> String -> a
  = lam x. _single _die x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="warnSingle" kind="let">

```mc
let warnSingle x : all a. [Info] -> String -> ()
```



<ToggleWrapper text="Code..">
```mc
let warnSingle : all a. [Info] -> String -> ()
  = lam x. _single _warn x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_multi" kind="let">

```mc
let _multi f sections msg : all a. ((Info, String) -> a) -> [(Info, String)] -> String -> a
```



<ToggleWrapper text="Code..">
```mc
let _multi = lam f. lam sections. lam msg.
  f (errorMsg (map (lam sec. {errorDefault with info = sec.0, msg = sec.1}) sections) {single = msg, multi = ""})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="errorMulti" kind="let">

```mc
let errorMulti x : all a. [(Info, String)] -> String -> a
```



<ToggleWrapper text="Code..">
```mc
let errorMulti : all a. [(Info, String)] -> String -> a
  = lam x. _multi _die x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="warnMulti" kind="let">

```mc
let warnMulti x : all a. [(Info, String)] -> String -> ()
```



<ToggleWrapper text="Code..">
```mc
let warnMulti : all a. [(Info, String)] -> String -> ()
  = lam x. _multi _warn x
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

let content = join
  [ "let a = 1 in\n"
  , "let x = match a with\n"
  , "  | 1 -> match x with\n"
  , "    | \"blub\" -> 1\n"
  , "  | 2 -> 2\n"
  ] in

let config =
  { beforeSection = lam str. join ["<bef>", str, "</bef>"]
  , afterSection = lam str. join ["<aft>", str, "</aft>"]
  , irrelevant = lam str. join ["<irr>", str, "</irr>"]
  , relevant = lam str. join ["<rel>", str, "</rel>"]
  , added = lam str. join ["<new>", str, "</new>"]
  } in

let highlights =
  [ Relevant (infoVal "test" 2 8 2 13)
  , Relevant (infoVal "test" 2 16 2 20)
  , Irrelevant (infoVal "test" 3 8 3 9)
  , Added {content = "(", ensureSurroundedBySpaces = true}
  , Relevant (infoVal "test" 3 9 3 14)
  ] in

utest formatHighlights config content highlights
with
  let content: String = join
    [ "<bef>let x = </bef><rel>match</rel><irr> a </irr><rel>with</rel><irr>\n"
    , "  | 1 -></irr><irr> </irr><new>(</new><irr> </irr><rel>match</rel><aft> x with</aft>"
    ]
  in content in

()
```
</ToggleWrapper>
</DocBlock>

