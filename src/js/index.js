import "../css/styles.css";
import { displayController } from "./display-controller.js";
import { projectForm } from "./project-form.js";
import { projectManager } from "./project-manager.js";
import { pubSub } from "./pubsub.js";
import { Storage } from "./storage.js";

// When a project is added or removed, automatically render them again
pubSub.subscribe("projectsChanged", displayController.render);
pubSub.subscribe("tasksChanged", displayController.renderProject);

// Initiate event listeners for the form
projectForm();

displayController.render(projectManager.getProjects());

// When the user wants to leave the page, save projects in local storage
window.addEventListener("beforeunload", () => {
    Storage.updateLocalStorage(projectManager.getProjects());
});