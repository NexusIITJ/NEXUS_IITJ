/**
 * Detects if WebGL is available in the browser
 * @returns {boolean} True if WebGL is supported and available
 */
export const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(gl && gl instanceof WebGLRenderingContext);
  } catch (e) {
    return false;
  }
};

/**
 * Checks if the screen size is below mobile threshold
 * @param {number} threshold - Width threshold in pixels (default: 768)
 * @returns {boolean} True if screen width is below threshold
 */
export const isMobileScreen = (threshold = 768) => {
  return window.innerWidth < threshold;
};

/**
 * Determines if 3D background should be rendered
 * @returns {boolean} True if 3D scene should be shown
 */
export const shouldRender3D = () => {
  return isWebGLAvailable() && !isMobileScreen();
};
