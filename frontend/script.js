const taskForm = document.getElementById("taskForm");
const taskId = document.getElementById("taskId");
const title = document.getElementById("title");
const description = document.getElementById("description");
const status = document.getElementById("status");
const taskList = document.getElementById("taskList");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");


// GET - Load all tasks
async function loadTasks() {
    try {
        const response = await fetch("/tasks");
        const tasks = await response.json();

        taskList.innerHTML = "";

        if (tasks.length === 0) {
            taskList.innerHTML = "<p>No tasks available.</p>";
            return;
        }

        tasks.forEach(task => {
            const card = document.createElement("div");
            card.className = "task-card";

            card.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p class="status">Status: ${task.status}</p>

                <button class="edit-btn"
                    onclick="editTask('${task._id}', '${escapeText(task.title)}', '${escapeText(task.description)}', '${task.status}')">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteTask('${task._id}')">
                    Delete
                </button>
            `;

            taskList.appendChild(card);
        });

    } catch (error) {
        console.error("Error:", error);
        taskList.innerHTML = "<p>Unable to load tasks.</p>";
    }
}


// POST / PUT - Add or Update Task
taskForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const data = {
        title: title.value,
        description: description.value,
        status: status.value
    };

    try {
        let response;

        if (taskId.value) {
            // PUT
            response = await fetch(`/tasks/${taskId.value}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        } else {
            // POST
            response = await fetch("/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        }

        if (response.ok) {
            alert(taskId.value
                ? "Task updated successfully!"
                : "Task added successfully!"
            );

            resetForm();
            loadTasks();
        } else {
            alert("Something went wrong!");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Server connection error!");
    }
});


// Edit Task
function editTask(id, taskTitle, taskDescription, taskStatus) {
    taskId.value = id;
    title.value = taskTitle;
    description.value = taskDescription;
    status.value = taskStatus;

    formTitle.innerText = "Edit Task";
    submitBtn.innerText = "Update Task";
    cancelBtn.style.display = "inline-block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// DELETE Task
async function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) {
        return;
    }

    try {
        const response = await fetch(`/tasks/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Task deleted successfully!");
            loadTasks();
        } else {
            alert("Unable to delete task!");
        }

    } catch (error) {
        console.error("Error:", error);
    }
}


// Cancel Edit
cancelBtn.addEventListener("click", function() {
    resetForm();
});


// Reset Form
function resetForm() {
    taskForm.reset();

    taskId.value = "";
    formTitle.innerText = "Add New Task";
    submitBtn.innerText = "Add Task";
    cancelBtn.style.display = "none";
}


// Escape special characters
function escapeText(text) {
    return text
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"');
}


// Load tasks when page opens
loadTasks();