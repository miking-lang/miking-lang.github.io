import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Annotator  
  

  
  
  
## Types  
  

          <DocBlock title="Annotation" kind="type">

```mc
type Annotation : String
```



<ToggleWrapper text="Code..">
```mc
type Annotation = String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Output" kind="type">

```mc
type Output : String
```



<ToggleWrapper text="Code..">
```mc
type Output = String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Title" kind="type">

```mc
type Title : String
```



<ToggleWrapper text="Code..">
```mc
type Title = String
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="escapeContent" kind="sem">

```mc
sem escapeContent : String -> Annotator_Output
```



<ToggleWrapper text="Code..">
```mc
sem escapeContent : String -> Output
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="escapeAnnot" kind="sem">

```mc
sem escapeAnnot : String -> Annotator_Annotation
```



<ToggleWrapper text="Code..">
```mc
sem escapeAnnot : String -> Annotation
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="annotate" kind="sem">

```mc
sem annotate : Annotator_Annotation -> Annotator_Output -> Annotator_Output
```



<ToggleWrapper text="Code..">
```mc
sem annotate : Annotation -> Output -> Output
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="document" kind="sem">

```mc
sem document : Annotator_Title -> Annotator_Output -> Annotator_Output
```



<ToggleWrapper text="Code..">
```mc
sem document : Title -> Output -> Output
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="finalize" kind="sem">

```mc
sem finalize : Annotator_Output -> Annotator_Output
```



<ToggleWrapper text="Code..">
```mc
sem finalize : Output -> Output
```
</ToggleWrapper>
</DocBlock>

