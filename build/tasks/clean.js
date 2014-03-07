module.exports = function() {

    this.config('clean', ['coverage/']);
    this.loadNpmTasks('grunt-contrib-clean');
};
