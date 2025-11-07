console.log("script started");

// Add a task
function addTask() {
    /*<div id="task1" class="task-item">
        <input type="checkbox" id="checkbox0">
        <label id="label1">buy groceries</label>
    </div>
    */
   
    // Get task text
    let textBox = document.getElementById("task-input");
    let taskText = textBox.value;
    textBox.value = "";

    // Prevent empty task
    if (taskText == ""){
        alert("Please enter a task");
        return
    }

    let idNum = generateIdNum();

    createTask(taskText, idNum);

     // Save task to local storage
    localStorage.setItem("task", + idNum, taskText);
    console.log(localStorage.length);
}

function generateIdNum() {
    // Start with idNum = 0
    let idNum = 0;

    // Check if a task with that id exist
    while (localStorage.getItem("task" + idNum) != null) {
        idNum++;
    }
    // If it doesn, increment idNum and check again
    return idNum;
}


/* function removeTask(event) {
    let checkbox = event.target;
    let checkboxId = checkbox.id;
    let numIndex = checkboxId.indexOf("checkbox") + "checkbox".length;
    let taskIdNumber = checkboxId.substring(numIndex);
    let taskDivId = "task" + taskIdNumber;
    let taskDiv = document.getElementById(taskDivId);
    let taskList = document.getElementById("task-list");

    if (taskList && taskDiv) {
        taskList.removeChild(taskDiv);
    }
 }
*/



function removeTask(event) {
    let checkboxId = event.target.id;
    let idNum = checkboxId.substring(8);
    let taskDiv = document.getElementById("task" + idNum);
    taskDiv.classList.add("remove")

    let tasklist = document.getElementById("task-list");

    //tasklist.removeChild(taskDiv);
    setTimeout(function () {
        tasklist.removeChild(taskDiv);
        fixTaskColors();
        localStorage.removeItem(taskDiv.id);
    }, 1000)
}

function fixTaskColors() {
    let tasklist = document.getElementById("task-list");
    for (let i = 0; i < tasklist.childElementCount; i++) {
        tasklist.children[i].style.backgroundColor = "cornflowerblue";
        if (i % 2 == 1) {
            tasklist.children[i].style.backgroundColor = "orange";
        }
    }
}



function createTask(taskText, idNum) {
    // Get tasklist
    let taskList = document.getElementById("task-list");

    // Create task div
    let taskDiv = document.createElement("div");
    taskDiv.id = "task" + taskList.childElementCount;
    taskDiv.classList.add("task-item");
    if (idNum % 2 == 1) {
        taskDiv.style.backgroundColor = "orange";
    }

    // Create checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox" + taskList.childElementCount;
    checkbox.addEventListener("change", removeTask)
    

    // Create label
    let label = document.createElement("label");
    label.id = "label " + taskList.childElementCount;

    // Set label text
    label.innerText = taskText;

   

    // Add the checkbox the task div
    taskDiv.appendChild(checkbox);

    // Add the label to the task div
    taskDiv.appendChild(label);

    // Add the task div to the list
    taskList.appendChild(taskDiv);
}



function loadTasks() {
    console.log(localStorage.length);
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        console.log(key);
        let taskText = localStorage.getItem(key);
        console.log(taskText);
        createTask(taskText, key.substring(4));
    }
    fixTaskColors();
}
loadTasks();