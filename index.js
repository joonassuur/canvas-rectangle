const canvas = document.querySelector('canvas');
canvas.height = document.querySelector('body').clientHeight - 5;
canvas.width = document.querySelector('body').clientWidth - 5;
const ctx = canvas.getContext('2d');
let down = false;
let startX = 0;
let startY = 0;

canvas.addEventListener('mousedown', (event) => {
  down = true;
  startX = event.offsetX;
  startY = event.offsetY;
});
canvas.addEventListener('mouseup', () => {
  down = false;
});

const draw = (mouseX, mouseY) => {
  const width = mouseX - startX;
  const height = mouseY - startY;
  if (down) {
    ctx.strokeStyle = '#000';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.lineWidth = 5;
    ctx.stroke();
  }
};

canvas.addEventListener('mousemove', (event) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;
  draw(mouseX, mouseY);
});
