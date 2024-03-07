const input = document.querySelector<HTMLInputElement>("#new-task")
//or const input = document.getElementById("new-task") as HTMLInputElement | null
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#form") 
const tasks: Task[] = loadTasks()
tasks.forEach(addItem)

let id = 0

type Task = {
    id: number,
    title: string,
    completed: boolean,
    createdAt: Date
}


//? -> optional change ->if there are no elements with the ID at all! then the var is null! 
//? -> if this HTML el exists, give me the value, if not, return undefined
form?.addEventListener("submit", e => {
    e.preventDefault()
    id++
    if (input?.value == "" || input?.value == null) return
    
    const newTask: Task = {
        id: id,
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    input.value
    tasks.push(newTask)
    addItem(newTask)
    input.value = ""
}) 

function addItem(task: Task) {
    const item = document.createElement("li")
    const label = document.createElement("label")
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = task.completed
    checkbox.addEventListener("change", () => {
        task.completed = !task.completed
        saveTasks()
    })
    saveTasks()
    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)
}


function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
    const tasksJSON = localStorage.getItem("TASKS")
    if (tasksJSON === null) return []
    return JSON.parse(tasksJSON)
}