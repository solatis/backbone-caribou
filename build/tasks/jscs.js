module.exports = function() {

    this.config('jscs', {
        options: {
            config: '.jscs.json'
        },
        src: 'src/**/*.js'});

    this.loadNpmTasks('grunt-jscs-checker');
};

