import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# HtmlRenderer  
  

The HTML renderer implementation 

  
  
  
## Semantics  
  

          <DocBlock title="renderSetup" kind="sem">

```mc
sem renderSetup : ObjectTree -> RenderingOptions -> ()
```

<Description>{`Create the scripts and stylesheet in the output folder.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderSetup obj =
    | { fmt = Html {} } & opt ->
        let openAndWrite = lam s. lam path.
            let path = join [opt.outputFolder, "/", path] in
            match fileWriteOpen path with Some wc then
                fileWriteString wc s;
                fileWriteClose wc
            else
                renderingWarn (join ["Failed to create ", path, " file."])
        in
        openAndWrite (searchJs (objToJsDict opt obj)) (searchPath ".js");
        openAndWrite htmlStyle htmlStylePath;
        openAndWrite htmlScript htmlScriptPath
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderHeader" kind="sem">

```mc
sem renderHeader : Object -> RenderingOptions -> String
```

<Description>{`Page/file header: injects theme header and object name into the HTML head/body.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderHeader obj =
    | { fmt = Html {} } & opt -> getHeader (objName obj)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderTitle" kind="sem">

```mc
sem renderTitle : Int -> String -> RenderingOptions -> String
```

<Description>{`HTML heading: delegates inner text to raw title rendering, then wraps as \<hN\>.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderTitle size s =
    | { fmt = Html {} } & opt ->
        let sizeStr = int2string (if gti size 6 then 6 else size) in
        join ["<h", sizeStr, ">", renderTitle size s { opt with fmt = Raw { fmt = Html {}} }, "</h", sizeStr, ">", renderNewLine opt]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderBold" kind="sem">

```mc
sem renderBold : String -> RenderingOptions -> String
```

<Description>{`Bold text`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderBold (text : String) =
    | { fmt = Html {} } & opt -> join ["<strong>", text, "</strong>"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderFooter" kind="sem">

```mc
sem renderFooter : Object -> RenderingOptions -> String
```

<Description>{`Page/file footer`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderFooter obj =
    | { fmt = Html {} } & opt -> "</div></body>\n</html>"   
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderNewLine" kind="sem">

```mc
sem renderNewLine : RenderingOptions -> String
```

<Description>{`New line for inline contexts`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderNewLine =
    | { fmt = Html {} } & opt -> "<br>"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderRemoveDocForbidenChars" kind="sem">

```mc
sem renderRemoveDocForbidenChars : String -> RenderingOptions -> String
```

<Description>{`Escaping for documentation content \(also normalizes \`\<br\>\` to actual newlines\)`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderRemoveDocForbidenChars (s: String) =
    | { fmt = Html {} } & opt ->
        switch s
        case "&" ++ s then concat "&amp;" (renderRemoveDocForbidenChars s opt)
        case "<br>" ++ s then cons '\n' (renderRemoveDocForbidenChars s opt)
        case "<" ++ s then concat "&lt;" (renderRemoveDocForbidenChars s opt)
        case ">" ++ s then concat "&gt;" (renderRemoveDocForbidenChars s opt)    
        case [x] ++ s then cons x (renderRemoveDocForbidenChars s opt)
        case "" then ""
        end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderRemoveCodeForbidenChars" kind="sem">

```mc
sem renderRemoveCodeForbidenChars : String -> RenderingOptions -> String
```

<Description>{`Code escaping reuses the doc escaping logic`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderRemoveCodeForbidenChars (s: String) =
    | { fmt = Html {} } & opt -> renderRemoveDocForbidenChars s opt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="htmlRenderSpan" kind="sem">

```mc
sem htmlRenderSpan : String -> String -> String
```

<Description>{`Small helper to wrap inner content with an HTML span and a CSS classNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem htmlRenderSpan =
    | content -> lam kind. join ["<span class=\"", kind, "\">", content, "</span>"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderType" kind="sem">

```mc
sem renderType : String -> RenderingOptions -> String
```

<Description>{`Syntax coloring: types, vars, keywords, comments, strings, multi\-line comments, numbers`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderType (content : String) = 
    | { fmt = Html {} } & opt -> htmlRenderSpan content "tp"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderVar" kind="sem">

```mc
sem renderVar : String -> RenderingOptions -> String
```



<ToggleWrapper text="Code..">
```mc
sem renderVar (content : String) =
    | { fmt = Html {} } & opt -> htmlRenderSpan content "var"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderKeyword" kind="sem">

```mc
sem renderKeyword : String -> RenderingOptions -> String
```



<ToggleWrapper text="Code..">
```mc
sem renderKeyword (content : String) =
    | { fmt = Html {} } & opt -> htmlRenderSpan content "kw"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderComment" kind="sem">

```mc
sem renderComment : String -> RenderingOptions -> String
```



<ToggleWrapper text="Code..">
```mc
sem renderComment (content : String) =
    | { fmt = Html {} } & opt -> htmlRenderSpan content "comment"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderString" kind="sem">

```mc
sem renderString : String -> RenderingOptions -> String
```



<ToggleWrapper text="Code..">
```mc
sem renderString (content : String) =
    | { fmt = Html {} } & opt -> htmlRenderSpan content "string"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderMultiLineComment" kind="sem">

```mc
sem renderMultiLineComment : String -> RenderingOptions -> String
```



<ToggleWrapper text="Code..">
```mc
sem renderMultiLineComment (content : String) =
    | { fmt = Html {} } & opt -> htmlRenderSpan content "multi"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderNumber" kind="sem">

```mc
sem renderNumber : String -> RenderingOptions -> String
```



<ToggleWrapper text="Code..">
```mc
sem renderNumber (content : String) =
    | { fmt = Html {} } & opt -> htmlRenderSpan content "number"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="htmlRenderWrapper" kind="sem">

```mc
sem htmlRenderWrapper : all a. RenderingOptions -> String -> (a -> RenderingOptions -> String) -> a -> String -> String
```

<Description>{`Wrapper that renders inner content via raw renderer, then wraps it with HTMLNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem htmlRenderWrapper =
    | opt -> lam left. lam f. lam arg. lam right.
        let inner = f arg { opt with fmt = Raw { fmt = Html {} } } in
        match inner with "" then "" else join [left, inner, right]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderTopPageDoc" kind="sem">

```mc
sem renderTopPageDoc : RenderingData -> RenderingOptions -> String
```

<Description>{`Top\-of\-page documentation wrapper`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderTopPageDoc (data: RenderingData) =
    | { fmt = Html {} } & opt -> htmlRenderWrapper opt "<div class=\"top-doc\">\n<pre>" renderTopPageDoc data "</pre>\n</div>"    
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocBloc" kind="sem">

```mc
sem renderDocBloc : RenderingData -> RenderingOptions -> String
```

<Description>{`Doc block wrapper; the Bool controls the goto\-link inclusion`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocBloc (data : RenderingData) =
    | { fmt = Html {} } & opt -> htmlRenderWrapper opt "<div class=\"doc-block\">\n<pre>" renderDocBloc data "</pre>\n</div>"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocDescription" kind="sem">

```mc
sem renderDocDescription : Object -> RenderingOptions -> String
```

<Description>{`Object description wrapper`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocDescription (obj: Object) =
    | { fmt = Html {} } & opt -> htmlRenderWrapper opt "<div class = \"doc-description\"><pre>" renderDocDescription obj "</pre></div>"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocSignature" kind="sem">

```mc
sem renderDocSignature : Object -> RenderingOptions -> String
```

<Description>{`Object signature wrapper`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocSignature (obj: Object) =
    | { fmt = Html {} } & opt -> htmlRenderWrapper opt "<div class=\"doc-signature\">" renderDocSignature obj "</div>"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderCodeWithoutPreview" kind="sem">

```mc
sem renderCodeWithoutPreview : RenderingData -> RenderingOptions -> String
```

<Description>{`Code block wrapper \(without preview toggle\)`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderCodeWithoutPreview (data: RenderingData) =
    | { fmt = Html {} } & opt -> htmlRenderWrapper opt "<div class=\"code-block\"><pre>" renderCodeWithoutPreview data "</pre></div>"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderGotoLink" kind="sem">

```mc
sem renderGotoLink : String -> RenderingOptions -> String
```

<Description>{`Plain anchor for “goto” links`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderGotoLink (link: String) =
    | { fmt = Html {} } & opt -> join ["<a class=\"gotoLink\" href=\"", link, "\">[→]</a>"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderHidenCode" kind="sem">

```mc
sem renderHidenCode : String -> Bool -> RenderingOptions -> String
```

<Description>{`Toggleable hidden code block; uses a button and a collapsible div`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderHidenCode (code: String) (jumpLine: Bool) =
    | { fmt = Html {} } & opt ->
        let jsDisplay = "<button class=\"toggle-btn\" onclick=\"toggle(this)\">...</button><div class=\"hiden-code\" style=\"display: none;\">" in
        join [jsDisplay, if jumpLine then "\n" else "", code, "</div>"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderLink" kind="sem">

```mc
sem renderLink : String -> String -> RenderingOptions -> String
```

<Description>{`Generic link with optional URL prefix`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderLink (title : String) (link : String) =
    | { fmt = Html {}, urlPrefix = urlPrefix } & opt -> join ["<a href=\"", concat urlPrefix link, "\">", title, "</a>"]
```
</ToggleWrapper>
</DocBlock>

