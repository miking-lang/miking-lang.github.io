import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# mutex.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
Mutual\-exclusion locks.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/multicore/thread.mc"} style={S.link}>thread.mc</a>  
  
## Types  
  

          <DocBlock title="Mutex" kind="type">

```mc
type Mutex
```



<ToggleWrapper text="Code..">
```mc
type Mutex

-- 'mutexCreate ()' returns a new mutex.
external externalMutexCreate ! : () -> Mutex
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="mutexCreate" kind="let">

```mc
let mutexCreate _ : all a. a -> Mutex
```



<ToggleWrapper text="Code..">
```mc
let mutexCreate = lam.
  externalMutexCreate ()

-- 'mutexLock m' locks the mutex 'm'.
external externalMutexLock ! : Mutex -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mutexLock" kind="let">

```mc
let mutexLock m : Mutex -> ()
```



<ToggleWrapper text="Code..">
```mc
let mutexLock = lam m.
  externalMutexLock m

-- 'mutexTryLock m' tries to lock the mutex 'm'.
external externalMutexTryLock ! : Mutex -> Bool
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mutexTryLock" kind="let">

```mc
let mutexTryLock m : Mutex -> Bool
```



<ToggleWrapper text="Code..">
```mc
let mutexTryLock = lam m.
  externalMutexTryLock m

-- 'mutexRelease m' releases the mutex 'm'.
external externalMutexRelease ! : Mutex -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mutexRelease" kind="let">

```mc
let mutexRelease m : Mutex -> ()
```



<ToggleWrapper text="Code..">
```mc
let mutexRelease = lam m.
  externalMutexRelease m
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

let debug = false in
let debugPrint = if debug then print else lam x. () in

-- Used for debug printing, included to avoid dependency on seq.mc
let int2string = lam n.
  recursive
  let int2string_rechelper = lam n.
    if lti n 10
    then [int2char (addi n (char2int '0'))]
    else
      let d = [int2char (addi (modi n 10) (char2int '0'))] in
      concat (int2string_rechelper (divi n 10)) d
  in
  if lti n 0
  then cons '-' (int2string_rechelper (negi n))
  else int2string_rechelper n
in

utest
  let m = mutexCreate () in

  utest mutexLock m with () in
  utest mutexRelease m with () in
  utest
    let b = mutexTryLock m in
    (if b then mutexRelease m else ());
    b
  with true in

  utest
    let ts = create 10 (lam. threadSpawn (lam.
      mutexLock m;
      debugPrint (join [int2string (threadSelf ()), " has the lock!\n"]);
      mutexRelease m
      ))
    in iter threadJoin ts
  with () in

  utest
    let ts = create 10 (lam. threadSpawn (lam.
      if mutexTryLock m then
        debugPrint (join [int2string (threadSelf ()), " got the lock!\n"]);
        mutexRelease m
      else
        debugPrint (join [int2string (threadSelf ()), " did not get the lock!\n"]);
        ()
  ))
  in iter threadJoin ts
  with () in ()
with () in
()
```
</ToggleWrapper>
</DocBlock>

