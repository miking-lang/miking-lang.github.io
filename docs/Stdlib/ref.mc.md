import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ref.mc  
  

Construct a reference

  
  
  
## Variables  
  

          <DocBlock title="ref" kind="let">

```mc
let ref x : all a. a -> Tensor[a]
```

<Description>{`Construct a reference`}</Description>


<ToggleWrapper text="Code..">
```mc
let ref = lam x. tensorCreateDense [] (lam. x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="deref" kind="let">

```mc
let deref t : all a. Tensor[a] -> a
```

<Description>{`De\-reference`}</Description>


<ToggleWrapper text="Code..">
```mc
let deref = lam t. tensorGetExn t []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="modref" kind="let">

```mc
let modref t v : all a. Tensor[a] -> a -> ()
```

<Description>{`Mutate reference`}</Description>


<ToggleWrapper text="Code..">
```mc
let modref = lam t. lam v. tensorSetExn t [] v
```
</ToggleWrapper>
</DocBlock>

