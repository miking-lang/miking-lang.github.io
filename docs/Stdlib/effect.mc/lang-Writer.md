import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Writer  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Log" kind="syn">

```mc
syn Log
```



<ToggleWrapper text="Code..">
```mc
syn Log =
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
  | WriterTellQ Log
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
  | WriterTellR ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="tell" kind="sem">

```mc
sem tell : Writer_Log -> Effect_Eff ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tell =
  | l -> perform (WriterTellQ l) (lam. ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="handleWriter" kind="sem">

```mc
sem handleWriter : all a. all b. (Writer_Log -> b) -> Effect_Eff a -> Effect_Eff (a, [b])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem handleWriter proj =
  | e ->
    let handler = lam continue. lam q.
      match q with WriterTellQ l then
        Some (effMap (lam al. (al.0, cons (proj l) al.1)) (continue (WriterTellR ())))
      else None ()
    in
    handleEff (lam x. return (x, [])) handler e
```
</ToggleWrapper>
</DocBlock>

