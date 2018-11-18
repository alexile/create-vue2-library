/**
 * Libraries
 */
const promptParameters = require('./utils/prompt-parameters')
const manageTemplate = require('./utils/manage-template')
const executeCommands = require('./utils/execute-commands')

const createLibrary = async () => {
  try {
    console.log('\x1b[32m', 'Choose library options', '\x1b[0m')
    const parameters = await promptParameters()
    parameters.manager = parameters.yarn ? 'yarn' : 'npm'
    console.log('\x1b[32m', 'Create library', '\x1b[0m')
    const destination = await manageTemplate(parameters)

    await executeCommands(destination, parameters)
  } catch (error) {
    console.error(error)
  }
}

createLibrary()
  .then(() => {
    console.log('\x1b[32m', 'Installation complete', '\x1b[0m')
  })
