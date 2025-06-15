import { pubSub } from "./pubsub.js";
import { Storage } from "./storage.js";

const projectManager = (function() {

    let myProjects;
    if (Storage.storageAvailable("localStorage") && window.localStorage.getItem("projects")) {
        myProjects = Storage.getStoredProjects();
    } else {
        myProjects = [];
    }

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

    const changeProjectAttribute = function (projectId, attribute, newValue) {
        // If the attribute is valid, go on to change it
        const attributes = ["title", "description", "dueDate", "priority"];
        if (!attributes.includes(attribute)) {
            throw new Error("This attribute doesn't exist!");
        }

        for (const project of myProjects) {
            if (project.id === projectId) {
                project[attribute] = newValue;
                pubSub.publish("projectsChanged", myProjects);
                // Everything except for change of priority should trigger re-render of the project
                if (attribute !== "priority") {
                    pubSub.publish("tasksChanged", project);
                }
                break;
            }
        }
    }

    return { addProject, removeProject, getProjects, changeProjectAttribute };
})();

export { projectManager };