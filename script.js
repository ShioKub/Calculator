class Calculator {
    constructor(previousOperandElement , currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0 , -1);
    }

    chooseOperation(operation) {
        if(this.operation !== '') {
            this.operation = undefined;
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(previous) || isNaN(current)){
            return;
        }

        switch (this.operation) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case '*':
                result = previous * current;
                break;
            case '÷':
                result = previous / current;
                break;
            default:
                break;
        }

        this.currentOperand = result;
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')){
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        if(this.operation != null) {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
        else{
            this.previousOperandElement.innerText = this.previousOperand;
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandElement , currentOperandElement);

numberButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener('click' , () => {
    calculator.compute();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click' , () => {
    calculator.delete();
    calculator.updateDisplay();
});

clearButton.addEventListener('click' , () => {
    calculator.clear();
    calculator.updateDisplay();
});