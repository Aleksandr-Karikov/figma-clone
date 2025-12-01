/**
 * Update shape operation
 */

import { BaseOperation } from "./base";
import { Shape } from "../shapes/types";

export interface UpdateShapeOperationData {
  shapeId: string;
  updates: Partial<Shape>;
}

/**
 * Operation to update shape properties
 */
export class UpdateShapeOperation extends BaseOperation {
  private data: UpdateShapeOperationData;
  private shapes: Shape[];
  private onUpdate: (shapes: Shape[]) => void;
  private previousShape?: Shape;

  constructor(
    data: UpdateShapeOperationData,
    shapes: Shape[],
    onUpdate: (shapes: Shape[]) => void,
    userId?: string
  ) {
    super("update-shape", userId);
    this.data = data;
    this.shapes = shapes;
    this.onUpdate = onUpdate;
  }

  execute(): void {
    const shapeIndex = this.shapes.findIndex((s) => s.id === this.data.shapeId);
    if (shapeIndex === -1) {
      throw new Error(`Shape with id ${this.data.shapeId} not found`);
    }

    // Store previous shape for undo
    this.previousShape = { ...this.shapes[shapeIndex] };

    // Update shape
    const updatedShape = {
      ...this.shapes[shapeIndex],
      ...this.data.updates,
    } as Shape;
    const newShapes = [...this.shapes];
    newShapes[shapeIndex] = updatedShape;

    this.onUpdate(newShapes);
  }

  undo(): void {
    if (!this.previousShape) {
      throw new Error("Cannot undo: previous shape not stored");
    }

    const shapeIndex = this.shapes.findIndex((s) => s.id === this.data.shapeId);
    if (shapeIndex === -1) {
      throw new Error(`Shape with id ${this.data.shapeId} not found`);
    }

    const newShapes = [...this.shapes];
    newShapes[shapeIndex] = this.previousShape;

    this.onUpdate(newShapes);
  }
}
