import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# generate-env.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/stringid.mc"} style={S.link}>stringid.mc</a>, <a href={"/docs/Stdlib/ocaml/external-includes.mc"} style={S.link}>ocaml/external-includes.mc</a>, <a href={"/docs/Stdlib/mexpr/cmp.mc"} style={S.link}>mexpr/cmp.mc</a>  
  
## Types  
  

          <DocBlock title="GenerateEnv" kind="type">

```mc
type GenerateEnv : { constrs: Map Name (Type), records: Map (Map SID (Type)) Name, exts: Map Name [ExternalImpl] }
```



<ToggleWrapper text="Code..">
```mc
type GenerateEnv = {
  constrs : Map Name (use Ast in Type),
  records : Map (Map SID (use Ast in Type)) Name,
  exts : Map Name [ExternalImpl]
}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="emptyGenerateEnv" kind="let">

```mc
let emptyGenerateEnv  : {exts: Map Name [ExternalImpl], constrs: Map Name Ast_Type, records: Map (Map SID Ast_Type) Name}
```



<ToggleWrapper text="Code..">
```mc
let emptyGenerateEnv = use MExprCmp in {
  constrs = mapEmpty nameCmp,
  records = mapEmpty (mapCmp cmpType),
  exts = mapEmpty nameCmp
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objRepr" kind="let">

```mc
let objRepr t : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let objRepr = use OCamlAst in
  lam t. app_ (OTmVarExt {ident = "Obj.repr"}) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="objMagic" kind="let">

```mc
let objMagic t : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
let objMagic = use OCamlAst in
  lam t. app_ (OTmVarExt {ident = "Obj.magic"}) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ocamlTypedFields" kind="let">

```mc
let ocamlTypedFields fields : Map SID Ast_Type -> Map SID Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let ocamlTypedFields = lam fields : Map SID (use Ast in Type).
  mapMap (lam. tyunknown_) fields
```
</ToggleWrapper>
</DocBlock>

