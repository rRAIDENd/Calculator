function add(a, b){
    return (a + b);
}

function subtract(a, b){
    return (a - b);
}

function multiply(a, b){
    return(a * b);
}

function divide(a,b){
    return (a/b);
}

function operate(operand1, operand2, operator){
    return operator(operand1, operand2);
}

console.log(add(1,2)); //3
console.log(subtract(3,5)); //-2
console.log(multiply(2,4)); //8
console.log(divide(5,3)) //1.6666666666667

let operated = operate(3,29.5,divide);
console.log(operated);
