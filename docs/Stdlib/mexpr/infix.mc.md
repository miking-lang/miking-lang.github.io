import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# infix.mc  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
This file adds syntactic sugar to MExpr by  
extending the MExpr parser and transforming the  
code into standard MExpr.  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- 

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mexpr/eval.mc"} style={S.link}>eval.mc</a>, <a href={"/docs/Stdlib/mexpr/parser.mc"} style={S.link}>parser.mc</a>, <a href={"/docs/Stdlib/mexpr/info.mc"} style={S.link}>info.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>pprint.mc</a>, <a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>ast-builder.mc</a>  
  
## Languages  
  

          <DocBlock title="MExprMakeConstBinOp" kind="lang" link="/docs/Stdlib/mexpr/infix.mc/lang-MExprMakeConstBinOp">

```mc
lang MExprMakeConstBinOp
```

<Description>{`Fragment for constructing constant binary operators. Used by InfixArithParser`}</Description>


<ToggleWrapper text="Code..">
```mc
lang MExprMakeConstBinOp = ArithIntAst + AppAst + UnknownTypeAst
  sem makeConstBinOp (n: Int) (p: Pos) (xs: String)
                     assoc (prec: Int) =
  | op ->
    let p2 = advanceCol p 1 in
    Some {
      val = lam x. lam y.
        let op = TmConst {val = op, ty = tyunknown_, info = makeInfo p p2} in
        let app = lam x. lam y. 
                TmApp {lhs = x, rhs = y, ty = tyunknown_, info = mergeInfo (infoTm x) (infoTm y)} in
        let res = (app (app op x) y) in
        res, 
      pos = p2, str = xs, assoc = assoc, prec = prec}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ExprInfixArithParser" kind="lang" link="/docs/Stdlib/mexpr/infix.mc/lang-ExprInfixArithParser">

```mc
lang ExprInfixArithParser
```

<Description>{`Demonstrates the use of infix operators. The syntax is not part of basic MCore.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang ExprInfixArithParser =  ExprInfixParser + ArithIntAst + MExprMakeConstBinOp 
  sem parseInfixImp (p: Pos) =
  | "+" ++ xs -> makeConstBinOp 1 p xs (LeftAssoc ()) 10 (CAddi {})
  | "-" ++ xs -> makeConstBinOp 1 p xs (LeftAssoc ()) 10 (CSubi {})
  | "*" ++ xs -> makeConstBinOp 1 p xs (LeftAssoc ()) 20 (CMuli {})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ExprInfixTestParser" kind="lang" link="/docs/Stdlib/mexpr/infix.mc/lang-ExprInfixTestParser">

```mc
lang ExprInfixTestParser
```

<Description>{`Test fragment for testing infix operations`}</Description>


<ToggleWrapper text="Code..">
```mc
lang ExprInfixTestParser = ExprInfixParser + SeqOpAst + ArithIntAst + AppAst
   sem parseInfixImp (p: Pos) =
  | "il1" ++ xs -> makeTestBinOp "-il1-" p xs (LeftAssoc ()) 1 
  | "il2" ++ xs -> makeTestBinOp "-il2-" p xs (LeftAssoc ()) 2 
  | "il3" ++ xs -> makeTestBinOp "-il3-" p xs (LeftAssoc ()) 3 
  | "il4" ++ xs -> makeTestBinOp "-il4-" p xs (LeftAssoc ()) 4 
  | "ir1" ++ xs -> makeTestBinOp "-ir1-" p xs (RightAssoc ()) 1 
  | "ir2" ++ xs -> makeTestBinOp "-ir2-" p xs (RightAssoc ()) 2 
  | "ir3" ++ xs -> makeTestBinOp "-ir3-" p xs (RightAssoc ()) 3 
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprParserExt" kind="lang" link="/docs/Stdlib/mexpr/infix.mc/lang-MExprParserExt">

```mc
lang MExprParserExt
```



<ToggleWrapper text="Code..">
```mc
lang MExprParserExt = MExprParserBase + ExprInfixArithParser + ExprInfixParserClosed +
                      ExprInfixTestParser
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprExt" kind="lang" link="/docs/Stdlib/mexpr/infix.mc/lang-MExprExt">

```mc
lang MExprExt
```



