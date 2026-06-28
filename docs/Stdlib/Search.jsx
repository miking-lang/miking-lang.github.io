
import React, { useState, useEffect, useRef } from 'react';


export function filterResults(results, query) {
  if (!query || query.trim().length === 0) return [];

  const normalized = query.trim().toLowerCase();

  return results
    .filter(word => word.name.toLowerCase().includes(normalized))
    .sort((a, b) => a.name.length - b.name.length)
    .slice(0, 10);
}

export function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<span class='highlight'>$1</span>");
}


const results = [{ name: "/graph.mc", link: "/docs/Stdlib/graph.mc" },
                 { name: "/common.mc", link: "/docs/Stdlib/common.mc" },
                 { name: "/seq-native.mc", link: "/docs/Stdlib/seq-native.mc" },
                 { name: "/stdlib.mc", link: "/docs/Stdlib/stdlib.mc" },
                 { name: "/these.mc", link: "/docs/Stdlib/these.mc" },
                 { name: "/maxmatch.mc", link: "/docs/Stdlib/maxmatch.mc" },
                 { name: "/option.mc", link: "/docs/Stdlib/option.mc" },
                 { name: "/log.mc", link: "/docs/Stdlib/log.mc" },
                 { name: "/map.mc", link: "/docs/Stdlib/map.mc" },
                 { name: "/sys.mc", link: "/docs/Stdlib/sys.mc" },
                 { name: "/union-find.mc", link: "/docs/Stdlib/union-find.mc" },
                 { name: "/nfa.mc", link: "/docs/Stdlib/nfa.mc" },
                 { name: "/math.mc", link: "/docs/Stdlib/math.mc" },
                 { name: "/ref.mc", link: "/docs/Stdlib/ref.mc" },
                 { name: "/char.mc", link: "/docs/Stdlib/char.mc" },
                 { name: "/float.mc", link: "/docs/Stdlib/float.mc" },
                 { name: "/either.mc", link: "/docs/Stdlib/either.mc" },
                 { name: "/collection-interface.mc", link: "/docs/Stdlib/collection-interface.mc" },
                 { name: "/utest.mc", link: "/docs/Stdlib/utest.mc" },
                 { name: "/optparse-applicative.mc", link: "/docs/Stdlib/optparse-applicative.mc" },
                 { name: "/eqset.mc", link: "/docs/Stdlib/eqset.mc" },
                 { name: "/string.mc", link: "/docs/Stdlib/string.mc" },
                 { name: "/hashmap.mc", link: "/docs/Stdlib/hashmap.mc" },
                 { name: "/name.mc", link: "/docs/Stdlib/name.mc" },
                 { name: "/maxmatch-tensor.mc", link: "/docs/Stdlib/maxmatch-tensor.mc" },
                 { name: "/tensor.mc", link: "/docs/Stdlib/tensor.mc" },
                 { name: "/parser-combinators.mc", link: "/docs/Stdlib/parser-combinators.mc" },
                 { name: "/digraph.mc", link: "/docs/Stdlib/digraph.mc" },
                 { name: "/int.mc", link: "/docs/Stdlib/int.mc" },
                 { name: "/set.mc", link: "/docs/Stdlib/set.mc" },
                 { name: "/basic-types.mc", link: "/docs/Stdlib/basic-types.mc" },
                 { name: "/stats.mc", link: "/docs/Stdlib/stats.mc" },
                 { name: "/annotate.mc", link: "/docs/Stdlib/annotate.mc" },
                 { name: "/assoc-seq.mc", link: "/docs/Stdlib/assoc-seq.mc" },
                 { name: "/bool.mc", link: "/docs/Stdlib/bool.mc" },
                 { name: "/avl.mc", link: "/docs/Stdlib/avl.mc" },
                 { name: "/result.mc", link: "/docs/Stdlib/result.mc" },
                 { name: "/fileutils.mc", link: "/docs/Stdlib/fileutils.mc" },
                 { name: "/stringid.mc", link: "/docs/Stdlib/stringid.mc" },
                 { name: "/json.mc", link: "/docs/Stdlib/json.mc" },
                 { name: "/tuple.mc", link: "/docs/Stdlib/tuple.mc" },
                 { name: "/parray.mc", link: "/docs/Stdlib/parray.mc" },
                 { name: "/seq.mc", link: "/docs/Stdlib/seq.mc" },
                 { name: "/csv.mc", link: "/docs/Stdlib/csv.mc" },
                 { name: "/lazy.mc", link: "/docs/Stdlib/lazy.mc" },
                 { name: "/regex.mc", link: "/docs/Stdlib/regex.mc" },
                 { name: "/dfa.mc", link: "/docs/Stdlib/dfa.mc" },
                 { name: "/matrix.mc", link: "/docs/Stdlib/matrix.mc" },
                 { name: "/effect.mc", link: "/docs/Stdlib/effect.mc" },
                 { name: "/symtable.mc", link: "/docs/Stdlib/symtable.mc" },
                 { name: "/arg.mc", link: "/docs/Stdlib/arg.mc" },
                 { name: "/error.mc", link: "/docs/Stdlib/error.mc" },
                 { name: "/list.mc", link: "/docs/Stdlib/list.mc" },
                 { name: "/heap.mc", link: "/docs/Stdlib/heap.mc" },
                 { name: "/assoc.mc", link: "/docs/Stdlib/assoc.mc" },
                 { name: "/iterator.mc", link: "/docs/Stdlib/iterator.mc" },
                 { name: "/futhark/pprint.mc", link: "/docs/Stdlib/futhark/pprint.mc" },
                 { name: "/futhark/well-formed.mc", link: "/docs/Stdlib/futhark/well-formed.mc" },
                 { name: "/futhark/inline-literals.mc", link: "/docs/Stdlib/futhark/inline-literals.mc" },
                 { name: "/futhark/wrapper.mc", link: "/docs/Stdlib/futhark/wrapper.mc" },
                 { name: "/futhark/for-each-record-pat.mc", link: "/docs/Stdlib/futhark/for-each-record-pat.mc" },
                 { name: "/futhark/generate.mc", link: "/docs/Stdlib/futhark/generate.mc" },
                 { name: "/futhark/deadcode.mc", link: "/docs/Stdlib/futhark/deadcode.mc" },
                 { name: "/futhark/ast-builder.mc", link: "/docs/Stdlib/futhark/ast-builder.mc" },
                 { name: "/futhark/size-parameterize.mc", link: "/docs/Stdlib/futhark/size-parameterize.mc" },
                 { name: "/futhark/ast.mc", link: "/docs/Stdlib/futhark/ast.mc" },
                 { name: "/futhark/record-lift.mc", link: "/docs/Stdlib/futhark/record-lift.mc" },
                 { name: "/futhark/alias-analysis.mc", link: "/docs/Stdlib/futhark/alias-analysis.mc" },
                 { name: "/jvm/compile.mc", link: "/docs/Stdlib/jvm/compile.mc" },
                 { name: "/jvm/constants.mc", link: "/docs/Stdlib/jvm/constants.mc" },
                 { name: "/jvm/ast.mc", link: "/docs/Stdlib/jvm/ast.mc" },
                 { name: "/cuda/pprint.mc", link: "/docs/Stdlib/cuda/pprint.mc" },
                 { name: "/cuda/well-formed.mc", link: "/docs/Stdlib/cuda/well-formed.mc" },
                 { name: "/cuda/pmexpr-compile.mc", link: "/docs/Stdlib/cuda/pmexpr-compile.mc" },
                 { name: "/cuda/constant-app.mc", link: "/docs/Stdlib/cuda/constant-app.mc" },
                 { name: "/cuda/sys.mc", link: "/docs/Stdlib/cuda/sys.mc" },
                 { name: "/cuda/cuda-utils.mc", link: "/docs/Stdlib/cuda/cuda-utils.mc" },
                 { name: "/cuda/wrapper.mc", link: "/docs/Stdlib/cuda/wrapper.mc" },
                 { name: "/cuda/pmexpr-ast.mc", link: "/docs/Stdlib/cuda/pmexpr-ast.mc" },
                 { name: "/cuda/compile.mc", link: "/docs/Stdlib/cuda/compile.mc" },
                 { name: "/cuda/inline-higher.mc", link: "/docs/Stdlib/cuda/inline-higher.mc" },
                 { name: "/cuda/lang-fix.mc", link: "/docs/Stdlib/cuda/lang-fix.mc" },
                 { name: "/cuda/pmexpr-pprint.mc", link: "/docs/Stdlib/cuda/pmexpr-pprint.mc" },
                 { name: "/cuda/ast.mc", link: "/docs/Stdlib/cuda/ast.mc" },
                 { name: "/cuda/intrinsics/loop-acc.mc", link: "/docs/Stdlib/cuda/intrinsics/loop-acc.mc" },
                 { name: "/cuda/intrinsics/loop.mc", link: "/docs/Stdlib/cuda/intrinsics/loop.mc" },
                 { name: "/cuda/intrinsics/loop-kernel.mc", link: "/docs/Stdlib/cuda/intrinsics/loop-kernel.mc" },
                 { name: "/cuda/intrinsics/foldl.mc", link: "/docs/Stdlib/cuda/intrinsics/foldl.mc" },
                 { name: "/cuda/intrinsics/intrinsic.mc", link: "/docs/Stdlib/cuda/intrinsics/intrinsic.mc" },
                 { name: "/cuda/intrinsics/tensor-sub.mc", link: "/docs/Stdlib/cuda/intrinsics/tensor-sub.mc" },
                 { name: "/cuda/intrinsics/tensor-slice.mc", link: "/docs/Stdlib/cuda/intrinsics/tensor-slice.mc" },
                 { name: "/c/pprint.mc", link: "/docs/Stdlib/c/pprint.mc" },
                 { name: "/c/compile.mc", link: "/docs/Stdlib/c/compile.mc" },
                 { name: "/c/externals.mc", link: "/docs/Stdlib/c/externals.mc" },
                 { name: "/c/ast.mc", link: "/docs/Stdlib/c/ast.mc" },
                 { name: "/peval/include.mc", link: "/docs/Stdlib/peval/include.mc" },
                 { name: "/peval/utils.mc", link: "/docs/Stdlib/peval/utils.mc" },
                 { name: "/peval/extract.mc", link: "/docs/Stdlib/peval/extract.mc" },
                 { name: "/peval/peval.mc", link: "/docs/Stdlib/peval/peval.mc" },
                 { name: "/peval/peval-runtime.mc", link: "/docs/Stdlib/peval/peval-runtime.mc" },
                 { name: "/peval/ast.mc", link: "/docs/Stdlib/peval/ast.mc" },
                 { name: "/python/python.mc", link: "/docs/Stdlib/python/python.mc" },
                 { name: "/mlang/pprint.mc", link: "/docs/Stdlib/mlang/pprint.mc" },
                 { name: "/mlang/const-transformer.mc", link: "/docs/Stdlib/mlang/const-transformer.mc" },
                 { name: "/mlang/language-composer.mc", link: "/docs/Stdlib/mlang/language-composer.mc" },
                 { name: "/mlang/composition-check.mc", link: "/docs/Stdlib/mlang/composition-check.mc" },
                 { name: "/mlang/type-check.mc", link: "/docs/Stdlib/mlang/type-check.mc" },
                 { name: "/mlang/postprocess.mc", link: "/docs/Stdlib/mlang/postprocess.mc" },
                 { name: "/mlang/compile.mc", link: "/docs/Stdlib/mlang/compile.mc" },
                 { name: "/mlang/prune-unused-langs.mc", link: "/docs/Stdlib/mlang/prune-unused-langs.mc" },
                 { name: "/mlang/ast-builder.mc", link: "/docs/Stdlib/mlang/ast-builder.mc" },
                 { name: "/mlang/boot-parser.mc", link: "/docs/Stdlib/mlang/boot-parser.mc" },
                 { name: "/mlang/loader.mc", link: "/docs/Stdlib/mlang/loader.mc" },
                 { name: "/mlang/include-handler.mc", link: "/docs/Stdlib/mlang/include-handler.mc" },
                 { name: "/mlang/symbolize.mc", link: "/docs/Stdlib/mlang/symbolize.mc" },
                 { name: "/mlang/ast.mc", link: "/docs/Stdlib/mlang/ast.mc" },
                 { name: "/mlang/main.mc", link: "/docs/Stdlib/mlang/main.mc" },
                 { name: "/javascript/pprint.mc", link: "/docs/Stdlib/javascript/pprint.mc" },
                 { name: "/javascript/optimizations.mc", link: "/docs/Stdlib/javascript/optimizations.mc" },
                 { name: "/javascript/patterns.mc", link: "/docs/Stdlib/javascript/patterns.mc" },
                 { name: "/javascript/compile.mc", link: "/docs/Stdlib/javascript/compile.mc" },
                 { name: "/javascript/mcore.mc", link: "/docs/Stdlib/javascript/mcore.mc" },
                 { name: "/javascript/util.mc", link: "/docs/Stdlib/javascript/util.mc" },
                 { name: "/javascript/ast.mc", link: "/docs/Stdlib/javascript/ast.mc" },
                 { name: "/javascript/intrinsics.mc", link: "/docs/Stdlib/javascript/intrinsics.mc" },
                 { name: "/mexpr/generate-pprint.mc", link: "/docs/Stdlib/mexpr/generate-pprint.mc" },
                 { name: "/mexpr/pprint.mc", link: "/docs/Stdlib/mexpr/pprint.mc" },
                 { name: "/mexpr/const-transformer.mc", link: "/docs/Stdlib/mexpr/const-transformer.mc" },
                 { name: "/mexpr/profiling.mc", link: "/docs/Stdlib/mexpr/profiling.mc" },
                 { name: "/mexpr/free-vars.mc", link: "/docs/Stdlib/mexpr/free-vars.mc" },
                 { name: "/mexpr/runtime-check.mc", link: "/docs/Stdlib/mexpr/runtime-check.mc" },
                 { name: "/mexpr/utest-runtime.mc", link: "/docs/Stdlib/mexpr/utest-runtime.mc" },
                 { name: "/mexpr/mexpr.mc", link: "/docs/Stdlib/mexpr/mexpr.mc" },
                 { name: "/mexpr/keyword-maker.mc", link: "/docs/Stdlib/mexpr/keyword-maker.mc" },
                 { name: "/mexpr/ast-smap-sfold-tests.mc", link: "/docs/Stdlib/mexpr/ast-smap-sfold-tests.mc" },
                 { name: "/mexpr/ast-result.mc", link: "/docs/Stdlib/mexpr/ast-result.mc" },
                 { name: "/mexpr/monomorphize.mc", link: "/docs/Stdlib/mexpr/monomorphize.mc" },
                 { name: "/mexpr/generate-json-serializers.mc", link: "/docs/Stdlib/mexpr/generate-json-serializers.mc" },
                 { name: "/mexpr/json-debug.mc", link: "/docs/Stdlib/mexpr/json-debug.mc" },
                 { name: "/mexpr/keywords.mc", link: "/docs/Stdlib/mexpr/keywords.mc" },
                 { name: "/mexpr/infix.mc", link: "/docs/Stdlib/mexpr/infix.mc" },
                 { name: "/mexpr/expansive.mc", link: "/docs/Stdlib/mexpr/expansive.mc" },
                 { name: "/mexpr/index.mc", link: "/docs/Stdlib/mexpr/index.mc" },
                 { name: "/mexpr/cfa.mc", link: "/docs/Stdlib/mexpr/cfa.mc" },
                 { name: "/mexpr/pattern-analysis.mc", link: "/docs/Stdlib/mexpr/pattern-analysis.mc" },
                 { name: "/mexpr/utils.mc", link: "/docs/Stdlib/mexpr/utils.mc" },
                 { name: "/mexpr/extract.mc", link: "/docs/Stdlib/mexpr/extract.mc" },
                 { name: "/mexpr/parser.mc", link: "/docs/Stdlib/mexpr/parser.mc" },
                 { name: "/mexpr/remove-ascription.mc", link: "/docs/Stdlib/mexpr/remove-ascription.mc" },
                 { name: "/mexpr/type.mc", link: "/docs/Stdlib/mexpr/type.mc" },
                 { name: "/mexpr/phase-stats.mc", link: "/docs/Stdlib/mexpr/phase-stats.mc" },
                 { name: "/mexpr/type-check.mc", link: "/docs/Stdlib/mexpr/type-check.mc" },
                 { name: "/mexpr/uncurried.mc", link: "/docs/Stdlib/mexpr/uncurried.mc" },
                 { name: "/mexpr/kcfa.mc", link: "/docs/Stdlib/mexpr/kcfa.mc" },
                 { name: "/mexpr/record.mc", link: "/docs/Stdlib/mexpr/record.mc" },
                 { name: "/mexpr/lamlift.mc", link: "/docs/Stdlib/mexpr/lamlift.mc" },
                 { name: "/mexpr/const-arity.mc", link: "/docs/Stdlib/mexpr/const-arity.mc" },
                 { name: "/mexpr/cmp.mc", link: "/docs/Stdlib/mexpr/cmp.mc" },
                 { name: "/mexpr/builtin.mc", link: "/docs/Stdlib/mexpr/builtin.mc" },
                 { name: "/mexpr/externals.mc", link: "/docs/Stdlib/mexpr/externals.mc" },
                 { name: "/mexpr/desugar.mc", link: "/docs/Stdlib/mexpr/desugar.mc" },
                 { name: "/mexpr/anf.mc", link: "/docs/Stdlib/mexpr/anf.mc" },
                 { name: "/mexpr/eq.mc", link: "/docs/Stdlib/mexpr/eq.mc" },
                 { name: "/mexpr/annotate.mc", link: "/docs/Stdlib/mexpr/annotate.mc" },
                 { name: "/mexpr/duplicate-code-elimination.mc", link: "/docs/Stdlib/mexpr/duplicate-code-elimination.mc" },
                 { name: "/mexpr/call-graph.mc", link: "/docs/Stdlib/mexpr/call-graph.mc" },
                 { name: "/mexpr/info.mc", link: "/docs/Stdlib/mexpr/info.mc" },
                 { name: "/mexpr/cps.mc", link: "/docs/Stdlib/mexpr/cps.mc" },
                 { name: "/mexpr/repr-ast.mc", link: "/docs/Stdlib/mexpr/repr-ast.mc" },
                 { name: "/mexpr/side-effect.mc", link: "/docs/Stdlib/mexpr/side-effect.mc" },
                 { name: "/mexpr/generate-eq.mc", link: "/docs/Stdlib/mexpr/generate-eq.mc" },
                 { name: "/mexpr/generate-utest.mc", link: "/docs/Stdlib/mexpr/generate-utest.mc" },
                 { name: "/mexpr/op-overload.mc", link: "/docs/Stdlib/mexpr/op-overload.mc" },
                 { name: "/mexpr/utest-generate.mc", link: "/docs/Stdlib/mexpr/utest-generate.mc" },
                 { name: "/mexpr/demote-recursive.mc", link: "/docs/Stdlib/mexpr/demote-recursive.mc" },
                 { name: "/mexpr/ast-builder.mc", link: "/docs/Stdlib/mexpr/ast-builder.mc" },
                 { name: "/mexpr/load-runtime.mc", link: "/docs/Stdlib/mexpr/load-runtime.mc" },
                 { name: "/mexpr/type-annot.mc", link: "/docs/Stdlib/mexpr/type-annot.mc" },
                 { name: "/mexpr/cse.mc", link: "/docs/Stdlib/mexpr/cse.mc" },
                 { name: "/mexpr/boot-parser.mc", link: "/docs/Stdlib/mexpr/boot-parser.mc" },
                 { name: "/mexpr/type-lift.mc", link: "/docs/Stdlib/mexpr/type-lift.mc" },
                 { name: "/mexpr/constant-fold.mc", link: "/docs/Stdlib/mexpr/constant-fold.mc" },
                 { name: "/mexpr/unify.mc", link: "/docs/Stdlib/mexpr/unify.mc" },
                 { name: "/mexpr/shallow-patterns.mc", link: "/docs/Stdlib/mexpr/shallow-patterns.mc" },
                 { name: "/mexpr/symbolize.mc", link: "/docs/Stdlib/mexpr/symbolize.mc" },
                 { name: "/mexpr/ast.mc", link: "/docs/Stdlib/mexpr/ast.mc" },
                 { name: "/mexpr/ast-effect.mc", link: "/docs/Stdlib/mexpr/ast-effect.mc" },
                 { name: "/mexpr/const-types.mc", link: "/docs/Stdlib/mexpr/const-types.mc" },
                 { name: "/mexpr/eval.mc", link: "/docs/Stdlib/mexpr/eval.mc" },
                 { name: "/mexpr/nestable-records/merged.mc", link: "/docs/Stdlib/mexpr/nestable-records/merged.mc" },
                 { name: "/cp/pprint.mc", link: "/docs/Stdlib/cp/pprint.mc" },
                 { name: "/cp/solve.mc", link: "/docs/Stdlib/cp/solve.mc" },
                 { name: "/cp/ast.mc", link: "/docs/Stdlib/cp/ast.mc" },
                 { name: "/parser/breakable.mc", link: "/docs/Stdlib/parser/breakable.mc" },
                 { name: "/parser/selfhost-gen.mc", link: "/docs/Stdlib/parser/selfhost-gen.mc" },
                 { name: "/parser/tool.mc", link: "/docs/Stdlib/parser/tool.mc" },
                 { name: "/parser/lexer.mc", link: "/docs/Stdlib/parser/lexer.mc" },
                 { name: "/parser/lrk.mc", link: "/docs/Stdlib/parser/lrk.mc" },
                 { name: "/parser/generator.mc", link: "/docs/Stdlib/parser/generator.mc" },
                 { name: "/parser/semantic.mc", link: "/docs/Stdlib/parser/semantic.mc" },
                 { name: "/parser/gen-ast.mc", link: "/docs/Stdlib/parser/gen-ast.mc" },
                 { name: "/parser/gen-op-ast.mc", link: "/docs/Stdlib/parser/gen-op-ast.mc" },
                 { name: "/parser/grammar.mc", link: "/docs/Stdlib/parser/grammar.mc" },
                 { name: "/parser/ll1.mc", link: "/docs/Stdlib/parser/ll1.mc" },
                 { name: "/sundials/ida.mc", link: "/docs/Stdlib/sundials/ida.mc" },
                 { name: "/sundials/sundials.mc", link: "/docs/Stdlib/sundials/sundials.mc" },
                 { name: "/sundials/kinsol.mc", link: "/docs/Stdlib/sundials/kinsol.mc" },
                 { name: "/sundials/sundials.ext-ocaml.mc", link: "/docs/Stdlib/sundials/sundials.ext-ocaml.mc" },
                 { name: "/sundials/cvode.ext-ocaml.mc", link: "/docs/Stdlib/sundials/cvode.ext-ocaml.mc" },
                 { name: "/sundials/ida.ext-ocaml.mc", link: "/docs/Stdlib/sundials/ida.ext-ocaml.mc" },
                 { name: "/sundials/cvode.mc", link: "/docs/Stdlib/sundials/cvode.mc" },
                 { name: "/sundials/kinsol.ext-ocaml.mc", link: "/docs/Stdlib/sundials/kinsol.ext-ocaml.mc" },
                 { name: "/extrec/resolve-qualified-name.mc", link: "/docs/Stdlib/extrec/resolve-qualified-name.mc" },
                 { name: "/extrec/pprint.mc", link: "/docs/Stdlib/extrec/pprint.mc" },
                 { name: "/extrec/mlang-ty-deps.mc", link: "/docs/Stdlib/extrec/mlang-ty-deps.mc" },
                 { name: "/extrec/type-check.mc", link: "/docs/Stdlib/extrec/type-check.mc" },
                 { name: "/extrec/collect-env.mc", link: "/docs/Stdlib/extrec/collect-env.mc" },
                 { name: "/extrec/compile.mc", link: "/docs/Stdlib/extrec/compile.mc" },
                 { name: "/extrec/insert-implicit-recursion-var.mc", link: "/docs/Stdlib/extrec/insert-implicit-recursion-var.mc" },
                 { name: "/extrec/conapp-sugar.mc", link: "/docs/Stdlib/extrec/conapp-sugar.mc" },
                 { name: "/extrec/ast-builder.mc", link: "/docs/Stdlib/extrec/ast-builder.mc" },
                 { name: "/extrec/monomorphise.mc", link: "/docs/Stdlib/extrec/monomorphise.mc" },
                 { name: "/extrec/boot-parser.mc", link: "/docs/Stdlib/extrec/boot-parser.mc" },
                 { name: "/extrec/symbolize.mc", link: "/docs/Stdlib/extrec/symbolize.mc" },
                 { name: "/extrec/ast.mc", link: "/docs/Stdlib/extrec/ast.mc" },
                 { name: "/extrec/cosem-ty-annot.mc", link: "/docs/Stdlib/extrec/cosem-ty-annot.mc" },
                 { name: "/multicore/mutex.ext-ocaml.mc", link: "/docs/Stdlib/multicore/mutex.ext-ocaml.mc" },
                 { name: "/multicore/mutex.mc", link: "/docs/Stdlib/multicore/mutex.mc" },
                 { name: "/multicore/thread-pool.mc", link: "/docs/Stdlib/multicore/thread-pool.mc" },
                 { name: "/multicore/multicore.mc", link: "/docs/Stdlib/multicore/multicore.mc" },
                 { name: "/multicore/thread.mc", link: "/docs/Stdlib/multicore/thread.mc" },
                 { name: "/multicore/thread.ext-ocaml.mc", link: "/docs/Stdlib/multicore/thread.ext-ocaml.mc" },
                 { name: "/multicore/atomic.mc", link: "/docs/Stdlib/multicore/atomic.mc" },
                 { name: "/multicore/pseq.mc", link: "/docs/Stdlib/multicore/pseq.mc" },
                 { name: "/multicore/cond.mc", link: "/docs/Stdlib/multicore/cond.mc" },
                 { name: "/multicore/cond.ext-ocaml.mc", link: "/docs/Stdlib/multicore/cond.ext-ocaml.mc" },
                 { name: "/multicore/atomic.ext-ocaml.mc", link: "/docs/Stdlib/multicore/atomic.ext-ocaml.mc" },
                 { name: "/multicore/channel.mc", link: "/docs/Stdlib/multicore/channel.mc" },
                 { name: "/docgen/execution-context.mc", link: "/docs/Stdlib/docgen/execution-context.mc" },
                 { name: "/docgen/docgen.mc", link: "/docs/Stdlib/docgen/docgen.mc" },
                 { name: "/docgen/main.mc", link: "/docs/Stdlib/docgen/main.mc" },
                 { name: "/docgen/global/logger.mc", link: "/docs/Stdlib/docgen/global/logger.mc" },
                 { name: "/docgen/global/format.mc", link: "/docs/Stdlib/docgen/global/format.mc" },
                 { name: "/docgen/global/util.mc", link: "/docs/Stdlib/docgen/global/util.mc" },
                 { name: "/docgen/global/format-language.mc", link: "/docs/Stdlib/docgen/global/format-language.mc" },
                 { name: "/docgen/rendering/files-opener.mc", link: "/docs/Stdlib/docgen/rendering/files-opener.mc" },
                 { name: "/docgen/rendering/renderer.mc", link: "/docs/Stdlib/docgen/rendering/renderer.mc" },
                 { name: "/docgen/rendering/rendering-types.mc", link: "/docs/Stdlib/docgen/rendering/rendering-types.mc" },
                 { name: "/docgen/rendering/source-code-spliter.mc", link: "/docs/Stdlib/docgen/rendering/source-code-spliter.mc" },
                 { name: "/docgen/rendering/preprocessor.mc", link: "/docs/Stdlib/docgen/rendering/preprocessor.mc" },
                 { name: "/docgen/rendering/util.mc", link: "/docs/Stdlib/docgen/rendering/util.mc" },
                 { name: "/docgen/rendering/rendering-options.mc", link: "/docs/Stdlib/docgen/rendering/rendering-options.mc" },
                 { name: "/docgen/rendering/source-code-reconstruction.mc", link: "/docs/Stdlib/docgen/rendering/source-code-reconstruction.mc" },
                 { name: "/docgen/rendering/renderers/raw-renderer.mc", link: "/docs/Stdlib/docgen/rendering/renderers/raw-renderer.mc" },
                 { name: "/docgen/rendering/renderers/html-renderer.mc", link: "/docs/Stdlib/docgen/rendering/renderers/html-renderer.mc" },
                 { name: "/docgen/rendering/renderers/md-renderer.mc", link: "/docs/Stdlib/docgen/rendering/renderers/md-renderer.mc" },
                 { name: "/docgen/rendering/renderers/renderer-interface.mc", link: "/docs/Stdlib/docgen/rendering/renderers/renderer-interface.mc" },
                 { name: "/docgen/rendering/renderers/mdx-renderer.mc", link: "/docs/Stdlib/docgen/rendering/renderers/mdx-renderer.mc" },
                 { name: "/docgen/rendering/renderers/main-renderer.mc", link: "/docs/Stdlib/docgen/rendering/renderers/main-renderer.mc" },
                 { name: "/docgen/rendering/renderers/objects-renderer.mc", link: "/docs/Stdlib/docgen/rendering/renderers/objects-renderer.mc" },
                 { name: "/docgen/rendering/renderers/headers/html-script.mc", link: "/docs/Stdlib/docgen/rendering/renderers/headers/html-script.mc" },
                 { name: "/docgen/rendering/renderers/headers/mdx-components.mc", link: "/docs/Stdlib/docgen/rendering/renderers/headers/mdx-components.mc" },
                 { name: "/docgen/rendering/renderers/headers/theme-variables.mc", link: "/docs/Stdlib/docgen/rendering/renderers/headers/theme-variables.mc" },
                 { name: "/docgen/rendering/renderers/headers/html-style.mc", link: "/docs/Stdlib/docgen/rendering/renderers/headers/html-style.mc" },
                 { name: "/docgen/rendering/renderers/headers/search.mc", link: "/docs/Stdlib/docgen/rendering/renderers/headers/search.mc" },
                 { name: "/docgen/rendering/renderers/headers/html-header.mc", link: "/docs/Stdlib/docgen/rendering/renderers/headers/html-header.mc" },
                 { name: "/docgen/mast-gen/include-set.mc", link: "/docs/Stdlib/docgen/mast-gen/include-set.mc" },
                 { name: "/docgen/mast-gen/mast-generator.mc", link: "/docs/Stdlib/docgen/mast-gen/mast-generator.mc" },
                 { name: "/docgen/mast-gen/file-opener.mc", link: "/docs/Stdlib/docgen/mast-gen/file-opener.mc" },
                 { name: "/docgen/mast-gen/mast.mc", link: "/docs/Stdlib/docgen/mast-gen/mast.mc" },
                 { name: "/docgen/parsing/parser.mc", link: "/docs/Stdlib/docgen/parsing/parser.mc" },
                 { name: "/docgen/parsing/doc-tree.mc", link: "/docs/Stdlib/docgen/parsing/doc-tree.mc" },
                 { name: "/docgen/parsing/breaker-choosers.mc", link: "/docs/Stdlib/docgen/parsing/breaker-choosers.mc" },
                 { name: "/docgen/parsing/lexing/sem-map.mc", link: "/docs/Stdlib/docgen/parsing/lexing/sem-map.mc" },
                 { name: "/docgen/parsing/lexing/recursive-stream.mc", link: "/docs/Stdlib/docgen/parsing/lexing/recursive-stream.mc" },
                 { name: "/docgen/parsing/lexing/lexer.mc", link: "/docs/Stdlib/docgen/parsing/lexing/lexer.mc" },
                 { name: "/docgen/parsing/lexing/token-readers.mc", link: "/docs/Stdlib/docgen/parsing/lexing/token-readers.mc" },
                 { name: "/docgen/server/server-options.mc", link: "/docs/Stdlib/docgen/server/server-options.mc" },
                 { name: "/docgen/server/python-server.mc", link: "/docs/Stdlib/docgen/server/python-server.mc" },
                 { name: "/docgen/server/server.mc", link: "/docs/Stdlib/docgen/server/server.mc" },
                 { name: "/docgen/options/options-parser.mc", link: "/docs/Stdlib/docgen/options/options-parser.mc" },
                 { name: "/docgen/options/docgen-options.mc", link: "/docs/Stdlib/docgen/options/docgen-options.mc" },
                 { name: "/docgen/options/cast-options.mc", link: "/docs/Stdlib/docgen/options/cast-options.mc" },
                 { name: "/docgen/extracting/source-code.mc", link: "/docs/Stdlib/docgen/extracting/source-code.mc" },
                 { name: "/docgen/extracting/depth.mc", link: "/docs/Stdlib/docgen/extracting/depth.mc" },
                 { name: "/docgen/extracting/source-code-word.mc", link: "/docs/Stdlib/docgen/extracting/source-code-word.mc" },
                 { name: "/docgen/extracting/objects.mc", link: "/docs/Stdlib/docgen/extracting/objects.mc" },
                 { name: "/docgen/extracting/util.mc", link: "/docs/Stdlib/docgen/extracting/util.mc" },
                 { name: "/docgen/extracting/extracter.mc", link: "/docs/Stdlib/docgen/extracting/extracter.mc" },
                 { name: "/docgen/extracting/source-code-builder.mc", link: "/docs/Stdlib/docgen/extracting/source-code-builder.mc" },
                 { name: "/docgen/labeling/types-stream.mc", link: "/docs/Stdlib/docgen/labeling/types-stream.mc" },
                 { name: "/docgen/labeling/labeler.mc", link: "/docs/Stdlib/docgen/labeling/labeler.mc" },
                 { name: "/ext/cblas-ext.ext-ocaml.mc", link: "/docs/Stdlib/ext/cblas-ext.ext-ocaml.mc" },
                 { name: "/ext/async-ext.mc", link: "/docs/Stdlib/ext/async-ext.mc" },
                 { name: "/ext/reflection-ext.mc", link: "/docs/Stdlib/ext/reflection-ext.mc" },
                 { name: "/ext/math-ext.mc", link: "/docs/Stdlib/ext/math-ext.mc" },
                 { name: "/ext/vec-ext.mc", link: "/docs/Stdlib/ext/vec-ext.mc" },
                 { name: "/ext/arr-ext.ext-ocaml.mc", link: "/docs/Stdlib/ext/arr-ext.ext-ocaml.mc" },
                 { name: "/ext/rtppl-ext.ext-ocaml.mc", link: "/docs/Stdlib/ext/rtppl-ext.ext-ocaml.mc" },
                 { name: "/ext/local-search.mc", link: "/docs/Stdlib/ext/local-search.mc" },
                 { name: "/ext/matrix-ext.mc", link: "/docs/Stdlib/ext/matrix-ext.mc" },
                 { name: "/ext/file-ext.mc", link: "/docs/Stdlib/ext/file-ext.mc" },
                 { name: "/ext/reflection-ext.ext-ocaml.mc", link: "/docs/Stdlib/ext/reflection-ext.ext-ocaml.mc" },
                 { name: "/ext/toml-ext.ext-ocaml.mc", link: "/docs/Stdlib/ext/toml-ext.ext-ocaml.mc" },
                 { name: "/ext/math-ext.ext-ocaml.mc", link: "/docs/Stdlib/ext/math-ext.ext-ocaml.mc" },
                 { name: "/ext/ext-test.mc", link: "/docs/Stdlib/ext/ext-test.mc" },
                 { name: "/ext/mat-ext.ext-ocaml.mc", link: "/docs/Stdlib/ext/mat-ext.ext-ocaml.mc" },
                 { name: "/ext/mat-ext.mc", link: "/docs/Stdlib/ext/mat-ext.mc" },
                 { name: "/ext/matrix-ext.ext-ocaml.mc", link: "/docs/Stdlib/ext/matrix-ext.ext-ocaml.mc" },
                 { name: "/ext/dist-ext.ext-ocaml.mc", link: "/docs/Stdlib/ext/dist-ext.ext-ocaml.mc" },
                 { name: "/ext/ext-test.ext-ocaml.mc", link: "/docs/Stdlib/ext/ext-test.ext-ocaml.mc" },
                 { name: "/ext/rtppl-ext.mc", link: "/docs/Stdlib/ext/rtppl-ext.mc" },
                 { name: "/ext/toml-ext.mc", link: "/docs/Stdlib/ext/toml-ext.mc" },
                 { name: "/ext/arr-ext.mc", link: "/docs/Stdlib/ext/arr-ext.mc" },
                 { name: "/ext/math-ext.ext-c.mc", link: "/docs/Stdlib/ext/math-ext.ext-c.mc" },
                 { name: "/ext/cblas-ext.mc", link: "/docs/Stdlib/ext/cblas-ext.mc" },
                 { name: "/ext/async-ext.ext-ocaml.mc", link: "/docs/Stdlib/ext/async-ext.ext-ocaml.mc" },
                 { name: "/ext/dist-ext.mc", link: "/docs/Stdlib/ext/dist-ext.mc" },
                 { name: "/ext/file-ext.ext-ocaml.mc", link: "/docs/Stdlib/ext/file-ext.ext-ocaml.mc" },
                 { name: "/ocaml/generate-env.mc", link: "/docs/Stdlib/ocaml/generate-env.mc" },
                 { name: "/ocaml/pprint.mc", link: "/docs/Stdlib/ocaml/pprint.mc" },
                 { name: "/ocaml/generate.mc", link: "/docs/Stdlib/ocaml/generate.mc" },
                 { name: "/ocaml/external.mc", link: "/docs/Stdlib/ocaml/external.mc" },
                 { name: "/ocaml/external-includes.mc", link: "/docs/Stdlib/ocaml/external-includes.mc" },
                 { name: "/ocaml/intrinsics-ops.mc", link: "/docs/Stdlib/ocaml/intrinsics-ops.mc" },
                 { name: "/ocaml/compile.mc", link: "/docs/Stdlib/ocaml/compile.mc" },
                 { name: "/ocaml/mcore.mc", link: "/docs/Stdlib/ocaml/mcore.mc" },
                 { name: "/ocaml/wrap-in-try-with.mc", link: "/docs/Stdlib/ocaml/wrap-in-try-with.mc" },
                 { name: "/ocaml/symbolize.mc", link: "/docs/Stdlib/ocaml/symbolize.mc" },
                 { name: "/ocaml/ast.mc", link: "/docs/Stdlib/ocaml/ast.mc" },
                 { name: "/tuning/eq-paths.mc", link: "/docs/Stdlib/tuning/eq-paths.mc" },
                 { name: "/tuning/data-frame.mc", link: "/docs/Stdlib/tuning/data-frame.mc" },
                 { name: "/tuning/graph-coloring.mc", link: "/docs/Stdlib/tuning/graph-coloring.mc" },
                 { name: "/tuning/tune-stats.mc", link: "/docs/Stdlib/tuning/tune-stats.mc" },
                 { name: "/tuning/tail-positions.mc", link: "/docs/Stdlib/tuning/tail-positions.mc" },
                 { name: "/tuning/const-dep.mc", link: "/docs/Stdlib/tuning/const-dep.mc" },
                 { name: "/tuning/dependency-analysis.mc", link: "/docs/Stdlib/tuning/dependency-analysis.mc" },
                 { name: "/tuning/nested.mc", link: "/docs/Stdlib/tuning/nested.mc" },
                 { name: "/tuning/context-expansion.mc", link: "/docs/Stdlib/tuning/context-expansion.mc" },
                 { name: "/tuning/instrumentation.mc", link: "/docs/Stdlib/tuning/instrumentation.mc" },
                 { name: "/tuning/tune-file.mc", link: "/docs/Stdlib/tuning/tune-file.mc" },
                 { name: "/tuning/call-graph.mc", link: "/docs/Stdlib/tuning/call-graph.mc" },
                 { name: "/tuning/hole-cfa.mc", link: "/docs/Stdlib/tuning/hole-cfa.mc" },
                 { name: "/tuning/database.mc", link: "/docs/Stdlib/tuning/database.mc" },
                 { name: "/tuning/name-info.mc", link: "/docs/Stdlib/tuning/name-info.mc" },
                 { name: "/tuning/tune-options.mc", link: "/docs/Stdlib/tuning/tune-options.mc" },
                 { name: "/tuning/ast.mc", link: "/docs/Stdlib/tuning/ast.mc" },
                 { name: "/tuning/prefix-tree.mc", link: "/docs/Stdlib/tuning/prefix-tree.mc" },
                 { name: "/tuning/search-space.mc", link: "/docs/Stdlib/tuning/search-space.mc" },
                 { name: "/pmexpr/pprint.mc", link: "/docs/Stdlib/pmexpr/pprint.mc" },
                 { name: "/pmexpr/pattern-match.mc", link: "/docs/Stdlib/pmexpr/pattern-match.mc" },
                 { name: "/pmexpr/function-properties.mc", link: "/docs/Stdlib/pmexpr/function-properties.mc" },
                 { name: "/pmexpr/well-formed.mc", link: "/docs/Stdlib/pmexpr/well-formed.mc" },
                 { name: "/pmexpr/c-externals.mc", link: "/docs/Stdlib/pmexpr/c-externals.mc" },
                 { name: "/pmexpr/promote.mc", link: "/docs/Stdlib/pmexpr/promote.mc" },
                 { name: "/pmexpr/demote.mc", link: "/docs/Stdlib/pmexpr/demote.mc" },
                 { name: "/pmexpr/classify.mc", link: "/docs/Stdlib/pmexpr/classify.mc" },
                 { name: "/pmexpr/nested-accelerate.mc", link: "/docs/Stdlib/pmexpr/nested-accelerate.mc" },
                 { name: "/pmexpr/wrapper.mc", link: "/docs/Stdlib/pmexpr/wrapper.mc" },
                 { name: "/pmexpr/utils.mc", link: "/docs/Stdlib/pmexpr/utils.mc" },
                 { name: "/pmexpr/extract.mc", link: "/docs/Stdlib/pmexpr/extract.mc" },
                 { name: "/pmexpr/rules.mc", link: "/docs/Stdlib/pmexpr/rules.mc" },
                 { name: "/pmexpr/tailrecursion.mc", link: "/docs/Stdlib/pmexpr/tailrecursion.mc" },
                 { name: "/pmexpr/replace-accelerate.mc", link: "/docs/Stdlib/pmexpr/replace-accelerate.mc" },
                 { name: "/pmexpr/parallel-patterns.mc", link: "/docs/Stdlib/pmexpr/parallel-patterns.mc" },
                 { name: "/pmexpr/utest-size-constraint.mc", link: "/docs/Stdlib/pmexpr/utest-size-constraint.mc" },
                 { name: "/pmexpr/build.mc", link: "/docs/Stdlib/pmexpr/build.mc" },
                 { name: "/pmexpr/inline-higher-order.mc", link: "/docs/Stdlib/pmexpr/inline-higher-order.mc" },
                 { name: "/pmexpr/ast.mc", link: "/docs/Stdlib/pmexpr/ast.mc" },
                 { name: "/pmexpr/copy-analysis.mc", link: "/docs/Stdlib/pmexpr/copy-analysis.mc" },
                 { name: "/pmexpr/parallel-rewrite.mc", link: "/docs/Stdlib/pmexpr/parallel-rewrite.mc" }];

