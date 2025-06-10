import "../css/styles.css";
import { Project } from "./project-class.js";
import { displayController } from "./display-controller.js";

const myProjects = [];

const project1 = new Project("Test",
                            "We are testing our functionality for creating projects.",
                            "2025-08-20",
                            "high"
                        );

myProjects.push(project1);

displayController.render(myProjects);

const newProjectBtn = document.querySelector(".new-project-btn");
const modal = document.querySelector(".modal");
newProjectBtn.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    modal.showModal();
});
const closeModalBtn = document.querySelector(".modal-close-btn");
closeModalBtn.addEventListener("click", () => {
    modal.close();
})