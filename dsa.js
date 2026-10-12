

const dsaTasks = document.querySelectorAll(".dsa-task");
const dsaProgress = document.getElementById("dsa-progress");
const dsaFill = document.getElementById("dsa-progress-fill");

const dsaKey = "placementpath-dsa";

// Load saved topic progress
const savedDsaTasks = JSON.parse(
    localStorage.getItem(dsaKey) || "[]"
);

// Restore checkboxes
dsaTasks.forEach((task, index) => {
    task.checked = savedDsaTasks.includes(index);
});

// Update topic progress
function updateDsaProgress() {
    const completed = [];

    dsaTasks.forEach((task, index) => {
        if (task.checked) {
            completed.push(index);
        }
    });

    localStorage.setItem(
        dsaKey,
        JSON.stringify(completed)
    );

    const total = dsaTasks.length;
    const percentage = total === 0
        ? 0
        : Math.round((completed.length / total) * 100);

    if (dsaProgress) {
        dsaProgress.textContent =
            `${completed.length}/${total} topics completed (${percentage}%)`;
    }

    if (dsaFill) {
        dsaFill.style.width = `${percentage}%`;
    }
}

// Listen for topic checkbox changes
dsaTasks.forEach(task => {
    task.addEventListener("change", updateDsaProgress);
});

// Show initial topic progress
updateDsaProgress();


// ==========================================
// 2. ARRAYS & HASHING - LEETCODE TRACKER
// ==========================================

const leetcodeTasks = document.querySelectorAll(".leetcode-task");
const leetcodeProgress = document.getElementById("leetcode-progress");
const leetcodeFill = document.getElementById("leetcode-progress-fill");

const leetcodeKey = "placementpath-leetcode-arrays";

// Load saved LeetCode progress
const savedLeetcodeTasks = JSON.parse(
    localStorage.getItem(leetcodeKey) || "[]"
);

// Restore LeetCode checkboxes
leetcodeTasks.forEach((task, index) => {
    task.checked = savedLeetcodeTasks.includes(index);
});

// Update LeetCode progress
function updateLeetcodeProgress() {
    const completed = [];

    leetcodeTasks.forEach((task, index) => {
        if (task.checked) {
            completed.push(index);
        }
    });

    localStorage.setItem(
        leetcodeKey,
        JSON.stringify(completed)
    );

    const total = leetcodeTasks.length;
    const percentage = total === 0
        ? 0
        : Math.round((completed.length / total) * 100);

    if (leetcodeProgress) {
        leetcodeProgress.textContent =
            `${completed.length}/${total} questions solved (${percentage}%)`;
    }

    if (leetcodeFill) {
        leetcodeFill.style.width = `${percentage}%`;
    }
}
// Listen for LeetCode checkbox changes
leetcodeTasks.forEach(task => {
    task.addEventListener("change", updateLeetcodeProgress);
});

// Show initial LeetCode progress
updateLeetcodeProgress();



const twoPointerTasks =
    document.querySelectorAll(".two-pointer-task");

const twoPointerProgress =
    document.getElementById("two-pointer-progress");

const twoPointerFill =
    document.getElementById("two-pointer-progress-fill");

const twoPointerKey =
    "placementpath-leetcode-two-pointers";

// Load saved progress
const savedTwoPointerTasks = JSON.parse(
    localStorage.getItem(twoPointerKey) || "[]"
);

// Restore checkboxes
twoPointerTasks.forEach((task, index) => {
    task.checked = savedTwoPointerTasks.includes(index);
});

// Update progress
function updateTwoPointerProgress() {
    const completed = [];

    twoPointerTasks.forEach((task, index) => {
        if (task.checked) {
            completed.push(index);
        }
    });

    localStorage.setItem(
        twoPointerKey,
        JSON.stringify(completed)
    );

    const total = twoPointerTasks.length;

    const percentage = total === 0
        ? 0
        : Math.round((completed.length / total) * 100);

    if (twoPointerProgress) {
        twoPointerProgress.textContent =
            `${completed.length}/${total} questions solved (${percentage}%)`;
    }

    if (twoPointerFill) {
        twoPointerFill.style.width = `${percentage}%`;
    }
}

// Listen for checkbox changes
twoPointerTasks.forEach(task => {
    task.addEventListener(
        "change",
        updateTwoPointerProgress
    );
});

// Show initial progress
updateTwoPointerProgress();

const slidingWindowTasks =
    document.querySelectorAll(".sliding-window-task");

const slidingWindowProgress =
    document.getElementById("sliding-window-progress");

const slidingWindowFill =
    document.getElementById("sliding-window-progress-fill");

const slidingWindowKey =
    "placementpath-leetcode-sliding-window";

// Load saved progress
const savedSlidingWindowTasks = JSON.parse(
    localStorage.getItem(slidingWindowKey) || "[]"
);

