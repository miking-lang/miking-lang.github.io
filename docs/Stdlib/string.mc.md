import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# string.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/bool.mc"} style={S.link}>bool.mc</a>, <a href={"/docs/Stdlib/char.mc"} style={S.link}>char.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>, <a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>, <a href={"/docs/Stdlib/int.mc"} style={S.link}>int.mc</a>  
  
## Variables  
  

          <DocBlock title="emptyStr" kind="let">

```mc
let emptyStr  : String
```



<ToggleWrapper text="Code..">
```mc
let emptyStr : String = ""
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="escapeString" kind="let">

```mc
let escapeString s : String -> String
```



<ToggleWrapper text="Code..">
```mc
let escapeString = lam s. join (map escapeChar s)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest escapeString "e" with "e"
utest escapeString "0" with "0"
utest escapeString "\n" with "\\n"
utest escapeString "\r" with "\\r"
utest escapeString "\t" with "\\t"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqString" kind="let">

```mc
let eqString s1 s2 : String -> String -> Bool
```



<ToggleWrapper text="Code..">
```mc
let eqString = lam s1. lam s2. eqSeq eqc s1 s2
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest eqString "" "" with true
utest eqString "" "a" with false
utest eqString "a" "" with false
utest eqString "a" "a" with true
utest eqString "a" "aa" with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="neqString" kind="let">

```mc
let neqString s1 s2 : String -> String -> Bool
```



<ToggleWrapper text="Code..">
```mc
let neqString = lam s1. lam s2. not (eqString s1 s2)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest neqString "" "" with false
utest neqString "" "a" with true
utest neqString "a" "" with true
utest neqString "a" "a" with false
utest neqString "a" "aa" with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqStringSlice" kind="let">

```mc
let eqStringSlice s1 s2 o2 n2 : String -> String -> Int -> Int -> Bool
```

<Description>{`Compares a string with a slice of another string for equality. This avoids  
creating a copy of the second string, which is beneficial when Ropes are the  
underlying representation of sequences.`}</Description>


