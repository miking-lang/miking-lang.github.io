import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MarkdownRenderer  
  

  
  
  
## Semantics  
  

          <DocBlock title="renderTitle" kind="sem">

```mc
sem renderTitle : Int -> String -> RenderingOptions -> String
```

<Description>{`Render headings as Markdown titles \(\#, \#\#, …\)`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderTitle size s =
    | { fmt = Md {} } & opt -> 
        let size = if gti size 6 then 6 else size in
        let nl = renderNewLine opt in    
        join [make size '#', " ", s, nl, nl]
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
    | { fmt = Md {} } & opt -> join ["**", text, "**"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderNewLine" kind="sem">

```mc
sem renderNewLine : RenderingOptions -> String
```

<Description>{`New line \(Markdown convention: 2 spaces before newline\)`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderNewLine =
    | { fmt = Md {} } & opt -> "  \n"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderRemoveDocForbidenChars" kind="sem">

```mc
sem renderRemoveDocForbidenChars : String -> RenderingOptions -> String
```

<Description>{`Escape forbidden characters in docstrings`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderRemoveDocForbidenChars (s: String) =
    | { fmt = Md {} } & opt ->
        switch s
        case "*" ++ r | "_" ++ r | "\\`" ++ r | "[" ++ r | "]" ++ r | "(" ++ r | ")" ++ r | "#" ++ r | "+" ++ r | "-" ++ r | "!" ++ r | "\\" ++ r | "<" ++ r | ">" ++ r | "\\`" ++ r | "{" ++ r | "}" ++ r then
             concat ['\\', head s] (renderRemoveDocForbidenChars r opt)
        case [x] ++ r then cons x (renderRemoveDocForbidenChars r opt)
        case "" then ""
        end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderRemoveCodeForbidenChars" kind="sem">

```mc
sem renderRemoveCodeForbidenChars : String -> RenderingOptions -> String
```

<Description>{`Escape forbidden characters in code snippets`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderRemoveCodeForbidenChars (s: String) =
    | { fmt = Md {} } & opt ->
        switch s
        case "\\`" ++ r then
             concat ['\\', head s] (renderRemoveCodeForbidenChars r opt)
        case [x] ++ r then cons x (renderRemoveCodeForbidenChars r opt)
        case "" then ""
        end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocDescription" kind="sem">

```mc
sem renderDocDescription : Object -> RenderingOptions -> String
```

<Description>{`Render documentation text \(cleans spaces and escapes forbidden chars\)No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocDescription obj =
    | { fmt = Md {} } & opt ->
        let nl = renderNewLine opt in
        let doc = objDoc obj in
        match splitOnR (lam c. match c with ' ' | '\n' then false else true) doc with { right = doc } in
        let doc = strReplace "\n " "\n" doc in
        renderRemoveDocForbidenChars doc opt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocSignature" kind="sem">

```mc
sem renderDocSignature : Object -> RenderingOptions -> String
```

<Description>{`Render object signature inside a fenced code block`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocSignature (obj: Object) =
    | { fmt = Md {} } & opt ->
        let sign = renderDocSignature obj  { opt with fmt = Raw { fmt = Md {} } } in
        let nl = renderNewLine opt in    
        match sign with "" then
            ""
        else
            join ["\\`\\`\\`mc\n", sign, "\n\\`\\`\\`", nl]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderGotoLink" kind="sem">

```mc
sem renderGotoLink : String -> RenderingOptions -> String
```

<Description>{`Render "goto" link \(delegates to raw link, wrapped with spacing\)`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderGotoLink (link: String) =
    | { fmt = Md {} } & opt -> let nl = renderNewLine opt in
        join [nl, renderGotoLink link  { opt with fmt = Raw { fmt = Md {} } }, nl, nl]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderLink" kind="sem">

```mc
sem renderLink : String -> String -> RenderingOptions -> String
```

<Description>{`Render a single link`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderLink (title : String) (link : String) =
    | { fmt = Md {}, urlPrefix = urlPrefix } & opt -> join ["[", title, "](", concat urlPrefix link, ")"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderLinkList" kind="sem">

```mc
sem renderLinkList : [Object] -> RenderingOptions -> String
```

<Description>{`Render list of links \(comma separated\)`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderLinkList (objects: [Object]) =
    | { fmt = Md {} } & opt ->
        let nl = renderNewLine opt in
        join [renderLinkList objects { opt with fmt = Raw { fmt = Md {}} }, nl]
```
</ToggleWrapper>
</DocBlock>

