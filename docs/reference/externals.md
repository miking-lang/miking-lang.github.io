---
sidebar_position: 2
---

# Externals

As part of the experimental setup of Miking, we currently support a way
to use external libraries without interfering with the development of
Miking that does not need these external dependencies.

Externals allows you to interact with code in the compilation target language
from miking. Currently, externals are only available in compiled code and are
in an early stage of development. The example below only covers the case where
OCaml is the target language.

You can find an example of externals definitions in
[stdlib/ext/math-ext.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/ext/math-ext.mc) and
[stdlib/ext/math-ext.ext-ocaml.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/ext/math-ext.ext-ocaml.mc).

For the sake of this example, lets say we want to define the exponential
function and that miking targeting OCaml should use `Float.exp` from OCaml's
standard library for its implementation.

We first define the external in a file under [stdlib/ext](https://github.com/miking-lang/miking/blob/develop/src/stdlib/ext), let's
say [stdlib/ext/math-ext.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/ext/math-ext.mc), as

```mc
external externalExp : Float -> Float
```

which makes an external value `externalExp` of type `Float -> Float` available
at the top-level. The corresponding MCore syntax is:

```mc
external ident : Type in expr
```

If the external has side-effects it should be annotated with a `!` after the
identifier, e.g.

```mc
external print ! : String -> ()
```

Each external identifier can only be defined once and externals cannot be
partially applied.


As a temporary solution, the next step is to supply a list of implementation for
our external in the language we target for compilation (in this case OCaml). We
do this by creating a file
[stdlib/ext/math-ext.ext-ocaml.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/ext/math-ext.ext-ocaml.mc)
and in it we define a map from external
identifiers to a list of implementations as follows:

```mc
include "map.mc"
include "ocaml/ast.mc"

let mathExtMap =
  use OCamlTypeAst in
  mapFromSeq cmpString
  [
    ("externalExp", [
      {
        expr = "Float.exp",
        ty = tyarrow_ tyfloat_ tyfloat_ ,
        libraries = [],
        cLibraries = []
      }
    ])
  ]
```

This map associates the `externalExp` external to a list of expressions in the
target language, which here only has one element, namely the function
`Float.exp` from OCaml's standard library. The field `ty` encode the OCaml type
of this value (see [stdlib/ocaml/ast.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/ocaml/ast.mc)), which is needed
to convert values between miking and OCaml. In the case where you have multiple
implementations, the compiler will try to pick the implementation which gives
the least amount of overhead when converting to and from OCaml values. The
`libraries` field list OCaml libraries that are needed to call this function,
and `cLibraries` lists c libraries that are needed during linking. In this case
none are needed since it is part of the standard library. If let's say we wanted
to use `Float.exp` from a library `foo`, then we should instead have the field
`libraries = ["foo"]`. Finally, we need to add `mathExtMap` to
`globalExternalImplsMap` in
[stdlib/ocaml/external-includes.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/ocaml/external-includes.mc).

### Conversion between values
Conversion between Miking values and OCaml values is defined in
[stdlib/ocaml/external.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/ocaml/external.mc). Since externals are in an
early stage of development these conversions are not complete and subject to
change.

The following Basic types are converted without any computational overhead:

| **Miking type** | **OCaml type** |
|:----------------|:---------------|
| `Int`           | `int`          |
| `Float`         | `float`        |
| `Bool`          | `bool`         |

The overhead of converting sequences to OCaml data-structures is proportional to
the length of the sequence times the conversion cost for the type of the
elements. Strings in Miking is a special case of sequences.

| **Miking type**      | **OCaml type** | **Comment**                                                                                 |
|:---------------------|:---------------|:--------------------------------------------------------------------------------------------|
| `[A]`                | `'a list`      |                                                                                             |
| `[A]`                | `'a array`     | A copy is made, mutating the OCaml array does not mutate the sequence.                      |
| `[Char]` or `String` | `string`       | The Miking string is converted to, and the OCaml string is assumed to be, encoded in UTF-8. |

Tensors are passed by reference to OCaml, i.e. mutating the corresponding
data-structure in OCaml will mutate the tensor. As a temporary solution the
conversion depends on the underlying implementation of the tensor, which is
controlled by the tensor create functions `tensorCreateDense`,
`tensorCreateCArrayInt`, and `tensorCreateCArrayFloat`. The main purpose of the
latter two is to allow data-sharing with C libraries via OCaml bindings.

| **Miking type** | **OCaml type**                                   | **Comment**                                                         |
|:----------------|:-------------------------------------------------|:--------------------------------------------------------------------|
| `Tensor[Int]`   | `Bigarray.((int, int_elt, c_layout) genarray.t)` | Must use `tensorCreateCArrayInt`, otherwise a runtime error occurs. |
| `Tensor[Float]` | `Bigarray.((float, float64_elt, c_layout) genarray.t)` | Must use `tensorCreateCArrayFloat`, otherwise a runtime error occurs. |
| `Tensor[Int]` of rank 1   | `Bigarray.((int, int_elt, c_layout) Array1.t)` | Must use `tensorCreateCArrayInt`, otherwise a runtime error occurs. |
| `Tensor[Float]` of rank 1 | `Bigarray.((float, float64_elt, c_layout) Array1.t)` | Must use `tensorCreateCArrayFloat`, otherwise a runtime error occurs. |

Tuples are converted without overhead if the conversion of their elements are
without overhead. The same is true for arrow types. The fields in Miking records
are un-ordered while they are ordered in OCaml so there is some overhead
involved when converting records as each field of the Miking records needs to be
projected to form an new OCaml records, and vice versa. The fields of the Miking
record are associated with the fields of the OCaml record by an explicit mapping
defined in the `*.ext-ocaml.mc` file.

If the Miking type is abstract, i.e. we define it as
```mc
type MyType
```
then no conversion is performed to and from this type.

Please consult [stdlib/ext/ext-test.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/ext/ext-test.mc) and
[stdlib/ext/ext-test.ext-ocaml.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/ext/ext-test.ext-ocaml.mc), for more
examples.

### Sundials
A more involved example on the use of externals is an interface to the
[Sundials](https://computing.llnl.gov/projects/sundials) numerical DAE solver.
You find the implementation in
[stdlib/sundials/sundials.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/sundials/sundials.mc) and
[stdlib/sundials/sundials.ext-ocaml.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/sundials/sundials.ext-ocaml.mc).
Note that these externals depends on the library `sundialsml`.


Installing this library involves first installing the Sundials C library. On
`ubuntu 20.04` you can do this by:

```
sudo apt-get install libsundials-dev
```

On `macOS`, using Homebrew, you instead do:

```
brew install sundials
```

Then install the ocaml bindings
[SundialsML](https://inria-parkas.github.io/sundialsml/) via `opam`

```
opam install sundialsml
```

Currently, this library cannot be installed on the multi-core switch but you
instead have to use another opam switch, e.g.

```
opam switch 4.12.0
```

After this you have to rebuild the compiler, e.g.

```
make clean
make
```

To run the sundials-specific test suite, use the command:

```
misc/test sundials
```

To install for the current user, run `make install` as usual.


### Ipopt
Another example use of externals is an interface to the constrained Non-Linear
Program solver [Ipopt](https://coin-or.github.io/Ipopt/). This interface is
defined in [stdlib/ipopt/ipopt.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/ipopt/ipopt.mc) and
[stdlib/ipopt/ipopt.ext-ocaml.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/ipopt/ipopt.ext-ocaml.mc). This library
depends on both the OCaml library [ipoptml](https://github.com/br4sco/ipoptml)
and the ipopt c library.

To use this library you need to do the following:

Install the ipopt c library, which you can do on ubuntu 20.04 with
```
sudo apt-get install coinor-libipopt-dev
```

Install dependencies for [ipoptml](https://github.com/br4sco/ipoptml),
```
opam install ctypes ctypes-foreign
```

Clone the [ipoptml](https://github.com/br4sco/ipoptml) repo and in its root run
```
dune build
dune install
```

You can then test the solver in Miking with

```
misc/test ipopt
```

### External Dependent Utests Pruning
As part of the parsing (see `prune_external_utests` in `parserutils.ml` for
details) utests that depend on externals are marked and removed. This done in
the following steps:
1. Dead code removal is performed to remove dead code, including any dead code
   inside utests that might reference externals. This is done to reduce the
   number of false positivities.
2. Utests that references externals are marked and removed.
3. Dead code removal is run again to remove any dead code that result from the
   removal of utests in step 2.

Additionally, if `boot` or `mi` is run without the `--test` flag, all utests are
removed prior to dead code removal as all utests can then be considered dead
code. This both allows the dead code removal to remove more dead code and
simplifies the pruning of utests implementation. If any utest pruning is
performed, a warning summarizing pruned utests is printed to _stdout_.

The pruning of utests can be disabled with the `--disable-prune-utests` flag and
debugged with `--debug-prune-utests` (only in boot).

Moreover, pruning of utests can be disabled for a selection of externals, which
allows for a more granular approach to the testing of external dependent code
(see below).

#### Selective pruning
During compilation, the available OCaml packages on the
current system is queried and externals depending on these packages are excluded
from utests pruning. In other words, utests that depend on externals that can be
compiled on the system are kept, while all others are removed. The listing of
OCaml packages is based around `dune installed-libraries` (see
`externalListOcamlPackages` and `externalGetSupportedExternalImpls` in
`external-includes.mc` so this functionality should not require any additional
dependencies. For boot and the interpreter, _all_ external dependent utests are
removed as these currently do not support externals at all.

#### Test organization
`make test-all` runs all tests, disabling utest pruning for compiled files
(i.e. if dependencies are not met, you get an error). The recepie `make
test` runs all tests but non-supported tests which is
handy if your system only meet the dependencies of a subset of the
externals. Interpreted files are always pruned of external dependent
utests. Please consult the [testing page](/docs/reference/testing-miking)
or makefiles for more details.

#### Authoring new external libraries
To maintain the flexibility of the test organization, future external libraries
must ensure that externals, or external dependent identifiers are only fully
applied inside utests. To verify that this is the case you can just run `boot
eval --test <file.mc>` and verify that you get a non-zero exit code on the
library that you are currently working on.
