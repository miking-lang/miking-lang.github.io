---
sidebar_position: 4
---

# Parallel programming

Miking offers a set of externals for shared-memory parallelism using
atomic operations and threads running on multiple cores.

The parallel programming primitives consist of atomic references and functions
for creating and synchronizing threads. In addition to the examples below, more
documentation can be found in the standard library at
[stdlib/multicore](stdlib/multicore/).

## Atomic References

Atomic references are similar to ordinary references, except that operations
performed on them are *atomic*, which means that no other execution thread can
interfere with the result. In other words, they are safe to use in
multi-threaded execution. Atomic references are provided in
[multicore/atomic.mc](stdlib/multicore/atomic.mc).

`atomicMake` creates a new atomic reference and gives it an initial value. The
value of the atomic reference can be read by `atomicGet`:

```
include "multicore/atomic.mc"
mexpr
let a = atomicMake 0 in
utest atomicGet a with 0 in
```

`atomicCAS a oldVal newVal` performs an atomic compare-and-set, that is, it only
updates the value of `a` to `newVal` if the current value is identical to
`oldVal`, and then returns a Boolean representing if the update was successful
or not:

```
utest atomicCAS a 0 1 with true in
utest atomicCAS a 42 3 with false in
utest atomicGet a with 1 in
```

The compare-and-set operation is currently supported for integer atomic
references only.

To unconditionally set the value of an atomic reference, we can use
`atomicExchange`, which also returns the old value of the reference:

```
utest atomicExchange a 2 with 1 in
```

Finally, for integer references, we can use `atomicFetchAndAdd` to increase or
decrease the value of the reference. The function returns the old value of the
reference:

```
utest atomicFetchAndAdd a 1 with 2 in
-- Current value is now 3
utest atomicFetchAndAdd a (subi 0 45) with 3 in
-- Current value is now -42
```

## Multi-Threaded Execution

Functions for handling threads are provided in
[multicore/threads.mc](stdlib/multicore/threads.mc).
The following example program spawns 10 threads that compete for printing their
IDs:

```
include "string.mc"
include "multicore/thread.mc"
mexpr
let place = atomicMake 1 in
let threads = create 10 (lam. threadSpawn (lam.
  print (join
    [int2string (atomicFetchAndAdd place 1)
    , ": thread ID "
    , int2string (threadSelf ())
    , "\n"
    ]))
) in
map threadJoin threads
```

where `threadSpawn` takes a function of type `() -> a` as argument
and `threadSelf` returns the ID of the current thread. Note that
`threadJoin` must be called once for each call to `threadSpawn`. The
output of the above program might be:

```
1: thread ID 1
2: thread ID 2
3: thread ID 129
4: thread ID 130
5: thread ID 3
6: thread ID 257
7: thread ID 258
8: thread ID 131
9: thread ID 385
10: thread ID 386
```

However, the values and order of the thread IDs might be different over
different runs.

## Synchronization

Externals for thread synchronization in the form of mutual exclusion locks and
condition variables are defined in
[multicore/mutex.mc](stdlib/multicore/mutex.mc) and
[multicore/cond.mc](stdlib/multicore/cond.mc), respectively.

## Probability distributions
Externals for probability distributions are defined in `stdlib/ext/dist-ext.mc`. To use these, you must install the `opam` package `owl` (i.e., `opam install owl`)
