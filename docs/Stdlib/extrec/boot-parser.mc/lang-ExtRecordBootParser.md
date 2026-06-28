import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtRecordBootParser  
  

  
  
  
## Semantics  
  

          <DocBlock title="matchTerm" kind="sem">

```mc
sem matchTerm : BootParseTree -> Int -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem matchTerm t =
  | 117 ->
    let n = glistlen t 0 in
    let params = map (lam i. gname t (addi i 1)) (range 0 n 1) in
    TmDecl
    { decl = DeclRecType
      { ident = gname t 0
      , params = params
      , info = ginfo t 0
      }
    , ty = tyunknown_
    , inexpr = gterm t 0
    , info = ginfo t 0
    }
  | 118 -> TmDecl
    { decl = DeclRecField
      { label = gstr t 0
      , tyIdent = gtype t 0
      , info = ginfo t 0
      }
    , inexpr = gterm t 0
    , ty = tyunknown_
    , info = ginfo t 0
    }
  | 119 ->
    let n = glistlen t 0 in
    let ident = gname t 0 in
    let bindingPairs = map (lam i. (gstr t (addi 1 i), gterm t i)) (range 0 n 1) in
    TmExtRecord {bindings = mapFromSeq cmpString bindingPairs,
                 ident = ident,
                 ty = tyunknown_,
                 info = ginfo t 0}
  | 122 ->
    let n = glistlen t 0 in
    let ident = gname t 0 in
    let e = gterm t 0 in
    let bindingPairs = map (lam i. (gstr t i, gterm t (addi 1 i))) (range 0 n 1) in
    TmExtExtend {bindings = mapFromSeq cmpString bindingPairs,
                 e = e,
                 ty = tyunknown_,
                 info = ginfo t 0}
```
</ToggleWrapper>
</DocBlock>

