const canvas = document.querySelector('canvas');
const rect = canvas.getBoundingClientRect();
canvas.height = document.querySelector('img').clientHeight;
canvas.width = document.querySelector('img').clientWidth;
const clearCanvasBtn = document.querySelector('#clear-canvas');
const ctx = canvas.getContext('2d');
let down = false;
let startX = 0;
let startY = 0;
let width;
let height;
const rectangles = [];

canvas.addEventListener('mousedown', (event) => {
  down = true;
  startX = event.offsetX;
  startY = event.offsetY;
});
canvas.addEventListener('mouseup', () => {
  down = false;
  rectangles.push({
    startX,
    startY,
    width,
    height,
  });
});
clearCanvasBtn.addEventListener('click', () => {
  // clear rectangles
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rectangles.length = 0;
});

const drawRectangle = (startX, startY, width, height) => {
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.rect(startX, startY, width, height);
  ctx.stroke();
};

const handleCoordinates = (mouseX, mouseY) => {
  width = mouseX - startX;
  height = mouseY - startY;
  if (down) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (rectangles.length > 0) {
      rectangles.forEach(({ startX, startY, width, height }) => {
        drawRectangle(startX, startY, width, height);
      });
    }
    drawRectangle(startX, startY, width, height);
  }
};

canvas.addEventListener('mousemove', (event) => {
  const mouseX = event.offsetX - rect.left;
  const mouseY = event.offsetY - rect.top;
  handleCoordinates(mouseX, mouseY);
});
