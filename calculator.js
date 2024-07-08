
let buffer = '0';
let runningTotal = 0;
let previousOprator = null;

const screen = document.querySelector('.screen')

function buttonClick(value){
    if (isNaN(parseInt(value))){
        handleSymbol(value);
    } else{
        handleNumber(value);
    }
    rerender(); 
} 


function handleNumber(number){
    if (buffer === '0'){
        buffer = number;
    }else{
        buffer += number;   
    }
   
}

function handleMath(value){
     if (buffer === '0'){
        return;
     }
     const intbuffer = parseInt(buffer);
     if (runningTotal === 0){
        runningTotal = intbuffer;
     }else{
        flushOperation(intbuffer);
     }
     previousOprator = value;
     buffer = '0';
}
function flushOperation(intbuffer){
    if (previousOprator === '+'){
        runningTotal += intbuffer
    }else if (previousOprator === '-'){
        runningTotal -= intbuffer
    }
    else if (previousOprator === '×'){
        runningTotal *= intbuffer
    }
    else if (previousOprator === '÷'){
        runningTotal /= intbuffer
    }
}
function handleSymbol(symbol){  
    switch(symbol){
        case 'C':
            buffer = '0';
            break;
        case '=':
            if (previousOprator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOprator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0,buffer.length -1);
            }
                
            break;
        case '+':
        case '-':
        case '÷':
        case '×':
            handleMath(symbol);
            break;
    }
}



function init(){
    console.log("hi")
    document.querySelector(".calc-buttons")
    .addEventListener("click", function(event){
        buttonClick(event.target.innerText);
    })
}

function rerender(){
    screen.innerText = buffer;
}

init();