# Installation

We currently support two methods of installing Miking:

 1. Natively built using the Opam package manager. (Mac, Linux)
 2. Pre-built Docker images with optional dependencies included. (Windows, Mac, Linux)

For basic usage of Miking with a limited set of dependencies, we recommend the
first option. If any of the extended Miking features are required, or if Opam
is not suitable for your system, then we recommend installing one of the Docker
images.

## Native Install with Opam

Install [Opam here](https://opam.ocaml.org/doc/Install.html)

Supported operating systems: Mac, Linux

When installing natively with Opam, we require that your system has `opam`
installed. It is highly recommended that you also have `make` installed on your
system.

Create the Opam 4.12 switch:

```sh
opam update
opam switch create 4.12.0+domains --packages=ocaml-variants.4.12.0+domains --repositories=multicore=git+https://github.com/ocaml-multicore/multicore-opam.git,default
eval $(opam env)
```

Install required dependencies:

```sh
opam install dune linenoise
```

Install optional dependencies (some features in the standard library will not
work without these):

```sh
opam install pyml toml lwt owl ocamlformat.0.20.1
```

Clone the Miking git repository to a suitable location on your system:

```
git clone https://github.com/miking-lang/miking.git
```

Assuming that you have `make` installed, we can now install Miking as:

```
cd miking
make install
```

## Install with Docker

Install Docker on your system. On Windows and Mac we assume that you are using
Docker Desktop. On Linux we assume that Docker Engine is being used. Note that
we only provide images built for x86_64. If you are using an M1 Mac or another
system that is not a x86_64 architecture, you will need to have some form of
emulation enabled for your system.

Install Docker Engine for Linux: [link](https://docs.docker.com/engine/install/)

Special case for Arch Linux: [link to Arch Wiki](https://wiki.archlinux.org/title/Docker)

[There are two images available on Docker Hub](https://hub.docker.com/r/mikinglang/miking):

 * `mikinglang/miking:latest-alpine`
 * `mikinglang/miking:latest-cuda`

Both contain all dependencies necessary to use all features in the standard
library. If you however desire to use the GPU acceleration feature in Miking,
you should use the CUDA-based image.

### Example Launch Scripts

