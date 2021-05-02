document.addEventListener("DOMContentLoaded", () => {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const result = document.querySelector('.result');
    const scorePanel = document.querySelector('.score');
    let isJumping = false;
    let gravity = 0.9;
    let isGameOver = false;
    let hasCloud = false;
    let score = 0;

    function control(e) {
        if (e.keyCode === 32) {
            // console.log('pressed'); //testing
            if (!isJumping) {
                isJumping = true;
                jump();
            }
        }
    }

    document.addEventListener('keyup', control);
    let position = 0;

    function jump() {
        let count = 0;
        let timerId = setInterval(function () {
            // move down
            if (count == 15) {
                clearInterval(timerId);
                //console.log('down');
                let downTimerId = setInterval(function () {
                    if (count === 0) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    position -= 5;
                    count--;
                    position = position * gravity;
                    dino.style.bottom = position + 'px';
                }, 20)

            }

            // move up
            //console.log('up');
            position += 30;
            count++;
            position = position * gravity;
            dino.style.bottom = position + 'px';
            //console.log(dino.style.bottom);
        }, 20)
    }


    function generateObstacle() {
        let randomTime = Math.random() * 4000 + 1000;
        let obstaclePosition = 1000;
        const obstacle = document.createElement('div');
        if (!isGameOver) obstacle.classList.add('obstacle');
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + 'px';
        let timerId = setInterval(function () {
            if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                clearInterval(timerId);
                result.innerHTML = ('Game Over');
                isGameOver = true;
                // remove all children div 
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild);
                }
            } 
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
            //console.log(obstacle.style.left);
            if (obstaclePosition < -50 && obstaclePosition >-250) {
                obstacle.style.backgroundImage='url("images/empty.jpg")';
            }
        }, 20)

        if (!isGameOver) setTimeout(generateObstacle, randomTime);

        if (!hasCloud) {
            hasCloud = true;
            generateCloud();
        }
    }

    function keepScore() {
        let timerScoreId = setInterval(function () {
            if (isGameOver) {
                clearInterval(timerScoreId);
            } else {
                score++;
                scorePanel.innerHTML = "SCORE <br>" + score;
                //console.log(score);
            }
        }, 400)
    }

    // generateCloud function starts when user first jump
    function generateCloud() {
        let randomTime = Math.random() * 3000 + 1000;
        let cloudPosition = 1000;
        const cloud = document.createElement('div');
        if (!isGameOver) cloud.classList.add('cloud');
        grid.appendChild(cloud);
        cloud.style.left = cloudPosition + 'px';
        let timerId = setInterval(function () {
            if (isGameOver) {
                clearInterval(timerId);
                isGameOver = true;
            }
            cloudPosition -= 10;
            cloud.style.left = cloudPosition + 'px';
        }, 20)

        if (cloudPosition < -50 && cloudPosition>-250) {
            cloud.style.backgroundImage='url("images/empty.jpg")';
        }

        if (!isGameOver) setTimeout(generateCloud, randomTime);
    }
    
    generateObstacle();
    if (!isGameOver) keepScore();
})