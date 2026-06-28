import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# common.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>  
  
## Variables  
  

          <DocBlock title="identity" kind="let">

```mc
let identity x : all a. a -> a
```

<Description>{`Function stuff`}</Description>


<ToggleWrapper text="Code..">
```mc
let identity = lam x. x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="const" kind="let">

```mc
let const x _ : all a. all a1. a -> a1 -> a
```



<ToggleWrapper text="Code..">
```mc
let const = lam x. lam. x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="apply" kind="let">

```mc
let apply f x : all a. all a1. (a -> a1) -> a -> a1
```



<ToggleWrapper text="Code..">
```mc
let apply = lam f. lam x. f x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compose" kind="let">

```mc
let compose f g x : all a. all a1. all a2. (a -> a1) -> (a2 -> a) -> a2 -> a1
```



<ToggleWrapper text="Code..">
```mc
let compose = lam f. lam g. lam x. f (g x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="curry" kind="let">

```mc
let curry f x y : all a. all a1. all a2. ((a, a1) -> a2) -> a -> a1 -> a2
```



<ToggleWrapper text="Code..">
```mc
let curry = lam f. lam x. lam y. f(x, y)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="uncurry" kind="let">

```mc
let uncurry f t : all a. all b. all c. (a -> b -> c) -> (a, b) -> c
```



<ToggleWrapper text="Code..">
```mc
let uncurry : all a. all b. all c. (a -> b -> c) -> (a, b) -> c =
  lam f. lam t : (a, b). f t.0 t.1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="flip" kind="let">

```mc
let flip f x y : all a. all a1. all a2. (a -> a1 -> a2) -> a1 -> a -> a2
```



<ToggleWrapper text="Code..">
```mc
let flip = lam f. lam x. lam y. f y x
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printLn" kind="let">

```mc
let printLn s : String -> ()
```

<Description>{`Printing stuff`}</Description>


<ToggleWrapper text="Code..">
```mc
let printLn = lam s. print (concat s "\n"); flushStdout ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printErrorLn" kind="let">

```mc
let printErrorLn s : String -> ()
```



<ToggleWrapper text="Code..">
```mc
let printErrorLn = lam s. printError (concat s "\n"); flushStderr ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printSeq" kind="let">

```mc
let printSeq s : [String] -> ()
```



<ToggleWrapper text="Code..">
```mc
let printSeq = lam s. print (join s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printSeqLn" kind="let">

```mc
let printSeqLn s : [String] -> ()
```



<ToggleWrapper text="Code..">
```mc
let printSeqLn = lam s. printSeq s; print "\n"; flushStdout ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dprintLn" kind="let">

```mc
let dprintLn x : all a. a -> ()
```



<ToggleWrapper text="Code..">
```mc
let dprintLn = lam x. dprint x; printLn ""
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fix" kind="let">

```mc
let fix f e : all a. all b. ((a -> b) -> a -> b) -> a -> b
```



<ToggleWrapper text="Code..">
```mc
let fix : all a. all b. ((a -> b) -> a -> b) -> a -> b =
    lam f. lam e. f (fix f) e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="repeat" kind="let">

```mc
let repeat f n : (() -> ()) -> Int -> ()
```

<Description>{`Function repetition \(for side\-effects\)`}</Description>


<ToggleWrapper text="Code..">
```mc
let repeat : (() -> ()) -> Int -> () = lam f. lam n.
  recursive let rec = lam n.
    if leqi n 0 then () else (f (); rec (subi n 1))
  in rec n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="repeati" kind="let">

```mc
let repeati f n : (Int -> ()) -> Int -> ()
```

<Description>{`Function repetition \(for side\-effects\)`}</Description>


<ToggleWrapper text="Code..">
```mc
let repeati : (Int -> ()) -> Int -> () = lam f. lam n.
  recursive let rec = lam i.
    if geqi i n then () else (f i; rec (addi i 1))
  in rec 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fixMutual" kind="let">

```mc
let fixMutual l : all a. all b. [[a -> b] -> a -> b] -> [a -> b]
```

<Description>{`Fixpoint computation for mutual recursion. Thanks Oleg Kiselyov\!  
\(http://okmij.org/ftp/Computation/fixed\-point\-combinators.html\)`}</Description>


<ToggleWrapper text="Code..">
```mc
let fixMutual : all a. all b. [[a -> b] -> a -> b] -> [a -> b] =
  lam l.
    let l = map (lam li. (li,)) l in
    fix (lam self. lam l.
      map (lam li : {#label"0" : [a -> b] -> a -> b}. lam x. li.0 (self l) x) l) l
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

utest apply identity 42 with identity 42 using eqi in
utest apply (compose identity (apply identity)) 42 with 42 in

let sum_tuple = lam t : (Int, Int). addi t.0 t.1 in

utest (curry sum_tuple) 3 2 with 5 in
utest (uncurry addi) (3,2) with 5 in
utest curry (uncurry addi) 3 2 with (uncurry (curry sum_tuple)) (3,2) using eqi in

let r = ref 0 in
let f = lam. modref r (addi (deref r) 1) in
utest modref r 0; repeat f 4; deref r with 4 in
utest modref r 0; repeat f 0; deref r with 0 in
utest modref r 0; repeat f (negi 5); deref r with 0 in

()
```
</ToggleWrapper>
</DocBlock>

