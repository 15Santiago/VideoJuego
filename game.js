const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
let canvasSize;
let elemnetsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function renderMap () {
    game.font = elemnetsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapColumns = mapRows.map(row => row.trim().split(''));    

    mapColumns.forEach((row, rowI) => {
        row.forEach((column, columnI) => {
            const posX = elemnetsSize * (columnI + 1);
            const posY = elemnetsSize * (rowI + 1);

            game.fillText(emojis[column], posX, posY);
        });
    });
};

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
