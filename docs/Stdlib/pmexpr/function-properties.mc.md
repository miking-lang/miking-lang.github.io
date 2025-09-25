import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# function-properties.mc  
  

Provides an extensible way to define functions as associative, as  
commutative, and define what their neutral element is.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>, <a href={"/docs/Stdlib/set.mc"} style={S.link}>set.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/cmp.mc"} style={S.link}>mexpr/cmp.mc</a>, <a href={"/docs/Stdlib/mexpr/eq.mc"} style={S.link}>mexpr/eq.mc</a>, <a href={"/docs/Stdlib/mexpr/symbolize.mc"} style={S.link}>mexpr/symbolize.mc</a>, <a href={"/docs/Stdlib/pmexpr/ast.mc"} style={S.link}>pmexpr/ast.mc</a>  
  
## Languages  
  

          <DocBlock title="PMExprFunctionProperties" kind="lang" link="/docs/Stdlib/pmexpr/function-properties.mc/lang-PMExprFunctionProperties">

```mc
lang PMExprFunctionProperties
```



<ToggleWrapper text="Code..">
```mc
lang PMExprFunctionProperties = PMExprAst + MExprCmp
  sem isAssociative =
  | t -> isAssociativeH (setEmpty cmpExpr) t

  sem isAssociativeH (assocFunctions : Set Expr) =
  | TmConst {val = CAddi _} -> true
  | TmConst {val = CMuli _} -> true
  | TmConst {val = CConcat _} -> true
  | t -> setMem t assocFunctions

  sem isCommutative =
  | t -> isCommutativeH (setEmpty cmpExpr) t

  sem isCommutativeH (commFunctions : Set Expr) =
  | TmConst {val = CAddi _} -> true
  | TmConst {val = CMuli _} -> true
  | t -> setMem t commFunctions

  sem getNeutralElement =
  | t -> getNeutralElementH (mapEmpty cmpExpr) t

  sem getNeutralElementH (neutralElementMap : Map Expr Expr) =
  | TmConst {val = CAddi _} ->
    Some (TmConst {val = CInt {val = 0}, ty = TyInt {info = NoInfo ()},
                   info = NoInfo ()})
  | TmConst {val = CMuli _} ->
    Some (TmConst {val = CInt {val = 1}, ty = TyInt {info = NoInfo ()},
                   info = NoInfo ()})
  | TmConst {val = CConcat _} ->
    Some (TmSeq {tms = [], ty = TySeq {ty = TyUnknown {info = NoInfo ()},
                                       info = NoInfo ()},
                 info = NoInfo ()})
  | t -> mapLookup t neutralElementMap
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TestLang" kind="lang" link="/docs/Stdlib/pmexpr/function-properties.mc/lang-TestLang">

```mc
lang TestLang
```



<ToggleWrapper text="Code..">
```mc
lang TestLang = PMExprFunctionProperties + MExprCmp + MExprEq + MExprSym end
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

let addi = uconst_ (CAddi ()) in
let subi = uconst_ (CSubi ()) in
let muli = uconst_ (CMuli ()) in
let concat = uconst_ (CConcat ()) in

utest isAssociative addi with true in
utest isAssociative subi with false in
utest isAssociative muli with true in
utest isAssociative concat with true in

utest isCommutative addi with true in
utest isCommutative subi with false in
utest isCommutative muli with true in
utest isCommutative concat with false in

utest getNeutralElement addi with Some (int_ 0) using optionEq eqExpr in
utest getNeutralElement subi with None () using optionEq eqExpr in
utest getNeutralElement muli with Some (int_ 1) using optionEq eqExpr in
utest getNeutralElement concat with Some (seq_ []) using optionEq eqExpr in

let f = symbolize (ulam_ "x" (ulam_ "y" (muli_ (int_ 2) (addi_ (var_ "x") (var_ "y"))))) in
let setEnv = setOfSeq cmpExpr [f] in
let mapEnv = mapFromSeq cmpExpr [(f, int_ 0)] in
utest isAssociativeH setEnv f with true in
utest isCommutativeH setEnv f with true in
utest getNeutralElementH mapEnv f with Some (int_ 0) using optionEq eqExpr in

()
```
</ToggleWrapper>
</DocBlock>

