import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# json-debug.mc  
  

This file supplies a set of functions for dumping MExpr ASTs to  
json, which can then be printed and examined in various other tools  
for exploring json values.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/json.mc"} style={S.link}>json.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>mexpr/pprint.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/type.mc"} style={S.link}>mexpr/type.mc</a>, <a href={"/docs/Stdlib/mlang/ast.mc"} style={S.link}>mlang/ast.mc</a>  
  
## Languages  
  

          <DocBlock title="AstToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-AstToJson">

```mc
lang AstToJson
```



<ToggleWrapper text="Code..">
```mc
lang AstToJson = Ast + DeclAst
  sem exprToJson : Expr -> JsonValue
  sem exprToJson =
  | tm -> error (join ["Missing case in exprToJson ", info2str (infoTm tm)])
  sem typeToJson : Type -> JsonValue
  sem typeToJson =
  | ty -> error (join ["Missing case in typeToJson ", info2str (infoTy ty)])
  sem kindToJson : Kind -> JsonValue
  sem patToJson : Pat -> JsonValue
  sem patToJson =
  | pat -> error (join ["Missing case in patToJson ", info2str (infoPat pat)])
  sem declToJson : Decl -> JsonValue
  sem declToJson =
  | decl -> error (join ["Missing case in declToJson ", info2str (infoDecl decl)])

  sem optToNull : Option JsonValue -> JsonValue
  sem optToNull =
  | Some x -> x
  | None _ -> JsonNull ()

  sem nameToJson : Name -> JsonValue
  sem nameToJson = | name ->
    JsonArray [JsonString (nameGetStr name), optToNull (optionMap (lam x. JsonInt (sym2hash x)) (nameGetSym name))]

  sem patNameToJson : PatName -> JsonValue
  sem patNameToJson =
  | PName n -> nameToJson n
  | PWildcard _ -> JsonString "_"

  sem infoToJson : Info -> JsonValue
  sem infoToJson = | info -> JsonString (info2str info)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VarToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-VarToJson">

```mc
lang VarToJson
```



<ToggleWrapper text="Code..">
```mc
lang VarToJson = AstToJson + VarAst
  sem exprToJson =
  | TmVar x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmVar")
    , ("ident", nameToJson x.ident)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    , ("frozen", JsonBool x.frozen)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AppToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-AppToJson">

```mc
lang AppToJson
```



<ToggleWrapper text="Code..">
```mc
lang AppToJson = AstToJson + AppAst
  sem exprToJson =
  | TmApp x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmApp")
    , ("lhs", exprToJson x.lhs)
    , ("rhs", exprToJson x.rhs)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LamToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-LamToJson">

```mc
lang LamToJson
```



<ToggleWrapper text="Code..">
```mc
lang LamToJson = AstToJson + LamAst
  sem exprToJson =
  | TmLam x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmLam")
    , ("ident", nameToJson x.ident)
    , ("tyAnnot", typeToJson x.tyAnnot)
    , ("tyParam", typeToJson x.tyParam)
    , ("body", exprToJson x.body)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DeclToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-DeclToJson">

```mc
lang DeclToJson
```



<ToggleWrapper text="Code..">
```mc
lang DeclToJson = AstToJson + DeclAst
  sem exprToJson =
  | tm & TmDecl x ->
    recursive let work = lam acc. lam tm.
      match tm with TmDecl x
      then work (snoc acc x.decl) x.inexpr
      else (acc, tm) in
    match work [] tm with (decls, inexpr) in
    JsonObject (mapFromSeq cmpString
      [ ("con", JsonString "TmDecl (merged)")
      , ("decls", JsonArray (map declToJson decls))
      , ("inexpr", exprToJson inexpr)
      , ("ty", typeToJson x.ty)
      , ("info", infoToJson x.info)
      ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ConstToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-ConstToJson">

```mc
lang ConstToJson
```



<ToggleWrapper text="Code..">
```mc
lang ConstToJson = AstToJson + ConstAst + ConstPrettyPrint
  sem exprToJson =
  | TmConst x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmConst")
    , ("const", JsonString (getConstStringCode 0 x.val))
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeqToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-SeqToJson">

```mc
lang SeqToJson
```



