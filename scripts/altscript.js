const buttons = document.querySelectorAll('.btn');
const opDisplay = document.querySelector('#op-display');
const resultDisplay = document.querySelector("#result-display");
const clearbBtn = document.querySelector('.clear-btn');
const delBtn = document.querySelector('.delete-btn');
const evalBtn = document.querySelector('.submit-btn');
const opBtn = document.querySelectorAll('.opbtn');
const decimalBtn = document.querySelector('.dotbtn');
let nArr = [];
let oArr = [];


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
//o2 = Second Operand
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


// Get the buttons.


buttons.forEach(button => button.addEventListener('click', updateD));
opBtn.forEach(opButton => opButton.addEventListener('click', (e) => handleOpEvents(e)));
clearbBtn.addEventListener('click', (e) => {
    opDisplay.textContent = "";
    nArr = [];
    oArr = [];
    resultDisplay.textContent = "";
})
delBtn.addEventListener('click', (e) => {

    if (nArr.length == 2) {
        let tempArr = nArr[1].split('');
        tempArr.pop();
        tempArr.length == 0 ? nArr.pop() : nArr[1] = tempArr.join('');
    } else if (nArr.length == 1 && oArr.length == 1) {
        oArr.pop();
    } else if (nArr.length == 1 && oArr.length == 0) {

        let tempArr = nArr[0].split('');
        tempArr.pop();
        tempArr.length == 0 ? nArr.pop() : nArr[0] = tempArr.join('');
    } else {
        return;
    }
    opDisplay.textContent = opDisplay.textContent.replace(/.$/,"");
});

evalBtn.addEventListener('click', (e) => {
    if (nArr.length !== 2) {
         return;
    }
    calculate(e);

});
decimalBtn.addEventListener('click', (e) => {
    let findDot = nArr.join('').match(/\.\d+|\.$/g);
    if (!findDot) {  //Inserts "." if no dot is present in the op string;
        console.log('here');
        updateD(e);
    } else if (findDot.length < 2 && oArr.length == 1) { //Allow dot insertion on the second operand.
        console.log('there');
        updateD(e);
    } else {
        return;
    }
});

function calculate (e) {

    if (nArr[1] == 0 && oArr[0] == "/") {        //Catches Division by Zero
        opDisplay.textContent = opDisplay.textContent.replace(/.$/,"");
        nArr.pop();
        resultDisplay.textContent = "DIVISION BY ZERO ISN'T ALLOWED";
        return;
    }
    console.log(oArr);
    const operation  = operate(nArr[0],nArr[1],oArr[0]);
    opDisplay.textContent = `${nArr[0]}${oArr[0]}${nArr[1]}${e.target.textContent == '=' ? '=' : ''}`;
    resultDisplay.textContent = operation;
    nArr[0] = `${operation}`;
    nArr.pop();
    oArr.pop();
    return operation;
}

function updateD (e) {
    if (e.target.className === 'btn' && opDisplay.textContent.includes('=')) { 
        return;
    }
    if (oArr.length == 0 && nArr.length == 0) {
        nArr.push(e.target.textContent);
    } else if (oArr.length == 0 && nArr.length === 1) {
        nArr[0] += e.target.textContent;
    } else if (oArr.length === 1 && nArr.length === 1) {
        nArr.push(e.target.textContent);
    } else if (nArr.length === 2) {
        nArr[1] += e.target.textContent;
    } else {
        console.log('hello');
        return;
    }

    opDisplay.textContent += `${e.target.textContent}`;
    console.log(e.target.textContent);
}

function handleOpEvents(e) {
    
    if(opDisplay.textContent.includes("=")) {
        opDisplay.textContent = `${nArr[0]}${e.target.textContent}`;
        oArr.push(e.target.textContent);
        return;
    }
    
    let operandCount = nArr.length;
    let operatorCount = oArr.length;
    switch(true) {
        case (!operandCount && !operatorCount): 
        
            if (e.target.textContent == '-'){
                nArr.push('-')
                opDisplay.textContent += `${e.target.textContent}`;
            } else {
                nArr.push(0);
                oArr.push(e.target.textContent);
                opDisplay.textContent += `0${e.target.textContent}`;
            }
            break;
            
        case (!operatorCount && operandCount === 1): 
        
            oArr.push(e.target.textContent);
            opDisplay.textContent += `${e.target.textContent}`;
            break;
            
        case (operatorCount === 1 && operandCount === 1 && e.target.textContent == '-'):
        
            nArr.push('-');
            opDisplay.textContent += `${e.target.textContent}`;
            break;
        
        case (operandCount == 2 && operatorCount == 1): 
            console.log('hello');
            const result = calculate(e);
            oArr.push(e.target.textContent);
            opDisplay.textContent = `${result}${e.target.textContent}`;
        
    }
}