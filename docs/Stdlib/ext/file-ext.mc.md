import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# file-ext.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/option.mc"} style={S.link}>option.mc</a>  
  
## Types  
  

          <DocBlock title="WriteChannel" kind="type">

```mc
type WriteChannel
```



<ToggleWrapper text="Code..">
```mc
type WriteChannel
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ReadChannel" kind="type">

```mc
type ReadChannel
```



<ToggleWrapper text="Code..">
```mc
type ReadChannel


-- Returns true if the give file exists, else false
external externalFileExists ! : String -> Bool
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="fileExists" kind="let">

```mc
let fileExists s : String -> Bool
```



<ToggleWrapper text="Code..">
```mc
let fileExists = lam s. externalFileExists s

-- Deletes the file from the file system. If the file does not
-- exist, no error is reported. Use function fileExists to check
-- if the file exists.
external externalDeleteFile ! : String -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileDeleteFile" kind="let">

```mc
let fileDeleteFile s : String -> ()
```



<ToggleWrapper text="Code..">
```mc
let fileDeleteFile = lam s. if externalFileExists s then externalDeleteFile s else ()

-- Returns the size in bytes of a given file
-- If the file does not exist, 0 is returned.
-- Use function fileExists to check if a file exists.
external externalFileSize ! : String -> Int
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileSize" kind="let">

```mc
let fileSize name : String -> Int
```



<ToggleWrapper text="Code..">
```mc
let fileSize : String -> Int =
  lam name. externalFileSize name

-- Open a file for writing. Note that we
-- always open binary channels.
-- Note: the external function is shadowed. Use the second signature
external externalWriteOpen ! : String -> (WriteChannel, Bool)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileWriteOpen" kind="let">

```mc
let fileWriteOpen name : String -> Option WriteChannel
```



<ToggleWrapper text="Code..">
```mc
let fileWriteOpen : String -> Option WriteChannel =
  lam name. match externalWriteOpen name with (wc, true) then Some wc else None ()

-- Write a text string to the output channel
-- Right now, it does not handle Unicode correctly
-- It should default to UTF-8
external externalWriteString ! : WriteChannel -> String -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileWriteString" kind="let">

```mc
let fileWriteString c s : WriteChannel -> String -> ()
```



<ToggleWrapper text="Code..">
```mc
let fileWriteString : WriteChannel -> String -> () =
  lam c. lam s. externalWriteString c s

-- Flush output channel
external externalWriteFlush ! : WriteChannel -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileWriteFlush" kind="let">

```mc
let fileWriteFlush c : WriteChannel -> ()
```



<ToggleWrapper text="Code..">
```mc
let fileWriteFlush = lam c. externalWriteFlush c

-- Close a write channel
external externalWriteClose ! : WriteChannel -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileWriteClose" kind="let">

```mc
let fileWriteClose c : WriteChannel -> ()
```



<ToggleWrapper text="Code..">
```mc
let fileWriteClose = lam c. externalWriteClose c

-- Open a file for reading. Read open either return
-- Note: the external function is shadowed. Use the second signature
external externalReadOpen ! : String -> (ReadChannel, Bool)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileReadOpen" kind="let">

```mc
let fileReadOpen name : String -> Option ReadChannel
```



<ToggleWrapper text="Code..">
```mc
let fileReadOpen : String -> Option ReadChannel =
  lam name. match externalReadOpen name with (rc, true) then Some rc else None ()

-- Reads one line of text. Returns None if end of file.
-- If a successful line is read, it is returned without
-- the end-of-line character.
-- Should support Unicode in the future.
-- Note: the external function is shadowed. Use the second signature
external externalReadLine ! : ReadChannel -> (String, Bool)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileReadLine" kind="let">

```mc
let fileReadLine rc : ReadChannel -> Option String
```



<ToggleWrapper text="Code..">
```mc
let fileReadLine : ReadChannel -> Option String =
  lam rc. match externalReadLine rc with (s, false) then Some s else None ()

-- Reads a given number of bytes from the file.
-- Returns (bytes, eof, error) where bytes is the read bytes
external externalReadBytes ! : ReadChannel -> Int -> ([Int], Bool, Bool)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileReadBytes" kind="let">

```mc
let fileReadBytes rc len : ReadChannel -> Int -> Option [Int]
```



<ToggleWrapper text="Code..">
```mc
let fileReadBytes : ReadChannel -> Int -> Option [Int] =
  lam rc. lam len.
    switch externalReadBytes rc len
      case ([], true, _) then None ()
      case (s, _, false) then Some s
      case _ then None ()
    end

