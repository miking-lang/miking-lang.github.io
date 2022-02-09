// Simple script to pull remote Markdown files.

const path = require('path');
const os = require('os');
const fs = require('fs');
const childProcess = require('child_process')

const mikingUrl = 'https://github.com/miking-lang/miking.git'
const mikingDpplUrl = 'https://github.com/miking-lang/miking-dppl.git'
const remoteDocs = [
  {url: mikingUrl, remotePath: "README.md", localPath: "miking"},
  {url: mikingDpplUrl, remotePath: "README.md", localPath: "miking-dppl"}
]

let cache = new Map()

for (let rd of remoteDocs) {
  let dir = cache.get(rd.url)
  if (dir === undefined) {
    dir = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`)
    childProcess.execSync(`git clone --depth 1 ${rd.url} ${dir}`)
    cache.set(rd.url, dir)
  }
  const header = fs.readFileSync(
    path.join(
      'docs',
      path.dirname(rd.localPath),
      `_${path.basename(rd.localPath)}-remote.md`
    )
  )
  const body = fs.readFileSync(path.join(dir,rd.remotePath))
  fs.writeFileSync(
    path.join('docs', `${rd.localPath}-remote.md`),
    header + body
  )
}

for (const value of cache.values()) fs.rmdirSync(value, {recursive: true})
