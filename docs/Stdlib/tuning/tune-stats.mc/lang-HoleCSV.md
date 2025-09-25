import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# HoleCSV  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="CSVRow" kind="syn">

```mc
syn CSVRow
```



<ToggleWrapper text="Code..">
```mc
syn CSVRow =
  | Hole {id: Int,
          ident: String,
          context: [String],
          deps: [Int],
          domainSize: Int,
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
  | Hole _ ->
    ["id-hole", "ident", "context", "deps", "domainSize", "connectedComponent"]
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
  | Hole h ->
    [ int2string h.id
    , h.ident
    , strJoin "|" h.context
    , strJoin "|" (map int2string h.deps)
    , int2string h.domainSize
    , int2string h.cc
    ]
```
</ToggleWrapper>
</DocBlock>

