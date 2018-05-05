module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '/assets/[name].[ext]'
        }
      },
    ]
  }
};