<ToggleWrapper text="Code..">
```mc
lang MExprExt = MExprAst + MExprParserExt + MExprEval + MExprPrettyPrint + MExprSym
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="makeTestBinOp" kind="let">

```mc
let makeTestBinOp op p xs assoc prec : all a. all a1. all a2. String -> Pos -> a -> a1 -> a2 -> Option {pos: Pos, str: a, val: Ast_Expr -> Ast_Expr -> Ast_Expr, prec: a2, assoc: a1}
```

<Description>{`Used by the infix operation test`}</Description>


<ToggleWrapper text="Code..">
```mc
let makeTestBinOp = lam op. lam p. lam xs. lam assoc. lam prec.
  Some {
    val = lam x. lam y.
      let s1 = concat_ (seq_ [char_ '(']) x in
      let s2 = concat_ y (seq_ [char_ ')']) in
      let opstr = seq_ (map (lam x. char_ x) op) in
      concat_ (concat_ s1 opstr) s2,
    pos = advanceCol p (length op), 
    str = xs, assoc = assoc, prec = prec}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalExpr" kind="let">

```mc
let evalExpr t : ?
```

<Description>{`Evaluate an expression into a value expression`}</Description>


<ToggleWrapper text="Code..">
```mc
let evalExpr : use MExprExt in Expr -> Expr =
  use MExprExt in lam t. eval (evalCtxEmpty ()) (symbolize t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalStr" kind="let">

```mc
let evalStr str : ?
```

<Description>{`Parse a string and then evaluate into a value expression`}</Description>


<ToggleWrapper text="Code..">
```mc
let evalStr : use MExprExt in String -> Expr =
  lam str. use MExprExt in evalExpr (parseExpr (initPos "") str)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalStrToStr" kind="let">

```mc
let evalStrToStr str : ?
```

<Description>{`Parse a string and then evaluate into a value, and pretty print  
as a string.`}</Description>


<ToggleWrapper text="Code..">
```mc
let evalStrToStr : String -> String =
  use MExprExt in lam str. expr2str (evalStr str)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalTest" kind="let">

```mc
let evalTest str : ?
```

<Description>{`Same as evalStrToStr, but removes all white space. Good for testing.`}</Description>


<ToggleWrapper text="Code..">
```mc
let evalTest : String -> String = lam str. 
  filter (lam x. not (or (or (eqChar x ' ') (eqChar x '\n')) (eqChar x '\t')))
  (evalStrToStr str)
```
</ToggleWrapper>
<ToggleWrapper text="Tests..">
```mc
utest evalTest "true" with "true"
utest evalTest "1+2" with "3"
utest evalTest " 2 * 3" with "6"
utest evalTest " 2 + 3 * 4 " with "14"
utest evalTest " 2 + 3 + 4 " with "9"
utest evalTest " (2 + 3) * 4 " with "20"
utest evalTest " 1 + 2 * 3 + 4 " with "11"
utest evalTest " 1 + 2 * ( 3 + 4 ) " with "15"
utest evalTest " 10 - 7 - 2" with "1"
utest evalTest " 10 - (7 - 2)" with "5"
utest evalTest " [10 + 17, 2 + 3 * 4]" with "[27,14]"

-- Test infix operators
utest evalTest "['a'] il1 ['b'] il1 ['c'] il1 ['d']" with "\"(((a-il1-b)-il1-c)-il1-d)\""
utest evalTest "['a'] ir1 ['b'] ir1 ['c'] ir1 ['d']" with "\"(a-ir1-(b-ir1-(c-ir1-d)))\""
utest evalTest "['a'] ir1 ['b'] ir1 ['c'] ir1 ['d']" with "\"(a-ir1-(b-ir1-(c-ir1-d)))\""
utest evalTest "['a'] il2 ['b'] ir1 ['c'] il1 ['d']" with "\"((a-il2-b)-ir1-(c-il1-d))\""
utest evalTest "['a'] il2 ['b'] il4 ['c'] il3 ['d'] il1 ['e']" with
               "\"((a-il2-((b-il4-c)-il3-d))-il1-e)\""
utest evalTest "['a'] il1 ['b'] il3 ['c'] il4 ['d'] il2 ['e']" with
               "\"(a-il1-((b-il3-(c-il4-d))-il2-e))\""
```
</ToggleWrapper>
</DocBlock>

