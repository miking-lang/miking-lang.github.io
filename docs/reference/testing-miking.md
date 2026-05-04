---
---

# Testing Miking

The Miking test-suite is built to test *every* `.mc` file under `src/`
in the repository, with varying invocations, compile flags, etc.,
while making it very flexible to use.

## Running Tests

There is one primary entry point to running the test-suite:
`misc/test`. It has no mandatory arguments, and will by default run
all tests except those with missing external dependencies, using a
"cheated" `mi` (see the `cheat` target
[here](make-targets#building-the-compiler)).

:::tip

If you have not yet run any tests you may need to build `misc/test`
first:

```bash
make misc/test
```

:::

The `misc/test` executable has a fairly large number of flags, all of
which can be seen with `misc/test --help`, but here are some
particularly important ones:

- `--make` runs tests using `make`. This is the default when you clone
  the repository. `make` will always run all specified tests, even if
  nothing has changed, and will never rebuild the compiler used.
- `--tup` runs tests using `tup`. `tup` has dependency tracking,
  meaning tests will only run if something has changed, and it will
  automatically rebuild the chosen compiler if necessary. The first
  time `--tup` is used some setup will be performed; read what's
  printed and follow instructions. After that `--tup` becomes the
  default.
- `--watch` uses [entr](https://eradman.com/entrproject/) to watch for
  changes in the repository and automatically rerun tests when
  something changes.

:::warning

The test-suite must be run from the root of the repository. The runner
should detect attempts to do otherwise and refuse to run.

:::

### Reading Test Output

The test suite attempts to make the output of tests run be concise, as
such it only prints output of tests that fail, and if that output is
long then only the first and last few lines are displayed. This is
often enough to, e.g., pinpoint _where_ an error is, because location
information is printed early, but sometimes you do need the entire
output.

All outputs (both standard out and standard err, as well as
intermediate results such as executables) are stored in the `build`
folder in the root of the repository. The folder structure mirrors the
folder structure of the rest of the repository, i.e., outputs from
tests in `src/stdlib/parser` can be found under
`build/src/stdlib/parser`.

Each file follows a naming scheme to clarify its origin:
`filename.mi-version.tag` for intermediate outputs, plus `.out` and
`.err` extensions for standard out and standard err, respectively. The
`tag` is chosen by the test runner. For example:

```bash
$ ls build/src/stdlib/parser/lexer.mc*
build/src/stdlib/parser/lexer.mc.cheat.compile
build/src/stdlib/parser/lexer.mc.cheat.compile.err
build/src/stdlib/parser/lexer.mc.cheat.compile.out
build/src/stdlib/parser/lexer.mc.cheat.eval.err
build/src/stdlib/parser/lexer.mc.cheat.eval.out
build/src/stdlib/parser/lexer.mc.cheat.run.err
build/src/stdlib/parser/lexer.mc.cheat.run.out
```

Here `eval` is for results of interpretation, `compile` is for the
compiled executable and compile logs, and `run` is for results of
running the executable.

### Selecting `mi` version

The `mi` version to use is specified by one of `--installed` (using an
`mi` from your `$PATH`), `--boot` (using a fully bootstrapped
compiler), and `--cheat` (using a compiler built using an installed
`mi`). The default is `--cheat`, and more than one option can be given
to run tests for more than one compiler.

```bash
# Run tests using an installed `mi`
misc/test --installed
```

:::tip

You would typically use `--installed` if you're working on a library,
`--cheat` if you're working on the compiler and can get away with it,
and `--boot` if you're changing the compiler such that `--cheat` isn't
enough.

`--cheat` is typically a good default.

:::

### Selecting Files to Test

The test-suite can be instructed to run only those tests related to an
explicit set of files. This is useful when working on a particular
feature.

```bash
# Run all tests related to `src/stdlib/annotate.mc`
misc/test src/stdlib/annotate.mc

# Test all files in the `src/stdlib/parser` folder
misc/test src/stdlib/parser/**/*.mc
```

## Specifying Tests

Tests are specified in `misc/test-spec.mc`, which uses the library in
`src/stdlib/test-spec.mc`. Both of these contain documentation, the
former on choices made for the Miking test suite in particular, the
latter for the building blocks used. The remainder of this page gives
a brief overview of `misc/test-spec.mc`.

:::tip

When running `misc/test`, it will first check if `misc/test-spec.mc`
has changed, in which case it will recompile itself to make sure
everything is up-to-date.

This depends on having `mi` available on your `PATH`, which might not
be the case if you have just cloned the repository. In such a case you
can either use `make install` to install `mi`, or use `make misc/test`
to rebuild `misc/test` with a locally built `mi`.

:::

`misc/test-spec.mc` first defines three substituters, one for each
version of `mi` tests can be run by. These are later used by putting
`%m` in the command of tests.

:::warning

When a test needs to run `mi` it _must_ use `%m` rather than `mi`
explicitly. The latter would always use an installed `mi`, regardless
of what the user specified.

:::

Then it calls `testMain` with a callback function used to declare all
tests, which contains the bulk of the test configuration.

First is a number of checks for external dependencies, using
`api.dependency`. These perform side-effects, running external
commands to check what's installed.

```mc
let javac = api.dependency (lam.
  if sysCommandExists "javac"
  then DepAvailable ()
  else DepUnavailable ()) in
```

Next is a few calls to `api.endStep` and `api.midStep`. These define
test steps that _can_ be enabled for source files. `midStep` declares
a step that outputs a file of some sort, while `endStep` is a step
that only uses stdout and stderr. Note the use of `%m` to call `mi`,
`%i` to refer to inputs, and `%o` to refer to the output.

```mc
let compile = api.midStep
  { uses = [origin]
  , tag = "compile"
  , cmd = "%m compile --disable-prune-utests --test %i --output %o"
  } in
let run = api.endStep
  { uses = [compile]
  , tag = "run"
  , cmd = "command %i"
  } in
```

Finally, test steps are enabled/disabled using `api.tests`. These take
effect in the order they're written, with later calls overwriting
earlier ones. For example, below we first turn on default test steps
for all `.mc` files, then disable them for `src/main/mi.mc` in
particular.

```mc
api.tests []
  (strEndsWith ".mc")
  [(eval, succ), (compile, succ), (run, succ)];

-- The compiler itself is tested through the bootstrap process, so
-- skip it here
api.tests []
  (eqString "src/main/mi.mc")
  [(eval, dont), (compile, dont), (run, dont)];
```

The remainder of the file defines more tests and files to run them on,
roughly organized with related files/tests close to each other.

:::tip

The heading above each group of tests is a remnant of our previous
test system, which had a concept of explicitly named test
collections. Of course, grouping related things by proximity is useful
for readability even if the test system itself makes no use of it,
thus it remains.

:::
