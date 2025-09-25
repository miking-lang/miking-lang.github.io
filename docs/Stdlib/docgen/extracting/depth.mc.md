import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# depth.mc  
  

\# depth.mc  
  
This module provides a type Depth, allowing us to know if a given object in  
the traversal has a depth superior to the specified depth.  
  
Miking\-doc\-gen accepts a \`depth\` flag that specifies how deep into the object tree we want to render:  
\- With \`depth = 1\`, only \*\*top\-level objects\*\* will be rendered.  
\- With higher depths, nested objects will also be processed.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/extracting/objects.mc"} style={S.link}>./objects.mc</a>, <a href={"/docs/Stdlib/ext/file-ext.mc"} style={S.link}>ext/file-ext.mc</a>  
  
## Types  
  

          <DocBlock title="Depth" kind="type">

```mc
type Depth : { depth: Option Int, currentDepth: Int, neverRender: Bool }
```

<Description>{`\#\# Depth  
  
Tracks the depth state during the traversal.`}</Description>


<ToggleWrapper text="Code..">
```mc
type Depth = {
    depth: Option Int,   -- Maximum depth (None = unlimited)
    currentDepth: Int,   -- Current depth in the traversal
    neverRender: Bool    -- If true, this node and its children should never be rendered
}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="depthCreate" kind="let">

```mc
let depthCreate d : Option Int -> Depth
```

<Description>{`Create a fresh \`Depth\` from an optional depth limit.`}</Description>


<ToggleWrapper text="Code..">
```mc
let depthCreate : Option Int -> Depth = lam d.
    { depth = d, currentDepth = 1, neverRender = false }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="depthProcess" kind="let">

```mc
let depthProcess depth obj : Depth -> Object -> {obj: Object, depth: Depth}
```

<Description>{`\#\#\# Rules:  
\- Utests are never accepted \(they are excluded entirely\).  
\- If \`depth = None\`, files are always accepted, with no restriction.  
\- If \`depth = Some d\`:  
  \- \`Program\`, \`Include\`, and \`Lang\` objects are always accepted, unless \`d = 0\`.  
  \- Other objects are accepted only if they are within the allowed depth.`}</Description>


<ToggleWrapper text="Code..">
```mc
let depthProcess : Depth -> Object -> { depth: Depth, obj: Object  } =
    use ObjectKinds in lam depth. lam obj.   
    if depth.neverRender then { depth = depth, obj = obj }
    else
       let obj = objWithRenderIt obj true in
       let default = { depth = depth, obj = obj } in

        switch (depth.depth, obj.kind)
        case (_, ObjUtest {} | ObjUse {}) then { obj = objWithRenderIt obj false, depth = { depth with neverRender = true } }
        case (_, ObjRecursiveBloc {} | ObjInclude {}) then { default with obj = objWithRenderIt obj false }
        case (None {}, _) then default
        case (Some d, ObjProgram {} | ObjLang {}) then { default with depth = { depth with currentDepth = 0 } }
        case (Some d, _) then
            if geqi depth.currentDepth d then { default with obj = objWithRenderIt obj false }
            else { default with depth = { depth with currentDepth = addi depth.currentDepth 1 } }
        end
```
</ToggleWrapper>
</DocBlock>

