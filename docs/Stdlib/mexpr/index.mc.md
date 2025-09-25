import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# index.mc  
  

This file defines a function \`indexGen\` that constructs a map from all term  
variable names in a program to unique integers from 0 to n\-1, where n is the  
total number of distinct variable names in the program. Currently, this is  
mainly useful for constant\-time tensor lookups in \`cfa.mc\`.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mexpr/boot-parser.mc"} style={S.link}>boot-parser.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>  
  
## Languages  
  

          <DocBlock title="Index" kind="lang" link="/docs/Stdlib/mexpr/index.mc/lang-Index">

```mc
lang Index
```



<ToggleWrapper text="Code..">
```mc
lang Index = Ast

  type IndexMap = {
    name2int: Map Name Int,
    int2name: Tensor[Name]
  }

  type IndexAcc = {
    map: Map Name Int,
    nextIndex: Int
  }

  sem emptyAcc: () -> IndexAcc
  sem emptyAcc =
  | _ -> { map = mapEmpty nameCmp, nextIndex = 0 }

  sem addKey: Name -> IndexAcc -> IndexAcc
  sem addKey (name: Name) =
  | acc ->
    if mapMem name acc.map then acc
    else {{acc with map = mapInsert name acc.nextIndex acc.map }
               with nextIndex = addi 1 acc.nextIndex }

  -- Same as addKey, but return the new mapped-to integer. Also reversed
  -- argument order for convenient mapAccumL.
  sem addKeyGet: IndexAcc -> Name -> (IndexAcc,Int)
  sem addKeyGet acc =
  | name ->
    let i = acc.nextIndex in
    (addKey name acc, i)

  -- Entry point
  sem indexGen: Expr -> IndexMap
  sem indexGen =
  | t -> indexClose (indexAccGen t)

  -- Alternative entry point, leaving the index open for more additions
  sem indexAccGen: Expr -> IndexAcc
  sem indexAccGen =
  | t -> indexAccGenH (emptyAcc ()) t

  sem indexClose: IndexAcc -> IndexMap
  sem indexClose =
  | acc ->
    let name2int = acc.map in
    let int2name: Tensor[Name] =
      tensorCreateDense [acc.nextIndex] (lam. nameNoSym "t") in
    mapMapWithKey (lam n. lam i. tensorLinearSetExn int2name i n) name2int;
    {name2int = name2int, int2name = int2name}

  sem indexAccGenH: IndexAcc -> Expr -> IndexAcc
  sem indexAccGenH (acc: IndexAcc) =
  | t -> let acc = indexAdd acc t in sfold_Expr_Expr indexAccGenH acc t

  sem indexAdd: IndexAcc -> Expr -> IndexAcc
  sem indexAdd (acc: IndexAcc) =
  | t -> acc

end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VarIndex" kind="lang" link="/docs/Stdlib/mexpr/index.mc/lang-VarIndex">

```mc
lang VarIndex
```



<ToggleWrapper text="Code..">
```mc
lang VarIndex = Index + VarAst
  sem indexAdd (acc: IndexAcc) =
  | TmVar { ident = ident } -> addKey ident acc
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LamIndex" kind="lang" link="/docs/Stdlib/mexpr/index.mc/lang-LamIndex">

```mc
lang LamIndex
```



<ToggleWrapper text="Code..">
```mc
lang LamIndex = Index + LamAst
  sem indexAdd (acc: IndexAcc) =
  | TmLam { ident = ident } -> addKey ident acc
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LetIndex" kind="lang" link="/docs/Stdlib/mexpr/index.mc/lang-LetIndex">

```mc
lang LetIndex
```



<ToggleWrapper text="Code..">
```mc
lang LetIndex = Index + LetDeclAst
  sem indexAdd (acc: IndexAcc) =
  | TmDecl {decl = DeclLet { ident = ident }} -> addKey ident acc
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecLetsIndex" kind="lang" link="/docs/Stdlib/mexpr/index.mc/lang-RecLetsIndex">

```mc
lang RecLetsIndex
```



<ToggleWrapper text="Code..">
```mc
lang RecLetsIndex = Index + RecLetsDeclAst
  sem indexAdd (acc: IndexAcc) =
  | TmDecl {decl = DeclRecLets { bindings = bindings }} ->
    foldl (lam acc: IndexAcc. lam b: DeclLetRecord. addKey b.ident acc)
      acc bindings
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ExtIndex" kind="lang" link="/docs/Stdlib/mexpr/index.mc/lang-ExtIndex">

```mc
lang ExtIndex
```



<ToggleWrapper text="Code..">
```mc
lang ExtIndex = Index + ExtDeclAst
  sem indexAdd (acc: IndexAcc) =
  | TmDecl {decl = DeclExt { ident = ident }} -> addKey ident acc
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TypeIndex" kind="lang" link="/docs/Stdlib/mexpr/index.mc/lang-TypeIndex">

```mc
lang TypeIndex
```



<ToggleWrapper text="Code..">
```mc
lang TypeIndex = Index + TypeDeclAst
  sem indexAdd (acc: IndexAcc) =
  | TmDecl {decl = DeclType { ident = ident }} -> addKey ident acc
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DataIndex" kind="lang" link="/docs/Stdlib/mexpr/index.mc/lang-DataIndex">

