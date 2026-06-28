import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PEvalLetInline  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalInlineLets" kind="sem">

```mc
sem pevalInlineLets : SideEffectEnv -> Ast_Expr -> Ast_Expr
```

<Description>{`Inlines let\-bindings that are only referred to once in the expression, and  
removes unused let\-bindings. Assumes unique let\-binding identifiers.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalInlineLets effectEnv =| t ->
    recursive let subs
      : Map Name PEvalLetInlineOrRemove -> Map Name Expr -> Expr -> Expr
      = lam marked. lam env. lam t.
        switch t
        case TmVar r then
          mapFindOrElse (lam. t) r.ident env
        case TmDecl (x & {decl = DeclLet r}) then
          switch mapLookup r.ident marked
          case None _ then
            smap_Expr_Expr (subs marked env) t
          case Some (PEvalLetRemove _) then
            subs marked env x.inexpr
          case Some (PEvalLetInline _) then
            let body = subs marked env r.body in
            subs marked (mapInsert r.ident body env) x.inexpr
          end
        case t then smap_Expr_Expr (subs marked env) t
        end
    in
    recursive
      let mark :
        (Map Name Int, Map Name PEvalLetInlineOrRemove) ->
          Expr ->
            (Map Name Int, Map Name PEvalLetInlineOrRemove)
        = lam acc. lam t.
          match acc with (count, subsEnv) in
          switch t
          case TmVar r then (mapInsertWith addi r.ident 1 count, subsEnv)
          case TmDecl (x & {decl = DeclLet r}) then
            if exprHasSideEffect effectEnv r.body then
              sfold_Expr_Expr mark acc t
            else
              match mark acc x.inexpr with (inexprCount, subsEnv) in
              let identCount = mapFindOrElse (lam. 0) r.ident inexprCount in
              if gti identCount 0 then
                -- This body IS NOT dead but we might substitute its identifier
                -- for it
                match mark (inexprCount, subsEnv) r.body
                  with (count, subsEnv)
                in
                if eqi identCount 1 then
                  (count, mapInsert r.ident (PEvalLetInline ()) subsEnv)
                else
                  (count, subsEnv)
              else
                -- This body IS dead
                (inexprCount, mapInsert r.ident (PEvalLetRemove ()) subsEnv)
          case t then sfold_Expr_Expr mark acc t
          end
    in
    let marked = (mark (mapEmpty nameCmp, mapEmpty nameCmp) t).1 in
    subs marked (mapEmpty nameCmp) t
```
</ToggleWrapper>
</DocBlock>

