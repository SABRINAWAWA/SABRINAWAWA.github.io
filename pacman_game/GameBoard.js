import {GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST} from './setup'

class GameBoard{
    // Creating constructor
    constructor(DOMGrid){
        this.dotCount=0; // Initiaize counting of pill eating to zero
        this.grid=[];
        this.DOMGrid=DOMGrid;
    }

    // Showing if the gamer win the game or not
    showGameStatus(gameWin){
        const div=document.createElement('div'); // Creating a neww div which will contain the message of win or lose.
        div.classList.add('game-status'); // Adding class(created in the style.css) to the div;
        div.innerHTML=`${gameWin ? 'WIN!' : 'GAME OVER!'}`; // If gameWin is true, then display WIN, otherwise, display GAME OVER.
        this.DOMGrid.appendChild(div); // Appending this div to the DOMGrid
    }

    // Creating grid
    createGrid(level){
        this.dotcount=0; // Everything start/restart the game, we need to reset count of pill, grid, and innterHTML of DOMGrid.
        this.grid=[];
        this.DOMGrid.innerHTML="";
        this.DOMGrid.style.cssText=`grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px)`; // Making the grid dynmaic according to our set value.
        level.forEach((square)=>{ // looping around the level and then create div for each square
            const div=document.createElement('div');
            div.classList.add('square', CLASS_LIST[square]);
            div.style.cssText=`width: ${CELL_SIZE}px; height:${CELL_SIZE}px;`; // adding new width and height to square css. 
            this.DOMGrid.appendChild(div);
            this.grid.push(div);
            if(CLASS_LIST[square]===OBJECT_TYPE.DOT) this.dotCount++; // Counting the number of pill in the grid
        })
    }

    // This function is used to add classes to the grid
    addObject(pos, classes){
        this.grid[pos].classList.add(...classes)
    }

    // This function is used to remove classes to the grid
    removeObject(pos, classes){
        this.grid[pos].classList.remove(...classes)
    }

    // This function checks if the object exit in certain position.
    objectExist=(pos, object)=>{
        return this.grid[pos].classList.contains(object);
    }

    // This function is used to rotate pacman in the grid
    rotateDiv(pos, deg){
        this.grid[pos].style.transform=`rotate(${deg}deg)`;
    }


    // This function intakes character and then according to the character to move the pacman.
    moveCharacter(character){
        if(character.shouldMove()){
            const {nextMovePos, direction}=character.getNextMove(this.objectExist);
            const {classesToRemove, classesToAdd}=character.makeMove();
            if (character.rotation && nextMovePos!==character.pos){
                this.rotateDiv(nextMovePos, character.dir.rotation); // rotation
                this.rotateDiv(character.pos, 0);
            }
            this.removeObject(character.pos, classesToRemove);
            this.addObject(nextMovePos, classesToAdd);
            character.setNewPos(nextMovePos, direction);// Setting new position
        }
    }
    
    // This function is used to create gameboard.
    static createGameBoard(DOMGrid, level){
        const board=new this(DOMGrid);
        board.createGrid(level);
        return board;
    }
}

export default GameBoard;