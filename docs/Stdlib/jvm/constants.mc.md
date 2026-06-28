import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# constants.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/jvm/ast.mc"} style={S.link}>jvm/ast.mc</a>  
  
## Variables  
  

          <DocBlock title="aload_" kind="let">

```mc
let aload_ i : Int -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let aload_ = use JVMAst in 
    lam i. createBInt "ALOAD" i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="astore_" kind="let">

```mc
let astore_ i : Int -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let astore_ = use JVMAst in
    lam i. createBInt "ASTORE" i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lload_" kind="let">

```mc
let lload_ i : Int -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let lload_ = use JVMAst in
    lam i. createBInt "LLOAD" i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lstore_" kind="let">

```mc
let lstore_ i : Int -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let lstore_ = use JVMAst in
    lam i. createBInt "LSTORE" i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ldcInt_" kind="let">

```mc
let ldcInt_ i : Int -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let ldcInt_ = use JVMAst in
    lam i. createBInt "LDC" i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ldcString_" kind="let">

```mc
let ldcString_ s : String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let ldcString_ = use JVMAst in
    lam s. createBString "LDC" s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ldcFloat_" kind="let">

```mc
let ldcFloat_ i : Float -> JVMAst_Bytecode
```

<Description>{`loads double on JVM`}</Description>


<ToggleWrapper text="Code..">
```mc
let ldcFloat_ = use JVMAst in
    lam i. createBFloat "LDC" i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ldcLong_" kind="let">

```mc
let ldcLong_ i : Int -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let ldcLong_ = use JVMAst in
    lam i. createBLong "LDC" i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="return_" kind="let">

```mc
let return_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let return_ = use JVMAst in
    createBEmpty "RETURN"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ladd_" kind="let">

```mc
let ladd_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let ladd_ = use JVMAst in
    createBEmpty "LADD"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dadd_" kind="let">

```mc
let dadd_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let dadd_ = use JVMAst in
    createBEmpty "DADD"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lsub_" kind="let">

```mc
let lsub_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let lsub_ = use JVMAst in 
    createBEmpty "LSUB"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dsub_" kind="let">

```mc
let dsub_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let dsub_ = use JVMAst in 
    createBEmpty "DSUB"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lmul_" kind="let">

```mc
let lmul_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let lmul_ = use JVMAst in 
    createBEmpty "LMUL"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dmul_" kind="let">

```mc
let dmul_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let dmul_ = use JVMAst in 
    createBEmpty "DMUL"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ldiv_" kind="let">

```mc
let ldiv_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let ldiv_ = use JVMAst in 
    createBEmpty "LDIV"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ddiv_" kind="let">

```mc
let ddiv_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let ddiv_ = use JVMAst in 
    createBEmpty "DDIV"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lrem_" kind="let">

```mc
let lrem_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let lrem_ = use JVMAst in 
    createBEmpty "LREM"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lneg_" kind="let">

```mc
let lneg_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let lneg_ = use JVMAst in 
    createBEmpty "LNEG"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dneg_" kind="let">

```mc
let dneg_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let dneg_ = use JVMAst in 
    createBEmpty "DNEG"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dup_" kind="let">

```mc
let dup_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let dup_ = use JVMAst in
    createBEmpty "DUP"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="areturn_" kind="let">

```mc
let areturn_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let areturn_ = use JVMAst in
    createBEmpty "ARETURN"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pop_" kind="let">

```mc
let pop_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let pop_ = use JVMAst in
    createBEmpty "POP"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="invokespecial_" kind="let">

```mc
let invokespecial_ owner name descriptor : String -> String -> String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let invokespecial_ = use JVMAst in
    lam owner. lam name. lam descriptor. createBApply "INVOKESPECIAL" owner name descriptor
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getstatic_" kind="let">

```mc
let getstatic_ owner name descriptor : String -> String -> String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let getstatic_ = use JVMAst in
    lam owner. lam name. lam descriptor. createBApply "GETSTATIC" owner name descriptor
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getfield_" kind="let">

```mc
let getfield_ owner name descriptor : String -> String -> String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let getfield_ = use JVMAst in
    lam owner. lam name. lam descriptor. createBApply "GETFIELD" owner name descriptor
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="putfield_" kind="let">

