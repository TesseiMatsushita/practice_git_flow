const display = document.querySelector("#display");
const keys = document.querySelectorAll(".key");

let expression = "";

function updateDisplay(value) {
  display.value = value || "0";
}

function appendValue(value) {
  const lastChar = expression.slice(-1);
  const operators = ["+", "-", "*", "/"];

  if (operators.includes(value) && operators.includes(lastChar)) {
    expression = expression.slice(0, -1) + value;
  } else {
    expression += value;
  }

  updateDisplay(expression);
}

function clearDisplay() {
  expression = "";
  updateDisplay("0");
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay(expression);
}

function calculate() {
  if (!expression) return;

  try {
    const result = Function(`"use strict"; return (${expression})`)();

    if (!Number.isFinite(result)) {
      throw new Error("Invalid calculation");
    }

    expression = String(result);
    updateDisplay(expression);
  } catch {
    expression = "";
    updateDisplay("Error");
  }
}

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.dataset.value;
    const action = key.dataset.action;

    if (value) appendValue(value);
    if (action === "clear") clearDisplay();
    if (action === "delete") deleteLast();
    if (action === "calculate") calculate();
  });
});
