import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# utest.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) The Miking contributors. See file LICENSE.txt

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Variables  
  

          <DocBlock title="utestDefaultToString" kind="let">

```mc
let utestDefaultToString lstr rstr l r : all a. all b. (a -> String) -> (b -> String) -> a -> b -> String
```

<Description>{`Defualt to toString function for utests. Mimics the format of utests without  
the \`else\` construct.`}</Description>


<ToggleWrapper text="Code..">
```mc
let utestDefaultToString
  : all a. all b. (a -> String) -> (b -> String) -> a -> b -> String
  = lam lstr. lam rstr. lam l. lam r.
    let i = "    " in
    let ii = concat i i in
    let sideToString = lam hand. lam str.
      let strs = strSplit "\n" str in
      if gti (length strs) 1 then
        join [i, hand, ":\n", ii, strJoin (cons '\n' ii) strs]
      else join [i, hand, ": ", str]
    in
    let lstr = lstr l in
    let rstr = rstr r in
    join [sideToString "LHS" lstr, "\n", sideToString "RHS" rstr]
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest utestDefaultToString int2string int2string 0 1 with
  strJoin "\n"
    [
      "    LHS: 0",
      "    RHS: 1"
    ]
  using eqString else utestDefaultToString (lam x. x) (lam x. x)

utest utestDefaultToString (lam x. x) (lam x. x) "first\nsecond" "first" with
  strJoin "\n"
    [
      "    LHS:",
      "        first",
      "        second",
      "    RHS: first"
    ]
  using eqString else utestDefaultToString (lam x. x) (lam x. x)

utest utestDefaultToString (lam x. x) (lam x. x)  "first" "first\nsecond" with
  strJoin "\n"
    [
      "    LHS: first",
      "    RHS:",
      "        first",
      "        second"
    ]
  using eqString else utestDefaultToString (lam x. x) (lam x. x)
```
</ToggleWrapper>
</DocBlock>

