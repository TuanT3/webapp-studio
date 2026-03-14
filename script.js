const button = document.getElementById("testButton");
const message = document.getElementById("message");

button.addEventListener("click", () => {
  message.textContent = "Funziona! Il tuo JavaScript è collegato correttamente.";
});
