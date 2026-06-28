import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# inline-literals.mc  
  

Performs inlining of literal values bound in let\-expressions. This is needed  
to prevent an error when the accumulated value of a loop is a record  
containing arrays on which we perform in\-place updates.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>, <a href={"/docs/Stdlib/utest.mc"} style={S.link}>utest.mc</a>, <a href={"/docs/Stdlib/futhark/ast.mc"} style={S.link}>futhark/ast.mc</a>, <a href={"/docs/Stdlib/futhark/ast-builder.mc"} style={S.link}>futhark/ast-builder.mc</a>, <a href={"/docs/Stdlib/futhark/pprint.mc"} style={S.link}>futhark/pprint.mc</a>  
  
## Languages  
  

          <DocBlock title="FutharkInlineLiterals" kind="lang" link="/docs/Stdlib/futhark/inline-literals.mc/lang-FutharkInlineLiterals">

```mc
lang FutharkInlineLiterals
```



<ToggleWrapper text="Code..">
```mc
lang FutharkInlineLiterals = FutharkAst
  type InlineEnv = Map Name FutExpr

  sem inlineLiterals : FutProg -> FutProg
  sem inlineLiterals =
  | FProg t ->
    let inlineEnv = mapEmpty nameCmp in
    match mapAccumL inlineLiteralsDecl inlineEnv t.decls with (_, decls) in
    FProg {t with decls = decls}

  sem inlineLiteralsDecl : InlineEnv -> FutDecl -> (InlineEnv, FutDecl)
  sem inlineLiteralsDecl env =
  | FDeclConst t -> (mapInsert t.ident t.val env, FDeclConst t)
  | FDeclFun t -> (env, FDeclFun {t with body = inlineLiteralsExpr env t.body})
  | d -> (env, d)

  sem inlineLiteralsExpr : InlineEnv -> FutExpr -> FutExpr
  sem inlineLiteralsExpr env =
  | FEVar t ->
    match mapLookup t.ident env with Some expr then expr
    else FEVar t
  | FELet t ->
    let body = inlineLiteralsExpr env t.body in
    match body with FERecord _ | FEConst _ then
      let env = mapInsert t.ident body env in inlineLiteralsExpr env t.inexpr
    else FELet {t with body = body, inexpr = inlineLiteralsExpr env t.inexpr}
  | e -> smap_FExpr_FExpr (inlineLiteralsExpr env) e
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TestLang" kind="lang" link="/docs/Stdlib/futhark/inline-literals.mc/lang-TestLang">

```mc
lang TestLang
```



<ToggleWrapper text="Code..">
```mc
lang TestLang = FutharkInlineLiterals + FutharkPrettyPrint
end
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

let s = nameSym "s" in
let i = nameSym "i" in
let x = nameSym "x" in
let y = nameSym "y" in
let z = nameSym "z" in
let fun = lam body. FDeclFun {
  ident = nameNoSym "f", entry = false, typeParams = [],
  params = [(s, futUnsizedArrayTy_ futIntTy_)],
  ret = futRecordTy_ [("x", futIntTy_), ("y", futIntTy_)],
  body = body, info = NoInfo ()
} in
let pat = futPrecord_ [("x", nFutPvar_ x), ("y", nFutPvar_ y)] in
let loopExpr =
  futForEach_
    (pat, nFutVar_ z) i (nFutVar_ s)
    (futRecord_ [
      ("x", futAdd_ (nFutVar_ x) (nFutVar_ i)),
      ("y", futAdd_ (nFutVar_ y) (nFutVar_ i))])
in
let zRec = futRecord_ [("x", futInt_ 0), ("y", futInt_ 0)] in
let body = futBindall_ [ nuFutLet_ z zRec, loopExpr ] in
let inlinedBody =
  futForEach_ (pat, zRec) i (nFutVar_ s)
    (futRecord_ [
      ("x", futAdd_ (nFutVar_ x) (nFutVar_ i)),
      ("y", futAdd_ (nFutVar_ y) (nFutVar_ i))])
in
match inlineLiteralsDecl (mapEmpty nameCmp) (fun body) with (_, inlined) in
utest printFutProg (FProg {decls = [inlined]})
with printFutProg (FProg {decls = [fun inlinedBody]})
using eqString else utestDefaultToString identity identity in

()
```
</ToggleWrapper>
</DocBlock>

