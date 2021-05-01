import {OBJECT_TYPE, DIRECTIONS} from './setup';

class Pacman{
    // Creating constructor
    constructor(speed, startPos){
        this.pos=startPos;
        this.speed=speed;
        this.dir=null;
        this.timer=0;
        this.powerPill=false;
        this.rotation=true;
    }

    //This function determine whether the pacman ready to move or not.
    shouldMove(){
        if(!this.dir) return false;
        if(this.timer===this.speed){
            this.timer=0;
            return true;
        }
        this.timer++;
    }

    // This function holds the next position and direction information
    getNextMove(objectExist){
        let nextMovePos=this.pos+this.dir.movement;
        if(objectExist(nextMovePos, OBJECT_TYPE.WALL)||objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)){
            nextMovePos=this.pos;
        }
        return {nextMovePos, direction: this.dir};
    }

    // This function set the movement the pacman in the gird.
    makeMove(){
        const classesToRemove=[OBJECT_TYPE.PACMAN];
        const classesToAdd=[OBJECT_TYPE.PACMAN];
        return{classesToRemove, classesToAdd};
    }

    // This function move the pacman.
    setNewPos(nextMovePos){
        this.pos=nextMovePos;
    }

    // This function handles key input of DIRECTIONS (in setup.js)
    handleKeyInput(e, objectExist){
        //console.log(e);
        let dir;
        if(e.keyCode>=37 && e.keyCode<=40){
            dir=DIRECTIONS[e.key];
        }else{
            return;
        }
        const nextMovePos=this.pos+dir.movement;
        if(objectExist(nextMovePos, OBJECT_TYPE.WALL) ||objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR))
            return;
        this.dir=dir;
    }
}

export default Pacman;