import "../css/styles.css";
import { displayController } from "./display-controller.js";
import { projectForm } from "./project-form.js";
import { projectManager } from "./project-manager.js";

projectForm();
displayController.render(projectManager.getProjects());