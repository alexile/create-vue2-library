const execa = require('execa')
const path = require('path')

const initPackage = async (paths, {manager, example}) => {
  const commands = [
    {
      cmd: `${manager} install`,
      cwd: paths.lib
    },
    {
      cmd: `${manager} link`,
      cwd: paths.lib
    }
  ]

  if (example) {
    commands.push({
      cmd: `${manager} install`,
      cwd: paths.example
    })
  }
  for (let command of commands) {
    console.log('\x1b[32m', `Execution ${command.cmd} in ${command.cwd}`, '\x1b[0m')
    await execa.shell(command.cmd, {cwd: command.cwd})
  }
}

const initGit = async (cwd, {git, name, version}) => {
  const commands = [
    {
      cmd: 'git init',
      cwd
    },
    {
      cmd: 'git add .',
      cwd
    },
    {
      cmd: `git commit -m "#master init package ${name} version ${version}"`,
      cwd
    }
  ]
  for (let command of commands) {
    console.log('\x1b[32m', `Execution ${command.cmd} in ${command.cwd}`, '\x1b[0m')
    await execa.shell(command.cmd, {cwd: command.cwd})
  }
}

module.exports = async (route, parameters) => {
  const paths = {
    lib: route,
    example: path.join(route, 'example')
  }
  console.log('\x1b[32m', 'Install packages', '\x1b[0m')
  await initPackage(paths, parameters)
  console.log('\x1b[32m', 'Packages are installed', '\x1b[0m')
  if (parameters.git) {
    console.log('\x1b[32m', 'Initialize git', '\x1b[0m')
    await initGit(route, parameters)
    console.log('\x1b[32m', 'Git ready', '\x1b[0m')
  }
}
