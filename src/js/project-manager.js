import { pubSub } from "./pubsub.js";
import { Project } from "./project-class.js";

const projectManager = (function() {
    const defaultProject = new Project(
        "Default Project",
        "This is where you're able to put simple todos separated from specific projects.",
        new Date().toISOString().split('T')[0], // Today's date
        "high"
    );
    const myProjects = [];
    myProjects.push(defaultProject);

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
                pubSub.publish("tasksChanged", project);
                break;
            }
        }
    }

    return { addProject, removeProject, getProjects, changeProjectAttribute };
})();

export { projectManager };