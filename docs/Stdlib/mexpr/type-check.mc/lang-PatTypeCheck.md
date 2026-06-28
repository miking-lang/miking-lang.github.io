import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PatTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckPat" kind="sem">

```mc
sem typeCheckPat : TCEnv -> Map Name Ast_Type -> Ast_Pat -> (Map Name Ast_Type, Ast_Pat)
```

<Description>{`\`typeCheckPat env patEnv pat' type checks \`pat' under environment \`env'  
supposing the variables in \`patEnv' have been bound previously in the  
pattern.  Returns an updated \`patEnv' and the type checked \`pat'.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem typeCheckPat : TCEnv -> Map Name Type -> Pat -> (Map Name Type, Pat)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeCheckPatSimple" kind="sem">

```mc
sem typeCheckPatSimple : TCEnv -> Map Name Ast_Type -> Ast_Pat -> (Map Name Ast_Type, Ast_Pat)
```

<Description>{`Type check a pattern whose subpatterns must all be of the same type as the  
pattern itself.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem typeCheckPatSimple env patEnv =
  | pat ->
    let patTy = newpolyvar env.currentLvl (infoPat pat) in
    match smapAccumL_Pat_Pat
            (lam patEnv. lam pat.
              match typeCheckPat env patEnv pat with (patEnv, pat) in
              unify env [infoPat pat] patTy (tyPat pat);
              (patEnv, pat))
            patEnv pat
    with (patEnv, pat) in
    (patEnv, withTypePat patTy pat)
```
</ToggleWrapper>
</DocBlock>

