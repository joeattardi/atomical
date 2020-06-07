import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { string } from 'rollup-plugin-string';
import svg from 'rollup-plugin-svg';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/atomical.js',
        format: 'es'
      },
      {
        file: 'dist/atomical.min.js',
        format: 'es',
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins: [
      postcss({
        extensions: ['.css'],
        modules: true
      }),
      svg(),
      resolve(),
      commonjs(),
      string({
        include: 'src/templates/*.mustache'
      })
    ]
  },
  {
    input: 'examples/src/index.js',
    output: {
      file: 'examples/dist/index.js',
      format: 'es'
    }
  }
];
