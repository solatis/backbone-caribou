module.exports = function() {

    this.config('compress', 
                {
                    release: {
                        options: {
                            mode: 'tgz',
                            pretty: true,
                            archive: 'lib/backbone-caribou.tar.gz'
                        },
                        
                        src: ['lib/backbone-caribou.min.js']                        
                    }
                });

    this.loadNpmTasks('grunt-contrib-compress');
};
