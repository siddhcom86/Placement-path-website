
const tasks = document.querySelectorAll(".aptitude-task");
const progressText = document.getElementById("aptitude-progress");
const progressFill = document.getElementById("aptitude-progress-fill");

const storageKey = "placementpath-aptitude";

function updateProgress() {
    const completed = document.querySelectorAll(".aptitude-task:checked").length;
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
