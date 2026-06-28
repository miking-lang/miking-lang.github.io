import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# multicore.mc  
  

A collection of useful functions for multicore programming.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/sys.mc"} style={S.link}>sys.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Variables  
  

          <DocBlock title="multicoreNbrOfCores" kind="let">

```mc
let multicoreNbrOfCores _ : () -> Int
```

<Description>{`Get the available number of processing units, as reported by the command  
'nproc'.`}</Description>


<ToggleWrapper text="Code..">
```mc
let multicoreNbrOfCores : () -> Int = lam.
    let res = sysRunCommand ["nproc"] "" "." in
    if eqi res.returncode 0 then
      let nprocStr = strTrim res.stdout in
      string2int nprocStr
    else error "Command 'nproc' exited with failure, is it installed?"
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

let debug = false in

utest
  if debug then
    print (int2string (multicoreNbrOfCores ())); print "\n"
  else ()
with () in

()
```
</ToggleWrapper>
</DocBlock>

