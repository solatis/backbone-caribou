module.exports = function() {
    this.loadTasks("build/tasks");

    this.registerTask("default", ["clean", "jscs", "jshint", "karma:debug"]);
    this.registerTask("server",  ["clean", "karma:server"])
    this.registerTask("release", ["clean", "requirejs", "uglify", "karma:release", "compress"])
};
