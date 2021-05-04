module.exports = {
  i18n: { locales: ['en-GB', 'es-ES'], defaultLocale: 'es-ES' },
  webpack: (config) => {
    config.module.noParse = /\.wasm$/;
    config.module.rules.push({
      test: /\.wasm$/,
      // Tells WebPack that this module should be included as
      // base64-encoded binary file and not as code
      loader: 'base64-loader',
      // Disables WebPack's opinion where WebAssembly should be,
      // makes it think that it's not WebAssembly
      //
      // Error: WebAssembly module is included in initial chunk.
      type: 'javascript/auto',
    });

    config.node = {
      ...config.node,
      fs: 'empty',
    };

    return config;
  },
};
