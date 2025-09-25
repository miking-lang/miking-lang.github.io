import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# utest-runtime.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/bool.mc"} style={S.link}>bool.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>, <a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Variables  
  

          <DocBlock title="numFailed" kind="let">

```mc
let numFailed  : Ref Int
```



<ToggleWrapper text="Code..">
```mc
let numFailed = ref 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="numPassed" kind="let">

```mc
let numPassed  : Ref Int
```



<ToggleWrapper text="Code..">
```mc
let numPassed = ref 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utestTestPassed" kind="let">

```mc
let utestTestPassed _ : () -> ()
```



<ToggleWrapper text="Code..">
```mc
let utestTestPassed : () -> () = lam.
  modref numPassed (addi (deref numPassed) 1);
  print "."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utestTestFailed" kind="let">

```mc
let utestTestFailed info usingstr onfailStr : String -> String -> String -> ()
```



<ToggleWrapper text="Code..">
```mc
let utestTestFailed : String -> String -> String -> () =
  lam info. lam usingstr. lam onfailStr.
  modref numFailed (addi (deref numFailed) 1);
  printLn (join [
    "\n ** Unit test FAILED: ", info, " **\n", onfailStr, "\n", usingstr ])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utestDefaultOnFail" kind="let">

```mc
let utestDefaultOnFail lpp rpp l r : all a. all b. (a -> String) -> (b -> String) -> a -> b -> String
```



<ToggleWrapper text="Code..">
```mc
let utestDefaultOnFail : all a. all b. (a -> String) -> (b -> String)
                                     -> a -> b -> String =
  lam lpp. lam rpp. lam l. lam r.
  join [ "    LHS: ", lpp l, "\n    RHS: ", rpp r ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utestRunner" kind="let">

```mc
let utestRunner info usingstr ppfn eqfn l r : all a. all b. String -> String -> (a -> b -> String) -> (a -> b -> Bool) -> a -> b -> ()
```



<ToggleWrapper text="Code..">
```mc
let utestRunner
  : all a. all b. String -> String -> (a -> b -> String) -> (a -> b -> Bool)
               -> a -> b -> () =
  lam info. lam usingstr. lam ppfn. lam eqfn. lam l. lam r.
  if eqfn l r then utestTestPassed ()
  else utestTestFailed info usingstr (ppfn l r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="defaultPprint" kind="let">

```mc
let defaultPprint _ : all a. a -> String
```



<ToggleWrapper text="Code..">
```mc
let defaultPprint : all a. a -> String = lam. "?"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ppBool" kind="let">

```mc
let ppBool  : Bool -> String
```



<ToggleWrapper text="Code..">
```mc
let ppBool : Bool -> String = bool2string
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ppInt" kind="let">

```mc
let ppInt  : Int -> String
```



<ToggleWrapper text="Code..">
```mc
let ppInt : Int -> String = int2string
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ppFloat" kind="let">

```mc
let ppFloat  : Float -> String
```



<ToggleWrapper text="Code..">
```mc
let ppFloat : Float -> String = float2string
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ppChar" kind="let">

```mc
let ppChar  : Char -> String
```



<ToggleWrapper text="Code..">
```mc
let ppChar : Char -> String = showChar
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ppSeq" kind="let">

```mc
let ppSeq pp s : all a. (a -> String) -> [a] -> String
```



<ToggleWrapper text="Code..">
```mc
let ppSeq : all a. (a -> String) -> [a] -> String = lam pp. lam s.
  join ["[", strJoin "," (map pp s), "]"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqInt" kind="let">

```mc
let eqInt  : Int -> Int -> Bool
```



<ToggleWrapper text="Code..">
```mc
let eqInt : Int -> Int -> Bool = eqi
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqFloat" kind="let">

```mc
let eqFloat  : Float -> Float -> Bool
```



<ToggleWrapper text="Code..">
```mc
let eqFloat : Float -> Float -> Bool = eqf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="utestExitOnFailure" kind="let">

```mc
let utestExitOnFailure t : all a. a -> a
```



<ToggleWrapper text="Code..">
```mc
let utestExitOnFailure : all a. a -> a = lam t.
  if eqi (deref numFailed) 0 then
    t
  else
    printLn (join [
      "ERROR! ", ppInt (deref numPassed), " successful tests and ",
      ppInt (deref numFailed), " failed tests."
    ]);
    exit 1
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

-- NOTE(larshum, 2022-12-30): Declare a tuple containing the functions that we
-- want to be included. This allows us to remove other functions that are not
-- of interest through deadcode elimination.
( utestRunner, utestDefaultOnFail, utestExitOnFailure, defaultPprint, ppBool
, ppInt, ppFloat, ppChar, ppSeq , eqBool, eqInt , eqFloat, eqChar , eqSeq
, join)
```
</ToggleWrapper>
</DocBlock>

