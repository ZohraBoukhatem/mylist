"use strict";
const input = document.querySelector("#new-task");
//or const input = document.getElementById("new-task") as HTMLInputElement | null
const list = document.querySelector("#list");
const form = document.querySelector("#form");
const tasks = loadTasks();
tasks.forEach(addItem);
let id = 0;
//? -> optional change ->if there are no elements with the ID at all! then the var is null! 
//? -> if this HTML el exists, give me the value, if not, return undefined
form === null || form === void 0 ? void 0 : form.addEventListener("submit", e => {
    e.preventDefault();
    id++;
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    const newTask = {
        id: id,
        title: input.value,
        completed: false,
        createdAt: new Date()
    };
    input.value;
    tasks.push(newTask);
    addItem(newTask);
    input.value = "";
});
function addItem(task) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
        task.completed = !task.completed;
        saveTasks();
    });
    saveTasks();
    label.append(checkbox, task.title);
    item.append(label);
    list === null || list === void 0 ? void 0 : list.append(item);
}
function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
    const tasksJSON = localStorage.getItem("TASKS");
    if (tasksJSON === null)
        return [];
    return JSON.parse(tasksJSON);
}
