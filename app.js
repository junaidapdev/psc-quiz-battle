// Quiz settings
const QUESTIONS_PER_ROUND = 10;
const SECONDS_PER_QUESTION = 20;

// Supabase project (for Google login).
// The publishable key is safe to show in the browser.
const SUPABASE_URL = "https://pbcjllyjlvuezliwfuuo.supabase.co";
const SUPABASE_KEY = "sb_publishable_4-NCaQ0DxHUBNna3No3jRw_BMdhyUxE";

// Things we change while the quiz runs
let currentUser = null;  // the logged-in player, or null
let pendingChallenge = null; // a friend's challenge, waiting to be played
let activeChallenge = null;  // the challenge being played in this round
let lastScore = 0;           // score of the round just finished
let roundTopic = "all";  // the topic chosen for this round
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
const streakText = document.getElementById("streak");
const saveError = document.getElementById("save-error");
const leaderboardScreen = document.getElementById("leaderboard-screen");
const leaderboardButton = document.getElementById("leaderboard-button");
const leaderboardMessage = document.getElementById("leaderboard-message");
const leaderboardList = document.getElementById("leaderboard-list");
const weakTopicsScreen = document.getElementById("weak-topics-screen");
const weakTopicsButton = document.getElementById("weak-topics-button");
const weakTopicsMessage = document.getElementById("weak-topics-message");
const weakTopicsList = document.getElementById("weak-topics-list");

const notice = document.getElementById("notice");
const startLoading = document.getElementById("start-loading");
const challengeCard = document.getElementById("challenge-card");
const topicBox = document.getElementById("topic-box");
const challengeResult = document.getElementById("challenge-result");
const challengeButton = document.getElementById("challenge-button");
const challengeMessage = document.getElementById("challenge-message");
const challengeLink = document.getElementById("challenge-link");

// Messages for problems, in plain Malayalam
const NO_INTERNET = "ഇന്റർനെറ്റ് കണക്ഷൻ ഇല്ല. കണക്ഷൻ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.";
const SOMETHING_WRONG = "എന്തോ പിശക് സംഭവിച്ചു. കുറച്ച് കഴിഞ്ഞ് വീണ്ടും ശ്രമിക്കുക.";
const OFFLINE_NOTICE = "ഇന്റർനെറ്റ് ഇല്ല. സ്കോർ സേവ് ചെയ്യാനും ലീഡർബോർഡ് കാണാനും ഇന്റർനെറ്റ് വേണം.";

// A short code for a question, made from its text.
// Challenge links use these codes, so adding or moving questions does not break old links.
function questionKey(q) {
  let h = 2166136261;
  for (let i = 0; i < q.question.length; i++) {
    h ^= q.question.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

// Keep the challenge safe while the player goes to Google to log in.
// Storage can fail in private mode, so we try and carry on if it does.
function rememberChallenge(challenge) {
  try {
    if (challenge) {
      sessionStorage.setItem("challenge", JSON.stringify(challenge));
    } else {
      sessionStorage.removeItem("challenge");
    }
  } catch (e) {
    // no storage: the challenge lasts only while this page is open
  }
}

// Read a challenge from the link (?q=...&s=...&n=...), or from before the login
function readChallenge() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("q")) {
    const keys = params.get("q").split(".").slice(0, QUESTIONS_PER_ROUND);
    const score = parseInt(params.get("s"), 10);
    const challenge = {
      keys: keys,
      score: score >= 0 && score <= keys.length ? score : 0,
      name: (params.get("n") || "").slice(0, 30)
    };
    rememberChallenge(challenge);
    // Clean the address bar
    history.replaceState(null, "", window.location.pathname);
    return challenge;
  }
  try {
    return JSON.parse(sessionStorage.getItem("challenge"));
  } catch (e) {
    return null;
  }
}

pendingChallenge = readChallenge();

