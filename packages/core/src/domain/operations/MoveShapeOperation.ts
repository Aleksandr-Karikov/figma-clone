/**
 * Move shape operation
 */

import { BaseOperation } from './base';
import { Shape } from '../shapes/types';

export interface MoveShapeOperationData {
  shapeId: string;
  x: number;
  y: number;
}

/**
 * Operation to move a shape
 */
export class MoveShapeOperation extends BaseOperation {
  private data: MoveShapeOperationData;
  private shapes: Shape[];
  private onUpdate: (shapes: Shape[]) => void;
  private previousX?: number;
  private previousY?: number;

  constructor(
    data: MoveShapeOperationData,
    shapes: Shape[],
    onUpdate: (shapes: Shape[]) => void,
    userId?: string
  ) {
    super('move-shape', userId);
    this.data = data;
    this.shapes = shapes;
    this.onUpdate = onUpdate;
  }

  execute(): void {
    const shapeIndex = this.shapes.findIndex(s => s.id === this.data.shapeId);
    if (shapeIndex === -1) {
      throw new Error(`Shape with id ${this.data.shapeId} not found`);
    }

    const shape = this.shapes[shapeIndex];
    
    // Store previous position for undo
    this.previousX = shape.x;
    this.previousY = shape.y;

    // Update position
    const updatedShape = { ...shape, x: this.data.x, y: this.data.y };
    const newShapes = [...this.shapes];
    newShapes[shapeIndex] = updatedShape;

    this.onUpdate(newShapes);
  }

  undo(): void {
    if (this.previousX === undefined || this.previousY === undefined) {
      throw new Error('Cannot undo: previous position not stored');
    }

    const shapeIndex = this.shapes.findIndex(s => s.id === this.data.shapeId);
    if (shapeIndex === -1) {
      throw new Error(`Shape with id ${this.data.shapeId} not found`);
    }

    const shape = this.shapes[shapeIndex];
    const updatedShape = { ...shape, x: this.previousX, y: this.previousY };
    const newShapes = [...this.shapes];
    newShapes[shapeIndex] = updatedShape;

    this.onUpdate(newShapes);
  }
}

