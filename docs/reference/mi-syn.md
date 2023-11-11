---
sidebar_position: 3
---

---
sidebar_label: 'mi syn: AST and Parser Generator'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Parser and AST Generator

The `syn` subcommand of `mi` is used to generate a parser and language fragments for a language defined in a `.syn` file.

```bash title="Usage"
mi syn input.syn output.mc
```

## Example

This `.syn` file describes a small language with integers, addition, subtraction, and multiplication.

<Tabs>
<TabItem value="syn" label="example.syn" default>

```syn
language Example

type File
start File

type Expr {
  grouping = "(" ")",
}

-- Basic tokens
token Integer {
  repr = UIntRepr {},
  constructor = UIntTok,
  fragment = UIntTokenParser,
}

-- Tokens used only through literals
token {fragment = OperatorTokenParser,}

-- Whitespace and comments
token {fragment = LineCommentParser,}
token {fragment = MultilineCommentParser,}
token {fragment = WhitespaceParser,}

-- Productions
prod SingleExpr: File = e:Expr

prod Int: Expr = v:Integer
infix left Add: Expr = "+"
infix left Sub: Expr = "-"
infix left Mul: Expr = "*"

precedence {
  Mul;
  Add Sub;
}
```

</TabItem>
<TabItem value="mc" label="example.mc (excerpt)">

```mcore
lang ExampleBaseAst
  syn File =
  syn Expr =
  -- ... elided ...
  sem smapAccumL_Expr_Expr : all a. (a -> Expr -> (a, Expr)) -> a -> Expr -> (a, Expr)
  sem smap_Expr_Expr : (Expr -> Expr) -> Expr -> Expr
  sem sfold_Expr_Expr : all a. (a -> Expr -> a) -> a -> Expr -> a
  -- ... elided ...
  sem get_File_info : File -> Info
  sem set_File_info : Info -> File -> File
end

-- ... elided ...

lang AddExprAst = ExampleBaseAst
  type AddExprRecord = {info : Info, left : Expr, right : Expr}
  syn Expr =
  | AddExpr AddExprRecord
  sem smapAccumL_Expr_Expr f acc = /- ... -/
end

-- ... elided ...

lang ExampleAst = IntExprAst + AddExprAst + SubExprAst + MulExprAst
end

-- ... elided ...

let parseExample : String -> String -> Either [(Info, String)] File
let parseExampleExn : String -> String -> File
```

</TabItem>
</Tabs>

## The Contents of a `.syn` File

A language defined by a `.syn` file has a name, a number of syntactic types, tokens, and productions, as well as precedence rules. Each of the relevant declarations are described below.

:::info

