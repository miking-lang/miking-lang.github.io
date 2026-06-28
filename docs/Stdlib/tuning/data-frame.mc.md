import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# data-frame.mc  
  

Implements a data structure for storing a matrix of values. Slicing out  
certain columns of the matrix is simple.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/eqset.mc"} style={S.link}>eqset.mc</a>  
  
## Types  
  

          <DocBlock title="DataFrame" kind="type">

```mc
type DataFrame
```



<ToggleWrapper text="Code..">
```mc
type DataFrame a = {
  data : [[a]],
  ncols : Int
}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="dataFrameFromSeq" kind="let">

```mc
let dataFrameFromSeq data ncols : all a. [[a]] -> Int -> DataFrame a
```

<Description>{`'dataFrameFromSeq data ncols' creates a new data frame from 'data', where  
'ncols' is the length of each row in 'data'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameFromSeq
  : all a. [[a]] -> Int -> DataFrame a
  = lam data : [[a]]. lam ncols : Int.
    -- Assert dimensions match
    utest forAll (lam row. eqi (length row) ncols) data with true in
    {data = data, ncols = ncols}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrameLength" kind="let">

```mc
let dataFrameLength df : all a. DataFrame a -> Int
```

<Description>{`'dataFrameLength df' returns the number of rows stored in 'df'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameLength : all a. DataFrame a -> Int = lam df : DataFrame a.
  length df.data
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrameSlice" kind="let">

```mc
let dataFrameSlice idxs df : all a. [Int] -> DataFrame a -> [[a]]
```

<Description>{`'dataFrameSlice idxs df' returns all rows of 'df' for the column indices  
listed in 'idxs'. Produces a runtime error if an index in 'idxs' is outside  
the range of 'df.ncols'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameSlice
  : all a. [Int] -> DataFrame a -> [[a]]
  = lam idxs : [Int]. lam df : DataFrame a.
    utest forAll (lam i. lti i df.ncols) idxs with true in
    map (lam row. map (get row) idxs) df.data
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrameHasRowSlice" kind="let">

```mc
let dataFrameHasRowSlice eq idxs row df : all a. (a -> a -> Bool) -> [Int] -> [a] -> DataFrame a -> Option Int
```

<Description>{`'dataFrameHasRowSlice eq idxs row df' returns optionally the index of 'row'  
in 'df', slicing out the indices listed in 'idxs' and comparing using 'eq'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameHasRowSlice
  : all a. (a -> a -> Bool) -> [Int] -> [a] -> DataFrame a -> Option Int
  = lam eq. lam idxs: [Int]. lam row: [a]. lam df.
    utest length idxs with length row in

    let slice = dataFrameSlice idxs df in
    match
      foldl (lam acc : (Int, Option Int). lam r.
        match acc with (_, Some _) then acc
        else
          if eqSeq eq r row then (addi 1 acc.0, Some acc.0)
          else (addi 1 acc.0, None ())
      ) (0, None ()) slice
    with (_, opt) in opt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrameHasRow" kind="let">

```mc
let dataFrameHasRow eq row df : all a. (a -> a -> Bool) -> [a] -> DataFrame a -> Option Int
```

<Description>{`'dataFrameHasRow eq row df' returns optionally the index of 'row' in 'df',  
comparing values using 'eq'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameHasRow
  : all a. (a -> a -> Bool)  -> [a] -> DataFrame a -> Option Int
  = lam eq. lam row: [a]. lam df.
  utest length row with df.ncols using eqi in

  match
    foldl (lam acc : (Int, Option Int). lam r.
      match acc with (_, Some _) then acc
      else
        if eqSeq eq r row then (addi 1 acc.0, Some acc.0)
        else (addi 1 acc.0, None ())
    ) (0, None ()) df.data
  with (_, opt) in opt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrameGetRow" kind="let">

```mc
let dataFrameGetRow i df : all a. Int -> DataFrame a -> [a]
```

<Description>{`'dataFrameGetRow i df' returns the 'i'th row in 'df'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameGetRow
  : all a. Int -> DataFrame a -> [a]
  = lam i. lam df.
  utest lti i (length df.data) with true in
  get df.data i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrameGetRowSlice" kind="let">

```mc
let dataFrameGetRowSlice i idxs df : all a. Int -> [Int] -> DataFrame a -> [a]
```

<Description>{`'dataFrameGetRowSlice i idxs df' returns the 'i'th row, with column indices in  
'idxs'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameGetRowSlice
  : all a. Int -> [Int] -> DataFrame a -> [a]
  = lam i. lam idxs. lam df.
  utest lti i (length df.data) with true in
  utest forAll (lam i. lti i df.ncols) idxs with true in
  let row = get df.data i in
  map (get row) idxs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrameSetRowSlice" kind="let">

```mc
let dataFrameSetRowSlice i idxs row df : all a. Int -> [Int] -> [a] -> DataFrame a -> DataFrame a
```

<Description>{`'dataFrameSetRowSlice i idxs row df' returns a new data frame where the row at  
index 'i' has been replaced by 'row' on the positions specified by 'idxs'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameSetRowSlice
  : all a. Int -> [Int] -> [a] -> DataFrame a -> DataFrame a
  = lam i. lam idxs: [Int]. lam row: [a]. lam df: DataFrame a.
  utest forAll (lam i. lti i df.ncols) idxs with true in

  let old = get df.data i in
  let new = foldl (lam acc. lam idxVal.
    match idxVal with (i, v) in
    set acc i v) old (zip idxs row)
  in {df with data = set df.data i new}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrameSetRow" kind="let">

```mc
let dataFrameSetRow i row df : all a. Int -> [a] -> DataFrame a -> DataFrame a
```

<Description>{`'dataFrameSetRow i row df' returns a new data frame where the row at index  
'i' has been replaced by 'row'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameSetRow
  : all a. Int -> [a] -> DataFrame a -> DataFrame a
  = lam i. lam row: [a]. lam df: DataFrame a.
  utest length row with df.ncols in
  {df with data = set df.data i row}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrameExtendCols" kind="let">

```mc
let dataFrameExtendCols n idxs v df : all a. Int -> [Int] -> a -> DataFrame a -> DataFrame a
```

<Description>{`'dataFrameExtendCols n idxs v df' returns a new data frame with 'n' columns,  
where 'n' \>= 'df.ncols'. The old columns are mapped to the indices in 'idxs',  
where 'length idxs = df.ncols'. The new locations are filled with the value  
'v'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameExtendCols
  : all a. Int -> [Int] -> a -> DataFrame a -> DataFrame a
  = lam n. lam idxs. lam v. lam df.
  utest length idxs with df.ncols using eqi in
  utest geqi n df.ncols with true in

  let data = map (lam old.
    let new = create n (lam. v) in
    foldl (lam acc. lam idxVal.
      match idxVal with (i,val) in
      set acc i val) new (zip idxs old)
  ) df.data in
  {data = data, ncols = n}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrameAddRow" kind="let">

```mc
let dataFrameAddRow row df : all a. [a] -> DataFrame a -> DataFrame a
```

<Description>{`'dataFrameAddRow row df' adds the 'row' to 'df'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameAddRow
  : all a. [a] -> DataFrame a -> DataFrame a
  = lam row. lam df.
  utest length row with df.ncols using eqi in
  {df with data = snoc df.data row}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrameRemoveRow" kind="let">

```mc
let dataFrameRemoveRow i df : all a. Int -> DataFrame a -> DataFrame a
```

<Description>{`'dataFrameAddRow row df' adds the 'row' to 'df'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameRemoveRow
  : all a. Int -> DataFrame a -> DataFrame a
  = lam i. lam df.
  match splitAt df.data i with (l, r) in
  {df with data = concat l (tail r)}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrameMap" kind="let">

```mc
let dataFrameMap f df : all a. all b. (a -> b) -> DataFrame a -> DataFrame b
```

<Description>{`'dataFrameMap f df' returns a new data frame where 'f' has been applied to  
each element in 'df'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameMap
  : all a. all b. (a -> b) -> DataFrame a -> DataFrame b
  = lam f. lam df.
    let data = map (map f) df.data in
    {data = data, ncols = df.ncols}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrame2str" kind="let">

```mc
let dataFrame2str toStr df : all a. (a -> String) -> DataFrame a -> String
```

<Description>{`'dataFrame2str toStr df' returns a string representation of 'df', where each  
element is converted to string using 'toStr'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrame2str = lam toStr. lam df.
  let df = dataFrameMap toStr df in
  strJoin "\n" (map (strJoin " ") df.data)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataFrameEq" kind="let">

```mc
let dataFrameEq eq df1 df2 : all a. all b. (a -> b -> Bool) -> DataFrame a -> DataFrame b -> Bool
```

<Description>{`'dataFrameEq eq df1 df2' checks whether 'df1' and 'df2' are equal, using  
element\-wise equality function 'eq'. Two data frames are equal if they  
contain the same rows, order not considered.`}</Description>


<ToggleWrapper text="Code..">
```mc
let dataFrameEq
  : all a. all b. (a -> b -> Bool) -> DataFrame a -> DataFrame b -> Bool
  = lam eq : a -> b -> Bool. lam df1 : DataFrame a. lam df2 : DataFrame b.
    if eqi df1.ncols df2.ncols then
      eqsetEqual (eqSeq eq) df1.data df2.data
    else false
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

let debug = false in

let df = dataFrameFromSeq [[1,2,3],[4,5,6]] 3 in

utest df with {data = [[1,2,3],[4,5,6]], ncols = 3} in

utest dataFrameLength df with 2 in

utest dataFrameSlice [0,2] df with [[1,3],[4,6]] in

utest dataFrameHasRowSlice eqi [0,2] [1,3] df with Some 0 in
utest dataFrameHasRowSlice eqi [0,2] [4,6] df with Some 1 in
utest dataFrameHasRowSlice eqi [0,2] [4,7] df with None () in

utest dataFrameHasRow eqi [1,2,3] df with Some 0 in
utest dataFrameHasRow eqi [4,5,6] df with Some 1 in
utest dataFrameHasRow eqi [4,4,6] df with None () in

utest dataFrameSetRowSlice 0 [0] [42] df with {data = [[42,2,3],[4,5,6]], ncols=3} in
utest dataFrameSetRowSlice 1 [1,2] [42,43] df with {data = [[1,2,3],[4,42,43]], ncols=3} in
utest dataFrameSetRow 1 [42,43,3] df with {data = [[1,2,3],[42,43,3]], ncols=3} in

utest dataFrameExtendCols 5 [0,1,3] 0 df with {data = [[1,2,0,3,0],[4,5,0,6,0]], ncols=5} in
utest dataFrameExtendCols 3 [0,1,2] 0 df with {data = [[1,2,3],[4,5,6]], ncols=3} in
utest dataFrameExtendCols 3 [2,1,0] 0 df with {data = [[3,2,1],[6,5,4]], ncols=3} in

utest dataFrameMap (addi 1) df with {data = [[2,3,4],[5,6,7]], ncols = 3} in

utest
  let s = dataFrame2str int2string df in
  if debug then printLn s else ()
with () in

utest dataFrameEq eqi df df with true in
utest dataFrameEq eqi df (dataFrameFromSeq [[4,5,6],[1,2,3]] 3) with true in
utest dataFrameEq eqi df (dataFrameFromSeq [[0,2,3],[4,5,6]] 3) with false in
utest dataFrameEq eqi df (dataFrameFromSeq [[4,5,6,7],[1,2,3,4]] 4) with false in

utest dataFrameAddRow [7,8,9] df with dataFrameFromSeq [[1,2,3],[4,5,6],[7,8,9]] 3
using dataFrameEq eqi in

utest dataFrameRemoveRow 0 df with dataFrameFromSeq [[4,5,6]] 3
using dataFrameEq eqi in
utest dataFrameRemoveRow 1 df with dataFrameFromSeq [[1,2,3]] 3
using dataFrameEq eqi in

()
```
</ToggleWrapper>
</DocBlock>

