import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# breakable.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  


  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/set.mc"} style={S.link}>set.mc</a>, <a href={"/docs/Stdlib/either.mc"} style={S.link}>either.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>, <a href={"/docs/Stdlib/error.mc"} style={S.link}>error.mc</a>  
  
## Types  
  

          <DocBlock title="AllowedDirection" kind="type">

```mc
type AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
type AllowedDirection
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PermanentId" kind="type">

```mc
type PermanentId : Symbol
```

<Description>{`Each node in the parsed SPPF has a unique ID via \`gensym\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
type PermanentId = Symbol
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LOpen" kind="type">

```mc
type LOpen
```

<Description>{`This is the type that is used to describe an item to be added to the parse`}</Description>


<ToggleWrapper text="Code..">
```mc
type LOpen
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LClosed" kind="type">

```mc
type LClosed
```



<ToggleWrapper text="Code..">
```mc
type LClosed
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ROpen" kind="type">

```mc
type ROpen
```



<ToggleWrapper text="Code..">
```mc
type ROpen
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RClosed" kind="type">

```mc
type RClosed
```



<ToggleWrapper text="Code..">
```mc
type RClosed
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="WrappedSelf" kind="type">

```mc
type WrappedSelf
```



<ToggleWrapper text="Code..">
```mc
type WrappedSelf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LOpenSelf" kind="type">

```mc
type LOpenSelf
```



<ToggleWrapper text="Code..">
```mc
type LOpenSelf self rstyle
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PermanentNode" kind="type">

```mc
type PermanentNode
```

<Description>{`This is the type of a node in an SPPF. The \`self\`, \`leftChildAlts\`,  
and \`rightChildAlts\` fields are considered public, all others are  
implementation details and should be considered private. In  
particular this means that it's fine to examine an SPPF \(i.e.,  
pattern match on it, typically to construct an AST\), but not to  
construct a new SPPF.`}</Description>


<ToggleWrapper text="Code..">
```mc
type PermanentNode self
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TentativeData" kind="type">

```mc
type TentativeData
```

<Description>{`This is the data carried by tentative nodes, nodes that don't yet  
have all their children known`}</Description>


<ToggleWrapper text="Code..">
```mc
type TentativeData self
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GroupingsAllowedFunc" kind="type">

```mc
type GroupingsAllowedFunc
```



<ToggleWrapper text="Code..">
```mc
type GroupingsAllowedFunc self = all lstyle. all rstyle.
  (self lstyle ROpen, self LOpen rstyle) -> AllowedDirection
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TopAllowedFunc" kind="type">

```mc
type TopAllowedFunc
```



<ToggleWrapper text="Code..">
```mc
type TopAllowedFunc self = all lstyle. all rstyle.
  self lstyle rstyle -> Bool
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LeftAllowedFunc" kind="type">

```mc
type LeftAllowedFunc
```



<ToggleWrapper text="Code..">
```mc
type LeftAllowedFunc self = all lstyle. all rstyle1. all rstyle2.
  {parent : self LOpen rstyle1, child : self lstyle rstyle2} -> Bool
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RightAllowedFunc" kind="type">

```mc
type RightAllowedFunc
```



<ToggleWrapper text="Code..">
```mc
type RightAllowedFunc self = all lstyle1. all lstyle2. all rstyle.
  {parent : self lstyle1 ROpen, child : self lstyle2 rstyle} -> Bool
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ParenAllowedFunc" kind="type">

```mc
type ParenAllowedFunc
```