<ToggleWrapper text="Code..">
```mc
let eqStringSlice = lam s1. lam s2. lam o2. lam n2.
  recursive let work = lam i.
    if eqi i n2 then true
    else if eqc (get s1 i) (get s2 (addi o2 i)) then work (addi i 1)
    else false
  in
  if eqi (length s1) n2 then
    work 0
  else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ltString" kind="let">

```mc
let ltString s1 s2 : String -> String -> Bool
```



<ToggleWrapper text="Code..">
```mc
let ltString: String -> String -> Bool = lam s1. lam s2.
    if null s2 then
      false
    else if null s1 then
      true
    else if eqChar (head s1) (head s2) then
      ltString (tail s1) (tail s2)
    else
      ltChar (head s1) (head s2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="gtString" kind="let">

```mc
let gtString s1 s2 : String -> String -> Bool
```

<Description>{`Returns true iff s1 is lexicographically greater than s2.`}</Description>


<ToggleWrapper text="Code..">
```mc
let gtString: String -> String -> Bool = lam s1. lam s2. ltString s2 s1
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest ltString "" "" with false
utest ltString "" "A" with true
utest ltString "A" "" with false
utest ltString "A" "B" with true
utest ltString "BA" "B" with false
utest ltString "AB" "B" with true

utest gtString "" "" with false
utest gtString "" "x" with false
utest gtString "x" "" with true
utest gtString "x" "y" with false
utest gtString "yx" "y" with true
utest gtString "xy" "y" with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpString" kind="let">

```mc
let cmpString  : String -> String -> Int
```

<Description>{`String comparison giving a total ordering of strings.  
cmpString s1 s2 returns \>0 or \<0 if s1 lexicographically  
greater respectively smaller than s2, else 0.  
NOTE\(johnwikman, 2022\-04\-27\): This specifically uses "shortlex" ordering  
where the length of the strings have precedence in the comparison, before  
any of the characters are compared. See utest below.`}</Description>


<ToggleWrapper text="Code..">
```mc
let cmpString : String -> String -> Int = seqCmp cmpChar
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest cmpString "" "" with 0
utest cmpString "Hello" "Hello" with 0
utest
  match gti (cmpString "a" "") 0 with true then true else false
  with true
utest
  match lti (cmpString "aa" "aaa") 0 with true then true else false
  with true
utest
  match lti (cmpString "aaa" "aab") 0 with true then true else false
  with true
utest
  -- Shortlex example
  match lti (cmpString "aab" "aaaa") 0 with true then true else false
  with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="str2upper" kind="let">

```mc
let str2upper s : String -> String
```



<ToggleWrapper text="Code..">
```mc
let str2upper = lam s. map char2upper s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="str2lower" kind="let">

```mc
let str2lower s : String -> String
```



<ToggleWrapper text="Code..">
```mc
let str2lower = lam s. map char2lower s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="string2int" kind="let">

```mc
let string2int s : String -> Int
```



<ToggleWrapper text="Code..">
```mc
let string2int = lam s.
  recursive
  let string2int_rechelper = lam s. lam acc.
    if null s then acc
    else
      let fsd = subi (char2int (head s)) (char2int '0') in
      string2int_rechelper (tail s) (addi (muli 10 acc) fsd)
  in
  match s with [] then 0 else
  if eqChar '-' (head s)
  then negi (string2int_rechelper (tail s) 0)
  else string2int_rechelper s 0
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest string2int "" with 0
utest string2int "5" with 5
utest string2int "25" with 25
utest string2int "314159" with 314159
utest string2int "-314159" with (negi 314159)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="digit2char" kind="let">

```mc
let digit2char d : Int -> Char
```



<ToggleWrapper text="Code..">
```mc
let digit2char = lam d.
  int2char (addi d (char2int '0'))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="int2string" kind="let">

```mc
let int2string n : Int -> String
```



<ToggleWrapper text="Code..">
```mc
let int2string = lam n.
  recursive
  let int2string_rechelper = lam n. lam acc.
    if lti n 10
    then cons (digit2char n) acc
    else int2string_rechelper (divi n 10) (cons (digit2char (modi n 10)) acc)
  in
  if lti n 0
  then cons '-' (int2string_rechelper (negi n) "")
  else int2string_rechelper n ""
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest int2string 5 with "5"
utest int2string 25 with "25"
utest int2string 314159 with "314159"
utest int2string (negi 314159) with "-314159"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="strIndex" kind="let">

```mc
let strIndex c s : Char -> String -> Option Int
```

<Description>{`Returns an option with the index of the first occurrence of c in s. Returns  
None if c was not found in s.`}</Description>


<ToggleWrapper text="Code..">
```mc
let strIndex = lam c. lam s.
  recursive
  let strIndex_rechelper = lam i. lam c. lam s.
    if null s
    then None ()
    else if eqChar c (head s)
         then Some(i)
         else strIndex_rechelper (addi i 1) c (tail s)
  in
  strIndex_rechelper 0 c s
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest strIndex '%' "a % 5" with Some(2) using optionEq eqi
utest strIndex '%' "a & 5" with None () using optionEq eqi
utest strIndex 'w' "Hello, world!" with Some(7) using optionEq eqi
utest strIndex 'w' "Hello, World!" with None () using optionEq eqi
utest strIndex 'o' "Hello, world!" with Some(4) using optionEq eqi
utest strIndex '@' "Some @TAG@" with Some(5) using optionEq eqi
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="strLastIndex" kind="let">

```mc
let strLastIndex c s : Char -> String -> Option Int
```

<Description>{`Returns an option with the index of the last occurrence of c in s. Returns  
None if c was not found in s.`}</Description>


<ToggleWrapper text="Code..">
```mc
let strLastIndex = lam c. lam s.
  recursive
  let strLastIndex_rechelper = lam i. lam acc. lam c. lam s.
    if null s then
      if eqi acc (negi 1)
      then None ()
      else Some(acc)
    else
      if eqChar c (head s)
      then strLastIndex_rechelper (addi i 1) i   c (tail s)
      else strLastIndex_rechelper (addi i 1) acc c (tail s)
  in
  strLastIndex_rechelper 0 (negi 1) c s
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest strLastIndex '%' "a % 5" with Some(2) using optionEq eqi
utest strLastIndex '%' "a & 5" with None () using optionEq eqi
utest strLastIndex 'w' "Hello, world!" with Some(7) using optionEq eqi
utest strLastIndex 'w' "Hello, World!" with None () using optionEq eqi
utest strLastIndex 'o' "Hello, world!" with Some(8) using optionEq eqi
utest strLastIndex '@' "Some @TAG@" with Some(9) using optionEq eqi
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="strSplit" kind="let">

```mc
let strSplit delim s : String -> String -> [String]
```

<Description>{`The following implementation has been implemented under the assumption that  
the underlying representation of sequences is Ropes. Given that the  
assumption holds, it has the following complexities:  
Time: O\(|s| \* |delim|\)  
Memory: O\(|s|\)  
  
Splits s on delim`}</Description>


<ToggleWrapper text="Code..">
```mc
let strSplit = lam delim. lam s.
  let n = length s in
  let m = length delim in
  recursive let work = lam acc. lam lastMatch. lam i.
    if lti (subi n m) i then
      snoc acc (subsequence s lastMatch n)
    else if eqStringSlice delim s i m then
      let nexti = addi i m in
      work (snoc acc (subsequence s lastMatch (subi i lastMatch))) nexti nexti
    else
      work acc lastMatch (addi i 1)
  in
  if null delim then [s]
  else work [] 0 0
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest strSplit "ll" "Hello" with ["He", "o"]
utest strSplit "ll" "Hellallllo" with ["He", "a", "", "o"]
utest strSplit "" "Hello" with ["Hello"]
utest strSplit "lla" "Hello" with ["Hello"]
utest strSplit "Hello" "Hello" with [emptyStr, ""]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="strTrim" kind="let">

```mc
let strTrim s : String -> String
```

<Description>{`Trims s of spaces`}</Description>


<ToggleWrapper text="Code..">
```mc
let strTrim = lam s.
  recursive
  let strTrim_init = lam s.
    if eqString s ""
    then s
    else if isWhitespace (head s)
         then strTrim_init (tail s)
         else s
  in
  reverse (strTrim_init (reverse (strTrim_init s)))
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest strTrim " aaaa   " with "aaaa"
utest strTrim "   bbbbb  bbb " with "bbbbb  bbb"
utest strTrim "ccccc c\t   \n" with "ccccc c"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="strEndsWith" kind="let">

```mc
let strEndsWith  : String -> String -> Bool
```

<Description>{`\`strEndsWith suffix str\` returns true if \`str\` ends with the provided \`suffix\``}</Description>


