import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# rtppl-ext.mc  
  

  
  
  
## Types  
  

          <DocBlock title="Signal" kind="type">

```mc
type Signal : Int external setSigintHandler: (Signal -> ()) -> ()
```



<ToggleWrapper text="Code..">
```mc
type Signal = Int

-- Overrides the signal handler for the SIGINT signal.
external setSigintHandler : (Signal -> ()) -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Timespec" kind="type">

```mc
type Timespec : (Int, Int) external getMonotonicTime: () -> Timespec external getWallClockTime: () -> Timespec external getProcessCpuTime: () -> Timespec external clockNanosleep: Timespec -> () external rtpplSetMaxPriority: () -> Int external rtpplSetPriority: Int -> Int external rtpplOpenFileDescriptor: String -> Int -> Int external rtpplCloseFileDescriptor: Int -> ()
```

<Description>{`Functions for accessing different the time according to different clocks and  
using this to sleep until an absolute point in time. The timespec contains  
a specification of the time of the format \(seconds, nanoseconds\).`}</Description>


<ToggleWrapper text="Code..">
```mc
type Timespec = (Int, Int)
external getMonotonicTime : () -> Timespec
external getWallClockTime : () -> Timespec
external getProcessCpuTime : () -> Timespec
external clockNanosleep : Timespec -> ()

-- Sets the priority of the process, returning the previous priority
external rtpplSetMaxPriority : () -> Int
external rtpplSetPriority : Int -> Int

-- Opens and closes file descriptors
external rtpplOpenFileDescriptor : String -> Int -> Int
external rtpplCloseFileDescriptor : Int -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Opaque" kind="type">

```mc
type Opaque
```



<ToggleWrapper text="Code..">
```mc
type Opaque

-- Writing and reading RTPPL data types to and from a given file descriptor.
external rtpplReadInt : Int -> [(Timespec, Int)]
external rtpplWriteInt : Int -> (Timespec, Int) -> ()
external rtpplReadFloat : Int -> [(Timespec, Float)]
external rtpplWriteFloat : Int -> (Timespec, Float) -> ()
external rtpplReadIntRecord : Int -> Int -> [(Timespec, Opaque)]
external rtpplWriteIntRecord : Int -> Int -> (Timespec, Opaque) -> ()
external rtpplReadFloatRecord : Int -> Int -> [(Timespec, Opaque)]
external rtpplWriteFloatRecord : Int -> Int -> (Timespec, Opaque) -> ()
external rtpplReadDistFloat : Int -> [(Timespec, [(Float, Float)])]
external rtpplWriteDistFloat : Int -> (Timespec, ([Float], [Float])) -> ()
external rtpplReadDistFloatRecord : Int -> Int -> [(Timespec, [(Float, Opaque)])]
external rtpplWriteDistFloatRecord : Int -> Int -> (Timespec, ([Opaque], [Float])) -> ()
```
</ToggleWrapper>
</DocBlock>

