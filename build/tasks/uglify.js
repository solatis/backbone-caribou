module.exports = function() {

    this.config('uglify', {
        compress: {
            src: 'lib/backbone-caribou.js',
            dest: 'lib/backbone-caribou.min.js',
            options: {
                sourceMap: true,
                sourceMapName: 'lib/backbone-caribou.min.js.map'
            }
        }
    });

    this.loadNpmTasks('grunt-contrib-uglify');
};
