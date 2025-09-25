import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# math-ext.ext-c.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/c/externals.mc"} style={S.link}>c/externals.mc</a>  
  
## Variables  
  

          <DocBlock title="mathExtMap" kind="let">

```mc
let mathExtMap  : ExtMap
```



<ToggleWrapper text="Code..">
```mc
let mathExtMap: ExtMap =
  mapFromSeq cmpString [

    ( "externalExp"
    , { ident = "exp", header = "<math.h>" }
    ),

    ( "externalLog"
    , { ident = "log", header = "<math.h>" }
    ),

    ( "externalPow"
    , { ident = "pow", header = "<math.h>" }
    ),

    ( "externalSqrt"
    , { ident = "sqrt", header = "<math.h>" }
    ),

    ( "externalSin"
    , { ident = "sin", header = "<math.h>" }
    ),

    ( "externalCos"
    , { ident = "cos", header = "<math.h>" }
    )

  ]
```
</ToggleWrapper>
</DocBlock>

