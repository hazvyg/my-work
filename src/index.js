const form = document.querySelector("#poem-generator");
const poemElement = document.querySelector("#poem");
const instructionsInput = document.querySelector("#user-instructions");
const errorMessage = document.querySelector("#error-message");
const submitButton = document.querySelector('input[type="submit"]');

// API Configuration
const apiKey = "5af0c133bfa709dct64aabc68f1ao404";
const baseUrl = "https://api.shecodes.io/ai/v1/generate";

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 5000);
}

function setLoading(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.value = isLoading ? "Generating..." : "Generate Poem";
  poemElement.classList.toggle("generating", isLoading);

  if (isLoading) {
    poemElement.innerHTML = "Creating your masterpiece...";
  }
}

function displayPoem(response) {
  console.log("Poem generated:", response.data);

  poemElement.classList.remove("generating");

  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    delay: 30,
    cursor: "",
    onComplete: (typewriter) => {
      submitButton.disabled = false;
    },
  });
}

function generatePoem(event) {
  event.preventDefault();

  const topic = instructionsInput.value.trim();

  if (!topic) {
    showError("Please enter a topic for your poem");
    return;
  }

  setLoading(true);

  const prompt = `Generate a beautiful poem about ${topic}. Make it romantic and creative. Sign it with "SheCodes AI"`;
  const context = "romantic and creative poetry";
  const apiUrl = `${baseUrl}?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  console.log("Generating poem:", {
    topic,
    prompt,
    context,
  });

  axios
    .get(apiUrl)
    .then(displayPoem)
    .catch((error) => {
      console.error("Error generating poem:", error);
      showError("Failed to generate poem. Please try again.");
      setLoading(false);
    });
}

// Event Listeners
form.addEventListener("submit", generatePoem);

// Prevent multiple submissions while generating
instructionsInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && submitButton.disabled) {
    event.preventDefault();
  }
});
