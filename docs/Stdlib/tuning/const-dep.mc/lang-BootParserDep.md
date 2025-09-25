import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BootParserDep  
  

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : all a. ConstAst_Const -> [a]
```



<ToggleWrapper text="Code..">
```mc
sem constDep =
  | CBootParserParseMExprString _ -> []
  | CBootParserParseMLangString _ -> []
  | CBootParserParseMLangFile _ -> []
  | CBootParserParseMCoreFile _ -> []
  | CBootParserGetId _ -> []
  | CBootParserGetTerm _ -> []
  | CBootParserGetTop _ -> []
  | CBootParserGetDecl _ -> []
  | CBootParserGetType _ -> []
  | CBootParserGetString _ -> []
  | CBootParserGetInt _ -> []
  | CBootParserGetFloat _ -> []
  | CBootParserGetListLength _ -> []
  | CBootParserGetConst _ -> []
  | CBootParserGetPat _ -> []
  | CBootParserGetCopat _ -> []
  | CBootParserGetInfo _ -> []
```
</ToggleWrapper>
</DocBlock>

