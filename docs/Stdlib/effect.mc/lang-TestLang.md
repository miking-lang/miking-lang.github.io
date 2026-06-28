import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TestLang  
  

  
  
  
## Semantics  
  

          <DocBlock title="getInt" kind="sem">

```mc
sem getInt : Reader_Ctx -> Int
```



<ToggleWrapper text="Code..">
```mc
sem getInt : Ctx -> Int
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addInt" kind="sem">

```mc
sem addInt : Int -> Reader_Ctx -> Reader_Ctx
```



<ToggleWrapper text="Code..">
```mc
sem addInt : Int -> Ctx -> Ctx
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="effProg" kind="sem">

```mc
sem effProg : () -> Effect_Eff Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem effProg = | () ->
    local (addInt 3)
      (bind (choose [0,1]) (lam i.
      bind (choose [2,3]) (lam j.
      bind (ask getInt) (lam k.
      return (addi (addi i j) k)))))
```
</ToggleWrapper>
</DocBlock>

