const projectManager = (function() {
    const myProjects = [];

    const addProject = function (project) {
        myProjects.push(project);
    };

    const removeProject = function (project) {
        indexToRemove = myProjects.indexOf(project);
        if (indexToRemove !== -1) {
            myProjects.splice(indexToRemove, 1);
        }
    };

    const getProjects = function() {
        return myProjects;
    };

    return { addProject, removeProject, getProjects };
})();

export { projectManager };