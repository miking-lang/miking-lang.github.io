import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# name.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
The name library implements an approach to name handling  
where a name both has a string and a symbol representation.  
This library is typically used for variable handling  
and name binding. It is also used in the 'symtable.mc'  
library.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>  
  
## Types  
  

          <DocBlock title="Name" kind="type">

```mc
type Name : (String, Symbol)
```



<ToggleWrapper text="Code..">
```mc
type Name = (String, Symbol)
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_noSymbol" kind="let">

```mc
let _noSymbol  : Symbol
```

<Description>{`We use the private \_noSymbol instead of an option type  
for performance reasons \(no tagging\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let _noSymbol = gensym ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameNoSym" kind="let">

```mc
let nameNoSym x : String -> Name
```

<Description>{`'nameNoSym x' constructs a new name with string 'x'. The  
returned name does not contain a symbol.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameNoSym : String -> Name =
  lam x. (x, _noSymbol)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameSym" kind="let">

```mc
let nameSym x : String -> Name
```

<Description>{`'nameSym x' constructs a new name with string 'x' together  
with a fresh symbol`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameSym : String -> Name =
  lam x. (x, gensym ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameEqStr" kind="let">

```mc
let nameEqStr n1 n2 : Name -> Name -> Bool
```

<Description>{`'nameEqStr n1 n2' returns true if both names 'n1' and 'n2'  
contain the same string, else false.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameEqStr : Name -> Name -> Bool =
  lam n1 : Name. lam n2 : Name. eqString n1.0 n2.0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameHasSym" kind="let">

```mc
let nameHasSym n : Name -> Bool
```

<Description>{`'nameHasSym n' returns true if name 'n' has a  
symbol, else it returns false.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameHasSym : Name -> Bool =
  lam n : Name. not (eqsym n.1 _noSymbol)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest nameHasSym (nameSym "foo") with true
utest nameHasSym (nameNoSym "foo") with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameEqSym" kind="let">

```mc
let nameEqSym n1 n2 : Name -> Name -> Bool
```

<Description>{`'nameEqSym n1 n2' returns true if both names 'n1' and 'n2' contain the same  
symbol. If either 'n1' or 'n2' does not have a symbol, or if the symbols  
differ, return false.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameEqSym : Name -> Name -> Bool =
  lam n1 : Name. lam n2 : Name.
    if nameHasSym n1 then
      if nameHasSym n2 then
        eqsym n1.1 n2.1
      else false
    else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameEqSymUnsafe" kind="let">

```mc
let nameEqSymUnsafe n1 n2 : Name -> Name -> Bool
```

<Description>{`'nameEqSymUnsafe' returns true if names 'n1' and 'n2' contain the same  
symbols, without checking whether they contain a symbol. This means two  
unsymbolized names will be considered equal.  
  
This function is to be used in performance critical situations where we know  
both names have been symbolized.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameEqSymUnsafe : Name -> Name -> Bool = lam n1. lam n2. eqsym n1.1 n2.1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameEq" kind="let">

```mc
let nameEq n1 n2 : Name -> Name -> Bool
```

<Description>{`'nameEq n1 n2' returns true if the symbols are equal, or if neither name has  
a symbol and their strings are equal. Otherwise, return false.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameEq : Name -> Name -> Bool =
  lam n1 : Name. lam n2 : Name.
    if nameEqSym n1 n2 then true
    else if nameHasSym n1 then false
    else if nameHasSym n2 then false
    else nameEqStr n1 n2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_t3" kind="let">

```mc
let _t3  : Name
```



<ToggleWrapper text="Code..">
```mc
let _t3 = nameSym "foo"
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest _t1 with _t1 using nameEq
utest _t2 with _t2 using nameEq
utest nameEq _t1 _t2 with false
utest nameEq _t2 _t3 with false
utest _t3 with _t3 using nameEq
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameSetNewSym" kind="let">

```mc
let nameSetNewSym n : Name -> Name
```

<Description>{`'nameSetNewSym n' returns a new name with a fresh symbol.  
The returned name contains the same string as 'n'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameSetNewSym : Name -> Name =
  lam n : Name. (n.0, gensym ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameSetSym" kind="let">

```mc
let nameSetSym n s : Name -> Symbol -> Name
```

<Description>{`'nameSetSym n s' returns a name with the same string as 'n'  
but with symbol 's'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameSetSym : Name -> Symbol -> Name =
  lam n : Name. lam s. (n.0, s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameRemoveSym" kind="let">

```mc
let nameRemoveSym n : Name -> Name
```

<Description>{`\`nameRemoveSym\` returns a name wit the same string as the argument, but  
without an associated symbol.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameRemoveSym : Name -> Name = lam n. (n.0, _noSymbol)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameSetStr" kind="let">

```mc
let nameSetStr n str : Name -> String -> Name
```

<Description>{`'nameSetStr n str' returns a new name with string 'str' and  
with the symbol of 'n', if it has a symbol.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameSetStr : Name -> String -> Name =
  lam n : Name. lam str. (str, n.1)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_t1" kind="let">

```mc
let _t1  : Name
```



<ToggleWrapper text="Code..">
```mc
let _t1 = nameNoSym "foo"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_t2" kind="let">

```mc
let _t2  : Name
```



<ToggleWrapper text="Code..">
```mc
let _t2 = nameSym "bar"
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest nameEqStr (nameSetStr _t1 "bar") _t2 with true
utest nameEqStr (nameSetStr _t1 "bar") _t1 with false
utest nameEqStr (nameSetStr _t2 "foo") _t1 with true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameGetStr" kind="let">

```mc
let nameGetStr n : Name -> String
```

<Description>{`'nameGetStr n' returns the string of name 'n'`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameGetStr : Name -> String =
  lam n : Name. n.0
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest nameGetStr (nameNoSym "foo") with "foo"
utest nameGetStr (nameSym "foo") with "foo"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameGetSym" kind="let">

```mc
let nameGetSym n : Name -> Option Symbol
```

<Description>{`'nameGetSym n' returns optionally the symbol of name 'n'.  
If 'n' has no symbol, 'None' is returned.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameGetSym : Name -> Option Symbol =
  lam n : Name. if eqsym n.1 _noSymbol then None () else Some n.1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_s" kind="let">

```mc
let _s  : Symbol
```



<ToggleWrapper text="Code..">
```mc
let _s = gensym ()
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest nameGetSym (nameNoSym "foo") with None () using optionEq eqsym
utest nameGetSym (nameSetSym (nameNoSym "foo") _s) with Some _s using optionEq eqsym
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nameCmp" kind="let">

```mc
let nameCmp n1 n2 : Name -> Name -> Int
```

<Description>{`NOTE\(Linnea, 2021\-01\-26\): This function is temporarily added for performance  
experiments. It is not a total ordering since symbols are not ordered.  
'nameCmp n1 n2' compares two names lexicographically.`}</Description>


<ToggleWrapper text="Code..">
```mc
let nameCmp : Name -> Name -> Int =
  lam n1 : Name. lam n2 : Name.
    match nameGetSym n1 with Some a then
      match nameGetSym n2 with Some b then
        subi (sym2hash a) (sym2hash b)
      else negi 1
    else match nameGetSym n2 with Some _ then 1
    else cmpString (nameGetStr n1) (nameGetStr n2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_s1" kind="let">

```mc
let _s1  : Symbol
```



<ToggleWrapper text="Code..">
```mc
let _s1 = gensym ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_s2" kind="let">

```mc
let _s2  : Symbol
```



<ToggleWrapper text="Code..">
```mc
let _s2 = gensym ()
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest nameCmp (nameSetSym (nameNoSym "foo") _s1) (nameSetSym (nameNoSym "foo") _s1) with 0
utest nameCmp (nameSetSym (nameNoSym "foo") _s1) (nameSetSym (nameNoSym "foo") _s2) with (subi 0 1)
utest nameCmp (nameSetSym (nameNoSym "foo") _s2) (nameSetSym (nameNoSym "foo") _s1) with 1
utest nameCmp (nameNoSym "foo") (nameNoSym "foo") with 0
utest nameCmp (nameNoSym "a") (nameNoSym "A") with 32
utest nameCmp (nameSetSym (nameNoSym "foo") _s1) (nameNoSym "foo") with subi 0 1
utest nameCmp (nameNoSym "foo") (nameSetSym (nameNoSym "foo") _s1) with 1
```
</ToggleWrapper>
</DocBlock>

