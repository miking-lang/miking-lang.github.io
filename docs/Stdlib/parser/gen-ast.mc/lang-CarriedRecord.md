import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CarriedRecord  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="CarriedType" kind="syn">

```mc
syn CarriedType
```



<ToggleWrapper text="Code..">
```mc
syn CarriedType =
  | RecordType [(String, CarriedType)]
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="carriedRepr" kind="sem">

```mc
sem carriedRepr : CarriedTypeBase_CarriedType -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem carriedRepr =
  | RecordType tys -> tyrecord_
    (map
      (lam x. (x.0, carriedRepr x.1))
      tys)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="carriedSMapAccumL" kind="sem">

```mc
sem carriedSMapAccumL : (Ast_Expr -> Ast_Expr -> Ast_Expr) -> Ast_Type -> CarriedTypeBase_CarriedType -> Option (Name -> Name -> Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem carriedSMapAccumL f targetTy =
  | RecordType fields ->
    let mappingFields = mapOption
      (lam x. optionMap (lam y. (x.0, y)) (carriedSMapAccumL f targetTy x.1))
      fields in
    match mappingFields with [] then None ()
    else Some
      (lam accName. lam valName.
        -- NOTE(vipa, 2021-03-03): This constructs an AST with
        -- shadowing of symbolized names, which may or may not be what
        -- we want
        let mappedFields = mapAccumR
          (lam constr. lam x. match x with (field, mkNew) then
             let fieldName = nameSym field in
             let constr = lam innerMost.
               match_
                 (bind_
                   (nulet_ fieldName (recordproj_ field (nvar_ valName)))
                   (mkNew accName fieldName))
                 (ptuple_ [npvar_ accName, npvar_ fieldName])
                 (constr innerMost)
                 never_
             in (constr, (field, fieldName))
           else never)
          identity
          mappingFields
        in match mappedFields with (constr, mappedFields) then
          constr
            (utuple_
              [ nvar_ accName
              , (foldl
                  (lam acc. lam update: (Unknown, Unknown).
                    recordupdate_ acc update.0 (nvar_ update.1))
                  (nvar_ valName)
                  mappedFields)
              ])
        else never
      )
```
</ToggleWrapper>
</DocBlock>

