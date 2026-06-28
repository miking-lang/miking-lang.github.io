import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TestLangImpl  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Failure" kind="syn">

```mc
syn Failure
```



<ToggleWrapper text="Code..">
```mc
syn Failure = | IFail Int
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Log" kind="syn">

```mc
syn Log
```



<ToggleWrapper text="Code..">
```mc
syn Log = | CLog Char
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="iFail" kind="sem">

```mc
sem iFail : Int -> Failure_Failure
```



<ToggleWrapper text="Code..">
```mc
sem iFail = | i -> IFail i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cLog" kind="sem">

```mc
sem cLog : Char -> Writer_Log
```



<ToggleWrapper text="Code..">
```mc
sem cLog = | c -> CLog c
```
</ToggleWrapper>
</DocBlock>

