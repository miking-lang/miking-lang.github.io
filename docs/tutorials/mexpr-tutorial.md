---
sidebar_position: 2
---

# MExpr tutorial

One design objective of MExpr is to make the concrete syntax very close to the abstract syntax of the language. That is, no syntactic sugar is introduced to the concrete MCore syntax. The MExpr language is not intended to be a general-purpose programming language. Instead, the aim of MCore is to be a core language that other languages can be translated into.

Nevertheless, to understand the Miking system, it is a good idea to learn to write basic programs directly as MCore expressions.

In the end, an MCore file `.mc` is always translated into an MCore expression. If an MCore file contains `mexpr 5`, it means that the final expression of the program is value `5`. That is, `mexpr` states the start of the program and is followed by the actual MExpr of the program. If the keyword `mexpr` is left out of the file, a default mexpr unit value `()` is the resulting value.

## Unit Test Expressions

When writing MCore programs, it is typically done by writing explicit unit tests as part of the code. For instance

```mc
mexpr
utest addi 1 2 with 3 in
()
```
checks that the addition of `1` and `2` is in fact `3`. To run the tests in an `.mc` file, run the `mi` command with argument `test` (assuming that you have now installed `mi` in your path):

```mc
mi run program.mc --test
```

Typically when you develop MCore programs, you do not use the `print` function. Instead, you write unit tests directly and then leave the units tests as is directly after your function. By doing so, you test your code, write regression tests, and document the informal semantics of your program directly. We strongly encourage you to develop your MCore programs this way.

In the rest of this document, we omit the `mexpr` keyword for brevity, and just write the MExpr itself. Remember to add it as appropriate when trying the various examples.

The equality between the left-hand and right-hand sides in a utest is automatically deduced for many expressions. However, if you want to compare more complex language structures, or want to define equality in a different way, you can supply a custom equality function as, e.g.,

```mc
utest addi 1 2 with 0 using neqi in ()
```

where `neqi : Int -> Int -> bool` returns `true` if two integers are not equal. Moreover, when a test fails the left-hand and right-hand sides are pretty printed to standard out. For more complex expressions you may have to or want to modify this string representation. There is therefore an option to supply a custom `toString : a -> b -> String` function to utests with the following syntax (`a` and `b` are the types of the left-hand and right-hand sides, respectively)

```mc
utest addi 1 2 with 0 using neqi else lam l. lam r. "1+2 should not be 0" in ()
```

The function `lam l. lam r. "1+2 should not be 0"` is only applied to the left-hand and right-hand sides of the of utest if the test fails.

## Intrinsics

MCore contains a number of built-in values (intrinsics) and
predefined functions and constants (part of the standard library).
For instance,

```mc
print "Hello\n"
```

uses the built-in function `print` which has the type `String -> ()`, i.e., it prints a string and returns the unit type.

The current documentation of intrinsics is implicit via code
containing `utest` expressions. Please see the following files:

