// HTML Element
const statusDiv=document.querySelector('.player');
const restartDiv=document.querySelector('.restart');
const cellDivs=document.querySelectorAll('.cell');
// console.log(statusDiv);
// console.log(restartDiv);
// console.log(cellDivs);

// Game variables
let gameIsLive=true;
let xIsNext=true;
let winner=null;
const xSymbol='✖';
const oSymbol='○';
// Functions
const letterToSymbol=(letter)=>letter==='x'?xSymbol:oSymbol;

const handleWin=(letter)=>{
    winner=letter;
    gameIsLive=false;
    if(winner === 'x'){
        statusDiv.innerHTML=`${letterToSymbol(winner)} has won!`;
    }else{
        statusDiv.innerHTML=`<span>${letterToSymbol(winner)} has won! </span>`;
    }
}

const checkGameState=()=>{
    const one=cellDivs[0].classList[2];
    const two=cellDivs[1].classList[2];
    const three=cellDivs[2].classList[2];
    const four=cellDivs[3].classList[2];
    const five=cellDivs[4].classList[2];
    const six=cellDivs[5].classList[2];
    const seven=cellDivs[6].classList[2];
    const eight=cellDivs[7].classList[2];
    const nine=cellDivs[8].classList[2];
    // console.log(one, two, three, four, five, six,seven, eight,nine);

    if(one&&one==two&&two==three){
        handleWin(one);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');

    }else if(four&&four==five&&five==six){
        handleWin(four);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');

    }else if(seven&&seven==eight&&eight==nine){
        handleWin(seven);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');

    }else if(one&&one==four&&four==seven){
        handleWin(one);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');

    }else if(two&&two==five&&five==eight){
        handleWin(two);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');

    }else if(three&&three==six&&six==nine){
        handleWin(three);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');

    }else if(one&&one==five&&five==nine){
        handleWin(one);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');

    }else if(three&&three==five&&five==seven){
        handleWin(three);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');

    }else if (one&&two&&three&&four&&five&&six&&seven&&eight&&nine){
        gameIsLive=false;
        statusDiv.innerHTML='Game is Tied!';
    }else{
        xIsNext=!xIsNext;
        if(xIsNext){
            statusDiv.innerHTML=`${xSymbol} is next.`;
        }else{
            statusDiv.innerHTML=`<span> ${oSymbol} is next. </span>`;
        }
    }
};
// event handlers
const handleReset=(e)=>{
    xIsNext=true;
    statusDiv.innerHTML=`${xSymbol} is next.`;
    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('playerX');
        cellDiv.classList.remove('playerO');
        cellDiv.classList.remove('won');
    }
}

const handleCellClick=(e)=>{
    const classList=e.target.classList;
    // console.log(classList);

    if(classList[2]=='playerX' || classList[2]=='playerO'){
        return;
    }

    if(xIsNext){
        classList.add('playerX');
        checkGameState();
    }else{
        classList.add('playerO');
        checkGameState();
    }
}

// event listeners
restartDiv.addEventListener('click', handleReset);

for(const cellDiv of cellDivs){
    cellDiv.addEventListener('click', handleCellClick);
}