import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NonDet  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="NDItem" kind="syn">

```mc
syn NDItem
```



<ToggleWrapper text="Code..">
```mc
syn NDItem =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Query" kind="syn">

```mc
syn Query
```

<Description>{`NOTE\(aathn, 2024\-02\-07\): If we had GADTs, we wouldn't need this  
NDItem type, we could simply have  
NDChooseQ : all a. \[a\] \-\> Query a.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn Query =
  | NDChooseQ [NDItem]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Response" kind="syn">

```mc
syn Response
```



<ToggleWrapper text="Code..">
```mc
syn Response =
  | NDChooseR NDItem
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="choose" kind="sem">

```mc
sem choose : all a. [a] -> Effect_Eff a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem choose =
  | is ->
    -- NOTE(aathn, 2024-02-07): We cheat by defining a local
    -- constructor which will escape its scope -- this is safe since
    -- it will always be handled by the corresponding continuation,
    -- but it would be rejected by the new typechecker, and it would
    -- be unnecessary if we had GADTs as stated above.
    con Item : a -> NDItem in
    perform
      (NDChooseQ (map (lam i. Item i) is))
      (lam x. match x with NDChooseR (Item i) in i)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="handleND" kind="sem">

```mc
sem handleND : all a. Effect_Eff a -> Effect_Eff [a]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem handleND =
  | e ->
    let handler = lam continue. lam q.
      match q with NDChooseQ is then
        let f = lam acc. lam i. effMap2 concat acc (continue (NDChooseR i)) in
        Some (foldl f (return []) is)
      else None ()
    in
    handleEff (lam x. return [x]) handler e
```
</ToggleWrapper>
</DocBlock>

