import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MdxRenderer  
  

Provides the MDX renderer implementation and its dispatch rules.

  
  
  
## Semantics  
  

          <DocBlock title="getComponentPath" kind="sem">

```mc
sem getComponentPath : FormatLanguages_FormatLanguage -> String -> String -> String
```

<Description>{`Build an absolute path "\<folder\>/\<name\>.\<ext\>" for the components file.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getComponentPath =
    | fmtLang -> lam path. lam name.
        let path = if not (strEndsWith "/" path) then concat path "/" else path in
        let ext = concat "." (formatLanguageGetExt fmtLang) in
        let name = concatIfNot name (strEndsWith ext) ext in
        concat path name
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderSetup" kind="sem">

```mc
sem renderSetup : ObjectTree -> RenderingOptions -> ()
```

<Description>{`Create the MDX components file \(TSX/JSX\) in the output folder.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderSetup obj =
    | { fmt = Mdx {} } & opt ->
        let path = getComponentPath opt.fmtLang opt.outputFolder componentFileName in
        (match fileWriteOpen path with Some wc then
            let write = fileWriteString wc in
            let components = match opt.fmtLang with Ts {} then mdxTsComponents else mdxJsComponents in
            write components;
            fileWriteClose wc
        else
            renderingWarn "Failed to create components file.");

        let path = getComponentPath (Js {}) opt.outputFolder searchFileName in
        match fileWriteOpen path with Some wc then
            fileWriteString wc (searchReact (objToJsDict opt obj));
            fileWriteClose wc
        else
            renderingWarn "Failed to create search file."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderHeader" kind="sem">

```mc
sem renderHeader : Object -> RenderingOptions -> String
```

<Description>{`Emit import line for MDX components used by the page.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderHeader obj =
    | { fmt = Mdx {} } & opt ->
        let formatPath = lam full.
            let importPath = if strStartsWith "/" full
                             then subsequence full 1 (length full)
                             else full in
            --  strip .tsx/.js extension from the import path if present
            if strEndsWith ".tsx" importPath
            then subsequence importPath 0 (subi (length importPath) 4)
            else if strEndsWith ".jsx" importPath
            then subsequence importPath 0 (subi (length importPath) 4)
            else importPath
        in
            

        let import = formatPath (getComponentPath opt.fmtLang opt.urlPrefix componentFileName) in
        let search = formatPath (getComponentPath (Js {}) opt.urlPrefix searchFileName) in
        
        join [
          "import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/", import, "';\n",
          "import Search from '@site/", search, "';\n\n",
          "<Search />\n"
        ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderRemoveCodeForbidenChars" kind="sem">

```mc
sem renderRemoveCodeForbidenChars : String -> RenderingOptions -> String
```

<Description>{`Reuse Markdown escaping for code.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderRemoveCodeForbidenChars (s: String) =
    | { fmt = Mdx {} } & opt -> renderRemoveCodeForbidenChars s { opt with fmt = Md {} }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderRemoveDocForbidenChars" kind="sem">

```mc
sem renderRemoveDocForbidenChars : String -> RenderingOptions -> String
```

<Description>{`Reuse Markdown escaping for docs.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderRemoveDocForbidenChars (s: String) =
    | { fmt = Mdx {} } & opt -> renderRemoveCodeForbidenChars s { opt with fmt = Md {} }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderTitle" kind="sem">

```mc
sem renderTitle : Int -> String -> RenderingOptions -> String
```

<Description>{`Delegate headings to Markdown renderer.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderTitle size s =
    | { fmt = Mdx {} } & opt -> renderTitle size s { opt with fmt = Md {} }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderBold" kind="sem">

```mc
sem renderBold : String -> RenderingOptions -> String
```

<Description>{`Delegate bold text to Markdown renderer.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderBold (text : String) =
    | { fmt = Mdx {} } & opt -> renderBold text { opt with fmt = Md {} }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderNewLine" kind="sem">

```mc
sem renderNewLine : RenderingOptions -> String
```

<Description>{`Delegate newline rendering to Markdown renderer \("  \\n"\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderNewLine =
    | { fmt = Mdx {} } & opt -> renderNewLine { opt with fmt = Md {} }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocDescription" kind="sem">

```mc
sem renderDocDescription : Object -> RenderingOptions -> String
```

<Description>{`Render object description as an MDX \<Description\> block \(omit empty default\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocDescription obj =
    | { fmt = Mdx {} } & opt ->
      let rawDesc = renderDocDescription obj { opt with fmt = Md {} } in
      let desc = if eqString rawDesc "No documentation available here." then "" else rawDesc in
      if eqString "" desc then "" else join ["<Description>{\\`", desc, "\\`}</Description>\n"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderGotoLink" kind="sem">

```mc
sem renderGotoLink : String -> RenderingOptions -> String
```

<Description>{`Delegate goto link rendering to Markdown renderer \(keeps URL rules consistent\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderGotoLink (link: String) =
    | { fmt = Mdx {} } & opt -> renderGotoLink link { opt with fmt = Md {} }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderLink" kind="sem">

```mc
sem renderLink : String -> String -> RenderingOptions -> String
```

<Description>{`Render a single link, removing the trailing ".md" for Docusaurus routes.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderLink (title : String) (link : String) =
    | { fmt = Mdx {} } & opt ->
          let link = concat opt.urlPrefix link in
          let linkLength = length link in
          let link = subsequence link 0 (subi linkLength 3) in -- remove extension for Docusaurus
          join ["<a href={\"", link, "\"} style={S.link}>", title, "</a>"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderLinkList" kind="sem">

```mc
sem renderLinkList : [Object] -> RenderingOptions -> String
```

<Description>{`Render a list of links by delegating to raw rendering, then add a newline.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderLinkList (objects: [Object]) =
    | { fmt = Mdx {} } & opt ->
        let nl = renderNewLine opt in
        join [renderLinkList objects { opt with fmt = Raw { fmt = Mdx {}} }, nl]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mdxRenderCode" kind="sem">

```mc
sem mdxRenderCode : RenderingOptions -> String -> String
```

<Description>{`Format a code string as a fenced block \`\`\`mc \(with proper escaping\).No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mdxRenderCode =
    | opt -> lam code. join ["\n\\`\\`\\`mc\n", renderRemoveCodeForbidenChars code opt, "\n\\`\\`\\`\n"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocSignature" kind="sem">

```mc
sem renderDocSignature : Object -> RenderingOptions -> String
```

<Description>{`Render signature via the raw MDX dispatcher; omit if empty.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocSignature (obj: Object) =
    | { fmt = Mdx {} } & opt -> 
        let sign = renderDocSignature obj { opt with fmt = Raw { fmt = Mdx {} } } in
        if eqString sign "" then "" else sign
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderCodeWithoutPreview" kind="sem">

```mc
sem renderCodeWithoutPreview : RenderingData -> RenderingOptions -> String
```

<Description>{`Render the full code \(trim trailing comments/empties\), escaped for MDX.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderCodeWithoutPreview (data: RenderingData) =
    | { fmt = Mdx {} } & opt ->
        let split = strSplit "\n" data.row in
        match splitOnR (lam l.
            let trimmed = strTrim l in
            not (or (strStartsWith "--" trimmed) (eqString "" trimmed))
        ) (reverse split) with { right = right } in
        let row = strJoin "\n" (reverse right) in
        renderRemoveCodeForbidenChars row opt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocTests" kind="sem">

```mc
sem renderDocTests : RenderingData -> RenderingOptions -> String
```

<Description>{`Render tests as raw text if available \(panels are added by the caller\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocTests (data: RenderingData) =
    | { fmt = Mdx {} } & opt ->
        if eqString data.rowTests "" then "" else strFullTrim data.rowTests
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderTopPageDoc" kind="sem">

```mc
sem renderTopPageDoc : RenderingData -> RenderingOptions -> String
```

<Description>{`Render the top\-of\-page doc \+ a toggleable code preview.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderTopPageDoc (data: RenderingData) =
    | { fmt = Mdx {} } & opt ->
        let rawDesc = renderDocDescription data.obj { opt with fmt = Md {} } in
        let desc = strTrim rawDesc in
        let desc = if eqString rawDesc "No documentation available here." then "" else rawDesc in
        join ["\n", desc, if eqString desc "" then "" else "\n\n"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocBloc" kind="sem">

```mc
sem renderDocBloc : RenderingData -> RenderingOptions -> String
```

<Description>{`Render a full documentation block \(title, signature, desc, code, optional tests\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocBloc (data: RenderingData) =
    | { fmt = Mdx {} } & opt ->
        let sign = renderDocSignature data.obj opt in
        let code  = renderCodeWithoutPreview data opt in
        let tests = renderDocTests data opt in
        let desc = renderDocDescription data.obj opt in
 
        let hasTests = not (eqString tests "") in

        let link = objLink data.obj opt in
        let link = concat opt.urlPrefix link in
        let linkLength = length link in
        let link = subsequence link 0 (subi linkLength 3) in -- remove extension for Docusaurus
        let link = if objRenderIt data.obj then join [" link=\"", link, "\""] else "" in 
        
        let title = objTitle data.obj in
        let kind  = getFirstWord (objKind data.obj) in
    
        let ns = objNamespace data.obj in
        let codeId  = join ["code-", ns] in
        let testsId = join ["tests-", ns] in
    
        join [
          "
          <DocBlock title=\"", title, "\" kind=\"", kind, "\"", link, ">\n",
          mdxRenderCode opt sign, "\n",
          desc, "\n\n",
          "<ToggleWrapper text=\"Code..\">", mdxRenderCode opt code, "</ToggleWrapper>\n",
          (if hasTests then join ["<ToggleWrapper text=\"Tests..\">", mdxRenderCode opt tests, "</ToggleWrapper>\n"] else ""),
          "</DocBlock>\n\n"
        ]
```
</ToggleWrapper>
</DocBlock>

