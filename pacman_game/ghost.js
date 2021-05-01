import {OBJECT_TYPE, DIRECTIONS} from './setup';

class Ghost{
    constructor(speed=5, startPos, movement, name){
        this.name=name;
        this.movement=movement;
        this.startPos=startPos;
        this.pos=startPos;
        this.dir=DIRECTIONS.ArrowRight;
        this.speed=speed;
        this.timer=0;
        this.isScared=false;
        this.rotation=false;
    }

    //This function determine whether the ghosts ready to move or not.
    shouldMove(){
        if(this.timer===this.speed){
            this.timer=0;
            return true;
        }
        this.timer++;
    }

    // This function holds the next position and direction information
    getNextMove(objectExist){
        const {nextMovePos, direction}= this.movement(
            this.pos,
            this.dir,
            objectExist
        );
        return {nextMovePos, direction};
    }

    // This function set the movement the ghost in the gird.
    makeMove(){
        const classesToRemove=[OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, this.name];
        let classesToAdd=[OBJECT_TYPE.GHOST, this.name];
        if (this.isScared) classesToAdd=[...classesToAdd, OBJECT_TYPE.SCARED];
        return {classesToRemove, classesToAdd};
    }
    
    // This function move the ghost.
    setNewPos(nextMovePos, direction){
        this.pos=nextMovePos;
        this.dir=direction;
    }
}

export default Ghost;