<ToggleWrapper text="Code..">
```mc
type ParenAllowedFunc self = all lstyle. all rstyle.
  self lstyle rstyle -> AllowedDirection
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Config" kind="type">

```mc
type Config
```



<ToggleWrapper text="Code..">
```mc
type Config self =
  { topAllowed : TopAllowedFunc self
  , leftAllowed : LeftAllowedFunc self
  , rightAllowed : RightAllowedFunc self
  , parenAllowed : ParenAllowedFunc self
  , groupingsAllowed : GroupingsAllowedFunc self
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TimeStep" kind="type">

```mc
type TimeStep : Int
```

<Description>{`As an optimization we keep track of a kind of "current" time, all  
data from older timesteps is considered to be empty. The time is  
essentially just which BreakableInput we're processing currently in  
the sequence of input.`}</Description>


<ToggleWrapper text="Code..">
```mc
type TimeStep = Int
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TentativeNode" kind="type">

```mc
type TentativeNode
```

<Description>{`NOTE\(vipa, 2021\-02\-12\): This is the type of a node that may or may  
not be in the final SPPF, we haven't seen enough of the input to  
determine which yet. Note that there are references in the types,  
i.e., they're not pure data. These references are used to optimize  
knowledge of how new nodes are supposed to be added. Each of these  
references also have an attached time step; if the timestep is  
older than the current time in the algorithm then the reference  
should be considered as unset \(i.e., we don't have to clear all  
references each iteration of the algorithm\). We parse left to  
right, thus all tentative nodes are left\-closed`}</Description>


<ToggleWrapper text="Code..">
```mc
type TentativeNode self rstyle
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="State" kind="type">

```mc
type State
```

<Description>{`The data we carry along while parsing`}</Description>


<ToggleWrapper text="Code..">
```mc
type State self rstyle =
  { timestep : Ref TimeStep
  , nextIdx : Ref Int
  , frontier : [TentativeNode self rstyle]
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BreakableQueue" kind="type">

```mc
type BreakableQueue
```

<Description>{`NOTE\(vipa, 2021\-02\-15\): This should be a private type, and/or replaced with some standard library type at a later point in time`}</Description>


<ToggleWrapper text="Code..">
```mc
type BreakableQueue self = Ref (Map Int [TentativeNode self ROpen])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Ambiguity" kind="type">

```mc
type Ambiguity
```



<ToggleWrapper text="Code..">
```mc
type Ambiguity pos tokish = {range: {first: pos, last: pos}, partialResolutions: [[tokish]]}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Important" kind="type">

```mc
type Important
```



<ToggleWrapper text="Code..">
```mc
type Important
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BreakableErrorHighlightConfig" kind="type">

```mc
type BreakableErrorHighlightConfig
```



<ToggleWrapper text="Code..">
```mc
type BreakableErrorHighlightConfig self =
  { parenAllowed : ParenAllowedFunc self
  , topAllowed : TopAllowedFunc self
  , terminalInfos : all lstyle. all rstyle. self lstyle rstyle -> [Info]
  , getInfo : all lstyle. all rstyle. self lstyle rstyle -> Info
  , lpar : String
  , rpar : String
  }
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="GNeither" kind="con">

```mc
con GNeither : () -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
con GNeither : () -> AllowedDirection
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GLeft" kind="con">

```mc
con GLeft : () -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
con GLeft : () -> AllowedDirection
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GRight" kind="con">

```mc
con GRight : () -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
con GRight : () -> AllowedDirection
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GEither" kind="con">

```mc
con GEither : () -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
con GEither : () -> AllowedDirection
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="WAtom" kind="con">

```mc
con WAtom : all self . self LClosed RClosed -> WrappedSelf
```



<ToggleWrapper text="Code..">
```mc
con WAtom : all self. self LClosed RClosed -> WrappedSelf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="WInfix" kind="con">

```mc
con WInfix : all self . self LOpen ROpen -> WrappedSelf
```



<ToggleWrapper text="Code..">
```mc
con WInfix : all self. self LOpen ROpen -> WrappedSelf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="WPrefix" kind="con">

```mc
con WPrefix : all self . self LClosed ROpen -> WrappedSelf
```



<ToggleWrapper text="Code..">
```mc
con WPrefix : all self. self LClosed ROpen -> WrappedSelf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="WPostfix" kind="con">

```mc
con WPostfix : all self . self LOpen RClosed -> WrappedSelf
```



<ToggleWrapper text="Code..">
```mc
con WPostfix : all self. self LOpen RClosed -> WrappedSelf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LInfix" kind="con">

```mc
con LInfix : all self . self LOpen ROpen -> LOpenSelf self ROpen
```



<ToggleWrapper text="Code..">
```mc
con LInfix : all self. self LOpen ROpen -> LOpenSelf self ROpen
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LPostfix" kind="con">

```mc
con LPostfix : all self . self LOpen RClosed -> LOpenSelf self RClosed
```



<ToggleWrapper text="Code..">
```mc
con LPostfix : all self. self LOpen RClosed -> LOpenSelf self RClosed
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AtomP" kind="con">

```mc
con AtomP : all self . { id: PermanentId, idx: Int, self: self LClosed RClosed } -> PermanentNode self
```



<ToggleWrapper text="Code..">
```mc
con AtomP : all self.
  { id : PermanentId
  , idx : Int
  , self : self LClosed RClosed
  } -> PermanentNode self
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="InfixP" kind="con">

```mc
con InfixP : all self . { id: PermanentId, idx: Int, self: self LOpen ROpen, leftChildAlts: [PermanentNode self], rightChildAlts: [PermanentNode self] } -> PermanentNode self
```



<ToggleWrapper text="Code..">
```mc
con InfixP : all self.
  { id : PermanentId
  , idx : Int
  , self : self LOpen ROpen
  , leftChildAlts : [PermanentNode self] -- NonEmpty
  , rightChildAlts : [PermanentNode self] -- NonEmpty
  } -> PermanentNode self
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PrefixP" kind="con">

```mc
con PrefixP : all self . { id: PermanentId, idx: Int, self: self LClosed ROpen, rightChildAlts: [PermanentNode self] } -> PermanentNode self
```



<ToggleWrapper text="Code..">
```mc
con PrefixP : all self.
  { id : PermanentId
  , idx : Int
  , self : self LClosed ROpen
  , rightChildAlts : [PermanentNode self] -- NonEmpty
  } -> PermanentNode self
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PostfixP" kind="con">

```mc
con PostfixP : all self . { id: PermanentId, idx: Int, self: self LOpen RClosed, leftChildAlts: [PermanentNode self] } -> PermanentNode self
```



<ToggleWrapper text="Code..">
```mc
con PostfixP : all self.
  { id : PermanentId
  , idx : Int
  , self : self LOpen RClosed
  , leftChildAlts : [PermanentNode self] -- NonEmpty
  } -> PermanentNode self
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="InfixT" kind="con">

```mc
con InfixT : all self . { idx: Int, self: self LOpen ROpen, leftChildAlts: [PermanentNode self] } -> TentativeData self
```



<ToggleWrapper text="Code..">
```mc
con InfixT : all self.
  { idx : Int
  , self : self LOpen ROpen
  , leftChildAlts : [PermanentNode self] -- NonEmpty
  } -> TentativeData self
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PrefixT" kind="con">

```mc
con PrefixT : all self . { idx: Int, self: self LClosed ROpen } -> TentativeData self
```



<ToggleWrapper text="Code..">
```mc
con PrefixT : all self.
  { idx : Int
  , self : self LClosed ROpen
  } -> TentativeData self
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TentativeLeaf" kind="con">

```mc
con TentativeLeaf : all self . { parents: [TentativeNode self ROpen], node: PermanentNode self } -> TentativeNode self RClosed
```



<ToggleWrapper text="Code..">
```mc
con TentativeLeaf : all self.
  { parents : [TentativeNode self ROpen] -- NonEmpty
  , node : PermanentNode self
  } -> TentativeNode self RClosed
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TentativeMid" kind="con">

```mc
con TentativeMid : all self . { addedNodesLeftChildren: Ref (TimeStep, Ref [PermanentNode self]), addedNodesRightChildren: Ref (TimeStep, [PermanentNode self]), parents: [TentativeNode self ROpen], tentativeData: TentativeData self, maxDistanceFromRoot: Int } -> TentativeNode self ROpen
```



<ToggleWrapper text="Code..">
```mc
con TentativeMid : all self.
  { addedNodesLeftChildren : Ref (TimeStep, Ref [PermanentNode self])
  , addedNodesRightChildren : Ref (TimeStep, [PermanentNode self])
  , parents : [TentativeNode self ROpen] -- NonEmpty
  , tentativeData : TentativeData self
  , maxDistanceFromRoot : Int
  } -> TentativeNode self ROpen
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TentativeRoot" kind="con">

```mc
con TentativeRoot : all self . { addedNodesLeftChildren: Ref (TimeStep, Ref [PermanentNode self]), addedNodesRightChildren: Ref (TimeStep, [PermanentNode self]) } -> TentativeNode self ROpen
```



<ToggleWrapper text="Code..">
```mc
con TentativeRoot : all self.
  { addedNodesLeftChildren : Ref (TimeStep, Ref [PermanentNode self])
  , addedNodesRightChildren : Ref (TimeStep, [PermanentNode self])
  } -> TentativeNode self ROpen
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Important" kind="con">

```mc
con Important : () -> Important
```



<ToggleWrapper text="Code..">
```mc
con Important : () -> Important
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Unimportant" kind="con">

```mc
con Unimportant : () -> Important
```



<ToggleWrapper text="Code..">
```mc
con Unimportant : () -> Important
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_includesLeft" kind="let">

```mc
let _includesLeft dir : AllowedDirection -> Bool
```



<ToggleWrapper text="Code..">
```mc
let _includesLeft
  : AllowedDirection -> Bool
  = lam dir. match dir with GEither _ | GLeft _ then true else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_includesRight" kind="let">

```mc
let _includesRight dir : AllowedDirection -> Bool
```



<ToggleWrapper text="Code..">
```mc
let _includesRight
  : AllowedDirection -> Bool
  = lam dir. match dir with GEither _ | GRight _ then true else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_firstTimeStep" kind="let">

```mc
let _firstTimeStep  : TimeStep
```



<ToggleWrapper text="Code..">
```mc
let _firstTimeStep : TimeStep = 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_isBefore" kind="let">

```mc
let _isBefore  : TimeStep -> TimeStep -> Bool
```



<ToggleWrapper text="Code..">
```mc
let _isBefore : TimeStep -> TimeStep -> Bool = lti
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_uniqueID" kind="let">

```mc
let _uniqueID  : () -> PermanentId
```



<ToggleWrapper text="Code..">
```mc
let _uniqueID : () -> PermanentId = gensym
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getParents" kind="let">

```mc
let _getParents n : all self. all rstyle. TentativeNode self rstyle -> Option [TentativeNode self ROpen]
```



<ToggleWrapper text="Code..">
```mc
let _getParents
  : all self. all rstyle. TentativeNode self rstyle
  -> Option [TentativeNode self ROpen] -- NonEmpty
  = lam n.
    let unlink : all r. TentativeNode self rstyle -> TentativeNode self r
      = unsafeCoerce in
    match unlink n with TentativeLeaf {parents = ps} then Some ps else
    match unlink n with TentativeMid {parents = ps} then Some ps else
    match unlink n with TentativeRoot _ then None () else
    never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_opIdxP" kind="let">

```mc
let _opIdxP node : all self. PermanentNode self -> Int
```



<ToggleWrapper text="Code..">
```mc
let _opIdxP
  : all self. PermanentNode self
  -> Int
  = lam node.
    match node with AtomP {idx = idx} then idx else
    match node with InfixP {idx = idx} then idx else
    match node with PrefixP {idx = idx} then idx else
    match node with PostfixP {idx = idx} then idx else
    never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addedNodesLeftChildren" kind="let">

```mc
let _addedNodesLeftChildren node : all self. TentativeNode self ROpen -> Ref (TimeStep, Ref [PermanentNode self])
```



<ToggleWrapper text="Code..">
```mc
let _addedNodesLeftChildren
  : all self. TentativeNode self ROpen
  -> Ref (TimeStep, Ref [PermanentNode self]) -- NonEmpty
  = lam node.
    match node with TentativeRoot{addedNodesLeftChildren = x} | TentativeMid{addedNodesLeftChildren = x}
    then x
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addedNodesRightChildren" kind="let">

```mc
let _addedNodesRightChildren node : all self. TentativeNode self ROpen -> Ref (TimeStep, [PermanentNode self])
```



<ToggleWrapper text="Code..">
```mc
let _addedNodesRightChildren
  : all self. TentativeNode self ROpen
  -> Ref (TimeStep, [PermanentNode self]) -- NonEmpty
  = lam node.
    match node with TentativeRoot{addedNodesRightChildren = x} | TentativeMid{addedNodesRightChildren = x}
    then x
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_callWithSelfP" kind="let">

```mc
let _callWithSelfP f p : all self. all x. (all lstyle. all rstyle. self lstyle rstyle -> x) -> PermanentNode self -> x
```



<ToggleWrapper text="Code..">
```mc
let _callWithSelfP
  : all self. all x. (all lstyle. all rstyle. self lstyle rstyle -> x)
  -> PermanentNode self
  -> x
  = lam f. lam p.
  switch p
  case AtomP p then f p.self
  case InfixP p then f p.self
  case PrefixP p then f p.self
  case PostfixP p then f p.self
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_isBrokenEdge" kind="let">

```mc
let _isBrokenEdge isTopAllowed parenAllowed node : all self. TopAllowedFunc self -> Bool -> PermanentNode self -> Bool
```



<ToggleWrapper text="Code..">
```mc
let _isBrokenEdge
  : all self. TopAllowedFunc self
  -> Bool
  -> PermanentNode self
  -> Bool
  = lam isTopAllowed. lam parenAllowed. lam node.
    or (not parenAllowed) (not (_callWithSelfP #frozen"isTopAllowed" node))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_leftChildrenP" kind="let">

```mc
let _leftChildrenP p : all self. PermanentNode self -> Option [PermanentNode self]
```



<ToggleWrapper text="Code..">
```mc
let _leftChildrenP
  : all self. PermanentNode self -> Option [PermanentNode self] = lam p.
  switch p
  case InfixP r then
    Some r.leftChildAlts
  case PostfixP r then
    Some r.leftChildAlts
  case _ then None ()
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_rightChildrenP" kind="let">

```mc
let _rightChildrenP p : all self. PermanentNode self -> Option [PermanentNode self]
```



<ToggleWrapper text="Code..">
```mc
let _rightChildrenP
  : all self. PermanentNode self -> Option [PermanentNode self] = lam p.
  switch p
  case InfixP r then
    Some r.rightChildAlts
  case PrefixP r then
    Some r.rightChildAlts
  case _ then None ()
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_brokenIdxesP" kind="let">

```mc
let _brokenIdxesP isTopAllowed parenAllowedDirs : all self. TopAllowedFunc self -> ParenAllowedFunc self -> PermanentNode self -> [Int]
```



<ToggleWrapper text="Code..">
```mc
let _brokenIdxesP
  : all self. TopAllowedFunc self
  -> ParenAllowedFunc self
  -> PermanentNode self
  -> [Int]
  = lam isTopAllowed. lam parenAllowedDirs.
    recursive let work = lam parenAllowed. lam p.
      if _isBrokenEdge #frozen"isTopAllowed" #frozen"parenAllowed" p then
        let parAllowed = _callWithSelfP #frozen"parenAllowedDirs" p in
        let l = match _leftChildrenP p with Some children
          then join (map (work (_includesLeft parAllowed)) children)
          else [] in
        let r = match _rightChildrenP p with Some children
          then join (map (work (_includesRight parAllowed)) children)
          else [] in
        join [l, [_opIdxP p], r]
      else []
    in work false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_brokenChildrenP" kind="let">

```mc
let _brokenChildrenP isTopAllowed parenAllowedDirs : all self. TopAllowedFunc self -> ParenAllowedFunc self -> PermanentNode self -> [PermanentNode self]
```



<ToggleWrapper text="Code..">
```mc
let _brokenChildrenP
  : all self. TopAllowedFunc self
  -> ParenAllowedFunc self
  -> PermanentNode self
  -> [PermanentNode self]
  = lam isTopAllowed. lam parenAllowedDirs.
    recursive let work = lam parenAllowed. lam p.
      if _isBrokenEdge #frozen"isTopAllowed" parenAllowed p then
        let parAllowed = _callWithSelfP #frozen"parenAllowedDirs" p in
        let l = match _leftChildrenP p with Some children
          then join (map (work (_includesLeft parAllowed)) children)
          else [] in
        let r = match _rightChildrenP p with Some children
          then join (map (work (_includesRight parAllowed)) children)
          else [] in
        concat l r
      else [p]
    in work false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="breakableInitState" kind="let">

```mc
let breakableInitState _ : all self. () -> State self ROpen
```



<ToggleWrapper text="Code..">
```mc
let breakableInitState : all self. () -> State self ROpen
  = lam.
    let timestep = ref _firstTimeStep in
    let nextIdx = ref 0 in
    let addedLeft = ref (_firstTimeStep, ref []) in
    let addedRight = ref (_firstTimeStep, []) in
    { timestep = timestep
    , nextIdx = nextIdx
    , frontier =
      [ TentativeRoot { addedNodesLeftChildren = addedLeft, addedNodesRightChildren = addedRight } ]
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_maxDistanceFromRoot" kind="let">

```mc
let _maxDistanceFromRoot n : all self. all rstyle. TentativeNode self rstyle -> Int
```



<ToggleWrapper text="Code..">
```mc
let _maxDistanceFromRoot
  : all self. all rstyle.
  TentativeNode self rstyle
  -> Int
  = lam n.
    let unlink : all r. TentativeNode self rstyle -> TentativeNode self r
      = unsafeCoerce in
    match unlink n with TentativeMid {maxDistanceFromRoot = r} then r else
    match unlink n with TentativeRoot _ then 0 else
    match unlink n with  TentativeLeaf {parents = ps} then
      maxOrElse (lam. 0) subi (map _maxDistanceFromRoot ps)
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_shallowAllowedLeft" kind="let">

```mc
let _shallowAllowedLeft allowedLeft parent child : all self. all rstyle. LeftAllowedFunc self -> LOpenSelf self rstyle -> TentativeNode self RClosed -> Option (PermanentNode self)
```



<ToggleWrapper text="Code..">
```mc
let _shallowAllowedLeft
  : all self. all rstyle.
  LeftAllowedFunc self
  -> LOpenSelf self rstyle
  -> TentativeNode self RClosed
  -> Option (PermanentNode self)
  = lam allowedLeft. lam parent. lam child.
    match child with TentativeLeaf {node = node} then
      let helper = lam self.
        let unlink : all r. LOpenSelf self rstyle -> LOpenSelf self r = unsafeCoerce in
        match unlink parent with LInfix parent then allowedLeft {parent = parent, child = self} else
        match unlink parent with LPostfix parent then allowedLeft {parent = parent, child = self} else
        never in
      if _callWithSelfP #frozen"helper" node
      then Some node
      else None ()
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_shallowAllowedRight" kind="let">

```mc
let _shallowAllowedRight topAllowed rightAllowed parent child : all self. TopAllowedFunc self -> RightAllowedFunc self -> TentativeNode self ROpen -> TentativeNode self RClosed -> Option (PermanentNode self)
```



<ToggleWrapper text="Code..">
```mc
let _shallowAllowedRight
  : all self. TopAllowedFunc self
  -> RightAllowedFunc self
  -> TentativeNode self ROpen
  -> TentativeNode self RClosed
  -> Option (PermanentNode self)
  = lam topAllowed. lam rightAllowed. lam parent. lam child.
    match child with TentativeLeaf {node = node} then
      switch parent
      case TentativeMid {tentativeData = InfixT {self = parent}} then
        let f = lam child. rightAllowed {parent = parent, child = child} in
        if _callWithSelfP #frozen"f" node
        then Some node
        else None ()
      case TentativeMid {tentativeData = PrefixT {self = parent}} then
        let f = lam child. rightAllowed {parent = parent, child = child} in
        if _callWithSelfP #frozen"f" node
        then Some node
        else None ()
      case TentativeRoot _ then
        if _callWithSelfP #frozen"topAllowed" node then Some node else None ()
      end
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addRightChildren" kind="let">

```mc
let _addRightChildren st parent children : all self. all rstyle. State self rstyle -> TentativeNode self ROpen -> [PermanentNode self] -> TentativeNode self RClosed
```



<ToggleWrapper text="Code..">
```mc
let _addRightChildren
  : all self. all rstyle. State self rstyle
  -> TentativeNode self ROpen
  -> [PermanentNode self] -- NonEmpty
  -> TentativeNode self RClosed
  = lam st. lam parent. lam children.
    match parent with TentativeMid {parents = parents, tentativeData = data} then
      let id = _uniqueID () in
      let node =
        match data with InfixT {idx = idx, self = self, leftChildAlts = l} then
          InfixP {id = id, idx = idx, self = self, leftChildAlts = l, rightChildAlts = children}
        else match data with PrefixT {idx = idx, self = self} then
          PrefixP {id = id, idx = idx, self = self, rightChildAlts = children}
        else never in
      TentativeLeaf {parents = parents, node = node}
    else match parent with TentativeRoot _ then
      error "Unexpectedly tried to add right children to the root"
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addLeftChildren" kind="let">

```mc
let _addLeftChildren st lself leftChildren parents : all self. all rstyle. all rstyle2. State self rstyle2 -> LOpenSelf self rstyle -> [PermanentNode self] -> [TentativeNode self ROpen] -> TentativeNode self rstyle
```



<ToggleWrapper text="Code..">
```mc
let _addLeftChildren
  : all self. all rstyle. all rstyle2.
  State self rstyle2
  -> LOpenSelf self rstyle
  -> [PermanentNode self] -- NonEmpty
  -> [TentativeNode self ROpen] -- NonEmpty
  -> TentativeNode self rstyle
  = lam st. lam lself. lam leftChildren. lam parents.
    let idx = deref st.nextIdx in
    let unlink : all r. LOpenSelf self rstyle -> LOpenSelf self r = unsafeCoerce in
    match unlink lself with LInfix self then
      let return : TentativeNode self ROpen -> TentativeNode self rstyle = unsafeCoerce in
      let time = deref st.timestep in
      let addedLeft = ref (_firstTimeStep, ref []) in
      let addedRight = ref (_firstTimeStep, []) in
      let res = TentativeMid
        { parents = parents
        , addedNodesLeftChildren = addedLeft
        , addedNodesRightChildren = addedRight
        , maxDistanceFromRoot = addi 1 (maxOrElse (lam. 0) subi (map _maxDistanceFromRoot parents))
        , tentativeData = InfixT {idx = idx, self = self, leftChildAlts = leftChildren}
        } in
      return res
    else match unlink lself with LPostfix self then
      let return : TentativeNode self RClosed -> TentativeNode self rstyle = unsafeCoerce in
      let id = _uniqueID () in
      let res = TentativeLeaf
        { parents = parents
        , node = PostfixP {id = id, idx = idx, self = self, leftChildAlts = leftChildren}
        } in
      return res
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addRightChildToParent" kind="let">

```mc
let _addRightChildToParent time child parent : all self. TimeStep -> PermanentNode self -> TentativeNode self ROpen -> Option (TentativeNode self ROpen)
```



<ToggleWrapper text="Code..">
```mc
let _addRightChildToParent
  : all self. TimeStep
  -> PermanentNode self
  -> TentativeNode self ROpen
  -> Option (TentativeNode self ROpen)
  = lam time. lam child. lam parent.
    let target = _addedNodesRightChildren parent in
    match deref target with (lastUpdate, prev) then
      if _isBefore lastUpdate time then
        modref target (time, [child]);
        Some parent
      else
        modref target (time, cons child prev);
        None ()
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addLeftChildToParent" kind="let">

```mc
let _addLeftChildToParent time child parents : all self. TimeStep -> PermanentNode self -> [TentativeNode self ROpen] -> Option [TentativeNode self ROpen]
```



<ToggleWrapper text="Code..">
```mc
let _addLeftChildToParent
  : all self. TimeStep
  -> PermanentNode self
  -> [TentativeNode self ROpen] -- NonEmpty
  -> Option [TentativeNode self ROpen] -- NonEmpty
  = lam time. lam child. lam parents.
    match parents with [p] ++ _ then
      let target = _addedNodesLeftChildren p in
      match deref target with (lastUpdate, prev) then
        if _isBefore lastUpdate time then
          let leftChildrenHere = ref [child] in
          for_ parents (lam p. modref (_addedNodesLeftChildren p) (time, leftChildrenHere));
          Some parents
        else
          modref prev (cons child (deref prev));
          None ()
      else never
    else never -- TODO(vipa, 2021-02-12): this isn't technically never for the typesystem, since we're matching against a possibly empty list. However, the list will never be empty, by the comment about NonEmpty above
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getAllowedGroupings" kind="let">

```mc
let _getAllowedGroupings groupings l r : all self. all rstyle. GroupingsAllowedFunc self -> TentativeNode self ROpen -> LOpenSelf self rstyle -> (Bool, Bool)
```



<ToggleWrapper text="Code..">
```mc
let _getAllowedGroupings
  : all self. all rstyle.
  GroupingsAllowedFunc self
  -> TentativeNode self ROpen
  -> LOpenSelf self rstyle
  -> (Bool, Bool)
  = lam groupings. lam l. lam r.
    switch l
    case TentativeRoot _ then (false, true)
    case TentativeMid l then
      let dirs =
        let unlink : all r. LOpenSelf self rstyle -> LOpenSelf self r = unsafeCoerce in
        match (l.tentativeData, unlink r) with (InfixT l, LInfix r) then groupings (l.self, r) else
        match (l.tentativeData, unlink r) with (PrefixT l, LInfix r) then groupings (l.self, r) else
        match (l.tentativeData, unlink r) with (InfixT l, LPostfix r) then groupings (l.self, r) else
        match (l.tentativeData, unlink r) with (PrefixT l, LPostfix r) then groupings (l.self, r) else
        never
      in (_includesLeft dirs, _includesRight dirs)
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_newQueue" kind="let">

```mc
let _newQueue _ : all self. () -> BreakableQueue self
```



<ToggleWrapper text="Code..">
```mc
let _newQueue
  : all self. () -> BreakableQueue self
  = lam. ref (mapEmpty (lam x. lam y. subi y x))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addToQueue" kind="let">

```mc
let _addToQueue node queue : all self. TentativeNode self ROpen -> BreakableQueue self -> ()
```



<ToggleWrapper text="Code..">
```mc
let _addToQueue
  : all self. TentativeNode self ROpen
  -> BreakableQueue self
  -> ()
  = lam node. lam queue.
    modref queue (mapInsertWith concat (_maxDistanceFromRoot node) [node] (deref queue))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_popFromQueue" kind="let">

```mc
let _popFromQueue queue : all self. BreakableQueue self -> Option (TentativeNode self ROpen)
```



<ToggleWrapper text="Code..">
```mc
let _popFromQueue
  : all self. BreakableQueue self
  -> Option (TentativeNode self ROpen)
  = lam queue.
    match mapGetMin (deref queue) with Some (k, [v] ++ vs) then
      let newQueue = match vs with []
                     then mapRemove k (deref queue)
                     else mapInsert k vs (deref queue)
      in
      modref queue newQueue; Some v
    else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addLOpen" kind="let">

```mc
let _addLOpen config lself st : all self. all rstyle. Config self -> LOpenSelf self rstyle -> State self RClosed -> Option (State self rstyle)
```



<ToggleWrapper text="Code..">
```mc
let _addLOpen
  : all self. all rstyle. Config self
  -> LOpenSelf self rstyle
  -> State self RClosed
  -> Option (State self rstyle)
  = lam config. lam lself. lam st.
    let nodesToProcess = _newQueue () in
    let time = addi 1 (deref st.timestep) in
    modref st.timestep time;

    let makeNewParents
      : [TentativeNode self ROpen] -- NonEmpty
      -> TentativeNode self rstyle
      = lam parents.
        match parents with [p] ++ _ then
          let snd: all a. all b. (a, b) -> b = lam x. x.1 in
          let cs = deref (snd (deref (_addedNodesLeftChildren p))) in
          match cs with [_] ++ _ then
            _addLeftChildren st lself cs parents
          else error "Somehow thought that a node would be a new parent, but it had no added children"
        else never -- TODO(vipa, 2021-02-12): this isn't technically never by for the typesystem, since we're matching against a possibly empty list. However, the list will never be empty, by the comment about NonEmpty above
    in

    -- NOTE(vipa, 2021-11-04): We only ever add to the queue here, no popping.
    let handleLeaf
      : BreakableQueue self
      -> TentativeNode self RClosed
      -> Option [TentativeNode self ROpen] -- NonEmpty
      = lam queue. lam child.
        match _getParents child with Some parents then
          let lallowed : LeftAllowedFunc self = config.leftAllowed in
          let rallowed : RightAllowedFunc self = config.rightAllowed in
          let tallowed : TopAllowedFunc self = config.topAllowed in
          let gallowed : GroupingsAllowedFunc self = config.groupingsAllowed in
          -- NOTE(vipa, 2021-11-30): \\`_shallowAllowedLeft\\` and
          -- \\`_shallowAllowedRight\\` do two things: they check if the
          -- child is allowed as a left or right child, respectively,
          -- and they extract the already created PermanentNode inside
          -- the TentativeNode. \\`shallowRight\\` is thus \\`Some\\` iff
          -- shallow restrictions allow grouping to the right, and
          -- correspondingly for \\`shallowLeft\\`.
          -- NOTE(vipa, 2021-11-30): This means that if both
          -- \\`shallowLeft\\` and \\`shallowRight\\` are \\`Some\\`, then
          -- \\`shallowLeft = shallowRight\\`.
          let shallowRight = _shallowAllowedLeft #frozen"lallowed" lself child in
          let f = lam parent.
            let shallowLeft = _shallowAllowedRight #frozen"tallowed" #frozen"rallowed" parent child in
            match _getAllowedGroupings #frozen"gallowed" parent lself with (precLeft, precRight) in
            let config = (shallowLeft, shallowRight, precLeft, precRight) in
            -- NOTE(vipa, 2021-11-30): Grouping to the left is done by
            -- telling the parent that it should have \\`child\\` as a
            -- right child and adding it (the parent) to the queue if
            -- it isn't there already. It will later be made into a
            -- new permanent node, once all its children have been
            -- processed.
            (match (parent, config) with (!TentativeRoot _, _) & ((_, (Some child, None _, _, _)) | (_, (Some child, _, true, _))) then
               match _addRightChildToParent time child parent with Some parent then
                 _addToQueue parent queue
               else ()
             else ());
            -- NOTE(vipa, 2021-11-30): Grouping to the right is done
            -- by returning \\`true\\` to \\`filter\\`
            match config with (None _, Some child, _, _) | (_, Some child, _, true) then
              true
            else false in
          let parentsThatAllowRight = filter f parents in
          -- NOTE(vipa, 2021-11-30): If \\`parents\\` is non-empty then
          -- \\`shallowRight\\` must be \\`Some\\` (since \\`f\\` would return
          -- \\`false\\` otherwise).
          match (shallowRight, parentsThatAllowRight) with (Some child, parents & [_] ++ _) then
            -- NOTE(vipa, 2021-11-30): We cannot create the new
            -- tentative node yet because there may be more sharing
            -- available: multiple parents may share multiple
            -- children, in which case we still want to only create
            -- *one* new tentative node that has all of the shared
            -- children as left children. Thus we tell the parents
            -- that this \\`child\\` should be a left-child of this new
            -- node, once it is created.
            _addLeftChildToParent time child parents
          else None ()
        else never
    in

    recursive let work
      : BreakableQueue self
      -> [[TentativeNode self ROpen]] -- The inner sequence is NonEmpty
      -> [[TentativeNode self ROpen]] -- The inner sequence is NonEmpty
      = lam queue. lam acc.
        match _popFromQueue queue with Some (parent & TentativeMid{addedNodesRightChildren = addedRight}) then
          match deref addedRight with (_, children & [_] ++ _) then
            let acc = match handleLeaf queue (_addRightChildren st parent children)
              with Some n then cons n acc
              else acc in
            work queue acc
          else error "Somehow reached a parent without right children that was still added to the queue"
        else acc
    in

    let frontier = st.frontier in
    -- NOTE(vipa, 2021-11-04): This is a priority queue sorted on
    --   maxDistanceFromRoot (pop longest distance first). It's empty
    --   from the start (the frontier is only used to find the highest
    --   possible distance).
    let newParents = mapOption (handleLeaf nodesToProcess) frontier in
    let newParents = work nodesToProcess newParents in
    match map makeNewParents newParents with frontier & ([_] ++ _) then
      -- NOTE(vipa, 2022-05-05): The typechecker currently requires
      -- that {x with foo = ...} does not change the type of \\`foo\\`,
      -- which this code needs to do (the type of \\`frontier\\` changes),
      -- thus we reconstruct the entire record for the moment.
      Some {timestep = st.timestep, nextIdx = st.nextIdx, frontier = frontier}
    else
      None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="breakableAddPrefix" kind="let">

```mc
let breakableAddPrefix config self st : all self. Config self -> self LClosed ROpen -> State self ROpen -> State self ROpen
```



<ToggleWrapper text="Code..">
```mc
let breakableAddPrefix
  : all self. Config self
  -> self LClosed ROpen
  -> State self ROpen
  -> State self ROpen
  = lam config. lam self. lam st.
    let frontier = st.frontier in
    let time = deref st.timestep in
    let idx = deref st.nextIdx in
    modref st.nextIdx (addi 1 idx);
    let addedLeft = ref (_firstTimeStep, ref []) in
    let addedRight = ref (_firstTimeStep, []) in
    { st with frontier =
      [ TentativeMid
        { parents = frontier
        , addedNodesLeftChildren = addedLeft
        , addedNodesRightChildren = addedRight
        , maxDistanceFromRoot = addi 1 (maxOrElse (lam. 0) subi (map _maxDistanceFromRoot frontier))
        , tentativeData = PrefixT {idx = idx, self = self}
        }
      ]
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="breakableAddInfix" kind="let">

```mc
let breakableAddInfix config self st : all self. Config self -> self LOpen ROpen -> State self RClosed -> Option (State self ROpen)
```



<ToggleWrapper text="Code..">
```mc
let breakableAddInfix
  : all self. Config self
  -> self LOpen ROpen
  -> State self RClosed
  -> Option (State self ROpen)
  = lam config. lam self. lam st.
    let res = _addLOpen config (LInfix self) st in
    modref st.nextIdx (addi 1 (deref st.nextIdx));
    res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="breakableAddPostfix" kind="let">

```mc
let breakableAddPostfix config self st : all self. Config self -> self LOpen RClosed -> State self RClosed -> Option (State self RClosed)
```



<ToggleWrapper text="Code..">
```mc
let breakableAddPostfix
  : all self. Config self
  -> self LOpen RClosed
  -> State self RClosed
  -> Option (State self RClosed)
  = lam config. lam self. lam st.
    let res = _addLOpen config (LPostfix self) st in
    modref st.nextIdx (addi 1 (deref st.nextIdx));
    res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="breakableAddAtom" kind="let">

```mc
let breakableAddAtom config self st : all self. Config self -> self LClosed RClosed -> State self ROpen -> State self RClosed
```



<ToggleWrapper text="Code..">
```mc
let breakableAddAtom
  : all self. Config self
  -> self LClosed RClosed
  -> State self ROpen
  -> State self RClosed
  = lam config. lam self. lam st.
    let idx = deref st.nextIdx in
    modref st.nextIdx (addi 1 idx);
    let id = _uniqueID () in
    -- NOTE(vipa, 2022-05-05): The typechecker currently requires that
    -- {x with foo = ...} does not change the type of \\`foo\\`, which
    -- this code needs to do (the type of \\`frontier\\` changes), thus we
    -- reconstruct the entire record for the moment.
    { timestep = st.timestep
    , nextIdx = st.nextIdx
    , frontier =
      [ TentativeLeaf
        { parents = st.frontier
        , node = AtomP {id = id, idx = idx, self = self}
        }
      ]
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="breakableFinalizeParse" kind="let">

```mc
let breakableFinalizeParse config st : all self. Config self -> State self RClosed -> Option [PermanentNode self]
```

<Description>{`TODO\(vipa, 2021\-02\-15\): There should be more information in case of  
a parse failure, but it's not obvious precisely how the information  
should be presented, it's not obvious to me that there will always  
be a single cause of the failure that is easy to find  
algorithmically`}</Description>


<ToggleWrapper text="Code..">
```mc
let breakableFinalizeParse
  : all self. Config self
  -> State self RClosed
  -> Option [PermanentNode self] -- NonEmpty
  = lam config. lam st.
    let nodesToProcess = _newQueue () in
    let time = addi 1 (deref st.timestep) in
    modref st.timestep time;
    let rallowed : RightAllowedFunc self = config.rightAllowed in
    let tallowed : TopAllowedFunc self = config.topAllowed in

    let handleLeaf
      : BreakableQueue self
      -> TentativeNode self RClosed
      -> ()
      = lam queue. lam child.
        match _getParents child with Some parents then
          for_ parents
            (lam parent.
              match _shallowAllowedRight #frozen"tallowed" #frozen"rallowed" parent child with Some child then
                match _addRightChildToParent time child parent with Some parent then
                  _addToQueue parent queue
                else ()
              else ())
        else never
    in

    recursive let work
      : BreakableQueue self
      -> [PermanentNode self]
      = lam queue.
        match _popFromQueue queue with Some p then
          let snd: all a. all b. (a, b) -> b = lam x. x.1 in
          let children = (snd (deref (_addedNodesRightChildren p))) in
          match p with TentativeRoot _ then children
          else match (p, children) with (TentativeMid _, [_] ++ _) then
            handleLeaf queue (_addRightChildren st p children);
            work queue
          else match p with TentativeMid _ then
            error "Somehow reached a TentativeMid without right children, that was still added to the queue"
          else never
        else []
    in

    let frontier = st.frontier in
    iter (handleLeaf nodesToProcess) frontier;
    match work nodesToProcess with res & [_] ++ _ then Some res else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="breakableReportAmbiguities" kind="let">

```mc
let breakableReportAmbiguities info nodes : all self. all pos. all tokish. {lpar: tokish, rpar: tokish, toTok: all lstyle. all rstyle. Important -> self lstyle rstyle -> [tokish], leftPos: all rstyle1. self LClosed rstyle1 -> pos, rightPos: all lstyle1. self lstyle1 RClosed -> pos, topAllowed: TopAllowedFunc self, parenAllowed: ParenAllowedFunc self} -> [PermanentNode self] -> [Ambiguity pos tokish]
```

<Description>{`Examine an SPPF, reporting all ambiguities present, if any. If the  
resulting list is empty then no ambiguities were found, which  
implies that \`leftChildAlts\` and \`rightChildAlts\` are singleton  
lists throughout the entire SPPF.`}</Description>


<ToggleWrapper text="Code..">
```mc
let breakableReportAmbiguities
  : all self. all pos. all tokish.
    { parenAllowed : ParenAllowedFunc self
    , topAllowed : TopAllowedFunc self
    , toTok : all lstyle. all rstyle. Important -> self lstyle rstyle -> [tokish]
    , leftPos : all rstyle. self LClosed rstyle -> pos
    , rightPos : all lstyle. self lstyle RClosed -> pos
    , lpar : tokish
    , rpar : tokish }
  -> [PermanentNode self] -- NonEmpty
  -> [Ambiguity pos tokish]
  = lam info. lam nodes.
    let pallowed : ParenAllowedFunc self = info.parenAllowed in
    let tallowed : TopAllowedFunc self = info.topAllowed in
    -- NOTE(vipa, 2021-02-15): All alternatives for children at the
    -- same point in the tree have the exact same range in the input,
    -- i.e., they will have exactly the same input as first and last
    -- input, that's why we only look at one of the children, we don't
    -- need to look at the others
    -- OPT(vipa, 2022-02-14): We don't need to examine children in the
    -- middle, could have two recursive functions, one going right,
    -- and one going left.
    recursive let range
      : PermanentNode self
      -> {first: pos, last: pos}
      = lam node.
        switch node
        case AtomP {self = self} then {first = info.leftPos self, last = info.rightPos self}
        case InfixP {leftChildAlts = [l] ++ _, rightChildAlts = [r] ++ _} then
          { first = (range l).first
          , last = (range r).last
          }
        case PrefixP {self = self, rightChildAlts = [r] ++ _} then
          { first = info.leftPos self
          , last = (range r).last
          }
        case PostfixP {self = self, leftChildAlts = [l] ++ _} then
          { first = (range l).first
          , last = info.rightPos self
          }
        end
    in

    type IdxSet = [Int] in
    let leftOf : Int -> IdxSet -> IdxSet = lam idx. lam set. filter (gti idx) set in
    let rightOf : Int -> IdxSet -> IdxSet = lam idx. lam set. filter (lti idx) set in
    let inIdxSet : Int -> IdxSet -> Bool = lam idx. lam set. any (eqi idx) set in
    let idxSetEmpty : IdxSet -> Bool = lam set. null set in

    let isImportant : PermanentNode self -> IdxSet -> Important = lam p. lam set.
      if inIdxSet (_opIdxP p) set then Important () else Unimportant () in
    let idxAndImportant : PermanentNode self -> IdxSet -> (IdxSet, Important, IdxSet) = lam p. lam set.
      let idx = _opIdxP p in
      (leftOf idx set, if inIdxSet idx set then Important () else Unimportant (), rightOf idx set) in

    recursive
      let flattenOne : IdxSet -> PermanentNode self -> [tokish] = lam important. lam node.
        let isImportant = isImportant node important in
        switch node
        case AtomP {self = self} then info.toTok isImportant self
        case InfixP p then
          join [flattenMany important p.leftChildAlts, info.toTok isImportant p.self, flattenMany important p.rightChildAlts]
        case PrefixP p then
          concat (info.toTok isImportant p.self) (flattenMany important p.rightChildAlts)
        case PostfixP p then
          concat (flattenMany important p.leftChildAlts) (info.toTok isImportant p.self)
        end
      let flattenMany : IdxSet -> [PermanentNode self] -> [tokish] = lam important. lam nodes. -- NonEmpty
        match nodes with [n] ++ _ then
          flattenOne important n
        else never
    in

    recursive
      let resolveTopOne : IdxSet -> PermanentNode self -> [[tokish]] =
        lam topIdxs. lam p.
          match idxAndImportant p topIdxs with (lIdxs, selfImportant, rIdxs) in
          let parAllowed = _callWithSelfP #frozen"pallowed" p in
          let l = match _leftChildrenP p with Some children
            then resolveTopMany lIdxs (_includesLeft parAllowed) children
            else [[]] in
          let r = match _rightChildrenP p with Some children
            then resolveTopMany rIdxs (_includesRight parAllowed) children
            else [[]] in
          let f = lam x. info.toTok selfImportant x in
          let here = _callWithSelfP #frozen"f" p in
          seqLiftA2 (lam l. lam r. join [l, here, r]) l r
      let resolveTopMany : [Int] -> Bool -> [PermanentNode self] -> [[tokish]] =
        lam topIdxs. lam parenAllowed. lam ps.
          match partition (_isBrokenEdge #frozen"tallowed" parenAllowed) ps with (broken, whole) in
          let broken = join (map (resolveTopOne topIdxs) broken) in
          let whole = if null whole then [] else
            let flattened = flattenMany topIdxs whole in
            if idxSetEmpty topIdxs then [flattened] else [snoc (cons info.lpar flattened) info.rpar]
          in
          concat broken whole
    in
    let ambiguities : Ref [Ambiguity pos tokish] = ref [] in

    recursive
      let workMany
        : Option (PermanentNode self)
        -> Bool
        -> [PermanentNode self] -- NonEmpty
        -> ()
        = lam brokenParent. lam parenAllowed. lam tops.
          match tops with [n] then
            workOne (if _isBrokenEdge #frozen"tallowed" parenAllowed n then brokenParent else None ()) n
          else match tops with [n] ++ _ then
            let x = match (any (_isBrokenEdge #frozen"tallowed" parenAllowed) tops, brokenParent)
              with (true, Some parent) then ([parent], range parent)
              else (tops, range n) in
            let tops = x.0 in
            let range = x.1 in

            -- TODO(vipa, 2021-11-12): Make sure to not report the
            -- same brokenParent multiple times, since that's possible
            -- with the current setup

            -- NOTE(vipa, 2021-11-12): Find all nodes that can be at
            -- the root, including nodes that are part of the same
            -- broken production
            let topIdxs = setOfSeq subi (join (map (_brokenIdxesP #frozen"tallowed" #frozen"pallowed") tops)) in
            -- NOTE(vipa, 2021-11-12): Some nodes will be in the top
            -- broken production in some alternatives but not in
            -- others. If we cover these in those alternatives then we
            -- cut off some ambiguity, but not all. Ex: we have \\`I I x
            -- E x\\` with prefix \\`I\\` and infix \\`E\\`, and unbreaking must
            -- put \\`E\\` as a child of an \\`I\\`. One alternative is
            -- resolved as \\`I (I x) E x\\`. However, neither the inner
            -- \\`I\\` nor the \\`x\\` can be in the root, unbroken or not,
            -- yet we still need to cover it with parens. This is
            -- because another node (\\`E\\`) that *can* be in the root
            -- can also be unbroken into a production that contains
            -- both it and the inner \\`I\\`, namely in the other
            -- alternative: \\`I (I x E x)\\`. We must thus also find
            -- nodes that can be unbroken together with nodes that can
            -- be in the root.
            -- OPT(vipa, 2021-11-15): It should be sufficient to check
            -- children along the edges only, not all descendants.
            recursive let addChildMaybe = lam acc. lam c.
              let idxs = _brokenIdxesP #frozen"tallowed" #frozen"pallowed" c in
              let acc = if any (lam x. setMem x topIdxs) idxs
                then foldl (lam acc. lam x. setInsert x acc) acc idxs
                else acc in
              foldl addChildMaybe acc (_brokenChildrenP #frozen"tallowed" #frozen"pallowed" c)
            in
            let addChildrenMaybe = lam acc. lam top.
              foldl addChildMaybe acc (_brokenChildrenP #frozen"tallowed" #frozen"pallowed" top) in
            let mergeRootIdxs = foldl addChildrenMaybe (setEmpty subi) tops in

            -- OPT(vipa, 2021-10-11): This should probably be a set that supports
            -- member querying as well as \\`removeGreaterThan\\` and \\`removeLesserThan\\`
            let idxesToCover = setToSeq (setUnion mergeRootIdxs topIdxs) in

            let resolutions : [[tokish]] = resolveTopMany idxesToCover false tops in

            -- TODO(vipa, 2021-10-11): Compute valid elisons
            let err = {range = range, partialResolutions = resolutions} in
            modref ambiguities (cons err (deref ambiguities));
            ()
          else dprintLn tops; never
      let workOne
        : Option (PermanentNode self)
        -> PermanentNode self
        -> ()
        = lam brokenParent. lam node.
          let parAllowed = _callWithSelfP #frozen"pallowed" node in
          (match _leftChildrenP node with Some children
            then workMany (optionOr brokenParent (Some node)) (_includesLeft parAllowed) children
            else ());
          (match _rightChildrenP node with Some children
            then workMany (optionOr brokenParent (Some node)) (_includesRight parAllowed) children
            else ());
          ()
    in

    workMany (None ()) false nodes;
    deref ambiguities
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="breakableConstructSimple" kind="let">

```mc
let breakableConstructSimple f ns : all self. all res. {constructAtom: self LClosed RClosed -> res, constructInfix: self LOpen ROpen -> res -> res -> res, constructPrefix: self LClosed ROpen -> res -> res, constructPostfix: self LOpen RClosed -> res -> res} -> [PermanentNode self] -> res
```



<ToggleWrapper text="Code..">
```mc
let breakableConstructSimple
  : all self. all res.
    { constructAtom : self LClosed RClosed -> res
    , constructInfix : self LOpen ROpen -> res -> res -> res
    , constructPrefix : self LClosed ROpen -> res -> res
    , constructPostfix : self LOpen RClosed -> res -> res
    }
  -> [PermanentNode self] -- NonEmpty
  -> res
  = lam f. lam ns.
    recursive let work
      : PermanentNode self -> res
      = lam n.
        switch n
        case AtomP p then f.constructAtom p.self
        case InfixP (p & {leftChildAlts = [l] ++ _, rightChildAlts = [r] ++ _}) then
          f.constructInfix p.self (work l) (work r)
        case PrefixP (p & {rightChildAlts = [r] ++ _}) then
          f.constructPrefix p.self (work r)
        case PostfixP (p & {leftChildAlts = [l] ++ _}) then
          f.constructPostfix p.self (work l)
        end
    in match ns with [n] ++ _ then work n else error "NonEmpty"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="breakableToErrorHighlightSpec" kind="let">

```mc
let breakableToErrorHighlightSpec config tops : all self. BreakableErrorHighlightConfig self -> [PermanentNode self] -> [{info: Info, partialResolutions: [[Highlight]]}]
```



<ToggleWrapper text="Code..">
```mc
let breakableToErrorHighlightSpec
  : all self. BreakableErrorHighlightConfig self
  -> [PermanentNode self] -- NonEmpty
  -> [{info: Info, partialResolutions: [[Highlight]]}]
  = lam config. lam tops.
    let pallowed : ParenAllowedFunc self = config.parenAllowed in
    let tallowed : TopAllowedFunc self = config.topAllowed in
    let linfo : all rstyle. self LClosed rstyle -> Info = config.getInfo in
    let rinfo : all lstyle. self lstyle RClosed -> Info = config.getInfo in
    let totok : all lstyle. all rstyle. Important -> self lstyle rstyle -> [Highlight] = lam imp. lam self.
      match imp with Important _ then
        map (lam info. Relevant info) (config.terminalInfos self)
      else [Irrelevant (config.getInfo self)] in
    let reportConfig =
      { parenAllowed = #frozen"pallowed"
      , topAllowed = #frozen"tallowed"
      , toTok = #frozen"totok"
      , leftPos = #frozen"linfo"
      , rightPos = #frozen"rinfo"
      , lpar = Added {content = config.lpar, ensureSurroundedBySpaces = true}
      , rpar = Added {content = config.rpar, ensureSurroundedBySpaces = true}
      } in
    let res = breakableReportAmbiguities reportConfig tops in
    let fixup = lam amb: Ambiguity Info Highlight.
      let amb: Ambiguity Info Highlight = amb in
      {info = mergeInfo amb.range.first amb.range.last, partialResolutions = amb.partialResolutions}
    in map fixup res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="breakableDefaultHighlight" kind="let">

```mc
let breakableDefaultHighlight config content tops : all self. BreakableErrorHighlightConfig self -> String -> [PermanentNode self] -> [(Info, String)]
```



<ToggleWrapper text="Code..">
```mc
let breakableDefaultHighlight
  : all self. BreakableErrorHighlightConfig self
  -> String
  -> [PermanentNode self]
  -> [(Info, String)]
  = lam config. lam content. lam tops.
    let highlightOne = lam amb: {info: Info, partialResolutions: [[Highlight]]}.
      let alternatives = map (formatHighlights terminalHighlightAddedConfig content) amb.partialResolutions in
      let body =
        if match amb.info with Info x then eqi x.row1 x.row2 else false then
          strJoin "\n" (map (concat "  ") alternatives)
        else
          strJoin "\n\n" (mapi (lam i. lam str. join ["Alternative ", int2string (addi i 1), ":\n", str]) alternatives)
      in (amb.info, join ["Ambiguity error\n", body, "\n"])
    in map highlightOne (breakableToErrorHighlightSpec config tops)
```
</ToggleWrapper>
</DocBlock>

