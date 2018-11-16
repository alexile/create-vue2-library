const checkPackageName = require('validate-npm-package-name')
const request = require('request')
const {npmPath} = require('../config/common')

const getNpmStatus = (packageName) => {
  return new Promise((resolve) => {
    request(`${npmPath}${packageName}`, (error, response) => (
      resolve(error || (response && response.statusCode !== 404))
    ))
  })
}

module.exports = async (packageName, data = {}) => {
  const isValid = checkPackageName(packageName).validForNewPackages

  if (!isValid) {
    console.error(`\nPackage name "${packageName}" incorrect`)
  }
  if (!(data.unique && packageName)) {
    return isValid
  }
  const isExist = await getNpmStatus(packageName)

  if (packageName && isExist) {
    console.error(`\nPackage with name "${packageName}" already exists`)
  }

  return !isExist && isValid
}
