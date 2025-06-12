import { projectManager } from "./project-manager.js";

const displayController = (function () {
    const projectsDiv = document.querySelector("#projects");
    const projectModal = document.querySelector(".project-modal");
    const projectModalContent = document.querySelector(".modal-content");

    const render = function (projects) {
        projectsDiv.innerHTML = "";

        for (const project of projects) {
            const projectDiv = document.createElement("div");
            projectDiv.setAttribute("data-project-id", project.id);
            projectDiv.className = "project-card";
            // Depending on priority of project, add relevant color to the card
            projectDiv.classList.add(`${project.priority}-priority`);

            // Make the project card clickable to open up the tasks for the project
            projectDiv.addEventListener("click", (event) => {
                for (const project of projects) {
                    if (project.id === event.currentTarget.dataset.projectId) {
                        renderProject(project);
                        break;
                    }
                }
            });

            const projectRemoveBtn = document.createElement("span");
            projectRemoveBtn.textContent = 'x';
            projectRemoveBtn.classList.add("remove-project-btn");
            projectRemoveBtn.addEventListener("click", (event) => {
                projectManager.removeProject(event.target.parentNode.dataset.projectId);
            });

            const heading = document.createElement("h2");
            heading.textContent = project.title;
            heading.classList.add("project-title");

            const description = document.createElement("p");
            description.textContent = project.description;
            description.classList.add("project-description");

            const dueDate = document.createElement("p");
            dueDate.textContent = `Due Date: ${project.dueDate}`;
            dueDate.classList.add("project-due-date");

            projectDiv.appendChild(projectRemoveBtn);
            projectDiv.appendChild(heading);
            projectDiv.appendChild(description);
            projectDiv.appendChild(dueDate);
            projectsDiv.appendChild(projectDiv);
        }
    };

    const renderProject = function (project) {
        projectModalContent.innerHTML = "";
        const projectModalHeading = document.createElement("h2");
        projectModalHeading.textContent = project.title;
        projectModalHeading.classList.add("project-modal-heading");

        // When either heading, description or date are double clicked, they are prompted for change
        projectModalHeading.addEventListener("dblclick", () => {
            // New input field has to be in a div with the confirm button to be in the same line
            const newHeadingDiv = document.createElement("div");
            newHeadingDiv.classList.add("project-modal-heading-change");

            const newHeadingInput = document.createElement("input");
            newHeadingInput.value = projectModalHeading.textContent;
            newHeadingDiv.appendChild(newHeadingInput);

            // Add button to confirm the change and change the title
            const confirmChangeBtn = document.createElement("button");
            confirmChangeBtn.textContent = "✔️";
            confirmChangeBtn.classList.add("confirm-change-btn");
            confirmChangeBtn.addEventListener("click", () => {
                projectManager.changeProjectAttribute(project.id, "title",newHeadingInput.value);
            });
            newHeadingDiv.appendChild(confirmChangeBtn);

            // Put it instead of current heading
            projectModalHeading.parentNode.replaceChild(newHeadingDiv, projectModalHeading);
        });

        const projectModalDescription = document.createElement("p");
        projectModalDescription.textContent = project.description;
        projectModalDescription.classList.add("project-modal-description");

        projectModalDescription.addEventListener("dblclick", () => {
            const newDescriptionDiv = document.createElement("div");
            newDescriptionDiv.classList.add("project-modal-description-change");

            const newDescriptionInput = document.createElement("textarea");
            newDescriptionInput.textContent = projectModalDescription.textContent;
            newDescriptionDiv.appendChild(newDescriptionInput);

            const confirmChangeBtn = document.createElement("button");
            confirmChangeBtn.textContent = "✔️";
            confirmChangeBtn.classList.add("confirm-change-btn");
            confirmChangeBtn.addEventListener("click", () => {
                projectManager.changeProjectAttribute(project.id, "description", newDescriptionInput.value);
            });
            newDescriptionDiv.appendChild(confirmChangeBtn);

            // Put it instead of current heading
            projectModalDescription.parentNode.replaceChild(newDescriptionDiv, projectModalDescription);
        });


        const projectModalDueDate = document.createElement("p");
        projectModalDueDate.textContent = `Due date: ${project.dueDate}`;
        projectModalDueDate.classList.add("project-modal-duedate");

        projectModalDueDate.addEventListener("dblclick", () => {
            const newDueDateDiv = document.createElement("div");
            newDueDateDiv.classList.add("project-modal-duedate-change");

            const newDueDateInput = document.createElement("input");
            newDueDateInput.type = "date";
            newDueDateDiv.appendChild(newDueDateInput);

            const confirmChangeBtn = document.createElement("button");
            confirmChangeBtn.textContent = "✔️";
            confirmChangeBtn.classList.add("confirm-change-btn");
            confirmChangeBtn.addEventListener("click", () => {
                projectManager.changeProjectAttribute(project.id, "dueDate", newDueDateInput.value);
            });
            newDueDateDiv.appendChild(confirmChangeBtn);

            projectModalDueDate.parentNode.replaceChild(newDueDateDiv, projectModalDueDate);
        });


        const projectCloseBtn = document.createElement("span");
        projectCloseBtn.textContent = 'x';
        projectCloseBtn.classList.add("project-modal-close-btn");
        projectCloseBtn.addEventListener("click", () => {
            projectModal.close();
        });

        // Display tasks inside the project
        const taskList = document.createElement("ul");
        taskList.classList.add("task-list");
        for (const task of project.checklist) {
            const taskDescription = document.createElement("span");
            taskDescription.textContent = task.description;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            if (task.isDone) {
                checkbox.checked = true;
                taskDescription.classList.add("checked-task");
            }
            // If the check is clicked, update internal status of the task
            checkbox.addEventListener("click", () => {
                task.toggleStatus();
            });

            const taskListing = document.createElement("li");
            taskListing.appendChild(checkbox);
            taskListing.appendChild(taskDescription);
            taskList.appendChild(taskListing);
        }

        const addTaskButton = document.createElement("button");
        addTaskButton.type = "button";
        addTaskButton.classList.add("add-task-button");
        addTaskButton.textContent = "Add Task";
        addTaskButton.addEventListener("click", () => {
            // Disable the button temporarily while adding the new task
            addTaskButton.disabled = true;

            const newTaskInput = document.createElement("input");
            newTaskInput.type = "text";

            const confirmTaskBtn = document.createElement("button");
            confirmTaskBtn.type = "button";
            confirmTaskBtn.textContent = "✔️";
            confirmTaskBtn.classList.add("confirm-task-btn");
            confirmTaskBtn.addEventListener("click", () => {
                // Stop the task from being added if it's blank
                if (newTaskInput.value) {
                    project.addTask(newTaskInput.value.trim());
                }
            });

            const deleteTaskBtn = document.createElement("button");
            deleteTaskBtn.type = "button";
            deleteTaskBtn.textContent = "❌";
            deleteTaskBtn.classList.add("delete-task-btn");
            deleteTaskBtn.addEventListener("click", () => {
                li.remove();
                // Allow new tasks to be added
                addTaskButton.disabled = false;
            });

            const li = document.createElement("li");
            li.appendChild(confirmTaskBtn);
            li.appendChild(deleteTaskBtn);
            li.appendChild(newTaskInput);
            taskList.appendChild(li);
        });

        projectModalContent.appendChild(projectModalHeading);
        projectModalContent.appendChild(projectModalDescription);
        projectModalContent.appendChild(projectModalDueDate);
        projectModalContent.appendChild(projectCloseBtn);
        projectModalContent.appendChild(taskList);
        projectModalContent.appendChild(addTaskButton);

        projectModal.showModal(); 
    };

    return { render, renderProject };
})();

export { displayController };