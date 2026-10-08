// Quiz settings
const QUESTIONS_PER_ROUND = 10;
const SECONDS_PER_QUESTION = 20;

// Supabase project (for Google login).
// The publishable key is safe to show in the browser.
const SUPABASE_URL = "https://pbcjllyjlvuezliwfuuo.supabase.co";
const SUPABASE_KEY = "sb_publishable_4-NCaQ0DxHUBNna3No3jRw_BMdhyUxE";

// Things we change while the quiz runs
let currentUser = null;  // the logged-in player, or null
let roundQuestions = []; // the questions in this round
let currentIndex = 0;    // which question we are on
let answers = [];        // the player's choice for each question (null = time ran out)
let timeLeft = 0;
let timerId = null;

// Parts of the page we use
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const startButton = document.getElementById("start-button");
const topicSelect = document.getElementById("topic-select");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const timerText = document.getElementById("timer");
const questionTopic = document.getElementById("question-topic");
const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const resultScreen = document.getElementById("result-screen");
const scoreText = document.getElementById("score");
const mistakesTitle = document.getElementById("mistakes-title");
const mistakesBox = document.getElementById("mistakes");
const tryAgainButton = document.getElementById("try-again-button");
const loggedOutBox = document.getElementById("logged-out-box");
const loggedInBox = document.getElementById("logged-in-box");
const loginButton = document.getElementById("login-button");
const loginError = document.getElementById("login-error");
const logoutButton = document.getElementById("logout-button");
const userName = document.getElementById("user-name");

// Connect to Supabase. If the library did not load (no internet), skip it.
const supabaseClient = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

// Show one screen and hide the others
function showScreen(screen) {
  startScreen.hidden = screen !== startScreen;
  questionScreen.hidden = screen !== questionScreen;
  resultScreen.hidden = screen !== resultScreen;
  window.scrollTo(0, 0);
}

// Mix up a list (Fisher-Yates). Returns a new list.
function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

// Start a new round of random questions
function startRound() {
  // Players must log in first
  if (!currentUser) {
    showScreen(startScreen);
    return;
  }
  // Skip questions that are not checked yet
  // Keep only the chosen topic, unless "all" is chosen
  const topic = topicSelect.value;
  const ready = QUESTIONS.filter(function (q) {
    return q.checked !== false && (topic === "all" || q.topic === topic);
  });
  roundQuestions = shuffle(ready).slice(0, QUESTIONS_PER_ROUND);
  currentIndex = 0;
  answers = [];
  showScreen(questionScreen);
  showQuestion();
}

// Put the current question on the screen
function showQuestion() {
  const q = roundQuestions[currentIndex];
  const number = currentIndex + 1;
  const total = roundQuestions.length;

  progressText.textContent = number + " / " + total;
  progressFill.style.width = (number / total) * 100 + "%";
  questionTopic.textContent = q.topic;
  questionText.textContent = q.question;

  // Make the four option buttons
  optionsBox.innerHTML = "";
  q.options.forEach(function (optionText, i) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = optionText;
    button.addEventListener("click", function () {
      pickAnswer(i);
    });
    optionsBox.appendChild(button);
  });

  startTimer();
}

// Count down from SECONDS_PER_QUESTION. At 0, the question counts as missed.
function startTimer() {
  clearInterval(timerId);
  timeLeft = SECONDS_PER_QUESTION;
  updateTimer();
  timerId = setInterval(function () {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      saveAnswer(null);
    }
  }, 1000);
}

// Show the seconds left. Red in the last 5 seconds.
function updateTimer() {
  timerText.textContent = timeLeft;
  timerText.classList.toggle("low", timeLeft <= 5);
}

// The player tapped an option
function pickAnswer(i) {
  saveAnswer(i);
}

// Save the answer once, then move on
function saveAnswer(choice) {
  clearInterval(timerId);
  // Turn off the buttons so a double tap counts only once
  optionsBox.querySelectorAll("button").forEach(function (b) {
    b.disabled = true;
  });
  answers[currentIndex] = choice;
  nextQuestion();
}

