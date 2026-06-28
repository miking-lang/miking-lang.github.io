import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SemDeclCompiler  
  

  
  
  
## Semantics  
  

          <DocBlock title="compileSem" kind="sem">

```mc
sem compileSem : all a. String -> CompilationContext -> a -> Ast_Decl -> {body: Ast_Expr, info: Info, ident: Name, tyBody: Ast_Type, tyAnnot: Ast_Type}
```



<ToggleWrapper text="Code..">
```mc
sem compileSem langStr ctx semNames =
  | DeclSem d ->
    -- If this semantic function does not have a type annotation, copy the
    -- type annotation from the base semantic function.
    let baseIdent = (match mapLookup (langStr, nameGetStr d.ident) ctx.compositionCheckEnv.baseMap with Some ident in ident) in
    let baseTyAnnot = match mapLookup baseIdent ctx.compositionCheckEnv.semBaseToTyAnnot with Some ty in ty in
    let tyAnnot = match d.tyAnnot with TyUnknown _ then baseTyAnnot else d.tyAnnot in

    -- Create substitution function for param aliasing
    let args = match d.args with Some args then args else [] in
    let argsIdents : [Name] = map (lam a. a.ident) args in

    let targetName = nameSym "target" in
    let target = nvar_ targetName in

    recursive
      let compileBody = lam cases : [{pat : Pat, thn : Expr}].
        match cases with [h] ++ t then
          TmMatch {target = target,
                   pat = h.pat,
                   thn = h.thn,
                   els = compileBody t,
                   ty = tyunknown_,
                   info = d.info}
        -- else (error_ (str_ "Inexhaustive match!"))
        else
          let s = join ["Inexhaustive match in ", langStr, ".", nameGetStr d.ident, "!\n"] in
          semi_ (print_ (str_ s)) (inever_ d.info)
    in
    let compileBodyHelper = lam cases : [{pat : Pat, thn : Expr}].
      if null cases then
        error_ (str_ (join ["Semantic function without cases: ", langStr, ".", nameGetStr d.ident, "!\n"]))
      else
        compileBody cases
    in
    let cases = match mapLookup (langStr, nameGetStr d.ident) ctx.compositionCheckEnv.semPatMap
                with Some x then x
                else error "CompositionCheckEnv must contain the ordered cases for all semantic functions!"
    in

    let curTyVarSymbols = match mapLookup (langStr, nameGetStr d.ident) ctx.compositionCheckEnv.semTyVarMap with Some ns in ns in

    -- Substitute parameters, sem symbols and type variables.
    --
    -- We substitute the parameters because semantic functions are allowed
    -- to have different parameter names than the sems they include as long
    -- as the amount of parameters is the same (this is checked by
    -- composition-check.mc). To handle the case in which the parameter names
    -- are different, we must perform a substitution.
    --
    -- For any included cases, we look at the origin language of this case. Any
    -- sem names belonging to the origin language are substituted to the name
    -- of the language fragment we are compiling. We do not just substitute the
    -- name of the current sem, but of all sems in the langauge fragment in order
    -- to properly handle mutual recursion.
    --
    -- Since semantic funtions can have different type annotations introducing
    -- different symbols, and these symbols may be used in the case bodies,
    -- we also substitute these symbols.
    let work = lam c.
      let origArgs : Option [Name] = match mapLookup c.orig ctx.compositionCheckEnv.semArgsMap with Some args in args in
      let origArgs : [Name] = match origArgs with Some args then args else [] in

      let origTyVarSymbols = match mapLookup c.orig ctx.compositionCheckEnv.semTyVarMap with Some ns in ns in

      let pairs = join [
        zip origArgs argsIdents,
        createPairsForSubst ctx c.orig.0 langStr,
        zip origTyVarSymbols curTyVarSymbols
      ] in

      let subst = mapFromSeq nameCmp pairs in
      {c with thn = substituteIdentifiersExpr subst c.thn} in
    let cases = map work cases in

    let cases = map (lam c. {thn = c.thn, pat = c.pat}) cases in
    let body = compileBodyHelper cases in
    recursive let compileArgs = lam args.
          match args with [h] ++ t then
            TmLam {ident = h.ident,
                   tyAnnot = h.tyAnnot,
                   tyParam = tyunknown_,
                   body = compileArgs t,
                   ty = tyunknown_,
                   info = d.info}
          else
            TmLam {ident = targetName,
                   tyAnnot = tyunknown_,
                   tyParam = tyunknown_,
                   body = body,
                   ty = tyunknown_,
                   info = d.info}
    in
    let result = compileArgs (optionGetOrElse (lam. []) d.args) in
    match d.args with Some _ then
      {ident = d.ident,
      tyAnnot = tyAnnot,
      tyBody = tyunknown_,
      body = result,
      info = d.info}
    else
      {ident = d.ident,
      tyAnnot = tyAnnot,
      tyBody = tyunknown_,
      body = (nulam_ (nameSym "") (error_ (str_ (join ["Semantic function without cases!: ", langStr, ".", nameGetStr d.ident])))),
      info = d.info}
```
</ToggleWrapper>
</DocBlock>

