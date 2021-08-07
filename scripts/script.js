//ADD
function add (a,b) {
    return  a + b ;
}
function multiply (a,b) {
    return  a * b ;
}
function divide (a,b) {
    return  a / b ;
}
function subtract (a,b) {
    return  a - b ;
}
//o1 = First Operand
//op = Operator
function operate (o1,o2,op) {
    o1 = +o1;
    o2 = +o2;
    let result;
    switch(op) {
        case "+":
            result = add(o1,o2);
            break;
        case "-":
            result = subtract(o1,o2);
            break;
        case "*":
            result = multiply(o1,o2)
            break;
        case "/":
            result = divide(o1,o2);
    }
    resultDisplay.textContent = result;
    return result;
}

/* Create the functions that populate the display when you click the number buttons… 
you should be storing the ‘display value’ in a variable somewhere for use in the next step.*/

// Get the buttons.

const buttons = document.querySelectorAll('.btn');
const opDisplay = document.querySelector('#op-display');
const resultDisplay = document.querySelector("#result-display");
const clearbBtn = document.querySelector('.clear-btn');
const delBtn = document.querySelector('.delete-btn');
const evalBtn = document.querySelector('.submit-btn');
const opBtn = document.querySelectorAll('.opbtn');
const numberPattern = /\d+/g;
const symbolPattern = /[!@#$%^&*(),.?":{}|<>/+-]/g;
let opString = "";

buttons.forEach(button => button.addEventListener('click', updateD));
opBtn.forEach(opButton => opButton.addEventListener('click', (e) => {
    if(opDisplay.textContent.includes("=")) {
        opDisplay.textContent = `${opString}`;
    }
    let operandCount = opString.match(numberPattern).length;
    let operatorCount = opString.match(symbolPattern);
    if (operandCount === 1 && !operatorCount) updateD(e);
    if (operandCount == 2) {
        updateD(e);
        console.log(opString);
        calculate(e);
    }
}));
clearbBtn.addEventListener('click', (e) => {
    opDisplay.textContent = "";
    opString = "";
    resultDisplay.textContent = "";
})
delBtn.addEventListener('click', (e) => {
    opDisplay.textContent = opDisplay.textContent.replace(/.$/,"");
    opString = opString.replace(/.$/,"");
});

evalBtn.addEventListener('click', calculate);

function calculate (e) {

    let numArray = opString.match(numberPattern);
    let opArray = opString.match(symbolPattern);
    console.log(opArray);
    if (opArray.length === 1) {
        opString = `${operate(numArray[0],numArray[1],opArray[0])}`;
        opDisplay.textContent += " =";
    } else if (opArray.length === 2){
        opString = `${operate(numArray[0],numArray[1],opArray[0])} ${opArray[1]} `;
        opDisplay.textContent = `${opString}`;
    }

}

function updateD (e) {
    opString += e.target.value;
    opDisplay.textContent += `${e.target.textContent}`;
}
