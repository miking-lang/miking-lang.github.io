---
sidebar_position: 1
---

# Getting started

Miking (Meta vIKING) is a meta language system for creating embedded domain-specific and general-purpose languages. Miking is not a programming language, but rather a language system for
creating languages and generating efficient compilers.

## Installation

If you have not already done so, please [install](installation) the Miking compiler.

## MCore

MCore (Miking Core) is the core language of the Miking system. It is
based on a typed Lambda Calculus. MCore consists of two parts:

* **MExpr** is an MCore expression. A Miking language is always translated into an MExpr, before it is further evaluated or compiled into machine code.

* **MLang** which is a language for defining and composing language fragments. MLang is formally translated into an MExpr.

Please proceed to get a basic understanding of MExpr.