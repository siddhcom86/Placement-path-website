
const subjects = [
    {
        name: "dsa",
        taskClass: "dsa-task"
    },
    {
        name: "aptitude",
        taskClass: "aptitude-task"
    },
    {
        name: "english",
        taskClass: "english-task"
    },
    {
        name: "core",
        taskClass: "core-task"
    }
];

subjects.forEach(function(subject) {
    const tasks = document.querySelectorAll(
        "." + subject.taskClass
    );

    const storageKey = "placementpath-" + subject.name;

    const progressText = document.getElementById(
        subject.name + "-progress"
    );

    const progressFill = document.getElementById(
        subject.name + "-progress-fill"
    );

    if (!tasks.length || !progressText || !progressFill) {
        return;
    }

    const saved = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
    );

    tasks.forEach(function(task, index) {
        task.checked = saved[index] === true;
    });

    function updateProgress() {
        const completed = Array.from(tasks).filter(
            function(task) {
                return task.checked;
            }
        ).length;

        const percentage = Math.round(
            (completed / tasks.length) * 100
        );

        progressText.textContent =
            percentage + "% completed";

        progressFill.style.width = percentage + "%";

        const progress = Array.from(tasks).map(
            function(task) {
                return task.checked;
            }
        );

        localStorage.setItem(
            storageKey,
            JSON.stringify(progress)
        );
    }

    tasks.forEach(function(task) {
        task.addEventListener("change", updateProgress);
    });

    updateProgress();
});

function updateDashboard() {
    const subjectNames = [
        "dsa",
        "aptitude",
        "english",
        "core"
    ];

    let totalTasks = 0;
    let completedTasks = 0;

    subjectNames.forEach(function(name) {
        const tasks = document.querySelectorAll(
            "." + name + "-task"
        );

        const completed = Array.from(tasks).filter(
            function(task) {
                return task.checked;
            }
        ).length;

        const percentage = tasks.length
            ? Math.round((completed / tasks.length) * 100)
            : 0;

        totalTasks += tasks.length;
        completedTasks += completed;

        const summary = document.getElementById(
            "summary-" + name
        );

        if (summary) {
            summary.textContent = percentage + "%";
        }
    });

    const overall = totalTasks
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    document.getElementById("total-completed").textContent =
        completedTasks;

    document.getElementById("total-topics").textContent =
        totalTasks;

    document.getElementById("overall-progress").textContent =
        overall + "%";
}

document.querySelectorAll(
    ".dsa-task, .aptitude-task, .english-task, .core-task"
).forEach(function(task) {
    task.addEventListener("change", updateDashboard);
});

updateDashboard();
