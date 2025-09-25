import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RunCSV  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="CSVRow" kind="syn">

```mc
syn CSVRow
```



<ToggleWrapper text="Code..">
```mc
syn CSVRow =
  | Run {id: Int, nbrRuns: Int, time: Float}
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
sem csvHeader =
  | Run _ ->
    ["id-meas", "nbrRuns", "time"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="csvRow2string" kind="sem">

```mc
sem csvRow2string : CSV_CSVRow -> [String]
```



<ToggleWrapper text="Code..">
```mc
sem csvRow2string =
  | Run r ->
    [ int2string r.id
    , int2string r.nbrRuns
    , float2string r.time
    ]
```
</ToggleWrapper>
</DocBlock>

