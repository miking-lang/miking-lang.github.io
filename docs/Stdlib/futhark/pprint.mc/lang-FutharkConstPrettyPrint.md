import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkConstPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="futharkFloatToString" kind="sem">

```mc
sem futharkFloatToString : Float -> Option FutharkLiteralSizeAst_FutFloatSize -> String
```

<Description>{`NOTE\(larshum, 2024\-01\-31\): Prints floating\-point numbers in a way that is  
supported by Futhark. Firstly, we print NaN and infinity as an access into  
the appropriate module based on the size of the floating point, as these  
are not directly available as literals in Futhark. Secondly, we add a zero  
to the end of floating points that are equal to integers due to an  
incompatibility between the format used by 'float2string' and the  
floating\-point format used in Futhark.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem futharkFloatToString v =
  | sz ->
    let sz = match sz with Some (F32 _) then F32 () else F64 () in
    let szStr = pprintFloatSize sz in
    if neqf v v then
      concat szStr ".nan"
    else if eqf v inf then
      concat szStr ".inf"
    else if eqf v (negf inf) then
      join ["-", szStr, ".inf"]
    else if eqf (subf (int2float (roundfi v)) v) 0.0 then
      join [float2string v, "0", szStr]
    else concat (float2string v) szStr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintConst" kind="sem">

```mc
sem pprintConst : FutharkConstAst_FutConst -> String
```



<ToggleWrapper text="Code..">
```mc
sem pprintConst =
  | FCInt t ->
    concat
      (int2string t.val)
      (optionGetOrElse (lam. "") (optionMap pprintIntSize t.sz))
  | FCFloat t ->
    futharkFloatToString t.val t.sz
  | FCBool t -> if t.val then "true" else "false"
  | FCAdd () -> "(+)"
  | FCSub () -> "(-)"
  | FCMul () -> "(*)"
  | FCDiv () -> "(/)"
  | FCNegi () -> "(i64.neg)"
  | FCNegf () -> "(f64.neg)"
  | FCRem () -> "(%)"
  | FCFloatFloor () -> "f64.floor"
  | FCFloat2Int () -> "i64.f64"
  | FCInt2Float () -> "f64.i64"
  | FCEq () -> "(==)"
  | FCNeq () -> "(!=)"
  | FCGt () -> "(>)"
  | FCLt () -> "(<)"
  | FCGeq () -> "(>=)"
  | FCLeq () -> "(<=)"
  | FCAnd () -> "(&&)"
  | FCOr () -> "(||)"
  | FCBitAnd () -> "(&)"
  | FCBitOr () -> "(|)"
  | FCBitXor () -> "(^)"
  | FCSrl () -> "(>>)"
  | FCSll () -> "(<<)"
  | FCMap () -> "map"
  | FCMap2 () -> "map2"
  | FCReduce () -> "reduce"
  | FCFlatten () -> "flatten"
  | FCIndices () -> "indices"
  | FCIota () -> "iota"
  | FCLength () -> "length"
  | FCReverse () -> "reverse"
  | FCConcat () -> "concat"
  | FCHead () -> "head"
  | FCTail () -> "tail"
  | FCNull () -> "null"
  | FCFoldl () -> "foldl"
  | FCReplicate () -> "replicate"
  | FCTabulate () -> "tabulate"
  | FCCopy () -> "copy"
```
</ToggleWrapper>
</DocBlock>

