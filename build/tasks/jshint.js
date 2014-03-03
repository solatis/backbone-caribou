module.exports = function () {

    this.config("jshint",
                {
                    files: ['src/**/*.js'],
                    options: this.file.readJSON('.jshintrc'),

                    test: {
                        files: {
                            src: ['test/test-main.js',
                                  'test/caribou/**/*.js']
                        }
                    }
                });

    this.loadNpmTasks('grunt-contrib-jshint');
}
