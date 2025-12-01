/**
 * Create shape operation
 */

import { BaseOperation } from './base';
import { Shape } from '../shapes/types';

export interface CreateShapeOperationData {
  shape: Shape;
}

/**
 * Operation to create a new shape
 */
export class CreateShapeOperation extends BaseOperation {
  private data: CreateShapeOperationData;
  private shapes: Shape[];
  private onUpdate: (shapes: Shape[]) => void;

  constructor(
    data: CreateShapeOperationData,
    shapes: Shape[],
    onUpdate: (shapes: Shape[]) => void,
    userId?: string
  ) {
    super('create-shape', userId);
    this.data = data;
    this.shapes = shapes;
    this.onUpdate = onUpdate;
  }

  execute(): void {
    const newShapes = [...this.shapes, this.data.shape];
    this.onUpdate(newShapes);
  }

  undo(): void {
    const newShapes = this.shapes.filter(shape => shape.id !== this.data.shape.id);
    this.onUpdate(newShapes);
  }
}