<ToggleWrapper text="Code..">
```mc
lang SeqToJson = AstToJson + SeqAst
  sem exprToJson =
  | TmSeq x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmSeq")
    , ("tms", JsonArray (map exprToJson x.tms))
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecordToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-RecordToJson">

```mc
lang RecordToJson
```



<ToggleWrapper text="Code..">
```mc
lang RecordToJson = AstToJson + RecordAst
  sem exprToJson =
  | TmRecord x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmRecord")
    , ("bindings", JsonObject
      (mapFromSeq cmpString
        (map (lam x. (sidToString x.0, exprToJson x.1))
          (mapBindings x.bindings))))
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
  | TmRecordUpdate x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmRecordUpdate")
    , ("rec", exprToJson x.rec)
    , ("key", JsonString (sidToString x.key))
    , ("value", exprToJson x.value)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ConAppToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-ConAppToJson">

```mc
lang ConAppToJson
```



<ToggleWrapper text="Code..">
```mc
lang ConAppToJson = AstToJson + DataAst
  sem exprToJson =
  | TmConApp x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmConApp")
    , ("ident", nameToJson x.ident)
    , ("body", exprToJson x.body)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MatchToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-MatchToJson">

```mc
lang MatchToJson
```



<ToggleWrapper text="Code..">
```mc
lang MatchToJson = AstToJson + MatchAst
  sem exprToJson =
  | TmMatch x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmMatch")
    , ("target", exprToJson x.target)
    , ("pat", patToJson x.pat)
    , ("thn", exprToJson x.thn)
    , ("els", exprToJson x.els)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="NeverToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-NeverToJson">

```mc
lang NeverToJson
```



<ToggleWrapper text="Code..">
```mc
lang NeverToJson = AstToJson + NeverAst
  sem exprToJson =
  | TmNever x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmNever")
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="NamedPatToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-NamedPatToJson">

```mc
lang NamedPatToJson
```



<ToggleWrapper text="Code..">
```mc
lang NamedPatToJson = AstToJson + NamedPat
  sem patToJson =
  | PatNamed x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatNamed")
    , ("ident", patNameToJson x.ident)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeqTotPatToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-SeqTotPatToJson">

```mc
lang SeqTotPatToJson
```



<ToggleWrapper text="Code..">
```mc
lang SeqTotPatToJson = AstToJson + SeqTotPat
  sem patToJson =
  | PatSeqTot x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatSeqTot")
    , ("pats", JsonArray (map patToJson x.pats))
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeqEdgePatToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-SeqEdgePatToJson">

```mc
lang SeqEdgePatToJson
```



<ToggleWrapper text="Code..">
```mc
lang SeqEdgePatToJson = AstToJson + SeqEdgePat
  sem patToJson =
  | PatSeqEdge x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatSeqEdge")
    , ("prefix", JsonArray (map patToJson x.prefix))
    , ("middle", patNameToJson x.middle)
    , ("postfix", JsonArray (map patToJson x.postfix))
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecordPatToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-RecordPatToJson">

```mc
lang RecordPatToJson
```



<ToggleWrapper text="Code..">
```mc
lang RecordPatToJson = AstToJson + RecordPat
  sem patToJson =
  | PatRecord x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatRecord")
    , ("bindings", JsonObject
      (mapFromSeq cmpString
        (map (lam x. (sidToString x.0, patToJson x.1))
          (mapBindings x.bindings))))
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DataPatToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-DataPatToJson">

```mc
lang DataPatToJson
```



<ToggleWrapper text="Code..">
```mc
lang DataPatToJson = AstToJson + DataPat
  sem patToJson =
  | PatCon x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatCon")
    , ("ident", nameToJson x.ident)
    , ("subpat", patToJson x.subpat)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IntPatToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-IntPatToJson">

```mc
lang IntPatToJson
```



<ToggleWrapper text="Code..">
```mc
lang IntPatToJson = AstToJson + IntPat
  sem patToJson =
  | PatInt x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatInt")
    , ("val", JsonInt x.val)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CharPatToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-CharPatToJson">

```mc
lang CharPatToJson
```



<ToggleWrapper text="Code..">
```mc
lang CharPatToJson = AstToJson + CharPat
  sem patToJson =
  | PatChar x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatChar")
    , ("val", JsonString [x.val])
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BoolPatToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-BoolPatToJson">

```mc
lang BoolPatToJson
```



