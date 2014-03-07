module.exports = function() {

    this.config('uglify', 
                {
                    release: {
                        options: {
                            sourceMap: true 
                        },
                        
                        files: {
                            'build/backbone-caribou.min.js': ['build/backbone-caribou.js']
                        }
                    }
                });

    this.loadNpmTasks('grunt-contrib-uglify');
};
