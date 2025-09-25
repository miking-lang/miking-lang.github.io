import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# deadcode.mc  
  

Performs deadcode elimination within top\-level Futhark functions.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/set.mc"} style={S.link}>set.mc</a>, <a href={"/docs/Stdlib/futhark/ast.mc"} style={S.link}>futhark/ast.mc</a>, <a href={"/docs/Stdlib/futhark/ast-builder.mc"} style={S.link}>futhark/ast-builder.mc</a>, <a href={"/docs/Stdlib/futhark/pprint.mc"} style={S.link}>futhark/pprint.mc</a>  
  
## Languages  
  

          <DocBlock title="FutharkDeadcodeElimination" kind="lang" link="/docs/Stdlib/futhark/deadcode.mc/lang-FutharkDeadcodeElimination">

```mc
lang FutharkDeadcodeElimination
```



<ToggleWrapper text="Code..">
```mc
lang FutharkDeadcodeElimination = FutharkAst
  sem deadcodeEliminationType (used : Set Name) =
  | FTyArray {dim = Some (NamedDim id)} -> setInsert id used
  | t -> sfold_FType_FType deadcodeEliminationType used t

  sem deadcodeEliminationExpr (used : Set Name) =
  | FEVar t -> (setInsert t.ident used, FEVar t)
  | FELet (t & {body = FESizeEquality _}) ->
    match deadcodeEliminationExpr used t.inexpr with (used, inexpr) in
    (used, FELet {t with inexpr = inexpr})
  | FELet t ->
    match deadcodeEliminationExpr used t.inexpr with (used, inexpr) in
    if setMem t.ident used then
      match deadcodeEliminationExpr used t.body with (used, body) in
      let body =
        let default = lam. FELet {{t with body = body} with inexpr = inexpr} in
        match inexpr with FEVar {ident = id} then
          if nameEq t.ident id then
            match t.tyBody with FTyRecord _ then body
            else default ()
          else default ()
        else default () in
      (used, body)
    else (used, inexpr)
  | t ->
    let used = deadcodeEliminationType used (tyFutTm t) in
    smapAccumL_FExpr_FExpr deadcodeEliminationExpr used t

  sem deadcodeEliminationDecl =
  | FDeclFun t ->
    match deadcodeEliminationExpr (setEmpty nameCmp) t.body with (_, body) in
    FDeclFun {t with body = body}
  | t -> t

  sem deadcodeElimination =
  | FProg t -> FProg {t with decls = map deadcodeEliminationDecl t.decls}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TestLang" kind="lang" link="/docs/Stdlib/futhark/deadcode.mc/lang-TestLang">

```mc
lang TestLang
```



<ToggleWrapper text="Code..">
```mc
lang TestLang = FutharkDeadcodeElimination + FutharkPrettyPrint end
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

use TestLang in

let futFunction = lam body.
  let fun = FDeclFun {
    ident = nameSym "x", entry = true, typeParams = [], params = [],
    ret = futUnknownTy_, body = body, info = NoInfo ()} in
  FProg {decls = [fun]}
in

let x = nameSym "x" in
let y = nameSym "y" in
let z = nameSym "z" in
let w = nameSym "w" in
let t = futFunction (futBindall_ [
  nuFutLet_ x (futInt_ 2),
  nuFutLet_ y (futInt_ 3),
  nuFutLet_ z (futAppSeq_ (futConst_ (FCAdd ())) [nFutVar_ x, futInt_ 4]),
  nuFutLet_ w (futAppSeq_ (futConst_ (FCMul ())) [futInt_ 7, nFutVar_ y]),
  nFutVar_ z]) in
let expected = futFunction (futBindall_ [
  nuFutLet_ x (futInt_ 2),
  nuFutLet_ z (futAppSeq_ (futConst_ (FCAdd ())) [nFutVar_ x, futInt_ 4]),
  nFutVar_ z]) in
utest printFutProg (deadcodeElimination t) with printFutProg expected using eqString in

let f = nameSym "f" in
let t = futFunction (futBindall_ [
  nuFutLet_ f (nFutLam_ x (nFutLam_ y (futBindall_ [
    nuFutLet_ z (futAppSeq_ (futConst_ (FCAdd ())) [nFutVar_ x, nFutVar_ y]),
    nFutVar_ z
  ]))),
  futUnit_ ()]) in
let expected = futFunction (futUnit_ ()) in
utest printFutProg (deadcodeElimination t) with printFutProg expected using eqString in

let t = futFunction (futBindall_ [
  nFutLet_ x (futRecordTy_ [("a", futIntTy_)]) (futRecord_ [("a", futInt_ 0)]),
  nFutVar_ x]) in
let expected = futFunction (futRecord_ [("a", futInt_ 0)]) in
utest printFutProg (deadcodeElimination t) with printFutProg expected using eqString in

let i = nameSym "i" in
let t = futFunction (futBindall_ [
  nuFutLet_ x (futInt_ 0),
  nuFutLet_ y (futArray_ [futInt_ 2, futInt_ 7]),
  futForEach_
    (nFutPvar_ x, nFutVar_ x)
    i
    (nFutVar_ y)
    (futBindall_ [
      nuFutLet_ z (futAppSeq_ (futConst_ (FCAdd ())) [nFutVar_ x, nFutVar_ i]),
      nuFutLet_ w (nFutVar_ z),
      nFutVar_ w])]) in
utest printFutProg (deadcodeElimination t) with printFutProg t using eqString in

()
```
</ToggleWrapper>
</DocBlock>