-- Reads everything in a file and returns the content as a string.
-- Should support Unicode in the future.
external externalReadString ! : ReadChannel -> String
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileReadString" kind="let">

```mc
let fileReadString c : ReadChannel -> String
```



<ToggleWrapper text="Code..">
```mc
let fileReadString = lam c. externalReadString c

-- Closes a channel that was opened for reading
external externalReadClose ! : ReadChannel -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileReadClose" kind="let">

```mc
let fileReadClose c : ReadChannel -> ()
```



<ToggleWrapper text="Code..">
```mc
let fileReadClose = lam c. externalReadClose c

-- Standard in read channel
external externalStdin ! : ReadChannel
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileStdin" kind="let">

```mc
let fileStdin  : ReadChannel
```



<ToggleWrapper text="Code..">
```mc
let fileStdin = externalStdin

-- Standard out write channel
external externalStdout ! : WriteChannel
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileStdout" kind="let">

```mc
let fileStdout  : WriteChannel
```



<ToggleWrapper text="Code..">
```mc
let fileStdout = externalStdout

-- Standard error write channel
external externalStderr ! : WriteChannel
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="fileStderr" kind="let">

```mc
let fileStderr  : WriteChannel
```



<ToggleWrapper text="Code..">
```mc
let fileStderr = externalStderr
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr

let filename = "___testfile___.txt" in

-- Test to open a file and write some lines of text
utest
  match fileWriteOpen filename with Some wc then
    let write = fileWriteString wc in
    write "Hello\n";
    write "Next string\n";
    write "Final";
    fileWriteFlush wc; -- Not needed here, just testing the API
    fileWriteClose wc;
    ""
  else "Error writing to file."
with "" in

-- Check that the created file exists
utest fileExists filename with true in

-- Test to open and read the file created above (line by line)
utest
  match fileReadOpen filename with Some rc then
    let l1 = match fileReadLine rc with Some s then s else "" in
    let l2 = match fileReadLine rc with Some s then s else "" in
    let l3 = match fileReadLine rc with Some s then s else "" in
    let l4 = match fileReadLine rc with Some s then s else "EOF" in
    fileReadClose rc;
    (l1,l2,l3,l4)
  else ("Error reading file","","","")
with ("Hello", "Next string", "Final", "EOF") in

-- Test reading x amount of characters from the file
utest
  match fileReadOpen filename with Some rc then
    let l1 = match fileReadBytes rc 3   with Some s then map int2char s else "" in
    let l2 = match fileReadBytes rc 4   with Some s then map int2char s else "" in
    let l3 = match fileReadBytes rc 0   with Some s then map int2char s else "" in
    let l4 = match fileReadBytes rc 1   with Some s then map int2char s else "" in
    let l5 = match fileReadBytes rc 100 with Some s then map int2char s else "" in
    let l6 = match fileReadBytes rc 100 with Some s then Some s else None () in
    fileReadClose rc;
    (l1,l2,l3,l4,l5,l6)
  else ("Error reading file","","","","", None ())
with ("Hel", "lo\nN", "", "e", "xt string\nFinal", None ()) in

-- Check that the file size is correct
utest fileSize filename with 23 in

-- Reads the content of the file using function fileReadString()
utest
  match fileReadOpen filename with Some rc then
    let s = fileReadString rc in
    (s, length s)
  else ("",0)
with ("Hello\nNext string\nFinal", 23) in

-- Delete the newly created file and check that it does not exist anymore
utest
  fileDeleteFile filename;
  fileExists filename
with false in

-- Delete the file, even if it does not exist, and make sure that we do not get an error
utest fileDeleteFile filename with () in

-- Check that we get file size 0 if the file does not exist
utest fileSize filename with 0 in

-- Test to open a file (for reading) that should not exist
utest
  match fileReadOpen "__should_not_exist__.txt" with Some _ then true else false
with false in

-- Test to open a file (for writing) with an illegal file name
utest
  match fileWriteOpen "////" with Some _ then true else false
with false in

-- Tests that stdin, stdout, and stderr are available.
-- Uncomment the lines below to test the echo function in interactive mode.
utest
  let skip = (fileStdin, fileStdout, fileStderr) in
  --match fileReadLine stdin with Some s in
  --fileWriteString stdout s;
  --fileWriteString stderr s;
  ()
with () in

()
```
</ToggleWrapper>
</DocBlock>

