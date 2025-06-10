import { pubSub } from "./pubsub.js";

const projectManager = (function() {
    const myProjects = [];

    const addProject = function (project) {
        myProjects.push(project);
        pubSub.publish("projectsChanged", myProjects);
    };

    const removeProject = function (project) {
        indexToRemove = myProjects.indexOf(project);
        if (indexToRemove !== -1) {
            myProjects.splice(indexToRemove, 1);
            pubSub.publish("projectsChanged", myProjects);
        }
    };

    const getProjects = function() {
        return myProjects;
    };

    return { addProject, removeProject, getProjects };
})();

export { projectManager };