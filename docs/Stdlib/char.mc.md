import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# char.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>  
  
## Variables  
  

          <DocBlock title="eqChar" kind="let">

```mc
let eqChar c1 c2 : Char -> Char -> Bool
```



<ToggleWrapper text="Code..">
```mc
let eqChar = lam c1. lam c2. eqc c1 c2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="neqChar" kind="let">

```mc
let neqChar c1 c2 : Char -> Char -> Bool
```



<ToggleWrapper text="Code..">
```mc
let neqChar = lam c1. lam c2. not (eqc c1 c2)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest eqChar 'a' 'a' with true
utest eqChar 'A' 'B' with false
utest neqChar 'a' 'a' with false
utest neqChar 'A' 'B' with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ltChar" kind="let">

```mc
let ltChar c1 c2 : Char -> Char -> Bool
```



<ToggleWrapper text="Code..">
```mc
let ltChar = lam c1. lam c2. lti (char2int c1) (char2int c2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="gtChar" kind="let">

```mc
let gtChar c1 c2 : Char -> Char -> Bool
```



<ToggleWrapper text="Code..">
```mc
let gtChar = lam c1. lam c2. gti (char2int c1) (char2int c2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="leqChar" kind="let">

```mc
let leqChar c1 c2 : Char -> Char -> Bool
```



<ToggleWrapper text="Code..">
```mc
let leqChar = lam c1. lam c2. leqi (char2int c1) (char2int c2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="geqChar" kind="let">

```mc
let geqChar c1 c2 : Char -> Char -> Bool
```



<ToggleWrapper text="Code..">
```mc
let geqChar = lam c1. lam c2. geqi (char2int c1) (char2int c2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpChar" kind="let">

```mc
let cmpChar c1 c2 : Char -> Char -> Int
```



<ToggleWrapper text="Code..">
```mc
let cmpChar = lam c1. lam c2. subi (char2int c1) (char2int c2)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest cmpChar 'a' 'a' with 0
utest cmpChar 'a' 'A' with 32
utest cmpChar '\t' '\n' with subi 0 1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_escapes" kind="let">

```mc
let _escapes  : [(Char, String)]
```

<Description>{`Escape characters`}</Description>


<ToggleWrapper text="Code..">
```mc
let _escapes = [
  ('\n', "\\n"),
  ('\t', "\\t"),
  ('\r', "\\r"),
  ('\\', "\\\\"),
  ('\"', "\\\""),
  ('\'', "\\\'")
]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="escapeChar" kind="let">

```mc
let escapeChar c : Char -> String
```



<ToggleWrapper text="Code..">
```mc
let escapeChar = lam c.
  match find (lam e : (Char, String). eqChar c e.0) _escapes with Some n then
    let n : (Char, String) = n in
    n.1
  else [c]
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest escapeChar 'e' with "e"
utest escapeChar '0' with "0"
utest escapeChar '\n' with "\\n"
utest escapeChar '\r' with "\\r"
utest escapeChar '\t' with "\\t"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="showChar" kind="let">

```mc
let showChar c : Char -> String
```

<Description>{`Display characters`}</Description>


<ToggleWrapper text="Code..">
```mc
let showChar = lam c. join ["\'", escapeChar c, "\'"]
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest showChar 'e' with "\'e\'"
utest showChar '0' with "\'0\'"
utest showChar '\n' with "\'\\n\'"
utest showChar '\r' with "\'\\r\'"
utest showChar '\t' with "\'\\t\'"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="char2upper" kind="let">

```mc
let char2upper c : Char -> Char
```

<Description>{`Character conversion`}</Description>


<ToggleWrapper text="Code..">
```mc
let char2upper = lam c.
  if and (geqChar c 'a') (leqChar c 'z')
  then (int2char (subi (char2int c) 32))
  else c
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest char2upper 'a' with 'A'
utest char2upper '0' with '0'
utest char2upper 'A' with 'A'
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="char2lower" kind="let">

```mc
let char2lower c : Char -> Char
```



<ToggleWrapper text="Code..">
```mc
let char2lower = lam c.
  if and (geqChar c 'A') (leqChar c 'Z')
  then (int2char (addi (char2int c) 32))
  else c
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest char2lower 'a' with 'a'
utest char2lower '0' with '0'
utest char2lower 'A' with 'a'
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isWhitespace" kind="let">

```mc
let isWhitespace c : Char -> Bool
```

<Description>{`Character predicates`}</Description>


<ToggleWrapper text="Code..">
```mc
let isWhitespace = lam c. any (eqChar c) [' ', '\n', '\t', '\r']
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest isWhitespace ' ' with true
utest isWhitespace '	' with true
utest isWhitespace '
' with true
utest isWhitespace 'a' with false
utest isWhitespace '\n' with true
utest isWhitespace '\t' with true
utest isWhitespace '\r' with true
utest isWhitespace '\'' with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isLowerAlpha" kind="let">

```mc
let isLowerAlpha c : Char -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isLowerAlpha = lam c.
  let i = char2int c in
  if leqi (char2int 'a') i then
    leqi i (char2int 'z')
  else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isUpperAlpha" kind="let">

```mc
let isUpperAlpha c : Char -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isUpperAlpha = lam c.
  let i = char2int c in
  if leqi (char2int 'A') i then
    leqi i (char2int 'Z')
  else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isAlpha" kind="let">

```mc
let isAlpha c : Char -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isAlpha = lam c.
  if isLowerAlpha c then true
  else isUpperAlpha c
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isLowerAlphaOrUnderscore" kind="let">

```mc
let isLowerAlphaOrUnderscore c : Char -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isLowerAlphaOrUnderscore = lam c.
  if isLowerAlpha c then true
  else eqChar c '_'
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isAlphaOrUnderscore" kind="let">

```mc
let isAlphaOrUnderscore c : Char -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isAlphaOrUnderscore = lam c.
  if isAlpha c then true
  else eqChar c '_'
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest isAlphaOrUnderscore '1' with false
utest isAlphaOrUnderscore 'a' with true
utest isAlphaOrUnderscore 'A' with true
utest isAlphaOrUnderscore '_' with true
utest isAlphaOrUnderscore '{' with false

utest isAlpha 'a' with true
utest isAlpha 'm' with true
utest isAlpha 'z' with true
utest isAlpha '\`' with false
utest isAlpha '{' with false
utest isAlpha 'A' with true
utest isAlpha 'M' with true
utest isAlpha 'Z' with true
utest isAlpha '@' with false
utest isAlpha '[' with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isDigit" kind="let">

```mc
let isDigit c : Char -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isDigit = lam c.
  let i = char2int c in
  if leqi (char2int '0') i then
    leqi i (char2int '9')
  else false
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest isDigit '0' with true
utest isDigit '5' with true
utest isDigit '9' with true
utest isDigit '/' with false
utest isDigit ':' with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isAlphanum" kind="let">

```mc
let isAlphanum c : Char -> Bool
```



<ToggleWrapper text="Code..">
```mc
let isAlphanum = lam c.
  if isAlpha c then true
  else isDigit c
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest isAlphanum '0' with true
utest isAlphanum '9' with true
utest isAlphanum 'A' with true
utest isAlphanum 'z' with true
utest isAlphanum '_' with false

utest isLowerAlpha 'a' with true
utest isLowerAlpha 'z' with true
utest isLowerAlpha 'A' with false
utest isLowerAlpha 'Z' with false
utest isLowerAlpha '\n' with false
utest isLowerAlpha '7' with false
utest isLowerAlpha '_' with false

utest isUpperAlpha '0' with false
utest isUpperAlpha 'a' with false
utest isUpperAlpha '_' with false
utest isUpperAlpha 'X' with true
utest isUpperAlpha 'K' with true
utest isUpperAlpha '%' with false

utest isLowerAlphaOrUnderscore '0' with false
utest isLowerAlphaOrUnderscore 'a' with true
utest isLowerAlphaOrUnderscore 'A' with false
utest isLowerAlphaOrUnderscore '{' with false
utest isLowerAlphaOrUnderscore '_' with true
utest isLowerAlphaOrUnderscore '\n' with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="randAlphanum" kind="let">

```mc
let randAlphanum _ : () -> Char
```

<Description>{`Generates a random ASCII letter or digit character.`}</Description>


<ToggleWrapper text="Code..">
```mc
let randAlphanum : () -> Char = lam.
  -- NOTE(larshum, 2021-09-15): The total number of digits or ASCII letters
  -- (lower- and upper-case) is 10 + 26 + 26 = 62.
  let r = randIntU 0 62 in
  if lti r 10 then int2char (addi r 48)
  else if lti r 36 then int2char (addi r 55)
  else int2char (addi r 61)
```
</ToggleWrapper>
</DocBlock>

