import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RendererInterface  
  

  
  
  
## Semantics  
  

          <DocBlock title="renderSetup" kind="sem">

```mc
sem renderSetup : ObjectTree -> RenderingOptions -> ()
```

<Description>{`Called before rendering starts for all files.  
Typically used to generate global headers.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderSetup : ObjectTree -> RenderingOptions -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderHeader" kind="sem">

```mc
sem renderHeader : Object -> RenderingOptions -> String
```

<Description>{`Called before rendering each file.  
Typically used to push file headers or includes.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderHeader : Object -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderFooter" kind="sem">

```mc
sem renderFooter : Object -> RenderingOptions -> String
```

<Description>{`Called after rendering each file.  
Can be used to push file footers.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderFooter : Object -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderTopPageDoc" kind="sem">

```mc
sem renderTopPageDoc : RenderingData -> RenderingOptions -> String
```

<Description>{`Renders the top section of a page.  
Includes code toggle, and top documentation.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderTopPageDoc : RenderingData -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocBloc" kind="sem">

```mc
sem renderDocBloc : RenderingData -> RenderingOptions -> String
```

<Description>{`Renders a documentation block for an object.  
Includes title, goto link, code toggle, top doc, and signature.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocBloc : RenderingData -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocSignature" kind="sem">

```mc
sem renderDocSignature : Object -> RenderingOptions -> String
```

<Description>{`Renders the signature of an object.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocSignature : Object -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocDescription" kind="sem">

```mc
sem renderDocDescription : Object -> RenderingOptions -> String
```

<Description>{`Renders the documentation string of an object \(from its \`doc\` field\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocDescription : Object -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocTests" kind="sem">

```mc
sem renderDocTests : RenderingData -> RenderingOptions -> String
```

<Description>{`Renders the unit tests associated with an object.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocTests : RenderingData -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderLinkList" kind="sem">

```mc
sem renderLinkList : [Object] -> RenderingOptions -> String
```

<Description>{`Renders a list of links for a list of objects.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderLinkList : [Object] -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderGotoLink" kind="sem">

```mc
sem renderGotoLink : String -> RenderingOptions -> String
```

<Description>{`Renders a single "goto" link to another documentation page.  
Takes the raw link, then calls renderLink internally.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderGotoLink : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderLink" kind="sem">

```mc
sem renderLink : String -> String -> RenderingOptions -> String
```

<Description>{`Renders a single link: first argument is title, second is raw link.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderLink : String -> String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderHidenCode" kind="sem">

```mc
sem renderHidenCode : String -> Bool -> RenderingOptions -> String
```

<Description>{`Renders a block of code wrapped in a toggleable hidden section.  
Bool argument decides whether it starts hidden.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderHidenCode : String -> Bool -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderCodeWithPreview" kind="sem">

```mc
sem renderCodeWithPreview : RenderingData -> RenderingOptions -> String
```

<Description>{`Renders code with preview:  
\- Left part \(raw code\)  
\- Right part \(hidden code via renderHidenCode\)  
\- Trimmed part \(raw, always visible\)  
If the right part is empty, no toggle is shown.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderCodeWithPreview : RenderingData -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderCodeWithoutPreview" kind="sem">

```mc
sem renderCodeWithoutPreview : RenderingData -> RenderingOptions -> String
```

<Description>{`Renders code directly, without preview/toggling.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderCodeWithoutPreview : RenderingData -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderSourceCodeStr" kind="sem">

```mc
sem renderSourceCodeStr : String -> RenderingOptions -> String
```

<Description>{`Renders a source code string with syntax highlighting.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderSourceCodeStr : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderSourceCode" kind="sem">

```mc
sem renderSourceCode : SourceCode -> RenderingOptions -> String
```

<Description>{`Renders structured source code \(tokenized/colored\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderSourceCode : SourceCode -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderWord" kind="sem">

```mc
sem renderWord : SourceCodeWord -> RenderingOptions -> String
```

<Description>{`Renders a single token word.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderWord : SourceCodeWord -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderTreeSourceCode" kind="sem">

```mc
sem renderTreeSourceCode : [TreeSourceCode] -> Object -> RenderingOptions -> RenderingData
```

<Description>{`Renders top\-level source code for an object.  
Takes children TreeSourceCode and produces RenderingData.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderTreeSourceCode : [TreeSourceCode] -> Object -> RenderingOptions -> RenderingData
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderSectionTitle" kind="sem">

```mc
sem renderSectionTitle : String -> RenderingOptions -> String
```

<Description>{`Renders a section title \(e.g., "Variables", "Types"\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderSectionTitle : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderBold" kind="sem">

```mc
sem renderBold : String -> RenderingOptions -> String
```

<Description>{`Renders a string in bold.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderBold : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderRemoveDocForbidenChars" kind="sem">

```mc
sem renderRemoveDocForbidenChars : String -> RenderingOptions -> String
```

<Description>{`Sanitizes a string for safe inclusion in documentation.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderRemoveDocForbidenChars : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderRemoveCodeForbidenChars" kind="sem">

```mc
sem renderRemoveCodeForbidenChars : String -> RenderingOptions -> String
```

<Description>{`Sanitizes a string for safe inclusion in code.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderRemoveCodeForbidenChars : String -> RenderingOptions -> String    
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderTitle" kind="sem">

```mc
sem renderTitle : Int -> String -> RenderingOptions -> String
```

<Description>{`Renders a page title, size determines heading level  
\(larger size \-\> smaller title\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderTitle : Int -> String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderObjTitle" kind="sem">

```mc
sem renderObjTitle : Int -> Object -> RenderingOptions -> String
```

<Description>{`Calls renderTitle with the title of an object.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderObjTitle : Int -> Object -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderText" kind="sem">

```mc
sem renderText : String -> RenderingOptions -> String
```

<Description>{`Renders a block of text.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderText : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderType" kind="sem">

```mc
sem renderType : String -> RenderingOptions -> String
```

<Description>{`Renders a type word.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderType : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderVar" kind="sem">

```mc
sem renderVar : String -> RenderingOptions -> String
```

<Description>{`Renders a variable word.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderVar : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderKeyword" kind="sem">

```mc
sem renderKeyword : String -> RenderingOptions -> String
```

<Description>{`Renders a keyword.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderKeyword : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderComment" kind="sem">

```mc
sem renderComment : String -> RenderingOptions -> String
```

<Description>{`Renders a comment.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderComment : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderString" kind="sem">

```mc
sem renderString : String -> RenderingOptions -> String
```

<Description>{`Renders a string literal.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderString : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderNumber" kind="sem">

```mc
sem renderNumber : String -> RenderingOptions -> String
```

<Description>{`Renders a number literal.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderNumber : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDefault" kind="sem">

```mc
sem renderDefault : String -> RenderingOptions -> String
```

<Description>{`Renders a word with the default color.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDefault : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderMultiLineComment" kind="sem">

```mc
sem renderMultiLineComment : String -> RenderingOptions -> String
```

<Description>{`Renders a multi\-line comment.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderMultiLineComment : String -> RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderNewLine" kind="sem">

```mc
sem renderNewLine : RenderingOptions -> String
```

<Description>{`Renders a single newline.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderNewLine : RenderingOptions -> String
```
</ToggleWrapper>
</DocBlock>

