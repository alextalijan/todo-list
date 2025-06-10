import { Project } from "./project-class.js";
import { projectManager } from "./project-manager.js";

export const projectForm = function () {
    const newProjectBtn = document.querySelector(".new-project-btn");
    const closeModalBtn = document.querySelector(".modal-close-btn");
    const createProjectBtn = document.querySelector(".create-project-btn");
    const modal = document.querySelector(".modal");
    const modalForm = document.querySelector(".modal > form");

    newProjectBtn.addEventListener("click", () => {
        modal.showModal();
    });
    closeModalBtn.addEventListener("click", () => {
        modal.close();
        modalForm.reset();
    });

    const newProjectTitle = document.querySelector("#project-title");
    const newProjectDescription = document.querySelector("#project-description");
    const newProjectDueDate = document.querySelector("#project-due-date");
    createProjectBtn.addEventListener("click", (event) => {
        event.preventDefault();
        // Project priority has to be querried from inside, since it's always empty when the form is loaded
        const newProjectPriority = document.querySelector(".modal input[type='radio'][name='priority']:checked");

        // Check if all the inputs have been given, then create a new project
        if (!newProjectTitle.value) {
            newProjectTitle.placeholder = "Please input title.";
        } else if (!newProjectDescription.value) {
            newProjectDescription.placeholder = "Having a description helps in better defining the project.";
        } else if (!newProjectDueDate.value) {
            alert("Can you even call something without a due date... a project?");
        } else if (!newProjectPriority) {
            alert("Please think of how urgent this project is.")
        } else {
            const newProject = new Project(
                newProjectTitle.value,
                newProjectDescription.value,
                newProjectDueDate.value,
                newProjectPriority.value
            );
            projectManager.addProject(newProject);

            // Clear the form for future use
            modalForm.reset();
            modal.close();
        }
    });
}