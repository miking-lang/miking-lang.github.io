import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlDataConversionHelpers  
  

  
  
  
## Semantics  
  

          <DocBlock title="_convertElements" kind="sem">

```mc
sem _convertElements : Int -> Ast_Expr -> Info -> GenerateEnv -> Ast_Expr -> (Ast_Type, Ast_Type) -> (Int, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _convertElements approxsize mapop info env t =
  | (ty1, ty2) ->
    let ident = nameSym "x" in
    let var =
      TmVar {
        ident = ident,
        ty = TyUnknown { info = info },
        info = info,
        frozen = false
      }
    in
    match convertData info env var (ty1, ty2) with (cost, body) in
    let t =
      if gti cost 0 then
        TmApp {
          lhs = TmApp {
                  lhs = mapop,
                  rhs =
                    TmLam {
                      ident = ident,
                      tyAnnot = TyUnknown { info = info },
                      tyParam = TyUnknown { info = info },
                      body = body,
                      ty = TyUnknown { info = info },
                      info = info
                    },
                  ty = TyUnknown { info = info },
                  info = info
                },
          rhs = t,
          ty = TyUnknown { info = info },
          info = info
        }
      else t
    in
    (muli approxsize cost, t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="convertContainer" kind="sem">

```mc
sem convertContainer : Ast_Expr -> Int -> Int -> Ast_Expr -> Info -> GenerateEnv -> Ast_Expr -> (Ast_Type, Ast_Type) -> (Int, Ast_Expr)
```

<Description>{`Helper function to convert a container. The conversion cost and converted term.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem convertContainer op opcost approxsize mapop info env t =
  | (ty1, ty2) ->
    match _convertElements _approxsize mapop info env t (ty1, ty2)
    with (cost, t) in
    let t =
       TmApp {
          lhs = op,
          rhs = t,
          ty = TyUnknown { info = info },
          info = info
        }
     in
     (addi cost opcost, t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="convertTuple" kind="sem">

```mc
sem convertTuple : Info -> GenerateEnv -> Bool -> Ast_Expr -> Map SID Ast_Type -> [Ast_Type] -> (Int, Ast_Expr)
```

<Description>{`Helper function to convert OCaml tuples to/from MExpr records. The conversion cost and converted term.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem convertTuple info env ty1ToTy2 t fields =
  | tys ->
    let ns = create (length tys) (lam. nameSym "t") in
    let pvars =
      map (lam n. PatNamed { ident = PName n, info = info, ty = tyunknown_ }) ns
    in
    let tpat = OPatTuple { pats = pvars } in
    let costsTs =
      mapi
        (lam i. lam x : (Name, Type).
          match x with (ident, ty1) then
            let sid = stringToSid (int2string i) in
            match mapLookup sid fields with Some ty2 then
              let var =
                TmVar {
                  ident = ident,
                  ty = TyUnknown { info = info },
                  info = info,
                  frozen = false
                }
              in
              if ty1ToTy2 then convertData info env var (ty1, ty2)
              else convertData info env var (ty2, ty1)
            else
              errorSingle [info] "Cannot convert tuple"
          else never)
        (zip ns tys)
    in
    match unzip costsTs with (costs, ts) then
      let cost = foldl1 addi costs in
      if eqi cost 0 then
        (0, t)
      else
        let t =
          OTmMatch {
            target = t,
            arms = [(OPatTuple { pats = pvars }, OTmTuple { values = ts })]
          }
        in
        (addi _tupleConversionCost cost , t)
    else never
```
</ToggleWrapper>
</DocBlock>

