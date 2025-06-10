import "../css/styles.css";
import { Project } from "./project-class.js";
import { displayController } from "./display-controller.js";

const myProjects = [];
displayController.render(myProjects);

const newProjectBtn = document.querySelector(".new-project-btn");
newProjectBtn.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    modal.showModal();
});
const closeModalBtn = document.querySelector(".modal-close-btn");
closeModalBtn.addEventListener("click", () => {
    modal.close();
})