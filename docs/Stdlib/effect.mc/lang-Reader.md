import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Reader  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Ctx" kind="syn">

```mc
syn Ctx
```



<ToggleWrapper text="Code..">
```mc
syn Ctx =
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
  | ReaderAskQ ()
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
  | ReaderAskR Ctx
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="ask" kind="sem">

```mc
sem ask : all a. (Reader_Ctx -> a) -> Effect_Eff a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ask =
  | proj -> perform (ReaderAskQ ()) (lam x. match x with ReaderAskR c in proj c)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="local" kind="sem">

```mc
sem local : all a. (Reader_Ctx -> Reader_Ctx) -> Effect_Eff a -> Effect_Eff a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem local update =
  | Pure x -> Pure x
  | Impure (q, k1) ->
    let k2 = lam r. local update (k1 r) in
    match q with ReaderAskQ _ then
      Impure (q, lam r. match r with ReaderAskR c in k2 (ReaderAskR (update c)))
    else Impure (q, k2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="handleReader" kind="sem">

```mc
sem handleReader : all a. Reader_Ctx -> Effect_Eff a -> Effect_Eff a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem handleReader ctx =
  | e ->
    let handler = lam continue. lam q.
      match q with ReaderAskQ () then
        Some (continue (ReaderAskR ctx))
      else None ()
    in
    handleEff return handler e
```
</ToggleWrapper>
</DocBlock>

