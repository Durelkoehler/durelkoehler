/**
 * Renders an image onto a 2D Canvas context matching a CSS "background-size: cover" behavior,
 * while automatically adjusting context scaling for High-DPI (Retina) screens.
 */
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement
): void {
  const canvas = ctx.canvas;
  const rect = canvas.getBoundingClientRect();
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  // Sync canvas buffer resolution with physical pixels
  const physicalWidth = Math.floor(rect.width * dpr);
  const physicalHeight = Math.floor(rect.height * dpr);

  if (canvas.width !== physicalWidth || canvas.height !== physicalHeight) {
    canvas.width = physicalWidth;
    canvas.height = physicalHeight;
  }

  const canvasWidth = rect.width;
  const canvasHeight = rect.height;

  const imgWidth = img.naturalWidth || img.width;
  const imgHeight = img.naturalHeight || img.height;

  const imgRatio = imgWidth / imgHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth = canvasWidth;
  let drawHeight = canvasHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (canvasRatio > imgRatio) {
    // Canvas aspect ratio is wider than image aspect ratio
    drawHeight = canvasWidth / imgRatio;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    // Canvas aspect ratio is taller than image aspect ratio
    drawWidth = canvasHeight * imgRatio;
    offsetX = (canvasWidth - drawWidth) / 2;
  }

  // Clear canvas buffer before drawing next frame
  ctx.clearRect(0, 0, physicalWidth, physicalHeight);

  // Draw image scaled to physical pixels
  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  ctx.restore();
}
