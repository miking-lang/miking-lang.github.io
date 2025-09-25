import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# atomic.mc  
  

Atomic references.

  
  
  
## Types  
  

          <DocBlock title="ARef" kind="type">

```mc
type ARef
```



<ToggleWrapper text="Code..">
```mc
type ARef a

-- 'atomicMake v' creates a new atomic reference with initial value v
external externalAtomicMake ! : all a. a -> ARef a
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="atomicMake" kind="let">

```mc
let atomicMake v : all a. a -> ARef a
```



<ToggleWrapper text="Code..">
```mc
let atomicMake = lam v.
  externalAtomicMake v

-- 'atomicGet r' returns the current value of the atomic reference 'r'.
external externalAtomicGet ! : all a. ARef a -> a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="atomicGet" kind="let">

```mc
let atomicGet v : all a. ARef a -> a
```



<ToggleWrapper text="Code..">
```mc
let atomicGet = lam v.
  externalAtomicGet v

-- 'atomicExchange r v' sets the value of the atomic reference 'r' to 'v' and
-- returns the current (old) value.
external externalAtomicExchange ! : all a. ARef a -> a -> a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="atomicExchange" kind="let">

```mc
let atomicExchange r v : all a. ARef a -> a -> a
```



<ToggleWrapper text="Code..">
```mc
let atomicExchange = lam r. lam v.
  externalAtomicExchange r v

-- 'atomicCAS r seen v' sets the value of the atomic reference 'r' to 'v' iff
-- the current value is physically equal to 'seen'. Returns 'true' if the update
-- was successful, otherwise 'false'.
external externalAtomicCAS ! : all a. ARef a -> a -> a -> Bool
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="atomicCAS" kind="let">

```mc
let atomicCAS r v1 v2 : all a. ARef a -> a -> a -> Bool
```



<ToggleWrapper text="Code..">
```mc
let atomicCAS = lam r. lam v1. lam v2.
  externalAtomicCAS r v1 v2

-- 'atomicFetchAndAdd r v' adds 'v' to the current value of the atomic reference
-- 'r' and returns the current (old) value.
external externalAtomicFetchAndAdd ! : ARef Int -> Int -> Int
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="atomicFetchAndAdd" kind="let">

```mc
let atomicFetchAndAdd a v : ARef Int -> Int -> Int
```



<ToggleWrapper text="Code..">
```mc
let atomicFetchAndAdd = lam a. lam v.
  externalAtomicFetchAndAdd a v
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="atomicSet" kind="let">

```mc
let atomicSet r v : all a. ARef a -> a -> ()
```

<Description>{`'atomicSet r v' sets the value of the atomic reference 'r' to 'v'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let atomicSet : all a. ARef a -> a -> () = lam r. lam v.
  atomicExchange r v; ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="atomicIncr" kind="let">

```mc
let atomicIncr r : ARef Int -> ()
```

<Description>{`'atomicIncr r' increments the value of the atomic reference 'r' by 1.`}</Description>


<ToggleWrapper text="Code..">
```mc
let atomicIncr : ARef Int -> () = lam r.
  atomicFetchAndAdd r 1; ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="atomicDecr" kind="let">

```mc
let atomicDecr r : ARef Int -> ()
```

<Description>{`'atomicDecr r' decrements the value of the atomic reference 'r' by 1.`}</Description>


<ToggleWrapper text="Code..">
```mc
let atomicDecr : ARef Int -> () = lam r.
  atomicFetchAndAdd r (subi 0 1); ()
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

utest
  let a = atomicMake 0 in
  utest atomicCAS a 0 1 with true in
  utest atomicCAS a 1 (subi 0 1) with true in
  utest atomicCAS a 42 0 with false in
  utest atomicExchange a 0 with subi 0 1 in
  utest atomicFetchAndAdd a 2 with 0 in
  utest atomicGet a with 2 in

  let a = atomicMake [] in
  utest atomicSet a [1,2,3] with () in
  utest atomicGet a with [1,2,3] in

  let a = atomicMake 0 in
  utest atomicIncr a with () in
  utest atomicGet a with 1 in
  utest atomicDecr a with () in
  utest atomicGet a with 0 in
  ()
with () in
()
```
</ToggleWrapper>
</DocBlock>

