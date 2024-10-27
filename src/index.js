function displayPoem(response){
    console.log("poem generated");

new Typewriter(document.querySelector("#poem"), {
      strings: response.data.answer,
        autoStart: true,
        delay: 1,
      cursor:"",
    });

}
function generatePoem(event) {
    event.preventDefault();

     poemElement.innerHTML = "Generating your poem...";
    

    let instructionsInput = document.querySelector("#user-instructions");
    
    
    let apiKey = "5af0c133bfa709dct64aabc68f1ao404";
    let prompt = `Generate love  poem about ${instructionsInput.value}and sign with <strong>shecode AI</strong>`;
    let context = `romantic and fantasy poems`;
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    console.log("Generating poem");
    console.log('Prompt: ${prompt}');
    console.log('Context:  ${context}');

    axios.get(apiUrl).then(displayPoem);
}


    document
      .querySelector("#poem-generator")
      .addEventListener("submit", generatePoem);
    
