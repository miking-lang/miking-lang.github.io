import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ObjectKinds  
  

The ObjectKinds language augments kinds with extra info per block type.  
For blocks involving types, we reuse stdlib types from \`mexpr/ast.mc\` and their utilities.

  
  
  
## Syntaxes  
  

          <DocBlock title="ObjectKind" kind="syn">

```mc
syn ObjectKind
```

<Description>{`All possible object kinds`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="objKindToString" kind="sem">

```mc
sem objKindToString : ObjectKinds_ObjectKind -> String
```

<Description>{`Converts an ObjectKind to a readable string \(for logs/debugging\).No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getFirstWord" kind="sem">

```mc
sem getFirstWord : ObjectKinds_ObjectKind -> String
```

<Description>{`First keyword for this kind \(used for printing/links/extension\).`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>

