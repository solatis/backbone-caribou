module.exports = function() {

    this.config('clean', ['coverage/', 'lib/']);
    this.loadNpmTasks('grunt-contrib-clean');
};
