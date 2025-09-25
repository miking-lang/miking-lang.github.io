import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Effect  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Query" kind="syn">

```mc
syn Query
```

<Description>{`NOTE\(aathn, 2024\-02\-06\): If we had GADTs, we could remove the  
Response type in favor of having a parameterized Query type where  
the parameter indicates the return type.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn Query =
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Eff" kind="syn">

```mc
syn Eff
```



<ToggleWrapper text="Code..">
```mc
syn Eff a =
  | Pure a
  | Impure (Query, Response -> Eff a)
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="return" kind="sem">

```mc
sem return : all a. a -> Effect_Eff a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem return =
  | a -> Pure a
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bind" kind="sem">

```mc
sem bind : all a. all b. Effect_Eff a -> (a -> Effect_Eff b) -> Effect_Eff b
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem bind e = | f -> effJoinMap f e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="effJoinMap" kind="sem">

```mc
sem effJoinMap : all a. all b. (a -> Effect_Eff b) -> Effect_Eff a -> Effect_Eff b
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem effJoinMap f =
  | Pure x -> f x
  | Impure (q, k) ->
    Impure (q, lam x. effJoinMap f (k x))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="effMap" kind="sem">

```mc
sem effMap : all a. all b. (a -> b) -> Effect_Eff a -> Effect_Eff b
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem effMap f = | e -> effJoinMap (lam x. return (f x)) e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="effMap2" kind="sem">

```mc
sem effMap2 : all a. all b. all c. (a -> b -> c) -> Effect_Eff a -> Effect_Eff b -> Effect_Eff c
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem effMap2 f e1 = | e2 ->
    effJoinMap (lam g. effMap g e2) (effMap f e1)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="effMapM" kind="sem">

```mc
sem effMapM : all a. all b. (a -> Effect_Eff b) -> [a] -> Effect_Eff [b]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem effMapM f = | l ->
    foldl (lam acc. lam x. effMap2 snoc acc (f x)) (return []) l
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="perform" kind="sem">

```mc
sem perform : all a. Effect_Query -> (Effect_Response -> a) -> Effect_Eff a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem perform q =
  | k ->
    Impure (q, lam r. return (k r))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="handleEff" kind="sem">

```mc
sem handleEff : all a. all b. (a -> Effect_Eff b) -> ((Effect_Response -> Effect_Eff b) -> Effect_Query -> Option (Effect_Eff b)) -> Effect_Eff a -> Effect_Eff b
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem handleEff ret h =
  | Pure x -> ret x
  | Impure (q, k) ->
    let continue = lam r. handleEff ret h (k r) in
    optionGetOr (Impure (q, continue)) (h continue q)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="runEff" kind="sem">

```mc
sem runEff : all a. Effect_Eff a -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem runEff =
  | Pure x -> x
```
</ToggleWrapper>
</DocBlock>

