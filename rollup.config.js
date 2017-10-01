import babel from 'rollup-plugin-babel'
import alias from 'rollup-plugin-alias'
import pkg from './package.json'

export default {
  input: './node_modules/rebass/src/index.js',
  external: [
    'react',
    'styled-system',
    'prop-types',
    'react-emotion',
    'tag-hoc',
    'emotion-theming',
    'palx',
    'grid-emotion'
  ],
  plugins: [
    alias({
      'styled-components': require.resolve('./styled-alias'),
      'grid-styled': 'grid-emotion'
    }),
    babel({
      presets: [
        [
          'env',
          {
            loose: true,
            modules: false
          }
        ],
        'stage-0',
        'react'
      ],
      plugins: ['external-helpers', 'emotion'],
      babelrc: false,
      externalHelpersWhitelist: ['extends']
    })
  ],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ]
}
