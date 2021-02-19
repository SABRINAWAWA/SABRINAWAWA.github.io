console.log("hello")
var userScore = 0;
var computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("comp-score");
const scoreBoard_section = document.querySelector(".score-board");
const result_p = document.querySelector(".result>p");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissor_div = document.getElementById("scissor");

function getCompChoice() {
    const choices = ['r', 'p', 's'];
    const randomNumber = (Math.floor(Math.random() * 3));
    return choices[randomNumber];
}

function convertToWord(letter) {
    if (letter === 'r') return "Rock";
    if (letter === 's') return "Scissor";
    if (letter === 'p') return "Paper";
}

function win(userChoice, computerChoice) {
    const smallUserWord = "User".fontsize(3).sup();
    const smallCompWord = "Computer".fontsize(3).sup();
    const userChoice_div=document.getElementById(convertToWord(userChoice).toLowerCase());
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = convertToWord(userChoice) + smallUserWord + " beats " + convertToWord(computerChoice) + smallCompWord + " You Win!";
    userChoice_div.classList.add('green-glow');
    setTimeout(function () { userChoice_div.classList.remove('green-glow') }, 1000)
}


function lose(userChoice, computerChoice) {
    const smallUserWord = "User".fontsize(3).sup();
    const smallCompWord = "Computer".fontsize(3).sup();
    const userChoice_div=document.getElementById(convertToWord(userChoice).toLowerCase());
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = convertToWord(userChoice) + smallUserWord + " loses to " + convertToWord(computerChoice) + smallCompWord + " You Lost!";
    userChoice_div.classList.add('red-glow');
    setTimeout(function () { userChoice_div.classList.remove('red-glow') }, 1000)
}

function draw(userChoice, computerChoice) {
    const smallUserWord = "User".fontsize(3).sup();
    const smallCompWord = "Computer".fontsize(3).sup();
    const userChoice_div=document.getElementById(convertToWord(userChoice).toLowerCase());
    result_p.innerHTML = convertToWord(userChoice) + smallUserWord + " equals " + convertToWord(computerChoice) + smallCompWord + " It's a draw!";
    userChoice_div.classList.add('yellow-glow');
    setTimeout(function () { userChoice_div.classList.remove('yellow-glow') }, 1000)
}

function game(userChoice) {
    const computerChoice = getCompChoice();
    console.log("User choice => " + userChoice);
    console.log("Computer choice => " + computerChoice);
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            break;
    }
}

function main() {
    rock_div.addEventListener('click', function () {
        game('r')
        console.log('You clicked on rock.')
    })

    paper_div.addEventListener('click', function () {
        game('p')
        console.log('You clicked on paper.')
    })

    scissor_div.addEventListener('click', function () {
        game('s')
        console.log('You clicked on scissor.')
    })
}

main();