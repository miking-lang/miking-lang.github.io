import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# parser-combinators.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>  
  
## Types  
  

          <DocBlock title="Pos" kind="type">

```mc
type Pos : { file: String, row: Int, col: Int }
```



<ToggleWrapper text="Code..">
```mc
type Pos = {file: String, row: Int, col: Int}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="State" kind="type">

```mc
type State : (String, Pos)
```



<ToggleWrapper text="Code..">
```mc
type State = (String, Pos)
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


          <DocBlock title="Parser" kind="type">

```mc
type Parser
```



<ToggleWrapper text="Code..">
```mc
type Parser a = State -> ParseResult a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Filename" kind="type">

```mc
type Filename : String
```



<ToggleWrapper text="Code..">
```mc
type Filename = String
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="Success" kind="con">

```mc
con Success : all a . (a, State) -> ParseResult a
```



<ToggleWrapper text="Code..">
```mc
con Success : all a. (a, State) -> ParseResult a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Failure" kind="con">

```mc
con Failure : all a . (String, String, State) -> ParseResult a
```



<ToggleWrapper text="Code..">
```mc
con Failure : all a. (String, String, State) -> ParseResult a
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="debugFlag" kind="let">

```mc
let debugFlag  : Bool
```

<Description>{`Debug stuff`}</Description>


<ToggleWrapper text="Code..">
```mc
let debugFlag = false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="debug" kind="let">

```mc
let debug s : String -> ()
```



<ToggleWrapper text="Code..">
```mc
let debug = lam s. if debugFlag then printLn s else ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="showPos" kind="let">

```mc
let showPos pos : {col: Int, row: Int, file: String} -> String
```

