const displayMain = document.getElementById("displayMain");
const displaySub = document.getElementById("displaySub");

const OPERATOR_SYMBOLS = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
};

let currentValue = "0";
let previousValue = null;
let pendingOperator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  displayMain.textContent = formatForDisplay(currentValue);
  displaySub.textContent =
    previousValue !== null && pendingOperator
      ? `${formatForDisplay(previousValue)} ${OPERATOR_SYMBOLS[pendingOperator]}`
      : "";
}

function formatForDisplay(value) {
  if (value === "Error") return value;
  const num = Number(value);
  if (Number.isNaN(num)) return "0";
  return num.toLocaleString("ja-JP", { maximumFractionDigits: 8 });
}

function inputNumber(digit) {
  if (currentValue === "Error" || shouldResetDisplay) {
    currentValue = digit === "." ? "0." : digit;
    shouldResetDisplay = false;
    return;
  }
  if (currentValue === "0" && digit !== ".") {
    currentValue = digit;
    return;
  }
  currentValue += digit;
}

function inputDecimal() {
  if (currentValue === "Error" || shouldResetDisplay) {
    currentValue = "0.";
    shouldResetDisplay = false;
    return;
  }
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
}

function clearAll() {
  currentValue = "0";
  previousValue = null;
  pendingOperator = null;
  shouldResetDisplay = false;
}

function toggleSign() {
  if (currentValue === "Error") return;
  if (currentValue !== "0") {
    currentValue = currentValue.startsWith("-")
      ? currentValue.slice(1)
      : "-" + currentValue;
  }
}

function applyPercent() {
  if (currentValue === "Error") return;
  currentValue = String(Number(currentValue) / 100);
}

function compute(a, b, operator) {
  switch (operator) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
}

function setOperator(operator) {
  if (currentValue === "Error") return;

  if (pendingOperator && !shouldResetDisplay) {
    calculateResult();
    previousValue = displayMain.textContent === "Error" ? null : currentValue;
  } else {
    previousValue = currentValue;
  }

  pendingOperator = operator;
  shouldResetDisplay = true;
}

function calculateResult() {
  if (pendingOperator === null || previousValue === null) return;

  const a = Number(previousValue);
  const b = Number(currentValue);
  const result = compute(a, b, pendingOperator);

  if (Number.isNaN(result) || !Number.isFinite(result)) {
    currentValue = "Error";
  } else {
    currentValue = String(Math.round(result * 1e8) / 1e8);
  }

  pendingOperator = null;
  previousValue = null;
  shouldResetDisplay = true;
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const { number, action } = button.dataset;

    if (number !== undefined) {
      inputNumber(number);
    } else if (action in OPERATOR_SYMBOLS) {
      setOperator(action);
    } else {
      switch (action) {
        case "clear":
          clearAll();
          break;
        case "sign":
          toggleSign();
          break;
        case "percent":
          applyPercent();
          break;
        case "decimal":
          inputDecimal();
          break;
        case "equal":
          calculateResult();
          break;
      }
    }

    updateDisplay();
  });
});

document.addEventListener("keydown", (event) => {
  const { key } = event;

  if (/^[0-9]$/.test(key)) {
    inputNumber(key);
  } else if (key === ".") {
    inputDecimal();
  } else if (key === "+") {
    setOperator("add");
  } else if (key === "-") {
    setOperator("subtract");
  } else if (key === "*") {
    setOperator("multiply");
  } else if (key === "/") {
    event.preventDefault();
    setOperator("divide");
  } else if (key === "Enter" || key === "=") {
    calculateResult();
  } else if (key === "Backspace") {
    if (currentValue.length > 1) {
      currentValue = currentValue.slice(0, -1);
    } else {
      currentValue = "0";
    }
  } else if (key === "Escape") {
    clearAll();
  } else {
    return;
  }

  updateDisplay();
});

updateDisplay();
