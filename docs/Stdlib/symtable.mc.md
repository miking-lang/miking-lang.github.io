import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# symtable.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
This library implements a symbol table. The  
implementation is based on  module 'name.mc'.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>  
  
## Types  
  

          <DocBlock title="SymTable" kind="type">

```mc
type SymTable : [Name]
```



<ToggleWrapper text="Code..">
```mc
type SymTable = [Name]
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="symtableEmpty" kind="let">

```mc
let symtableEmpty  : all a. [a]
```

<Description>{`Defines an empty symbol table`}</Description>


<ToggleWrapper text="Code..">
```mc
let symtableEmpty = []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symtableAdd" kind="let">

```mc
let symtableAdd n t : Name -> SymTable -> {name: Name, table: SymTable}
```

<Description>{`'symtableAdd n t' returns a record  '\{name:Name, table:SymTable\)' where  
field 'table' has been extended with name 'n' if it did not  
already exist in 't'. If the string of 'n' existed, then  
the returned table is the same as table 't'. In both cases,  
field 'name' has the string of 'n' with a unique symbol.`}</Description>


<ToggleWrapper text="Code..">
```mc
let symtableAdd : Name -> SymTable -> {name: Name, table: SymTable} =
  lam n. lam t.
    match find (nameEqStr n) t with Some n2 then
      {name = n2, table = t}
    else
      let n2 = nameSetNewSym n in
      {name = n2, table = cons n2 t}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_r1" kind="let">

```mc
let _r1  : {name: Name, table: SymTable}
```



<ToggleWrapper text="Code..">
```mc
let _r1 = symtableAdd (nameNoSym "foo") []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_r2" kind="let">

```mc
let _r2  : {name: Name, table: SymTable}
```



<ToggleWrapper text="Code..">
```mc
let _r2 = symtableAdd (nameNoSym "bar") _r1.table
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_r3" kind="let">

```mc
let _r3  : {name: Name, table: SymTable}
```



<ToggleWrapper text="Code..">
```mc
let _r3 = symtableAdd (nameNoSym "foo") _r2.table
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest nameEqStr (_r1.name) (nameNoSym "foo") with true
utest nameEqStr (_r2.name) (nameNoSym "bar") with true
utest nameEqStr (_r3.name) (nameNoSym "foo") with true
utest nameEqStr (_r3.name) (nameNoSym "else") with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symtableMem" kind="let">

```mc
let symtableMem n t : Name -> SymTable -> Bool
```

<Description>{`'symbtableMem n t' returns true if the string of 'n'  
exists in table 't'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let symtableMem : Name -> SymTable -> Bool =
  lam n. lam t.
    any (nameEqStr n) t
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest symtableMem (nameNoSym "foo") _r1.table with true
utest symtableMem (nameNoSym "foo") _r3.table with true
utest symtableMem (nameNoSym "bar") _r3.table with true
utest symtableMem (nameNoSym "else") _r3.table with false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symtableSize" kind="let">

```mc
let symtableSize t : SymTable -> Int
```

<Description>{`'symtableSize t' returns the number of names in  
the symbol table 't'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let symtableSize : SymTable -> Int =
  lam t. length t
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest symtableSize symtableEmpty with 0
utest symtableSize _r1.table with 1
utest symtableSize _r2.table with 2
utest symtableSize _r3.table with 2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symtableRemove" kind="let">

```mc
let symtableRemove n t : Name -> SymTable -> SymTable
```

<Description>{`'symtableRemove n t' returns a new table where names with strings  
equal to the string of 'n' are removed from 't'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let symtableRemove : Name -> SymTable -> SymTable =
  lam n. lam t.
    filter (lam n2. not (nameEqStr n n2)) t
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest symtableMem (nameNoSym "foo") _r3.table with true
utest symtableMem (nameNoSym "foo") (symtableRemove (nameNoSym "foo") _r3.table) with false
utest symtableSize (symtableRemove (nameNoSym "foo") _r3.table) with 1
utest symtableSize (symtableRemove (nameNoSym "nothing") _r3.table) with 2
```
</ToggleWrapper>
</DocBlock>

