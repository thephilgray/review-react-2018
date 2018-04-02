const path = require('path');
const includePath = path.resolve(__dirname, '../src/');

const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');
// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.svg?$/,
    include: path.resolve(includePath, 'icons'),
    use: SvgSpriteHtmlWebpackPlugin.getLoader()
  });

  storybookBaseConfig.module.rules.push({
    test: [/\.svg$/],
    include: path.resolve(includePath, 'graphics'),
    loader: require.resolve('url-loader'),
    options: {
      limit: 10000,
      name: 'static/media/[name].[hash:8].[ext]'
    }
  });

  storybookBaseConfig.module.rules.push({
    test: /\.css$/,
    include: includePath,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  });

  storybookBaseConfig.plugins.push(
    new SvgSpriteHtmlWebpackPlugin({
      generateSymbolId: function(svgFilePath, svgHash, svgContent) {
        return svgHash.toString();
      }
    })
  );

  // Return the altered config
  return storybookBaseConfig;
};
