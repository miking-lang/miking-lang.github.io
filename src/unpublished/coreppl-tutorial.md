---
sidebar_class_name: hidden
---

# CorePPL Tutorial

In this tutorial, you will learn how to:

- Run a simple CorePPL program

- Understand the fundamental language constructs of CorePPL

- Implement a simple inference algorithm within the framework

- Understand the structure to enable the implementation of advanced algorithms and transformations

Note that this tutorial assumes a basic understanding of Bayesian theory and familiarity with other probabilistic programming languages, such as WebPPL, Pyro, or Anglican. This tutorial also assumes that you understand the basics of the Miking expression langauge (MExpr). If you are unfamiliar with MExpr, please take a look at [MExpr tutorial](/docs/tutorials/mexpr-tutorial) before proceeding.


## What is CorePPL?

CorePPL is an intermediate language intended to develop domain-specific probabilistic programming languages. Although it has a concrete syntax and it is possible to write probabilistic models as CorePPL models, the intention is not to be an end-user language. Examples of domain-specific languages that are built using CorePPL are [ProbTime](https://github.com/miking-lang/ProbTime), a probabilistic modeling language for real-time systems, and [TreePPL](https://treeppl.org/), a universal probabilistic programming language for modeling of phylogenetics.

CorePPL is built on top of the [Miking](https://miking.org/) framework, a general compiler framework for constructing compilers for domain-specific languages. That is, CorePPL is a light extension of Miking Core (MCore) with a few specific constructs handling probabilistic inference. Besides these new constructs, the syntax and semantics of CorePPL are the same as MCore.

The basic constructs are `assume`, `weight`, `observe`, and `infer`. In the rest of this tutorial, we will discuss these constructs, give an intuition of their semantics, and discuss how to implement new inference algorithms using these constructs.


## Installing and Testing the CorePPL compiler

To install and run a CorePPL program, do the following steps.

1. **Install Miking.** Before compiling CorePPL, make sure to install the [Miking framework](https://miking.org/installation). It is important that the paths to the Miking compiler (the `mi` command) and the Miking standard library are setup correctly. Note also that you should install the [optional dependencies](https://miking.org/installation#optional-dependencies). Specifically, Miking CorePPL uses the [OWL scientific computing library](https://ocaml.xyz/), which is installed using the optional dependencies, described above.

2. **Get CorePPL code.** The source code for CorePPL is located on GitHub within the [Miking DPPL](https://github.com/miking-lang/miking-dppl) repository. Please fork the repo and clone the project.

3. **Compile and install `cppl`**. At the root of the CorePPL code downloaded in step 2, run the shell command `make` to compile the CorePPL compiler (called `cppl`). We also recommend that you run `make install` to install the compiler and necessary libraries to `$HOME/.local/bin`, and `$HOME/.local/bin`, similar to the Miking installation.

4. To test that toolchain has been successfully installed, run
```
cppl coreppl/models/coin.mc && ./out 10
```
The output should now show show 10 samples from the model. The next section will discuss more in details the model constructs and how to use the `cppl` compiler.


## Running a Hello World model

Let's run a simple hello world model, estimating the probability that a coin flip is true, given one observation. Create a file name e.g., `hello.mc` with the following code:

```mc
mexpr
let x = assume (Beta 2.0 2.0) in
observe true (Bernoulli x);
x
```

The second line makes use of the `assume` construct, which introduces a random variable. The argument to `assume` states the distribution, in this case the `Beta` distribution. For sample-based inference methods, this `assume` construct will draw a sample and in this case store the sample in x. Note that for a probabilstic program, the argument to `assume` states the prior distribution for the defined random variable.

In the third line, we make an observation, using the `observe` construct. The first argument to `observe` is the observed value, and the second argument the distribution.

Finally, in the fourth line, we return the value of `x`. This is the value that is returned by the model. That is, the values returned from the model is the approximated posterior.


To compile the model, simply run:

```
cppl hello.mc
```

The `cppl` compiler produces an output executable called `out` (another output name can be given using the flag `--output`). By default, the compiler produces an output that will use a simple importance sampling method.

By executing the exeuctable

```
./out 10
```

we run inference on the model using 10 particles. You don't have to recompile the model to change the number of particles, simply run the `out` again with another argument value. The output can look something like this

```
-0.84005628476
0.0423685293223 -4.62387823353
0.454378855486 -2.25135275371
0.229250951799 -2.93546682429
0.79163902981 -1.69617856974
0.460488631212 -2.23799591975
0.490270775496 -2.17532624569
0.509469893702 -2.13691332619
0.682635010261 -1.84432376249
0.460332313742 -2.23833543737
0.196028263066 -3.09202523907
```

The first row `-0.84005628476` is the log of the normalizing constant. The rest of the rows prints the particle output, where each row is one particle. The first column is the sampled value (in this case `x`) and the second column the log-weight.

Whe you installed CorePPL, a convenient script `dppl-plot` was automatically installed. You need to have installed Python 3 and `matplotlib` to make use of this script. If you run
```
./out 10000 |dppl-plot
```

The model will be inferred using 10000 partiles, and the result is piped to `dppl-plot` which will create visualize the result. You can run `dppl-plot --help` to get the options for plotting. The script can be found under folder `/scripts`.


## Source code structure



## Regression and unit testing

 If you want to check that all regression tests work, run command `make test`. Running all tests takes several mintues. You don't need  You don't need to run this before testing


## Adding a simple inference algorithm


## Exending with advanced algorithms and transformations

### Basic MCMC algorithms

### Dynamic Delayed Sampling