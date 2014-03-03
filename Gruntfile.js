module.exports = function() {
    this.loadTasks("build/tasks");
    this.registerTask("default", ["clean", "jscs", "jshint", "karma:run"]);
};
