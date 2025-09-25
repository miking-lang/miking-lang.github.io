import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# stringid.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
The String ID library should be used when strings  
are often compared for equality. For instance, instead  
of inserting a string into an AST, the string identifier \(SID\)  
of the string is inserted instead. Since the string ID is internally  
represented as an integer, it is much faster to compare for equality.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Types  
  

          <DocBlock title="SID" kind="type">

```mc
type SID : Int
```

<Description>{`Right now, we use an integer as the identifier,  
so that the map intrinsics can be used.`}</Description>


<ToggleWrapper text="Code..">
```mc
type SID = Int
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="cmpSID" kind="let">

```mc
let cmpSID  : Int -> Int -> Int
```



<ToggleWrapper text="Code..">
```mc
let cmpSID = subi
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqSID" kind="let">

```mc
let eqSID  : Int -> Int -> Bool
```



<ToggleWrapper text="Code..">
```mc
let eqSID = eqi
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_sidCounter" kind="let">

```mc
let _sidCounter  : Ref Int
```

<Description>{`These definitions are only defined once`}</Description>


<ToggleWrapper text="Code..">
```mc
let _sidCounter = ref 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_mapStringToSid" kind="let">

```mc
let _mapStringToSid  : Ref (Map String Int)
```



<ToggleWrapper text="Code..">
```mc
let _mapStringToSid = ref (mapEmpty cmpString)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_mapSidToString" kind="let">

```mc
let _mapSidToString  : Ref (Map Int String)
```



<ToggleWrapper text="Code..">
```mc
let _mapSidToString = ref (mapEmpty subi)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sidToString" kind="let">

```mc
let sidToString sid : SID -> String
```

<Description>{`Returns the string representation of a string ID`}</Description>


<ToggleWrapper text="Code..">
```mc
let sidToString : SID -> String = lam sid.
  mapFindOrElse (lam. error "SID is not defined") sid (deref _mapSidToString)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="stringToSid" kind="let">

```mc
let stringToSid str : String -> SID
```

<Description>{`Returns the string ID for a specific string`}</Description>


<ToggleWrapper text="Code..">
```mc
let stringToSid : String -> SID = lam str.
  mapFindOrElse
    (lam.
       modref _sidCounter (addi (deref _sidCounter) 1);
       let sid = deref _sidCounter in
       modref _mapStringToSid (mapInsert str sid (deref _mapStringToSid));
       modref _mapSidToString (mapInsert sid str (deref _mapSidToString));
       sid)
    str (deref _mapStringToSid)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lengthSID" kind="let">

```mc
let lengthSID sid : SID -> Int
```

<Description>{`Extracts the length of an underlying string of a SID`}</Description>


<ToggleWrapper text="Code..">
```mc
let lengthSID : SID -> Int = lam sid. length (sidToString sid)
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr

let sid1 = stringToSid "Foo" in
utest sid1 with sid1 in
utest sidToString sid1 with "Foo" in

utest cmpSID sid1 sid1 with 0 in
utest eqSID sid1 sid1 with true in
utest lengthSID sid1 with 3 in

let sid2 = stringToSid "Bar text" in
utest sid2 with sid2 in
utest sid2 with sid1 using neqi in
utest sidToString sid2 with "Bar text" in
utest sidToString sid1 with "Foo" in
utest sidToString sid1 with sidToString sid2 using lam x. lam y. not (eqString x y) in

utest eqi (cmpSID sid1 sid2) 0 with false in
utest eqSID sid1 sid2 with false in
utest lengthSID sid2 with 8 in

let sid3 = stringToSid "Foo" in
utest sid1 with sid3 in
utest sidToString sid1 with "Foo" in
utest sidToString sid2 with "Bar text" in
utest sidToString sid3 with "Foo" in

utest lengthSID sid3 with 3 in

()
```
</ToggleWrapper>
</DocBlock>

