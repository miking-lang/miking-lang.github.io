"use strict";(self.webpackChunkmiking_lang_github_io=self.webpackChunkmiking_lang_github_io||[]).push([[469],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return u}});var i=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=i.createContext({}),s=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=s(e.components);return i.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},c=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,m=r(e,["components","mdxType","originalType","parentName"]),c=s(n),u=o,h=c["".concat(p,".").concat(u)]||c[u]||d[u]||a;return n?i.createElement(h,l(l({ref:t},m),{},{components:n})):i.createElement(h,l({ref:t},m))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=c;var r={};for(var p in t)hasOwnProperty.call(t,p)&&(r[p]=t[p]);r.originalType=e,r.mdxType="string"==typeof e?e:o,l[1]=r;for(var s=2;s<a;s++)l[s]=n[s];return i.createElement.apply(null,l)}return i.createElement.apply(null,n)}c.displayName="MDXCreateElement"},5196:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return r},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return m},default:function(){return c}});var i=n(7462),o=n(3366),a=(n(7294),n(3905)),l=["components"],r={sidebar_position:2,id:"miking-dppl"},p="Miking DPPL",s={unversionedId:"miking-dppl",id:"miking-dppl",title:"Miking DPPL",description:"Miking DPPL is a framework for developing probabilistic programming languages (PPLs) using Miking.",source:"@site/docs/miking-dppl-remote.md",sourceDirName:".",slug:"/miking-dppl",permalink:"/docs/miking-dppl",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,id:"miking-dppl"},sidebar:"tutorialSidebar",previous:{title:"Miking",permalink:"/docs/miking"}},m=[{value:"Building and Installing",id:"building-and-installing",children:[],level:2},{value:"CorePPL",id:"coreppl",children:[{value:"Compiling CorePPL to RootPPL",id:"compiling-coreppl-to-rootppl",children:[],level:3}],level:2},{value:"RootPPL",id:"rootppl",children:[{value:"Getting Started",id:"getting-started",children:[{value:"Prerequisites",id:"prerequisites",children:[],level:4},{value:"Install <code>rootppl</code>",id:"install-rootppl",children:[],level:4},{value:"Build",id:"build",children:[],level:4},{value:"Creating a simple model",id:"creating-a-simple-model",children:[],level:4},{value:"Supplementary Examples",id:"supplementary-examples",children:[{value:"Coin Flip Posterior",id:"coin-flip-posterior",children:[],level:5},{value:"Gaussian Mixture Model",id:"gaussian-mixture-model",children:[],level:5},{value:"Geometric Distribution (Recursive)",id:"geometric-distribution-recursive",children:[],level:5},{value:"Geometric Distribution (Iterative)",id:"geometric-distribution-iterative",children:[],level:5}],level:4},{value:"Phylogenetic Models",id:"phylogenetic-models",children:[{value:"Constant-rate birth-death",id:"constant-rate-birth-death",children:[],level:5},{value:"Further phylogenetic models",id:"further-phylogenetic-models",children:[],level:5}],level:4},{value:"The RootPPL Architecture",id:"the-rootppl-architecture",children:[],level:4},{value:"Compile with the built-in stack",id:"compile-with-the-built-in-stack",children:[],level:4},{value:"Building a more interesting model",id:"building-a-more-interesting-model",children:[],level:4}],level:3}],level:2}],d={toc:m};function c(e){var t=e.components,n=(0,o.Z)(e,l);return(0,a.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"miking-dppl"},"Miking DPPL"),(0,a.kt)("p",null,"Miking DPPL is a framework for developing probabilistic programming languages (PPLs) using ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/miking-lang/miking"},"Miking"),".\nCurrently, the framework includes the PPLs ",(0,a.kt)("a",{parentName:"p",href:"#coreppl"},"CorePPL")," and ",(0,a.kt)("a",{parentName:"p",href:"#rootppl"},"RootPPL"),"."),(0,a.kt)("h2",{id:"building-and-installing"},"Building and Installing"),(0,a.kt)("p",null,"The main binary for Miking DPPL is called ",(0,a.kt)("inlineCode",{parentName:"p"},"midppl"),". Currently, this binary is built by running ",(0,a.kt)("inlineCode",{parentName:"p"},"make")," in the project root, and installed to ",(0,a.kt)("inlineCode",{parentName:"p"},"$HOME/.local/bin")," with ",(0,a.kt)("inlineCode",{parentName:"p"},"make install")," (uninstall is also possible through ",(0,a.kt)("inlineCode",{parentName:"p"},"make uninstall"),"). You must have ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/miking-lang/miking"},"Miking")," installed (the ",(0,a.kt)("inlineCode",{parentName:"p"},"mi")," command must be globally available) for building ",(0,a.kt)("inlineCode",{parentName:"p"},"midppl"),".\nThe command ",(0,a.kt)("inlineCode",{parentName:"p"},"make test")," executes a set of tests for various components in the Miking DPPL framework."),(0,a.kt)("h2",{id:"coreppl"},"CorePPL"),(0,a.kt)("p",null,"CorePPL extends MExpr (see ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/miking-lang/miking"},"Miking"),") with probabilistic constructs for defining random variables and for likelihood updating. For example, the program"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"mexpr\nlet x = assume (Beta 10.0 5.0) in\nobserve true (Bernoulli x);\nx\n")),(0,a.kt)("p",null,"encodes a simple distribution for the bias of a coin, by setting a Beta prior for the probability of observing heads (i.e., ",(0,a.kt)("inlineCode",{parentName:"p"},"true"),") for a single flip of the coin."),(0,a.kt)("p",null,"Defining random variables in CorePPL is done by providing a probability distribution to the ",(0,a.kt)("inlineCode",{parentName:"p"},"assume")," construct.\nCurrently, there is no generated documentation for available distributions."),(0,a.kt)("p",null,"Likelihood updating is done through the ",(0,a.kt)("inlineCode",{parentName:"p"},"weight")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"observe")," constructs.\nWith ",(0,a.kt)("inlineCode",{parentName:"p"},"weight"),", the logarithm of the likelihood is updated directly (e.g., ",(0,a.kt)("inlineCode",{parentName:"p"},"weight (log 2)")," multiplies the likelihood with 2).\nWith ",(0,a.kt)("inlineCode",{parentName:"p"},"observe"),", the likelihood is instead updated with the value of the pmf or pdf for the given distribution at the given observation.\nFor example ",(0,a.kt)("inlineCode",{parentName:"p"},"observe true (Bernoulli 0.5)")," updates the likelihood with a factor of 0.5."),(0,a.kt)("h3",{id:"compiling-coreppl-to-rootppl"},"Compiling CorePPL to RootPPL"),(0,a.kt)("p",null,"One option to run inference over a CorePPL program is to compile it to RootPPL.\nA CorePPL program in a file ",(0,a.kt)("inlineCode",{parentName:"p"},"cpplprog.mc")," can be compiled to a RootPPL file ",(0,a.kt)("inlineCode",{parentName:"p"},"out.cu")," using the command ",(0,a.kt)("inlineCode",{parentName:"p"},"midppl -m rootppl-smc cpplprog.mc"),".\nThe file ",(0,a.kt)("inlineCode",{parentName:"p"},"out.cu")," can then be compiled using, e.g., ",(0,a.kt)("inlineCode",{parentName:"p"},"rootppl out.cu --stack_size 10000"),".\nThe stack size option is mandatory for compiling RootPPL programs compiled from CorePPL.\nMore information about RootPPL can be found at ",(0,a.kt)("a",{parentName:"p",href:"#rootppl"},"RootPPL"),"."),(0,a.kt)("h2",{id:"rootppl"},"RootPPL"),(0,a.kt)("p",null,"RootPPL is an intermediate language for representing probabilistic models and comes with a framework that performs inference on the GPU in these models. See examples in the folder ",(0,a.kt)("inlineCode",{parentName:"p"},"rootppl/models"),". The idea is that high-level Miking probabilistic programming languages should be compiled to this intermediate language."),(0,a.kt)("h3",{id:"getting-started"},"Getting Started"),(0,a.kt)("p",null,"The instructions below are tested on Ubuntu 18.04 but should work for other Unix-like systems."),(0,a.kt)("h4",{id:"prerequisites"},"Prerequisites"),(0,a.kt)("p",null,"Before building RootPPL programs, a C++/CUDA compiler is required. RootPPL works on CPU and Nvidia GPU:s. For the CPU version, a C++ compiler should suffice, e.g. g++.  In\norder to build for GPU, CUDA must be installed. See\nCUDA installation guides: ",(0,a.kt)("a",{parentName:"p",href:"https://docs.nvidia.com/cuda/cuda-installation-guide-linux/",title:"CUDA Installation Guide Linux"},"Linux"),",\n",(0,a.kt)("a",{parentName:"p",href:"https://docs.nvidia.com/cuda/cuda-installation-guide-mac-os-x/index.html",title:"CUDA Installation Guide Mac"},"Mac"),"."),(0,a.kt)("p",null,"To run the CPU version in parallel, ",(0,a.kt)("a",{parentName:"p",href:"https://www.openmp.org/resources/openmp-compilers-tools/"},"OpenMP")," must be installed.\nOpenMP comes with recent gcc versions. However, OpenMP is not necessary if one does not want to execute programs in parallel on the CPU."),(0,a.kt)("h4",{id:"install-rootppl"},"Install ",(0,a.kt)("inlineCode",{parentName:"h4"},"rootppl")),(0,a.kt)("p",null,"To install ",(0,a.kt)("inlineCode",{parentName:"p"},"rootppl")," for the current user, first clone this repository and change directory to the ",(0,a.kt)("inlineCode",{parentName:"p"},"rootppl")," folder. Then run:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"make install\n")),(0,a.kt)("p",null,"This will install ",(0,a.kt)("inlineCode",{parentName:"p"},"rootppl")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"$HOME/.local/bin")," and inference engine sources to ",(0,a.kt)("inlineCode",{parentName:"p"},"$HOME/.local/src/rootppl"),". Some systems, e.g. Mac OS, will require manually adding ",(0,a.kt)("inlineCode",{parentName:"p"},"$HOME/.local/bin")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"$PATH"),"."),(0,a.kt)("h4",{id:"build"},"Build"),(0,a.kt)("p",null,"To compile a model and build an executable:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"rootppl path/to/model.cu\n")),(0,a.kt)("p",null,"This will compile the model along with the inference framework for CPU. The inference framework build products are placed under ",(0,a.kt)("inlineCode",{parentName:"p"},"build/"),".\nThe ",(0,a.kt)("inlineCode",{parentName:"p"},"rootppl")," command wraps ",(0,a.kt)("inlineCode",{parentName:"p"},"g++"),"/",(0,a.kt)("inlineCode",{parentName:"p"},"nvcc"),", and you may supply options used for ",(0,a.kt)("inlineCode",{parentName:"p"},"g++")," and/or ",(0,a.kt)("inlineCode",{parentName:"p"},"nvcc")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"rootppl"),".\nThese options will be used when compiling the supplied models, but not when compiling the inference framework.\nOne limitation is that it is currently only possible to supply source file(s) to ",(0,a.kt)("inlineCode",{parentName:"p"},"rootppl"),".\nObject/library files are not supported (for this, you must write your own custom build script)."),(0,a.kt)("p",null,"To compile for GPU, add your GPU:s compute capability to the ",(0,a.kt)("inlineCode",{parentName:"p"},"--target")," option.\nYou can find your GPU:s compute capability in the ",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/CUDA#GPUs_supported"},"Wikipedia table"),".\nHere is an example that will compile the airplane example for a GPU with a minimum compute capability of 7.5\n(simply remove ",(0,a.kt)("inlineCode",{parentName:"p"},"--target sm_75")," to compile for CPU):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"rootppl models/airplane/airplane.cu --target sm_75 -j 5\n")),(0,a.kt)("p",null,"The optional argument ",(0,a.kt)("inlineCode",{parentName:"p"},"-j x")," speeds up the compilation process by spawning ",(0,a.kt)("inlineCode",{parentName:"p"},"x")," jobs, allowing for parallel compilation.\nThe corresponding parallel CPU (OpenMP) example is:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"rootppl models/airplane/airplane.cu --target omp -j 5\n")),(0,a.kt)("p",null,"Alternatively, the c++ compiler can be specified with CXX. This is often required on Mac OS to enable OpenMP, by using g++ instead of the default clang. On Mac OS, g++ can be installed with e.g. ",(0,a.kt)("inlineCode",{parentName:"p"},"brew install gcc"),". Then, assuming the version installed was ",(0,a.kt)("inlineCode",{parentName:"p"},"gcc-10"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"rootppl models/airplane/airplane.cu --target omp -j 5 --cxx g++-10\n")),(0,a.kt)("p",null,"The first build will compile the entire inference framework and can take 20 seconds or so when building for GPU. (Run ",(0,a.kt)("inlineCode",{parentName:"p"},"rootppl")," with the ",(0,a.kt)("inlineCode",{parentName:"p"},"-j num_threads")," to use multiple threads and speed up the build). The inference framework is recompiled whenever options such as ",(0,a.kt)("inlineCode",{parentName:"p"},"--target")," are modified between runs of ",(0,a.kt)("inlineCode",{parentName:"p"},"rootppl"),"."),(0,a.kt)("p",null,"Any of the above commands should generate an executable named ",(0,a.kt)("inlineCode",{parentName:"p"},"a.out")," (add ",(0,a.kt)("inlineCode",{parentName:"p"},"-o <exec_name>")," to name it differently). Execute it with ",(0,a.kt)("inlineCode",{parentName:"p"},"./a.out num_particles"),". For example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"./a.out 1000\n")),(0,a.kt)("p",null,"An example output of this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"./a.out 1000\n-119.422143\nNum particles close to target: 98.9%, MinX: 56.2349, MaxX: 91.1572\n")),(0,a.kt)("p",null,"First is the command that is executed, it executes the executable ",(0,a.kt)("inlineCode",{parentName:"p"},"a.out")," with argument ",(0,a.kt)("inlineCode",{parentName:"p"},"1000"),".\nThe first row is the normalizing constant. The second row is a print statement within the model."),(0,a.kt)("p",null,"You can supply a second argument to ",(0,a.kt)("inlineCode",{parentName:"p"},"a.out"),", which is the number of sweeps:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"./a.out 1000 3\n-115.482724\nNum particles close to target: 89.7%, MinX: 51.5005, MaxX: 88.2039\n-115.472101\nNum particles close to target: 90.5%, MinX: 53.0577, MaxX: 90.0298\n-115.496258\nNum particles close to target: 88.7%, MinX: 48.1773, MaxX: 89.0957\n")),(0,a.kt)("h4",{id:"creating-a-simple-model"},"Creating a simple model"),(0,a.kt)("p",null,"Models are divided into fragments to enable pausing the execution within models.\nThese fragments are functions referred to as basic blocks (",(0,a.kt)("inlineCode",{parentName:"p"},"BBLOCK"),").\nTo control the program execution flow, a program counter (",(0,a.kt)("inlineCode",{parentName:"p"},"PC"),") can be modified.\nIf it remains unchanged in when the basic block returns, resampling will be done, and then\nthe same block will be executed again. The program counter corresponds to the index of the basic block\nto be executed. So, incrementing it means that the next block will be executed after resampling. An\nexample of this can be seen in the example below. However, if no following blocks are defined,\nthe inference will terminate as the model program has been executed."),(0,a.kt)("p",null,"Any interesting model will contain random choices, i.e. sampling from distributions.\nBelow is a coin flip example which flips a biased coin. ",(0,a.kt)("inlineCode",{parentName:"p"},"SAMPLE")," is a macro that can take variable number of arguments.\nFirst is the distribution name, followed by the distribution specific arguments."),(0,a.kt)("p",null,"Sampling is done differently on the CPU and the GPU,but these differences are hidden in the model with the help\nof this ",(0,a.kt)("inlineCode",{parentName:"p"},"SAMPLE")," macro. All of these RootPPL keywords are macros similar to ",(0,a.kt)("inlineCode",{parentName:"p"},"SAMPLE"),", they provide higher-level\nconstructs that can be used in the same way regardless of if the model will be executed on the CPU or the GPU."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-CUDA"},"BBLOCK(coinFlip, {\n    int coinSample = SAMPLE(bernoulli, 0.6);\n    PC++;\n})\n")),(0,a.kt)("p",null,"In the coin flip example above, there is one problem, however. The sample is only stored in a local\nvariable and is never used. To store data that remains when the next block is executed, the program\nstate (",(0,a.kt)("inlineCode",{parentName:"p"},"PSTATE"),") should be used. Before defining the blocks, the model must be\ninitialized with the macro ",(0,a.kt)("inlineCode",{parentName:"p"},"INIT_MODEL")," that takes two arguments. First the type of the program\nstate (this could be any type, e.g. ",(0,a.kt)("inlineCode",{parentName:"p"},"int")," or a structure), then the number of basic blocks in\nthe program. So, adding it to the above example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-CUDA"},"INIT_MODEL(int, 1)\n\nBBLOCK(coinFlip, {\n    PSTATE = SAMPLE(bernoulli, 0.6);\n    PC++;\n})\n")),(0,a.kt)("p",null,"Now to run this program, only one thing remains to be defined, the main function.\nThis is done with the ",(0,a.kt)("inlineCode",{parentName:"p"},"MAIN")," macro, taking a code block as argument.\nThe code below shows what we need in order to run the program and perform SMC."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-CUDA"},"MAIN({\n    ADD_BBLOCK(coinFlip);\n\n    SMC(NULL);\n})\n")),(0,a.kt)("p",null,"First, the block must be added to the array of blocks to be executed. The order in which\nblocks are added with ",(0,a.kt)("inlineCode",{parentName:"p"},"ADD_BLOCK"),", defines their order in the array and thus\ndefines the order of execution together with the program counter. Secondly, the\n",(0,a.kt)("inlineCode",{parentName:"p"},"SMC")," macro (its parameter is explained below) starts the inference."),(0,a.kt)("p",null,"Now the model can be compiled and executed! However, the result of the coin flips is\nstored, but never used. To aggregate the results of all the particles' samples,\na callback function (",(0,a.kt)("inlineCode",{parentName:"p"},"CALLBACK"),") can be used. The callback will be called after\ninference, but before clean up of the particles. This way, the results can be used to\ngenerate desired distributions or values before particles are deleted.\nWithin the ",(0,a.kt)("inlineCode",{parentName:"p"},"CALLBACK")," macro, the array of program states is accessed\nwith ",(0,a.kt)("inlineCode",{parentName:"p"},"PSTATES")," and the number of particles is accessed with the\nparameter ",(0,a.kt)("inlineCode",{parentName:"p"},"N")," (which is hidden within the macro). Also, the log-weights array can be accessed with\nthe ",(0,a.kt)("inlineCode",{parentName:"p"},"WEIGHTS"),' macro. These weights are normalised (so that the exponent of these log-weights sum to 1).\nHere is an example callback, called "sampleMean" that calculates and prints the mean\nof the samples.'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-CUDA"},'CALLBACK(sampleMean, {\n    double sum = 0;\n    for(int i = 0; i < N; i++)\n        sum += PSTATES[i];\n    double mean = sum / N;\n    printf("Sample mean: %f\\n", mean);\n})\n')),(0,a.kt)("p",null,"For this to be used, the ",(0,a.kt)("inlineCode",{parentName:"p"},"SMC")," macro call in main must be\nchanged to: ",(0,a.kt)("inlineCode",{parentName:"p"},"SMC(sampleMean);")),(0,a.kt)("p",null,"This example can be found in\n",(0,a.kt)("a",{parentName:"p",href:"rootppl/models/simple-examples/coin_flip_mean.cu"},(0,a.kt)("inlineCode",{parentName:"a"},"rootppl/models/simple-examples/coin_flip_mean.cu")),"\nand, being in the ",(0,a.kt)("inlineCode",{parentName:"p"},"rootppl")," directory, compiled with:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"rootppl models/simple-examples/coin_flip_mean.cu\n")),(0,a.kt)("p",null,"Then it can be executed with the executable followed by the\nnumber of particles, for example: ",(0,a.kt)("inlineCode",{parentName:"p"},"./a.out 1000"),"."),(0,a.kt)("p",null,"An example output is then:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"Sample mean: 0.608000\nlog normalization constant = 0.000000\n")),(0,a.kt)("p",null,"First we see our callback function's output. Then on the next line, is the logarithm of the\nnormalization constant approximated by the inference. This is simply 0 here, since the model contains\nno statements that alter the weights of the particles."),(0,a.kt)("h4",{id:"supplementary-examples"},"Supplementary Examples"),(0,a.kt)("p",null,"Below follows some examples, these are all models that are defined within one single block."),(0,a.kt)("h5",{id:"coin-flip-posterior"},"Coin Flip Posterior"),(0,a.kt)("p",null,"Full example: ",(0,a.kt)("a",{parentName:"p",href:"rootppl/models/simple-examples/coin_flip.cu"},(0,a.kt)("inlineCode",{parentName:"a"},"rootppl/models/simple-examples/coin_flip.cu"))),(0,a.kt)("p",null,"In this model, a bias for a coin is sampled from the prior beta distribution. Then we observe that the coin flip is true. This model thus infers the\nposterior distribution of the bias, conditioned on the observation."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-CUDA"},"BBLOCK(coinFlip, {\n    double x = SAMPLE(beta, 2, 2);\n    OBSERVE(bernoulli, x, true);\n\n    PSTATE = x;\n    PC++;\n})\n")),(0,a.kt)("h5",{id:"gaussian-mixture-model"},"Gaussian Mixture Model"),(0,a.kt)("p",null,"Full example: ",(0,a.kt)("a",{parentName:"p",href:"rootppl/models/simple-examples/mixture.cu"},(0,a.kt)("inlineCode",{parentName:"a"},"rootppl/models/simple-examples/mixture.cu"))),(0,a.kt)("p",null,"This model demonstrates an example of ",(0,a.kt)("em",{parentName:"p"},"stochastic branching"),", meaning that different code is executed depending on the outcome of the sample."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-CUDA"},"BBLOCK(mixture, {\n    double x;\n    if(SAMPLE(bernoulli, 0.7))\n        x = SAMPLE(normal, -2, 1);\n    else\n        x = SAMPLE(normal, 3, 1);\n\n    PSTATE = x;\n    PC++;\n})\n")),(0,a.kt)("h5",{id:"geometric-distribution-recursive"},"Geometric Distribution (Recursive)"),(0,a.kt)("p",null,"Full example: ",(0,a.kt)("a",{parentName:"p",href:"rootppl/models/simple-examples/geometric_recursive.cu"},(0,a.kt)("inlineCode",{parentName:"a"},"rootppl/models/simple-examples/geometric_recursive.cu"))),(0,a.kt)("p",null,"This model combines stochastic branching with recursion. Basic blocks do not fully support recursion themselves, as they take no custom arguments or return values. Instead, a helper function is used to express the recursive model:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-CUDA"},"BBLOCK_HELPER(geometricRecursive, {\n    if(SAMPLE(bernoulli, p))\n        return 1;\n    else\n        return BBLOCK_CALL(geometricRecursive, p) + 1;\n\n}, int, double p)\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-CUDA"},"BBLOCK(geometric, {\n    PSTATE = BBLOCK_CALL(geometricRecursive, 0.6);\n    PC++;\n})\n")),(0,a.kt)("p",null,"Note that the helper function takes its return value and parameters comma-separated after the function body."),(0,a.kt)("p",null,"While recursive functions is supported by CUDA, iterative solutions are encouraged. Below is the same model, implemented with a loop instead."),(0,a.kt)("h5",{id:"geometric-distribution-iterative"},"Geometric Distribution (Iterative)"),(0,a.kt)("p",null,"Full example: ",(0,a.kt)("a",{parentName:"p",href:"rootppl/models/simple-examples/geometric_iterative.cu"},(0,a.kt)("inlineCode",{parentName:"a"},"rootppl/models/simple-examples/geometric_iterative.cu"))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-CUDA"},"BBLOCK(geometric, {\n    int numFlips = 1;\n    while(! SAMPLE(bernoulli, 0.6))\n        numFlips++;\n    PSTATE = numFlips;\n    PC++;\n})\n")),(0,a.kt)("h4",{id:"phylogenetic-models"},"Phylogenetic Models"),(0,a.kt)("p",null,"More sophisticated models can be found in the ",(0,a.kt)("a",{parentName:"p",href:"rootppl/models/phylogenetics"},"phylogenetics directory"),". These probabilistic\nmodels to inference on observed phylogenetic trees. These observed trees can be found in ",(0,a.kt)("a",{parentName:"p",href:"rootppl/models/phylogenetics/tree-utils/trees.cuh"},"phylogenetics/tree-utils/trees.cuh"),".\nThe correct phylogenetic models contain a link in the top of the file to the WebPPL source code used as reference when implementing them.\nThese models contain a number of new things, e.g.:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Multiple basic blocks"),(0,a.kt)("li",{parentName:"ul"},"Structures as program states"),(0,a.kt)("li",{parentName:"ul"},"Recursive simulations"),(0,a.kt)("li",{parentName:"ul"},"Global data used by the model"),(0,a.kt)("li",{parentName:"ul"},"Resampling throughout the traversal of the observed tree")),(0,a.kt)("h5",{id:"constant-rate-birth-death"},"Constant-rate birth-death"),(0,a.kt)("p",null,"In ",(0,a.kt)("a",{parentName:"p",href:"rootppl/models/phylogenetics/crbd"},"phylogenetics/crbd"),", the constant-rate birth-death models can be found.\nThe most interesting file here is ",(0,a.kt)("a",{parentName:"p",href:"rootppl/models/phylogenetics/crbd/crbd.cu"},"crbd.cu")," as it is a correct model\nused by evolutionary biologists. This model uses a pre-processed DFS traversal path over the observed tree, rather than using a call stack."),(0,a.kt)("h5",{id:"further-phylogenetic-models"},"Further phylogenetic models"),(0,a.kt)("p",null,"Further phylogenetic models are found in the package\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/vsenderov/phyrppl"},(0,a.kt)("inlineCode",{parentName:"a"},"phyrppl")),"."),(0,a.kt)("h4",{id:"the-rootppl-architecture"},"The RootPPL Architecture"),(0,a.kt)("p",null,"The architecture's main goal is to decouple the inference from the probabilistic models, this is the case for probabilistic\nprogramming languages.\nAll inference engine code is located under ",(0,a.kt)("inlineCode",{parentName:"p"},"src/"),".\nIn the ",(0,a.kt)("inlineCode",{parentName:"p"},"inference")," directory, the code for inference methods can be found. Currently, only SMC is supported.\nWithin the ",(0,a.kt)("inlineCode",{parentName:"p"},"smc")," directory, the ",(0,a.kt)("inlineCode",{parentName:"p"},"resampling")," directory contain resampling strategies. Currently only Systematic Resampling is supported. The resampling has\na parallel implementation for the GPU, and a sequential and parallel implementation for the CPU."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The ",(0,a.kt)("inlineCode",{parentName:"li"},"dists")," directory contains distributions and scoring functions. Both models and inference can rely on these."),(0,a.kt)("li",{parentName:"ul"},"The ",(0,a.kt)("inlineCode",{parentName:"li"},"macros")," directory contains all the macros/constructs that are mostly used by models but also in inference code."),(0,a.kt)("li",{parentName:"ul"},"The ",(0,a.kt)("inlineCode",{parentName:"li"},"utils")," directory contains code that RootPPL uses, but can be used by models as well."),(0,a.kt)("li",{parentName:"ul"},"The ",(0,a.kt)("inlineCode",{parentName:"li"},"models")," directory contains example models that use the inference.")),(0,a.kt)("h4",{id:"compile-with-the-built-in-stack"},"Compile with the built-in stack"),(0,a.kt)("p",null,"To compile with the ",(0,a.kt)("inlineCode",{parentName:"p"},"progStateStack_t")," program state, the macro ",(0,a.kt)("inlineCode",{parentName:"p"},"INIT_MODEL_STACK(num_bblocks)")," should be used instead of ",(0,a.kt)("inlineCode",{parentName:"p"},"INIT_MODEL(progState_t, num_bblocks)"),".\nThen the stack size is specified in bytes with ",(0,a.kt)("inlineCode",{parentName:"p"},"--stack_size num_bytes"),", e.g. ",(0,a.kt)("inlineCode",{parentName:"p"},"rootppl my_stack_model.cu --stack_size 10000"),"."),(0,a.kt)("h4",{id:"building-a-more-interesting-model"},"Building a more interesting model"),(0,a.kt)("p",null,"TODO, stuff not yet demonstrated explicitly in README:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"WEIGHT macro"),(0,a.kt)("li",{parentName:"ul"},"Multiple BBLOCK models"),(0,a.kt)("li",{parentName:"ul"},"Global data accessible by bblocks on GPU"),(0,a.kt)("li",{parentName:"ul"},"Program States containing more than a primitive datatype, e.g. structs.")))}c.isMDXComponent=!0}}]);