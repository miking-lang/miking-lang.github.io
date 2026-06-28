import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeLiftBase  
  

  
  
  
## Types  
  

          <DocBlock title="TypeLiftEnv" kind="type">

```mc
type TypeLiftEnv : { typeEnv: AssocSeq Name Type, records: Map (Map SID Type) Name, seqs: Map Type Name, tensors: Map Type Name, variants: Map Name (Map Name Type) }
```



<ToggleWrapper text="Code..">
```mc
type TypeLiftEnv = {
    -- Collects all type bindings encountered in the program in sequence.
    typeEnv: AssocSeq Name Type,

    -- Record types encountered so far. Uses intrinsic maps as this is
    -- performance critical.
    records: Map (Map SID Type) Name,

    -- Sequence types encountered so far. Uses intrinsic maps as this is
    -- performance critical.
    seqs: Map Type Name,

    -- Tensor types encountered so far.
    tensors : Map Type Name,

    -- Variant types and their constructors encountered so far.
    variants: Map Name (Map Name Type)
  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="_replaceVariantNamesInTypeEnv" kind="sem">

```mc
sem _replaceVariantNamesInTypeEnv : TypeLiftBase_TypeLiftEnv -> AssocSeq Name Ast_Type
```

<Description>{`Replaces all variant type names with the variant type they represent. This  
function is called after going through the program, at which point all  
variant constructors have been identified.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _replaceVariantNamesInTypeEnv =
  | env ->
    let env : TypeLiftEnv = env in
    let f = lam ty : Type.
      match ty with TyVariantName {ident = ident, info = info} then
        match mapLookup ident env.variants with Some constrs then
          TyVariant {constrs = constrs, info = info/-infoTy ty-/}
        else
          errorSingle [info] (join ["No variant type ", nameGetStr ident,
                                    " found in environment"])
      else ty
    in
    assocSeqMap f env.typeEnv
```
</ToggleWrapper>
</DocBlock>

