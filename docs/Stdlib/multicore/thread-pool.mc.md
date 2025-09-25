import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# thread-pool.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
Defines a thread pool for parallel execution of tasks.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/multicore/thread.mc"} style={S.link}>thread.mc</a>, <a href={"/docs/Stdlib/multicore/atomic.mc"} style={S.link}>atomic.mc</a>, <a href={"/docs/Stdlib/multicore/channel.mc"} style={S.link}>channel.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>  
  
## Types  
  

          <DocBlock title="Async" kind="type">

```mc
type Async
```



<ToggleWrapper text="Code..">
```mc
type Async a = ARef (Option a)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ThreadPoolTask" kind="type">

```mc
type ThreadPoolTask
```



<ToggleWrapper text="Code..">
```mc
type ThreadPoolTask a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ThreadPool" kind="type">

```mc
type ThreadPool
```



<ToggleWrapper text="Code..">
```mc
type ThreadPool a = {threads : [Thread ()], queue : Channel (ThreadPoolTask a)}
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="Task" kind="con">

```mc
con Task : all a . { task: () -> a, result: Async a } -> ThreadPoolTask a
```



<ToggleWrapper text="Code..">
```mc
con Task : all a. {task : () -> a, result : Async a} -> ThreadPoolTask a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Quit" kind="con">

```mc
con Quit : all a . () -> ThreadPoolTask a
```



<ToggleWrapper text="Code..">
```mc
con Quit : all a. () -> ThreadPoolTask a
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="threadPoolCreate" kind="let">

```mc
let threadPoolCreate n : all a. Int -> ThreadPool a
```

<Description>{`'threadPoolCreate n' creates a new thread pool with 'n' worker threads.`}</Description>


<ToggleWrapper text="Code..">
```mc
let threadPoolCreate : all a. Int -> ThreadPool a = lam n.
  let chan = channelEmpty () in
  {threads = create n (lam. threadSpawn (lam. _wait chan)), queue = chan}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="threadPoolTearDown" kind="let">

```mc
let threadPoolTearDown pool : all a. ThreadPool a -> ()
```

<Description>{`'threadPoolTearDown p' joins the threads in the pool 'p'.  
  
NOTE: Should be called as soon as a thread pool has finished all intended  
tasks. After 'threadPoolTearDown', no more tasks can be sent to the pool.`}</Description>


<ToggleWrapper text="Code..">
```mc
let threadPoolTearDown : all a. ThreadPool a -> () = lam pool.
  channelSendMany pool.queue (map (lam. Quit ()) pool.threads);
  iter threadJoin pool.threads
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="threadPoolAsync" kind="let">

```mc
let threadPoolAsync pool task : all a. ThreadPool a -> (() -> a) -> Async a
```

<Description>{`'threadPoolAsync p task' sends a 'task' to the pool 'p'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let threadPoolAsync : all a. ThreadPool a -> (() -> a) -> Async a = lam pool. lam task.
  let r = atomicMake (None ()) in
  channelSend pool.queue (Task {task = task, result = r});
  r
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_wait" kind="let">

```mc
let _wait chan : all a. Channel (ThreadPoolTask a) -> ()
```



<ToggleWrapper text="Code..">
```mc
let _wait = lam chan.
  let msg = channelRecv chan in
  match msg with Task {task = f, result = r} then
    atomicSet r (Some (f ()));
    _wait chan
  else match msg with Quit _ then ()
  else never
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
  let pool = threadPoolCreate 8 in
  threadPoolTearDown pool
with () in

utest
  let pool = threadPoolCreate 2 in
  let r1 = threadPoolAsync pool (lam. addi 0 1) in
  let r2 = threadPoolAsync pool (lam. addi 0 2) in
  let r3 = threadPoolAsync pool (lam. addi 0 3) in
  let r4 = threadPoolAsync pool (lam. addi 0 4) in
  let r5 = threadPoolAsync pool (lam. addi 0 5) in
  let r6 = threadPoolAsync pool (lam. addi 0 6) in
  let r =
  [ threadPoolWait pool r1
  , threadPoolWait pool r2
  , threadPoolWait pool r3
  , threadPoolWait pool r4
  , threadPoolWait pool r5
  , threadPoolWait pool r6
  ] in
  threadPoolTearDown pool; r
with [1,2,3,4,5,6] in

()
```
</ToggleWrapper>
</DocBlock>

