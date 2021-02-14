import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from "react"

const foo = (x: number) => {
  return x + 1
}

const Home = () => {
  return <div className="container"><h1>Miking</h1>The official Miking website will appear in year {foo(2000)} and 
  an official beta release of Miking is planned to March 2021.
  <p>For a quick peek into the current development, you can take a look at the 
    <a href="https://github.com/miking-lang/miking/tree/develop"> development branch on Github</a>. 
    </p></div>
}

export default Home