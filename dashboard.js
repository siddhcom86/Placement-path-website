
function getProgress(key, totalTopics) {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    return Math.round((saved.length / totalTopics) * 100);
}

const dsa = getProgress("placementpath-dsa", 12);
const aptitude = getProgress("placementpath-aptitude", 11);
const english = getProgress("placementpath-english", 11);
const core = getProgress("placementpath-core", 13);

document.getElementById("dashboard-dsa").textContent =
    dsa + "% completed";

document.getElementById("dashboard-aptitude").textContent =
    aptitude + "% completed";

document.getElementById("dashboard-english").textContent =
    english + "% completed";

document.getElementById("dashboard-core").textContent =
    core + "% completed";

// Overall topic progress
const totalCompleted = [
    "placementpath-dsa",
    "placementpath-aptitude",
    "placementpath-english",
    "placementpath-core"
].reduce((sum, key) => {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    return sum + saved.length;
}, 0);

const totalTopics = 12 + 11 + 11 + 13;
const overall = Math.round((totalCompleted / totalTopics) * 100);

document.getElementById("overall-percentage").textContent =
    `${overall}% completed (${totalCompleted}/${totalTopics} topics)`;

document.getElementById("overall-progress-fill").style.width =
    `${overall}%`;

// Today's study plans
const plans = JSON.parse(
    localStorage.getItem("placementpath-study-plans") || "[]"
);

const today = new Date();
const todayDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

const todayPlans = plans.filter(plan => plan.date === todayDate);
const plansContainer = document.getElementById("dashboard-plans");

plansContainer.innerHTML = "";

if (todayPlans.length === 0) {
    plansContainer.textContent =
        "No study plans for today. Add one in your Daily Planner.";
} else {
    todayPlans.forEach(plan => {
        const item = document.createElement("article");
        item.className = "resource-card";
        item.textContent =
            `${plan.subject}: ${plan.topic} (${plan.minutes} min) — ` +
            (plan.completed ? "Completed" : "Pending");

        plansContainer.appendChild(item);
    });
}

const leetcodePatternKeys = [
    "placementpath-leetcode-arrays",
    "placementpath-leetcode-two-pointers",
    "placementpath-leetcode-sliding-window",
    "placementpath-leetcode-binary-search",
    "placementpath-leetcode-linked-list",
    "placementpath-leetcode-stack-queue",
    "placementpath-leetcode-trees",
    "placementpath-leetcode-backtracking",
    "placementpath-leetcode-graphs",
    "placementpath-leetcode-dp"
];

const leetcodePatternTotals = [
    5, 4, 4, 4, 4, 4, 4, 4, 3, 4
];

let totalSolved = 0;
let totalQuestions = 0;

leetcodePatternKeys.forEach((key, index) => {
    const saved = JSON.parse(
        localStorage.getItem(key) || "[]"
    );

    totalSolved += saved.length;
    totalQuestions += leetcodePatternTotals[index];
});

const totalPercentage = totalQuestions === 0
    ? 0
    : Math.round(
        (totalSolved / totalQuestions) * 100
    );

const totalProgress = document.getElementById(
    "leetcode-total-progress"
);

const totalFill = document.getElementById(
    "leetcode-total-progress-fill"
);

if (totalProgress) {
    totalProgress.textContent =
        `${totalSolved}/${totalQuestions} questions solved (${totalPercentage}%)`;
}

if (totalFill) {
    totalFill.style.width =
        `${totalPercentage}%`;
}

const streakCount = document.getElementById("streak-count");
const streakMessage = document.getElementById("streak-message");
const studyDoneBtn = document.getElementById("study-done-btn");

const streakKey = "placementpath-study-streak";

function getLocalDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const day = String(yesterday.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function loadStreak() {
    let data = JSON.parse(
        localStorage.getItem(streakKey) ||
        '{"count":0,"lastDate":""}'
    );

    const today = getLocalDate();

    // Reset an expired streak
    if (
        data.lastDate &&
        data.lastDate !== today &&
        data.lastDate !== getYesterday()
    ) {
        data.count = 0;
        data.lastDate = "";
        localStorage.setItem(streakKey, JSON.stringify(data));
    }

    if (streakCount) {
        streakCount.textContent = `${data.count} days`;
    }

    if (streakMessage) {
        if (data.lastDate === today) {
            streakMessage.textContent =
                "Great job! Today's study is completed.";
        } else {
            streakMessage.textContent =
                "Study today to build your streak!";
        }
    }

    if (studyDoneBtn) {
        studyDoneBtn.disabled = data.lastDate === today;
        studyDoneBtn.textContent =
            data.lastDate === today
                ? "Today's Study Completed ✓"
                : "Mark Today as Studied";
    }
}

if (studyDoneBtn) {
    studyDoneBtn.addEventListener("click", function () {
        const today = getLocalDate();

        let data = JSON.parse(
            localStorage.getItem(streakKey) ||
            '{"count":0,"lastDate":""}'
        );

        if (data.lastDate === today) {
            return;
        }

        if (data.lastDate !== getYesterday()) {
            data.count = 0;
        }

        data.count += 1;
        data.lastDate = today;

        localStorage.setItem(streakKey, JSON.stringify(data));
         
// Save today's study in weekly log
const weeklyStudyKey = "placementpath-weekly-study-log";

const studyLog = JSON.parse(
    localStorage.getItem(weeklyStudyKey) || "[]"
);

if (!studyLog.includes(today)) {
    studyLog.push(today);

    localStorage.setItem(
        weeklyStudyKey,
        JSON.stringify(studyLog)
    );
}

// Refresh the weekly report
if (typeof updateWeeklyReport === "function") {
    updateWeeklyReport();
}

        loadStreak();
    });
}

loadStreak();

const weeklyStudyDays = document.getElementById("weekly-study-days");
const weeklyQuestionsSolved = document.getElementById("weekly-questions-solved");
const weeklyReportMessage = document.getElementById("weekly-report-message");

const weeklyStudyKey = "placementpath-weekly-study-log";
const weeklySolvedKey = "placementpath-weekly-solved-log";

function getDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getWeekDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Monday is the first day of the week
    const day = today.getDay();
    const offset = day === 0 ? -6 : 1 - day;

    const monday = new Date(today);
    monday.setDate(today.getDate() + offset);

    const dates = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        dates.push(getDateString(date));
    }

    return dates;
}

function updateWeeklyReport() {
    const dates = getWeekDates();

    const studyLog = JSON.parse(
        localStorage.getItem(weeklyStudyKey) || "[]"
    );

    const solvedLog = JSON.parse(
        localStorage.getItem(weeklySolvedKey) || "{}"
    );

    const studyDays = dates.filter(date =>
        studyLog.includes(date)
    ).length;

    let questionsSolved = 0;

    dates.forEach(date => {
        questionsSolved += Number(solvedLog[date] || 0);
    });

    if (weeklyStudyDays) {
        weeklyStudyDays.textContent = `${studyDays}/7`;
    }

    if (weeklyQuestionsSolved) {
        weeklyQuestionsSolved.textContent = questionsSolved;
    }

    if (weeklyReportMessage) {
        weeklyReportMessage.textContent =
            studyDays >= 5
                ? "Great consistency! Keep it up."
                : "Aim to study consistently this week.";
    }
}

updateWeeklyReport();