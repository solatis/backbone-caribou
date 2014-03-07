(function(window) {

  var karma = window.__karma__;

  // Put Karma into an asynchronous waiting mode until we have loaded our
  // tests.
  karma.loaded = function() {};

  if (window.QUnit) {
    // Disable auto start.  We'll call start once the async modules have
    // loaded.
    window.QUnit.config.autostart = false;
  } else if (window.chai) {
    // Optionally use chai with Mocha.
    window.expect = window.chai.expect;
  }

  // Set the application endpoint and load the configuration.
  require.config({
    paths: {
      'underscore':    '../vendor/bower/underscore/underscore',
      'jquery':        '../vendor/bower/jquery/jquery',
      'backbone':      '../vendor/bower/backbone/backbone',
      'layoutmanager': '../vendor/bower/layoutmanager/backbone.layoutmanager'
    },

    baseUrl: '/base/src'
  });
    
  require([
    'underscore'
  ],

  function(_) {
    var isRelease = '/base/build/backbone-caribou.min.js' in window.__karma__.files;

    // If this is a release build, we use the minified version as a subject to test (so
    // we are testing the 'original' source files during development, but are testing the
    // minified version before release).
    if (isRelease) {
        require.config({
            paths: {
                'caribou': '../build/backbone-caribou.min'
            }});
    }

    var specs = _.chain(karma.files)
      // Convert the files object to an array of file paths.
      .map(function(id, file) { return file; })
      // Tests that end with `.spec.js' and existing either `app` or `test`
      // directories are automatically loaded.
      .filter(function(file) {
        return /^\/base\/(app|test)\/.*\.spec\.js$/.test(file);
      })
      .value();

    // Load all specs and start Karma.
    require(specs, karma.start);
  });

})(this);
