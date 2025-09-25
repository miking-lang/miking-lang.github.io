import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# lazy.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>  
  
## Types  
  

          <DocBlock title="LazyContainer" kind="type">

```mc
type LazyContainer
```



<ToggleWrapper text="Code..">
```mc
type LazyContainer a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Lazy" kind="type">

```mc
type Lazy
```



<ToggleWrapper text="Code..">
```mc
type Lazy a = Ref (LazyContainer a)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="StreamNode" kind="type">

```mc
type StreamNode
```



<ToggleWrapper text="Code..">
```mc
type StreamNode a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LStream" kind="type">

```mc
type LStream
```



<ToggleWrapper text="Code..">
```mc
type LStream a = Lazy (StreamNode a)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IterNode" kind="type">

```mc
type IterNode
```



<ToggleWrapper text="Code..">
```mc
type IterNode a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Iter" kind="type">

```mc
type Iter
```



<ToggleWrapper text="Code..">
```mc
type Iter a = () -> IterNode a
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="LazyVal" kind="con">

```mc
con LazyVal : all a . a -> LazyContainer a
```



<ToggleWrapper text="Code..">
```mc
con LazyVal : all a. a -> LazyContainer a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LazyFunc" kind="con">

```mc
con LazyFunc : all a . (() -> a) -> LazyContainer a
```



<ToggleWrapper text="Code..">
```mc
con LazyFunc : all a. (() -> a) -> LazyContainer a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SNil" kind="con">

```mc
con SNil : all a . () -> StreamNode a
```



<ToggleWrapper text="Code..">
```mc
con SNil : all a. () -> StreamNode a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SCons" kind="con">

```mc
con SCons : all a . (a, Lazy (StreamNode a)) -> StreamNode a
```



<ToggleWrapper text="Code..">
```mc
con SCons : all a. (a, Lazy (StreamNode a)) -> StreamNode a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="INNil" kind="con">

```mc
con INNil : all a . () -> IterNode a
```



<ToggleWrapper text="Code..">
```mc
con INNil : all a. () -> IterNode a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="INCons" kind="con">

```mc
con INCons : all a . (a, Iter a) -> IterNode a
```



<ToggleWrapper text="Code..">
```mc
con INCons : all a. (a, Iter a) -> IterNode a
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="lazy" kind="let">

```mc
let lazy f : all a. (() -> a) -> Lazy a
```



<ToggleWrapper text="Code..">
```mc
let lazy : all a. (() -> a) -> Lazy a
  = lam f. ref (LazyFunc f)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyForce" kind="let">

```mc
let lazyForce l : all a. Lazy a -> a
```



<ToggleWrapper text="Code..">
```mc
let lazyForce : all a. Lazy a -> a
  = lam l.
    switch deref l
    case LazyVal a then a
    case LazyFunc f then
      let res = f () in
      modref l (LazyVal res);
      res
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyMap" kind="let">

```mc
let lazyMap f l : all a. all b. (a -> b) -> Lazy a -> Lazy b
```



<ToggleWrapper text="Code..">
```mc
let lazyMap : all a. all b. (a -> b) -> Lazy a -> Lazy b
  = lam f. lam l.
    lazy (lam. f (lazyForce l))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyStreamEmpty" kind="let">

```mc
let lazyStreamEmpty _ : all a. () -> LStream a
```



<ToggleWrapper text="Code..">
```mc
let lazyStreamEmpty : all a. () -> LStream a
  = lam. ref (LazyVal (SNil ()))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyStreamSingleton" kind="let">

```mc
let lazyStreamSingleton a : all a. a -> LStream a
```



<ToggleWrapper text="Code..">
```mc
let lazyStreamSingleton : all a. a -> LStream a
  = lam a. ref (LazyVal (SCons (a, lazyStreamEmpty ())))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyStream" kind="let">

```mc
let lazyStream f acc : all acc. all a. (acc -> Option (acc, a)) -> acc -> LStream a
```



<ToggleWrapper text="Code..">
```mc
let lazyStream : all acc. all a. (acc -> Option (acc, a)) -> acc -> LStream a
  = lam f. lam acc.
    recursive let goNext = lam acc.
      match f acc with Some (acc, a) then
        SCons (a, lazy (lam. goNext acc))
      else SNil () in
    lazy (lam. goNext acc)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyStreamLaziest" kind="let">

