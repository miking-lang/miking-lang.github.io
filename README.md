# Miking Website

The `master` branch contains the source code for the official Miking website, located at [https://miking.org](https://miking.org). The website is deployed through the `gh-pages` branch. Hence, we should only commit changes to the `master` branch.

The website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

Install [Node.js](https://nodejs.org/en/) on your computer.

### Pull remote source files

Run the command
```
$ npm run pull
```
to populate the `docs/` folder with remote Markdown content.

To add remote content, follow the procedure below.
1. Add a placeholder file `_<id>-remote.md` somewhere under the `docs/` folder.
   This file is ignored by Docusaurus as it starts with `_`.
2. Add an element
   ```
   {url: <url>, remotePath: <rpath>, localPath: <lpath>},
   ```
   to the `remoteDocs` array of `pull.js`, where `<url>` is the GitHub repo,
   `<rpath>` is the path of the source file in `<url>`, and `<lpath>` is the
   local path under the `docs/` folder. Use only `<id>` for the local path file
   name, and not `_<id>-remote.md`. 
3. Now, when you run `npm run pull`, the remote file is combined with the local
   placeholder `_<id>-remote.md` to produce a file `<id>-remote.md`. This
   produced file is ignored by git.

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
