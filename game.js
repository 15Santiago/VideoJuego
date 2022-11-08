const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

// Map
let canvasSize;
let elemnetsSize;
const playerPosition = {
    X: undefined,
    Y: undefined,
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize () {

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    };

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elemnetsSize = canvasSize / 10;
    renderMap();
};
function renderMap () {
    game.font = elemnetsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapColumns = mapRows.map(row => row.trim().split(''));    

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
            };

            game.fillText(emojis[column], posX, posY);
        });
    });
    movePlayer();
};

//Move player
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUP);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function movePlayer () {
    game.fillText(emojis['PLAYER'], playerPosition.X, playerPosition.Y);
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