import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CSV  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="CSVRow" kind="syn">

```mc
syn CSVRow
```



<ToggleWrapper text="Code..">
```mc
syn CSVRow =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="csvHeader" kind="sem">

```mc
sem csvHeader : CSV_CSVRow -> [String]
```



<ToggleWrapper text="Code..">
```mc
sem csvHeader : CSVRow -> [String]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="csvRow2string" kind="sem">

```mc
sem csvRow2string : CSV_CSVRow -> [String]
```



<ToggleWrapper text="Code..">
```mc
sem csvRow2string : CSVRow -> [String]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="csvString2Row" kind="sem">

```mc
sem csvString2Row : [String] -> CSV_CSVRow
```



<ToggleWrapper text="Code..">
```mc
sem csvString2Row : [String] -> CSVRow
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="csvWrite" kind="sem">

```mc
sem csvWrite : String -> [CSV_CSVRow] -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem csvWrite sep =
  | rows ->
    match rows with [] then ""
    else
      let header: String = strJoin sep (csvHeader (head rows)) in
      let strRows: [[String]] = map csvRow2string rows in
      let strRowsSep: [String] = map (strJoin sep) strRows in
      let str = cons header strRowsSep in
      concat (strJoin "\n" str) "\n"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="csvRead" kind="sem">

```mc
sem csvRead : ([String] -> CSV_CSVRow) -> String -> Bool -> String -> [CSV_CSVRow]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem csvRead string2row sep header =
  | str ->
    let rows: [String] = strSplit "\n" (strTrim str) in
    let rows: [[String]] = map (strSplit sep) rows in
    match rows with [] then []
    else
      let rows = if header then tail rows else rows in
      map string2row rows
```
</ToggleWrapper>
</DocBlock>

