import { pubSub } from "./pubsub.js";

const projectManager = (function() {
    const myProjects = [];

    const addProject = function (project) {
        myProjects.push(project);
        pubSub.publish("projectsChanged", myProjects);
    };

    const removeProject = function (projectIdToRemove) {
        for (let i = 0; i < myProjects.length; i++) {
            if (myProjects[i].id === projectIdToRemove) {
                myProjects.splice(i, 1);
                pubSub.publish("projectsChanged", myProjects);
                break;
            }
        }
    };

    const getProjects = function() {
        return myProjects;
    };

    return { addProject, removeProject, getProjects };
})();

export { projectManager };