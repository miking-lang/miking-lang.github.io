---
sidebar_position: 1
---

# Profiling

Profiling of an MExpr program can be enabled using the `--debug-profile` flag
when compiling or evaluating a program. While this flag also exists in the boot
interpreter, it produces a subset of profiling information than the profiling
approach used in `mi` (which is what is detailed below).

## Profiling output

The profiling results are stored in a file `mexpr.prof` in the current working
directory. If such a file already exists, it will be overwritten. This file
is created when:
* The execution of a compiled program, which had been compiled with the
  `--debug-profile` flag enabled, terminates.
* The interpreter of a program terminates, and the `--debug-profile` flag was
  enabled.

Note that no profiling information is generated during the compilation step,
because the profiling code is instrumented into the produced binary.

### Output format

The profiling output contains one line per top-level function in the program,
excluding those that are never used during an execution of the program. The
order of the lines is based on the order in which the functions have been
defined in the program. Functions defined in included files will also be listed
in the profiling output, given that they are used.

Each line of output consists of five space-separated columns:
1. A string, denoting the name of the file and the position within the file,
   encoded as `[<start row>:<start col>-<end row>:<end col>]`, where the function
   is defined.
2. A string, denoting the name of the function.
3. An integer, denoting the number of calls made to the function. The counter
   includes self-recursive calls.
4. A floating-point number, denoting the exclusive time spent in the function.
   This is the time spent in a call, except the time spent in calls to other
   top-level functions (including itself).
5. A floating-point number, denoting the inclusive time spent in the function.
   This is the total time spent in all calls to the function, including that
   spent in calls to other top-level functions. As this includes self-recursive
   calls, this value may be greater than the total runtime.

### Postprocessing

The output format was chosen to be easily sorted using external tools, such as
the `sort` command in Unix. Below we provide two examples of how the output can
be sorted. These assume that the profiling output is stored in `mexpr.prof` and
that the sorted profiling output should be stored in `sorted.prof`.

To sort the functions by the number of times they were called, with the most
frequently called function at the top:
```
cat mexpr.prof | sort -k3 -r -n > sorted.prof
```

To sort the functions by the exclusive time spent within them, placing the
function with the highest exclusive time at the top:
```
cat mexpr.prof | sort -k4 -r -g > sorted.prof
```

## Notes

This instrumentation is currently only performed on functions defined on the
top-level in a program. The runtime of local functions and intrinsic functions
is instead added to the top-level function in which they are used. In addition,
partially applied functions are not profiled.

Importantly, this profiling works by instrumenting the code with extra calls.
The runtime overhead when enabling this flag is significant, especially when
using the evaluator.
