import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MLangPipeline  
  

  
  
  
## Semantics  
  

          <DocBlock title="myEval" kind="sem">

```mc
sem myEval : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem myEval =| e ->
    eval (evalCtxEmpty ()) e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileMLangToOcaml" kind="sem">

```mc
sem compileMLangToOcaml : all a. _a1 -> (_a1 -> String -> Ast_Expr -> a) -> String -> ()
```

<Description>{`TODO: add node count for MLang programs to phase\-stats`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileMLangToOcaml options runner =| filepath ->
    let log = mkPhaseLogState options.debugDumpPhases options.debugPhases in

    let p = parseAndHandleIncludes filepath in
    endPhaseStatsProg log "parsing-include-handling" p;

    let p = constTransformProgram builtin p in
    endPhaseStatsProg log "const-transformation" p;

    let p = composeProgram p in
    endPhaseStatsProg log "language-inclusion-generation" p;

    match symbolizeMLang symEnvDefault p with (_, p) in
    endPhaseStatsProg log "symbolization" p;

    let checkOptions = {defaultCompositionCheckOptions with
      disableStrictSumExtension = options.disableStrictSumExtension} in
    match result.consume (checkCompositionWithOptions checkOptions p) with (_, res) in
    endPhaseStatsExpr log "composition-check" uunit_;

    -- let p = typeCheckProgram p in
    -- endPhaseStatsExpr log "mlang-type-checking" uunit_;

    switch res
      case Left errs then
        iter raiseError errs ;
        never
      case Right env then
        let ctx = _emptyCompilationContext env in
        let res = result.consume (compile ctx p) in
        match res with (_, rhs) in
        match rhs with Right expr in
        endPhaseStatsExpr log "mlang-mexpr-lower" expr;

        let expr = postprocess env.semSymMap expr in
        endPhaseStatsExpr log "postprocess" expr;

        -- printLn (expr2str expr);

        runner options filepath expr;
        ()
    end
```
</ToggleWrapper>
</DocBlock>

