const alias = require('rollup-plugin-alias')
const commonjs = require('rollup-plugin-commonjs')
const replace =  require('rollup-plugin-replace')

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [commonjs(),
    replace({'process.env.NODE_ENV': JSON.stringify('development')}),
    alias({resolve: ['.js'], vue: __dirname + '/node_modules/vue/dist/vue'})
  ]
}
