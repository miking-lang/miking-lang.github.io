import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# channel.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
Implements a FIFO queue with a multiple senders and multiple receiver  
threads. The channel has an infinite buffer, so a call to 'channelSend' never  
blocks.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/multicore/atomic.mc"} style={S.link}>atomic.mc</a>, <a href={"/docs/Stdlib/multicore/thread.mc"} style={S.link}>thread.mc</a>, <a href={"/docs/Stdlib/multicore/mutex.mc"} style={S.link}>mutex.mc</a>, <a href={"/docs/Stdlib/multicore/cond.mc"} style={S.link}>cond.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>  
  
## Types  
  

          <DocBlock title="Channel" kind="type">

```mc
type Channel
```



<ToggleWrapper text="Code..">
```mc
type Channel a = {contents : ARef [a], lock : Mutex, nonEmpty : Cond}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="channelEmpty" kind="let">

```mc
let channelEmpty _ : all a. () -> Channel a
```



<ToggleWrapper text="Code..">
```mc
let channelEmpty : all a. () -> Channel a = lam.
  { contents = atomicMake []
  , lock = mutexCreate ()
  , nonEmpty = condCreate ()
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="channelSend" kind="let">

```mc
let channelSend chan msg : all a. Channel a -> a -> ()
```

<Description>{`'channelSend c msg' sends the message 'msg' to the channel 'c'`}</Description>


<ToggleWrapper text="Code..">
```mc
let channelSend : all a. Channel a -> a -> () = lam chan. lam msg.
  mutexLock chan.lock;

  let old = atomicGet chan.contents in
  let new = snoc old msg in
  (utest atomicCAS chan.contents old new with true in ());
  atomicSet chan.contents new;

  condSignal chan.nonEmpty;
  mutexRelease chan.lock
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="channelSendMany" kind="let">

```mc
let channelSendMany chan msgs : all a. Channel a -> [a] -> ()
```

<Description>{`'channelSendMany c msgs' sends the messages 'msgs' to the channel 'c'`}</Description>


<ToggleWrapper text="Code..">
```mc
let channelSendMany : all a. Channel a -> [a] -> () = lam chan. lam msgs.
  mutexLock chan.lock;

  let old = atomicGet chan.contents in
  let new = concat old msgs in
  (utest atomicCAS chan.contents old new with true in ());
  atomicSet chan.contents new;

  iter (lam. condSignal chan.nonEmpty) msgs;
  mutexRelease chan.lock
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="channelRecv" kind="let">

```mc
let channelRecv chan : all a. Channel a -> a
```

<Description>{`'channelRecv c' receives a message from the channel 'c'. Blocks until there  
is at least one message in the channel.`}</Description>


<ToggleWrapper text="Code..">
```mc
let channelRecv : all a. Channel a -> a = lam chan.
  mutexLock chan.lock;

  recursive let waitForMsg : () -> a = lam.
    let contents = atomicGet chan.contents in
    match contents with [] then
      condWait chan.nonEmpty chan.lock;
      waitForMsg ()
    else match contents with [msg] ++ rest then
      (utest atomicCAS chan.contents contents rest with true in ());
      atomicSet chan.contents rest;
      msg
    else never
  in

  let msg = waitForMsg () in

  mutexRelease chan.lock;
  msg
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="channelRecvOpt" kind="let">

```mc
let channelRecvOpt chan : all a. Channel a -> Option a
```

<Description>{`'channelRecvOpt c' is a non\-blocking version of 'channelRecv'. If the channel  
is empty, then None \(\) is immediately returned, instead of blocking the call.`}</Description>


<ToggleWrapper text="Code..">
```mc
let channelRecvOpt : all a. Channel a -> Option a = lam chan.
  mutexLock chan.lock;

  let msg =
    let contents = atomicGet chan.contents in
    match contents with [] then None ()
    else match contents with [msg] ++ rest then
      (utest atomicCAS chan.contents contents rest with true in ());
      atomicSet chan.contents rest;
      Some msg
    else never
  in

  mutexRelease chan.lock;
  msg
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

-- To avoid dependency on seq.mc
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

recursive
  let find = lam p. lam seq.
    if null seq then None ()
    else if p (head seq) then Some (head seq)
    else find p (tail seq)
in

utest find (lam x. eqi x 2) [4,1,2] with Some 2 using optionEq eqi in
utest find (lam x. lti x 1) [4,1,2] with None () using optionEq eqi in

let distinct = lam eq. lam seq.
  recursive let work = lam seq1. lam seq2.
    match seq1 with [h] ++ t
      then match find (eq h) seq2 with Some _
           then work t seq2
           else cons h (work t (cons h seq2))
    else []
  in work seq []
in

let join = lam seqs. foldl concat [] seqs in

utest
  let c = channelEmpty () in

  utest channelSend c 1 with () in
  utest channelSend c 2 with () in
  utest channelRecv c with 1 in
  utest channelRecv c with 2 in

  utest channelRecvOpt c with None () using optionEq eqi in
  channelSend c 2;
  utest channelRecvOpt c with Some 2 in

  let debug = false in
  let debugPrintLn = if debug then lam x. print (concat x "\n") else (lam x. ()) in
  let n = 100 in

  let threads = map (lam.
    threadSpawn (lam.
      let id = int2string (threadSelf ()) in
      debugPrintLn (concat id " running");
      let res = channelRecv c in
      debugPrintLn (join [int2string (threadSelf ()), " got ", int2string res]);
      res))
    (create n (lam. ())) in

  iteri (lam i. lam. channelSend c i) (create n (lam. ()));

  let res = map threadJoin threads in

  utest length (distinct eqi res) with n in

  let threads = map (lam.
    threadSpawn (lam.
      let id = int2string (threadSelf ()) in
      debugPrintLn (concat id " running");
      let res = channelRecv c in
      debugPrintLn (join [int2string (threadSelf ()), " got ", int2string res]);
      res))
    (create n (lam. ()))
  in

  channelSendMany c (create n (lam i. i));

  let res = map threadJoin threads in

  utest length (distinct eqi res) with n in
  ()
with () in ()
```
</ToggleWrapper>
</DocBlock>

