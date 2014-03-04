module.exports = function() {

    this.config('requirejs', {
        bundle: {
            options: {
                baseUrl: 'src/',

                paths: {
                    'underscore':    '../vendor/bower/underscore/underscore',
                    'jquery':        '../vendor/bower/jquery/jquery',
                    'backbone':      '../vendor/bower/backbone/backbone',
                    'layoutmanager': '../vendor/bower/layoutmanager/backbone.layoutmanager'
                },

                include: ['caribou'],
                exclude: ['jquery', 'underscore', 'backbone', 'layoutmanager'],
                out: 'lib/backbone-caribou.min.js',

                optimize: 'uglify2'
            }
        }
    });

    this.loadNpmTasks('grunt-requirejs');
};