The syntax of a `.syn` file is itself defined in [a `.syn` file](https://github.com/miking-lang/miking/blob/develop/stdlib/parser/selfhost.syn).

:::

### `language`

```syn title="Example Usage"
language Example
```

The first declaration in a `.syn` file must be the `language` declaration, which names the language. This name is later used to name language fragments ([`<name>BaseAst`](#base-ast-language-fragment) and [`<name>Ast`](#composed-ast-language-fragment) primarily) as well as the parse functions ([`parse<name>` and `parse<name>Exn`](#parsing-functions)).

### `type`

```syn title="Example Usage"
type File
type Expr {
  grouping = "(" ")",
}
```

The `type` declaration introduces a type in the AST as well as a syntactic type in the concrete grammar. The optional `grouping` property enables explitic grouping in the syntax, e.g., grouping parentheses, which are not present in the final AST.

:::info

A syntactic type is mostly equivalent with a *non-terminal* in a context-free grammar, and can typically be thought of as such. It also defines a type in the generated AST language fragments.

:::

### `start`

```syn title="Example Usage"
start File
```

The `start` declaration designates the syntactic type at which parsing starts, as well as the return-type of the generated parsing functions.

### `include`

```syn title="Example Usage"
include "path/to/lexer-additions.mc"
```

A language can use certain definitions from MCore code (typically in [lexing related declaration](#token)), which must then be included in the grammar with an `include` declaration, which functions exactly the same as the MCore equivalent declaration.

### `token`

```syn title="Example Usage"
token LIdent {
  repr = LIdentRepr {},
  constructor = LIdentTok,
  fragment = LIdentTokenParser,
  ty = String,
}
token {fragment = OperatorTokenParser,}
token {fragment = LineCommentParser,}
token LName {
  base = LIdent,
  wrap = nameNoSym,
  ty = Name,
}
```

A `token` declaration extends the generated lexer with tokens and how to lex them. Each token is declared in its own language fragment in an `.mc` file, which can be included via an [`include` declaration](#include).

For examples of lexing language fragments, see [parser/lexer.mc](https://github.com/miking-lang/miking/blob/develop/stdlib/parser/lexer.mc) in the Miking standard library. All language fragments in `parser/lexer.mc` are available in a `.syn` without an explicit `include`, though they still require `token` declarations to be usable in the grammar.

Each token declaration can have a number of properties:

- An optional name, given between `token` and the `{` before the other properties.
- `fragment`: the name of a language fragment to include in the lexer.
- `repr`: an expression of type `TokenRepr`, representing the token in a grammar.
- `constructor`: the name of the constructor of the token when it is parsed.
- `ty`: the type of the value carried by the token, e.g., `String` or `Int`. Only valid if a name is set.
- `base`: the name of another token to wrap with some processing, often to change the type.
- `wrap`: only valid with `base`. An expression representing a function to call on the value carried by the `base` token.

A `token` that does not have a name cannot be *explicitly* used in the grammar, but can serve one of two purposes:
- Adding lexical syntax for whitespace and/or comments.
- Adding lexical syntax that is only used for literals (e.g., `"("` and `")"` from `BracketTokenParser`).

:::caution

Each literal (e.g., `"("`, `")"`, or `"let"`) must presently be lexed as exactly one token by one of the included lexing language fragments. For example, if the lexer would lex `foo.bar` as an `LIdent`, `Dot`, and a `LIdent`, then the literal `"foo.bar"` is not valid; it doesn't lex as exactly one token.

This restriction is very likely to be lifted in the future.

:::

### `prod`, `prefix`, `infix`, and `postfix`

```syn title="Example Usage"
prod Record: Expr =
  "{" fields:{name:LIdent "=" val:Expr ","}* "}"
```

A `prod` declaration introduces a production in the syntax and a constructor in the AST. Each `prod` has a name, a syntactic type, and a syntax description.

:::tip

The AST constructor is typically named using both the production name and syntactic type, e.g., `RecordExpr`. However, if the name already ends with the syntactic type it's kept as is, e.g., `prod RecordExpr: Expr` has the constructor `RecordExpr`, not `RecordExprExpr`.

:::

#### Syntax Descriptions

The right-hand side of a `prod` is a mixed description of its syntax and the data carried in its constructor. The language is mostly based on regular expressions:

- `X Y` means `X` followed by `Y`.
- `X | Y` means `X` or `Y`.
- `X*` means zero or more `X`s in sequence. `X+` means one or more, and `X?` means zero or one.
- `empty` is an empty sequence. For example, `X empty` is the same as just `X`, and `X | empty` is the same as `X?`.
- Parentheses can be used for grouping, e.g., `X (Y Z)*`.

The data carried in the constructor is captured by naming parts of the syntax description. The carried data is always a record, and each named part adds a field to it. Four kinds of things can be named:

- A token (e.g., `name:LIdent`) carries the location it was parsed from (type `Info`) as well as some data (e.g., `LIdent` carries a `String`). The field contains both of these (e.g., `name : {v:String, i:Info}`).
- A literal (e.g., `foo:"foo"`) carries only the location, no additional data (e.g., the field becomes `foo : Info` rather than `foo : {v:(), i:Info}`.
- A syntactic type (defined with [`type`](#type)) carries a value of its corresponding AST type, e.g., `val:Expr` adds a field `val : Expr`.
- Multiple fields can be grouped into a nested record by surrounding the corresponding syntax description with `{}`. For example, `foo:{a:LIdent "in" b:Expr}` adds a field `foo : {a : {v:String, i:Info}, b : Expr}`.

Finally, a field can occur multiple times, which might further change the type of the field:

- If it must appear exactly once the type is unchanged (e.g., `name:LIdent` produces `name : {v:String, i:Info}`).
- If it can appear once or not at all it's wrapped in `Option` (e.g., `name:Ident?` produces `name : Option {v:String, i:Info}`).
- Otherwise it's wrapped in a sequence (e.g., `name:Ident+` produces `name : [{v:String, i:Info}]`).

:::tip

A name can occur multiple times via `*` or `+`, but also by being named multiple times:

```syn
prod Foo: Bar = "(" x:Bar "," x:Bar ")"
```

This produces a field `x : [Bar]`.

:::

#### Operators and Associativity

`prefix`, `infix`, and `postfix` can be used to declare operators. These are syntactic sugar for `prod` declarations:

```syn
prefix Negate: Expr = "-"
-- is exactly the same as
prod Negate: Expr = "-" right:Expr

infix Plus: Expr = "+"
-- is exactly the same as
prod Plus: Expr = left:Expr "-" right:Expr

postfix Factorial: Expr = "!"
-- is exactly the same as
prod Factorial: Expr = left:Expr "!"
```

:::tip

The operator syntactic sugar will use the names `left` and `right`, but this is not essential for a production being an operator. For example, `prod Plus: Expr = a:Expr "+" b:Expr` is also an infix operator, what matters is that it begins and ends with self-recursion (in this case `Expr`).

:::

Prefix operators are right-associative, postfix operators are left-associative, and infix operators default to no associativity. To declare associativity for an infix operator, add `left` or `right` before the name:

```syn
prod left Plus: Expr = left:Expr "+" right:Expr
infix right Exponentiation: Expr = "^"
```

### `precedence`

```syn title="Example Usage"
precedence {
  Negate;
  Mul Div;
  Add Sub Mod;
  Equal NotEqual;
  ~And Or;
} except {
  Mod ? Add Sub Mul Div;
}
```

A `precedence` declaration defines relative precedence between some set of operators in the form of a precedence table. Each precedence level ends with a semi-colon, and levels earlier/higher in the list have higher precedence.

If a precedence level is preceeded by `~` that means that the operators on that level have precedence relative to all other levels, but not relative to the other operators on that level.

A `precedence` declaration can optionally end with an `except` list, to remove pairs of relative precedence that would otherwise be defined by the `precedence` declaration. Each entry in an `except` list has the form `A B ... ? C D ...;`, and removes all possible pairs between operators before and after `?` (e.g., `A` and `C`, `A` and `D`, `B` and `C`, etc.).

:::info

`~` in a precedence list is syntactic sugar for an entry in an `except` list, e.g.,

```syn
precedence {
  Equal NotEqual;
  ~And Or;
}
```

is the same as

```syn
precedence {
  Equal NotEqual;
  And Or;
} except {
  And Or ? And Or;
}
```

:::


## The API of a Generated `.mc` File

A generated `.mc` file is used like any other `.mc` file (i.e., `include`d) and provides the API below.

### Base AST Language Fragment

The first language fragment is named based on the language name (see [`language`](#language)) and has the form `<lang-name>BaseAst`. It defines a `syn` type (but no constructors) for each syntactic type (see [`type`](#type)), along with type signatures and default implementations for a number of convenience functions.

- Tree traversal functions, in the form of shallow mappings for all pairs of syntactic types (referred to below as `T1` and `T2`).
  - `sem smap_T1_T2 : (T2 -> T2) -> T1 -> T1`
  - `sem sfold_T1_T2 : all a. (a -> T2 -> a) -> a -> T1 -> a`
  - `sem smapAccumL_T1_T2 : all a. (a -> T2 -> (a, T2)) -> a -> T1 -> (a, T1)`
- Accessor functions for the `info : Info` field of each syntactic type (referred to below as `T`).
  - `get_T_info : T -> Info`
  - `set_T_info : Info -> T -> Info`
  - `map_T_info : (Info -> Info) -> T -> T`
  - `mapAccum_T_info : all a. (a -> Info -> (a, Info)) -> a -> T -> (a, T)`

### `prod` Language Fragments

Each `prod` declaration gives rise to a language fragment defining its constructor and appropriate implementations for the convenience functions defined in the base AST fragment. For example, given a `prod Foo: Bar = ...` definition:

```mcore
lang FooBarAst = -- ...
  type FooBarRecord = { info : Info, /- ... -/ }
  syn Bar =
  | FooBar FooBarRecord

  -- ... elided ...
end
```

See [Syntax Descriptions](#syntax-descriptions) to see how the type of the record in `<prod-name>Record` is computed.

### Composed AST Language Fragment

The generated file contains a language fragment that composes all of the `prod` language fragments, with a name of the form `<lang-name>Ast`.

### Parsing Functions

There are one primary parsing function generated, along with one simple wrapper. Given the declarations [`lang Example`](#language) and [`start Foo`](#start):

```mcore
-- Takes a filename and the contents of that file, then parse
-- it. In case of error, return `Left [...errors...]`, otherwise
-- `Right result`
parseExample : String -> String -> Either [(Info, String)] Foo

-- Same arguments as `parseExample`. In case of error, print them,
-- then exit the program with code 1, otherwise return the result.
parseExampleExn : String -> String -> Foo
```