<Description>{`showPos : Pos \-\> String  
  
\`showPos pos\` gives a string representation of \`pos\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let showPos = lam pos.
  let file = if null pos.file
             then ""
             else concat (concat "FILE \"" pos.file) "\" "
  in
  let rowCol = concat (concat (int2string pos.row) ":") (int2string pos.col) in
  concat file rowCol
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqpos" kind="let">

```mc
let eqpos pos1 pos2 : Pos -> Pos -> Bool
```

<Description>{`eqpos : Pos \-\> Pos \-\> Bool  
  
Check if two positions are equal.`}</Description>


<ToggleWrapper text="Code..">
```mc
let eqpos = lam pos1 : Pos. lam pos2 : Pos.
  and (eqString pos1.file pos2.file)
  (and (eqi pos1.row pos2.row) (eqi pos1.col pos2.col))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initPos" kind="let">

```mc
let initPos f : all a. a -> {col: Int, row: Int, file: a}
```

<Description>{`initPos : String \-\> Pos  
  
\`initPos "foo.ext"\` gives a position which is at the start of  
the file "foo.ext".`}</Description>


<ToggleWrapper text="Code..">
```mc
let initPos = lam f. {file = f, row = 1, col = 1}
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest showPos (initPos "foo.mc") with "FILE \"foo.mc\" 1:1"
utest showPos (initPos "") with "1:1"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bumpRow" kind="let">

```mc
let bumpRow pos : Pos -> Pos
```

<Description>{`bumbRow : Pos \-\> Pos  
  
Increase the row number by 1 and set column number to 1.`}</Description>


<ToggleWrapper text="Code..">
```mc
let bumpRow = lam pos. {{pos with row = addi 1 pos.row} with col = 1}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bumpCol" kind="let">

```mc
let bumpCol pos : Pos -> Pos
```

<Description>{`bumbCol : Pos \-\> Pos  
  
Increase the column number by 1.`}</Description>


<ToggleWrapper text="Code..">
```mc
let bumpCol = lam pos. {pos with col = addi 1 pos.col}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="runParser" kind="let">

```mc
let runParser f p input : all a. Filename -> Parser a -> String -> ParseResult a
```

<Description>{`Run a parser with a specified filename and input.`}</Description>


<ToggleWrapper text="Code..">
```mc
let runParser : all a. Filename -> Parser a -> String -> ParseResult a =
  lam f. lam p. lam input.
  p (input, (initPos f))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="testParser" kind="let">

```mc
let testParser p : all a. Parser a -> String -> ParseResult a
```

<Description>{`Run a parser without a current file.`}</Description>


<ToggleWrapper text="Code..">
```mc
let testParser : all a. Parser a -> String -> ParseResult a = lam p. runParser "" p
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fail" kind="let">

```mc
let fail found expected st : all a. String -> String -> Parser a
```

<Description>{`Fail parsing with custom info`}</Description>


<ToggleWrapper text="Code..">
```mc
let fail : all a. String -> String -> Parser a = lam found. lam expected. lam st.
  Failure (found, expected, st)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="showError" kind="let">

```mc
let showError f : all a. ParseResult a -> String
```

<Description>{`Show human readable error message from failed parse.  
Fails if argument is not a failure.`}</Description>


<ToggleWrapper text="Code..">
```mc
let showError : all a. ParseResult a -> String = lam f.
  match f with Failure t then
    let found = t.0 in
    let expected = t.1 in
    let pos = (t.2).1 in
    concat (concat (concat "Parse error at " (showPos pos)) ": ")
    (concat (concat "Unexpected " found)
            (if gti (length expected) 0
             then concat ". Expected " expected
             else ""))
  else error "Tried to show something that is not a failure"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fmap" kind="let">

```mc
let fmap f p st : all a. all b. (a -> b) -> Parser a -> Parser b
```



<ToggleWrapper text="Code..">
```mc
let fmap : all a. all b. (a -> b) -> Parser a -> Parser b = lam f. lam p. lam st.
  let res = p st in
  match res with Success t then
    let v = t.0 in
    let rest = t.1 in
    Success (f v, rest)
  else match res with Failure t in Failure t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pure" kind="let">

```mc
let pure v st : all a. a -> Parser a
```



<ToggleWrapper text="Code..">
```mc
let pure : all a. a -> Parser a = lam v. lam st. Success(v, st)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ap" kind="let">

```mc
let ap pf p st : all a. all b. Parser (a -> b) -> Parser a -> Parser b
```



<ToggleWrapper text="Code..">
```mc
let ap : all a. all b. Parser (a -> b) -> Parser a -> Parser b =
  lam pf. lam p. lam st.
  let res1 = pf st in
  match res1 with Success t1 then
    let f = t1.0 in
    let rest1 = t1.1 in
    let res2 = p rest1 in
    match res2 with Success t2 then
      let x = t2.0 in
      let rest2 = t2.1 in
      pure (f x) rest2
    else match res2 with Failure t in Failure t
  else match res1 with Failure t in Failure t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="liftA2" kind="let">

```mc
let liftA2 f px py : all a. all b. all c. (a -> b -> c) -> Parser a -> Parser b -> Parser c
```



<ToggleWrapper text="Code..">
```mc
let liftA2 : all a. all b. all c. (a -> b -> c) -> Parser a -> Parser b -> Parser c =
  lam f. lam px. lam py.
  ap (fmap f px) py
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="apl" kind="let">

```mc
let apl p1 p2 : all a. all b. Parser a -> Parser b -> Parser a
```

<Description>{`Run two parsers, use result of first one`}</Description>


<ToggleWrapper text="Code..">
```mc
let apl : all a. all b. Parser a -> Parser b -> Parser a = lam p1. lam p2.
  liftA2 const p1 p2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="apr" kind="let">

```mc
let apr p1 p2 : all a. all b. Parser a -> Parser b -> Parser b
```

<Description>{`Run two parsers, use result of second one`}</Description>


<ToggleWrapper text="Code..">
```mc
let apr : all a. all b. Parser a -> Parser b -> Parser b = lam p1. lam p2.
  ap (fmap (const identity) p1) p2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bind" kind="let">

```mc
let bind p f st : all a. all b. Parser a -> (a -> Parser b) -> Parser b
```

<Description>{`Typical usage is \`bind p1 \(lam x. p2\)\`, i.e. run \`p1\` and  
pass result to a function running another parser.`}</Description>


