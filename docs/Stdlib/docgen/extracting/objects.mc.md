import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# objects.mc  
  

\# ObjectKinds and Object helpers  
  
This module defines:  
\- \`ObjectKind\`: kinds of program elements \(let, type, lang, sem, …\)  
\- \`Object\`: carries name, namespace, doc, kind, source code, prefix, stdlib flag  
\- \`ObjectTree\`: a simple tree wrapper for grouping objects  
  
Used in doc generation and object representation.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/global/util.mc"} style={S.link}>../global/util.mc</a>, <a href={"/docs/Stdlib/docgen/extracting/source-code-builder.mc"} style={S.link}>./source-code-builder.mc</a>, <a href={"/docs/Stdlib/docgen/extracting/util.mc"} style={S.link}>util.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>  
  
## Types  
  

          <DocBlock title="Object" kind="type">

```mc
type Object : { name: String, doc: String, namespace: String, kind: ObjectKind, sourceCode: SourceCode, prefix: String, isStdlib: Bool, renderIt: Bool }
```

<Description>{`The object type is designed to represent the documentation\-side structure of the code.  
Its fields are:  
\- \`name\`: The name of the object. For a \`let\`, it corresponds to the variable name.    
\- \`doc\`: All comments above the beginning of the block.    
\- \`namespace\`: The namespace reflects the current position of the node in the tree and is used  
  to build its documentation path.    
\- \`kind\`: Specific to the object’s type \(see ObjectKind\).    
\- \`sourceCode\`: An \*\*absolute\*\* representation of the object’s source code.  
  It is not just a plain string, but a structured value defined in \`source\-code\-word.mc\` and \`source\-code\-builder.mc\`.    
\- \`prefix\`: The part of the namespace removed because it is redundant.    
  Example: if we have \`src/foo.mc\` and \`src/bar.mc\`, we can drop \`src/\`.    
  \`objWithPrefix\` both removes the given prefix \(warning if the namespace does not start with it\)  
  and stores it so we can recover the original namespace later.    
\- \`isStdlib\`: Marks whether the object belongs to the stdlib.  
\- \`renderIt\` : Indicates if the object should be rendered during rendering stage.`}</Description>


<ToggleWrapper text="Code..">
```mc
type Object = use ObjectKinds in { name: String, doc : String, namespace: String, kind: ObjectKind, sourceCode: SourceCode, prefix: String, isStdlib: Bool, renderIt: Bool }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ObjectTree" kind="type">

```mc
type ObjectTree
```

<Description>{`Object tree \(hierarchy\). Wraps Object to allow recursive nesting.`}</Description>


<ToggleWrapper text="Code..">
```mc
type ObjectTree
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="ObjectNode" kind="con">

```mc
con ObjectNode : { obj: Object, sons: [ObjectTree] } -> ObjectTree
```



<ToggleWrapper text="Code..">
```mc
con ObjectNode : { obj: Object, sons: [ObjectTree] } -> ObjectTree
```
</ToggleWrapper>
</DocBlock>

## Languages  
  

          <DocBlock title="ObjectKinds" kind="lang" link="/docs/Stdlib/docgen/extracting/objects.mc/lang-ObjectKinds">

```mc
lang ObjectKinds
```