```mc
let putfield_ owner name descriptor : String -> String -> String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let putfield_ = use JVMAst in
    lam owner. lam name. lam descriptor. createBApply "PUTFIELD" owner name descriptor
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="invokevirtual_" kind="let">

```mc
let invokevirtual_ owner name descriptor : String -> String -> String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let invokevirtual_ = use JVMAst in 
    lam owner. lam name. lam descriptor. createBApply "INVOKEVIRTUAL" owner name descriptor
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="invokeinterface_" kind="let">

```mc
let invokeinterface_ owner name descriptor : String -> String -> String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let invokeinterface_ = use JVMAst in
    lam owner. lam name. lam descriptor. createBApply "INVOKEINTERFACE" owner name descriptor
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="invokestatic_" kind="let">

```mc
let invokestatic_ owner name descriptor : String -> String -> String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let invokestatic_ = use JVMAst in
    lam owner. lam name. lam descriptor. createBApply "INVOKESTATIC" owner name descriptor
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="new_" kind="let">

```mc
let new_ name : String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let new_ = use JVMAst in
    lam name. createBString "NEW" name
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="checkcast_" kind="let">

```mc
let checkcast_ name : String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let checkcast_ = use JVMAst in
    lam name. createBString "CHECKCAST" name
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ifeq_" kind="let">

```mc
let ifeq_ label : String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let ifeq_ = use JVMAst in 
    lam label. createBString "IFEQ" label
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ifneq_" kind="let">

```mc
let ifneq_ label : String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let ifneq_ = use JVMAst in 
    lam label. createBString "IFNEQ" label
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="iflt_" kind="let">

```mc
let iflt_ label : String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let iflt_ = use JVMAst in 
    lam label. createBString "IFLT" label   
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ificmpeq_" kind="let">

```mc
let ificmpeq_ label : String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let ificmpeq_ = use JVMAst in 
    lam label. createBString "IF_ICMPEQ" label
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="label_" kind="let">

```mc
let label_ name : String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let label_ = use JVMAst in 
    lam name. createBString "LABEL" name
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dcmpeq_" kind="let">

```mc
let dcmpeq_ label : String -> JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let dcmpeq_= use JVMAst in
    lam label. createBString "DCMPEQ" label
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lcmp_" kind="let">

```mc
let lcmp_  : JVMAst_Bytecode
```



<ToggleWrapper text="Code..">
```mc
let lcmp_ = use JVMAst in 
    createBEmpty "LCMP"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jvmTrue" kind="let">

```mc
let jvmTrue  : Int
```



<ToggleWrapper text="Code..">
```mc
let jvmTrue = 1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="jvmFalse" kind="let">

```mc
let jvmFalse  : Int
```



