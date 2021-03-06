var path = require('path');
var appPath = path.join(__dirname, 'src');

module.exports = {

  // set the context (optional)
  context: appPath,
  entry: 'app.js',

  // enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: appPath
  },

  module: {
    loaders: [

      // load and compile javascript
      {test: /\.jsx?$/, exclude: /node_modules/, loader: "babel"},

      // load css and process scss
      {test: /\.css/, loader: "style!css"},

      // load JSON files and HTML
      {test: /\.json$/, loader: "json"},
      {test: /\.html$/, exclude: /node_modules/, loader: "raw"},

      // load fonts(inline base64 URLs for <=8k)
      {test: /\.(ttf|eot|svg|otf)$/, loader: "file"},
      {
        test: /\.woff(2)?$/,
        loader: "url?limit=8192&minetype=application/font-woff"
      },

      // load images (inline base64 URLs for <=8k images)
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },

  // webpack dev server configuration
  devServer: {
    noInfo: false,
    hot: true,
    contentBase: appPath
  },

  // support source maps
  devtool: "#inline-source-map"
};