<ToggleWrapper text="Code..">
```mc
let strEndsWith : String -> String -> Bool = isSuffix eqChar
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest strEndsWith "thing" "Something" with true
utest strEndsWith "thing" "Somethin" with false
utest strEndsWith "an" "Kunglinga Tekniska Hogskolan" with true
utest strEndsWith "muchlonger" "short" with false
utest strEndsWith "" "xs" with true
utest strEndsWith "xs" "" with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="strStartsWith" kind="let">

```mc
let strStartsWith  : String -> String -> Bool
```

<Description>{`\`strStartswith prefix str\` returns true if \`str\` starts with the provided \`prefix\``}</Description>


<ToggleWrapper text="Code..">
```mc
let strStartsWith : String -> String -> Bool = isPrefix eqChar
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest strStartsWith "Some" "Something" with true
utest strStartsWith "thing" "Somethin" with false
utest strStartsWith "K" "Kunglinga Tekniska Hogskolan" with true
utest strStartsWith "muchlonger" "short" with false
utest strStartsWith "" "xs" with true
utest strStartsWith "xs" "" with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="stringIsInt" kind="let">

```mc
let stringIsInt s : String -> Bool
```



<ToggleWrapper text="Code..">
```mc
let stringIsInt = lam s.
  if null s then false else
  let s = if eqChar (get s 0) '-' then tail s else s in
    forAll isDigit s
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest stringIsInt "123" with true
utest stringIsInt "-7" with true
utest stringIsInt "a1" with false
utest stringIsInt "" with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="strJoin" kind="let">

