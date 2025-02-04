export const createShader = (
  gl: WebGL2RenderingContext,
  source: string,
  type: GLenum,
) => {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error('Shader creation error');
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const shaderInfoLog = gl.getShaderInfoLog(shader);

    gl.deleteShader(shader);

    throw new Error(`Shader compile error: ${shaderInfoLog}`);
  }

  return shader;
};