<ToggleWrapper text="Code..">
```mc
lang BoolPatToJson = AstToJson + BoolPat
  sem patToJson =
  | PatBool x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatBool")
    , ("val", JsonBool x.val)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AndPatToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-AndPatToJson">

```mc
lang AndPatToJson
```



<ToggleWrapper text="Code..">
```mc
lang AndPatToJson = AstToJson + AndPat
  sem patToJson =
  | PatAnd x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatAnd")
    , ("lpat", patToJson x.lpat)
    , ("rpat", patToJson x.rpat)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OrPatToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-OrPatToJson">

```mc
lang OrPatToJson
```



<ToggleWrapper text="Code..">
```mc
lang OrPatToJson = AstToJson + OrPat
  sem patToJson =
  | PatOr x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatOr")
    , ("lpat", patToJson x.lpat)
    , ("rpat", patToJson x.rpat)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="NotPatToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-NotPatToJson">

```mc
lang NotPatToJson
```



<ToggleWrapper text="Code..">
```mc
lang NotPatToJson = AstToJson + NotPat
  sem patToJson =
  | PatNot x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatNot")
    , ("subpat", patToJson x.subpat)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="UnknownTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-UnknownTypeToJson">

```mc
lang UnknownTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang UnknownTypeToJson = AstToJson + UnknownTypeAst
  sem typeToJson =
  | TyUnknown x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyUnknown")
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BoolTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-BoolTypeToJson">

```mc
lang BoolTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang BoolTypeToJson = AstToJson + BoolTypeAst
  sem typeToJson =
  | TyBool x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyBool")
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IntTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-IntTypeToJson">

```mc
lang IntTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang IntTypeToJson = AstToJson + IntTypeAst
  sem typeToJson =
  | TyInt x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyInt")
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FloatTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-FloatTypeToJson">

```mc
lang FloatTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang FloatTypeToJson = AstToJson + FloatTypeAst
  sem typeToJson =
  | TyFloat x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyFloat")
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CharTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-CharTypeToJson">

```mc
lang CharTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang CharTypeToJson = AstToJson + CharTypeAst
  sem typeToJson =
  | TyChar x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyChar")
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FunTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-FunTypeToJson">

```mc
lang FunTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang FunTypeToJson = AstToJson + FunTypeAst
  sem typeToJson =
  | TyArrow x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyArrow")
    , ("from", typeToJson x.from)
    , ("to", typeToJson x.to)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeqTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-SeqTypeToJson">

```mc
lang SeqTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang SeqTypeToJson = AstToJson + SeqTypeAst
  sem typeToJson =
  | TySeq x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TySeq")
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TensorTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-TensorTypeToJson">

```mc
lang TensorTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang TensorTypeToJson = AstToJson + TensorTypeAst
  sem typeToJson =
  | TyTensor x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyTensor")
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecordTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-RecordTypeToJson">

```mc
lang RecordTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang RecordTypeToJson = AstToJson + RecordTypeAst
  sem typeToJson =
  | TyRecord x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyRecord")
    , ("fields", JsonObject
      (mapFromSeq cmpString
        (map (lam x. (sidToString x.0, typeToJson x.1))
          (mapBindings x.fields))))
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VariantTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-VariantTypeToJson">

```mc
lang VariantTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang VariantTypeToJson = AstToJson + VariantTypeAst
  sem typeToJson =
  | TyVariant x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyVariant")
    , ("constrs", JsonArray
      (map (lam x. JsonArray [nameToJson x.0, typeToJson x.1])
        (mapBindings x.constrs)))
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ConTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-ConTypeToJson">

```mc
lang ConTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang ConTypeToJson = AstToJson + ConTypeAst
  sem typeToJson =
  | TyCon x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyCon")
    , ("ident", nameToJson x.ident)
    , ("data", typeToJson x.data)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DataTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-DataTypeToJson">

```mc
lang DataTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang DataTypeToJson = AstToJson + DataTypeAst
  sem typeToJson =
  | TyData x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyData")
    , ("universe", JsonArray
      (map (lam x. JsonArray [nameToJson x.0, JsonArray (map nameToJson (setToSeq x.1))])
        (mapBindings x.universe)))
    , ("positive", JsonBool x.positive)
    , ("cons", JsonArray (map nameToJson (setToSeq x.cons)))
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VarTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-VarTypeToJson">

```mc
lang VarTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang VarTypeToJson = AstToJson + VarTypeAst
  sem typeToJson =
  | TyVar x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyVar")
    , ("ident", nameToJson x.ident)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AllTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-AllTypeToJson">

```mc
lang AllTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang AllTypeToJson = AstToJson + AllTypeAst
  sem typeToJson =
  | TyAll x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyAll")
    , ("ident", nameToJson x.ident)
    , ("kind", kindToJson x.kind)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AppTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-AppTypeToJson">

