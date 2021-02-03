const rectangleDrawingApp = (canvasContainer, clearCanvasButton) => {
  const canvas = document.querySelector(`${canvasContainer} canvas`);
  canvas.height = document.querySelector(`${canvasContainer} img`).clientHeight;
  canvas.width = document.querySelector(`${canvasContainer} img`).clientWidth;
  const rect = canvas.getBoundingClientRect();
  const clearCanvasBtn = document.querySelector(clearCanvasButton);
  const ctx = canvas.getContext('2d');
  let isMouseDown = false;
  let startX,
    startY,
    rectWidth,
    rectHeight = 0;
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
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.lineWidth = 5;
    ctx.beginPath();
    // text to indicate coordinates of rectangles in relation to canvas
    // ctx.fillText(
    //   `Rectangle coordinates: X:${startX} Y:${startY}`,
    //   startX,
    //   startY - 10
    // );
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
};
// params: query selectors for: 1) picture and canvas container, 2) clear canvas button
rectangleDrawingApp('#picture-canvas-container', '#clear-canvas');
