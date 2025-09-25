import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# keywords.mc  
  

  
  
  
## Variables  
  

          <DocBlock title="mexprBuiltInKeywords" kind="let">

```mc
let mexprBuiltInKeywords  : [String]
```



<ToggleWrapper text="Code..">
```mc
let mexprBuiltInKeywords = [
  "if", "then", "else", "true", "false", "match", "with", "utest", "type",
  "con", "lang", "let", "recursive", "lam", "in", "end", "syn", "sem", "use",
  "mexpr", "include", "never", "using", "external", "switch", "case", "all"
]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="holeKeywords" kind="let">

```mc
let holeKeywords  : [String]
```



<ToggleWrapper text="Code..">
```mc
let holeKeywords = ["hole", "Boolean", "IntRange", "independent"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="accelerateKeywords" kind="let">

```mc
let accelerateKeywords  : [String]
```



<ToggleWrapper text="Code..">
```mc
let accelerateKeywords = [
  "accelerate", "parallelMap", "flatten", "map2", "reduce", "seqLoop",
  "seqLoopAcc", "loop", "printFloat"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="specializeKeywords" kind="let">

```mc
let specializeKeywords  : [String]
```



<ToggleWrapper text="Code..">
```mc
let specializeKeywords = ["specialize"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mexprExtendedKeywords" kind="let">

```mc
let mexprExtendedKeywords  : [String]
```



<ToggleWrapper text="Code..">
```mc
let mexprExtendedKeywords = concat specializeKeywords (
                              concat holeKeywords accelerateKeywords)
```
</ToggleWrapper>
</DocBlock>

