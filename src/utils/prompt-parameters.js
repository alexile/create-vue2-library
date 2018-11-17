const inquirer = require('inquirer')
const checkPackageName = require('./check-package-name')

module.exports = () => (
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'unique',
      message: 'unique npm package name',
      default: false
    },
    {
      type: 'input',
      name: 'name',
      message: 'package name',
      validate: checkPackageName
    },
    {
      type: 'input',
      name: 'description',
      message: 'package description',
      default: ''
    },
    {
      type: 'confirm',
      name: 'git',
      message: 'init git & .gitignore',
      default: true
    },
    {
      type: 'input',
      name: 'repo',
      message: 'package repository address',
      default: ''
    },
    {
      type: 'input',
      name: 'author',
      message: 'author name',
      default: ''
    },
    // {
    //   type: 'list',
    //   name: 'templates',
    //   message: 'styles engine',
    //   choices: ['css', 'stylus'],
    //   default: 'css'
    // },
    {
      type: 'input',
      name: 'version',
      message: 'version',
      default: '0.1.0'
    },
    // {
    //   type: 'list',
    //   name: 'template',
    //   message: 'select built-in templates',
    //   choices: ['default', 'typescript'],
    //   default: 'default'
    // },
    {
      type: 'input',
      name: 'license',
      message: 'license',
      default: 'MIT'
    },
    {
      type: 'confirm',
      name: 'yarn',
      message: 'use yarn instead of npm',
      default: false
    },
    {
      type: 'confirm',
      name: 'example',
      message: 'create folder with example',
      default: true
    }
  ])
)
