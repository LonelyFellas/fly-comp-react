import * as path from 'path';
import * as webpack from 'webpack';
import * as CopyPlugin from 'copy-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';
const config: webpack.Configuration = {
  mode: isProd ? 'production' : 'development',
  entry: {
    index: path.resolve(__dirname, 'src', 'index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    library: 'darwish-ui',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-transform-runtime', { regenerator: true }],
              [
                'import',
                {
                  libraryName: 'darwish',
                  libraryDirectory: 'es',
                  style: 'css',
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/index.d.ts', to: './index.d.ts' },
        { from: 'src/maskSwipe/maskSwipe.d.ts', to: './maskSwipe.d.ts' },
        { from: 'src/index.css', to: './index.css' },
      ],
    }),
  ],
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'StyledComponents',
      root: 'StyledComponents',
    },
  },
};

export default config;
