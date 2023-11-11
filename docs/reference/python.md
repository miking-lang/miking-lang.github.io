---
sidebar_position: 4
---


# Python

Python intrinsics, which allow calling Python code from MCore, are offered as an optional feature for the `boot` bootstrap interpreter. Note: it is not yet supported for the Miking compiler.

To build the project with Python integration you need to have [Python 3](https://www.python.org) installed on your system.
You will also need to install any Python libraries you want to use (for example using pip).

In addition, you need the [pyml](https://github.com/thierry-martinez/pyml) OCaml Python bindings, available via `opam`:

```
opam install pyml
```

`boot` will automatically be compiled with Python support when the `pyml` package is installed.

NOTE: Currently, there seems to be a problem with the current OPAM bindings with the multicore switch. If the above command fails, try to run the following and then install `pyml` again:

```
opam pin stdcompat 15
```

To run the Python-specific test suite:

```
make test-boot-py
```

To install for the current user, run `make install` as usual.

## Usage

The following example shows how to use the intrinsics to sort a sequence using
Python's builtin `sorted` function.

```ocaml
let builtins = pyimport "builtins"

let x = [5.,4.5,4.,1.,1.5]
let y = pycall builtins "sorted" (x,)
let x_sorted = pyconvert y
```

`pycall` is the main piece of the Python intrinsics: in the example above,
it is used to call the function `sorted` from the `builtins` module, imported
with the `pyimport` intrinsic. As the example shows, arguments are
passed to the `pycall` intrinsic using tuples (remember that `(x,)` is a
singleton tuple containing `x`). The result of a `pycall` (`y` in the example
above) is a Python value, which can either be passed to other Python functions,
or converted back to an MCore sequence using the `pyconvert` builtin.

`pycall` can also be used to call methods of objects by passing an object
instead of a module as the first argument. For example, the following code
will invoke the `count` method of a list:

```ocaml
let builtins = pyimport "builtins"

let pylist = pycall builtins "list" ([1,1,2],)
let ones = pyconvert (pycall pylist "count" (1,))
```

In the examples above, we use the `builtins` module to access Python's builtins.
Other modules can also be imported as long as they are available in the Python
path: for instance, it is perfectly possible to import `numpy` or `matplotlib`,
assuming that they are installed.

The following example shows how a numpy `nparray` can be created and converted
to an MCore sequence. The key here is to use numpy's `tolist` method first,
since conversion directly from `nparray` is not supported.

```ocaml
let rnd = pyimport "numpy.random"

let nparray = pycall rnd "normal" (0., 0.1, 10)
let mc_seq = pyconvert (pycall nparray "tolist" ())
```

In the next example, we use `matplotlib` to produce a plot; this works in
exactly the same way as in a regular Python program.

```ocaml
let plt = pyimport "matplotlib.pyplot"
let np = pyimport "numpy"

let x = pycall np "arange" (0, 4, 0.1)
let y = pycall np "cos" (x,)
let _ = pycall plt "plot" (x, y)
let _ = pycall plt "show" ()
```

## Conversion between MCore and Python

When calling a Python function using the `pycall` builtin, the arguments will be
automatically converted from MCore values to Python values. Similarly, the
opposite conversion is performed when using `pyconvert` on the result of a
`pycall`. This section explains the details of these conversions.

## From MCore to Python

| MCore type      | Python type |
|:--------------- |:----------- |
| Bool            | bool        |
| Int             | int         |
| Char            | N/A         |
| Float           | float       |
| [Char] (String) | str         |
| [a]             | List        |
| ()              | None        |
| Record          | Dict        |
| Tuple (Record)  | Tuple       |
| other           | N/A         |

## From Python to MCore

| Python type | MCore type      |
|:----------- |:--------------- |
| bool        | Bool            |
| int         | Int             |
| long        | Int             |
| float       | Float           |
| str         | [Char] (String) |
| List        | [a]             |
| None        | ()              |
| Dict        | Record          |
| Tuple       | Tuple (Record)  |
| other       | N/A             |
