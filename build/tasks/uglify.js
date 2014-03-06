module.exports = function() {

    this.config('uglify', 
                {
                    release: {
                        options: {
                            sourceMap: true 
                        },
                        
                        files: {
                            'lib/backbone-caribou.min.js': ['lib/backbone-caribou.js']
                        }
                    }
                });

    this.loadNpmTasks('grunt-contrib-uglify');
};
