
const studyForm = document.getElementById("study-form");
const planList = document.getElementById("study-plan-list");
const plannerMessage = document.getElementById("planner-message");

const revisionForm = document.getElementById("revision-form");
const revisionList = document.getElementById("revision-list");

const studyKey = "placementpath-study-plans";
const revisionKey = "placementpath-revisions";

let studyPlans = JSON.parse(localStorage.getItem(studyKey) || "[]");
let revisions = JSON.parse(localStorage.getItem(revisionKey) || "[]");

function savePlans() {
    localStorage.setItem(studyKey, JSON.stringify(studyPlans));
}

function saveRevisions() {
    localStorage.setItem(revisionKey, JSON.stringify(revisions));
}

function renderPlans() {
    planList.innerHTML = "";

    if (studyPlans.length === 0) {
        planList.textContent = "No study plans added yet.";
        return;
    }

    studyPlans.forEach((plan, index) => {
        const card = document.createElement("article");
        card.className = "resource-card";

        const details = document.createElement("p");
        details.textContent =
            `${plan.date} | ${plan.subject} | ${plan.topic} | ${plan.minutes} minutes`;

        const status = document.createElement("p");
        status.textContent = plan.completed ? "Completed" : "Pending";

        const completeButton = document.createElement("button");
        completeButton.textContent = plan.completed
            ? "Mark as Pending"
            : "Mark as Completed";

        completeButton.addEventListener("click", () => {
            studyPlans[index].completed = !studyPlans[index].completed;
            savePlans();
            renderPlans();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            studyPlans.splice(index, 1);
            savePlans();
            renderPlans();
        });

        card.append(details, status, completeButton, deleteButton);
        planList.appendChild(card);
    });
}

function renderRevisions() {
    revisionList.innerHTML = "";

    if (revisions.length === 0) {
        revisionList.textContent = "No revision topics added yet.";
        return;
    }

    revisions.forEach((revision, index) => {
        const card = document.createElement("article");
        card.className = "resource-card";

        const details = document.createElement("p");
        details.textContent =
            `${revision.subject}: ${revision.topic}`;

        const status = document.createElement("p");
        status.textContent = revision.completed ? "Revised" : "Not revised yet";

        const reviseButton = document.createElement("button");
        reviseButton.textContent = revision.completed
            ? "Mark Not Revised"
            : "Mark as Revised";

        reviseButton.addEventListener("click", () => {
            revisions[index].completed = !revisions[index].completed;
            saveRevisions();
            renderRevisions();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            revisions.splice(index, 1);
            saveRevisions();
            renderRevisions();
        });

        card.append(details, status, reviseButton, deleteButton);
        revisionList.appendChild(card);
    });
}

studyForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const plan = {
        date: document.getElementById("study-date").value,
        subject: document.getElementById("study-subject").value,
        topic: document.getElementById("study-topic").value.trim(),
        minutes: Number(document.getElementById("study-minutes").value),
        completed: false
    };

    studyPlans.push(plan);
    savePlans();
    renderPlans();
    studyForm.reset();

    plannerMessage.textContent = "Study plan saved successfully!";
});

revisionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const revision = {
        subject: document.getElementById("revision-subject").value,
        topic: document.getElementById("revision-topic").value.trim(),
        completed: false
    };

    revisions.push(revision);
    saveRevisions();
    renderRevisions();
    revisionForm.reset();
});

renderPlans();
renderRevisions();
