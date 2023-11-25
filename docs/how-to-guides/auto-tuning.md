---
sidebar_position: 3
---

# Auto tune using context-dependent holes

An MExpr program can contain decision variables, or so called holes, whose
values are to be decided by an autotuner. A hole is introduced into a program
using the keyword `hole`. The `hole` takes as argument the type of the hole
(either `Boolean` or `IntRange`) and its default value. Additionally, an
`IntRange` hole expects a minimum and maximum value.

For example, the following defines a function `sort` that chooses sorting
algorithm based on input data length.

```mc
let sort = lam seq.
  let threshold = hole (IntRange {default = 10, min = 0, max = 10000}) in
  if leqi (length seq) threshold then insertionSort seq
  else mergeSort seq
in
```

We can invoke the autotuner using the `mi tune` subcommand:

```
mi tune sort.mc
```

The autotuner uses offline profiling in order to assign the holes values such
that the execution time of the program is minimized. Available command-line
options (for setting search strategy, stopping condition, etc.) are listed in
`stdlib/tuning/tune-options.mc`.

The result of `mi tune` is a tune file, which by default is written to
`sort.tune` (if your program is called `sort.mc`). To compile the program using
the tuned values, invoke the main compiler with the `--tuned` option:

```
mi compile --tuned sort.mc
```

Passing the `--tuned` flag to `mi tune` makes the auto tuner restart the tuning
using the values in the tune file as start values:

```
mi compile --tuned sort.mc
```

To tune and compile the program in one go, provide the `--compile`
flag to `mi tune`:

```
mi tune --compile sort.mc
```

Note that `mi compile sort.mc` compiles the program using the default values of
the holes.

## Context-Dependent Holes

A `hole` takes an additional (optional) parameter `depth`, which represents the
length of the most recent function call history that should influence the choice
of the value of the hole. By default (if not provided), then `depth` is 0, which
means that the hole is assigned one value globally by the autotuner. If `depth`
is larger than 0, then the hole is potentially assigned a different values for
each possible context.

For instance, the following defines a function `hcreate` that chooses between
two sequence representations:

```mc
let hcreate = lam n. lam f.
  let rope = hole (Boolean {default = true, depth = 1}) in
  (if rope then createRope else createList) n f
in
```

The hole `rope` has `depth` one, which means that its value might be different
for two different calls to `hcreate`.
