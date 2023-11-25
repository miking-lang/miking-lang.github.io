---
sidebar_position: 2
---

# Accelerate expressions

When compiling using `mi compile`, expression acceleration can be enabled via
the `--accelerate` flag. When enabled, parts of the program is compiled in an
accelerated mode, as controlled by the `accelerate` expression. The main part
of the program is compiled to the default backend (OCaml), while expressions
used in `accelerate` expressions are compiled to an accelerate backend, chosen
automatically by the compiler.

## Accelerate backends

The current compiler has support for two different accelerate backends, both of
which require a GPU to compile the code. The Futhark backend is used when at
least one of the `map`, `map2`, or `reduce` parallel keywords are used within
an accelerated expression. To make use of this backend, `futhark` and its
dependencies must be installed
(see [installation instructions](https://futhark.readthedocs.io/en/stable/installation.html)).
If the `loop` parallel keyword is used in an accelerated expression, the CUDA
backend is used. At least one of these keywords must be used in the accelerated
code, or the compiler will complain as the accelerated code would execute
sequentially.

Both backends currently require an installation of CUDA. In addition, the CUDA
backend requires an Nvidia GPU with support for unified memory (Kepler
architecture or later).

## Usage

When enabling acceleration via `mi compile --accelerate`, the parallel keywords
must be used for parallel execution. Any code used in an `accelerate` is passed
to the automatically chosen accelerate backend. Within such code, certain
parallel keywords must be used to execute on the GPU. The parallel keywords
supported in the Futhark backend are `map`, `map2`, and `reduce`. For the CUDA
backend, this is `loop`. Note that there are limitations on what kinds of
expressions can be accelerated. The compiler will report errors in such cases.

When compiling without enabling acceleration, the `accelerate` expressions in
the program are ignored, and all parallel constructs are executed sequentially.

### Recommended workflow

The recommended workflow when using acceleration is as follows. First, develop
the program in *debug mode*, using the `--debug-accelerate` flag. This enables
static well-formedness checks plus additional dynamic checks for the
accelerated code, plus provides improved error messages on errors for built-in
functions. This mode produces significantly better error messages than when
compiling without any flags, but has an impact on the runtime performance.

Once the program in debug mode works as expected, the program is compiled in
*accelerate mode*. In this mode, the `--accelerate` flag is set to enable
acceleration. The accelerated binary produced when compiling in accelerate mode
does not fail given that the debug binary did not fail.

Note that the `--debug-accelerate` and `--accelerate` flags are mutually
exclusive. That is, you cannot use both configurations simultaneously.

### Example

Assume the program below is saved in a file `example.mc`.

```mc
mexpr
let f = lam x. addi (muli x 2) 1 in
let s = [1,2,3] in
accelerate (map f s) -- result = [3,5,7]
```

If we compile the program as `mi compile example.mc`, acceleration is disabled,
so the `map` is executed sequentially. However, if the program is compiled
using `mi compile --accelerate example.mc`, the `map` function `f` is applied
to the elements of `s` in parallel, on the GPU. In this case, as we make use of
`map`, it will execute using the Futhark backend.

See the [accelerate examples](test/examples/accelerate) directory for more
examples.

## Sequence sizes

A significant difference between MExpr and Futhark is that the latter includes
the size of a sequence as part of its type. This means that, for example, when
a function returns a two-dimensional sequence, the inner sequences must all
have the same size (otherwise they would have different types). As this is not
required by MExpr, there are situations where one may need to provide
additional information in MExpr to help the Futhark compiler.

Such information is provided through `utest` expressions of specific shapes.
The idea is that, when the program is compiled in debug mode, the `utest`
expressions are checked at runtime. If such a `utest` fails at runtime when
compiled in debug mode, it would also fail in the accelerated code, but likely
with a less understandable error message.

In the future, the accelerate compiler will statically check that the necessary
size constraints have been added. For now, failing to provide sufficient
information results in a Futhark compilation error.

### Size coercions

Consider the following example

```mc
mexpr
let g : [Int] -> [Int] = lam s. snoc s 5 in
let f : [[Int]] -> [[Int]] = lam s. map g s in
let s : [[Int]] = [[1,2],[3,4]] in
let s : [[Int]] = accelerate (f s) in
s
```

In the function `g`, the size of the array is increased because `snoc` appends
an integer element to the end of the given sequence. In this case, the size of
the output sequence is not the same as the size of the input sequence. Because
of this, the Futhark compiler cannot show that all inner sequences produced in
the `map` of the `f` function will have the same size.

We can show this by adding a `utest` of the shape `utest length s with n in e`
within the inner function. Here `s` is an expression referring to a sequence
and `n` is a variable from an outer scope (or a parameter), such that the
compiler knows it is the same for every inner sequence. We rewrite `f` as

```mc
let f : [[Int]] -> [[Int]] = lam s.
  -- 'n' is defined outside the map function so that the compiler knows this
  -- size will be the same for every inner sequence.
  let n = addi (length s) 1 in
  map
    (lam inner : [Int].
      let inner : [Int] = g inner in
      utest length inner with n in
      inner)
    s
in
```

### Size equality

Consider the following implementation of the transpose operation on a square
matrix:

```mc
let transposeSq : [[Int]] -> [[Int]] = lam m.
  let n = length m in
  create n (lam i : Int.
    let inner : [Int] = create n (lam j : Int. get (get m j) i) in
    inner)
in
...
```

The implementation accepts a matrix of any form, even though this would only
work for a square matrix. By inserting a `utest` of the form
`utest length m with length (head m) in e` (we assume inner dimensions are
non-empty), we can express an equality constraint between the first two
dimensions of the matrix `m`, which may be needed when this function is used in
other places.

## Limitations

There are limitations on what kinds of expressions can be accelerated. The
exact limitations depend on which accelerate backend is used. They apply to
the accelerated expressions and any code these make use of. Many limitations
are checked statically when compiling with `--accelerate`. When using
`--debug-accelerate`, a few limitations are also checked dynamically.

In addition, we assume that the parallel operations performed in a `reduce` or
`loop` yield the same result regardless of execution order. If this requirement
is not met, the results may vary between executions.
