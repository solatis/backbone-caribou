module.exports = function() {

    this.config('clean', ['test/report']);
    this.loadNpmTasks('grunt-contrib-clean');
};
