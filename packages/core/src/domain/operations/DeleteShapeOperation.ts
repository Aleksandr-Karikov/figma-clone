/**
 * Delete shape operation
 */

import { BaseOperation } from './base';
import { Shape } from '../shapes/types';

export interface DeleteShapeOperationData {
  shapeId: string;
}

/**
 * Operation to delete a shape
 */
export class DeleteShapeOperation extends BaseOperation {
  private data: DeleteShapeOperationData;
  private shapes: Shape[];
  private onUpdate: (shapes: Shape[]) => void;
  private deletedShape?: Shape;

  constructor(
    data: DeleteShapeOperationData,
    shapes: Shape[],
    onUpdate: (shapes: Shape[]) => void,
    userId?: string
  ) {
    super('delete-shape', userId);
    this.data = data;
    this.shapes = shapes;
    this.onUpdate = onUpdate;
  }

  execute(): void {
    const shapeIndex = this.shapes.findIndex(s => s.id === this.data.shapeId);
    if (shapeIndex === -1) {
      throw new Error(`Shape with id ${this.data.shapeId} not found`);
    }

    // Store deleted shape for undo
    this.deletedShape = { ...this.shapes[shapeIndex] };

    // Remove shape
    const newShapes = this.shapes.filter(shape => shape.id !== this.data.shapeId);
    this.onUpdate(newShapes);
  }

  undo(): void {
    if (!this.deletedShape) {
      throw new Error('Cannot undo: deleted shape not stored');
    }

    // Restore shape
    const newShapes = [...this.shapes, this.deletedShape];
    this.onUpdate(newShapes);
  }
}

