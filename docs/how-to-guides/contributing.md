---
sidebar_position: 4
---

# How to contribute

1. Before making a pull request please make sure that all tests pass. Run
appropriate tests as described above.

2. Make sure you follow the conventions declared in the
[wiki](https://github.com/miking-lang/miking/wiki/Conventions).

3. We use [ocamlformat](https://github.com/ocaml-ppx/ocamlformat) to
automatically format ocaml source code.

##  Setup and use `ocamlformat`

We are currently using this package at version `0.24.1`. To pin and/or install
the package at this version using `opam` do
```
opam pin ocamlformat 0.24.1
```
Then you can then run `dune build @fmt` to see a
diff between your code and the formatted code. To promote the changes run `dune
promote`. To do these two steps in one run `dune build @fmt --auto-promote`. If
you want to, you can run `ocamlformat` in watch mode to continuously format the
source as you work on it with the command `dune build @fmt --auto-promote -w`.
You can also find instructions for tighter editor integration at *ocamlformat's*
GitHub page.

For convenience, `make lint` will run `dune build @fmt` and `make fix` will run
`dune build @fmt --auto-promote`.

## Git Blame

Since automatic code formatting commits will obscure `git blame` we maintain a
file  [.git-blame-ignore-revs](.git-blame-ignore-revs) that will contain the
commit hashes of code formatting commits. We can then run `git blame`, ignoring
these commits as:

```
git blame <file(s)> --ignore-revs-file .git-blame-ignore-revs
```

To make this setting persistent you can configure git like this:

```
git config blame.ignoreRevsFile .git-blame-ignore-revs
```

These instructions are adapted from
[https://github.com/psf/black](https://github.com/psf/black). See
[https://git-scm.com/docs/git-blame#Documentation/git-blame.txt---ignore-revltrevgt](https://git-scm.com/docs/git-blame#Documentation/git-blame.txt---ignore-revltrevgt)
for documentation on the `--ignore-revs-file` option.
