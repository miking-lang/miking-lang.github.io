import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprCCompileAlloc  
  

  
  
  
## Semantics  
  

          <DocBlock title="alloc" kind="sem">

```mc
sem alloc : Name -> CExprTypeAst_CType -> [{id: Option Name, ty: CExprTypeAst_CType, init: Option CInitAst_CInit}]
```

<Description>{`Name \-\> CType \-\> \[\{ ty: CType, id: Option Name, init: Option CInit \}\]`}</Description>


<ToggleWrapper text="Code..">
```mc
sem alloc (name: Name) =
  | CTyPtr { ty = CTyVar { id = ident } & ty } & ptrTy ->
    [
      -- Define name as pointer to allocated struct
      { ty = CTyArray { ty = ty, size = Some (CEInt { i = 1 }) }
      , id = Some name
      , init = None ()
      }
    ]
  | CTyArray _ & ty->
    [
      { ty = ty , id = Some name , init = None () }
    ]
  | ty -> print "\n\n"; dprint ty; error "Incorrect type in alloc"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="free" kind="sem">

```mc
sem free : all a. all a1. a -> a1
```



<ToggleWrapper text="Code..">
```mc
sem free =
  | name -> error "free currently unused"
```
</ToggleWrapper>
</DocBlock>

