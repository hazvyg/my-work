function generatePoem(event) {
    event.preventDefault();

    new Typewriter("#poem", {
      strings: ["lorem ipsum tada lalalalalallala"],
        autoStart: true,
        delay: 1,
      cursor:"",
    });

    

}
let poemFormElement = document.querySelector("#poem-generator");
poemFormElement.addEventListener("submit", generatePoem);