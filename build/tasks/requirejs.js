module.exports = function() {

    this.config('requirejs', {
        release: {
            options: {
                mainConfigFile: "src/config.js",
                generateSourceMaps: true,
                include: ["main"],
                out: "dist/backbone-caribou.min.js",
                optimize: "uglify2",

                // Since we bootstrap with nested `require` calls this option allows
                // R.js to find them.
                findNestedDependencies: true,

                // Include a minimal AMD implementation shim.
                name: "almond",

                // Setting the base url to the distribution directory allows the
                // Uglify minification process to correctly map paths for Source
                // Maps.
                baseUrl: "dist/app",

                // Wrap everything in an IIFE.
                wrap: true,

                // Do not preserve any license comments when working with source
                // maps.  These options are incompatible.
                preserveLicenseComments: false
            },
        }
    });
};