```mc
lang AppTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang AppTypeToJson = AstToJson + AppTypeAst
  sem typeToJson =
  | TyApp x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyApp")
    , ("lhs", typeToJson x.lhs)
    , ("rhs", typeToJson x.rhs)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AliasTypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-AliasTypeToJson">

```mc
lang AliasTypeToJson
```



<ToggleWrapper text="Code..">
```mc
lang AliasTypeToJson = AstToJson + AliasTypeAst
  sem typeToJson =
  | TyAlias x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyAlias")
    , ("display", typeToJson x.display)
    , ("content", typeToJson x.content)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PolyKindToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-PolyKindToJson">

```mc
lang PolyKindToJson
```



<ToggleWrapper text="Code..">
```mc
lang PolyKindToJson = AstToJson + PolyKindAst
  sem kindToJson =
  | Poly _ -> JsonString "Poly"
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MonoKindToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-MonoKindToJson">

```mc
lang MonoKindToJson
```



<ToggleWrapper text="Code..">
```mc
lang MonoKindToJson = AstToJson + MonoKindAst
  sem kindToJson =
  | Mono _ -> JsonString "Mono"
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecordKindToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-RecordKindToJson">

```mc
lang RecordKindToJson
```



<ToggleWrapper text="Code..">
```mc
lang RecordKindToJson = AstToJson + RecordKindAst
  sem kindToJson =
  | Record x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "Record")
    , ("bindings", JsonObject
      (mapFromSeq cmpString
        (map (lam x. (sidToString x.0, typeToJson x.1))
          (mapBindings x.fields))))
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DataKindToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-DataKindToJson">

```mc
lang DataKindToJson
```



<ToggleWrapper text="Code..">
```mc
lang DataKindToJson = AstToJson + DataKindAst
  sem kindToJson =
  | Data x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "Data")
    , ("types",
      let inner = lam r. JsonObject (mapFromSeq cmpString
        [ ("lower", JsonArray (map nameToJson (setToSeq r.lower)))
        , ("upper", optToNull
          (optionMap (lam upper. JsonArray (map nameToJson (setToSeq upper)))
            r.upper))
        ] ) in
      JsonArray (map (lam x. JsonArray [nameToJson x.0, inner x.1])
        (mapBindings x.types)))
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="UseToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-UseToJson">

```mc
lang UseToJson
```



<ToggleWrapper text="Code..">
```mc
lang UseToJson = AstToJson + UseDeclAst
  -- TODO(vipa, 2024-05-17): This should probably actually be a Decl,
  -- it's just not a good idea to do a \\`use\\` on the top-level right
  -- now because of how includes work.
  sem declToJson =
  | DeclUse x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclUse")
    , ("ident", nameToJson x.ident)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LetToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-LetToJson">

```mc
lang LetToJson
```



<ToggleWrapper text="Code..">
```mc
lang LetToJson = LetDeclAst + AstToJson
  sem declToJson =
  | DeclLet x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclLet")
    , ("ident", nameToJson x.ident)
    , ("tyAnnot", typeToJson x.tyAnnot)
    , ("tyBody", typeToJson x.tyBody)
    , ("body", exprToJson x.body)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TypeToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-TypeToJson">

```mc
lang TypeToJson
```

<Description>{`DeclType \-\-`}</Description>


<ToggleWrapper text="Code..">
```mc
lang TypeToJson = TypeDeclAst + AstToJson
  sem declToJson =
  | DeclType x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclType")
    , ("ident", nameToJson x.ident)
    , ("params", JsonArray (map nameToJson x.params))
    , ("tyIdent", typeToJson x.tyIdent)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecLetsToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-RecLetsToJson">

```mc
lang RecLetsToJson
```

<Description>{`DeclRecLets \-\-`}</Description>


<ToggleWrapper text="Code..">
```mc
lang RecLetsToJson = RecLetsDeclAst + RecLetsDeclAst + AstToJson
  sem declToJson =
  | DeclRecLets x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclRecLets")
    , ( "bindings"
      , let bindingToJson = lam b. JsonObject (mapFromSeq cmpString
          [ ("ident", nameToJson b.ident)
          , ("tyAnnot", typeToJson b.tyAnnot)
          , ("tyBody", typeToJson b.tyBody)
          , ("body", exprToJson b.body)
          , ("info", infoToJson b.info)
          ] ) in
        JsonArray (map bindingToJson x.bindings)
      )
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DataToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-DataToJson">

