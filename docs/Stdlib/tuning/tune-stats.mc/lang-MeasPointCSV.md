import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MeasPointCSV  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="CSVRow" kind="syn">

```mc
syn CSVRow
```



<ToggleWrapper text="Code..">
```mc
syn CSVRow =
  | MeasPoint {id: Int,
               ident: String,
               context: [String],
               deps: [Int],
               searchSpace: Float,
               cc: Int}
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
  | MeasPoint _ ->
    ["id-meas", "ident", "context", "deps", "searchSpace", "connectedComponent"]
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
  | MeasPoint m ->
    [ int2string m.id
    , m.ident
    , strJoin "|" m.context
    , strJoin "|" (map int2string m.deps)
    , float2string m.searchSpace
    , int2string m.cc
    ]
```
</ToggleWrapper>
</DocBlock>

