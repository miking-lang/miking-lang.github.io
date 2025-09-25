import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConnectedComponentCSV  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="CSVRow" kind="syn">

```mc
syn CSVRow
```



<ToggleWrapper text="Code..">
```mc
syn CSVRow =
  | CC {id: Int,
        deps: [Int],
        size: Float}
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
  | CC _ ->
    ["id-cc", "deps", "size"]
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
  | CC c ->
    [ int2string c.id
    , strJoin "|" (map int2string c.deps)
    , float2string c.size
    ]
```
</ToggleWrapper>
</DocBlock>

