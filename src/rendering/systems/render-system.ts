import {
  isNil,
  PositionComponent,
  RotationComponent,
  ScaleComponent,
} from '../../common';
import { Entity, System } from '../../ecs';
import { CameraComponent, SpriteComponent } from '../components';
import { RenderLayer } from '../render-layer';
import { createTextureFromImage } from '../shaders';
import { ImageRenderSource } from '../render-sources';
import { createProjectionMatrix } from '../shaders/utils/create-projection-matrix';
import { Vector2 } from '../../math';

export class RenderSystem extends System {
  private _layer: RenderLayer;
  private _program: WebGLProgram;

  constructor(layer: RenderLayer, cameraEntity: Entity, program: WebGLProgram) {
    super('renderer', [PositionComponent.symbol, SpriteComponent.symbol]);

    this._layer = layer;

    const cameraPosition = cameraEntity.getComponentRequired<PositionComponent>(
      PositionComponent.symbol,
    );

    if (isNil(cameraPosition)) {
      throw new Error(
        `The 'camera' provided to the ${this.name} system during construction is missing the "${PositionComponent.name}" component`,
      );
    }

    const camera = cameraEntity.getComponentRequired<CameraComponent>(
      CameraComponent.symbol,
    );

    if (isNil(camera)) {
      throw new Error(
        `The 'camera' provided to the ${this.name} system during construction is missing the "${CameraComponent.name}" component`,
      );
    }

    this._program = program;
  }

  public override beforeAll = (entities: Entity[]) => {
    this._layer.context.clear(this._layer.context.COLOR_BUFFER_BIT);
    this._layer.context.useProgram(this._program);

    const sortedEntities = entities.sort((entity1, entity2) => {
      const position1 = entity1.getComponentRequired<PositionComponent>(
        PositionComponent.symbol,
      );

      const spriteComponent1 = entity1.getComponentRequired<SpriteComponent>(
        SpriteComponent.symbol,
      );

      const position2 = entity2.getComponentRequired<PositionComponent>(
        PositionComponent.symbol,
      );

      const spriteComponent2 = entity2.getComponentRequired<SpriteComponent>(
        SpriteComponent.symbol,
      );

      return (
        position1.y -
        spriteComponent1.sprite.pivot.y -
        (position2.y - spriteComponent2.sprite.pivot.y)
      );
    });

    return sortedEntities;
  };

  public run = async (entity: Entity): Promise<void> => {
    const spriteComponent = entity.getComponentRequired<SpriteComponent>(
      SpriteComponent.symbol,
    );

    if (spriteComponent.renderLayer !== this._layer) {
      return; // Probably not the best way to handle layers/sprite, but the alternatives have their own issues.
    }

    if (!spriteComponent.enabled) {
      return;
    }

    const position = entity.getComponentRequired<PositionComponent>(
      PositionComponent.symbol,
    );

    const scale = entity.getComponent<ScaleComponent>(ScaleComponent.symbol);

    const rotation = entity.getComponent<RotationComponent>(
      RotationComponent.symbol,
    );

    this._getSpriteBuffers(this._program);

    const imageRenderSource = spriteComponent.sprite
      .renderSource as ImageRenderSource;

    const texture = createTextureFromImage(
      this._layer.context,
      imageRenderSource.image,
    );

    const uMatrixLoc = this._layer.context.getUniformLocation(
      this._program,
      'u_matrix',
    );

    this._layer.context.activeTexture(this._layer.context.TEXTURE0);
    this._layer.context.bindTexture(this._layer.context.TEXTURE_2D, texture);

    // Set u_texture uniform to texture unit 0
    const uTextureLoc = this._layer.context.getUniformLocation(
      this._program,
      'u_texture',
    );
    this._layer.context.uniform1i(uTextureLoc, 0);

    // Compute transformation matrix
    const mat = this._getSpriteMatrix(
      position,
      rotation?.radians ?? 0,
      new Vector2(
        imageRenderSource.width * (scale?.x ?? 1),
        imageRenderSource.height * (scale?.y ?? 1),
      ),
    );

    // Send it to the GPU
    this._layer.context.uniformMatrix3fv(uMatrixLoc, false, mat);

    // Draw the quad (two triangles, 6 vertices)
    this._layer.context.drawArrays(this._layer.context.TRIANGLES, 0, 6);
  };

  private _getSpriteBuffers = (program: WebGLProgram) => {
    const gl = this._layer.context;

    // Create a single quad with 2 triangles.
    const positions = new Float32Array([
      //  X,   Y
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
    ]);

    const texCoords = new Float32Array([
      // U, V
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
    ]);

    // Position buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const aPositionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // Texture coordinate buffer
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    const aTexCoordLoc = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(aTexCoordLoc);
    gl.vertexAttribPointer(aTexCoordLoc, 2, gl.FLOAT, false, 0, 0);

    return { positionBuffer, texCoordBuffer };
  };

  private _translate = (matrix: number[], tx: number, ty: number) => {
    matrix[6] += matrix[0] * tx + matrix[3] * ty;
    matrix[7] += matrix[1] * tx + matrix[4] * ty;
    return matrix;
  };

  private _rotate = (matrix: number[], radians: number) => {
    const c = Math.cos(radians);
    const s = Math.sin(radians);
    const m0 = matrix[0],
      m1 = matrix[1],
      m3 = matrix[3],
      m4 = matrix[4];
    matrix[0] = c * m0 + s * m3;
    matrix[1] = c * m1 + s * m4;
    matrix[3] = -s * m0 + c * m3;
    matrix[4] = -s * m1 + c * m4;
    return matrix;
  };

  private _scale = (matrix: number[], sx: number, sy: number) => {
    matrix[0] *= sx;
    matrix[1] *= sx;
    matrix[3] *= sy;
    matrix[4] *= sy;
    return matrix;
  };

  private _getSpriteMatrix = (
    position: Vector2,
    rotation: number,
    scale: Vector2,
  ) => {
    const matrix = createProjectionMatrix(
      this._layer.canvas.width,
      this._layer.canvas.height,
    );

    this._translate(matrix, position.x, position.y);
    this._rotate(matrix, rotation);
    this._scale(matrix, scale.x, scale.y);

    return matrix;
  };

  public stop = (): void => {};
}
