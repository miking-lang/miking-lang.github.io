import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# info.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  


  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Types  
  

          <DocBlock title="Info" kind="type">

```mc
type Info
```

<Description>{`Data type of info terms`}</Description>


<ToggleWrapper text="Code..">
```mc
type Info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Pos" kind="type">

```mc
type Pos : { filename: String, row: Int, col: Int }
```

<Description>{`Data structure for a positon value`}</Description>


<ToggleWrapper text="Code..">
```mc
type Pos = {filename: String, row: Int, col: Int}
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="Info" kind="con">

```mc
con Info : { filename: String, row1: Int, col1: Int, row2: Int, col2: Int } -> Info
```



<ToggleWrapper text="Code..">
```mc
con Info : {filename: String, row1: Int, col1: Int, row2: Int, col2: Int} -> Info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="NoInfo" kind="con">

```mc
con NoInfo : () -> Info
```



<ToggleWrapper text="Code..">
```mc
con NoInfo : () -> Info
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="testinfo_" kind="let">

```mc
let testinfo_  : Info
```



<ToggleWrapper text="Code..">
```mc
let testinfo_: Info = Info {filename = "testinfo_", row1 = 1, col1 = 5, row2 = 1, col2 = 10}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initPos" kind="let">

```mc
let initPos filename : String -> Pos
```

<Description>{`Crate init position, start of file`}</Description>


<ToggleWrapper text="Code..">
```mc
let initPos : String -> Pos = lam filename.
  {filename = filename, row = 1, col = 0}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="posVal" kind="let">

```mc
let posVal filename row col : String -> Int -> Int -> Pos
```

<Description>{`Create a positon value`}</Description>


<ToggleWrapper text="Code..">
```mc
let posVal : String -> Int -> Int -> Pos = lam filename. lam row. lam col.
  {filename = filename, row = row, col = col}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="advanceCol" kind="let">

```mc
let advanceCol p n : Pos -> Int -> Pos
```

<Description>{`Advance the column with parameter n`}</Description>


<ToggleWrapper text="Code..">
```mc
let advanceCol : Pos -> Int -> Pos = lam p : Pos. lam n.
  {p with col = addi p.col n}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="advanceRow" kind="let">

```mc
let advanceRow p n : Pos -> Int -> Pos
```

<Description>{`Advance the positon with parameter n. Set col to zero.`}</Description>


<ToggleWrapper text="Code..">
```mc
let advanceRow : Pos -> Int -> Pos = lam p : Pos. lam n.
  {{p with row = addi p.row n} with col = 0}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="makeInfo" kind="let">

```mc
let makeInfo p1 p2 : Pos -> Pos -> Info
```

<Description>{`Compose an info strucutre from two positions`}</Description>


<ToggleWrapper text="Code..">
```mc
let makeInfo : Pos -> Pos -> Info = lam p1 : Pos. lam p2 : Pos.
  Info {filename = p1.filename, row1 = p1.row, col1 = p1.col,
        row2 = p2.row, col2 = p2.col}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mergeInfo" kind="let">

```mc
let mergeInfo fi1 fi2 : Info -> Info -> Info
```

<Description>{`Compose an info structure from two other info structures`}</Description>


<ToggleWrapper text="Code..">
```mc
let mergeInfo : Info -> Info -> Info = lam fi1 : Info. lam fi2 : Info.
  match fi1 with Info r1 then
    match fi2 with Info r2 then
      Info {filename = r1.filename, row1 = r1.row1, col1 = r1.col1,
            row2 = r2.row2, col2 = r2.col2}
    else fi1
  else fi2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoVal" kind="let">

```mc
let infoVal filename r1 c1 r2 c2 : String -> Int -> Int -> Int -> Int -> Info
```

<Description>{`Create an info structure`}</Description>


<ToggleWrapper text="Code..">
```mc
let infoVal : String -> Int -> Int -> Int -> Int -> Info =
  lam filename. lam r1. lam c1. lam r2. lam c2.
  Info {filename = filename, row1 = r1, col1 = c1, row2 = r2, col2 = c2}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="info2str" kind="let">

```mc
let info2str fi : Info -> String
```

<Description>{`Generate a string from an info`}</Description>


<ToggleWrapper text="Code..">
```mc
let info2str : Info -> String = lam fi.
  match fi with NoInfo () then "<No file info>" else
  match fi with Info (r & {row1 = 0}) then
    join ["<", r.filename, ">"]
  else match fi with Info r then
    join ["<", r.filename, " ", int2string r.row1, ":", int2string r.col1,
    "-", int2string r.row2, ":", int2string r.col2, ">"]
  else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoErrorString" kind="let">

```mc
let infoErrorString fi str : Info -> String -> String
```

<Description>{`Generate an info error string`}</Description>


<ToggleWrapper text="Code..">
```mc
let infoErrorString : Info -> String -> String = lam fi. lam str.
    join ["ERROR ", info2str fi, ":\n", str]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoWarningString" kind="let">

```mc
let infoWarningString fi str : Info -> String -> String
```



<ToggleWrapper text="Code..">
```mc
let infoWarningString : Info -> String -> String = lam fi. lam str.
    join ["WARNING ", info2str fi, ":\n", str]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoErrorExit" kind="let">

```mc
let infoErrorExit fi str : all a. Info -> String -> a
```

<Description>{`Print an error with info struct info and exit \(error code 1\)`}</Description>


<ToggleWrapper text="Code..">
```mc
let infoErrorExit : Info -> String -> Unknown = lam fi. lam str.
  print (join ["\n", (infoErrorString fi str), "\n"]);
  exit 1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="posErrorExit" kind="let">

```mc
let posErrorExit p str : all a. Pos -> String -> a
```

<Description>{`Print an error with position info and exit \(error code 1\)`}</Description>


<ToggleWrapper text="Code..">
```mc
let posErrorExit : Pos -> String -> Unknown = lam p : Pos. lam str.
  infoErrorExit (infoVal p.filename p.row p.col p.row p.col) str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoCmp" kind="let">

```mc
let infoCmp i1 i2 : Info -> Info -> Int
```

<Description>{`Comparison function for info struct`}</Description>


<ToggleWrapper text="Code..">
```mc
let infoCmp : Info -> Info -> Int = lam i1. lam i2.
  cmpString (info2str i1) (info2str i2)
```
</ToggleWrapper>
</DocBlock>

