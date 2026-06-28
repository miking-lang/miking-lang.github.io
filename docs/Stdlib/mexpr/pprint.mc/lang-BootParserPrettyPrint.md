import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BootParserPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getConstStringCode" kind="sem">

```mc
sem getConstStringCode : Int -> ConstAst_Const -> String
```



<ToggleWrapper text="Code..">
```mc
sem getConstStringCode (indent : Int) =
  | CBootParserParseMExprString _ -> "bootParserParseMExprString"
  | CBootParserParseMLangString _ -> "bootParserParseMLangString"
  | CBootParserParseMLangFile _ -> "bootParserParseMLangFile"
  | CBootParserParseMCoreFile _ -> "bootParserParseMCoreFile"
  | CBootParserGetId _ -> "bootParserGetId"
  | CBootParserGetTerm _ -> "bootParserGetTerm"
  | CBootParserGetTop _ -> "bootParserGetTop"
  | CBootParserGetDecl _ -> "bootParserGetDecl"
  | CBootParserGetType _ -> "bootParserGetType"
  | CBootParserGetString _ -> "bootParserGetString"
  | CBootParserGetInt _ -> "bootParserGetInt"
  | CBootParserGetFloat _ -> "bootParserGetFloat"
  | CBootParserGetListLength _ -> "bootParserGetListLength"
  | CBootParserGetConst _ -> "bootParserGetConst"
  | CBootParserGetPat _ -> "bootParserGetPat"
  | CBootParserGetCopat _ -> "bootParserGetCopat"
  | CBootParserGetInfo _ -> "bootParserGetInfo"
```
</ToggleWrapper>
</DocBlock>

