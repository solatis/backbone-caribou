module.exports = function() {

    this.config('compress', 
                {
                    release: {
                        options: {
                            mode: 'tgz',
                            pretty: true,
                            archive: 'build/backbone-caribou.tar.gz'
                        },
                        
                        src: [
                            'build/backbone-caribou.js', 
                            'build/backbone-caribou.min.js',
                            'build/backbone-caribou.min.map']
                    }
                });

    this.loadNpmTasks('grunt-contrib-compress');
};