```mc
let lazyStreamLaziest f acc : all acc. all a. (acc -> Option (() -> acc, a)) -> (() -> acc) -> LStream a
```



<ToggleWrapper text="Code..">
```mc
let lazyStreamLaziest : all acc. all a. (acc -> Option (() -> acc, a)) -> (() -> acc) -> LStream a
  = lam f. lam acc.
    recursive let goNext = lam acc.
      match f acc with Some (acc, a) then
        SCons (a, lazy (lam. goNext (acc ())))
      else SNil () in
    lazy (lam. goNext (acc ()))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyStreamWithInit" kind="let">

```mc
let lazyStreamWithInit init f : all acc. all a. (() -> acc) -> (acc -> Option (acc, a)) -> LStream a
```



<ToggleWrapper text="Code..">
```mc
let lazyStreamWithInit : all acc. all a. (() -> acc) -> (acc -> Option (acc, a)) -> LStream a
  = lam init. lam f.
    recursive let goNext = lam acc.
      match f acc with Some (acc, a) then
        SCons (a, lazy (lam. goNext acc))
      else SNil () in
    lazy (lam. goNext (init ()))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyStreamUncons" kind="let">

```mc
let lazyStreamUncons s : all a. LStream a -> Option (a, LStream a)
```



<ToggleWrapper text="Code..">
```mc
let lazyStreamUncons : all a. LStream a -> Option (a, LStream a)
  = lam s.
    switch lazyForce s
    case SCons (h, t) then Some (h, t)
    case SNil _ then None ()
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyStreamMap" kind="let">

```mc
let lazyStreamMap f s : all a. all b. (a -> b) -> LStream a -> LStream b
```



<ToggleWrapper text="Code..">
```mc
let lazyStreamMap : all a. all b. (a -> b) -> LStream a -> LStream b
  = lam f. lam s.
    recursive let work = lam s.
      let body = lam.
        match lazyStreamUncons s with Some (a, as)
        then SCons (f a, work as)
        else SNil () in
      lazy body
    in work s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyStreamMapOption" kind="let">

```mc
let lazyStreamMapOption f s : all a. all b. (a -> Option b) -> LStream a -> LStream b
```



<ToggleWrapper text="Code..">
```mc
let lazyStreamMapOption : all a. all b. (a -> Option b) -> LStream a -> LStream b
  = lam f. lam s.
    recursive let work = lam s.
      switch s
      case SCons (h, ss) then
        match f h with Some h
        then SCons (h, lazyMap work ss)
        else work (lazyForce ss)
      case SNil _ then
        SNil ()
      end
    in lazyMap work s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyStreamMergeMin" kind="let">

```mc
let lazyStreamMergeMin cmp streams : all a. (a -> a -> Int) -> [LStream a] -> LStream a
```

<Description>{`OPT\(vipa, 2023\-11\-30\): This could probably be more efficient with  
some extra initialization, maybe putting all the things in a Heap`}</Description>


<ToggleWrapper text="Code..">
```mc
let lazyStreamMergeMin : all a. (a -> a -> Int) -> [LStream a] -> LStream a
  = lam cmp. lam streams.
    let step = lam streams.
      let f = lam acc : (Option {here : a, tail : LStream a, full : LStream a}, [LStream a]). lam stream.
        match lazyStreamUncons stream with Some (here, tail) then
          match acc.0 with Some prev then
            if lti (cmp here prev.here) 0 then
              (Some {here = here, tail = tail, full = stream}, snoc acc.1 prev.full)
            else (acc.0, snoc acc.1 stream)
          else (Some {here = here, tail = tail, full = stream}, acc.1)
        else acc in
      match foldl f (None (), []) streams with (Some min, streams) then
        Some (snoc streams min.tail, min.here)
      else None ()
    in lazyStream step streams
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyStreamStatefulFilterMap" kind="let">

