import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# main.mc  
  

The main file of the MLang pipline.  
The semantic function \`compileMLangToOcaml\`, takes a filepath as input.  
It then puts the program at this file through the MLang pipeline and then  
compiles it to OCaml.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/result.mc"} style={S.link}>result.mc</a>, <a href={"/docs/Stdlib/fileutils.mc"} style={S.link}>fileutils.mc</a>, <a href={"/docs/Stdlib/sys.mc"} style={S.link}>sys.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/mlang/compile.mc"} style={S.link}>compile.mc</a>, <a href={"/docs/Stdlib/mlang/boot-parser.mc"} style={S.link}>boot-parser.mc</a>, <a href={"/docs/Stdlib/mlang/ast-builder.mc"} style={S.link}>ast-builder.mc</a>, <a href={"/docs/Stdlib/mlang/symbolize.mc"} style={S.link}>symbolize.mc</a>, <a href={"/docs/Stdlib/mlang/composition-check.mc"} style={S.link}>composition-check.mc</a>, <a href={"/docs/Stdlib/mlang/include-handler.mc"} style={S.link}>include-handler.mc</a>, <a href={"/docs/Stdlib/mlang/language-composer.mc"} style={S.link}>language-composer.mc</a>, <a href={"/docs/Stdlib/mlang/const-transformer.mc"} style={S.link}>const-transformer.mc</a>, <a href={"/docs/Stdlib/mlang/postprocess.mc"} style={S.link}>postprocess.mc</a>, <a href={"/docs/Stdlib/mlang/type-check.mc"} style={S.link}>type-check.mc</a>, <a href={"/docs/Stdlib/mexpr/eval.mc"} style={S.link}>mexpr/eval.mc</a>, <a href={"/docs/Stdlib/mexpr/builtin.mc"} style={S.link}>mexpr/builtin.mc</a>, <a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>mexpr/ast-builder.mc</a>, <a href={"/docs/Stdlib/mexpr/phase-stats.mc"} style={S.link}>mexpr/phase-stats.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>mexpr/pprint.mc</a>  
  
## Languages  
  

          <DocBlock title="MLangPipeline" kind="lang" link="/docs/Stdlib/mlang/main.mc/lang-MLangPipeline">

```mc
lang MLangPipeline
```



<ToggleWrapper text="Code..">
```mc
lang MLangPipeline = MLangCompiler + BootParserMLang +
                     MLangSym + MLangCompositionCheck +
                     MExprPrettyPrint + MExprEval + MExprEq +
                     MLangConstTransformer + MLangIncludeHandler +
                     PhaseStats + LanguageComposer + PostProcess

  sem myEval : Expr -> Expr
  sem myEval =| e ->
    eval (evalCtxEmpty ()) e

  -- TODO: re-add 'eval' through mlang-pipelineO

  -- TODO: add node count for MLang programs to phase-stats
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
end
```
</ToggleWrapper>
</DocBlock>

