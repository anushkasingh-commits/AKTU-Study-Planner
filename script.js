document.addEventListener("DOMContentLoaded", function () {

    const addButton = document.getElementById("add-sub");
    const generateButton = document.getElementById("generate");
    const subjectsContainer = document.getElementById("subjects-container");

    //subject row
    function createSubjectRow() {

        const row = document.createElement("div");
        row.classList.add("subject-row");

        row.innerHTML = `
            <div class="field">
                <label>Subject</label>
                <input type="text" placeholder="Enter subject name">
            </div>

            <div class="field">
                <label>Difficulty (1-5)</label>
                <input type="number" min="1" max="5">
            </div>
        `;

        subjectsContainer.appendChild(row);
    }

    //first subj input
    createSubjectRow();

    //add subj
    addButton.addEventListener("click", function () {
        createSubjectRow();
    });

    // to generate study plan
    generateButton.addEventListener("click", function () {

        const subjectRows = document.querySelectorAll(".subject-row");
        const examDateInput = document.querySelector('input[type="date"]');
        const hoursPerDayInput = document.querySelector('.time input[type="number"]');

        if (!examDateInput.value || !hoursPerDayInput.value) {
            alert("Please fill exam date and hours per day.");
            return;
        }

        const today = new Date();
        const examDate = new Date(examDateInput.value);

        if (examDate <= today) {
            alert("Exam date must be in the future.");
            return;
        }

        const timeDifference = examDate - today;
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        let subjects = [];
        let totalDifficulty = 0;

        subjectRows.forEach(row => {

            const subjectName = row.querySelector('input[type="text"]').value;
            const difficultyValue = parseInt(row.querySelector('input[type="number"]').value);

            if (subjectName && difficultyValue) {

                subjects.push({
                    name: subjectName,
                    difficulty: difficultyValue
                });

                totalDifficulty += difficultyValue;
            }

        });

        if (subjects.length === 0) {
            alert("Please enter at least one subject.");
            return;
        }

        let result = "Study Plan\n\n";

        subjects.forEach(subject => {

            const weight = subject.difficulty / totalDifficulty;
            const allocatedDays = Math.floor(weight * daysLeft);
            const allocatedHours = allocatedDays * hoursPerDayInput.value;

            result += `${subject.name}\n`;
            result += `Days: ${allocatedDays}\n`;
            result += `Total Study Hours: ${allocatedHours}\n\n`;

        });
        document.getElementById("result").innerText = result;
    });

});