/** Keep object-fit: cover framing inside a non-uniformly scaled FLIP mask.
 * Only transforms change while scrolling; image/mask layout sizes stay fixed.
 */
export function zoomPhotoTransform(width: number, height: number, scaleX: number, scaleY: number, aspect: number, position: readonly number[]) {
  const imageHeight = Math.max(height, width / aspect);
  const imageWidth = imageHeight * aspect;
  const renderedWidth = width * scaleX;
  const renderedHeight = height * scaleY;
  const cover = Math.max(renderedWidth / imageWidth, renderedHeight / imageHeight);
  return {
    scaleX: cover / scaleX,
    scaleY: cover / scaleY,
    x: (renderedWidth - imageWidth * cover) * position[0] / scaleX,
    y: (renderedHeight - imageHeight * cover) * position[1] / scaleY,
  };
}
