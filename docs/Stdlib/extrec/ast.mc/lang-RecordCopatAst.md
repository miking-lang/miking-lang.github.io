import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordCopatAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Copat" kind="syn">

```mc
syn Copat
```



<ToggleWrapper text="Code..">
```mc
syn Copat =
  | RecordCopat {info : Info,
                 fields : [String]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="copatInfo" kind="sem">

```mc
sem copatInfo : CopatAst_Copat -> Info
```



<ToggleWrapper text="Code..">
```mc
sem copatInfo =
  | RecordCopat c -> c.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="copatWithInfo" kind="sem">

```mc
sem copatWithInfo : all a. a -> CopatAst_Copat -> {info: a}
```



<ToggleWrapper text="Code..">
```mc
sem copatWithInfo info =
  | RecordCopat c -> { info = info}
```
</ToggleWrapper>
</DocBlock>

