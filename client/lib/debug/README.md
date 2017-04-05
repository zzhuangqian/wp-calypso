Debug
==========

Debug is a module intended to wrap npm [`debug` module](http://npmjs.com/package/debug) module with a check for if the current calypso env is production. We don't want to output debug messages in production.  Our Webpack configuration subsitutes all of the regular debug imports with this package using the [`webpack.NormalModuleReplacementPlugin` plugin](https://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin).
