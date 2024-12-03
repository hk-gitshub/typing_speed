const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Sphinx of black quartz, judge my vow.",
    "Pack my box with five dozen liquor jugs.",
    "How vexingly quick daft zebras jump!"
  ];
  
  let timer = 30; // Set the timer to 30 seconds
  let interval; // Store the interval
  let startTime; // Start time of the test
  const btn = document.getElementById("start-btn"); 
  const retryBtn = document.getElementById("retry-btn"); 
  const inputField = document.getElementById("input");
  const sentenceElement = document.getElementById("sentence");
  const resultElement = document.getElementById("result");
  
  
  // Select a random sentence
  function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
  }
  
  btn.addEventListener("click", startTest);
  retryBtn.addEventListener("click", resetTest);
  
  function startTest() {
      timer=10;
    inputField.disabled = false;
    inputField.value = ""; // Clear the input field
    sentenceElement.textContent = getRandomSentence(); // Display random sentence
    btn.disabled = true; // Disable start button
    resultElement.style.display = "none"; // Hide result
  
    startTime = new Date().getTime(); // Get the start time
    updateTimerDisplay();
  
    // Start the countdown
    interval = setInterval(() => {
      timer--;
      if (timer < 0) {
        clearInterval(interval); // Stop timer
        testResult(); // Calculate result
      } else {
        updateTimerDisplay();
      }
    }, 1000);
  }
  
  function updateTimerDisplay() {
    document.getElementById("timer").textContent = `00 : ${timer < 10 ? '0' : ''}${timer}`;
  }
  
  function testResult() {
    inputField.disabled = true; // Disable input field
    // btn.disabled = false; // Enable start button
    resultElement.style.display = "block"; // Show result
  
    // Calculate typing speed (WPM)
    const typedText = inputField.value;
    const elapsedTime = (30 - timer) / 60; // Time in minutes
    const wordsTyped = typedText.split(" ").length;
    const wpm = Math.round(wordsTyped / elapsedTime);
    document.getElementById("speed").textContent = wpm;
  
    // Calculate accuracy
    const sentenceText = sentenceElement.textContent;
    const correctChars = typedText.split("").filter((char, index) => char === sentenceText[index]).length;
    const accuracy = Math.round((correctChars / sentenceText.length) * 100);
    document.getElementById("accuracy").textContent = accuracy;
  }
  
  function resetTest() {
    clearInterval(interval); // Clear any running timer
    inputField.disabled = true; // Disable input field
    btn.disabled = false; // Enable start button
    inputField.value = ""; // Clear input field
    resultElement.style.display = "none"; // Hide result
    document.getElementById("timer").textContent = ""; // Clear timer display
  }