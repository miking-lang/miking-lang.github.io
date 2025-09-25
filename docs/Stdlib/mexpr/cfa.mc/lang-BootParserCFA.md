import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BootParserCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : CFA_CFAGraphInit -> Info -> IName -> ConstAst_Const -> CFA_CFAGraphInit
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst graph info ident =
  | CBootParserParseMExprString _ -> graph
  | CBootParserParseMLangString _ -> graph
  | CBootParserParseMLangFile _ -> graph
  | CBootParserParseMCoreFile _ -> graph
  | CBootParserGetId _ -> graph
  | CBootParserGetTerm _ -> graph
  | CBootParserGetTop _ -> graph
  | CBootParserGetDecl _ -> graph
  | CBootParserGetType _ -> graph
  | CBootParserGetString _ -> graph
  | CBootParserGetInt _ -> graph
  | CBootParserGetFloat _ -> graph
  | CBootParserGetListLength _ -> graph
  | CBootParserGetConst _ -> graph
  | CBootParserGetPat _ -> graph
  | CBootParserGetCopat _ -> graph
  | CBootParserGetInfo _ -> graph
```
</ToggleWrapper>
</DocBlock>

