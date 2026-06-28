import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UFloatParser  
  

Parsing of an unsigned float

  
  
  
## Semantics  
  

          <DocBlock title="nextNum" kind="sem">

```mc
sem nextNum : Pos -> String -> String -> Option Char -> {pos: Pos, str: String, val: Ast_Expr}
```



<ToggleWrapper text="Code..">
```mc
sem nextNum (p: Pos) (xs: String) (nval: String) =
  | Some (('.' | 'e' | 'E') & c) ->
    let exponentHelper = lam pos. lam pre. lam expChar. lam s. lam isFloat.
      let exp : ParseResult String = parseFloatExponent (advanceCol pos 1) s in
      match exp.val with "" then
        let constVal =
          if isFloat then
            CFloat {val = string2float pre}
          else
            CInt {val = string2int pre}
        in {val = TmConst {val = constVal,
                           ty = tyunknown_,
                           info = makeInfo p pos},
            pos = pos, str = cons expChar s}
      else
        let floatStr = join [pre, "e", exp.val] in
        {val = TmConst {val = CFloat {val = string2float floatStr},
                        ty = tyunknown_,
                        info = makeInfo p exp.pos},
         pos = exp.pos, str = exp.str}
    in
    let p2 = advanceCol p (length nval) in
    match c with '.' then
      let p3 = advanceCol p2 1 in
      let s = tail xs in
      match s with ['0' | '1' | '2' | '3' | '4' |
                    '5' | '6' | '7' | '8' | '9'] ++ s2 then
        let n2 : ParseResult String = parseUInt p3 s in
        let preExponentStr = join [nval, ".", n2.val] in
        match n2.str with ['e' | 'E'] ++ s3 then
          exponentHelper n2.pos preExponentStr (head n2.str) s3 true
        else
          {val = TmConst {val = CFloat {val = string2float preExponentStr},
                          ty = tyunknown_,
                          info = makeInfo p n2.pos},
           pos = n2.pos, str = n2.str}
      else match s with ['e' | 'E'] ++ s2 then
        exponentHelper p3 nval (head s) s2 true
      else
        {val = TmConst {val = CFloat {val = string2float nval},
                        ty = tyunknown_,
                        info = makeInfo p p3},
         pos = p3, str = s}
    else match c with 'e' | 'E' then
      exponentHelper (advanceCol p (length nval)) nval c (tail xs) false
    else
      never
```
</ToggleWrapper>
</DocBlock>

