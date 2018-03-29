const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');
// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.svg?$/,
    exclude: /node_modules/,
    use: SvgSpriteHtmlWebpackPlugin.getLoader()
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
