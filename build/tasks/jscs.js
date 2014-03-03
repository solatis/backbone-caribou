module.exports = function() {

    this.config('jscs', {
        options: {
            config: '.jscs.json'
        },
        src: 'src/backbone-caribou.js'});

    this.loadNpmTasks('grunt-jscs-checker');
};

