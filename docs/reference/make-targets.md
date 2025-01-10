---
---

# Make Targets (Building, Testing, and Installing)

The make targets available in the `Makefile` at the root of the Miking
repository provides a number of conveniences for working on the code
base. This page provides a brief summary of the more important ones.

## Building the Compiler

- `bootstrap`: run the full bootstrapping procedure, creating
  `build/mi`. This is the default target, i.e., running `make` is
  equivalent with `make bootstrap`.
- `cheat`: use an `mi` compiler available in your `$PATH` (i.e.,
  installed on your system) to build a compiler in one step, placing
  it at `build/mi-cheat`. This is significantly faster than full
  bootstrapping, and is often useful while working, as long as the new
  compiler requires no new features.

## Working with `boot`

- `boot`: build the bootstrapping interpreter and the `boot` library,
  placing the former at `build/mi-boot`.
- `lint`, `fix`: check code formatting of the OCaml code implementing
  `boot`. Note that `lint` will merely show incorrect formatting,
  while `fix` automatically corrects it.

## Installing and Uninstalling

- `install-boot`/`uninstall-boot`: install/uninstall the `boot`
  library on the system.
- `install`/`uninstall`: install/uninstall the `mi` compiler and
  standard library. Note that `install` also runs `install-boot`,
  since it's required, but `uninstall` will leave `boot`.

## Testing

For more information about testing Miking, see [here](testing-miking).

- `test`: detects which dependencies you have install and runs all
  tests whose dependencies are satisfied using the bootstrapped
  compiler.
- `test-all`: like `test`, except assumes all possible dependencies
  are installed. Note that tests requiring specialized hardware will
  still not run if that hardware is absent.
- `test-quick`: run a smaller set of tests, turning off all optional
  test collections.
