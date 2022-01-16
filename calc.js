const currentOperand = document.querySelector('[data-current-operand]');
const previousOperand = document.querySelector('[data-previous-operand]');
const digitButtons = document.querySelectorAll('[data-digits]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equals]');

let prev = '';
let current = '';
let operation = undefined;
let computed = '';


function clear(){
    prev = '';
    current = '';
    operation = undefined;
    computed = '';
}

function del(){
    current = current.slice(0,-1);
}

function appendNumber(number){
    if(number ==='.' && current.includes('.')) return;
    // clear current as computed to allow user to choose new current value
    if(current == computed || current == 'lol'){
        current = '';
    }
    current += number;
}

function getOperation(operator){
    if(current =='lol'){
        clear();
    }

    if(operation){
        // do nothing if operation exist but current is 0
        if(current ==='') return;
        // if both current and prev contains a value, compute
        if(current && prev){
            compute();
            prev = current; //set prev to current to display computation and set operator to new operator
            operation = operator;
            return;
        }
    } 
    
    //if current is not empty and is not '-', add operator
    if(current){
        operation = operator;
        prev = current;
        current = '';
    } 
    //if current is empty and user clicks '-', append '-' to make negative number
    if(current ==='' && operator==='-'){
        if(prev) return;
        current += operator;
    }
}

function compute(checkEqual = undefined){

    switch (operation){
        case '+':
            computed = (parseFloat(prev) + parseFloat(current)).toString();
            break;
        case '-':
            computed = (parseFloat(prev) - parseFloat(current)).toString();
            break;
        case '*':
            computed = (parseFloat(prev) * parseFloat(current)).toString();
            break;
        case '/':
            computed = (parseFloat(prev) / parseFloat(current)).toString();
            break;
        default:
            return;
    }
    // set current to display computed value
    if (computed == Infinity){
        current = 'lol';
        prev = ''
        operation = '';
        return;
    }
    current = computed;
    operation = undefined; // clear operation
}

function update(){
    if(operation != undefined){
        previousOperand.innerText = prev + operation;
    } else{
        currentOperand.innerText = current;
        previousOperand.innerText = prev;
    }
    currentOperand.innerText = current;
}

digitButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
       appendNumber(button.innerText);
       update();
    })
})

operatorButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        getOperation(button.innerText);
        update();
    })
})

equalButton.addEventListener('click', ()=>{
    compute();
    update();
})

clearButton.addEventListener('click', ()=>{
    clear();
    update();
})

deleteButton.addEventListener('click', ()=>{
    del();
    update();
})