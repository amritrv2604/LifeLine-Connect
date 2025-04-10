document.addEventListener("DOMContentLoaded", function () {
  // console.log(document.getElementById("finalScore"));
  const questions = [
    {
      question: "How often do you feel hopeless or worthless?",
      options: ["Never", "Sometimes", "Often", "Almost Always"],
    },
    {
      question: "How is your sleep pattern lately?",
      options: [
        "I sleep well and feel rested",
        "I have trouble sleeping sometimes",
        "I struggle to fall or stay asleep",
        "I barely sleep or sleep too much",
      ],
    },
    {
      question: "How interested are you in things you once enjoyed?",
      options: [
        "I still enjoy them a lot",
        "I enjoy them but less than before",
        "I’ve lost interest in most things",
        "I feel no joy or interest at all",
      ],
    },
    {
      question: "Do you struggle with maintaining focus?",
      options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
      question: "How often do you have negative thoughts about yourself?",
      options: ["Almost never", "Occasionally", "Frequently", "Always"],
    },
    {
      question:
        "Do you feel like you have someone to talk to about your feelings?",
      options: [
        "Yes, I have strong support",
        "I have some support but don’t always share",
        "I don’t have many people to talk to",
        "I feel completely alone",
      ],
    },
  ];

  let currentQuestion = 0;
  let selectedAnswers = new Array(questions.length).fill(null); // Store selected answers

  const questionContainer = document.getElementById("question-container");
  const nextButton = document.getElementById("next-btn");
  const prevButton = document.getElementById("prev-btn");
  const submitButton = document.getElementById("submit-btn");
  const resultContainer = document.getElementById("result-container");
  const progressBar = document.getElementById("progress-bar");
  const finalScore = document.getElementById("finalScore");
  const moodDescription = document.getElementById("moodDescription");

  function loadQuestion() {
    questionContainer.innerHTML = `<h2 class="question">${questions[currentQuestion].question}</h2>`;

    questions[currentQuestion].options.forEach((option, index) => {
      const isSelected = selectedAnswers[currentQuestion] === index;
      questionContainer.innerHTML += `
                <label class="option ${
                  selectedAnswers[currentQuestion] === index ? "selected" : ""
                }" 
             data-index="${index}">
        <input type="radio" name="answer" value="${index}" 
               ${selectedAnswers[currentQuestion] === index ? "checked" : ""}>
        ${option}
      </label>
  `;
    });

    updateButtons();
    addOptionClickListeners();
  }

  function updateButtons() {
    prevButton.style.display = currentQuestion > 0 ? "block" : "none";
    nextButton.style.display =
      currentQuestion < questions.length - 1 ? "block" : "none";
    nextButton.disabled = selectedAnswers[currentQuestion] === null; // Enable only if an answer is selected
    submitButton.style.display =
      currentQuestion === questions.length - 1 ? "block" : "none";
  }

  function addOptionClickListeners() {
    document.querySelectorAll(".option").forEach((option) => {
      option.addEventListener("click", function () {
        const selectedIndex = parseInt(this.getAttribute("data-index"));
        selectedAnswers[currentQuestion] = selectedIndex;
        loadQuestion(); // Reload question to update styling
      });
    });
  }

  nextButton.addEventListener("click", function () {
    if (selectedAnswers[currentQuestion] !== null) {
      currentQuestion++;
      loadQuestion();
    }
  });

  prevButton.addEventListener("click", function () {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  });

  // submitButton.addEventListener("click", function () {
  //   showLoadingAnimation();

  //   setTimeout(() => {
  //     showProgressBar();
  //   }, 500); // 0.5s delay
  // });

  submitButton.addEventListener("click", async function () {
    // 1. Show loading animation
    showLoadingAnimation();

    // 2. Start timer for minimum 500ms
    const startTime = Date.now();

    // 3. Calculate results (simulated delay)
    const finalLevel = await simulateProcessing();

    // 4. Calculate remaining time to complete 500ms
    const elapsed = Date.now() - startTime;
    const remainingDelay = Math.max(0, 500 - elapsed);

    // 5. Show results after exactly 500ms
    setTimeout(() => {
      showProgressBar(finalLevel);
    }, remainingDelay);
  });

  // Simulate processing time (100-300ms)
  function simulateProcessing() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(calculateMentalHealthLevel());
      }, 100 + Math.random() * 200);
    });
  }

  function showLoadingAnimation() {
    const container = document.getElementById("questionnaire-container");
    container.innerHTML = `
      <div class="loading-animation">
        <div class="loader"></div>
        <p>Analyzing your mood...</p>
      </div>
    `;

    // Force reflow to ensure animation starts
    void container.offsetWidth;
  }

  function showProgressBar() {
    // console.log("Function called"); // Debug point 1
    // let finalLevel = calculateMentalHealthLevel();
    // console.log("Calculated level:", finalLevel); // Debug point 2

    let finalLevel = calculateMentalHealthLevel();
    finalLevel = Math.min(4, Math.max(1, finalLevel));

    let finalScoreElem = document.getElementById("finalScore");
    let moodDescriptionElem = document.getElementById("moodDescription");
    let resultContainerElem = document.getElementById("result-container");
    let progressBarElem = document.getElementById("progress-bar");
    let questionnaire = document.getElementById("questionnaire-container");

    finalScoreElem.innerText = finalLevel;
    let description = "";
    if (finalLevel === 1) {
      description = "You're feeling great! Keep up the positivity. 😊";
    } else if (finalLevel === 2) {
      description = "You're doing okay, but a little self-care might help. 💙";
    } else if (finalLevel === 3) {
      description =
        "You're feeling a bit low. Try some relaxation techniques. 🌿";
    } else {
      description = "You're struggling. Reach out to someone for support. ❤️";
    }

    moodDescriptionElem.innerText = description;

    // Hide the entire questionnaire section completely
    if (questionnaire) {
      questionnaire.classList.add("hidden");
    }

    resultContainerElem.classList.remove("hidden");
    resultContainerElem.style.display = "block";
    resultContainerElem.style.justifyContent = "center";
    resultContainerElem.style.alignItems = "center";
    resultContainerElem.style.flexDirection = "column";

    progressBarElem.style.width = finalLevel * 25 + "%";

    // Add fade-in to result elements
    resultContainer.style.animation = "fadeIn 0.8s ease-out";
    finalScore.style.animation = "slideUp 0.5s 0.3s forwards";
    moodDescription.style.animation = "fadeIn 0.8s 0.5s forwards";
  }

  function calculateMentalHealthLevel() {
    let totalScore = selectedAnswers.reduce(
      (sum, answer) => sum + parseInt(answer) + 1,
      0
    );
    let averageScore = totalScore / selectedAnswers.length;
    return Math.round(averageScore);
  }

  loadQuestion();
});