```mc
lang DataIndex
```



<ToggleWrapper text="Code..">
```mc
lang DataIndex = Index + DataAst + DataDeclAst
  sem indexAdd (acc: IndexAcc) =
  | TmDecl {decl = DeclConDef { ident = ident }} -> addKey ident acc
  | TmConApp { ident = ident } -> addKey ident acc
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MatchIndex" kind="lang" link="/docs/Stdlib/mexpr/index.mc/lang-MatchIndex">

```mc
lang MatchIndex
```



<ToggleWrapper text="Code..">
```mc
lang MatchIndex = Index + MatchAst
  sem indexAdd (acc: IndexAcc) =
  | TmMatch { pat = pat } -> patIndexAdd acc pat

  sem patIndexAdd: IndexAcc -> Pat -> IndexAcc
  sem patIndexAdd (acc: IndexAcc) =
  | p -> sfold_Pat_Pat patIndexAdd acc p
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="NamedPatIndex" kind="lang" link="/docs/Stdlib/mexpr/index.mc/lang-NamedPatIndex">

```mc
lang NamedPatIndex
```



<ToggleWrapper text="Code..">
```mc
lang NamedPatIndex = MatchIndex + NamedPat
  sem patIndexAdd (acc: IndexAcc) =
  | PatNamed { ident = PName name } -> addKey name acc
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeqEdgePatIndex" kind="lang" link="/docs/Stdlib/mexpr/index.mc/lang-SeqEdgePatIndex">

```mc
lang SeqEdgePatIndex
```



<ToggleWrapper text="Code..">
```mc
lang SeqEdgePatIndex = MatchIndex + SeqEdgePat
  sem patIndexAdd (acc: IndexAcc) =
  | PatSeqEdge { middle = PName name } & p ->
    sfold_Pat_Pat patIndexAdd (addKey name acc) p
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprIndex" kind="lang" link="/docs/Stdlib/mexpr/index.mc/lang-MExprIndex">

```mc
lang MExprIndex
```



<ToggleWrapper text="Code..">
```mc
lang MExprIndex =
  Index + VarIndex + LamIndex + LetIndex + RecLetsIndex + ExtIndex + DataIndex +
  TypeIndex + MatchIndex + NamedPatIndex + SeqEdgePatIndex
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Test" kind="lang" link="/docs/Stdlib/mexpr/index.mc/lang-Test">

```mc
lang Test
```



<ToggleWrapper text="Code..">
```mc
lang Test = MExprIndex + BootParser
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
use Test in

let test: String -> IndexMap = lam s.
  let t = parseMExprStringKeywordsExn [] s in
  indexGen t
in

let eqTest: IndexMap -> [(String,Int)] -> Bool = lam i1. lam i2.
  let name2int: Map Name Int = mapFromSeq nameCmp
    (map (lam e. (nameNoSym e.0, e.1)) i2) in
  let int2name: Tensor[Name] =
    tensorCreateDense [mapSize name2int] (lam. nameNoSym "t") in
  iter (lam e. tensorSetExn int2name [e.1] (nameNoSym e.0)) i2;
  and (mapEq eqi i1.name2int name2int) (tensorEq nameEq i1.int2name int2name)
in

utest test "let x = 1 in ()" with [
  ("x", 0)
] using eqTest in

utest test "let x = lam y. let z = 1 in () in ()" with [
  ("x", 0),
  ("y", 1),
  ("z", 2)
] using eqTest in

utest test "
  recursive
    let f = lam x. let xv = 1 in ()
    let g = lam y. let yv = 2 in ()
  in ()
------------------------" with [
  ("f", 0),
  ("g", 1),
  ("x", 2),
  ("xv", 3),
  ("y", 4),
  ("yv", 5)
] using eqTest in

utest test "
  external x : Int -> Int in
  ()
------------------------" with [
  ("x", 0)
] using eqTest in

utest test "
  match 1 with x in
  ()
------------------------" with [
  ("x", 0)
] using eqTest in

utest test "
  match 1 with _ in
  ()
------------------------" with []
using eqTest in

utest test "
  let x = addi 1 2 in
  let f = lam y. addi 1 y in
  let sum1 = addf 1.0 1.0 in
  let sum2 = f x 1.0 in
  let res = addf sum1 sum2 in
  res
------------------------" with [
  ("x", 0),
  ("f", 1),
  ("y", 2),
  ("sum1", 3),
  ("sum2", 4),
  ("res", 5)
] using eqTest in

utest test "
  type T in
  con C: (a -> a) -> T in
  C ()
------------------------" with [
  ("T", 0),
  ("C", 1)
] using eqTest in

utest test "
  let a = 1 in
  match a with b in
  match [a,b] with [_] ++ c in
  ()
------------------------" with [
  ("a", 0),
  ("b", 1),
  ("c", 2)
] using eqTest in

()
```
</ToggleWrapper>
</DocBlock>

