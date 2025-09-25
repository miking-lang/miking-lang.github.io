import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RawRenderer  
  

  
  
  
## Semantics  
  

          <DocBlock title="renderSetup" kind="sem">

```mc
sem renderSetup : ObjectTree -> RenderingOptions -> ()
```

<Description>{`Runs before rendering all files \(e.g., to generate global headers\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderSetup obj =
    | opt -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderBlocDefault" kind="sem">

```mc
sem renderBlocDefault : RenderingData -> RenderingOptions -> String -> String -> String -> String -> String
```

<Description>{`Default block renderer: composes signature, description, code, and tests.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderBlocDefault =
    | { obj = obj } & data -> lam opt. lam bonusTopDoc. lam bonusSignDescDoc. lam bonusDescCodeDoc. lam bonusBottomDoc.
        let signature = renderDocSignature obj opt in
        let description = renderDocDescription obj opt in
        let code = renderCodeWithoutPreview data opt in
        let tests = renderDocTests data opt in

        join [bonusTopDoc, signature, bonusSignDescDoc, description, bonusDescCodeDoc, code, bonusBottomDoc, tests]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fixOptFormat" kind="sem">

```mc
sem fixOptFormat : RenderingOptions -> RenderingOptions
```

<Description>{`Ensure RenderingOptions uses the wrapped \(non\-raw\) format.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem fixOptFormat = | opt -> { opt with fmt = unwrapRaw opt.fmt }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderTopPageDoc" kind="sem">

```mc
sem renderTopPageDoc : RenderingData -> RenderingOptions -> String
```

<Description>{`Top page section: title \+ details \(e.g., parent langs\) \+ default block.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderTopPageDoc (data: RenderingData) =
    | opt -> let opt = fixOptFormat opt in
        let nl = renderNewLine opt in
        let details = switch data
        case { obj = { kind = ObjLang { parents = parents & ([_] ++ _) } } } then
            let parents = strJoin " + " (map (lam p. renderLink p (objLangLink p opt) opt) parents) in
            let sectionTitle = renderBold "Stem from:" opt in
            strJoin nl [sectionTitle, parents]
        case { obj = { kind = ( ObjSyn {} | ObjSem {} )} & obj } then
            let langName = objGetLangName obj in
            let langLink = renderLink langName (objLangLink langName opt) opt in
            let sectionTitle = renderBold "From:" opt in
            strJoin nl [sectionTitle, langLink]
        case { obj = obj } then
            ""
        end in
        renderBlocDefault data opt "" "" details ""
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocBloc" kind="sem">

```mc
sem renderDocBloc : RenderingData -> RenderingOptions -> String
```

<Description>{`Documentation block \(optionally includes a “goto” link\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocBloc (data : RenderingData) =
    | opt -> let opt = fixOptFormat opt in
        match data with { obj = obj } in
        let link =
            if objRenderIt obj then
                let link = objLink obj opt in
                let link = concat (if strStartsWith "/" link then "" else "/") link in
                renderGotoLink link opt
            else ""
        in
        renderBlocDefault data opt "" "" link ""
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocDescription" kind="sem">

```mc
sem renderDocDescription : Object -> RenderingOptions -> String
```

<Description>{`Renders the description text of an object \(from obj.doc\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocDescription (obj: Object) =
    | opt -> let opt = fixOptFormat opt in
        let doc = objDoc obj in
        concat (renderRemoveDocForbidenChars doc opt) (renderNewLine opt)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocSignature" kind="sem">

```mc
sem renderDocSignature : Object -> RenderingOptions -> String
```

<Description>{`Renders the object signature as source code.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocSignature (obj : Object) =
    | opt -> let opt = fixOptFormat opt in
        let type2str = lam t. strReplace "[Char]" "String" (type2str t) in
        let name = objName obj in
        let kind = objKind obj in
        let code = switch obj.kind
        case ObjLet { args = args, ty = ty } then
            let t = match ty with Some t then type2str t else "?" in
            let args = strJoin " " args in
            join ["let ", name, " ", args, " : ", t]
        case ObjType { t = t } then
            join ["type ", name, match t with Some t then concat " : " t else ""]
        case ObjCon { t = t } then
            join ["con ", name, " : ", t]
        case (ObjMexpr {} | ObjUtest {}) & kind then
            getFirstWord kind
        case ObjLang {} then
            concat "lang " name
        case ObjProgram {} then ""
        case ObjSem { ty = ty } then
            let t = match ty with Some t then type2str t else "?" in
            join ["sem ", name, " : ", t]
        case kind then
            join [getFirstWord kind, " ", name]
        end in
        renderSourceCodeStr code opt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDocTests" kind="sem">

```mc
sem renderDocTests : RenderingData -> RenderingOptions -> String
```

<Description>{`Renders the unit tests section \(hidden if empty\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderDocTests (data: RenderingData) =
    | opt -> let opt = fixOptFormat opt in
        let nl = renderNewLine opt in
        if eqString data.tests "" then ""
        else join [nl, "Tests:", nl, renderHidenCode (strFullTrim data.tests) true opt]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderGotoLink" kind="sem">

```mc
sem renderGotoLink : String -> RenderingOptions -> String
```

<Description>{`Goto link wrapper \(uses renderLink\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderGotoLink (link: String) =
    | opt -> let opt = fixOptFormat opt in
        renderLink "[→]" link opt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderLinkList" kind="sem">

```mc
sem renderLinkList : [Object] -> RenderingOptions -> String
```

<Description>{`Renders a comma\-separated list of links for objects \(with newline\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderLinkList (objects: [Object]) =
    | opt -> let opt = fixOptFormat opt in
        let doc = map (lam u. renderLink (objTitle u) (objLink u opt) opt) objects in
        let doc = strJoin ", " doc in
        match doc with "" then "" else
            concat (renderText doc opt) (renderNewLine opt)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderCodeWithoutPreview" kind="sem">

```mc
sem renderCodeWithoutPreview : RenderingData -> RenderingOptions -> String
```

<Description>{`Renders code as a hidden, toggleable block \(raw \+ preview\-less\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderCodeWithoutPreview (data: RenderingData) = 
    | opt -> let opt = fixOptFormat opt in
        renderHidenCode (concat data.left data.right) true opt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderCodeWithPreview" kind="sem">

```mc
sem renderCodeWithPreview : RenderingData -> RenderingOptions -> String
```

<Description>{`Renders code with an optional preview section \(uses renderHidenCode\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderCodeWithPreview (data: RenderingData) =
    | opt -> let opt = fixOptFormat opt in
        match data.right with [] then
            join [data.left, data.trimmed]
        else 
            join [data.left, renderHidenCode data.right false opt, data.trimmed]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderHidenCode" kind="sem">

```mc
sem renderHidenCode : String -> Bool -> RenderingOptions -> String
```

<Description>{`Default hidden\-code renderer \(no\-op for raw\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderHidenCode (code : String) (jumpLine: Bool) =
    | _ -> ""
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderSourceCodeStr" kind="sem">

```mc
sem renderSourceCodeStr : String -> RenderingOptions -> String
```

<Description>{`String → tokenized/colored source code \(delegates to renderSourceCode\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderSourceCodeStr (code: String) =
    | opt -> let opt = fixOptFormat opt in
         renderSourceCode (strToSourceCode code) opt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderSourceCode" kind="sem">

```mc
sem renderSourceCode : SourceCode -> RenderingOptions -> String
```

<Description>{`SourceCode → rendered string \(maps each word with renderWord\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderSourceCode (code: SourceCode) =
    | opt -> let opt = fixOptFormat opt in
        join (map (lam code. match code with Some code then renderWord code opt else "") code)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderWord" kind="sem">

```mc
sem renderWord : SourceCodeWord -> RenderingOptions -> String
```

<Description>{`Renders a single token/word according to its kind \(with escaping\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderWord (word: SourceCodeWord) = 
    | opt -> let opt = fixOptFormat opt in
        let renderSkiped: [Token] -> String = lam skiped.
            join (map (lam s. renderWord ( { word = s, kind = CodeDefault {} } ) opt) skiped) in

        switch word
        case { word = TokenInclude { content = content, skiped = skiped } } then
            join [renderKeyword "include" opt, renderSkiped skiped, renderString (join ["\"", (renderRemoveCodeForbidenChars content opt), "\""]) opt]    
        case { word = word, kind = kind } then
            let renderer = (switch word
            case TokenStr {} then renderString
            case TokenMultiLineComment {} then renderMultiLineComment
            case TokenComment {} then renderComment
            case _ then
                switch kind
                case CodeKeyword {} then renderKeyword
                case CodeName {} then renderVar
                case CodeType {} then renderType
                case CodeNumber {} then renderNumber
                case CodeDefault {} then renderDefault
                end       
            end) in
            let word = renderRemoveCodeForbidenChars (lit word) opt in
            renderer word opt
        end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderTreeSourceCode" kind="sem">

```mc
sem renderTreeSourceCode : [TreeSourceCode] -> Object -> RenderingOptions -> RenderingData
```

<Description>{`Top\-level source code rendering: splits, renders, and aggregates.  
If row's length is length than 30, we concatenate everything in left.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderTreeSourceCode (tree: [TreeSourceCode]) (obj : Object) =
    | opt -> let opt = fixOptFormat opt in
        match sourceCodeSplit tree with { left = left, right = right, trimmed = trimmed } in
        let renderSourceCode = lam b. renderSourceCode (wordBufferToSourceCode b) opt in
    
        let getFormatedString : [TreeSourceCode] -> String = lam code.
            foldl (lam s. lam node.
                concat (switch node 
                case TreeSourceCodeNode son then renderCodeWithPreview son opt
                case TreeSourceCodeSnippet code then renderSourceCode code
                end) s
                ) "" (reverse code) in

        let buildSourceCodeRaw = lam code. join (map (lam w. lit w.word) code) in
        let row = foldl (lam row. lam tree.
             concat (switch tree 
                case TreeSourceCodeNode son then son.row
                case TreeSourceCodeSnippet code then buildSourceCodeRaw code
                end) row)
                "" (reverse (concat left right)) in
        let row = concat row (match trimmed with TrimmedNotFormated code then buildSourceCodeRaw code else "") in
    
        let res = {
            obj = obj,
            left = getFormatedString left,
            right = getFormatedString right,
            trimmed = switch trimmed
                case TrimmedFormated s then s
                case TrimmedNotFormated b then renderSourceCode b
                end,
            tests = "",
            rowTests = "",
            row = row
        } in
        if gti 50 (length res.row) then
           { res with left = join [res.left, res.right, res.trimmed], right = "", trimmed = "" }
        else res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderHeader" kind="sem">

```mc
sem renderHeader : Object -> RenderingOptions -> String
```

<Description>{`File\-level wrappers \(raw renderer leaves them empty\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderHeader (obj : Object) =
    | _ -> ""
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderFooter" kind="sem">

```mc
sem renderFooter : Object -> RenderingOptions -> String
```



<ToggleWrapper text="Code..">
```mc
sem renderFooter (obj : Object) =
    | _ -> ""
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderSectionTitle" kind="sem">

```mc
sem renderSectionTitle : String -> RenderingOptions -> String
```

<Description>{`Section titles and basic text formatting.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderSectionTitle (title: String) =
    | opt -> let opt = fixOptFormat opt in
        renderTitle 2 title opt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderBold" kind="sem">

```mc
sem renderBold : String -> RenderingOptions -> String
```



<ToggleWrapper text="Code..">
```mc
sem renderBold (text : String) =
    | _ -> text
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderRemoveDocForbidenChars" kind="sem">

```mc
sem renderRemoveDocForbidenChars : String -> RenderingOptions -> String
```

<Description>{`Escaping/sanitizing hooks for docs and code \(no\-op in raw\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderRemoveDocForbidenChars (s: String) =
    | _ -> s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderRemoveCodeForbidenChars" kind="sem">

```mc
sem renderRemoveCodeForbidenChars : String -> RenderingOptions -> String
```



<ToggleWrapper text="Code..">
```mc
sem renderRemoveCodeForbidenChars (s: String) =
    | _ -> s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderTitle" kind="sem">

```mc
sem renderTitle : Int -> String -> RenderingOptions -> String
```

<Description>{`Title helpers.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderTitle (size : Int) (s : String) =
    | _ -> s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderObjTitle" kind="sem">

```mc
sem renderObjTitle : Int -> Object -> RenderingOptions -> String
```



<ToggleWrapper text="Code..">
```mc
sem renderObjTitle (size : Int) (obj : Object) =
    | opt -> let opt = fixOptFormat opt in
        renderTitle size (objTitle obj) opt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderText" kind="sem">

```mc
sem renderText : String -> RenderingOptions -> String
```

<Description>{`Text, link, and color helpers \(raw → passthrough\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderText (text : String) =
    | _ -> text
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderLink" kind="sem">

```mc
sem renderLink : String -> String -> RenderingOptions -> String
```



<ToggleWrapper text="Code..">
```mc
sem renderLink (title : String) (link : String) =
    | _ -> join [title, " (", link, ")"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderType" kind="sem">

```mc
sem renderType : String -> RenderingOptions -> String
```



<ToggleWrapper text="Code..">
```mc
sem renderType (content : String) = 
    | _ -> content
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
    | _ -> content
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
    | _ -> content
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
    | _ -> content
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
    | _ -> content
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
    | _ -> content
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderDefault" kind="sem">

```mc
sem renderDefault : String -> RenderingOptions -> String
```



<ToggleWrapper text="Code..">
```mc
sem renderDefault (content : String) =
    | _ -> content
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
    | _ -> content
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="renderNewLine" kind="sem">

```mc
sem renderNewLine : RenderingOptions -> String
```

<Description>{`Newline helper.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem renderNewLine =
    | _ -> "\n"
```
</ToggleWrapper>
</DocBlock>

