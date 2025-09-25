import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# async-ext.ext-ocaml.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/ocaml/ast.mc"} style={S.link}>ocaml/ast.mc</a>  
  
## Variables  
  

          <DocBlock title="asyncExtMap" kind="let">

```mc
let asyncExtMap  : Map String [{ty: Ast_Type, expr: String, libraries: [String], cLibraries: [String]}]
```



<ToggleWrapper text="Code..">
```mc
let asyncExtMap =
  use OCamlTypeAst in
  mapFromSeq cmpString
  [
    ("asyncSleepSec", [
      { expr = "Lwt_unix.sleep",
        ty = tyarrows_ [tyfloat_, otyvarext_ "'a Lwt.t" []],
        libraries = ["lwt.unix"],
        cLibraries = []
      }
    ]),
    ("asyncRun", [
      { expr = "Lwt_main.run",
        ty = tyarrows_ [otyvarext_ "'a Lwt.t" [], otyvarext_ "'a" []],
        libraries = ["lwt.unix"],
        cLibraries = []
      }
    ]),
    ("asyncBind", [
      { expr = "Lwt.bind",
        ty = tyarrows_ [otyvarext_ "'a Lwt.t" [],
                (tyarrows_ [otyvarext_ "'a" [], otyvarext_ "'b Lwt.t" []]), otyvarext_ "'b Lwt.t" []],
        libraries = ["lwt.unix"],
        cLibraries = []
      }
    ]),
    ("asyncPrint", [
      { expr = "Lwt_io.print",
        ty = tyarrows_ [otystring_ , otyvarext_ "unit Lwt.t" []],
        libraries = ["lwt.unix"],
        cLibraries = []
      }
    ]),
    ("asyncReturn", [
      { expr = "Lwt.return",
        ty = tyarrows_ [otyvarext_ "'a" [], otyvarext_ "'a Lwt.t" []],
        libraries = ["lwt.unix"],
        cLibraries = []
      }
    ])
  ]
```
</ToggleWrapper>
</DocBlock>

