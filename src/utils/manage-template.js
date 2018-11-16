const handlebars = require('handlebars')
const makeDirectory = require('make-dir')
const path = require('path')
const fs = require('fs')
const globby = require('globby')

const checkFileAvailability = (path, {git, example}) => {
  if (!git && path.match('.gitignore')) {
    return false
  }
  if (!example && path.match('example')) {
    return false
  }
  return true
}

const generateStatic = async ({files, paths, parameters}) => {
  for (let sourceFile of files) {
    if (checkFileAvailability(sourceFile, parameters)) {
      const filePath = path.join(paths.dest, path.relative(paths.src, sourceFile))
      const dirPath = path.parse(filePath).dir
      const template = handlebars.compile(fs.readFileSync(sourceFile, 'utf8'))
      const payload = template({...parameters})

      await makeDirectory(dirPath)
      fs.writeFileSync(filePath, payload, 'utf8')
    }
  }
}

module.exports = async (parameters) => {
  const processDirectory = process.cwd()
  const paths = {
    src: path.join(__dirname, '..', 'templates', parameters.template || 'default'),
    dest: path.join(processDirectory, parameters.name)
  }
  const files = await globby(paths.src, {dot: true})

  console.log('\x1b[32m', 'Make directory', '\x1b[0m')
  await makeDirectory(paths.dest)
  console.log('\x1b[32m', 'Generate initial templates', '\x1b[0m')
  await generateStatic({files, paths, parameters})

  return paths.dest
}
