# Miking Website

The `master` branch contains the source code for the official Miking website, located at [https://miking.org](https://miking.org). The website is deployed through the `gh-pages` branch. Hence, we should only commit changes to the `master` branch.

The website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

Install [Node.js](https://nodejs.org/en/) on your computer.

### Local Development

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Use
```
$ npm run deploy
```
to deploy to the `gh-pages` branch.