<ToggleWrapper text="Code..">
```mc
let jvmFalse = 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="type_LT" kind="let">

```mc
let type_LT x : String -> String
```



<ToggleWrapper text="Code..">
```mc
let type_LT = lam x. join ["L", x, ";"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="methodtype_T" kind="let">

```mc
let methodtype_T arg ret : String -> String -> String
```



<ToggleWrapper text="Code..">
```mc
let methodtype_T = lam arg. lam ret. join ["(", arg, ")", ret]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="object_T" kind="let">

```mc
let object_T  : String
```



<ToggleWrapper text="Code..">
```mc
let object_T = "java/lang/Object"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="object_LT" kind="let">

```mc
let object_LT  : String
```



<ToggleWrapper text="Code..">
```mc
let object_LT = type_LT object_T
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="integer_T" kind="let">

```mc
let integer_T  : String
```



<ToggleWrapper text="Code..">
```mc
let integer_T = "java/lang/Long" 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="integer_LT" kind="let">

```mc
let integer_LT  : String
```



<ToggleWrapper text="Code..">
```mc
let integer_LT = type_LT integer_T
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="float_T" kind="let">

```mc
let float_T  : String
```



<ToggleWrapper text="Code..">
```mc
let float_T = "java/lang/Double" 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="float_LT" kind="let">

```mc
let float_LT  : String
```



<ToggleWrapper text="Code..">
```mc
let float_LT = type_LT float_T
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="boolean_T" kind="let">

```mc
let boolean_T  : String
```



<ToggleWrapper text="Code..">
```mc
let boolean_T = "java/lang/Boolean"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="boolean_LT" kind="let">

```mc
let boolean_LT  : String
```



<ToggleWrapper text="Code..">
```mc
let boolean_LT = type_LT boolean_T
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pkg_" kind="let">

```mc
let pkg_  : String
```



<ToggleWrapper text="Code..">
```mc
let pkg_ = "pkg/"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="apply_" kind="let">

```mc
let apply_ bytecode : [JVMAst_Bytecode] -> JVMAst_Function
```



<ToggleWrapper text="Code..">
```mc
let apply_ = use JVMAst in 
    lam bytecode.
    createFunction "apply" (methodtype_T object_LT object_LT) (concat bytecode [areturn_])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wrapInteger_" kind="let">

```mc
let wrapInteger_  : [JVMAst_Bytecode]
```



<ToggleWrapper text="Code..">
```mc
let wrapInteger_ = 
    [invokestatic_ integer_T "valueOf" (methodtype_T "J" integer_LT)]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unwrapInteger_" kind="let">

```mc
let unwrapInteger_  : [JVMAst_Bytecode]
```



<ToggleWrapper text="Code..">
```mc
let unwrapInteger_ = 
    [checkcast_ integer_T, invokevirtual_ integer_T "longValue" "()J"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wrapFloat_" kind="let">

```mc
let wrapFloat_  : [JVMAst_Bytecode]
```



<ToggleWrapper text="Code..">
```mc
let wrapFloat_ = 
    [invokestatic_ float_T "valueOf" (methodtype_T "D" float_LT)]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unwrapFloat_" kind="let">

```mc
let unwrapFloat_  : [JVMAst_Bytecode]
```



<ToggleWrapper text="Code..">
```mc
let unwrapFloat_ = 
    [checkcast_ float_T, invokevirtual_ float_T "doubleValue" "()D"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wrapBoolean_" kind="let">

```mc
let wrapBoolean_  : [JVMAst_Bytecode]
```



<ToggleWrapper text="Code..">
```mc
let wrapBoolean_ = 
    [invokestatic_ boolean_T "valueOf" (methodtype_T "Z" boolean_LT)]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unwrapBoolean_" kind="let">

```mc
let unwrapBoolean_  : [JVMAst_Bytecode]
```



<ToggleWrapper text="Code..">
```mc
let unwrapBoolean_ = 
    [checkcast_ boolean_T, invokevirtual_ boolean_T "booleanValue" "()Z"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="defaultConstructor" kind="let">

```mc
let defaultConstructor  : JVMAst_Function
```



<ToggleWrapper text="Code..">
```mc
let defaultConstructor = use JVMAst in
    createFunction "constructor" "()V" [aload_ 0, invokespecial_ "java/lang/Object" "<init>" "()V", return_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="createName_" kind="let">

```mc
let createName_ prefix : String -> String
```



<ToggleWrapper text="Code..">
```mc
let createName_ = 
    lam prefix. concat prefix (create 3 (lam. randAlphanum ()))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initClass_" kind="let">

```mc
let initClass_ name : String -> [JVMAst_Bytecode]
```



<ToggleWrapper text="Code..">
```mc
let initClass_ = 
    lam name. 
        [new_ (concat pkg_ name), dup_, invokespecial_ (concat pkg_ name) "<init>" "()V"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="arithClassI_" kind="let">

```mc
let arithClassI_ name op : String -> [JVMAst_Bytecode] -> JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let arithClassI_ = use JVMAst in
    lam name. lam op. 
    let freeVar = "var" in
    let varTy = integer_LT in
    createClass 
        name 
        (concat pkg_"Function") 
        [createField freeVar varTy] 
        defaultConstructor 
        [createFunction 
            "apply" 
            "(Ljava/lang/Object;)Ljava/lang/Object;" 
            (foldl concat 
                [aload_ 0, 
                getfield_ (concat pkg_ name) freeVar varTy] 
                [unwrapInteger_, 
                [aload_ 1], 
                unwrapInteger_, 
                op, 
                wrapInteger_, 
                [areturn_]])]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="arithClassF_" kind="let">

```mc
let arithClassF_ name op : String -> [JVMAst_Bytecode] -> JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let arithClassF_ = use JVMAst in
    lam name. lam op.
    let freeVar = "var" in
    let varTy = float_LT in
    createClass 
        name 
        (concat pkg_"Function") 
        [createField freeVar varTy] 
        defaultConstructor 
        [createFunction 
            "apply" 
            "(Ljava/lang/Object;)Ljava/lang/Object;" 
            (foldl concat 
                [aload_ 0, 
                getfield_ (concat pkg_ name) freeVar varTy] 
                [unwrapFloat_, 
                [aload_ 1], 
                unwrapFloat_, 
                op, 
                wrapFloat_, 
                [areturn_]])]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="arithClassIB_" kind="let">

```mc
let arithClassIB_ name op label : String -> [JVMAst_Bytecode] -> String -> JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let arithClassIB_ = use JVMAst in 
    lam name. lam op. lam label.
    let freeVar = "var" in
    let varTy = integer_LT in
    createClass 
        name 
        (concat pkg_"Function") 
        [createField freeVar varTy] 
        defaultConstructor 
        [createFunction 
            "apply" 
            "(Ljava/lang/Object;)Ljava/lang/Object;" 
            (foldl concat 
                [ldcInt_ 1,
                aload_ 0, 
                getfield_ (concat pkg_ name) freeVar varTy] 
                [unwrapInteger_, 
                [aload_ 1], 
                unwrapInteger_, 
                op,
                [pop_, 
                ldcInt_ 0,
                label_ label],
                wrapBoolean_,
                [areturn_]])]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="subiClass_" kind="let">

```mc
let subiClass_  : JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let subiClass_ = arithClassI_ "Subi" [lsub_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="subfClass_" kind="let">

```mc
let subfClass_  : JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let subfClass_ = arithClassF_ "Subf" [dsub_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addiClass_" kind="let">

```mc
let addiClass_  : JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let addiClass_ = arithClassI_ "Addi" [ladd_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addfClass_" kind="let">

```mc
let addfClass_  : JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let addfClass_ = arithClassF_ "Addf" [dadd_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="muliClass_" kind="let">

```mc
let muliClass_  : JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let muliClass_ = arithClassI_ "Muli" [lmul_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mulfClass_" kind="let">

```mc
let mulfClass_  : JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let mulfClass_ = arithClassF_ "Mulf" [dmul_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="diviClass_" kind="let">

```mc
let diviClass_  : JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let diviClass_ = arithClassI_ "Divi" [ldiv_] 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="divfClass_" kind="let">

```mc
let divfClass_  : JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let divfClass_ = arithClassF_ "Divf" [ddiv_] 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="modiClass_" kind="let">

```mc
let modiClass_  : JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let modiClass_ = arithClassI_ "Modi" [lrem_] 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqiClass_" kind="let">

```mc
let eqiClass_  : JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let eqiClass_ = arithClassIB_ "Eqi" [lcmp_, ifeq_ "end"] "end"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ltiClass_" kind="let">

```mc
let ltiClass_  : JVMAst_Class
```



<ToggleWrapper text="Code..">
```mc
let ltiClass_ = arithClassIB_ "Lti" [lcmp_, iflt_ "end"] "end"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constClassList_" kind="let">

```mc
let constClassList_  : [JVMAst_Class]
```



<ToggleWrapper text="Code..">
```mc
let constClassList_ = 
    [addiClass_, 
    subiClass_, 
    muliClass_, 
    diviClass_, 
    modiClass_,
    addfClass_, 
    subfClass_, 
    mulfClass_, 
    divfClass_,
    eqiClass_,
    ltiClass_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="applyArithF_" kind="let">

```mc
let applyArithF_ name env argBytecode : String -> MExprJVMCompile_JVMEnv -> [JVMAst_Bytecode] -> MExprJVMCompile_JVMEnv
```



<ToggleWrapper text="Code..">
```mc
let applyArithF_ = use JVMAst in
    lam name. lam env. lam argBytecode. 
    { env with 
        bytecode = foldl concat env.bytecode 
            [initClass_ name, 
            [dup_], 
            argBytecode,
            [checkcast_ float_T, 
            putfield_ (concat pkg_ name) "var" float_LT]] } 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="applyArithI_" kind="let">

```mc
let applyArithI_ name env argBytecode : String -> MExprJVMCompile_JVMEnv -> [JVMAst_Bytecode] -> MExprJVMCompile_JVMEnv
```



<ToggleWrapper text="Code..">
```mc
let applyArithI_ = use JVMAst in
    lam name. lam env. lam argBytecode. 
    { env with 
        bytecode = foldl concat env.bytecode 
            [initClass_ name, 
            [dup_], 
            argBytecode,
            [checkcast_ integer_T, 
            putfield_ (concat pkg_ name) "var" integer_LT]] } 
```
</ToggleWrapper>
</DocBlock>