* [Boolean intrinsics](https://github.com/miking-lang/miking/blob/develop/src/test/mexpr/bool-test.mc)

* [Integer intrinsics](https://github.com/miking-lang/miking/blob/develop/src/test/mexpr/int-test.mc)

* [Floating-point number intrinsics](https://github.com/miking-lang/miking/blob/develop/src/test/mexpr/float-test.mc)

* [Strings intrinsics ](https://github.com/miking-lang/miking/blob/develop/src/test/mexpr/string-test.mc)

* [Sequences intrinsics ](https://github.com/miking-lang/miking/blob/develop/src/test/mexpr/seq-test.mc)

* [Side effect (printing, I/O, debugging etc.) intrinsics](https://github.com/miking-lang/miking/blob/develop/src/test/mexpr/effects.mc)

* [Symbol intrinsics](https://github.com/miking-lang/miking/blob/develop/src/test/mexpr/symbs.mc)

* [Reference intrinsics](https://github.com/miking-lang/miking/blob/develop/src/test/mexpr/references.mc)

* [Random number generation intrinsics](https://github.com/miking-lang/miking/blob/develop/src/test/mexpr/random-test.mc)

* [Time intrinsics](https://github.com/miking-lang/miking/blob/develop/src/test/mexpr/time.mc)


## Let Expressions

Expressions can be given names using `let` expressions. For instance

```mc
let x = addi 1 2 in
x
```

introduces a new name `x`. The built-in function `addi` performs an addition between two integers. Note that MCore uses a call-by-value evaluation order, which means that expressions are evaluated into a value before they are applied to a function or substituted using a `let` expression. Hence, the expression `addi 1 2` is evaluated before it is substituted for `x` in the rest of the expression.


## Functions

Functions are always defined anonymously as lambda functions. If you would like to give a function a name, a `let` expression can be used. For instance, the following program defines a function `double` that doubles the value of its argument.

```mc
let double = lam x. muli x 2 in
utest double 5 with 10 in
()
```

MExpr is statically typed, using a polymorphic type system based on [FreezeML](https://dl.acm.org/doi/10.1145/3385412.3386003). If type annotations are omitted, types will be automatically *inferred*. However, types can also be explicitly expressed in MCore programs. For instance, the `double` function can be written as

```mc
let double = lam x:Int. muli x 2 in
```

This means that `double` has type `Int -> Int`, which can also be expressed as part of the `let` expression.

```mc
let double : Int -> Int = lam x. muli x 2 in
```

A function with several parameters are expressed using currying, using nested lambda expressions. For instance, expression

```mc
let foo = lam x. lam y. addi x y in
utest foo 2 3 with 5 in
()
```
creates a function `foo` that takes two arguments.

A lambda can also be defined without a variable, e.g., `lam. e`, where
`e` is some expression representing the body of the function. Such
notation is useful if the actual variable is not used inside `e`. Note
that `lam. e` is syntactic sugar for a normal lambda `lam #var"". e`,
where the identifier of the variable name is the empty identifier.

## Sequencing

Sometimes an expression has a side effect and you are not interested
in the returned value. If that is the case, you can use the sequence
operator `;`. For instance, suppose you would like to print a value in
a function before it returns:

```mc
let foo = lam x.
  print x;
  x
```

The sequence operator `;` is not a construct of pure MExpr, but
syntactic sugar for a `let` construct. For instance, the pure version
(without syntactic sugar) of the program above is as follows:

```mc
let foo = lam x.
  let #var"" = print x in
  x
```

Note that a variable with an empty identifier is used in the `let` expression. Moreover, note that a `let` expression

```mc
let _ = foo x in ...
```

is syntactically not valid since `let` expressions always bind a value to a variable. Underscore `_` is a pattern and patterns are only allowed in `match` expressions.

## `if` Expressions

Conditional expressions can be expressed using `if` expressions. The program

```mc
let x = 5 in
let answer = if (lti x 10) then "yes" else "no" in
utest answer with "yes" in
()
```

checks if `x` is less than 10 (using the `lti` function with signature `Int -> Int -> Bool`). If it is true, the string `"yes"` is returned, else string `"no"` is returned.

Note that an `if` expression is not a construct in pure MExpr. It is syntactic sugar for a `match` expression. That is, the expression

```mc
if x then e1 else e2
```

is translated into

```mc
match x with true then e1 else e2
```

## Recursion

A normal `let` expression cannot be used to define recursive functions. Instead, recursion can be defined using *recursive lets*, starting with the `recursive` keyword:

```mc
recursive
let fact = lam n.
  if eqi n 0
    then 1
    else muli n (fact (subi n 1))
in

utest fact 0 with 1 in
utest fact 4 with 24 in
()

```

Recursive lets can also be used to define mutually recursive functions. For instance:

```mc
recursive
let odd = lam n.
    if eqi n 1 then true
    else if lti n 1 then false
    else even (subi n 1)
let even = lam n.
    if eqi n 0 then true
    else if lti n 0 then false
    else odd (subi n 1)
in

utest odd 4 with false in
utest even 4 with true in
```


## Tuples

Product types can be expressed using tuples. An n-tuple is defined using syntax `(e_1, ..., e_n)` where `e_1` to `e_n` are MCore expressions. Extracting a value from a tuple (projection) is performed using an expression `e.n` where `e` is the expression that is evaluated into a tuple, and `n` is an integer number representing the index of an element in the tuple. The first index in a tuple is `0`.

For instance, in the MCore expression

```mc
let t = (addi 1 2, "hi", 80) in
utest t.0 with 3 in
utest t.1 with "hi" in
utest t.2 with 80 in
()
```
we create a 3-tuple `t` and project out its values. Note that the different elements of a tuple can have different types. In this case, tuple `t` has type `(Int, String, Int)`.

Singleton tuples are also supported: `(x,)` represents a tuple with `x` as its
only element.


## Records

Another more general form of product types are records. A record has
named fields that can have different types. For instance,

```mc
let r1 = {age = 42, name = "foobar"} in
```
defines a record of type `{age : int, name : string}`. The order of the fields does not matter:

```mc
utest r1 with {age = 42, name = "foobar"} in
utest r1 with {name = "foobar", age = 42} in
```

To project out a value, a dot notation may be used.

```mc
utest r1.age with 42 in
utest r1.name with "foobar" in
()
```

It is possible to replace the value of a field using the `with` keyword.
```mc
let r = {x = 1, y = 1} in
utest {x = 1, y = 2} with {r with y = 2} in ()
```

A record type is not just a general product type in MCore, it is the only
product type. That is, a tuple is just *syntactic sugar* for a record. This means that the compiler encodes a tuple as a record, where the names of the fields are numbers `0`, `1`, etc. Labels can internally be any kind of string. For strings that cannot be defined as a normal identifier, the label form `#label"x"`
can be used, where `x` is the string of the label.

The following example shows how a tuple is actually encoded as a
record.


```mc
utest ("foo",5) with {#label"0" = "foo", #label"1" = 5} in ()
```


## Data Types and `match` expressions

Sum types or variant types are constructed using `con` expressions (constructor expressions). In contrast to most other functional languages, the introduction of a new data type and the introduction of constructors are separated. For instance, the expression

```mc
type Tree in
con Node : (Tree,Tree) -> Tree in
con Leaf : (Int) -> Tree in
```

introduces a new data type `Tree` and defines two new constructors `Node` and `Leaf`. Constructor `Leaf` takes just one argument (an integer value for the leaf) and returns a tree, whereas the `Node` constructor takes a tuple with two trees as input and constructs a new tree node.

For instance, the expression

```mc
let tree = Node(Node(Leaf 4, Leaf 2), Leaf 3) in
```

is a small tree named `tree`.

Assume now that we want to count the sum of the values of all leafs in a tree. We can then write a recursive function that performs the counting.

```mc
recursive
  let count = lam tree.
    match tree with Node t then
      let left = t.0 in
      let right = t.1 in
      addi (count left) (count right)
    else match tree with Leaf v then v
    else error "Unknown node"
in
```

The `match` expression inside the count function *deconstructs* data values by matching against a given constructor. For instance, the `match` expression

```mc
match tree with Node t then expr1 else expr2
```

matches the value after evaluating expression `tree` and checks if its outer most constructor is a `Node` constructor. If that is the case, the identifier `t` in expression `expr1` is bound to the tuple consisting of the node's two sub trees (recall the definition of the constructor `Node`). Finally, if we execute the test

```mc
utest count tree with 9 in ()
```

we can check that the function computes the result as intended.

## Pattern matching

In the previous match example, the `match` construct matched against
the constructor, but not against the actual data content. MExpr is
designed to be simple with few language constructs, at the right level
of abstraction. If the abstraction level is too low, it is hard to
perform useful static analysis and code generation. As a consequence,
MExpr support *patterns* in `match` expressions. The `count` function
can be rewritten as

```mc
recursive
  let count = lam tree.
    match tree with Node(left,right) then
      addi (count left) (count right)
    else match tree with Leaf v then v
    else error "Unknown node"
in
```

where the match construct matches against pattern `Node(left,right)`,
where `left` and `right` are pattern variables.

Remember, however, that tuples are just syntactic sugar for records. Hence, match line

```mc
    match tree with Node(left,right) then
```
is equivalent to the following
```mc
    match tree with Node {#label"0"=left,#label"1"=right} then
```
where the pattern is a *record pattern*.

Pattern matching is the general form of deconstructing data in MExpr. Patterns can also be nested:

```mc
utest
  match {foo=7,bar={more="hello"}} with {foo=_,bar={more=str}} then str else ""
with "hello" in
```

Note also the use of *wildcard* patterns `_` (used in the `foo`
field), which matches any value.

Finally, MExpr also supports more advanced patterns, including `AND` patterns (using infix notation `&`)
```mc
utest match (1, 2) with (a, _) & b then (a, b) else (0, (0, 0)) with (1, (1, 2)) in
```

`OR` patterns (using infix notation `|`)
```mc
utest match K1 1 with K1 a | K2 a | K3 a then a else 0 with 1 in
```

and `NOT` patterns (using the prefix notation `!`)
```mc
utest match Some true with a & !(None ()) then a else Some false with Some true in
utest match None () with a & !(None ()) then a else Some false with Some false in

```

These are present to make it possible to translate order-dependent patterns to order-*in*dependent patterns. For example, in OCaml,

```mc
match (opt1, opt2) with
| (Some a, _) -> a
| (_, Some a) -> a
| (_, _) -> 1
```

is order-dependent; any change in pattern order changes which match-arm is executed. To express this in an order-independent manner we `&` every pattern with the inverse (`!`) of the union (`|`) of the previous patterns. If we pretend for a moment that OCaml supports `&` and `!` in patterns they could then be written as:

```mc
match (opt1, opt2) with
| (Some a, _) -> a
| (_, Some a) & !(Some a, _) -> a
| (_, _) & !((Some a, _) | (_, Some a))-> 1
```

The order can now be changed freely without affecting the semantics. In practice `&` and `!` will probably rarely be used in manually written code, while `|` is rather more useful.

## Sequences

An MCore sequence is constructed using syntax `[e_1, ..., e_n]`. All elements in a sequence must have the same type. For instance, an expression

```mc
[1,3,6,7,22,3]
```
has type `[Int]` whereas and expression

```mc
["this", "is", "a", "test"]
```

has type `[String]`.

A string itself is actually a sequence of characters. Hence,

```mc
utest "foo" with ['f','o','o'] in ()
```

is correct. This means that the type `String` is just an abbreviation for the sequence type `[Char]`.

There are several operations defined for sequences, for instance, the `concat` function concatenates two sequences

```mc
utest concat [1,3,5] [7,9] with [1,3,5,7,9] in ()
```

or the `get` function picks out the nth element of a sequence

```mc
utest get [3,5,8,9] 2 with 8 in ()
```
The functions `cons` can be used to prepend an element to a sequence.

```mc
utest cons 1 [2,3] with [1, 2, 3] in ()
```
The head and tail of a sequence can be obtaining using the functions `head` and `tail`.

```mc
utest head [1, 2, 3] with 1 in
utest tail [1, 2, 3] with [2, 3] in ()
````


It is also possible to pattern match on sequences, to either extract the *tail* of a sequence, if the first part matches

```mc
utest match "foobar" with "fo" ++ rest then rest else ""
with "obar" in
```

or the *head* of a sequence if the last part matches:

```mc
utest match "foobar" with first ++ "bar" then first else ""
with "foo" in
```

It is even possible to extract the middle of a sequence, if the head and the tail matches:

```mc
utest match "foobar" with "fo" ++ mid ++ "ar" then mid else ""
with "ob" in
```

Again, matching can be combined and nested:

```mc
utest match (1,[["a","b"],["c"]],76) with (1,b++[["c"]],76) then b else []
with [["a","b"]] in
```

## Tensors
Tensors are mutable data structures and can be of up to rank 16. The index
of an element is represented as a sequence of integers.

We construct tensors using `tensorCreateDense shape f`, where `shape` is a sequence
denoting the shape of the tensor and `f` is a function taking an index as an
argument and returning the element at that index.

We can construct a zero-order tensor with value `'a'` as
```mc
let t0 = tensorCreateDense [] (lam. 'a') in
utest tensorRank t0 with 0 in
utest tensorShape t0 with [] in
```

We can access and mutate elements in a tensor using
```mc
utest tensorSetExn t0 [] 'b' with () in
utest tensorGetExn t0 [] with 'b' in
()
```

The file [tensor.mc](https://github.com/miking-lang/miking/blob/develop/src/stdlib/tensor.mc) contains a wide variety of useful tensor
functions. We can import it into a program using the `include`
keyword (more on this [later](#MLang)). We can construct a rank 1
tensor (i.e. vector) as
```mc
include "tensor.mc"
mexpr
let t1 = tensorCreateDense [9] (lam i. addi (get i 0) 1) in
utest tensorToSeqExn t1 with [1, 2, 3, 4, 5, 6, 7, 8, 9] in
```
where `tensorToSeqExn` is defined in `tensor.mc`.

We can reshape our rank 1 tensor into a rank 2 tensor (i.e. a matrix).
```mc
let t2 = tensorReshapeExn t1 [3, 3] in
```

Reshape does no copying and the data is shared between `t1` and `t2`
```mc
tensorSetExn t2 [0, 0] 2;
utest tensorGetExn t1 [0] with 2 in
```

We can slice the second row from `t2` as
```mc
let r2 = tensorSliceExn t2 [1] in
utest tensorToSeqExn r2 with [4, 5, 6] in
```

Slicing reduces the rank of the tensor
```mc
utest tensorRank r2 with 1 in
```

We can slice multiple dimensions at once
```mc
let e = tensorSliceExn t2 [1, 1] in
utest tensorGetExn e [] with 5 in
utest tensorRank e with 0 in
```

A slice shares data with the original tensor and no copying of data is done.
```mc
tensorMapInplace (lam. 0) r2;
utest tensorToSeqExn t1 with [2, 2, 3, 0, 0, 0, 7, 8, 9] in
```
where we use `tensorMapInplace` from `tensor.mc`.

We can get a subset of the rows of t2 by restricting its 0th dimension.
```mc
let s1 = tensorSubExn t2 1 2 in
utest tensorShape s1 with [2, 3] in
utest tensorToSeqExn (tensorReshapeExn s1 [6]) with [0, 0, 0, 7, 8, 9] in
()
```

## References

A mutable reference to an MExpr value can be created with the `ref` operator. For instance

```mc
let r = ref 3 in
```

allocates a reference to a cell in memory with an initial value `3`, and binds
the reference to the variable `r`.

The `deref` operator is used for dereferencing, that is, to read the value that
a reference points to:

```mc
let r = ref 3 in
utest deref r with 3 in ()
```

The value that a reference points to can be modified using the `modref` operator:

```mc
let r = ref 3 in
modref r 4;
utest deref r with 4 in ()
```

Note that the return value of `modref` is an MExpr unit value.

It is possible have aliases for the same memory cell by binding several
variables to the same reference. As an example, in the program

```mc
let r1 = ref "A" in
let r2 = r1 in
modref r2 "B";
utest deref r1 with "B" in ()
```

the change made to the referenced value via the variable `r2` is visible when
dereferencing the reference via the variable `r1`.
