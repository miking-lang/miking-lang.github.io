import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Failure  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Failure" kind="syn">

```mc
syn Failure
```



<ToggleWrapper text="Code..">
```mc
syn Failure =
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
  | FailQ Failure
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

## Semantics  
  

          <DocBlock title="fail" kind="sem">

```mc
sem fail : all a. Failure_Failure -> Effect_Eff a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem fail =
  | a ->
    perform (FailQ a) (lam. error "failed branch was executed!")
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="handleFail" kind="sem">

```mc
sem handleFail : all a. all b. (Failure_Failure -> b) -> Effect_Eff a -> Effect_Eff (Either b a)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem handleFail proj =
  | e ->
    let handler = lam. lam q.
      match q with FailQ f then
        Some (return (Left (proj f)))
      else None ()
    in
    handleEff (lam x. return (Right x)) handler e
```
</ToggleWrapper>
</DocBlock>

