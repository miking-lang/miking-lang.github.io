import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# parray.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Types  
  

          <DocBlock title="PA" kind="type">

```mc
type PA
```

<Description>{`Pure Array`}</Description>


<ToggleWrapper text="Code..">
```mc
type PA a
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="PAData" kind="con">

```mc
con PAData : all a . (Int, a, a, a, a, a, a, a, a, a, a) -> PA a
```



<ToggleWrapper text="Code..">
```mc
con PAData  : all a. (Int,a,a,a,a,a,a,a,a,a,a) -> PA a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PANode" kind="con">

```mc
con PANode : all a . (Int, Int, PA a, PA a, PA a, PA a, PA a, PA a, PA a, PA a, PA a, PA a) -> PA a
```



<ToggleWrapper text="Code..">
```mc
con PANode  : all a. (Int,Int,PA a,PA a,PA a,PA a,PA a,
                      PA a,PA a,PA a,PA a,PA a) -> PA a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PAEmpty" kind="con">

```mc
con PAEmpty : all a . () -> PA a
```



<ToggleWrapper text="Code..">
```mc
con PAEmpty : all a. () -> PA a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PANext" kind="con">

```mc
con PANext : all a . (PA a) -> PA a
```



<ToggleWrapper text="Code..">
```mc
con PANext  : all a. (PA a) -> PA a
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="emptyPA" kind="let">

```mc
let emptyPA  : all a. PA a
```



<ToggleWrapper text="Code..">
```mc
let emptyPA = PAEmpty()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="prettyPA" kind="let">

```mc
let prettyPA  : PA Int -> (Int -> String) -> String
```

<Description>{`\`prettyPA pa f\` is a simple pretty printer, mostly for internal debugging,  
where f : a \-\> String is a pretty printer for the element of the array.  
The function returns a string.`}</Description>


<ToggleWrapper text="Code..">
```mc
let prettyPA = workPrettyPA ""
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addPA" kind="let">

```mc
let addPA pa y : all a. PA a -> a -> PA a
```

<Description>{`\`addPA pa y\` adds an element \`y\` to the end of the  
pure array \`pa\` and returns a new pure array  
Either you should keep track of the number of elements of your pure array  
in another  variable, or use \`lengthPA\` to get the current number  
of elements.`}</Description>


<ToggleWrapper text="Code..">
```mc
let addPA = lam pa. lam y.
  workAddPA pa y 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="makePA" kind="let">

```mc
let makePA n f : all a. Int -> (Int -> a) -> PA a
```

<Description>{`\`makePA n f\` creates a pure array of size \`n\`, where each element is  
initalized by calling function \`f k\`, where \`k\` is the index for the element`}</Description>


<ToggleWrapper text="Code..">
```mc
let makePA = lam n. lam f.
  workMakePA 0 n f emptyPA
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="workPrettyPA" kind="let">

```mc
let workPrettyPA ident pa f : all a. String -> PA a -> (a -> String) -> String
```



<ToggleWrapper text="Code..">
```mc
let workPrettyPA = lam ident. lam pa. lam f.
  match pa with PAData(i,x0,x1,x2,x3,x4,x5,x6,x7,x8,x9) then
   join ["\n", ident, "PAData(", int2string i,",",
           f x0, ",", f x1, ",", f x2, ",", f x3, ",",
           f x4, ",", f x5, ",", f x6, ",", f x7, ",",
           f x8, ",", f x9, ")"] else
  match pa with PANode(i,l,x0,x1,x2,x3,x4,x5,x6,x7,x8,x9) then
   let g = lam pa. workPrettyPA (concat ident "  ") pa f in
   join ["\n", ident, "PANode(", int2string i, ",", int2string l, ",",
                    g x0, ",", g x1, ",", g x2, ",", g x3, ",",
                    g x4, ",", g x5, ",", g x6, ",", g x7, ",",
                    g x8, ",", g x9, ")"] else
  match pa with PAEmpty() then "E" else
  match pa with PANext(pa2) in workPrettyPA ident pa2 f
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pa2seq" kind="let">

```mc
let pa2seq pa : all a. PA a -> [a]
```

<Description>{`\`pa2seq pa\` converts a pure array to a sequences.`}</Description>


<ToggleWrapper text="Code..">
```mc
let pa2seq = lam pa.
  workPA2seq pa (subi (lengthPA pa) 1) []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="seq2pa" kind="let">

```mc
let seq2pa seq : all b. [b] -> PA b
```

<Description>{`\`seq2pa seq\` converts a sequence to a pure array.`}</Description>


<ToggleWrapper text="Code..">
```mc
let seq2pa = lam seq.
  foldl (lam a. lam x. addPA a x) emptyPA seq
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest prettyPA (makePA 12 (lam x.x)) int2string with
"
PANode(1,10,
  PAData(10,0,1,2,3,4,5,6,7,8,9),
  PAData(2,10,11,10,10,10,10,10,10,10,10),E,E,E,E,E,E,E,E)"

utest lengthPA (makePA 0 (lam. 0)) with 0
utest lengthPA (makePA 8 (lam. 0)) with 8
utest lengthPA (makePA 12 (lam. 0)) with 12

utest pa2seq (makePA 5 (lam x. muli x 2)) with [0,2,4,6,8]
utest pa2seq (makePA 12 (lam x.x)) with [0,1,2,3,4,5,6,7,8,9,10,11]

utest pa2seq (seq2pa [1,4,3,10]) with [1,4,3,10]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="testlen" kind="let">

```mc
let testlen  : Int
```

<Description>{`One large test, including all functions`}</Description>


<ToggleWrapper text="Code..">
```mc
let testlen = 1320
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="setlist" kind="let">

```mc
let setlist  : [(Int, Int)]
```



<ToggleWrapper text="Code..">
```mc
let setlist = [(2,23),(3,77),(4,22),(4,220),(4,891),(4,1317),(4,999)]
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest
  let pa = makePA testlen (lam x.x) in
  let pav =
      foldl (lam acc. lam x. match x with (i,v) in setPA acc i v) pa setlist in
  (lengthPA pav, pa2seq pav)
with
  let ls = createList testlen (lam x.x) in
  let ls2 =
    foldl (lam acc. lam x. match x with (i,v) in set acc i v) ls setlist in
  (testlen, ls2)

-- Another large test, iterates over all lengths, tests all operations
utest
  let steps = 1500 in
  let incv = 1000 in
  recursive
  let getset = lam i. lam l. lam pa.
    if eqi i l then pa
    else
      let v2 = addi (getPA pa i) incv in
      let pa2 = setPA pa i v2 in
      getset (addi i 1) l pa2
  let verify = lam i. lam l. lam pa2.
    if eqi i l then true
    else
    if eqi (getPA pa2 i) (addi i incv) then
      verify (addi i 1) l pa2
    else false
  let maintest = lam l.
    if eqi (addi steps 1) l then true
    else
      let pa = makePA l (lam x.x) in
      let pa2 = getset 0 l pa in
      let pa3 = seq2pa (pa2seq pa2) in
      if eqi (lengthPA pa3) l then
        if verify 0 l pa3 then maintest (addi l 1) else false
      else false
  in
  maintest 0
with true
```
</ToggleWrapper>
</DocBlock>

