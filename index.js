const canvas = document.querySelector('canvas');
const rect = canvas.getBoundingClientRect();
canvas.height = document.querySelector('img').clientHeight;
canvas.width = document.querySelector('img').clientWidth;
const clearCanvasBtn = document.querySelector('#clear-canvas');
const ctx = canvas.getContext('2d');
let isMouseDown = false;
let startX = 0;
let startY = 0;
let rectWidth;
let rectHeight;
const rectangles = [];

canvas.addEventListener('mousedown', (event) => {
  isMouseDown = true;
  startX = event.offsetX;
  startY = event.offsetY;
});
canvas.addEventListener('mouseup', () => {
  isMouseDown = false;
  rectangles.push({
    startX,
    startY,
    rectWidth,
    rectHeight,
  });
});
clearCanvasBtn.addEventListener('click', () => {
  // clear rectangles
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rectangles.length = 0;
});

const drawRectangle = (startX, startY, rectWidth, rectHeight) => {
  ctx.strokeStyle = '#000'
  ctx.fillStyle = "#000";
  ctx.font = "14px Arial";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.fillText(`Rectangle coordinates: X:${startX} Y:${startY}`, startX ,startY - 10);
  ctx.rect(startX, startY, rectWidth, rectHeight);
  ctx.stroke();
};

const calculateCoordinates = (mouseX, mouseY) => {
  rectWidth = mouseX - startX;
  rectHeight = mouseY - startY;
  if (isMouseDown) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (rectangles.length > 0) {
      rectangles.forEach(({ startX, startY, rectWidth, rectHeight }) => {
        drawRectangle(startX, startY, rectWidth, rectHeight);
      });
    }
    drawRectangle(startX, startY, rectWidth, rectHeight);
  }
};

canvas.addEventListener('mousemove', (event) => {
  const mouseX = event.offsetX - rect.left;
  const mouseY = event.offsetY - rect.top;
  calculateCoordinates(mouseX, mouseY);
});