```mc
lang DataToJson
```

<Description>{`DeclConDef \-\-`}</Description>


<ToggleWrapper text="Code..">
```mc
lang DataToJson = DataDeclAst + AstToJson
  sem declToJson =
  | DeclConDef x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclConDef")
    , ("ident", nameToJson x.ident)
    , ("tyIdent", typeToJson x.tyIdent)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="UtestToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-UtestToJson">

```mc
lang UtestToJson
```

<Description>{`DeclUtest \-\-`}</Description>


<ToggleWrapper text="Code..">
```mc
lang UtestToJson = UtestDeclAst + AstToJson
  sem declToJson =
  | DeclUtest x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclUtest")
    , ("test", exprToJson x.test)
    , ("expected", exprToJson x.expected)
    , ("tusing", optToNull (optionMap exprToJson x.tusing))
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ExtToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-ExtToJson">

```mc
lang ExtToJson
```

<Description>{`DeclExt \-\-`}</Description>


<ToggleWrapper text="Code..">
```mc
lang ExtToJson = ExtDeclAst + AstToJson
  sem declToJson =
  | DeclExt x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclExt")
    , ("ident", nameToJson x.ident)
    , ("tyIdent", typeToJson x.tyIdent)
    , ("effect", JsonBool x.effect)
    , ("info", infoToJson x.info)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MLangProgramToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-MLangProgramToJson">

```mc
lang MLangProgramToJson
```



<ToggleWrapper text="Code..">
```mc
lang MLangProgramToJson = MLangTopLevel + AstToJson
  sem progToJson =
  | x -> JsonObject (mapFromSeq cmpString
    [ ("decls", JsonArray (map declToJson x.decls))
    , ("expr", exprToJson x.expr)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MetaVarToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-MetaVarToJson">

```mc
lang MetaVarToJson
```



<ToggleWrapper text="Code..">
```mc
lang MetaVarToJson = AstToJson + MetaVarTypeAst
  sem typeToJson =
  | TyMetaVar x ->
    let contents = switch deref x.contents
      case Unbound u then
        JsonObject (mapFromSeq cmpString
          [ ("ident", nameToJson u.ident)
          , ("level", JsonInt u.level)
          , ("kind", kindToJson u.kind)
          ])
      case Link ty then
        typeToJson ty
      end in
    JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyMetaVar")
    , ("contents", contents)
    ] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprToJson" kind="lang" link="/docs/Stdlib/mexpr/json-debug.mc/lang-MExprToJson">

```mc
lang MExprToJson
```



<ToggleWrapper text="Code..">
```mc
lang MExprToJson
  = VarToJson
  + AppToJson
  + LamToJson
  + DeclToJson
  + ConstToJson
  + SeqToJson
  + RecordToJson
  + ConAppToJson
  + MatchToJson
  + NeverToJson
  + NamedPatToJson
  + SeqTotPatToJson
  + SeqEdgePatToJson
  + RecordPatToJson
  + DataPatToJson
  + IntPatToJson
  + CharPatToJson
  + BoolPatToJson
  + AndPatToJson
  + OrPatToJson
  + NotPatToJson
  + UnknownTypeToJson
  + BoolTypeToJson
  + IntTypeToJson
  + FloatTypeToJson
  + CharTypeToJson
  + FunTypeToJson
  + SeqTypeToJson
  + TensorTypeToJson
  + RecordTypeToJson
  + VariantTypeToJson
  + ConTypeToJson
  + DataTypeToJson
  + VarTypeToJson
  + AllTypeToJson
  + AppTypeToJson
  + AliasTypeToJson
  + PolyKindToJson
  + MonoKindToJson
  + RecordKindToJson
  + DataKindToJson
  + UseToJson
  + LetToJson
  + TypeToJson
  + RecLetsToJson
  + DataToJson
  + UtestToJson
  + ExtToJson
  + MetaVarToJson
end
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr

use MExprToJson in

utest json2string (exprToJson unit_) with "{\"ty\":{\"con\":\"TyRecord\",\"info\":\"<No file info>\",\"fields\":{}},\"con\":\"TmRecord\",\"info\":\"<No file info>\",\"bindings\":{}}" in

()
```
</ToggleWrapper>
</DocBlock>

