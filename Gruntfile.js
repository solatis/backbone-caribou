module.exports = function() {

    this.loadTasks("build/tasks");
    this.registerTask("default", ["clean", "jscs"]);
};
