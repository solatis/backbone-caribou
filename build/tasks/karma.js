module.exports = function() {

    var sourceFiles = [
        // All of our source files, which we won't include automatically (since were using require.js)
        //{pattern: "vendor/bower/chai/chai.js"},
        {pattern: "vendor/bower/requirejs/require.js"},
        {pattern: "src/**/*.js", included: false},
        
        // Our test framework entry point
        'test/test-main.js',
        // Our test cases
        {pattern: "test/caribou/**/*.spec.js", included: false},
        
        {pattern: "vendor/bower/jquery/jquery.js", included: false},
        {pattern: "vendor/bower/underscore/underscore.js", included: false},
        {pattern: "vendor/bower/backbone/backbone.js", included: false},
        {pattern: "vendor/bower/layoutmanager/backbone.layoutmanager.js", included: false}];
    
    this.config('karma', {
        options: {
            captureTimeout: 7000,
            basePath: process.cwd(),
            singleRun: true,
            logLevel: "ERROR",

            frameworks: [
                'mocha-debug',
                'mocha',  
                'chai-jquery', 
                'chai-things', 
                'chai-js-factories',
                'sinon-chai', 
                'chai'],
            
            plugins: [           
                'karma-mocha-debug',
                'karma-mocha',
                'karma-chai-jquery', 
                'karma-chai-things', 
                'karma-sinon-chai', 
                'karma-chai', 
                'karma-chai-js-factories',
                'karma-coverage',
                'karma-phantomjs-launcher'],

            coverageReporter: {
                reporters: [{
                    type: "text",
                    dir: 'coverage/text/'
                }, {
                    type: 'lcovonly',
                    dir: 'coverage/lcov/'
                }, {
                    type: 'html',
                    dir: 'coverage/html/'
                }]
            },

            preprocessors: {
                "src/**/*.js": ['coverage'],
                'lib/backbone-caribou.min.js': ['coverage']
            },

            files: sourceFiles,

            exclude: [
                'src/main.js'
            ],

            reporters: ['progress', 'coverage'],
            browsers: ['PhantomJS']
        },

        // Target that is meant to run as an auto-refreshing test server during development.
        server: {
            options: {
                autoWatch: true,
                singleRun: false
            }
        },

        // Singlerun target that tests our debug/development source code
        debug: {},

        // Singlerun target that tests our production/minified source code
        release: {
            options: {
                files: sourceFiles.concat([
                    {pattern: 'lib/backbone-caribou.min.js', included: false}])
            }
        }
    });

    this.config('coveralls', {
        options: {
            coverage_dir: 'coverage/lcov/'
        }
    });

    this.loadNpmTasks('grunt-karma');
    this.loadNpmTasks('grunt-karma-coveralls');
};

