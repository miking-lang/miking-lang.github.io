import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MLangTopLevel  
  

  
  
  
## Types  
  

          <DocBlock title="MLangProgram" kind="type">

```mc
type MLangProgram : { decls: [Decl], expr: Expr }
```



<ToggleWrapper text="Code..">
```mc
type MLangProgram = {
    decls : [Decl],
    expr : Expr
  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="countProgNodes" kind="sem">

```mc
sem countProgNodes : MLangTopLevel_MLangProgram -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem countProgNodes =
  | prog ->
    let count = foldl countDeclNodes 0 prog.decls in
    countExprNodes count prog.expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="countDeclNodes" kind="sem">

```mc
sem countDeclNodes : Int -> Ast_Decl -> Int
```

<Description>{`Todo: Extend to also look at patterns.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem countDeclNodes count =
  | decl ->
    let count = addi count 1 in
    let count = sfold_Decl_Decl countDeclNodes count decl in
    let count = sfold_Decl_Type countTypeNodes count decl in
    let count = sfold_Decl_Expr countExprNodes count decl in
    count
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Prog_Decl" kind="sem">

```mc
sem smap_Prog_Decl : all acc. (acc -> Ast_Decl -> (acc, Ast_Decl)) -> acc -> MLangTopLevel_MLangProgram -> (acc, MLangTopLevel_MLangProgram)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Prog_Decl f acc =
  | prog ->
    match mapAccumL f acc prog.decls with (acc, decls) in
    (acc, {prog with decls = decls})
```
</ToggleWrapper>
</DocBlock>

