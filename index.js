#!/usr/bin/env node

const nodeCompatibilityRequire = require('node-compat-require')

nodeCompatibilityRequire('./src', {node: '>= 8'})
