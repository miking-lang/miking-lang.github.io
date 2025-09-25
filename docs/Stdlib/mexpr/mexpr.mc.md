import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# mexpr.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  


  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>ast-builder.mc</a>, <a href={"/docs/Stdlib/mexpr/eval.mc"} style={S.link}>eval.mc</a>, <a href={"/docs/Stdlib/mexpr/parser.mc"} style={S.link}>parser.mc</a>, <a href={"/docs/Stdlib/mexpr/info.mc"} style={S.link}>info.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>pprint.mc</a>, <a href={"/docs/Stdlib/seq.mc"} style={S.link}>seq.mc</a>  
  
## Languages  
  

          <DocBlock title="MExpr" kind="lang" link="/docs/Stdlib/mexpr/mexpr.mc/lang-MExpr">

```mc
lang MExpr
```



<ToggleWrapper text="Code..">
```mc
lang MExpr = MExprAst + MExprParser + MExprEval + MExprPrettyPrint + MExprSym
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="evalExpr" kind="let">

```mc
let evalExpr t : Ast_Expr -> Ast_Expr
```

<Description>{`Evaluate an expression into a value expression`}</Description>


<ToggleWrapper text="Code..">
```mc
let evalExpr : use MExpr in Expr -> Expr =
  use MExpr in lam t. eval (evalCtxEmpty ()) (symbolize t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalStr" kind="let">

```mc
let evalStr str : String -> Ast_Expr
```

<Description>{`Parse a string and then evaluate into a value expression`}</Description>


<ToggleWrapper text="Code..">
```mc
let evalStr : use MExpr in String -> Expr =
  lam str. use MExpr in evalExpr (parseExpr (initPos "") str)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalStrToStr" kind="let">

```mc
let evalStrToStr str : String -> String
```

<Description>{`Parse a string and then evaluate into a value, and pretty print  
as a string.`}</Description>


<ToggleWrapper text="Code..">
```mc
let evalStrToStr : String -> String =
  use MExpr in lam str. expr2str (evalStr str)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="evalTest" kind="let">

```mc
let evalTest str : String -> String
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
utest evalTest "false" with "false"
utest evalTest "0" with "0"
utest evalTest "3421" with "3421"
utest evalTest "if true then 10 else 20" with "10"
utest evalTest "if false then 10 else 20" with "20"
utest evalTest "if false then true else if true then 1 else 2" with "1"
utest evalTest "if true then if false then 1 else 2 else 3" with "2"
utest evalTest "if true then (if false then 1 else 2) else 3" with "2"
utest evalTest " [ ] " with "\"\""
utest evalTest " [ 12 ] " with "[12]"
utest evalTest " [ 12 , ( 17 ), 789 ] " with "[12,17,789]"
utest evalTest " \"hi\" " with "\"hi\""
utest evalStrToStr " \" f\\\\  \\n \\\" \" " with "\" f\\\\  \\n \\\" \""
utest evalTest " [ 'a' , 'b' , 'c'] " with "\"abc\""
utest evalTest " let x = 73 in x" with "73"
utest evalTest " let foo1 = 19 in \n let foo2 = 22 in [foo1,foo2]" with "[19,22]"
utest evalTest " let iftrue = 5 in iftrue" with "5"
```
</ToggleWrapper>
</DocBlock>

