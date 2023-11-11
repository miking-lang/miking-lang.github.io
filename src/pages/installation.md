
# Installing Miking


Before you can use the Miking system, you need to install
[OCaml](https://ocaml.org/) and the
[OPAM](https://opam.ocaml.org/) package manager.

After the installation, you need to install the OCaml compiler by
running the following:
```
opam update
opam switch create miking-ocaml 5.0.0
eval $(opam env)
```

After this, you need to install the `opam` packages `dune` and `linenoise` by
running the following:

```
opam install dune linenoise
```

Note that the `opam switch` command lets you have several OCaml installations on
your system. When using the Miking system, you need to use the `miking-ocaml`
switch. Running `opam switch miking-ocaml` followed by `eval $(opam env)`
always takes you back to the correct switch.

To compile the project, go back to the Miking repository and execute:

```
make
```

This creates two binaries in the `build` directory: `build/boot` and
`build/mi`. `build/boot` is the bootstrap interpreter, and `build/mi`
is the main Miking executable, containing both an interpreter and a
compiler. You will mainly be using `mi`, but `boot` provides a few
features not yet available in the main executable, such as a REPL.

To run tests checking that everything has been installed correctly,
use

```
make test
```

Alternatively, you can use `make test-all` to run the full test suite. Beware
that this may take some time. Alternatively you can use `make
test-all-prune-utests` which will exclude tests whose external dependencies are
not met on the current system (with the exception of `pyml`).

To run a hello world program, create a file `hello.mc` with the following code,

```
mexpr print "Hello world!\n"
```

and then run it using the command:

```
build/mi hello.mc
```

To help Miking find its standard library, you should define the environment variable `MCORE_LIBS` with an entry for `stdlib` pointing to the appropriate path, for example by running the following:

    export MCORE_LIBS=stdlib=`pwd`/stdlib

To run the Miking compiler, you must also extend the `OCAMLPATH` variable to point to the build directory containing the `boot` library:

    export OCAMLPATH=`pwd`/build/lib:$OCAMLPATH

If you install Miking on your system, neither of these settings is necessary.
To install the compiler along with the standard library for the current
user, issue:

```
make install
```

This will install `mi` to `$HOME/.local/bin` and the standard library to `$HOME/.local/lib/mcore/stdlib`, according to the [systemd file system hierarchy overview](https://www.freedesktop.org/software/systemd/man/file-hierarchy.html). If `MCORE_LIBS` is unset, Miking will look in this installation folder as its default library location. The `boot` OCaml library will also be installed to your OPAM prefix. NOTE: on some systems (e.g., macOS), you need to _manually_ add `$HOME/.local/bin` to your `PATH` environment variable to access the `mi` command from your shell.

Conversely, to uninstall, issue:

```
make uninstall
```
