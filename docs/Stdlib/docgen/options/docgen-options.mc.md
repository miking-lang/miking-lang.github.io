import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# docgen-options.mc  
  

\# Command\-Line DocGenOptions Parser  
  
This module provides parsing of command\-line arguments  
for the \`my\-doc\-gen\` documentation generator.  
  
\#\# Usage  
  
\`\`\`  
my\-doc\-gen \[options\] \<file\>  
  
Required:  
  \<file\>                                 Path to the Miking source file to document.  
  
General DocGenOptions:  
  \-\-no\-open                              Do not open the result in a web browser.  
  \-\-output\-folder \<name\>                 Set the output folder \(default: doc\-gen\-output\).  
  \-\-format \<html|md|mdx\>                 Choose output format \(default: html\).  
  \-\-url\-prefix \<prefix\>                  Prefix for all generated URLs.  
  \-\-depth \<n|none\>                       Limit nesting depth of \`let\` bindings.  
  \-\-no\-stdlib                            Do not include the standard library in the output.  
  \-\-md\-doc                               Generate Markdown documentation from inline comments.  
  \-\-keep\-tests\-doc                       Keep inline documentation of tests.  
  
Language Formatting:  
  \-\-javascript                           Use JavaScript for the React components.  
  \-\-typescript                           Use TypeScript for the React components.  
  
Debugging Options:  
  \-\-debug                                Enable all debug modes.  
  \-\-no\-warn                              Disable all warnings.  
  
Help:  
  \-\-help | \-\-h                           Show this help message.  
\`\`\`

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/global/format.mc"} style={S.link}>../global/format.mc</a>, <a href={"/docs/Stdlib/docgen/global/format-language.mc"} style={S.link}>../global/format-language.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/sys.mc"} style={S.link}>sys.mc</a>  
  
## Types  
  

          <DocBlock title="DocGenOptions" kind="type">

```mc
type DocGenOptions : { noOpen: Bool, fmt: Format, fmtLang: FormatLanguage, file: String, debug: Bool, noWarn: Bool, outputFolder: String, noStdlib: Bool, urlPrefix: String, letDepth: Option Int }
```

<Description>{`\#\# DocGenOptions  
Data type representing the command\-line options that can be passed to \`my\-doc\-gen\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
type DocGenOptions = use Formats in use FormatLanguages in {
    noOpen: Bool,            -- Whether to skip opening the result in a web browser.
    fmt: Format,             -- Output format (HTML, Markdown, MDX).
    fmtLang: FormatLanguage, -- Output language for generated React components (JS/TS).
    file: String,            -- Path to the input file.
    debug: Bool,             -- Enable debug mode.
    noWarn: Bool,            -- Suppress warnings.
    outputFolder: String,    -- Destination folder for generated output.
    noStdlib: Bool,          -- Whether to exclude the standard library.
    urlPrefix: String,       -- Prefix for generated URLs.
    letDepth: Option Int     -- Maximum nesting depth of let-bindings.
}
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="docGenOptionsDefault" kind="let">

```mc
let docGenOptionsDefault  : DocGenOptions
```

<Description>{`\#\# optionsDefault  
Default values for the command\-line options.`}</Description>


<ToggleWrapper text="Code..">
```mc
let docGenOptionsDefault : DocGenOptions = use Formats in use FormatLanguages in {
    noOpen = false,
    fmt = defaultFormat (),
    fmtLang = defaultFormatLanguage (),
    file = "",
    debug = false,
    outputFolder = "doc-gen-output",
    noWarn = false,
    noStdlib = false,
    urlPrefix = "",
    letDepth = None {}
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="usage" kind="let">

```mc
let usage _ : all a. all a1. a -> a1
```

<Description>{`\#\# usage  
Print usage instructions and terminate with an error.`}</Description>


<ToggleWrapper text="Code..">
```mc
let usage = lam.
  error (join [
    "Usage:\n",
    "  my-doc-gen [options] <file>\n\n",

    "Required:\n",
    "  <file>                                 Path to the Miking source file to document.\n\n",

    "General DocGenOptions:\n",
    "  --no-open                              Do not open the result in a web browser.\n",
    "  --output-folder <name>                 Set the output folder (default: doc-gen-output).\n",
    "  --format <html|md|mdx>                 Choose output format (default: html).\n",
    "  --url-prefix <prefix>                  Prefix for all generated URLs.\n",
    "  --depth <n|none>                       Limit nesting depth of \\`let\\` bindings.\n",
    "  --no-stdlib                            Do not include the standard library in output.\n",

    "Language Formatting:\n",
    "  --javascript                           Use JavaScript for the React components\n",
    "  --typescript                           Use TypeScript for the React components.\n\n",

    "Debugging Options:\n",
    "  --debug                                Enable all debug modes.\n",
    "  --no-warn                              Disable all warnings.\n",
 
    "Help:\n",
    "  --help | --h                           Show this help message.\n"
  ])
```
</ToggleWrapper>
</DocBlock>