<ToggleWrapper text="Code..">
```mc
let bind : all a. all b. Parser a -> (a -> Parser b) -> Parser b =
  lam p. lam f. lam st.
  let res = p st in
  match res with Success t then
    let x = t.0 in
    let rest = t.1 in
    f x rest
  else -- propagate Failure
    match res with Failure t in Failure t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="void" kind="let">

```mc
let void p : all a. Parser a -> Parser ()
```

<Description>{`Run parser and ignore result`}</Description>


<ToggleWrapper text="Code..">
```mc
let void : all a. Parser a -> Parser () = lam p. apl (pure ()) p
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="when" kind="let">

```mc
let when b p : all a. Bool -> Parser a -> Parser ()
```

<Description>{`Monadic conditional. \`when b p\` runs \`p\` \(ignoring the  
result\) if \`b\` is true.`}</Description>


<ToggleWrapper text="Code..">
```mc
let when : all a. Bool -> Parser a -> Parser () = lam b. lam p.
  if b then void p else pure ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="endOfInput" kind="let">

```mc
let endOfInput st : Parser ()
```

<Description>{`Fail parsing, unless the input stream is empty`}</Description>


<ToggleWrapper text="Code..">
```mc
let endOfInput : Parser () = lam st.
  let input = st.0 in
  if null input
  then pure () st
  else fail (showChar (head input)) "end of input" st
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest testParser endOfInput "" with Success((), ("", initPos ""))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="next" kind="let">

```mc
let next st : Parser Char
```

<Description>{`Read next character from input stream  
TODO\(?,?\): It would most likely be faster to index into  
      an array than to take the tail of a string`}</Description>


<ToggleWrapper text="Code..">
```mc
let next : Parser Char = lam st.
  let input = st.0 in
  let pos = st.1 in
  if null input
  then fail "end of input" "" st
  else
    let c = head input in
    let pos2 = if eqString [c] "\n" then bumpRow pos else bumpCol pos in
    pure c (tail input, pos2)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest testParser next "abc"
with Success ('a', ("bc", {file = "", row = 1, col = 2}))

utest testParser next "\""
with Success (head "\"", ("", {file = "", row = 1, col = 2}))

utest showError (testParser next "")
with "Parse error at 1:1: Unexpected end of input"

utest
  testParser (
    bind next (lam c1.
    bind next (lam c2.
    pure [c1, c2]))
  ) "abc"
with Success ("ab", ("c", {file = "", row = 1, col = 3}))

utest
  showError (testParser (
  bind next (lam c1.
  bind next (lam c2.
  pure [c1, c2]))
  ) "a")
with "Parse error at 1:2: Unexpected end of input"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="alt" kind="let">

```mc
let alt p1 p2 st : all a. Parser a -> Parser a -> Parser a
```

<Description>{`\`alt p1 p2\` tries to parse \`p1\`, but falls back  
to \`p2\` if \`p1\` fails without consuming any input.`}</Description>


<ToggleWrapper text="Code..">
```mc
let alt : all a. Parser a -> Parser a -> Parser a = lam p1. lam p2. lam st.
  let res1 = p1 st in
  match res1 with Failure t1 then
    let st2 = t1.2 in
    if eqpos st.1 st2.1 then
      let res2 = p2 st in
      match res2 with Failure t2 then
        let st3 = t2.2 in
        if eqpos st2.1 st3.1 then
          let exp = concat (concat t1.1 " or ") t2.1 in
          Failure (t2.0, exp, st3)
        else res2 -- p2 consumed input, don't merge expected
      else res2 -- Propagate Success
    else res1 -- p1 consumed input, don't backtrack
  else res1 -- Propagate Success
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="notFollowedBy" kind="let">

```mc
let notFollowedBy p st : all a. Parser a -> Parser ()
```

<Description>{`\`notFollowedBy p\` succeeds \(without consuming input\)  
only if \`p\` does not succeed.`}</Description>


<ToggleWrapper text="Code..">
```mc
let notFollowedBy : all a. Parser a -> Parser () = lam p. lam st.
  let res1 = p st in
  match res1 with Failure _ then
    pure () st
  else
    let res2 = next st in
    match res2 with Success t then
      let c = t.0 in
      fail (showChar c) "" st
    else match res2 with Failure t in Failure t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="satisfy" kind="let">

```mc
let satisfy cnd expected st : (Char -> Bool) -> String -> Parser Char
```

<Description>{`\`satisfy cnd exp\` succeeds with the next character  
if \`cnd\` returns true for that character. \`exp\` is  
the expected token.`}</Description>


