import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# async-ext.mc  
  

  
  
  
## Types  
  

          <DocBlock title="Promise" kind="type">

```mc
type Promise
```



<ToggleWrapper text="Code..">
```mc
type Promise a

external asyncSleepSec ! : Float -> Promise ()
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="asyncSleepSec" kind="let">

```mc
let asyncSleepSec t : Float -> Promise ()
```



<ToggleWrapper text="Code..">
```mc
let asyncSleepSec = lam t. asyncSleepSec t

external asyncRun ! : all a. Promise a -> a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="asyncRun" kind="let">

```mc
let asyncRun p : all a. Promise a -> a
```



<ToggleWrapper text="Code..">
```mc
let asyncRun = lam p. asyncRun p

external asyncBind ! : all a. all b. Promise a -> (a -> Promise b) -> Promise b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="asyncBind" kind="let">

```mc
let asyncBind p f : all a. all b. Promise a -> (a -> Promise b) -> Promise b
```



<ToggleWrapper text="Code..">
```mc
let asyncBind = lam p. lam f. asyncBind p f

external asyncPrint ! : String -> Promise ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="asyncPrint" kind="let">

```mc
let asyncPrint x : String -> Promise ()
```



<ToggleWrapper text="Code..">
```mc
let asyncPrint = lam x. asyncPrint x

external asyncReturn ! : all a. a -> Promise a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="asyncReturn" kind="let">

```mc
let asyncReturn x : all a. a -> Promise a
```



<ToggleWrapper text="Code..">
```mc
let asyncReturn = lam x. asyncReturn x
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

utest asyncRun (asyncBind (asyncSleepSec 0.1) asyncReturn); () with () in
utest asyncRun (asyncPrint ""); () with () in
()
```
</ToggleWrapper>
</DocBlock>

