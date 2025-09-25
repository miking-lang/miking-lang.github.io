import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# _testCSV  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="CSVRow" kind="syn">

```mc
syn CSVRow
```



<ToggleWrapper text="Code..">
```mc
syn CSVRow =
  | Data {col1: Int, col2: Float}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="csvRow2string" kind="sem">

```mc
sem csvRow2string : CSV_CSVRow -> [String]
```



<ToggleWrapper text="Code..">
```mc
sem csvRow2string =
  | Data {col1 = col1, col2 = col2} ->
    [ int2string col1
    , float2string col2
    ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="csvHeader" kind="sem">

```mc
sem csvHeader : CSV_CSVRow -> [String]
```



<ToggleWrapper text="Code..">
```mc
sem csvHeader =
  | Data {col1 = col1, col2 = col2} ->
    [ "col1"
    , "col2"
    ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="csvString2Row" kind="sem">

```mc
sem csvString2Row : [String] -> CSV_CSVRow
```



<ToggleWrapper text="Code..">
```mc
sem csvString2Row =
  | row ->
    Data {col1 = string2int (get row 0),
          col2 = string2float (get row 1)}
```
</ToggleWrapper>
</DocBlock>

