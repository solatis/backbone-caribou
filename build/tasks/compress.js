module.exports = function() {

    this.config('compress', 
                {
                    release: {
                        options: {
                            mode: 'tgz',
                            pretty: true,
                            archive: 'lib/backbone-caribou.tar.gz'
                        },
                        
                        src: [
                            'lib/backbone-caribou.js', 
                            'lib/backbone-caribou.min.js',
                            'lib/backbone-caribou.min.map']
                    }
                });

    this.loadNpmTasks('grunt-contrib-compress');
};