// Go to the next question, or end the round
function nextQuestion() {
  currentIndex++;
  if (currentIndex < roundQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// Show the score and every wrong or missed question
function showResult() {
  let score = 0;
  mistakesBox.innerHTML = "";

  roundQuestions.forEach(function (q, i) {
    const choice = answers[i];
    if (choice === q.answer) {
      score++;
      return;
    }

    // A card for this wrong or missed question
    const card = document.createElement("div");
    card.className = "mistake-card";

    const myAnswer = choice === null
      ? "സമയം കഴിഞ്ഞു — ഉത്തരം നൽകിയില്ല"
      : q.options[choice];

    card.appendChild(makeLine("p", "mistake-question", q.question));
    card.appendChild(makeLine("p", "mistake-line wrong-answer", "നിങ്ങളുടെ ഉത്തരം: " + myAnswer));
    card.appendChild(makeLine("p", "mistake-line right-answer", "ശരിയായ ഉത്തരം: " + q.options[q.answer]));
    card.appendChild(makeLine("p", "mistake-explanation", q.explanation));
    mistakesBox.appendChild(card);
  });

  scoreText.textContent = score + " / " + roundQuestions.length;

  // If nothing is wrong, say so instead of showing an empty list
  if (score === roundQuestions.length) {
    mistakesTitle.hidden = true;
    mistakesBox.appendChild(makeLine("p", "all-correct", "എല്ലാ ഉത്തരങ്ങളും ശരി!"));
  } else {
    mistakesTitle.hidden = false;
  }

  showScreen(resultScreen);
}

// Make a text element with a class
function makeLine(tag, className, text) {
  const el = document.createElement(tag);
  el.className = className;
  el.textContent = text;
  return el;
}

// Add each topic from the question bank to the topic list, once
function fillTopics() {
  const topics = [];
  QUESTIONS.forEach(function (q) {
    if (topics.indexOf(q.topic) === -1) {
      topics.push(q.topic);
    }
  });
  topics.forEach(function (topic) {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });
}

// Get the first name from the Google account
function firstName(user) {
  const meta = user.user_metadata || {};
  const fullName = meta.full_name || meta.name || "";
  if (fullName) {
    return fullName.split(" ")[0];
  }
  // No name: use the part of the email before "@"
  return (user.email || "").split("@")[0];
}

// Show the login button or the player's name, Log out and Start
function showLoginState(user) {
  currentUser = user;
  loggedOutBox.hidden = !!user;
  loggedInBox.hidden = !user;
  if (user) {
    userName.textContent = "നമസ്കാരം, " + firstName(user);
  }
}

// Show a login problem under the login button
function showLoginError(message) {
  loginError.textContent = message;
  loginError.hidden = false;
}

// Send the player to Google, then back to this page
function logIn() {
  if (!supabaseClient) {
    showLoginError("ലോഗിൻ ലോഡ് ആയില്ല. ഇന്റർനെറ്റ് പരിശോധിക്കുക.");
    return;
  }
  supabaseClient.auth.signInWithOAuth({
    provider: "google",
    // Come back to this page, without any old "#..." or "?..." part
    options: { redirectTo: window.location.href.split("#")[0].split("?")[0] }
  }).then(function (result) {
    if (result.error) {
      showLoginError("ലോഗിൻ പരാജയപ്പെട്ടു: " + result.error.message);
    }
  });
}

// Log out and go back to the start screen
function logOut() {
  supabaseClient.auth.signOut().then(function () {
    showLoginState(null);
    showScreen(startScreen);
  });
}

// Watch for log in and log out (also runs once when the page opens)
function setUpLogin() {
  if (!supabaseClient) {
    showLoginState(null);
    return;
  }
  supabaseClient.auth.onAuthStateChange(function (event, session) {
    showLoginState(session ? session.user : null);
  });
}

fillTopics();
setUpLogin();
loginButton.addEventListener("click", logIn);
logoutButton.addEventListener("click", logOut);
startButton.addEventListener("click", startRound);
// Try again: a new round in a new order
tryAgainButton.addEventListener("click", startRound);
