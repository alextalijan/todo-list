class Task {

    constructor(description) {
        this.id = crypto.randomUUID();
        this.description = description;
        this.isDone = false;
    }

    toggleStatus() {
        if (this.isDone) {
            this.isDone = false;
        } else {
            this.isDone = true;
        }
    }

    changeDescription(newDescription) {
        this.description = newDescription;
    }
}

export class Project {

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;

        this.checklist = [];
    }

    addTask(taskDescription) {
        const newTask = new Task(taskDescription);
        this.checklist.push(newTask);
    }

    removeTask(taskID) {
        for (let i = 0; i < this.checklist.length; i++) {
            if (this.checklist[i].id === taskID) {
                this.checklist.splice(i, 1);
                break;
            }
        }
    }

    changeTitle(newTitle) {
        this.title = newTitle;
    }

    changeDescription(newDescription) {
        this.description = newDescription;
    }

    changePriority(newPriority) {
        this.priority = newPriority;
    }

    changeDueDate(newDate) {
        this.dueDate = newDate;
    }
}