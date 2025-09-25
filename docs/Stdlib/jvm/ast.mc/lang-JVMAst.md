import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# JVMAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Bytecode" kind="syn">

```mc
syn Bytecode
```



<ToggleWrapper text="Code..">
```mc
syn Bytecode = 
    | BString {instr: String, constant: String}
    | BApply {instr: String, owner: String, name: String, descriptor: String}
    | BEmpty {instr: String}
    | BInt {instr: String, nr: Int}
    | BFloat {instr: String, nr: Float}
    | BLong {instr: String, nr: Int}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Field" kind="syn">

```mc
syn Field
```



<ToggleWrapper text="Code..">
```mc
syn Field =
    | Field {name: String, t: String}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Function" kind="syn">

```mc
syn Function
```



<ToggleWrapper text="Code..">
```mc
syn Function = 
    | Function {name: String, descriptor: String, bytecode: [Bytecode]}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Class" kind="syn">

```mc
syn Class
```



<ToggleWrapper text="Code..">
```mc
syn Class =
    | Class {implements: String, name: String, fields: [Field], constructor: Function, functions: [Function]}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Interface" kind="syn">

```mc
syn Interface
```



<ToggleWrapper text="Code..">
```mc
syn Interface =
    | Interface {name: String, fields: [Field], functions: [Function]}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="JVMProgram" kind="syn">

```mc
syn JVMProgram
```



<ToggleWrapper text="Code..">
```mc
syn JVMProgram = 
    | JVMProgram {package: String, classes: [Class], interfaces: [Interface]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getNameField" kind="sem">

```mc
sem getNameField : JVMAst_Field -> String
```

<Description>{`\-\-No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getNameField =
    | Field {name = name} -> name
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createBString" kind="sem">

```mc
sem createBString : String -> String -> JVMAst_Bytecode
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem createBString instr = 
    | const -> BString {instr = instr, constant = const}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createBApply" kind="sem">

```mc
sem createBApply : String -> String -> String -> String -> JVMAst_Bytecode
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem createBApply instr owner name  =
    | descriptor -> BApply {instr = instr, name = name, owner = owner, descriptor = descriptor}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createBEmpty" kind="sem">

```mc
sem createBEmpty : String -> JVMAst_Bytecode
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem createBEmpty =
    | instr -> BEmpty {instr = instr}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createBInt" kind="sem">

```mc
sem createBInt : String -> Int -> JVMAst_Bytecode
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem createBInt instr =
    | nr -> BInt {instr = instr, nr = nr}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createBFloat" kind="sem">

```mc
sem createBFloat : String -> Float -> JVMAst_Bytecode
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem createBFloat instr =
    | nr -> BFloat {instr = instr, nr = nr}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createBLong" kind="sem">

```mc
sem createBLong : String -> Int -> JVMAst_Bytecode
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem createBLong instr =
    | nr -> BLong {instr = instr, nr = nr}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createFunction" kind="sem">

```mc
sem createFunction : String -> String -> [JVMAst_Bytecode] -> JVMAst_Function
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem createFunction name descriptor =
    | bytecode -> Function {name = name, descriptor = descriptor, bytecode = bytecode}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createProg" kind="sem">

```mc
sem createProg : String -> [JVMAst_Class] -> [JVMAst_Interface] -> JVMAst_JVMProgram
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem createProg package classes =
    | interfaces -> JVMProgram {package = package, classes = classes, interfaces = interfaces}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createClass" kind="sem">

```mc
sem createClass : String -> String -> [JVMAst_Field] -> JVMAst_Function -> [JVMAst_Function] -> JVMAst_Class
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem createClass name implements fields constructor =
    | functions -> Class {name = name, implements = implements, fields = fields, constructor = constructor, functions = functions}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createInterface" kind="sem">

```mc
sem createInterface : String -> [JVMAst_Field] -> [JVMAst_Function] -> JVMAst_Interface
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem createInterface name fields =
    | functions -> Interface {name = name, fields = fields, functions = functions}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createField" kind="sem">

```mc
sem createField : String -> String -> JVMAst_Field
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem createField name =
    | t -> Field {name = name, t = t} 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="toStringProg" kind="sem">

```mc
sem toStringProg : JVMAst_JVMProgram -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem toStringProg = 
    | JVMProgram {package = package, classes = classes, interfaces = interfaces} -> 
        (join["{", "\"package\":", (stringify package), ",\"interfaces\":[", (commaSeparate (map toStringInterface interfaces)), "],\"classes\":[", (commaSeparate (map toStringClass classes)), "]}"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="toStringClass" kind="sem">

```mc
sem toStringClass : JVMAst_Class -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem toStringClass =
    | Class {name = n, implements = implements, fields = f, constructor = c, functions = fun} ->
        (join ["{", "\"implements\":", (stringify implements), ",\"name\":", (stringify n), ",\"fields\":[", (commaSeparate (map toStringField f)), "],\"constructor\":", (toStringFunction c), ",\"functions\":[", (commaSeparate (map toStringFunction fun)), "]}"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="toStringInterface" kind="sem">

```mc
sem toStringInterface : JVMAst_Interface -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem toStringInterface =
    | Interface {name = n, fields = f, functions = fun} ->
        (join ["{", "\"name\":", (stringify n), ",\"fields\":[", (commaSeparate (map toStringField f)), "],\"functions\":[", (commaSeparate (map toStringFunction fun)), "]}"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="toStringField" kind="sem">

```mc
sem toStringField : JVMAst_Field -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem toStringField =
    | Field {name = name,  t = t} ->
        (join ["{", "\"name\":", (stringify name), ",\"type\":", (stringify t), "}"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="toStringFunction" kind="sem">

```mc
sem toStringFunction : JVMAst_Function -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem toStringFunction =
    | Function {name = n, descriptor = d, bytecode = b} ->
        (join ["{", "\"name\":", (stringify n), ",\"descriptor\":", (stringify d), ",\"bytecode\":[", (commaSeparate (map toStringBytecode b)), "]}"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="toStringBytecode" kind="sem">

```mc
sem toStringBytecode : JVMAst_Bytecode -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem toStringBytecode =
    | BApply {instr = i, owner = o, name = n, descriptor = d} ->
        (join ["{", "\"type\":", "\"apply\"", ",\"instr\":", (stringify i), ",\"owner\":", (stringify o), ",\"name\":", (stringify n), ",\"descriptor\":", (stringify d), "}"])
    | BString {instr = i, constant = c} ->
        (join ["{", "\"type\":", "\"arg_constant\"", ",\"instr\":", (stringify i), ",\"constant\":", (stringify c), "}"])
    | BInt {instr = i, nr = nr } ->
        (join ["{", "\"type\":", "\"arg_int\"", ",\"instr\":", (stringify i), ",\"nr\":", (int2string nr), "}"])
    | BFloat {instr = i, nr = nr } ->
        (join ["{", "\"type\":", "\"arg_float\"", ",\"instr\":", (stringify i), ",\"nr\":", (concat (float2string nr) "0"), "}"])
    | BLong {instr = i, nr = nr } ->
        (join ["{", "\"type\":", "\"arg_long\"", ",\"instr\":", (stringify i), ",\"nr\":", (int2string nr), "}"])
    | BEmpty {instr = i} ->
        (join ["{", "\"type\":", "\"empty\"", ",\"instr\":", (stringify i), "}"])
```
</ToggleWrapper>
</DocBlock>

