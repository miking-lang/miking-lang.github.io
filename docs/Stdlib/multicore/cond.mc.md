import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# cond.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
Condition variables for thread synchronization.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/multicore/thread.mc"} style={S.link}>thread.mc</a>, <a href={"/docs/Stdlib/multicore/mutex.mc"} style={S.link}>mutex.mc</a>  
  
## Types  
  

          <DocBlock title="Cond" kind="type">

```mc
type Cond
```



<ToggleWrapper text="Code..">
```mc
type Cond

-- 'condCreate ()' returns a new condition variable
external externalCondCreate ! : () -> Cond
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="condCreate" kind="let">

```mc
let condCreate _ : all a. a -> Cond
```



<ToggleWrapper text="Code..">
```mc
let condCreate = lam.
  externalCondCreate ()

-- 'condWait c m' releases the mutex 'm' and suspends the current thread until
-- condition variable 'c' is set
external externalCondWait ! : Cond -> Mutex -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="condWait" kind="let">

```mc
let condWait c m : Cond -> Mutex -> ()
```



<ToggleWrapper text="Code..">
```mc
let condWait = lam c. lam m.
  externalCondWait c m

-- 'condSignal c' signals the condition variable 'c', waking up ONE waiting
-- thread
external externalCondSignal ! : Cond -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="condSignal" kind="let">

```mc
let condSignal c : Cond -> ()
```



<ToggleWrapper text="Code..">
```mc
let condSignal = lam c.
  externalCondSignal c

-- 'condBroadcast c' signals the condition variable 'c', waking up ALL waiting
-- threads.
external externalCondBroadcast ! : Cond -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="condBroadcast" kind="let">

```mc
let condBroadcast c : Cond -> ()
```



<ToggleWrapper text="Code..">
```mc
let condBroadcast = lam c.
  externalCondBroadcast c
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
  let c = condCreate () in

  let m = mutexCreate () in

  let t1 = threadSpawn (lam. mutexLock m; condWait c m; condSignal c; mutexRelease m) in
  let t2 = threadSpawn (lam. mutexLock m; condSignal c; mutexRelease m) in
  threadJoin t1;
  threadJoin t2;

  let t1 = threadSpawn (lam. mutexLock m; condWait c m; condSignal c; mutexRelease m) in
  let t2 = threadSpawn (lam. mutexLock m; condWait c m; condSignal c; mutexRelease m) in
  let t3 = threadSpawn (lam. mutexLock m; condBroadcast c; mutexRelease m) in
  threadJoin t1;
  threadJoin t2;
  threadJoin t3;

  ()
with () in ()
```
</ToggleWrapper>
</DocBlock>

