import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# State  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="State" kind="syn">

```mc
syn State
```



<ToggleWrapper text="Code..">
```mc
syn State =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Query" kind="syn">

```mc
syn Query
```



<ToggleWrapper text="Code..">
```mc
syn Query =
  | StateGetQ ()
  | StatePutQ (State -> State)
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
  | StateGetR State
  | StatePutR ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="get" kind="sem">

```mc
sem get : all a. (State_State -> a) -> Effect_Eff a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem get =
  | proj -> perform (StateGetQ ()) (lam x. match x with StateGetR s in proj s)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="modify" kind="sem">

```mc
sem modify : (State_State -> State_State) -> Effect_Eff ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem modify =
  | update -> perform (StatePutQ update) (lam. ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="handleState" kind="sem">

```mc
sem handleState : all a. all b. (State_State -> b) -> State_State -> Effect_Eff a -> Effect_Eff (a, b)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem handleState proj s =
  | Pure x -> return (x, proj s)
  | Impure (q, k) ->
    let continue = lam s. lam r. handleState proj s (k r) in
    switch q
    case StateGetQ () then
      continue s (StateGetR s)
    case StatePutQ f then
      continue (f s) (StatePutR ())
    case _ then
      Impure (q, continue s)
    end
```
</ToggleWrapper>
</DocBlock>

