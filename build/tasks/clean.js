module.exports = function() {

    this.config('clean', ['test/coverage', 'lib/']);
    this.loadNpmTasks('grunt-contrib-clean');
};