// Restore checkboxes
slidingWindowTasks.forEach((task, index) => {
    task.checked = savedSlidingWindowTasks.includes(index);
});

// Update progress
function updateSlidingWindowProgress() {
    const completed = [];

    slidingWindowTasks.forEach((task, index) => {
        if (task.checked) {
            completed.push(index);
        }
    });

    localStorage.setItem(
        slidingWindowKey,
        JSON.stringify(completed)
    );

    const total = slidingWindowTasks.length;

    const percentage = total === 0
        ? 0
        : Math.round((completed.length / total) * 100);

    if (slidingWindowProgress) {
        slidingWindowProgress.textContent =
            `${completed.length}/${total} questions solved (${percentage}%)`;
    }

    if (slidingWindowFill) {
        slidingWindowFill.style.width = `${percentage}%`;
    }
}

// Listen for checkbox changes
slidingWindowTasks.forEach(task => {
    task.addEventListener(
        "change",
        updateSlidingWindowProgress
    );
});

// Show initial progress
updateSlidingWindowProgress();

const binarySearchTasks =
    document.querySelectorAll(".binary-search-task");

const binarySearchProgress =
    document.getElementById("binary-search-progress");

const binarySearchFill =
    document.getElementById("binary-search-progress-fill");

const binarySearchKey =
    "placementpath-leetcode-binary-search";

// Load saved progress
const savedBinarySearchTasks = JSON.parse(
    localStorage.getItem(binarySearchKey) || "[]"
);

// Restore checkboxes
binarySearchTasks.forEach((task, index) => {
    task.checked = savedBinarySearchTasks.includes(index);
});

// Update progress
function updateBinarySearchProgress() {
    const completed = [];

    binarySearchTasks.forEach((task, index) => {
        if (task.checked) {
            completed.push(index);
        }
    });

    localStorage.setItem(
        binarySearchKey,
        JSON.stringify(completed)
    );

    const total = binarySearchTasks.length;

    const percentage = total === 0
        ? 0
        : Math.round((completed.length / total) * 100);

    if (binarySearchProgress) {
        binarySearchProgress.textContent =
            `${completed.length}/${total} questions solved (${percentage}%)`;
    }

    if (binarySearchFill) {
        binarySearchFill.style.width = `${percentage}%`;
    }
}

// Listen for checkbox changes
binarySearchTasks.forEach(task => {
    task.addEventListener(
        "change",
        updateBinarySearchProgress
    );
});

// Show initial progress
updateBinarySearchProgress();


const patternTrackers = [
    {
        taskClass: "linked-list-task",
        progressId: "linked-list-progress",
        fillId: "linked-list-progress-fill",
        key: "placementpath-leetcode-linked-list"
    },
    {
        taskClass: "stack-queue-task",
        progressId: "stack-queue-progress",
        fillId: "stack-queue-progress-fill",
        key: "placementpath-leetcode-stack-queue"
    },
    {
        taskClass: "tree-task",
        progressId: "tree-progress",
        fillId: "tree-progress-fill",
        key: "placementpath-leetcode-trees"
    },
    {
        taskClass: "backtracking-task",
        progressId: "backtracking-progress",
        fillId: "backtracking-progress-fill",
        key: "placementpath-leetcode-backtracking"
    },
    {
        taskClass: "graph-task",
        progressId: "graph-progress",
        fillId: "graph-progress-fill",
        key: "placementpath-leetcode-graphs"
    },
    {
        taskClass: "dp-task",
        progressId: "dp-progress",
        fillId: "dp-progress-fill",
        key: "placementpath-leetcode-dp"
    }
];

patternTrackers.forEach(pattern => {
    const tasks = document.querySelectorAll(
        "." + pattern.taskClass
    );

    const progress = document.getElementById(
        pattern.progressId
    );

    const fill = document.getElementById(
        pattern.fillId
    );

    // Restore saved checkboxes
    const savedTasks = JSON.parse(
        localStorage.getItem(pattern.key) || "[]"
    );

    tasks.forEach((task, index) => {
        task.checked = savedTasks.includes(index);
    });

    // Update and save progress
    function updateProgress() {
        const completed = [];

        tasks.forEach((task, index) => {
            if (task.checked) {
                completed.push(index);
            }
        });

        localStorage.setItem(
            pattern.key,
            JSON.stringify(completed)
        );

        const total = tasks.length;

        const percentage = total === 0
            ? 0
            : Math.round(
                (completed.length / total) * 100
            );

        if (progress) {
            progress.textContent =
                `${completed.length}/${total} questions solved (${percentage}%)`;
        }

        if (fill) {
            fill.style.width = `${percentage}%`;
        }
    }

    tasks.forEach(task => {
        task.addEventListener("change", updateProgress);
    });

    updateProgress();
});


