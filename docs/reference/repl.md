---
sidebar_position: 3
---

# The REPL
The Miking bootstrap interpreter features a simple REPL, which lets
you interactively execute fragments of MCore code. Both toplevel
definitions and expressions can be evaluated.

To start the REPL (assuming that the interpreter is installed in the path), run

```
boot repl
```

The following is an example interaction with the REPL.

```
Welcome to the MCore REPL!
Type :h for help or :q to quit.
>> let x = 5
>> let y = 10 in
 | addi x y
15
>>
```
