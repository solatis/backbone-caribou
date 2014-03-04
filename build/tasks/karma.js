module.exports = function() {

    this.config('karma', {
        options: {

            basePath: process.cwd(),
            singleRun: true,

            frameworks: [
                'mocha', 
                'chai-jquery', 
                'chai-things', 
                'sinon-chai', 
                'chai'],
            plugins: [
                'karma-mocha', 
                'karma-chai-jquery', 
                'karma-chai-things', 
                'karma-sinon-chai', 
                'karma-chai', 
                'karma-coverage'],


            autoWatch: true,

            coverageReporter: {
                type: "lcov",
                dir: "test/coverage/"
            },


            files: [
                // All of our source files, which we won't include automatically (since were using require.js)
                //{pattern: "vendor/bower/chai/chai.js"},
                {pattern: "vendor/bower/requirejs/require.js"},

                // Our test framework entry point
                'test/test-main.js',

                {pattern: "vendor/bower/jquery/jquery.js", included: false},
                {pattern: "vendor/bower/underscore/underscore.js", included: false},
                {pattern: "vendor/bower/backbone/backbone.js", included: false},
                {pattern: "vendor/bower/layoutmanager/backbone.layoutmanager.js", included: false},
                {pattern: "src/**/*.js", included: false},
                {pattern: "lib/backbone-caribou.min.js", included: false},
                {pattern: "test/caribou/**/*.spec.js", included: false}],

            exclude: [
                'src/main.js'
            ],

            reporters: ['progress', 'coverage']
        },

        server: {
            options: {
                singleRun: false,
                preprocessors: {
                    "src/**/*.js": "coverage"                
                }
            }
        },

        debug: {
            options: {
                preprocessors: {
                    "src/**/*.js": "coverage"                
                }
            }
        },

        release: {
            options: {
                preprocessors: {
                    "lib/*.js":    "coverage"
                }
            }
        }
    });

    this.config('coveralls', {
        options: {
            coverage_dir: 'test/coverage/'
        }
    });

    this.loadNpmTasks('grunt-karma');
    this.loadNpmTasks('grunt-karma-coveralls');
};

