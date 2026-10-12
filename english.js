
const tasks = document.querySelectorAll(".english-task");
const progressText = document.getElementById("english-progress");
const progressFill = document.getElementById("english-progress-fill");

const storageKey = "placementpath-english";

function updateProgress() {
    const completed = document.querySelectorAll(".english-task:checked").length;
    const total = tasks.length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressText.textContent = `${percentage}% completed (${completed}/${total})`;
    progressFill.style.width = `${percentage}%`;

    const checkedTasks = [];

    tasks.forEach((task, index) => {
        if (task.checked) {
            checkedTasks.push(index);
        }
    });

    localStorage.setItem(storageKey, JSON.stringify(checkedTasks));
}

const savedTasks = JSON.parse(localStorage.getItem(storageKey) || "[]");

tasks.forEach((task, index) => {
    task.checked = savedTasks.includes(index);
    task.addEventListener("change", updateProgress);
});

updateProgress();
