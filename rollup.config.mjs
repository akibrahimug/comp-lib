import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const external = ['react', 'react-dom', 'tailwind-merge'];

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.js', format: 'esm', sourcemap: true },
      { file: 'dist/index.cjs', format: 'cjs', sourcemap: true }
    ],
    external,
    plugins: [
      resolve({ extensions: ['.js', '.ts', '.tsx'] }),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'), preventAssignment: true }),
      typescript({ tsconfig: './tsconfig.json', declaration: false })
    ]
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external,
    plugins: [dts()]
  }
];
