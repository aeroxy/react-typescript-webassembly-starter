const {
  disableEsLint,
  useBabelRc,
  override
} = require('customize-cra');

const path = require('path');

const threadLoaderConfig = {
  loader: 'thread-loader',
  options: {
    workerParallelJobs: 50,
    workerNodeArgs: ['--max-old-space-size=1024'],
    poolRespawn: false,
    poolTimeout: 2000,
    poolParallelJobs: 50,
    name: 'my-pool'
  }
};

module.exports = override(
  config => {
    const wasmExtensionRegExp = /\.wasm$/;

    config.module.rules.forEach(o => {
      if (o.enforce === 'pre') {
        o.use.unshift(threadLoaderConfig)
      }
      (o.oneOf || []).forEach(oneOf => {
        if (oneOf.loader && oneOf.loader.includes('file-loader')) {
          // make file-loader ignore WASM files
          oneOf.exclude.push(wasmExtensionRegExp);
        }
      });
    });

    config.resolve.extensions.push('.wasm');

    config.module.rules.push({
      test: wasmExtensionRegExp,
      include: path.resolve(__dirname, 'src'),
      use: [{ loader: require.resolve('wasm-loader'), options: {} }]
    });
    
    return config;
  },
  useBabelRc(),
  disableEsLint()
);