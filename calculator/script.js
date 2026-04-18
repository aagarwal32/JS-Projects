// basic calculator @2026

// arithmetic
function add(x, y) { return x + y; }
function subtract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
// (!) ensure divide by zero is handled
function divide(x, y) {return x / y; }


function execute(operand1, operator, operand2) {
    operand1 = Number(operand1);
    operand2 = Number(operand2);

    let result;
    switch(operator) {
        case "+":
            result = add(operand1, operand2);
            break;
        case "-":
            result = subtract(operand1, operand2);
            break;
        case "x":
            result = multiply(operand1, operand2);
            break;
        case "/":
            result = divide(operand1, operand2);
            break;
        default:
            return "UNKNOWN";
    }
    
    // Round to 2 decimal places
    return parseFloat(result.toFixed(8));
}


function appendOperator(operator, inputs) {
    if (inputs.length === 0 || inputs.length === 2) {
        return inputs;
    } else if (inputs.length === 1) {
        inputs.push(operator);
        inputs.push("_");
    } else if (inputs.length === 3 && inputs.at(2) !== "_"){ // inputs length === 3
        const calculation = execute(inputs[0], inputs[1], inputs[2]);
        inputs = [calculation.toString(), operator, "_"];
    }
    return inputs;
}


function handleDec(inputs) {
    // format properly
    if (inputs.at(-1).includes("_")) {
        inputs[inputs.length - 1] = "0.";
    // number already contains decimal
    } else if (inputs.at(-1).includes(".") || inputs.at(-1).length > 9) {
        return inputs;
    // concat decimal
    } else {
        inputs[inputs.length - 1] = inputs[inputs.length - 1] + ".";
    }
    return inputs;
}


function concatNum(num, inputs) {
    // format properly
    if (inputs.at(-1).includes("_")) {
        inputs[inputs.length - 1] = "";
    } else if (inputs.at(-1).length > 9) {
        return inputs;
    }
    // concat number
    inputs[inputs.length - 1] = inputs[inputs.length - 1] + num;
    return inputs;
}


function route(target, inputs) {
    const text = target.textContent;
    
    // if number
    if (/^[0-9]$/.test(text)) {
        inputs = concatNum(text, inputs);
    }
    // if decimal
    else if (target.classList.contains('dec')) {
        inputs = handleDec(inputs);
    }
    // if operation
    else if (target.classList.contains('op')) {
        inputs = appendOperator(text, inputs);
    }
    // if clear
    else if (target.classList.contains('clear')) {
        inputs = ["_"];
    }
    // if equal
    else if (target.classList.contains('equal')) {
        if (inputs.length === 3) {
            const result = execute(inputs[0], inputs[1], inputs[2]);
            inputs = [result.toString()];
        }
    }
    
    return inputs;
}

function main() {
    let inputs = ["_"];

    const display = document.querySelector("#screen");
    display.textContent = "_"

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            inputs = route(e.target, inputs);
            display.textContent = ""
            for(let input of inputs) {
                display.textContent += input + " ";
            }
        });
    });
}

main();