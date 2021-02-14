
# Miking website

The `develop` branch contains the source code for the official Miking website, located at [https://miking.org](https://miking.org). The website is deployed to the `master` branch using a script. Hence, we should only commit changes to the `develop` branch.

The website is developed using the static website
[Gatsby](https://www.gatsbyjs.com/) website builder, in combination
with [Typescript](https://www.typescriptlang.org/) and [React](https://reactjs.org/).

## Installation

1. Install [Node.js](https://nodejs.org/en/) on your computer. 
2. Install the [yarn](https://yarnpkg.com/) package manager `npm install -g yarn` (or install it using your package manager, e.g. `brew install yarn` on MacOS).

## Development
From the root folder of the repo, run `yarn develop` to launch the website locally.

## Deployment
Run `yarn deploy` to deploy the website to the `master` branch.