// If Google or Supabase sent us back with a login error, remember it
// and clean the address bar
const loginFailed = /(^|[#?&])error=/.test(window.location.hash) ||
  /(^|[#?&])error=/.test(window.location.search);
if (loginFailed) {
  history.replaceState(null, "", window.location.pathname);
}

// Connect to Supabase. If the library did not load (no internet), skip it.
const supabaseClient = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

// Show one screen and hide the others
function showScreen(screen) {
  startScreen.hidden = screen !== startScreen;
  questionScreen.hidden = screen !== questionScreen;
  resultScreen.hidden = screen !== resultScreen;
  leaderboardScreen.hidden = screen !== leaderboardScreen;
  weakTopicsScreen.hidden = screen !== weakTopicsScreen;
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
  activeChallenge = null;
  if (pendingChallenge) {
    // A friend's challenge: the same questions, in the same order
    roundQuestions = challengeQuestions(pendingChallenge);
    roundTopic = "challenge";
    activeChallenge = pendingChallenge;
    pendingChallenge = null;
    rememberChallenge(null);
    showChallengeCard();
  }
  if (!activeChallenge || roundQuestions.length === 0) {
    activeChallenge = null;
    // Skip questions that are not checked yet
    // Keep only the chosen topic, unless "all" is chosen
    const topic = topicSelect.value;
    roundTopic = topic;
    const ready = QUESTIONS.filter(function (q) {
      return q.checked !== false && (topic === "all" || q.topic === topic);
    });
    roundQuestions = shuffle(ready).slice(0, QUESTIONS_PER_ROUND);
  }
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
  lastScore = score;
  saveRound(score);
  showChallengeResult(score);

  // Reset the Challenge a friend area for this new result
  challengeMessage.hidden = true;
  challengeLink.hidden = true;

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

// Turn a database error into a short Malayalam reason
function reasonFor(error) {
  const text = (error && error.message) || "";
  const isNetwork = !navigator.onLine || /fetch|network|load failed/i.test(text);
  if (text) {
    console.error(text); // keep the real error for us in the browser console
  }
  return isNetwork ? NO_INTERNET : SOMETHING_WRONG;
}

// Show or hide the "no internet" bar at the top
function updateOnlineNotice() {
  notice.textContent = OFFLINE_NOTICE;
  notice.hidden = navigator.onLine;
}

// Save the finished round to the database
function saveRound(score) {
  saveError.hidden = true;
  if (!supabaseClient || !currentUser) {
    return;
  }

  // One item per question: was it right or wrong?
  const details = roundQuestions.map(function (q, i) {
    const choice = answers[i];
    return {
      question: q.question,
      topic: q.topic,
      choice: choice,      // null = time ran out
      answer: q.answer,
      correct: choice === q.answer
    };
  });

  // user_id is filled in by the database from the login
  supabaseClient.from("rounds").insert({
    topic: roundTopic,
    score: score,
    total: roundQuestions.length,
    answers: details
  }).then(function (result) {
    if (result.error) {
      saveError.textContent = "ഈ റൗണ്ട് സേവ് ചെയ്യാനായില്ല. " + reasonFor(result.error);
      saveError.hidden = false;
      return;
    }
    loadStreak();
  });
}

// Ask the database for the daily streak and show it
function loadStreak() {
  if (!supabaseClient || !currentUser) {
    return;
  }
  streakText.textContent = "സ്ട്രീക്ക് ലോഡ് ചെയ്യുന്നു…";
  streakText.hidden = false;
  supabaseClient.rpc("my_streak").then(function (result) {
    if (result.error) {
      streakText.textContent = "സ്ട്രീക്ക് ലോഡ് ചെയ്യാനായില്ല. " + reasonFor(result.error);
      return;
    }
    const days = result.data;
    streakText.textContent = days > 0
      ? "🔥 തുടർച്ചയായി " + days + " ദിവസം"
      : "ഇന്ന് ഒരു റൗണ്ട് കളിച്ച് സ്ട്രീക്ക് തുടങ്ങൂ!";
    streakText.hidden = false;
  });
}

// Find the challenge questions in our question bank, in the link's order
function challengeQuestions(challenge) {
  const found = [];
  challenge.keys.forEach(function (key) {
    const q = QUESTIONS.find(function (item) {
      return questionKey(item) === key && item.checked !== false;
    });
    if (q) {
      found.push(q);
    }
  });
  return found;
}

// On the start screen: show the friend's score to beat
function showChallengeCard() {
  if (!pendingChallenge) {
    challengeCard.hidden = true;
    topicBox.hidden = false;
    startButton.textContent = "തുടങ്ങാം";
    return;
  }
  if (challengeQuestions(pendingChallenge).length === 0) {
    // None of the questions exist any more
    challengeCard.textContent = "ഈ വെല്ലുവിളി ലിങ്ക് ഇനി പ്രവർത്തിക്കില്ല. സാധാരണ റൗണ്ട് കളിക്കാം.";
    challengeCard.hidden = false;
    pendingChallenge = null;
    rememberChallenge(null);
    return;
  }
  const name = pendingChallenge.name || "നിങ്ങളുടെ സുഹൃത്ത്";
  challengeCard.textContent = "⚔️ " + name + " നിങ്ങളെ വെല്ലുവിളിക്കുന്നു! സ്കോർ " +
    pendingChallenge.score + " / " + pendingChallenge.keys.length + ". ഇത് മറികടക്കാമോ?";
  challengeCard.hidden = false;
  topicBox.hidden = true;
  startButton.textContent = "വെല്ലുവിളി സ്വീകരിക്കുക";
}

// On the result screen after a challenge: who won?
function showChallengeResult(score) {
  if (!activeChallenge) {
    challengeResult.hidden = true;
    return;
  }
  const name = activeChallenge.name || "സുഹൃത്ത്";
  const theirs = activeChallenge.score;
  let text;
  if (score > theirs) {
    text = "🎉 നിങ്ങൾ ജയിച്ചു! നിങ്ങൾ " + score + ", " + name + " " + theirs + ".";
  } else if (score === theirs) {
    text = "🤝 സമനില! രണ്ടുപേർക്കും " + score + ".";
  } else {
    text = name + " ജയിച്ചു (" + theirs + "). നിങ്ങൾക്ക് " + score + ". വീണ്ടും ശ്രമിക്കൂ!";
  }
  challengeResult.textContent = text;
  challengeResult.hidden = false;
}

// Make a link with these same questions and my score, then share or copy it
function challengeFriend() {
  const keys = roundQuestions.map(questionKey).join(".");
  const name = currentUser ? firstName(currentUser) : "";
  const base = window.location.href.split("#")[0].split("?")[0];
  const link = base + "?q=" + keys + "&s=" + lastScore +
    "&n=" + encodeURIComponent(name);
  const text = name + " നിങ്ങളെ PSC Quiz Battle-ൽ വെല്ലുവിളിക്കുന്നു! സ്കോർ " +
    lastScore + " / " + roundQuestions.length + ". മറികടക്കാമോ?";

  // Show the link, so it can always be copied by hand
  challengeLink.value = link;
  challengeLink.hidden = false;

  // On phones: open the share menu (WhatsApp and others)
  if (navigator.share) {
    navigator.share({ title: "PSC Quiz Battle", text: text, url: link })
      .catch(function () {
        // The player closed the share menu: the link is still shown
      });
    return;
  }
  // On laptops: copy the link
  if (navigator.clipboard) {
    navigator.clipboard.writeText(link).then(function () {
      challengeMessage.textContent = "ലിങ്ക് കോപ്പി ചെയ്തു. സുഹൃത്തിന് അയക്കൂ!";
      challengeMessage.hidden = false;
    }).catch(function () {
      showCopyByHand();
    });
    return;
  }
  showCopyByHand();
}

// Copying did not work: ask the player to copy the link themselves
function showCopyByHand() {
  challengeMessage.textContent = "ഈ ലിങ്ക് കോപ്പി ചെയ്ത് സുഹൃത്തിന് അയക്കൂ:";
  challengeMessage.hidden = false;
  challengeLink.select();
}

// Make one list row: name or topic on the left, value on the right
function makeRow(name, value) {
  const row = document.createElement("li");
  row.className = "score-row";
  row.appendChild(makeLine("span", "row-name", name));
  row.appendChild(makeLine("span", "row-value", value));
  return row;
}

// Show today's top 10. The database sends only first names and scores.
function showLeaderboard() {
  leaderboardList.innerHTML = "";
  leaderboardMessage.textContent = "ലോഡ് ചെയ്യുന്നു…";
  showScreen(leaderboardScreen);

  supabaseClient.rpc("todays_top10").then(function (result) {
    if (result.error) {
      leaderboardMessage.textContent = "ലോഡ് ചെയ്യാനായില്ല. " + reasonFor(result.error);
      return;
    }
    const rows = result.data;
    leaderboardMessage.textContent = rows.length === 0
      ? "ഇന്ന് ആരും കളിച്ചിട്ടില്ല. ആദ്യം നിങ്ങളാകൂ!"
      : "";
    rows.forEach(function (r, i) {
      const name = (i + 1) + ". " + (r.first_name || "കളിക്കാരൻ");
      leaderboardList.appendChild(makeRow(name, r.score + " / " + r.total));
    });
  });
}

// Show my topics, lowest percent correct first
function showWeakTopics() {
  weakTopicsList.innerHTML = "";
  weakTopicsMessage.textContent = "ലോഡ് ചെയ്യുന്നു…";
  showScreen(weakTopicsScreen);

  supabaseClient.rpc("my_topic_stats").then(function (result) {
    if (result.error) {
      weakTopicsMessage.textContent = "ലോഡ് ചെയ്യാനായില്ല. " + reasonFor(result.error);
      return;
    }
    const rows = result.data;
    weakTopicsMessage.textContent = rows.length === 0
      ? "ഒരു റൗണ്ട് കളിച്ചാൽ ഇവിടെ കാണാം."
      : "";
    rows.forEach(function (r) {
      const detail = r.percent + "% (" + r.correct + " / " + r.total + ")";
      weakTopicsList.appendChild(makeRow(r.topic, detail));
    });
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
  startLoading.hidden = true;
  loggedOutBox.hidden = !!user;
  loggedInBox.hidden = !user;
  if (user) {
    userName.textContent = "നമസ്കാരം, " + firstName(user);
    // Wait a moment: Supabase asks us not to call it inside its login event
    setTimeout(loadStreak, 0);
  } else {
    streakText.hidden = true;
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
    showLoginError("ലോഗിൻ ലോഡ് ആയില്ല. " + NO_INTERNET + " പിന്നെ പേജ് റീലോഡ് ചെയ്യുക.");
    return;
  }
  if (!navigator.onLine) {
    showLoginError(NO_INTERNET);
    return;
  }
  loginError.hidden = true;
  supabaseClient.auth.signInWithOAuth({
    provider: "google",
    // Come back to this page, without any old "#..." or "?..." part
    options: { redirectTo: window.location.href.split("#")[0].split("?")[0] }
  }).then(function (result) {
    if (result.error) {
      showLoginError("ലോഗിൻ പരാജയപ്പെട്ടു. " + reasonFor(result.error));
    }
  });
}

// Log out and go back to the start screen
function logOut() {
  supabaseClient.auth.signOut().then(function (result) {
    if (result.error) {
      notice.textContent = "ലോഗ് ഔട്ട് ചെയ്യാനായില്ല. " + reasonFor(result.error);
      notice.hidden = false;
      return;
    }
    showLoginState(null);
    showScreen(startScreen);
  });
}

// Watch for log in and log out (also runs once when the page opens)
function setUpLogin() {
  if (!supabaseClient) {
    // The login library did not load: say so right away
    showLoginState(null);
    showLoginError("ലോഗിൻ ലോഡ് ആയില്ല. " + NO_INTERNET + " പിന്നെ പേജ് റീലോഡ് ചെയ്യുക.");
    return;
  }
  if (loginFailed) {
    showLoginError("ലോഗിൻ പൂർത്തിയായില്ല. വീണ്ടും ശ്രമിക്കുക.");
  }
  supabaseClient.auth.onAuthStateChange(function (event, session) {
    showLoginState(session ? session.user : null);
  });
}

fillTopics();
showChallengeCard();
setUpLogin();
// Watch the internet connection
updateOnlineNotice();
window.addEventListener("online", updateOnlineNotice);
window.addEventListener("offline", updateOnlineNotice);
loginButton.addEventListener("click", logIn);
logoutButton.addEventListener("click", logOut);
startButton.addEventListener("click", startRound);
challengeButton.addEventListener("click", challengeFriend);
challengeLink.addEventListener("focus", function () {
  challengeLink.select();
});
leaderboardButton.addEventListener("click", showLeaderboard);
weakTopicsButton.addEventListener("click", showWeakTopics);
// Every Back button returns to the start screen
document.querySelectorAll(".back-button").forEach(function (b) {
  b.addEventListener("click", function () {
    showScreen(startScreen);
  });
});
// Try again: a new round in a new order
tryAgainButton.addEventListener("click", startRound);
