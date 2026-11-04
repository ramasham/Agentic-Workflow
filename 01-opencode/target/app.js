let count = 0;

const display = document.getElementById("count");
const button = document.getElementById("increase");
const resetButton = document.getElementById("reset");

button.addEventListener("click", function () {
    count++;
    display.textContent = count;
});

resetButton.addEventListener("click", function () {
    count = 0;
    display.textContent = count;
});
