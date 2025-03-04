import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Examining large ASTs as JSON

Sometimes the ASTs you wish to examine are too large for the various
`--debug-*` flags that pretty-print code to be viable, or you want the
ability to programmatically explore it outside the compiler.

<Tabs>
<TabItem value="debug-phases" label="In the compiler" default>

In the compiler itself this can be achieved with the `--debug-phase
<phase-name>` flag, which will print a JSON representation of the AST
after the given phase. To see which phases are available, run with
`--debug-phases`, which will print a list of phases in order, as well
as the amount of time taken for each.

</TabItem>

<TabItem value="json-debug" label="Using json-debug.mc">

When working on another language, or debugging inside some
transformation not already covered by `--debug-phase`, you can use the
underlying library directly. The relevant code can be located in
`mexpr/json-debug.mc`, which is a small library inside the standard
library. Usage centers around a few functions like `exprToJson`,
`typeToJson`, etc., To use these functions you need include
`mexpr/json-debug.mc` and `use` the `MExprToJson` language fragment:

```mc
-- Add this include to the file
include "mexpr/json-debug.mc"

-- Later:
let ast = /- Some code producing an AST to examine -/ in
printLn (printJsonLn (use MExprToJson in exprToJson ast));
-- ... more code that keeps processing the AST ...
```

:::note

If you are working with an extended language, e.g., in `miking-dppl`,
then you will need to create a new language fragment that implements
the corresponding `sem`s (`exprToJson` for constructors in `Expr`,
etc.). See `stdlib/mexpr/json-debug.mc` for examples.

:::

</TabItem>
</Tabs>

When run, this code will typically print a *very* large json object,
thus it's typically useful to redirect the output to a file for later
processing:

```bash
# Assuming the above code has been added somewhere in the main `mi` compiler:
mi compile test.mc > debug.json
```

Some useful tools to explore this data are [jless](https://jless.io/)
and [jq](https://jqlang.github.io/jq/).

:::tip

When looking at data from a program that prints both json-encoded data
and arbitrary strings (e.g., an edited `mi` compiler) it might be
useful to pre-process the output first:

```bash
# Filter out non-json lines
jq -R 'try fromjson' < debug.json | jless

# Reformat all non-json lines as strings with `-> ` added at the start
jq -R '. as $line | try fromjson catch ("-> " + $line)' < debug.json | jless
```

:::
