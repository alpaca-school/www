"use strict";

const DEFAULT_PRACTICE_SECONDS = 30;
const ALLOWED_DURATIONS = new Set([30, 60, 180, 300, 600]);
const PREPARATION_SECONDS = 3;
const START_DISPLAY_MILLISECONDS = 550;
const PASSING_ACCURACY = 80;
const TARGET_WINDOW_STEP = 100;
const TARGET_WINDOW_SIZE = 150;
const PRACTICE_SENTENCES = [
  "きょうはいいてんきです。",
  "パソコンをつかって、できることをひとつずつふやしていきましょう。",
  "あせらずに、ただしくもじをうつことがたいせつです。",
  "まちがえてもだいじょうぶ。ゆっくりくりかえすと、ゆびがキーボードのばしょをおぼえていきます。",
  "あさのひかりがへやにはいると、あたらしいいちにちがはじまります。",
  "つかれたときは、かたのちからをぬいて、いちどしんこきゅうをしましょう。",
  "ただしくうてたもじがふえるたびに、じしんもすこしずつそだっていきます。",
  "みじかいれんしゅうでも、まいにちつづけることがじょうたつへのちかみちです。",
  "がめんとキーボードをゆっくりみくらべながら、じぶんのペースですすめましょう。",
  "できたことをひとつみつけて、きょうのがんばりをじぶんでほめてあげましょう。",
];
const TARGET_TEXT = Array.from({ length: 16 }, () => PRACTICE_SENTENCES.join("")).join("");

const elements = {
  startScreen: document.querySelector("#start-screen"),
  practiceScreen: document.querySelector("#practice-screen"),
  resultScreen: document.querySelector("#result-screen"),
  nameForm: document.querySelector("#name-form"),
  durationInputs: document.querySelectorAll('input[name="practiceDuration"]'),
  learnerName: document.querySelector("#learner-name"),
  nameError: document.querySelector("#name-error"),
  practiceName: document.querySelector("#practice-name"),
  practiceDuration: document.querySelector("#practice-duration"),
  targetText: document.querySelector("#target-text"),
  typingInput: document.querySelector("#typing-input"),
  liveTyped: document.querySelector("#live-typed"),
  liveStatus: document.querySelector("#live-status"),
  preparationOverlay: document.querySelector("#preparation-overlay"),
  preparationCount: document.querySelector("#preparation-count"),
  timerValue: document.querySelector("#timer-value"),
  timerTrack: document.querySelector(".timer-track"),
  timerBar: document.querySelector("#timer-bar"),
  resultBanner: document.querySelector("#result-banner"),
  resultTitle: document.querySelector("#result-title"),
  resultMessage: document.querySelector("#result-message"),
  resultDuration: document.querySelector("#result-duration"),
  scoreAccuracy: document.querySelector("#score-accuracy"),
  scoreTyped: document.querySelector("#score-typed"),
  scoreCorrect: document.querySelector("#score-correct"),
  scoreSpeed: document.querySelector("#score-speed"),
  passContent: document.querySelector("#pass-content"),
  retryContent: document.querySelector("#retry-content"),
  retryMessage: document.querySelector("#retry-message"),
  certificateName: document.querySelector("#certificate-name"),
  certificateAccuracy: document.querySelector("#certificate-accuracy"),
  certificateSpeed: document.querySelector("#certificate-speed"),
  certificateDate: document.querySelector("#certificate-date"),
  certificateNumber: document.querySelector("#certificate-number"),
  certificateDuration: document.querySelector("#certificate-duration"),
  printButton: document.querySelector("#print-button"),
  retryButton: document.querySelector("#retry-button"),
  retryFailButton: document.querySelector("#retry-fail-button"),
  changeNameButton: document.querySelector("#change-name-button"),
  changeNameFailButton: document.querySelector("#change-name-fail-button"),
};

let learnerName = "";
let practiceSeconds = DEFAULT_PRACTICE_SECONDS;
let timerId = null;
let preparationTimerId = null;
let preparationTimeoutId = null;
let deadline = 0;
let roundFinished = false;

function toCharacters(value) {
  return Array.from(value.replace(/\r\n/g, "\n"));
}

const targetCharacters = toCharacters(TARGET_TEXT);
elements.typingInput.maxLength = targetCharacters.length;

function renderTarget(typedCharacters = []) {
  const fragment = document.createDocumentFragment();
  const currentIndex = typedCharacters.length;
  const sectionStart = Math.floor(currentIndex / TARGET_WINDOW_STEP) * TARGET_WINDOW_STEP;
  const windowStart = Math.max(0, sectionStart - 10);
  const windowEnd = Math.min(windowStart + TARGET_WINDOW_SIZE, targetCharacters.length);

  targetCharacters.slice(windowStart, windowEnd).forEach((character, offset) => {
    const index = windowStart + offset;
    const span = document.createElement("span");
    span.className = "target-char";
    span.textContent = character;

    if (index < typedCharacters.length) {
      span.classList.add(typedCharacters[index] === character ? "is-correct" : "is-incorrect");
    } else if (index === typedCharacters.length && !roundFinished) {
      span.classList.add("is-current");
    }

    fragment.append(span);
  });

  elements.targetText.replaceChildren(fragment);
  elements.targetText.setAttribute(
    "aria-label",
    `入力する見本文。現在の部分：${targetCharacters.slice(windowStart, windowEnd).join("")}`,
  );
}

