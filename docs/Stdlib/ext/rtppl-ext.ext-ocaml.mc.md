import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# rtppl-ext.ext-ocaml.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/ocaml/ast.mc"} style={S.link}>ocaml/ast.mc</a>  
  
## Variables  
  

          <DocBlock title="tyts_" kind="let">

```mc
let tyts_  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyts_ = tytuple_ [tyint_, tyunknown_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="impl" kind="let">

```mc
let impl arg : {ty: Ast_Type, expr: String} -> [{ty: Ast_Type, expr: String, libraries: [String], cLibraries: [String]}]
```



<ToggleWrapper text="Code..">
```mc
let impl = lam arg : {expr : String, ty : use Ast in Type }.
  [ { expr = arg.expr, ty = arg.ty, libraries = ["rtppl-support"], cLibraries = ["rt"] } ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="timespec" kind="let">

```mc
let timespec  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let timespec = otytuple_ [tyint_, tyint_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="readDistTy" kind="let">

```mc
let readDistTy ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let readDistTy = lam ty. otyarray_ (otytuple_ [tyfloat_, ty])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="writeDistTy" kind="let">

```mc
let writeDistTy ty : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let writeDistTy = lam ty. otytuple_ [otyarray_ ty, otyarray_ tyfloat_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="rtpplExtMap" kind="let">

```mc
let rtpplExtMap  : Map String [{ty: Ast_Type, expr: String, libraries: [String], cLibraries: [String]}]
```



<ToggleWrapper text="Code..">
```mc
let rtpplExtMap =
  use OCamlTypeAst in
  mapFromSeq cmpString [
    ( "setSigintHandler"
    , impl { expr = "Rtppl.set_signal_handler Sys.sigint"
           , ty = tyarrow_ (tyarrow_ tyint_ otyunit_) otyunit_ } ),
    ( "getMonotonicTime"
    , impl { expr = "Rtppl.get_monotonic_time"
           , ty = tyarrow_ otyunit_ timespec} ),
    ( "getWallClockTime"
    , impl { expr = "Rtppl.get_wall_clock_time"
           , ty = tyarrow_ otyunit_ timespec} ),
    ( "getProcessCpuTime"
    , impl { expr = "Rtppl.get_process_cpu_time"
           , ty = tyarrow_ otyunit_ timespec} ),
    ( "clockNanosleep"
    , impl { expr = "Rtppl.clock_nanosleep"
           , ty = tyarrow_ timespec otyunit_ } ),
    ( "rtpplSetMaxPriority"
    , impl { expr = "Rtppl.set_max_priority"
           , ty = tyarrow_ otyunit_ tyint_ } ),
    ( "rtpplSetPriority"
    , impl { expr = "Rtppl.set_priority"
           , ty = tyarrow_ tyint_ tyint_ } ),
    ( "rtpplOpenFileDescriptor"
    , impl { expr = "Rtppl.open_file_descriptor"
           , ty = tyarrows_ [otystring_, tyint_, tyint_] } ),
    ( "rtpplCloseFileDescriptor"
    , impl { expr = "Rtppl.close_file_descriptor"
           , ty = tyarrow_ tyint_ otyunit_ } ),
    ( "rtpplReadInt"
    , impl { expr = "Rtppl.read_int"
           , ty = tyarrow_ tyint_ (otyarray_ (otytuple_ [timespec, tyint_])) } ),
    ( "rtpplWriteInt"
    , impl { expr = "Rtppl.write_int"
           , ty = tyarrows_ [tyint_, otytuple_ [timespec, tyint_], otyunit_] } ),
    ( "rtpplReadFloat"
    , impl { expr = "Rtppl.read_float"
           , ty = tyarrow_ tyint_ (otyarray_ (otytuple_ [timespec, tyfloat_])) } ),
    ( "rtpplWriteFloat"
    , impl { expr = "Rtppl.write_float"
           , ty = tyarrows_ [tyint_, otytuple_ [timespec, tyfloat_], otyunit_] } ),
    ( "rtpplReadIntRecord"
    , impl { expr = "Rtppl.read_int_record"
           , ty = tyarrows_ [tyint_, tyint_, otyarray_ (otytuple_ [timespec, tyunknown_])] } ),
    ( "rtpplWriteIntRecord"
    , impl { expr = "Rtppl.write_int_record"
           , ty = tyarrows_ [tyint_, tyint_, otytuple_ [timespec, tyunknown_], otyunit_] } ),
    ( "rtpplReadFloatRecord"
    , impl { expr = "Rtppl.read_float_record"
           , ty = tyarrows_ [tyint_ ,tyint_, otyarray_ (otytuple_ [timespec, tyunknown_])] } ),
    ( "rtpplWriteFloatRecord"
    , impl { expr = "Rtppl.write_float_record"
           , ty = tyarrows_ [tyint_, tyint_, otytuple_ [timespec, tyunknown_], otyunit_] } ),
    ( "rtpplReadDistFloat"
    , impl { expr = "Rtppl.read_dist_float"
           , ty = tyarrow_ tyint_ (otyarray_ (otytuple_ [timespec, readDistTy tyfloat_])) } ),
    ( "rtpplWriteDistFloat"
    , impl { expr = "Rtppl.write_dist_float"
           , ty = tyarrows_ [tyint_, otytuple_ [timespec, writeDistTy tyfloat_], otyunit_] } ),
    ( "rtpplReadDistFloatRecord"
    , impl { expr = "Rtppl.read_dist_float_record"
           , ty = tyarrows_ [tyint_, tyint_, otyarray_ (otytuple_ [timespec, readDistTy tyunknown_])] } ),
    ( "rtpplWriteDistFloatRecord"
    , impl { expr = "Rtppl.write_dist_float_record"
           , ty = tyarrows_ [tyint_, tyint_, otytuple_ [timespec, writeDistTy tyunknown_], otyunit_] } )
  ]
```
</ToggleWrapper>
</DocBlock>

