module.exports = {
    module: {
      rules: [
        {
          test   : /\.less$/,
          loader: 'less-loader',
          options: {
            modifyVars: { // modify theme variable 
            },
            javascriptEnabled: true
          }
        }
      ]
    }
  };