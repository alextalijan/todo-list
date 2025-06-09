export const displayController = function () {
    const render = function (projects) {
        const projectsDiv = document.querySelector("#projects");

        for (const project of projects) {
            const projectDiv = document.createElement("div");
            projectDiv.className = "project-card";

            const heading = document.createElement("h2");
            heading.textContent = project.title;
            heading.classList.add("project-title");

            const description = document.createElement("p");
            description.textContent = project.description;
            description.classList.add("project-description");

            const dueDate = document.createElement("p");
            dueDate.textContent = `Due Date: ${project.dueDate}`;
            dueDate.classList.add("project-due-date");

            projectDiv.appendChild(heading);
            projectDiv.appendChild(description);
            projectDiv.appendChild(dueDate);
            projectsDiv.appendChild(projectDiv);
        }
    };

    return { render };
};