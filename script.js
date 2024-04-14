const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
console.log(newTaskInput);
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

// display taskcount
const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};


//check completed task
function checkTask() {
    const tasksCheck = document.querySelectorAll(".task-check");
    taskCount = 0;
    tasksCheck.forEach((checkBox) => {
      const isChecked = checkBox.checked;
      const editbtn = checkBox.parentNode.querySelector(".edit");
      editbtn.disabled = isChecked;
      console.log();
      if (!isChecked) {
        taskCount += 1;
      }
      displayCount(taskCount);
    });
  }



// Add task 
const addTask = () => {
  const taskName = newTaskInput.value.trim();
  
  error.style.display = "none";
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const task = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit"> 
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>`;

  tasksContainer.insertAdjacentHTML("beforeend", task);
  newTaskInput.value="";
  checkTask();
};

addBtn.addEventListener("click", addTask);



//Delete Task
function deleteTask() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.onclick = (e) => {
      const isChecked =
        button.parentElement.querySelector(".task-check").checked;
      console.log(isChecked);
      console.log(e);
      console.log(isChecked);
      if (!isChecked) {
        taskCount -= 1;
        displayCount(taskCount);
      }
      button.parentNode.remove();
      checkTask();
    };
  });
}

// Edit Task
function editTask() {
  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((editBtn) => {
    editBtn.onclick = (e) => {
      let targetElement = e.target;
      if (!(e.target.className == "edit")) {
        targetElement = e.target.parentElement;
      }
      newTaskInput.value = targetElement.previousElementSibling?.innerText;
      targetElement.parentNode.remove();
      checkTask();
    };
  });
}

// Every event tigger
document.addEventListener("change", function (event) {
  checkTask();
  editTask();
  deleteTask();
});
