import { pubSub } from "./pubsub.js";

class Task {

    constructor(description, parentProject, isDone = false) {
        this.id = crypto.randomUUID();
        this.parentProject = parentProject;
        this.description = description;
        this.isDone = isDone;
    }

    toggleStatus() {
        if (this.isDone) {
            this.isDone = false;
        } else {
            this.isDone = true;
        }
        pubSub.publish("tasksChanged", this.parentProject);
    }

    changeDescription(newDescription) {
        this.description = newDescription;
        pubSub.publish("tasksChanged", this.parentProject);
    }

    toJSON() {
        // Skip parentProject to avoid circular reference while turning into JSON
        const { parentProject, ...rest } = this;
        return rest;
    }
}

export class Project {

    constructor(title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;

        this.checklist = [];
    }

    addTask(taskDescription) {
        const newTask = new Task(taskDescription, this);
        this.checklist.push(newTask);
        pubSub.publish("tasksChanged", this);
    }

    removeTask(taskDescription) {
        for (let i = 0; i < this.checklist.length; i++) {
            if (this.checklist[i].description.toLowerCase() === taskDescription.toLowerCase()) {
                this.checklist.splice(i, 1);
                break;
            }
        }
        pubSub.publish("tasksChanged", this);
    }
}