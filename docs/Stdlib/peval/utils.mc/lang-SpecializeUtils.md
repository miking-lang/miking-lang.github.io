import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SpecializeUtils  
  

  
  
  
## Types  
  

          <DocBlock title="SpecializeNames" kind="type">

```mc
type SpecializeNames : { pevalNames: Map String Name, consNames: Map String Name, builtinsNames: Map String Name, tyConsNames: Map String Name, otherFuncs: Map String Name }
```

<Description>{`Holds the names of constructors/functions/types that could be needed  
in peval transformation.`}</Description>


<ToggleWrapper text="Code..">
```mc
type SpecializeNames = {
    pevalNames : Map String Name,
    consNames : Map String Name,
    builtinsNames : Map String Name,
    tyConsNames : Map String Name,
    otherFuncs : Map String Name
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SpecializeArgs" kind="type">

```mc
type SpecializeArgs : { idMapping: Map Name Name, extractMap: Map Name Expr }
```



<ToggleWrapper text="Code..">
```mc
type SpecializeArgs = {
    idMapping : Map Name Name,
    extractMap : Map Name Expr
  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="initArgs" kind="sem">

```mc
sem initArgs : Map Name Ast_Expr -> SpecializeUtils_SpecializeArgs
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem initArgs = | emap ->
    {extractMap = emap,
     idMapping = (mapEmpty nameCmp)}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="updateIds" kind="sem">

```mc
sem updateIds : SpecializeUtils_SpecializeArgs -> Map Name Name -> SpecializeUtils_SpecializeArgs
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem updateIds args = | idm -> {args with idMapping =idm}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_nameSeqToMap" kind="sem">

```mc
sem _nameSeqToMap : [Name] -> Map String Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _nameSeqToMap =
  | names -> mapFromSeq cmpString (map (lam name. (name.0, name)) names)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findNames" kind="sem">

```mc
sem findNames : Ast_Expr -> [String] -> Map String Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findNames ast = | includes ->
    let names = filterOption (findNamesOfStrings includes ast) in
    let nameMap = _nameSeqToMap names in
    if eqi (length includes) (length names) then
      nameMap
    else
      let notIn = filter (lam str. not (mapMem str nameMap)) includes in
      let notIn = strJoin "\n" notIn in
      error (concat "A necessary include could not be found in the AST\n" notIn)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createNames" kind="sem">

```mc
sem createNames : Ast_Expr -> SpecializeUtils_SpecializeNames
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem createNames =
  | ast ->
    let pevalNames = findNames ast includeSpecializeNames in
    let consNames = findNames ast includeConsNames in
    let builtinsNames = findNames ast includeBuiltins in
    let tyConsNames = findNames ast includeTyConsNames in
    let otherFuncs = findNames ast includeOtherFuncs in
    {pevalNames = pevalNames,
     consNames = consNames,
     builtinsNames = builtinsNames,
     tyConsNames = tyConsNames,
     otherFuncs=otherFuncs}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getName" kind="sem">

```mc
sem getName : Map String Name -> String -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getName names =
  | str ->
    match mapLookup str names with Some n then n
    else error (concat "Could not find: " str)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalName" kind="sem">

```mc
sem pevalName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalName = | names -> getName (names.pevalNames) "pevalWithEnv"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmClosName" kind="sem">

```mc
sem tmClosName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tmClosName = | names -> getName (names.consNames) "ClosAst_TmClos"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmAppName" kind="sem">

```mc
sem tmAppName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tmAppName = | names -> getName (names.consNames) "AppAst_TmApp"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmLamName" kind="sem">

```mc
sem tmLamName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tmLamName = | names -> getName (names.consNames) "LamAst_TmLam"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmVarName" kind="sem">

```mc
sem tmVarName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tmVarName = | names -> getName (names.consNames) "VarAst_TmVar"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmRecName" kind="sem">

```mc
sem tmRecName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tmRecName = | names -> getName (names.consNames) "RecordAst_TmRecord"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmSeqName" kind="sem">

```mc
sem tmSeqName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tmSeqName = | names -> getName (names.consNames) "SeqAst_TmSeq"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmConstName" kind="sem">

```mc
sem tmConstName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tmConstName = | names -> getName (names.consNames) "ConstAst_TmConst"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmMatchName" kind="sem">

```mc
sem tmMatchName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tmMatchName = | names -> getName (names.consNames) "MatchAst_TmMatch"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmDeclName" kind="sem">

```mc
sem tmDeclName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tmDeclName = | names -> getName (names.consNames) "DeclAst_TmDecl"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="declLetName" kind="sem">

```mc
sem declLetName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem declLetName = | names -> getName (names.consNames) "LetDeclAst_DeclLet"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="declRecLetsName" kind="sem">

```mc
sem declRecLetsName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem declRecLetsName = | names -> getName (names.consNames) "RecLetsDeclAst_DeclRecLets"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="declConDefName" kind="sem">

```mc
sem declConDefName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem declConDefName = | names -> getName (names.consNames) "DataDeclAst_DeclConDef"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmConAppName" kind="sem">

```mc
sem tmConAppName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tmConAppName = | names -> getName (names.consNames) "DataAst_TmConApp"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="declTypeName" kind="sem">

```mc
sem declTypeName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem declTypeName = | names -> getName (names.consNames) "TypeDeclAst_DeclType"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tmNeverName" kind="sem">

```mc
sem tmNeverName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tmNeverName = | names -> getName (names.consNames) "NeverAst_TmNever"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="listConsName" kind="sem">

```mc
sem listConsName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem listConsName = | names -> getName (names.consNames) "Cons"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="listNilName" kind="sem">

```mc
sem listNilName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem listNilName = | names -> getName (names.consNames) "Nil"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoName" kind="sem">

```mc
sem infoName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem infoName = | names -> getName (names.consNames) "Info"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="noInfoName" kind="sem">

```mc
sem noInfoName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem noInfoName = | names -> getName (names.consNames) "NoInfo"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyAppName" kind="sem">

```mc
sem tyAppName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tyAppName = | names -> getName (names.tyConsNames) "AppTypeAst_TyApp"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyVarName" kind="sem">

```mc
sem tyVarName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tyVarName = | names -> getName (names.tyConsNames) "VarTypeAst_TyVar"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyIntName" kind="sem">

```mc
sem tyIntName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tyIntName = | names -> getName (names.tyConsNames) "IntTypeAst_TyInt"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyBoolName" kind="sem">

```mc
sem tyBoolName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tyBoolName = | names -> getName (names.tyConsNames) "BoolTypeAst_TyBool"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyFloatName" kind="sem">

```mc
sem tyFloatName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tyFloatName = | names -> getName (names.tyConsNames) "FloatTypeAst_TyFloat"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyCharName" kind="sem">

```mc
sem tyCharName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tyCharName = | names -> getName (names.tyConsNames) "CharTypeAst_TyChar"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyUnknownName" kind="sem">

```mc
sem tyUnknownName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tyUnknownName = | names -> getName (names.tyConsNames) "UnknownTypeAst_TyUnknown"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyArrowName" kind="sem">

```mc
sem tyArrowName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tyArrowName = | names -> getName (names.tyConsNames) "FunTypeAst_TyArrow"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapFromSeqName" kind="sem">

```mc
sem mapFromSeqName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapFromSeqName = | names -> getName (names.otherFuncs) "mapFromSeq"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapToSeqName" kind="sem">

```mc
sem mapToSeqName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapToSeqName = | names -> getName (names.otherFuncs) "mapToSeq"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="noSymbolName" kind="sem">

```mc
sem noSymbolName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem noSymbolName = | names -> getName (names.otherFuncs) "_noSymbol"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="stringToSidName" kind="sem">

```mc
sem stringToSidName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem stringToSidName = | names -> getName (names.otherFuncs) "stringToSid"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mexprStringName" kind="sem">

```mc
sem mexprStringName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mexprStringName = | names -> getName (names.otherFuncs) "toString"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patIntName" kind="sem">

```mc
sem patIntName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patIntName = | names -> getName (names.consNames) "IntPat_PatInt"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patBoolName" kind="sem">

```mc
sem patBoolName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patBoolName = | names -> getName (names.consNames) "BoolPat_PatBool"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patCharName" kind="sem">

```mc
sem patCharName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patCharName = | names -> getName (names.consNames) "CharPat_PatChar"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patSeqTotName" kind="sem">

```mc
sem patSeqTotName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patSeqTotName = | names -> getName (names.consNames) "SeqTotPat_PatSeqTot"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patSeqEdgeName" kind="sem">

```mc
sem patSeqEdgeName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patSeqEdgeName = | names -> getName (names.consNames) "SeqEdgePat_PatSeqEdge"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patRecName" kind="sem">

```mc
sem patRecName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patRecName = | names -> getName (names.consNames) "RecordPat_PatRecord"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patConName" kind="sem">

```mc
sem patConName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patConName = | names -> getName (names.consNames) "DataPat_PatCon"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patAndName" kind="sem">

```mc
sem patAndName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patAndName = | names -> getName (names.consNames) "AndPat_PatAnd"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patOrName" kind="sem">

```mc
sem patOrName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patOrName = | names -> getName (names.consNames) "OrPat_PatOr"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patNotName" kind="sem">

```mc
sem patNotName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patNotName = | names -> getName (names.consNames) "NotPat_PatNot"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patNamedName" kind="sem">

```mc
sem patNamedName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patNamedName = | names -> getName (names.consNames) "NamedPat_PatNamed"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pNameName" kind="sem">

```mc
sem pNameName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pNameName = | names -> getName (names.consNames) "PName"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pWildcardName" kind="sem">

```mc
sem pWildcardName : SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pWildcardName = | names -> getName (names.consNames) "PWildcard"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getConstString" kind="sem">

```mc
sem getConstString : ConstAst_Const -> String
```

<Description>{`Return a string representation of the constant along with whether  
it takes an argument when constructedNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getConstString =
  | CInt _ -> "int"
  | CFloat _ -> "float"
  | CBool _ -> "bool"
  | CChar _ -> "char"
  | CSymb _ -> "symb"
  | t -> getConstStringCode 0 t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getBuiltinName" kind="sem">

```mc
sem getBuiltinName : String -> SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getBuiltinName str = | names ->
    match mapLookup str builtinsMapping with Some astStr then
      getName (names.builtinsNames) astStr
    else error (join ["Could not find ", str, " in builtin-mapping"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getBuiltinNameFromConst" kind="sem">

```mc
sem getBuiltinNameFromConst : ConstAst_Const -> SpecializeUtils_SpecializeNames -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getBuiltinNameFromConst val = | names ->
    let str = getConstString val in
    getBuiltinName str names
```
</ToggleWrapper>
</DocBlock>

