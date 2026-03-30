const result = document.getElementById("result");

function appendValue(value) {
    const lastChar = result.value.slice(-1);

    // prevent double operators
    if ("+-*/".includes(value) && "+-*/".includes(lastChar)) {
        return;
    }

    result.value += value;
}

function clearResult() {
    result.value = "";
}

function deleteLast() {
    result.value = result.value.slice(0, -1);
}

function calculate() {

    let expression = result.value;

    try {

        let answer = eval(expression);

        if (!isFinite(answer)) {
            result.value = "Error";
            return;
        }

        let history = document.getElementById("history");

        let entry = document.createElement("div");
        entry.textContent = expression + " = " + answer;

        history.appendChild(entry);

        result.value = answer;
        if (history.children.length > 10) {
    history.removeChild(history.firstChild);
}
    } catch {
        result.value = "Error";
    }
}

document.addEventListener("keydown", function (event) {

    if (!isNaN(event.key)) {
        appendValue(event.key);
    }

    if (["+", "-", "*", "/", "."].includes(event.key)) {
        appendValue(event.key);
    }

    if (event.key === "Enter") {
        calculate();
    }

    if (event.key === "Backspace") {
        deleteLast();
    }

    if (event.key === "Escape") {
        clearResult();
    }
});