function compareText(value) {
  const typedCharacters = toCharacters(value);
  let correctCharacters = 0;

  typedCharacters.forEach((character, index) => {
    if (character === targetCharacters[index]) {
      correctCharacters += 1;
    }
  });

  const exactAccuracy = typedCharacters.length
    ? (correctCharacters / typedCharacters.length) * 100
    : 0;
  const accuracy = Math.floor(exactAccuracy);

  return {
    typedCharacters,
    typedCount: typedCharacters.length,
    correctCount: correctCharacters,
    accuracy,
    exactAccuracy,
  };
}

function showScreen(screen) {
  [elements.startScreen, elements.practiceScreen, elements.resultScreen].forEach((item) => {
    item.hidden = item !== screen;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateComparison() {
  const comparison = compareText(elements.typingInput.value);
  elements.liveTyped.textContent = comparison.typedCount;
  renderTarget(comparison.typedCharacters);
}

function updateTimer() {
  const millisecondsLeft = Math.max(0, deadline - performance.now());
  const secondsLeft = Math.ceil(millisecondsLeft / 1000);
  const progress = millisecondsLeft / (practiceSeconds * 1000);

  elements.timerValue.textContent = formatTimer(secondsLeft);
  elements.timerTrack.setAttribute("aria-valuenow", String(secondsLeft));
  elements.timerBar.style.width = `${progress * 100}%`;
  elements.timerBar.classList.toggle("is-low", secondsLeft <= 10);

  if (millisecondsLeft <= 0) {
    finishRound();
  }
}

function cancelRoundTimers() {
  window.clearInterval(timerId);
  window.clearInterval(preparationTimerId);
  window.clearTimeout(preparationTimeoutId);
  timerId = null;
  preparationTimerId = null;
  preparationTimeoutId = null;
}

function beginTimedRound() {
  const durationLabel = formatDurationLabel(practiceSeconds);
  preparationTimeoutId = null;
  elements.preparationOverlay.hidden = true;
  elements.typingInput.disabled = false;
  elements.liveStatus.textContent = `${durationLabel}の練習を開始しました。`;

  deadline = performance.now() + practiceSeconds * 1000;
  timerId = window.setInterval(updateTimer, 100);
  elements.typingInput.focus({ preventScroll: true });
}

function startPreparation() {
  let secondsLeft = PREPARATION_SECONDS;
  elements.preparationOverlay.hidden = false;
  elements.preparationCount.classList.remove("is-start");
  elements.preparationCount.textContent = secondsLeft;
  elements.liveStatus.textContent = `準備時間です。開始まで${secondsLeft}秒です。`;

  preparationTimerId = window.setInterval(() => {
    secondsLeft -= 1;

    if (secondsLeft > 0) {
      elements.preparationCount.textContent = secondsLeft;
      elements.liveStatus.textContent = `開始まで${secondsLeft}秒です。`;
      return;
    }

    window.clearInterval(preparationTimerId);
    preparationTimerId = null;
    elements.preparationCount.textContent = "スタート！";
    elements.preparationCount.classList.add("is-start");
    elements.liveStatus.textContent = "スタート！";
    preparationTimeoutId = window.setTimeout(beginTimedRound, START_DISPLAY_MILLISECONDS);
  }, 1000);
}

function startRound() {
  cancelRoundTimers();
  roundFinished = false;
  const durationLabel = formatDurationLabel(practiceSeconds);
  elements.typingInput.disabled = true;
  elements.typingInput.value = "";
  elements.liveTyped.textContent = "0";
  elements.timerValue.textContent = formatTimer(practiceSeconds);
  elements.timerTrack.setAttribute("aria-valuemax", String(practiceSeconds));
  elements.timerTrack.setAttribute("aria-valuenow", String(practiceSeconds));
  elements.timerBar.style.width = "100%";
  elements.timerBar.classList.remove("is-low");
  elements.practiceName.textContent = learnerName;
  elements.practiceDuration.textContent = `${durationLabel}チャレンジ`;
  elements.resultDuration.textContent = `${durationLabel}チャレンジ`;
  renderTarget();
  showScreen(elements.practiceScreen);
  startPreparation();
}

function formatTimer(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatDurationLabel(totalSeconds) {
  return totalSeconds < 60 ? `${totalSeconds}秒` : `${totalSeconds / 60}分`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function createCertificateNumber(date) {
  const datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((number, index) => String(number).padStart(index === 0 ? 4 : 2, "0"))
    .join("");
  const uniquePart = String(date.getTime()).slice(-4);
  return `CERTIFICATE NO. TYP-${datePart}-${uniquePart}`;
}

function publishResult(result) {
  // Google スプレッドシート等へ拡張するときは、このイベントの結果データを利用できます。
  window.dispatchEvent(new CustomEvent("typingPracticeComplete", { detail: result }));
}

function finishRound() {
  if (roundFinished) return;

  roundFinished = true;
  window.clearInterval(timerId);
  elements.typingInput.disabled = true;

  const comparison = compareText(elements.typingInput.value);
  const speed = Math.round(comparison.correctCount / (practiceSeconds / 60));
  const passed = comparison.exactAccuracy >= PASSING_ACCURACY;
  const completedAt = new Date();
  const result = Object.freeze({
    learnerName,
    durationSeconds: practiceSeconds,
    typedCharacters: comparison.typedCount,
    correctCharacters: comparison.correctCount,
    accuracy: comparison.accuracy,
    charactersPerMinute: speed,
    passed,
    completedAt: completedAt.toISOString(),
  });

  elements.scoreAccuracy.textContent = comparison.accuracy;
  elements.scoreTyped.textContent = comparison.typedCount;
  elements.scoreCorrect.textContent = comparison.correctCount;
  elements.scoreSpeed.textContent = speed;
  elements.resultBanner.classList.toggle("is-fail", !passed);
  const durationLabel = formatDurationLabel(practiceSeconds);

  if (passed) {
    elements.resultTitle.textContent = "おめでとうございます！";
    elements.resultMessage.textContent = `${learnerName}さん、正確率${comparison.accuracy}%で合格です。小さな一歩を、しっかり形にできました。`;
    elements.certificateName.textContent = `${learnerName} 様`;
    elements.certificateAccuracy.textContent = `${comparison.accuracy}%`;
    elements.certificateSpeed.textContent = `${speed}文字/分`;
    elements.certificateDate.textContent = formatDate(completedAt);
    elements.certificateNumber.textContent = createCertificateNumber(completedAt);
    elements.certificateDuration.textContent = `${durationLabel}チャレンジ`;
    elements.passContent.hidden = false;
    elements.retryContent.hidden = true;
  } else {
    const pointsNeeded = PASSING_ACCURACY - comparison.accuracy;
    elements.resultTitle.textContent = "あと少しです。";
    elements.resultMessage.textContent = `${learnerName}さん、最後まで挑戦できました。あわてず、見本を一文字ずつ確認してみましょう。`;
    elements.retryMessage.textContent = `今回は正確率${comparison.accuracy}%でした。合格まであと${pointsNeeded}ポイントです。`;
    elements.passContent.hidden = true;
    elements.retryContent.hidden = false;
  }

  publishResult(result);
  showScreen(elements.resultScreen);
  elements.resultTitle.focus?.();
}

function returnToStart() {
  cancelRoundTimers();
  elements.preparationOverlay.hidden = true;
  roundFinished = true;
  showScreen(elements.startScreen);
  elements.learnerName.value = learnerName;
  elements.learnerName.focus({ preventScroll: true });
}

elements.nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredName = elements.learnerName.value.trim().replace(/\s+/g, " ");

  if (!enteredName) {
    elements.learnerName.setAttribute("aria-invalid", "true");
    elements.nameError.textContent = "修了証に表示するお名前を入力してください。";
    elements.learnerName.focus();
    return;
  }

  learnerName = enteredName;
  const selectedDuration = Number(
    Array.from(elements.durationInputs).find((input) => input.checked)?.value,
  );
  practiceSeconds = ALLOWED_DURATIONS.has(selectedDuration)
    ? selectedDuration
    : DEFAULT_PRACTICE_SECONDS;
  elements.learnerName.value = enteredName;
  elements.learnerName.removeAttribute("aria-invalid");
  elements.nameError.textContent = "";
  startRound();
});

elements.learnerName.addEventListener("input", () => {
  if (elements.learnerName.value.trim()) {
    elements.learnerName.removeAttribute("aria-invalid");
    elements.nameError.textContent = "";
  }
});

elements.typingInput.addEventListener("input", (event) => {
  if (!event.isComposing) updateComparison();
});

elements.typingInput.addEventListener("compositionend", updateComparison);

elements.typingInput.addEventListener("paste", (event) => {
  event.preventDefault();
  elements.liveStatus.textContent = "貼り付けは使わず、キーボードで入力してみましょう。";
});

elements.printButton.addEventListener("click", () => window.print());
elements.retryButton.addEventListener("click", startRound);
elements.retryFailButton.addEventListener("click", startRound);
elements.changeNameButton.addEventListener("click", returnToStart);
elements.changeNameFailButton.addEventListener("click", returnToStart);

renderTarget();
