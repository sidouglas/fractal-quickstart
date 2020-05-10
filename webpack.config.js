// eslint disable import/dynamic-require
//@see https://github.com/TheLarkInn/webpack-workshop-2018
// this is the base webpack configuration - prod and dev extend this common file.
const autoPrefixerPlugin = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const presetConfig = require('./webpack/loadPresets')
const SvgStorePlugin = require('webpack-svg-icon-system/lib/SvgStorePlugin')
const webpackMerge = require('webpack-merge')

// eslint disable import/dynamic-require
const modeConfig = (env) => require(`./webpack/webpack.${env}`)(env)

module.exports = ({ mode, presets } = {
  mode: 'production',
  presets: [],
}) => {
  return webpackMerge(
    {
      mode,
      entry: {
        app: './src/app.js',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      modules: false,
                      useBuiltIns: false,
                      targets: '> 0.25%, not dead',
                    },
                  ],
                ],
                plugins: [
                  '@babel/plugin-transform-runtime',
                  '@babel/plugin-proposal-export-default-from',
                ],
              },
            },
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: true,
                  sourceMap: true,
                },
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [autoPrefixerPlugin],
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          {
            test: /\.(png|jpe?g|svg|gif|woff|woff2)$/,
            loader: 'file-loader?name=public/[hash].[ext]',
            exclude: [
              /node_modules/,
              /assets\/icons/,
            ],
          },
          {
            test: /icons([\/\\]).*\.svg$/,
            loader: 'webpack-svg-icon-system',
            options: {
              name: 'icons-sprite.svg',
              prefix: 'svg',
            },
          },
        ],
      },
      output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/',
        library: 'APP',
      },
      plugins: [
        new CopyWebpackPlugin([
          {
            from: path.join(__dirname, './src/public/some-example-that-will-generate-a-warning'),
            to: path.join(__dirname, 'dist/some-example-to-be-copied-into-dist-directory'),
          },
        ]),
        new MiniCssExtractPlugin(
          {
            filename: '[name].css',
            chunkFilename: '[id].css',
          },
        ),
        new SvgStorePlugin(),
      ],
      resolve: {
        extensions: ['.ts', '.js', '.json', '.scss'],
        alias: {
          '@': path.resolve(__dirname, 'src'),
          '@components': path.resolve(__dirname, 'src/components/'),
        },
      },
    },
    modeConfig(mode),
    presetConfig({
      mode,
      presets,
    }),
  )
}