```mc
let lazyStreamStatefulFilterMap f acc s : all a. all b. all acc. (acc -> a -> (acc, Option b)) -> acc -> LStream a -> LStream b
```



<ToggleWrapper text="Code..">
```mc
let lazyStreamStatefulFilterMap : all a. all b. all acc. (acc -> a -> (acc, Option b)) -> acc -> LStream a -> LStream b
  = lam f. lam acc. lam s.
    recursive let step = lam acc : {stream : LStream a, acc : acc}.
      match lazyStreamUncons acc.stream with Some (a, as) then
        switch f acc.acc a
        case (acc, Some b) then
          Some ({acc = acc, stream = as}, b)
        case (acc, None _) then
          step {acc = acc, stream = as}
        end
      else None ()
    in lazyStream step {acc = acc, stream = s}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyStreamStatefulFilter" kind="let">

```mc
let lazyStreamStatefulFilter f acc s : all a. all acc. (acc -> a -> (acc, Bool)) -> acc -> LStream a -> LStream a
```



<ToggleWrapper text="Code..">
```mc
let lazyStreamStatefulFilter : all a. all acc. (acc -> a -> (acc, Bool)) -> acc -> LStream a -> LStream a
  = lam f. lam acc. lam s.
    lazyStreamStatefulFilterMap (lam acc. lam a. match f acc a with (acc, keep) in (acc, if keep then Some a else None ())) acc s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lazyStreamForceAll" kind="let">

```mc
let lazyStreamForceAll s : all a. LStream a -> [a]
```



<ToggleWrapper text="Code..">
```mc
let lazyStreamForceAll : all a. LStream a -> [a]
  = lam s.
    recursive let work = lam acc. lam s.
      match lazyStreamUncons s with Some (x, s)
      then work (snoc acc x) s
      else acc
    in work [] s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iterEmpty" kind="let">

```mc
let iterEmpty _ : all a. Iter a
```



<ToggleWrapper text="Code..">
```mc
let iterEmpty : all a. Iter a = lam. INNil ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iterCons" kind="let">

```mc
let iterCons a it _ : all a. a -> Iter a -> Iter a
```



<ToggleWrapper text="Code..">
```mc
let iterCons : all a. a -> Iter a -> Iter a = lam a. lam it. lam. INCons (a, it)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iterSingle" kind="let">

```mc
let iterSingle a : all a. a -> Iter a
```



<ToggleWrapper text="Code..">
```mc
let iterSingle : all a. a -> Iter a = lam a. iterCons a iterEmpty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iterUncons" kind="let">

```mc
let iterUncons it : all a. Iter a -> Option (a, Iter a)
```



<ToggleWrapper text="Code..">
```mc
let iterUncons : all a. Iter a -> Option (a, Iter a)
  = lam it. switch it ()
    case INNil _ then None ()
    case INCons (x, xs) then Some (x, xs)
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iterConcat" kind="let">

```mc
let iterConcat a b _ : all a. Iter a -> Iter a -> Iter a
```



<ToggleWrapper text="Code..">
```mc
let iterConcat : all a. Iter a -> Iter a -> Iter a
  = lam a. lam b. lam. switch a ()
    case INNil _ then b ()
    case INCons (a, aNext) then INCons (a, iterConcat aNext b)
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iterMin" kind="let">

```mc
let iterMin cmp it : all a. (a -> a -> Int) -> Iter a -> Option a
```



<ToggleWrapper text="Code..">
```mc
let iterMin : all a. (a -> a -> Int) -> Iter a -> Option a
  = lam cmp. lam it.
    recursive let work = lam acc. lam it. switch it ()
      case INNil _ then acc
      case INCons (x, xs) then
        work (if lti (cmp acc x) 0 then acc else x) xs
      end in
    switch it ()
    case INNil _ then None ()
    case INCons (x, xs) then Some (work x xs)
    end
```
</ToggleWrapper>
</DocBlock>

