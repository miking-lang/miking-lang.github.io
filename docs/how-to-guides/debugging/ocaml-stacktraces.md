# Getting stack traces when using the OCaml backend

There are two primary ways to get stack traces from a program compiled
with the OCaml backend. Note that regardless of the method used most
functions will have mangled names, i.e., they differ somewhat from the
source code, but the connection is typically quite clear
nonetheless. For example, a function `typeCheckExpr` in a language
fragment `ExtMCore` might become something like
`camlDune__exe__Program__v_vExtMCore_typeCheckExpr_142839`.

First, the `OCAMLRUNPARAM` environment flag can be set to `b` to
instruct the OCaml runtime to emit a backtrace when it encounters an
exception:

```bash
OCAMLRUNPARAM=b ./program
```

Second, the program can be run using a debugger such as `gdb`:

```bash
gdb ./program

# Once inside gdb:
run <program args>

# Use `bt` to get a backtrace when the program has crashed or been interrupted:
bt
```

:::tip

If the program prints an error and exits explicitly (e.g., via `exit
1`) rather than throwing an exception and crashing `gdb` can still
extract a backtrace by adding a breakpoint to `exit`:

```bash
# Inside gdb, before running the program:
break exit
# Then run as usual, the program will break just before exiting, at which point you can run `bt`
```

:::
