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
            
            const projectsConstructors = [];
            for (const project of projects) {
                // Only save constructors for existing projects
                const { id, checklist, ...constructors } = project;
                for (const task of project) {
                    const { id, parentProject, ...taskConstructors } = task;
                    if (constructors.checklist) {
                        constructors.checklist.push(taskConstructors);
                    } else {
                        constructors.checklist = [taskConstructors];
                    }
                }

                projectsConstructors.push(constructors);
            }

            window.localStorage.setItem("projects", projectsConstructors);
        }
    }

    function getStoredProjects() {
        if (storageAvailable("localStorage") && window.localStorage.length > 0) {
             projectManager.loadProjects(JSON.parse(window.localStorage.getItem("projects")));
        }
    }

    return { storageAvailable, updateLocalStorage, getStoredProjects };
})();

export { Storage };