<Description>{`The ObjectKinds language augments kinds with extra info per block type.  
For blocks involving types, we reuse stdlib types from \`mexpr/ast.mc\` and their utilities.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang ObjectKinds = MExprAst

    -- All possible object kinds
    syn ObjectKind = 
    | ObjProgram {}
    | ObjInclude { pathInFile: String }
    | ObjLet { rec : Bool, args : [String], ty: Option Type }
    | ObjLang { parents : [String] }
    | ObjType { t: Option String }
    | ObjUse {}
    | ObjSem { langName: String, variants: [String], ty: Option Type } -- Variants are the names of each alternative.
    | ObjSyn { langName: String, variants: [String] }
    | ObjCon { t: String }
    | ObjMexpr {}
    | ObjUtest {}
    | ObjRecursiveBloc {}

    -- Converts an ObjectKind to a readable string (for logs/debugging).
    sem objKindToString : ObjectKind -> String
    sem objKindToString =
    | ObjLet { rec = rec, args = args, ty = ty} -> join ["ObjLet, recursive: ", bool2string rec, ", args: [", strJoin ", " args, "]"]
    | ObjLang { parents = parents } -> join ["ObjLang, parents: ", strJoin ", " parents]
    | ObjType { t = t } -> join ["ObjType", match t with Some t then concat ", " t else ""]
    | ObjUse {} -> "ObjUse"
    | ObjSem { langName =  langName } ->  join ["ObjSem, langName = ", langName]
    | ObjSyn { langName = langName } -> join ["ObjSyn, langName = ", langName]
    | ObjCon { t = t } -> join ["ObjCon: ", t]
    | ObjMexpr {} -> "ObjMexpr"
    | ObjInclude { pathInFile = p } -> join ["ObjInclude, path = ", p]
    | ObjUtest {} -> "ObjUtest"
    | ObjRecursiveBloc {} -> "ObjRecursiveBloc"
    | ObjProgram {} -> "ObjProgram"
    | _ -> warn "All object kinds are not supported in objKindToString sementic"; ""
         
    -- First keyword for this kind (used for printing/links/extension).
    sem getFirstWord =
    | ObjLet {} -> "let"
    | ObjLang {} -> "lang"
    | ObjType {} -> "type"
    | ObjUse {} -> "use"
    | ObjSem {} -> "sem"
    | ObjSyn {} -> "syn"
    | ObjCon {} -> "con"
    | ObjMexpr {} -> "mexpr"
    | ObjInclude {} -> "include"
    | ObjUtest {} -> "utest"
    | ObjRecursiveBloc {} -> "recursive"
    | ObjProgram {} -> ""
    | _ -> warn "All object kinds are not supported in getFirstWord sementic"; ""
  
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="basePosition" kind="let">

```mc
let basePosition  : String
```

<Description>{`Absolute filesystem position of the current program start.`}</Description>


<ToggleWrapper text="Code..">
```mc
let basePosition : String = concat (sysGetCwd ()) "/"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objName" kind="let">

```mc
let objName obj : Object -> String
```

<Description>{`Simple field accessors.`}</Description>


<ToggleWrapper text="Code..">
```mc
let objName : Object -> String = lam obj. obj.name
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objKind" kind="let">

```mc
let objKind obj : Object -> ObjectKinds_ObjectKind
```



<ToggleWrapper text="Code..">
```mc
let objKind : Object -> use ObjectKinds in ObjectKind = lam obj. obj.kind
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objDoc" kind="let">

```mc
let objDoc obj : Object -> String
```



<ToggleWrapper text="Code..">
```mc
let objDoc : Object -> String = lam obj. obj.doc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objSourceCode" kind="let">

```mc
let objSourceCode obj : Object -> SourceCode
```



<ToggleWrapper text="Code..">
```mc
let objSourceCode : Object -> SourceCode = lam obj. obj.sourceCode    
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objNamespace" kind="let">

```mc
let objNamespace obj : Object -> String
```



<ToggleWrapper text="Code..">
```mc
let objNamespace : Object -> String = use ObjectKinds in lam obj. obj.namespace
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objPrefix" kind="let">

```mc
let objPrefix obj : Object -> String
```



<ToggleWrapper text="Code..">
```mc
let objPrefix : Object -> String = lam obj. obj.prefix
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objIsStdlib" kind="let">

```mc
let objIsStdlib obj : Object -> Bool
```



<ToggleWrapper text="Code..">
```mc
let objIsStdlib : Object -> Bool = lam obj. obj.isStdlib
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objRenderIt" kind="let">

```mc
let objRenderIt obj : Object -> Bool
```



<ToggleWrapper text="Code..">
```mc
let objRenderIt : Object -> Bool = lam obj. obj.renderIt
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objWithName" kind="let">

```mc
let objWithName obj name : Object -> String -> Object
```

<Description>{`Object updaters \(immutable setters\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let objWithName : Object -> String -> Object = lam obj. lam name. { obj with name = name }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objWithKind" kind="let">

```mc
let objWithKind obj kind : Object -> ObjectKinds_ObjectKind -> Object
```



<ToggleWrapper text="Code..">
```mc
let objWithKind : Object -> use ObjectKinds in ObjectKind -> Object = lam obj. lam kind. { obj with kind = kind }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objWithDoc" kind="let">

```mc
let objWithDoc obj doc : Object -> String -> Object
```



<ToggleWrapper text="Code..">
```mc
let objWithDoc : Object -> String -> Object = lam obj. lam doc. { obj with doc = doc }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objWithIsStdlib" kind="let">

```mc
let objWithIsStdlib obj isStdlib : Object -> Bool -> Object
```



<ToggleWrapper text="Code..">
```mc
let objWithIsStdlib : Object -> Bool -> Object = lam obj. lam isStdlib. { obj with isStdlib = isStdlib }    
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objWithSourceCode" kind="let">

```mc
let objWithSourceCode obj sourceCode : Object -> SourceCode -> Object
```



<ToggleWrapper text="Code..">
```mc
let objWithSourceCode : Object -> SourceCode -> Object = lam obj. lam sourceCode. { obj with sourceCode = sourceCode }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objWithRenderIt" kind="let">

```mc
let objWithRenderIt obj renderIt : Object -> Bool -> Object
```



<ToggleWrapper text="Code..">
```mc
let objWithRenderIt : Object -> Bool -> Object = lam obj. lam renderIt. { obj with renderIt = renderIt }    
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objWithPrefix" kind="let">

```mc
let objWithPrefix obj prefix : Object -> String -> Object
```

<Description>{`Sets a shorter namespace by removing \`prefix\`; stores the prefix for recovery.  
Warns if the namespace does not start with the given prefix.`}</Description>


<ToggleWrapper text="Code..">
```mc
let objWithPrefix: Object -> String -> Object = lam obj. lam prefix.
    let process = lam.
        let basePrefix: String = normalizePath (concat basePosition obj.namespace) in
        let lengthBasePrefix = length basePrefix in
        let lengthPrefix = length prefix in
        if strStartsWith prefix basePrefix then subsequence basePrefix lengthPrefix lengthBasePrefix
        else
            extractingWarn (join ["The namespace ", basePrefix, "does not start with the prefix ", prefix, "."]);
            basePrefix
    in
    let namespace = match prefix with "" then obj.namespace else process () in
    let namespace = if strStartsWith "/" namespace then namespace else cons '/' namespace in
    { obj with namespace = namespace, prefix = prefix }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objWithNamespace" kind="let">

```mc
let objWithNamespace obj namespace : Object -> String -> Object
```

<Description>{`Replaces namespace; strips stdlib prefix if present; re\-applies stored \`prefix\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let objWithNamespace : Object -> String -> Object = lam obj. lam namespace.
    let namespace =
    if strStartsWith stdlibLoc namespace then
        subsequence namespace (length stdlibLoc) (length namespace)
    else
        namespace
    in
    let obj = { obj with namespace = namespace } in
    objWithPrefix obj obj.prefix
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objAbsolutePath" kind="let">

```mc
let objAbsolutePath obj : Object -> String
```

<Description>{`Returns absolute path = prefix \+ namespace.`}</Description>


<ToggleWrapper text="Code..">
```mc
let objAbsolutePath : Object -> String = lam obj.
    concat obj.prefix obj.namespace
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="defaultObject" kind="let">

```mc
let defaultObject  : Object
```

<Description>{`Empty default object \(neutral values\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let defaultObject : Object = use ObjectKinds in { name = "", doc = "", namespace = "", renderIt = false, isStdlib = false, kind = ObjProgram {}, sourceCode = sourceCodeEmpty (), prefix = "" }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objGetLangName" kind="let">

```mc
let objGetLangName obj : Object -> String
```

<Description>{`Extracts the language name from a Sem/Syn object; else empty string.`}</Description>


<ToggleWrapper text="Code..">
```mc
let objGetLangName : Object -> String = use ObjectKinds in lam obj.
    match obj.kind with ObjSem { langName = langName } | ObjSyn { langName = langName } then langName else ""
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objToString" kind="let">

```mc
let objToString kind name : ObjectKinds_ObjectKind -> String -> String
```

<Description>{`Renders a short textual representation of an object \(for printing\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let objToString = use ObjectKinds in lam kind. lam name.
    switch kind
    case ObjLet { rec = rec, args = args } then join [if rec then "recursive " else "", "let ", name, " ", strJoin " " args]
    case ObjType { t = t } then join ["type ", name, match t with Some t then concat " : " t else ""]
    case ObjCon { t = t } then join ["con ", name, " : ", t]
    case ObjMexpr {} then "mexpr"
    case ObjProgram {} then ""
    case kind then join [getFirstWord kind, " ", name]
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objSetType" kind="let">

```mc
let objSetType obj ty : Object -> Option Ast_Type -> Object
```

<Description>{`Sets the \(optional\) type of a Let/Sem object, keeping other fields the same.`}</Description>


<ToggleWrapper text="Code..">
```mc
let objSetType = use ObjectKinds in lam obj. lam ty.
    { obj with kind = switch obj.kind
    case ObjLet d then ObjLet { d with ty = ty }
    case ObjSem d then ObjSem { d with ty = ty }    
    case _ then obj.kind end }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objTreeToString" kind="let">

```mc
let objTreeToString tree : ObjectTree -> String
```

<Description>{`Convenience helpers for ObjectTree.`}</Description>


<ToggleWrapper text="Code..">
```mc
let objTreeToString : ObjectTree -> String = lam tree. match tree with ObjectNode { obj = obj } in objToString obj.kind obj.name
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objTreeObj" kind="let">

```mc
let objTreeObj tree : ObjectTree -> Object
```



<ToggleWrapper text="Code..">
```mc
let objTreeObj : ObjectTree -> Object = lam tree. match tree with ObjectNode { obj = obj } in obj
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objTreeSons" kind="let">

```mc
let objTreeSons tree : ObjectTree -> [ObjectTree]
```



<ToggleWrapper text="Code..">
```mc
let objTreeSons : ObjectTree -> [ObjectTree] = lam tree. match tree with ObjectNode { sons = sons } in sons
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objTreeDoc" kind="let">

```mc
let objTreeDoc tree : ObjectTree -> String
```



<ToggleWrapper text="Code..">
```mc
let objTreeDoc : ObjectTree -> String = lam tree. objDoc (objTreeObj tree)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objTreeSourceCode" kind="let">

```mc
let objTreeSourceCode tree : ObjectTree -> SourceCode
```



<ToggleWrapper text="Code..">
```mc
let objTreeSourceCode : ObjectTree -> SourceCode = lam tree. objSourceCode (objTreeObj tree)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objTreeWithDoc" kind="let">

```mc
let objTreeWithDoc tree doc : ObjectTree -> String -> ObjectTree
```



<ToggleWrapper text="Code..">
```mc
let objTreeWithDoc : ObjectTree -> String -> ObjectTree = lam tree. lam doc.
    match tree with ObjectNode { obj = obj, sons = sons } in ObjectNode { obj = { obj with doc = doc}, sons = sons }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objTreeWithSourceCode" kind="let">

```mc
let objTreeWithSourceCode tree code : ObjectTree -> SourceCode -> ObjectTree
```



<ToggleWrapper text="Code..">
```mc
let objTreeWithSourceCode : ObjectTree -> SourceCode -> ObjectTree = lam tree. lam code.
    match tree with ObjectNode { obj = obj, sons = sons } in ObjectNode { obj = { obj with sourceCode = code}, sons = sons }
```
</ToggleWrapper>
</DocBlock>