const searchCss = `

/* =========================
   THEME VARIABLES
   ========================= */

:root {
  --bodyBGColor: #f9fafb;
  --bodyTextColor: #111827;
  --h1BorderColor: #d1d5db;
  --h1Color: #111827;
  --h2Color: #1f2937;
  --h2BorderColor: #3b82f6;
  --topDocBorderColor: #d1d5db;
  --topDocColor: #1f2937;
  --topDocBgColor: #ffffff;
  --docBlockBGColor: #ffffff;
  --docBlockBorderColor: #3b82f6;
  --docBlockOutlineColor: #e5e7eb;
  --docSignatureBGColor: #f9f9f9;
  --docDescriptionBGColor: #f0f4ff;
  --docDescriptionBorderColor: #d1d5db;
  --docDescriptionTextColor: #374151;
  --codeBlockBGColor: #fafafa;
  --codeBlockBorderColor: #e5e7eb;
  --toggleHoverBGColor: #bae6fd;
  --gotoLinkColor: #3b82f6;
  --aColor: #2980b9;
  --keywordColor: #dc2626;
  --variableColor: #2563eb;
  --typeColor: #7c3aed;
  --numberColor: #0284c7;
  --commentColor: #16a34a;
  --stringColor: #008000;
  --multiColor: #a0a1a7;
  --searchBarBGColor: #f2f2f2;
  --searchBarTextColor: #1a1a1a;
  --searchBarPlaceholderColor: #777777;
  --searchBarShadowColor: rgba(0,0,0,0.1);
  --searchResultsBGColor: #ffffff;
  --searchResultsShadowColor: rgba(0,0,0,0.15);
  --searchResultItemBGColor: #fafafa;
  --searchResultItemTextColor: #333333;
  --searchResultItemHoverBGColor: #f0f0f0;
  --searchResultItemActiveBGColor: #d9d9d9;
  --searchResultItemBorderColor: rgba(0,0,0,0.08);
  --searchHighlightColor: #0066cc;
  --searchResultBGColor: #ffffff;
}

/* htmlLight */
:root[data-theme="htmlLight"] {
  --bodyBGColor: #f9fafb;
  --bodyTextColor: #111827;
  --h1BorderColor: #d1d5db;
  --h1Color: #111827;
  --h2Color: #1f2937;
  --h2BorderColor: #3b82f6;
  --topDocBorderColor: #d1d5db;
  --topDocColor: #1f2937;
  --topDocBgColor: #ffffff;
  --docBlockBGColor: #ffffff;
  --docBlockBorderColor: #3b82f6;
  --docBlockOutlineColor: #e5e7eb;
  --docSignatureBGColor: #f9f9f9;
  --docDescriptionBGColor: #f0f4ff;
  --docDescriptionBorderColor: #d1d5db;
  --docDescriptionTextColor: #374151;
  --codeBlockBGColor: #fafafa;
  --codeBlockBorderColor: #e5e7eb;
  --toggleHoverBGColor: #bae6fd;
  --gotoLinkColor: #3b82f6;
  --aColor: #2980b9;
  --keywordColor: #dc2626;
  --variableColor: #2563eb;
  --typeColor: #7c3aed;
  --numberColor: #0284c7;
  --commentColor: #16a34a;
  --stringColor: #008000;
  --multiColor: #a0a1a7;
  --searchBarBGColor: #f2f2f2;
  --searchBarTextColor: #111827;
  --searchBarPlaceholderColor: #6b7280;
  --searchBarShadowColor: rgba(0,0,0,0.15);
  --searchResultsBGColor: #ffffff;
  --searchResultsShadowColor: rgba(0,0,0,0.2);
  --searchResultItemBGColor: #ffffff;
  --searchResultItemTextColor: #1f2937;
  --searchResultItemHoverBGColor: #f3f4f6;
  --searchResultItemActiveBGColor: #e5e7eb;
  --searchResultItemBorderColor: #e5e7eb;
  --searchHighlightColor: #3b82f6;
  --searchBarBGColor: #f2f2f2;
  --searchBarTextColor: #1a1a1a;
  --searchBarPlaceholderColor: #777777;
  --searchBarShadowColor: rgba(0,0,0,0.1);
  --searchResultsBGColor: #ffffff;
  --searchResultsShadowColor: rgba(0,0,0,0.15);
  --searchResultItemBGColor: #fafafa;
  --searchResultItemTextColor: #333333;
  --searchResultItemHoverBGColor: #f0f0f0;
  --searchResultItemActiveBGColor: #d9d9d9;
  --searchResultItemBorderColor: rgba(0,0,0,0.08);
  --searchHighlightColor: #0066cc;
  --searchResultBGColor: #ffffff;
}

/* htmlDark */
:root[data-theme="htmlDark"] {
  --bodyBGColor: #0d0d0d;
  --bodyTextColor: #e5e5e5;
  --h1BorderColor: #2a2a2a;
  --h1Color: #ffffff;
  --h2Color: #d4d4d4;
  --h2BorderColor: #3b82f6;
  --topDocBorderColor: #2a2a2a;
  --topDocColor: #d0d0d0;
  --topDocBgColor: #121212;
  --docBlockBGColor: #1a1a1a;
  --docBlockBorderColor: #3b82f6;
  --docBlockOutlineColor: #333333;
  --docSignatureBGColor: #222222;
  --docDescriptionBGColor: #121212;
  --docDescriptionBorderColor: #3b82f6;
  --docDescriptionTextColor: #cccccc;
  --codeBlockBGColor: #0f0f0f;
  --codeBlockBorderColor: #2c2c2c;
  --toggleHoverBGColor: #0d0d0d;
  --gotoLinkColor: #3b82f6;
  --aColor: #3b82f6;
  --keywordColor: #f87171;
  --variableColor: #93c5fd;
  --typeColor: #fcd34d;
  --numberColor: #fbbf24;
  --commentColor: #86efac;
  --stringColor: #a8ff60;
  --multiColor: #6a9955;
  --searchBarBGColor: #1f1f1f;
  --searchBarTextColor: #e5e5e5;
  --searchBarPlaceholderColor: #aaaaaa;
  --searchBarShadowColor: rgba(0,0,0,0.4);
  --searchResultsBGColor: #121212;
  --searchResultsShadowColor: rgba(0,0,0,0.6);
  --searchResultItemBGColor: #2c2c2c;
  --searchResultItemTextColor: #f5f5f5;
  --searchResultItemHoverBGColor: #3a3a3a;
  --searchResultItemActiveBGColor: #555555;
  --searchResultItemBorderColor: rgba(255,255,255,0.08);
  --searchHighlightColor: #4da6ff;
  --searchResultBGColor: transparent;
}

/* htmlWarm */
:root[data-theme="htmlWarm"] {
  --bodyBGColor: #fef7e0;
  --bodyTextColor: #3b3b2f;
  --h1BorderColor: #f4cd6b;
  --h1Color: #2b2b1f;
  --h2Color: #3a3000;
  --h2BorderColor: #f2b100;
  --topDocBorderColor: #f4cd6b;
  --topDocColor: #3b3b2f;
  --topDocBgColor: #fff9d1;
  --docBlockBGColor: #fffbe6;
  --docBlockBorderColor: #f2b100;
  --docBlockOutlineColor: #fce8b1;
  --docSignatureBGColor: #fff6cf;
  --docDescriptionBGColor: #fdf4c1;
  --docDescriptionBorderColor: #f2d96b;
  --docDescriptionTextColor: #3b3b2f;
  --codeBlockBGColor: #fefce8;
  --codeBlockBorderColor: #f5deb0;
  --toggleHoverBGColor: #ffffff;
  --gotoLinkColor: #e09b00;
  --aColor: #e09b00;
  --keywordColor: #c92a2a;
  --variableColor: #7048e8;
  --typeColor: #d97706;
  --numberColor: #c2410c;
  --commentColor: #5c940d;
  --stringColor: #d19a66;
  --multiColor: #b294bb;
  --searchBarBGColor: #fff9d1;
  --searchBarTextColor: #3b3b2f;
  --searchBarPlaceholderColor: #8c7a3d;
  --searchBarShadowColor: rgba(0,0,0,0.15);
  --searchResultsBGColor: #fffbe6;
  --searchResultsShadowColor: rgba(124, 90, 0, 0.2);
  --searchResultItemBGColor: #fffdf3;
  --searchResultItemTextColor: #3a3000;
  --searchResultItemHoverBGColor: #fef7e0;
  --searchResultItemActiveBGColor: #fce8b1;
  --searchResultItemBorderColor: #f5deb0;
  --searchHighlightColor: #e09b00;
  --searchResultBGColor: transparent;
}

/* htmlWarmDark */
:root[data-theme="htmlWarmDark"] {
  --bodyBGColor: #1e1e1e;
  --bodyTextColor: #f5f5dc;
  --h1BorderColor: #facc15;
  --h1Color: #fef9c3;
  --h2Color: #fde68a;
  --h2BorderColor: #facc15;
  --topDocBorderColor: #facc15;
  --topDocColor: #e5e5c0;
  --topDocBgColor: #2a2a1f;
  --docBlockBGColor: #2b2b2b;
  --docBlockBorderColor: #facc15;
  --docBlockOutlineColor: #3f3f3f;
  --docSignatureBGColor: #3a3a3a;
  --docDescriptionBGColor: #343434;
  --docDescriptionBorderColor: #facc15;
  --docDescriptionTextColor: #e7e7c1;
  --codeBlockBGColor: #1c1c1c;
  --codeBlockBorderColor: #333333;
  --toggleHoverBGColor: #1e1e1e;
  --gotoLinkColor: #facc15;
  --aColor: #facc15;
  --keywordColor: #f87171;
  --variableColor: #93c5fd;
  --typeColor: #fcd34d;
  --numberColor: #fbbf24;
  --commentColor: #86efac;
  --stringColor: #ffcb0b;
  --multiColor: #c792e0;
  --searchBarBGColor: #2a2a1f;
  --searchBarTextColor: #f5f5dc;
  --searchBarPlaceholderColor: #c9c9a5;
  --searchBarShadowColor: rgba(0,0,0,0.5);
  --searchResultsBGColor: #2b2b2b;
  --searchResultsShadowColor: rgba(0,0,0,0.7);
  --searchResultItemBGColor: #3a3a3a;
  --searchResultItemTextColor: #fef9c3;
  --searchResultItemHoverBGColor: #444444;
  --searchResultItemActiveBGColor: #555533;
  --searchResultItemBorderColor: #3f3f3f;
  --searchHighlightColor: #facc15;
  --searchResultBGColor: transparent;
}



/* Search Engine */
#search-container {
    padding: 15px;
    display: flex;
    justify-content: center;
    position: relative;
}

#search-bar {
    width: 60%;
    max-width: 600px;
    padding: 10px 14px;
    font-size: 15px;
    border: none;
    border-radius: 3px;
    background: var(--searchBarBGColor);
    color: var(--searchBarTextColor);
    box-shadow: inset 0 1px 2px var(--searchBarShadowColor);
}

#search-bar::placeholder {
    color: var(--searchBarPlaceholderColor);
}

#search-results {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    z-index: 1000;
    border-radius: 6px;
    padding: 6px 0;
    box-shadow: 0 4px 12px var(--searchResultsShadowColor);
}

#search-results a:first-child {
    margin-top: 0;
}

#search-bar:focus {
    outline: none;
}

#search-results a {
    display: flex;
    align-items: center;
    padding: 10px 14px;
    border-radius: 6px;
    color: var(--searchResultItemTextColor);
    background: var(--searchResultBGColor);
    backdrop-filter: blur(6px);
    font-size: 15px;
    margin: 0;
    transition: background 0.2s, transform 0.15s;
}

#search-results a + a {
    border-top: 1px solid var(--searchResultItemBorderColor);
}

#search-results a:hover {
    background: var(--searchResultItemHoverBGColor);
    transform: translateX(4px);
    cursor: pointer;
}

#search-results a:active {
    background: var(--searchResultItemActiveBGColor);
    transform: translateX(2px);
}

#search-results:empty {
    display: none;
}

.highlight {
    font-weight: bold;
    color: var(--searchHighlightColor);
}

`;

export default function Search() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // inject CSS
    const style = document.createElement("style");
    style.textContent = searchCss;
    document.head.appendChild(style);
    // force light theme
    document.documentElement.setAttribute("data-theme", "htmlLight");

    return () => {
      style.remove();
    };
  }, []);

  useEffect(() => {
    // close on outside click
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const candidates = filterResults(results, query);

  return (
    <div
      id="search-container"
      ref={containerRef}
      className="relative w-full max-w-md mx-auto"
    >
      <input
        id="search-bar"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Type to search..."
        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      {open && candidates.length > 0 && (
        <div
          id="search-results"
          className="absolute z-10 mt-2 w-full rounded-2xl bg-white shadow-lg border border-gray-200"
        >
          {candidates.map((c) => (
            <a
              key={c.link}
              href={c.link}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
              dangerouslySetInnerHTML={{
                __html: highlightMatch(c.name, query),
              }}
            ></a>
          ))}
        </div>
      )}
    </div>
  );
}