<ToggleWrapper text="Code..">
```mc
let satisfy : (Char -> Bool) -> String -> Parser Char = lam cnd. lam expected. lam st.
  bind next (lam c.
  if cnd c
  then pure c
  else lam. fail (showChar c) expected st) st
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="try" kind="let">

```mc
let try p st : all a. Parser a -> Parser a
```

<Description>{`\`try p\` is used for backtracking. It parses \`p\`, but  
fails without consuming input if \`p\` fails.`}</Description>


<ToggleWrapper text="Code..">
```mc
let try : all a. Parser a -> Parser a = lam p. lam st.
  let res = p st in
  match res with Failure t then
    Failure (t.0, t.1, st)
  else -- Propagate Success
    res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="label" kind="let">

```mc
let label l p st : all p. String -> Parser p -> Parser p
```

<Description>{`\`label l p\` parses \`p\` but changes the "expected" token  
to \`l\` if \`p\` fails. Typical use is for big chains of  
\`alt\`, e.g., \`label "expression" \(alt \(alt let Lam\) ...\)\``}</Description>


<ToggleWrapper text="Code..">
```mc
let label : all p. String -> Parser p -> Parser p = lam l. lam p. lam st.
  let res = p st in
  match res with Failure t then
  if eqpos (t.2).1 st.1
  then Failure (t.0, l, t.2)
  else res
  else -- Propagate success
    res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="many1" kind="let">

```mc
let many1 p : all a. Parser a -> Parser [a]
```

<Description>{`Parse one or more occurrences of a parser.`}</Description>


<ToggleWrapper text="Code..">
```mc
let many1 : all a. Parser a -> Parser [a] = lam p.
  bind p (lam hd.
  bind (many p) (lam tl.
  pure (cons hd tl)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optional" kind="let">

```mc
let optional p : all a. Parser a -> Parser (Option a)
```



<ToggleWrapper text="Code..">
```mc
let optional : all a. Parser a -> Parser (Option a) = lam p.
  alt (fmap (lam x. Some x) p) (pure (None()))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wrappedIn" kind="let">

```mc
let wrappedIn pl pr p : all l. all r. all a. Parser l -> Parser r -> Parser a -> Parser a
```

<Description>{`\`wrappedIn pl pr p\` parses \`p\` preceded by \`pl\` and  
succeeded by \`pr\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let wrappedIn : all l. all r. all a. Parser l -> Parser r -> Parser a -> Parser a =
  lam pl. lam pr. lam p.
  apr pl (apl p pr)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sepBy" kind="let">

```mc
let sepBy sep p : all s. all a. Parser s -> Parser a -> Parser [a]
```

<Description>{`\`sepBy sep p\` parses zero or more occurrences of  
\`p\` separated by single occurrences of \`sep\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let sepBy : all s. all a. Parser s -> Parser a -> Parser [a] = lam sep. lam p.
  bind (alt (bind p (lam v. pure [v])) (pure [])) (lam hd.
  bind (many (apr sep p)) (lam tl.
  pure (concat hd tl)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lexChar" kind="let">

```mc
let lexChar c : Char -> Parser Char
```

<Description>{`Parse a specific character.`}</Description>


<ToggleWrapper text="Code..">
```mc
let lexChar : Char -> Parser Char = lam c. satisfy (eqChar c) (showChar c)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest testParser (lexChar 'a') "ab"
with Success ('a', ("b", {file = "", row = 1, col = 2}))

utest showError (testParser (lexChar 'b') "ab")
with "Parse error at 1:1: Unexpected 'a'. Expected 'b'"

utest testParser (
    bind (lexChar 'a') (lam c1.
    bind (lexChar 'b') (lam c2.
    pure [c1, c2]))
  ) "abc"
with Success ("ab", ("c", {file = "", row = 1, col = 3}))

utest showError (
  testParser (
    bind (lexChar 'b') (lam c1.
    bind (lexChar 'b') (lam c2.
    pure [c1, c2]))
  ) "abc")
with "Parse error at 1:1: Unexpected 'a'. Expected 'b'"

utest showError (
  testParser (
    bind (lexChar 'a') (lam c1.
    bind (lexChar 'a') (lam c2.
    pure [c1, c2]))
  ) "abc")
with "Parse error at 1:2: Unexpected 'b'. Expected 'a'"

utest testParser (alt (lexChar 'a') (lexChar 'b')) "abc"
with Success('a', ("bc", {file = "", row = 1, col = 2}))

utest testParser (alt (lexChar 'b') (lexChar 'a')) "abc"
with Success('a', ("bc", {file = "", row = 1, col = 2}))

utest showError (
  testParser (
    alt (lexChar 'b') (lexChar 'c')
  ) "abc")
with "Parse error at 1:1: Unexpected 'a'. Expected 'b' or 'c'"

utest testParser (notFollowedBy (lexChar 'b')) "abc"
with Success((), ("abc", {file = "", row = 1, col = 1}))

utest showError (testParser (notFollowedBy (lexChar 'a')) "abc")
with "Parse error at 1:1: Unexpected 'a'"

utest testParser (many (lexChar 'a')) "abc"
with Success("a", ("bc", {file = "", row = 1, col = 2}))

utest testParser (many (lexChar 'a')) "aaabc"
with Success("aaa", ("bc", {file = "", row = 1, col = 4}))

utest testParser (many (lexChar 'a')) "bc"
with Success("", ("bc", {file = "", row = 1, col = 1}))

utest testParser (many1 (lexChar 'a')) "abc"
with Success("a", ("bc", {file = "", row = 1, col = 2}))

utest testParser (many1 (lexChar 'a')) "aaabc"
with Success("aaa", ("bc", {file = "", row = 1, col = 4}))

utest showError (
  testParser (
    many1 (lexChar 'a')
  ) "bc")
with "Parse error at 1:1: Unexpected 'b'. Expected 'a'"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lexDigits" kind="let">

```mc
let lexDigits  : Parser String
```

<Description>{`Parse a sequence of digits`}</Description>


<ToggleWrapper text="Code..">
```mc
let lexDigits : Parser String = many1 (satisfy isDigit "digit")
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lexNumber" kind="let">

```mc
let lexNumber  : Parser Int
```

<Description>{`Parse a natural number.`}</Description>


<ToggleWrapper text="Code..">
```mc
let lexNumber : Parser Int = fmap string2int lexDigits
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest testParser (lexNumber) "123abc"
with Success(123, ("abc", {file = "", row = 1, col = 4}))

utest showError (testParser lexNumber "abc")
with "Parse error at 1:1: Unexpected 'a'. Expected digit"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="many" kind="let">

```mc
let many p : all a. Parser a -> Parser [a]
```



<ToggleWrapper text="Code..">
```mc
let many : all a. Parser a -> Parser [a] = lam p.
    bind (alt (bind p (lam v. pure [v])) (pure [])) (lam hd.
    if null hd
    then pure []
    else bind (many p) (lam tl. pure (concat hd tl)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lexCharLit" kind="let">

```mc
let lexCharLit  : Parser Char
```

<Description>{`Parse a character literal.  
TODO\(?,?\): Support escaped characters \(also in OCaml parser\)`}</Description>


<ToggleWrapper text="Code..">
```mc
let lexCharLit : Parser Char = wrappedIn (lexChar ''') (lexChar ''') next
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest testParser lexCharLit "'\n'"
with Success (head "\n", ("", {file = "", row = 2, col = 2}))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lexStringLit" kind="let">

```mc
let lexStringLit  : Parser String
```

<Description>{`Parse a string literal.`}</Description>


<ToggleWrapper text="Code..">
```mc
let lexStringLit : Parser String =
  -- TODO(?,?): Are other escaped characters handled correctly?
  let escaped =
    try (alt (apr (lexString "\\\\") (pure (head "\\")))
             (apr (lexString "\\") (fmap head (lexString "\""))))
  in
  wrappedIn (lexString "\"") (lexString "\"")
             (many (alt escaped (satisfy (lam c. not (eqString [c] "\"")) "")))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest testParser lexStringLit ['"','"']
with Success ("", ("", {file = "", row = 1, col = 3}))

utest testParser lexStringLit "\"FILE \\\"foo.mc\\\"\""
with Success ("FILE \"foo.mc\"", ("", {file = "", row = 1, col = 18}))

utest testParser (apr (lexString "foo") lexStringLit) "foo\"\\\"\""
with Success ("\"", ("", {file = "", row = 1, col = 8}))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lexNumeral" kind="let">

```mc
let lexNumeral  : Parser String
```

<Description>{`Parse a string representing a floating point numeral`}</Description>


<ToggleWrapper text="Code..">
```mc
let lexNumeral : Parser String =
  let maybe = lam p. alt p (pure "") in
  let decimals = label "decimals" (liftA2 cons (lexChar '.') lexDigits) in
  let exponent = label "exponent" (
    liftA2 cons (lexChar 'e')
           (liftA2 concat (foldr1 alt [lexString "-", lexString "+", pure ""])
                   lexDigits))
  in liftA2 concat lexDigits
            (alt exponent (liftA2 concat decimals (maybe exponent)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lexFloat" kind="let">

```mc
let lexFloat  : Parser Float
```

<Description>{`Parse a floating point number`}</Description>


<ToggleWrapper text="Code..">
```mc
let lexFloat : Parser Float = fmap string2float lexNumeral
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest testParser lexFloat "3.14159"
with Success(3.14159, ("", {file = "", row = 1, col = 8}))

utest testParser lexFloat "3.2e-2"
with Success(0.032, ("", {file = "", row = 1, col = 7}))

utest testParser lexFloat "3.2e2"
with Success(320.0, ("", {file = "", row = 1, col = 6}))

utest testParser lexFloat "3e+2"
with Success(300.0, ("", {file = "", row = 1, col = 5}))

utest showError(testParser lexFloat "42")
with "Parse error at 1:3: Unexpected end of input. Expected exponent or decimals"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="spaces" kind="let">

```mc
let spaces  : Parser ()
```

<Description>{`Parse zero or more whitespace characters.`}</Description>


<ToggleWrapper text="Code..">
```mc
let spaces : Parser () = void (many (satisfy isWhitespace "whitespace"))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="spaces1" kind="let">

```mc
let spaces1  : Parser ()
```

<Description>{`Parse one or more whitespace characters.`}</Description>


<ToggleWrapper text="Code..">
```mc
let spaces1 : Parser () = void (many1 (satisfy isWhitespace "whitespace"))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest testParser spaces "   abc"
with Success ((), ("abc", {file = "", row = 1, col = 4}))

utest testParser spaces "	  abc"
with Success ((), ("abc", {file = "", row = 1, col = 4}))

utest testParser spaces1 "	  abc"
with Success ((), ("abc", {file = "", row = 1, col = 4}))

utest testParser spaces "abc"
with Success ((), ("abc", {file = "", row = 1, col = 1}))

utest showError (testParser spaces1 "abc")
with "Parse error at 1:1: Unexpected 'a'. Expected whitespace"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lexToken" kind="let">

```mc
let lexToken ws p : all b. all a. Parser b -> Parser a -> Parser a
```

<Description>{`lexToken : Parser \(\) \-\> Parser a \-\> Parser a  
  
\`lexToken ws p\` parses \`p\`, using \`ws\` to consume any trailing  
whitespace or comments.`}</Description>


<ToggleWrapper text="Code..">
```mc
let lexToken = lam ws. lam p. apl p ws
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
-- The following code is meant to serve as an example of how
-- to write a parser for a small language. The definitions would
-- typically be top-level, but are kept local here.

-- Here is the AST type for the untyped lambda calculus with
-- numbers, let bindings and if expressions.

type Expr in

con Abs : (String, Expr) -> Expr in
con App : (Expr, Expr) -> Expr in
con Var : String -> Expr in
con Num : Int -> Expr in
con Let : (String, Expr, Expr) -> Expr in
con If  : (Expr, Expr, Expr) -> Expr in

-- We start by defining the tokens of the language.

-- lineComment : Parser ()
--
-- Parse a line comment, ignoring its contents.
let lineComment =
  apr (apr (lexString "--")
           (many (satisfy (lam c. not (eqString "\n" [c])) "")))
      (alt (void (lexString "\n")) endOfInput)
in

-- ws : Parser ()
--
-- Parse whitespace or comments.
let ws = void (many (alt lineComment spaces1)) in

-- token : Parser a -> Parser a
--
-- \\`token p\\` parses \\`p\\` and any trailing whitespace or comments.
let token = lam p. lexToken ws p in

-- string : String -> Parser String
--
-- \\`string s\\` parses the string \\`s\\` as a token
let string = lam s. token (lexString s) in

-- symbol : String -> Parser String
--
-- \\`symbol\\` is an alias for \\`string\\`
let symbol = string in

-- isValidChar : Char -> Bool
--
-- Check if a character is valid in an identifier.
let isValidChar = lam c.
  or (isAlphanum c) (eqChar c '_')
in

-- reserved : String -> Parser ()
--
-- Parse a specific string and fail if it is followed by
-- additional valid identifier characters.
let reserved = lam s.
  void (token (apl (lexString s) (notFollowedBy (satisfy isValidChar ""))))
in

-- number : Parser Int
let number = token lexNumber in

-- List of reserved keywords
let keywords =
  ["lam", "let", "in", "if", "then", "else"]
in

-- ident : Parser String
--
-- Parse an identifier, but require that it is not in the list
-- of reserved keywords.
let identifier =
  let validId =
    bind (satisfy (lam c. or (isAlpha c) (eqChar '_' c)) "valid identifier") (lam c.
    bind (token (many (satisfy isValidChar ""))) (lam cs.
    pure (cons c cs)))
  in
  try (
    bind validId (lam x.
    if any (eqString x) keywords
    then fail (concat (concat "keyword '" x) "'") "identifier"
    else pure x)
  )
in

-- We now use the tokens to define the main parser for our
-- language:

recursive
-- atom : Parser Expr
--
-- Innermost expression parser.
  let atom = lam st.
    let varAccess =
      debug "== Parsing varAccess";
      fmap (lam x. Var x) identifier in
    let num =
      debug "== Parsing num ==";
      fmap (lam n. Num n) number
    in
      label "atomic expression"
      (alt varAccess num) st

  -- expr: Parser Expr
  --
  -- Main expression parser.
  let expr = lam st.
    -- left : Parser Expr
    --
    -- Left recursive expressions, i.e. function application
    let left =
      bind (many1 atom) (lam as.
      pure (foldl1 (curry (lam x. App x)) as))
    in
    let abs =
      debug "== Parsing abstraction ==";
      bind (reserved "lam") (lam.
      bind identifier (lam x.
      bind (symbol ".") (lam.
      bind expr (lam e.
      pure (Abs (x, e))))))
    in
    let let_ =
      debug "== Parsing let ==";
      bind (reserved "let") (lam.
      bind identifier (lam x.
      bind (symbol "=") (lam.
      bind expr (lam e.
      bind (symbol "in") (lam.
      bind expr (lam body.
      pure (Let (x, e, body))))))))
    in
    let if_ =
      debug "== Parsing if ==";
      bind (reserved "if") (lam.
      bind expr (lam cnd.
      bind (reserved "then") (lam.
      bind expr (lam thn.
      bind (reserved "else") (lam.
      bind expr (lam els.
      pure (If(cnd, thn, els))))))))
    in
    label "expression"
    (alt left
    (alt abs
    (alt let_
    if_))) st
in

let progString = "let f = lam x . if lt 0 x then addi x 1 else 0 in f 5\n-- This line will be ignored" in

let prog =
  Let ("f",
    Abs ("x",
      If (App (App (Var "lt", Num 0), Var "x"),
          App (App (Var "addi", Var "x"), Num 1),
          Num 0)),
    App (Var "f", Num 5))
in

utest testParser expr progString
with Success (prog, ("", {file = "", row = 2, col = 29})) in

let badProgString = "let f = lam x . x in" in

utest showError (testParser expr badProgString)
with "Parse error at 1:21: Unexpected end of input. Expected expression" in
()
```
</ToggleWrapper>
</DocBlock>

