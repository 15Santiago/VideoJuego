const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const livesDom = document.querySelector('#lives');
const timeDom = document.querySelector('#time');
const recordDom = document.querySelector('#record');
const resultDom = document.querySelector('#result');
const btnReloadContainer = document.querySelector('.messages');

// Map
let canvasSize;
let elemnetsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let TimeInterval;

const playerPosition = {
    X: undefined,
    Y: undefined,
};
const giftPosition = {
    X: undefined, 
    Y: undefined,
};
let enemyPositions = []

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize () {

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    };

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elemnetsSize = canvasSize / 10;

    playerPosition.X = undefined;
    playerPosition.Y = undefined;
    renderMap();
};

function renderMap () {
    game.font = elemnetsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    };

    if (!timeStart) {
        timeStart = Date.now();
        TimeInterval = setInterval(showTime, 100);
        showRecord();
    };

    const mapRows = map.trim().split('\n');
    const mapColumns = mapRows.map(row => row.trim().split(''));    

    enemyPositions = [];
    game.clearRect(0, 0, canvasSize, canvasSize);
    mapColumns.forEach((row, rowI) => {
        row.forEach((column, columnI) => {
            const posX = elemnetsSize * (columnI + 1);
            const posY = elemnetsSize * (rowI + 1);

            if (column == 'O') {
                if (!playerPosition.X && !playerPosition.Y) {
                    playerPosition.X = posX;
                    playerPosition.Y = posY;
                }
            } else if (column == 'I') {
                giftPosition.X = posX;
                giftPosition.Y = posY;
            } else if (column == 'X') {
                enemyPositions.push({
                    X: posX,
                    Y: posY,
                });
            };

            game.fillText(emojis[column], posX, posY);
        });
    });
    movePlayer();
    showLives();
};

function showLives () {
    livesDom.innerHTML = emojis['HEART'].repeat(lives);
};

function showTime () {
    timeDom.innerHTML = Date.now() - timeStart;
};

function showRecord () {
    recordDom.innerHTML = localStorage.getItem('record_time');
};

function reloadBtn () {
    const btn = document.createElement('button');
    btn.className = 'reload-btn';
    btn.textContent = 'Reiniciar';
    btn.addEventListener('click', () => window.location.reload());

    btnReloadContainer.appendChild (btn);
};

//Move player
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

function movePlayer () {
    const giftColisionX = playerPosition.X.toFixed(3) == giftPosition.X.toFixed(3);
    const giftColisionY = playerPosition.Y.toFixed(3) == giftPosition.Y.toFixed(3);
    const giftColision = giftColisionX && giftColisionY;
    if (giftColision) {
        levelWin();
    };

    const enemyColision = enemyPositions.find(enemy => {
        const enemyColisionX = enemy.X.toFixed(3) == playerPosition.X.toFixed(3);
        const enemyColisionY = enemy.Y.toFixed(3) == playerPosition.Y.toFixed(3);

        return enemyColisionX && enemyColisionY;
    });

    if (enemyColision) {
        levelFail();
    };

    game.fillText(emojis['PLAYER'], playerPosition.X, playerPosition.Y);
};

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUP);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function levelWin () {
    level++;
    renderMap();
};

function gameWin () {
    console.log('Terminaste el juego');
    clearInterval(TimeInterval);
    
    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;
    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            resultDom.innerHTML = 'SUPERASTE EL RECORD,';
        } else {
            resultDom.innerHTML = 'Lo siento no superaste el record.';
        };
    } else {
        localStorage.setItem('record_time', playerTime);
    };
    reloadBtn();
};

function levelFail () {
    lives--;

    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    };

    playerPosition.X = undefined;
    playerPosition.Y = undefined;
    renderMap();
};

function moveByKeys (event) {
    if (event.key == 'ArrowUp') moveUP();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
};

function moveUP () {
    if ((playerPosition.Y - elemnetsSize) < elemnetsSize) {
    } else {
        playerPosition.Y -= elemnetsSize;
        renderMap();
    }
};

function moveLeft () {
    if ((playerPosition.X - elemnetsSize) < elemnetsSize) {
    } else {
        playerPosition.X -= elemnetsSize;
        renderMap();
    }
};

function moveRight () {
    playerPosition.X += elemnetsSize;
    renderMap();
};

function moveDown () {
    if ((playerPosition.Y + elemnetsSize) > canvasSize) {
    } else {
        playerPosition.Y += elemnetsSize;
        renderMap();
    }
};