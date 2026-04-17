// basic calculator @2026

// arithmetic
function add(x, y) { return x + y; }
function subtract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
// (!) ensure divide by zero is handled
function divide(x, y) {return x / y; }


function operate(operand1, operator, operand2) {
    // convert operand strings to numbers
    operand1 = Number(operand1);
    operand2 = Number(operand2);

    // execute appropriate operation
    switch(operator) {
        case "+":
            return add(operand1, operand2);
        case "-":
            return subtract(operand1, operand2);
        case "*":
            return multiply(operand1, operand2);
        case "/":
            return divide(operand1, operand2);
        default:
            return "UNKNOWN";
    }
}

// inputs (operands and operators)
const inputs = [];


function main() {
    if (inputs.length == 3) {
        result = operate(inputs[0], inputs[1], inputs[2]);
        // empty array
        inputs.length = 0;
        // add result
        inputs.push(result);
    }
}