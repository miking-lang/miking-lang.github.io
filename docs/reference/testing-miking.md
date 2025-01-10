---
---

# Testing Miking

The Miking test-suite is built to test *every* `.mc` file under `src/`
in the repository, with varying invocations, compile flags, etc.,
while making it very flexible to use.

## Running Tests

There is one primary entry point to running the test-suite:
`misc/test`. It has no mandatory arguments, and will by default turn
off all optional test collections, uses a "cheated" `mi` (see the
`cheat` target [here](make-targets#building-the-compiler)), and runs
all remaining tests.

There are three kinds of optional arguments: flags, which specify
which `mi` to use, test collections to include, and files to test:

```bash
misc/test [FLAGS] [COLLECTIONS] -- [FILES]
```

:::tip

The other entry point is `misc/watch`, which takes exactly the same
arguments, but reruns tests whenever any file in the repository
changes. Note that `misc/watch` requires `entr` to be installed.

:::

:::warning

The test-suite must be run from the root of the repository. The runner
should detect attempts to do otherwise and refuse to run.

:::

### Reading Test Output

All outputs (both standard out and standard err, as well as
intermediate results such as executables) are stored in the `build`
folder in the root of the repository. The folder structure mirrors the
folder structure of the rest of the repository, i.e., outputs from
tests in `src/stdlib/parser` can be found under
`build/src/stdlib/parser`.

Each file follows a (rather verbose) naming scheme to clarify its
origin: `filename.test-collection.mi-version.tag` for intermediate
outputs, plus `.out` and `.err` extensions for standard out and
standard err, respectively. The `tag` is chosen by the test
collection. For example:

```bash
$ ls build/src/stdlib/annotate*
build/src/stdlib/annotate.mc.constructor-types.installed.constructor-types
build/src/stdlib/annotate.mc.constructor-types.installed.constructor-types.err
build/src/stdlib/annotate.mc.constructor-types.installed.constructor-types.out
build/src/stdlib/annotate.mc.constructor-types.installed.constructor-types-run.err
build/src/stdlib/annotate.mc.constructor-types.installed.constructor-types-run.out
build/src/stdlib/annotate.mc.normal.installed.eval.err
build/src/stdlib/annotate.mc.normal.installed.eval.out
build/src/stdlib/annotate.mc.normal.installed.exe
build/src/stdlib/annotate.mc.normal.installed.exe.err
build/src/stdlib/annotate.mc.normal.installed.exe.out
build/src/stdlib/annotate.mc.normal.installed.run.err
build/src/stdlib/annotate.mc.normal.installed.run.out
```

Here `normal` are default tests, `eval` are results of interpretation,
`exe` is the compiled executable and compile logs, and `run` are
results of running the executable.

### Selecting `mi` version

The `mi` version to use is specified by one of `--installed` (using an
`mi` from your `$PATH`), `--bootstrapped` (using a fully bootstrapped
compiler), and `--cheated` (using a compiler built using an installed
`mi`). The default is `--cheated`, and more than one option can be
given to run tests for more than one compiler.

```bash
# Run tests using an installed `mi`
misc/test --installed
```

### Selecting Test Collections

Some tests are split into collections (see
[below](#specifying-tests)), which must be turned on to run. These can
be specified by name, or using the `smart` or `all`
pseudo-collections. `smart` includes all collections whose
dependencies are met, while `all` includes all collections except
those with unmet *hardware* requirements.

```bash
# Run tests not in a test collection, as well as those in the `java`
# collection, regardless of whether its dependencies are met
misc/test java

# Any number of collections can be included
misc/test microbenchmarks tuning

# Run all tests whose dependencies are met
misc/test smart
```

### Selecting Files to Test

The test-suite can be instructed to run only those tests related to an
explicit set of files. This is useful when working on a particular
feature. Such files must be given after a `--` argument.

```bash
# Run all tests related to `src/stdlib/annotate.mc`
misc/test smart -- src/stdlib/annotate.mc

# Test all files in the `src/stdlib/parser` folder
misc/test smart -- src/stdlib/parser/**/*.mc
```

:::warning

Note that explicitly specifying files does not automatically turn on
related test collections. Including the `smart` collection, as in the
examples above, is typically a good idea.

:::

## Specifying Tests

Tests are specified in `misc/test-spec.mc`. By default, all tests in
all `.mc` files are expected to pass, both through interpretation (`mi
eval`) and compilation (`mi compile` and running the
executable). Exceptions to this, as well as new tests, can be added
through *test collections*, specified at the end of
`misc/test-spec.mc`. This section gives a brief overview of the
concepts; for more detail, see the documentation comments for
`TestCollection` in
[`misc/test-spec.mc`](https://github.com/miking-lang/miking/blob/develop/misc/test-spec.mc),
as well as the collections already defined at the end of the same
file.

A test collection is defined via `testColl`:

```mcore
{ testColl "name-of-collection"
  with ...
}
```

The collection is configured through a record update, with a number of
possible fields.

### Changing Default Tests

Some files cannot be tested with the default approach, are expected to
fail, or take too long to run as part of the default test suite. We
can change these by providing the `exclusions` and/or
`conditionalInclusions` functions. These functions are expected to
"mark" files, e.g.:

```mcore
{ testColl "example"
  with exclusions = lam api.
    api.mark { defaultTasks with interpret = Fail (), run = Dont () }
      (api.strsToPaths ["stdlib/foo.mc", "stdlib/bar.mc"])
}
```

Note that the files marked by `conditionalInclusions` are only tested
when the collection is enabled, while files marked by `exclusions` are
tested regardless.

### Checking Dependencies

Some tests require, e.g., external libraries to be installed to
run. The `checkCondition` function is expected check for such
cases. There are three cases, mostly self-explanatory:
`ConditionsMet`, `ConditionsUnmet`, and `ConditionsImpossible`. The
last of these should be used if a hardware dependency is unmet, to
exclude this collection from the `all` pseudo-collection.

Note that `checkCondition` is expected to directly interact with the
outside world by, e.g., running external commands.

```mcore
{ testColl "toml"
  with checkCondition = lam.
    if eqi 0 (command "ocamlfind query toml >/dev/null 2>&1")
    then ConditionsMet ()
    else ConditionsUnmet ()
  conditionalInclusions = lam api.
    -- ...elided...
}
```

### Adding New Tests

New tests are added by providing the `newTests` function. Tests often
have multiple steps, e.g., compiling a file, then running the
executable. A new step can be added using one of three functions:

- `success` adds a step expected to succeed and produce no outputs.
- `fail` adds a step expected to fail and produce no outputs.
- `mid` adds a step expected to succeed and produce exactly one
  output.

All steps are expected to take exactly one file as input. Each step is
specified as a shell command to run, with a few placeholders to be
filled in:

- `%i`: the input file.
- `%o`: the output file for a `mid` step.
- `%m`: an invocation of the appropriate version of `mi`. *Do not* use
  `mi` directly.

Note that no step should write to *any* file except `%o` (i.e.,
`success` and `fail` should not write to any file, only standard out
and standard error). This is to ensure, amongst other things, that all
tests can run in parallel and that no tests will clobber results from
other tests.

Note also that each step is given a "tag", which should be unique
across steps in the same test collection.

```mcore
{ testColl "mlang-pipeline"
  with newTests = lam api.
    let files = api.strsToPaths [...] in
    for_ files (lam mc.
      let exe = api.mid {input = mc, cmd = "%m compile --test --mlang-pipeline %i --output %o", tag = "mlang"} in
      api.success {input = exe, cmd = "./%i", tag = "mlang-run"})
}
```
