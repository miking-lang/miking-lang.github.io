import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# HtmlAnnotator  
  

  
  
  
## Semantics  
  

          <DocBlock title="escapeContent" kind="sem">

```mc
sem escapeContent : String -> Annotator_Output
```



<ToggleWrapper text="Code..">
```mc
sem escapeContent = | str -> join (map _escapeHtmlChar str)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="escapeAnnot" kind="sem">

```mc
sem escapeAnnot : String -> Annotator_Annotation
```



<ToggleWrapper text="Code..">
```mc
sem escapeAnnot = | str -> join (map _escapeHtmlChar str)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="annotate" kind="sem">

```mc
sem annotate : Annotator_Annotation -> Annotator_Output -> Annotator_Output
```



<ToggleWrapper text="Code..">
```mc
sem annotate annot = | str -> join
    [ "<span class=\"tagged\"><div class=\"tag\">"
    , annot
    , "</div>"
    , str
    , "</span>"
    ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="document" kind="sem">

```mc
sem document : Annotator_Title -> Annotator_Output -> Annotator_Output
```



<ToggleWrapper text="Code..">
```mc
sem document title = | str ->
    join ["<h1>", title, "</h1>\n", str, "\n\n"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="finalize" kind="sem">

```mc
sem finalize : Annotator_Output -> Annotator_Output
```



<ToggleWrapper text="Code..">
```mc
sem finalize = | str ->
    join [_templateBefore, str, _templateAfter]
```
</ToggleWrapper>
</DocBlock>

