import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkLiteralSizePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintIntSize" kind="sem">

```mc
sem pprintIntSize : FutharkLiteralSizeAst_FutIntSize -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintIntSize =
  | I8 _ -> "i8"
  | I16 _ -> "i16"
  | I32 _ -> "i32"
  | I64 _ -> "i64"
  | U8 _ -> "u8"
  | U16 _ -> "u16"
  | U32 _ -> "u32"
  | U64 _ -> "u64"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintFloatSize" kind="sem">

```mc
sem pprintFloatSize : FutharkLiteralSizeAst_FutFloatSize -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintFloatSize =
  | F32 _ -> "f32"
  | F64 _ -> "f64"
```
</ToggleWrapper>
</DocBlock>

