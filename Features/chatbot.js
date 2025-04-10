// --- Event Listeners for Send and Enter Key ---
document.getElementById("sendBtn").addEventListener("click", function () {
  sendMessage(false);
});

document
  .getElementById("userInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage(false);
    }
  });

// --- Voice Input via Speech Recognition ---
document.getElementById("micBtn").addEventListener("click", function () {
  let recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onstart = function () {
    document.getElementById("micBtn").classList.add("listening");
  };

  recognition.onresult = function (event) {
    let transcript = event.results[0][0].transcript;
    document.getElementById("userInput").value = transcript;
    sendMessage(true); // Treat as voice input
  };

  recognition.onerror = function () {
    alert("Sorry, I couldn't hear you. Try again.");
  };

  recognition.onend = function () {
    document.getElementById("micBtn").classList.remove("listening");
  };

  recognition.start();
});

// --- Text-to-Speech for Chatbot Response ---
function speakResponse(responseText) {
  let speech = new SpeechSynthesisUtterance();
  speech.text = responseText;
  speech.lang = "en-US";
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}

// --- CSV Data Loading and Parsing ---
async function loadCSV() {
  try {
    const response = await fetch("mental_health_support.csv");
    const data = await response.text();
    chatbotDataset = parseCSV(data);
  } catch (error) {
    console.error("Error loading CSV:", error);
  }
}

function parseCSV(csvText) {
  let dataset = {};
  // Split rows by newlines and trim each row
  let rows = csvText.split("\n").map((row) => row.trim());
  // Assume first row is header with "User_Query" and "Chatbot_Response"
  for (let i = 1; i < rows.length; i++) {
    let columns = rows[i].split(",");
    if (columns.length < 2) continue;
    // Remove extra quotes and trim spaces
    let userQuery = columns[0].trim().replace(/"/g, "");
    let chatbotResponse = columns.slice(1).join(", ").trim().replace(/"/g, "");
    dataset[userQuery] = chatbotResponse;
  }
  return dataset;
}

let chatbotDataset = {};
loadCSV();

// --- Multi-Step Conversation Handling ---
let conversationState = null;

function getFollowUpResponse(userInput) {
  const followUps = {
    "I feel sad":
      "I'm really sorry to hear that. Can you share what’s making you feel this way?",
    "I feel anxious":
      "I understand. Is there something specific that's causing your anxiety?",
    "I feel lonely":
      "That must be tough. Have you tried reaching out to a close friend or family member?",
    "I feel stressed":
      "That’s understandable. Do you want some relaxation tips?",
  };
  return followUps[userInput] || null;
}

// --- Fuzzy Matching Functions ---
function findClosestMatch(inputQuery) {
  let queries = Object.keys(chatbotDataset);
  let bestMatch = "";
  let highestMatchScore = 0;
  queries.forEach((query) => {
    let matchScore = similarity(inputQuery.toLowerCase(), query.toLowerCase());
    if (matchScore > highestMatchScore) {
      highestMatchScore = matchScore;
      bestMatch = query;
    }
  });
  return highestMatchScore > 0.5 ? bestMatch : null;
}

function similarity(str1, str2) {
  let longer = str1.length > str2.length ? str1 : str2;
  let shorter = str1.length > str2.length ? str2 : str1;
  let longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  let costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

// --- Live Auto-Suggestions ---
document.getElementById("userInput").addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();
  const suggestionsBox = document.getElementById("suggestions");
  suggestionsBox.innerHTML = ""; // Clear previous suggestions
  if (query === "") {
    suggestionsBox.style.display = "none";
    return;
  }
  let matchingQueries = Object.keys(chatbotDataset).filter((q) =>
    q.toLowerCase().includes(query)
  );
  if (matchingQueries.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }
  suggestionsBox.style.display = "block";
  matchingQueries.slice(0, 5).forEach((suggestion) => {
    let suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion-item");
    suggestionItem.innerText = suggestion;
    suggestionItem.addEventListener("click", function () {
      document.getElementById("userInput").value = suggestion;
      suggestionsBox.style.display = "none";
    });
    suggestionsBox.appendChild(suggestionItem);
  });
});

// --- Handle User Message & Response ---
async function sendMessage(isVoiceInput) {
  const inputField = document.getElementById("userInput");
  const message = inputField.value.trim();
  document.getElementById("suggestions").innerHTML = "";
  if (message === "") return;
  const chatBody = document.getElementById("chatBody");
  const userMessage = document.createElement("div");
  userMessage.classList.add("user-message", "bounce"); // Add bounce class
  userMessage.innerText = message;
  // chatBody.appendChild(userMessage);
  document.getElementById("chatBody").appendChild(userMessage);
  chatBody.scrollTop = chatBody.scrollHeight;
  inputField.value = "";

  let botResponse = chatbotDataset[message];
  if (!botResponse) {
    if (conversationState) {
      botResponse = handleFollowUp(message);
      conversationState = null;
    } else {
      let followUp = getFollowUpResponse(message);
      if (followUp) {
        botResponse = followUp;
        conversationState = message;
      } else {
        let closestMatch = findClosestMatch(message);
        if (closestMatch) {
          botResponse = `Did you mean: "${closestMatch}"?\n\n${chatbotDataset[closestMatch]}`;
        } else {
          botResponse =
            "I'm sorry, I don't have an answer for that. Can you rephrase?";
        }
      }
    }
  }
  setTimeout(() => {
    // Remove previous speaker buttons from all bot responses
    document.querySelectorAll(".speaker-btn").forEach((btn) => btn.remove());
    const botMessage = document.createElement("div");
    botMessage.classList.add("bot-message", "fade-in");
    botMessage.innerText = botResponse;

    // Append a speaker button to the latest response
    const speakerBtn = document.createElement("button");
    speakerBtn.classList.add("speaker-btn");
    speakerBtn.innerText = "🔊";
    speakerBtn.onclick = function () {
      speakResponse(botResponse);
    };
    botMessage.appendChild(speakerBtn);
    chatBody.appendChild(botMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
    if (isVoiceInput) {
      speakResponse(botResponse);
    }
  }, 300);
}

function handleFollowUp(userReply) {
  return "Thank you for sharing. Based on what you said, it might help to talk to someone or take a break. You're not alone.";
}
