import { Project } from "./project-class.js";

const Storage = (function () {

    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    function storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
            );
        }
    }

    function updateLocalStorage(projects) {
        if (storageAvailable("localStorage")) {
            window.localStorage.clear();
            
            const projectConstructors = [];
            for (const project of projects) {
                // Only save constructors for existing projects
                const { id, checklist, ...constructor } = project;
                constructor.taskConstructors = [];

                for (const task of project.checklist) {
                    const { id, parentProject, ...taskConstructor } = task;
                    constructor.taskConstructors.push(taskConstructor);
                }

                projectConstructors.push(constructor);
            }

            window.localStorage.setItem("projects", JSON.stringify(projectConstructors));
        }
    }

    function getStoredProjects() {
        const projectConstructors = JSON.parse(window.localStorage.getItem("projects"));
        const storedProjects = [];

        for (const constructor of projectConstructors) {
            const project = new Project(
                constructor.title,
                constructor.description,
                constructor.dueDate,
                constructor.priority
            );

            // Generate all tasks of the project
            for (const taskConstructor of constructor.taskConstructors) {
                project.addTask(taskConstructor.description, taskConstructor.isDone);
            }

            storedProjects.push(project);
        }

        return storedProjects;
    }

    return { storageAvailable, updateLocalStorage, getStoredProjects };
})();

export { Storage };