```mc
let strJoin  : String -> [String] -> String
```

<Description>{`Join a list of strings on a delimiter`}</Description>


<ToggleWrapper text="Code..">
```mc
let strJoin: String -> [String] -> String = seqJoin
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest strJoin "--" ["water", "tea", "coffee"] with "water--tea--coffee"
utest strJoin "--" [] with emptyStr
utest strJoin "--" ["coffee"] with "coffee"
utest strJoin "water" ["coffee", "tea"] with "coffeewatertea"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="seq2string" kind="let">

```mc
let seq2string f seq : all a. (a -> String) -> [a] -> String
```



<ToggleWrapper text="Code..">
```mc
let seq2string : all a. (a -> String) -> [a] -> String
  = lam f. lam seq.
    join ["[", strJoin ", " (map f seq), "]"]
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest seq2string int2string [1, 2, 3] with "[1, 2, 3]"
utest seq2string int2string [] with "[]"
utest seq2string int2string [37] with "[37]"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="strReplace" kind="let">

```mc
let strReplace  : String -> String -> String -> String
```

<Description>{`Replaces all occurrences of the string by the replacement`}</Description>


<ToggleWrapper text="Code..">
```mc
let strReplace: String -> String -> String -> String = subseqReplace eqChar
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest strReplace "" "bar" "a string" with "a string"
utest strReplace "." "bar" "a string" with "a string"
utest strReplace "bar" "babar" "foo bar" with "foo babar"
utest strReplace "-" "--" "mi run -help -flag" with "mi run --help --flag"
utest strReplace "-" "--" "mi --help --flag" with "mi ----help ----flag"
utest strReplace "--" "-" "mi ----help ----flag" with "mi --help --flag"
utest strReplace "viking" "miking" "two vikings" with "two mikings"
utest strReplace "dog" "cat" "every dog loves dogs" with "every cat loves cats"
utest strReplace "sub" "tu" "ssubb__ssusubu__su" with "stub__ssutuu__su"
utest strReplace "oout" "Z" "ttoooutott" with "ttoZott"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="levenshteinDistance" kind="let">

```mc
let levenshteinDistance a b : String -> String -> Int
```



<ToggleWrapper text="Code..">
```mc
let levenshteinDistance
  : String -> String -> Int
  = lam a. lam b.
    let start = create (addi 1 (length b)) (lam i. i) in
    let calcRow = lam prev. lam a_i. lam a_c.
      let start = [addi a_i 1] in
      let calcCell = lam new. lam b_i. lam b_c.
        let delCost = addi (get prev (addi b_i 1)) 1 in
        let insertCost = addi (get new b_i) 1 in
        let substCost = if eqc a_c b_c
          then get prev b_i
          else addi (get prev b_i) 1 in
        snoc new (mini delCost (mini insertCost substCost)) in
      foldli calcCell start b in
    let final = foldli calcRow start a in
    last final
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest levenshteinDistance "abc" "abd" with 1
utest levenshteinDistance "kitten" "sitting" with 3
utest levenshteinDistance "Saturday" "Sunday" with 3
```
</ToggleWrapper>
</DocBlock>

