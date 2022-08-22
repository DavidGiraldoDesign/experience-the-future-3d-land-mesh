let canvas;
let size = 20;
let rows, colums = 0;
let w = 600;
let h = 600;
let terrain;
let flying = 0;
let sub = 40;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');

    rows = Math.floor(windowHeight / sub);
    colums = Math.floor(windowWidth / 20);
    terrain = new Array(rows);
    angleMode(DEGREES);
    frameRate(24);

}

function draw() {
    //background(0, 50);
    background(0);
    //newCursor();
    flying -= 0.09;
    let yOff = flying;
    for (let y = 0; y < rows; y++) {
        terrain[y] = new Array(colums);
        let xOff = 0;
        for (let x = 0; x < colums; x++) {
            terrain[y][x] = map(noise(xOff, yOff), 0, 1, -120, 120);
            xOff += 0.1;
        }
        yOff += 0.1;
    }
    noFill();
    translate((-windowWidth / 2), (-windowHeight / 3) + 290);
    rotateX(60);
    for (let y = 0; y < rows - 1; y++) {
        beginShape(LINES);
        for (let x = 0; x < colums - 1; x++) {
            let colorStorke = y < rows / 2 ? map(y, 0, rows / 2, 0, 255) : map(y, rows / 2, rows - 1, 255, 0);
            stroke(colorStorke);
            vertex(x * size, y * size, terrain[y][x]);
            vertex((x + 1) * size, y * size, terrain[y][x + 1]);
            vertex(x * size, y * size, terrain[y][x]);
            vertex(x * size, (y + 1) * size, terrain[y + 1][x]);
        }
        endShape();
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    rows = Math.floor(windowHeight / sub);
    terrain = new Array(rows);
    colums = Math.floor(windowWidth / 20);
}