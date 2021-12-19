let stack = [];
let fs = require('fs')
let input = fs.readFileSync('input.txt').toString()
let output = '';

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

function priority(char) {
    switch (char) {
        case '+': return 0;
        case '-': return 0;
        case '*': return 1;
        case '/': return 1;
        case '^': return 2;
    }
    return -1;
}

let inputMas = [];
let flag = false;
let tmp = '';
let t = 0;
while (t < input.length) {
    let n = 0;
    while (isNumber(input.charAt(t+n))) {
        tmp += input.charAt(t+n)
        n++;
        flag = true;
    }
    if (flag) {
        inputMas.push(tmp)
        tmp = ''
        t += n
        flag = false
    } else {
        inputMas.push(input.charAt(t))
        t++
    }
}

for (let i = 0; i < inputMas.length; i++) {
    if (isNumber(inputMas[i]))
        output += inputMas[i] + ' ';
    else if (inputMas[i] === '(')
        stack.push(inputMas[i]);
    else if (inputMas[i] === ')'){
        let j = stack.length-1;
        while (stack[j] !== '(') {
            output += stack.pop() + ' ';
            j--;
        }
        stack.pop()
    } else if (priority(stack[stack.length-1]) >= priority(inputMas[i])) {
        output += stack.pop() + ' ';
        stack.push(inputMas[i]);
    } else if (priority(stack[stack.length-1]) < priority(inputMas[i]))
        stack.push(inputMas[i]);
}
while(stack.length > 0) {
    output += stack.pop() + ' ';
}
console.log(output)
output = output.split(' ')
output.pop()

stack = []
for (let i = 0; i < output.length; i++) {
    if (isNumber(output[i])) {
        stack.push(output[i])
    } else {
        let number1 = parseInt(stack.pop());
        let number2 = parseInt(stack.pop());
        if (output[i] === '+')
            stack.push(number2+number1)
        else if (output[i] === '-')
            stack.push(number2-number1)
        else if (output[i] === '*')
            stack.push(number2*number1)
        else if (output[i] === '/')
            stack.push(number2/number1)
        else if (output[i] === '^')
            stack.push(Math.pow(number2,number1))
    }
}
let res1 = eval(input.replace(/\^/g, '**'))
let res2 = stack.pop()


console.log('eval: ' + res1)
console.log('dijkstra: ' + res2)