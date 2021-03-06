document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    const width = 4
    let squares = [];
    let score = 0;

    // Creating a playing board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div');
            square.id = i;
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }
    createBoard();

    // Generating a number randomly
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            changeColor(randomNumber, squares[randomNumber].innerHTML);
            checkForLose()
        } else {
            generate();
        }
    }

    // Swipe right 
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;

                // Parseing integer numbers from the squares.
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                //console.log(row); //testing

                let filteredRow = row.filter(num => num); // Filtering the row array to get the non-zero numbers
                //console.log(filteredRow); //testing

                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0); // Creating array that contains only zero numbers
                //console.log(zeros); //testing

                let newRow = zeros.concat(filteredRow); //Combining the filterRow to zeros.
                //console.log(newRow); //testing

                // Assigning newRow to squares;
                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
        for (let i=0; i<16; i++){
            changeColor(i, squares[i].innerHTML);
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;

                // Parseing integer numbers from the squares.
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                //console.log(row); //testing


                let filteredRow = row.filter(num => num); // Filtering the row array to get the non-zero numbers
                //console.log(filteredRow); //testing

                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0); // Creating array that contains only zero numbers
                //console.log(zeros); //testing

                let newRow = filteredRow.concat(zeros); //Combining the filterRow to zeros.
                //console.log(newRow); //testing

                // Assigning newRow to squares;
                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
        for (let i=0; i<16; i++){
            changeColor(i, squares[i].innerHTML);
        }
    }

    // Swipe down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width * 2].innerHTML;
            let totalFour = squares[i + width * 3].innerHTML;

            // Parseing integer numbers from the squares.
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);
            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + width * 2].innerHTML = newColumn[2];
            squares[i + width * 3].innerHTML = newColumn[3];
        }
        for (let i=0; i<16; i++){
            changeColor(i, squares[i].innerHTML);
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width * 2].innerHTML;
            let totalFour = squares[i + width * 3].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);
            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + width * 2].innerHTML = newColumn[2];
            squares[i + width * 3].innerHTML = newColumn[3];
        }
        for (let i=0; i<16; i++){
            changeColor(i, squares[i].innerHTML);
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }


        checkForWin();
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }

        // for (let i=0; i<16; i++){
        //     changeColor(i, squares[i].innerHTML);
        // }
        checkForWin();
    }

    // Assign keycodes
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }

    document.addEventListener('keyup', control);

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    // Check for win
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You Win with Score: '+score;
                document.removeEventListener('keyup', control);
            }
        }
    }

    // Check for game over 
    function checkForLose() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'You Lose! Game Over! Start Again?';
            document.removeEventListener('keyup', control);
        }
    }

    // Adding classes to change color
    function changeColor(index,number) {
        var element = document.getElementById(index);
        if (number == 0) { 
            element.style.backgroundColor ="#d1c3ba"; 
        }else if(number==2){
            element.style.backgroundColor ="#eee4da"; 
        }else if(number==4){
            element.style.backgroundColor ="#ede0c8"; 
        }else if(number==8){
            element.style.backgroundColor ="#f2b179"; 
        }else if(number==16){
            element.style.backgroundColor ="#f59563"; 
        }else if(number==32){
            element.style.backgroundColor ="#f67e5f"; 
        }else if(number==64){
            element.style.backgroundColor ="#f65e3b"; 
        }else if(number==128){
            element.style.backgroundColor ="#edcf72"; 
        }else if(number==256){
            element.style.backgroundColor ="#edcc61"; 
        }else if(number==512){
            element.style.backgroundColor ="#9c0"; 
        }else if(number==1024){
            element.style.backgroundColor ="#33b5e5"; 
        }else if(number==2048){
            element.style.backgroundColor ="#09c"; 
        }
    }
})