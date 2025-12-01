/**
 * Konva renderer implementation
 */

import Konva from "konva";
import {
  IRenderer,
  RendererEvent,
  RendererEventType,
  RendererEventHandler,
  BoundingBox,
} from "./IRenderer";
import { Shape, Rectangle, Circle, Text } from "../../domain/shapes/types";

/**
 * Konva renderer implementation using Konva library
 */
export class KonvaRenderer implements IRenderer {
  private stage: Konva.Stage | null = null;
  private layer: Konva.Layer | null = null;
  private shapeMap: Map<string, Konva.Shape> = new Map();
  private eventHandlers: Map<RendererEventType, Set<RendererEventHandler>> =
    new Map();
  private shapes: Shape[] = [];

  init(container: HTMLElement, width: number, height: number): void {
    if (this.stage) {
      this.destroy();
    }

    this.stage = new Konva.Stage({
      container,
      width,
      height,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    // Handle canvas clicks
    this.stage.on("click", () => {
      const pos = this.stage!.getPointerPosition();
      if (pos) {
        this.emit("canvas:click", { type: "canvas:click", x: pos.x, y: pos.y });
      }
    });
  }

  addShape(shape: Shape): void {
    if (this.shapeMap.has(shape.id)) {
      this.updateShape(shape);
      return;
    }

    const node = this.createKonvaNode(shape);
    if (node && this.layer) {
      this.layer.add(node);
      this.shapeMap.set(shape.id, node);
      // Create a new array to avoid mutating frozen array from Immer
      this.shapes = [...this.shapes, shape];
      this.layer.draw();
    }
  }

  updateShape(shape: Shape): void {
    const node = this.shapeMap.get(shape.id);
    if (!node) {
      this.addShape(shape);
      return;
    }

    this.updateKonvaNode(node, shape);

    // Update shapes array - create new array to avoid mutating frozen array
    const index = this.shapes.findIndex((s) => s.id === shape.id);
    if (index !== -1) {
      this.shapes = [
        ...this.shapes.slice(0, index),
        shape,
        ...this.shapes.slice(index + 1),
      ];
    }

    if (this.layer) {
      this.layer.draw();
    }
  }

  removeShape(shapeId: string): void {
    const node = this.shapeMap.get(shapeId);
    if (node && this.layer) {
      node.destroy();
      this.shapeMap.delete(shapeId);
      this.shapes = this.shapes.filter((s) => s.id !== shapeId);
      this.layer.draw();
    }
  }

  getShape(shapeId: string): Shape | undefined {
    return this.shapes.find((s) => s.id === shapeId);
  }

  sync(shapes: Shape[]): void {
    // Remove shapes that are no longer in the list
    const currentIds = new Set(shapes.map((s) => s.id));
    for (const [id] of this.shapeMap) {
      if (!currentIds.has(id)) {
        this.removeShape(id);
      }
    }

    // Add or update shapes
    for (const shape of shapes) {
      if (this.shapeMap.has(shape.id)) {
        this.updateShape(shape);
      } else {
        this.addShape(shape);
      }
    }

    // Create a new array copy to avoid mutating frozen array from Immer
    this.shapes = [...shapes];
  }

  clear(): void {
    if (this.layer) {
      this.layer.destroyChildren();
      this.shapeMap.clear();
      this.shapes = [];
      this.layer.draw();
    }
  }

  getBoundingBox(shapeId: string): BoundingBox | undefined {
    const node = this.shapeMap.get(shapeId);
    if (!node) return undefined;

    const box = node.getClientRect();
    return {
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
    };
  }

  hitTest(x: number, y: number): string | undefined {
    if (!this.stage) return undefined;

    const shapes = this.stage.getIntersection({ x, y });
    if (shapes && Array.isArray(shapes) && shapes.length > 0) {
      // Find the shape ID from the Konva node
      for (const [id, node] of this.shapeMap) {
        if (shapes.includes(node as Konva.Shape)) {
          return id;
        }
      }
    }
    return undefined;
  }

  on(event: RendererEventType, handler: RendererEventHandler): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event)!.add(handler);
  }

  off(event: RendererEventType, handler: RendererEventHandler): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  destroy(): void {
    if (this.stage) {
      this.stage.destroy();
      this.stage = null;
      this.layer = null;
      this.shapeMap.clear();
      this.eventHandlers.clear();
      this.shapes = [];
    }
  }

  /**
   * Create Konva node from shape
   */
  private createKonvaNode(shape: Shape): Konva.Shape | null {
    switch (shape.type) {
      case "rectangle":
        return this.createRectangleNode(shape);
      case "circle":
        return this.createCircleNode(shape);
      case "text":
        return this.createTextNode(shape);
      default:
        return null;
    }
  }

  /**
   * Create rectangle Konva node
   */
  private createRectangleNode(shape: Rectangle): Konva.Rect {
    const rect = new Konva.Rect({
      id: shape.id,
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
      rotation: shape.rotation,
      opacity: shape.opacity,
      visible: shape.visible,
      fill: shape.fill,
      stroke: shape.stroke,
      strokeWidth: shape.strokeWidth || 0,
      cornerRadius: shape.cornerRadius || 0,
      draggable: !shape.locked,
    });

    this.setupShapeEvents(rect, shape.id);
    return rect;
  }

  /**
   * Create circle Konva node
   */
  private createCircleNode(shape: Circle): Konva.Circle {
    // For circle, use width/height to determine radius
    const radius = Math.min(shape.width, shape.height) / 2;
    const centerX = shape.x + shape.width / 2;
    const centerY = shape.y + shape.height / 2;

    const circle = new Konva.Circle({
      id: shape.id,
      x: centerX,
      y: centerY,
      radius,
      rotation: shape.rotation,
      opacity: shape.opacity,
      visible: shape.visible,
      fill: shape.fill,
      stroke: shape.stroke,
      strokeWidth: shape.strokeWidth || 0,
      draggable: !shape.locked,
    });

    this.setupShapeEvents(circle, shape.id);
    return circle;
  }

  /**
   * Create text Konva node
   */
  private createTextNode(shape: Text): Konva.Text {
    const text = new Konva.Text({
      id: shape.id,
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
      rotation: shape.rotation,
      opacity: shape.opacity,
      visible: shape.visible,
      text: shape.text,
      fontFamily: shape.fontFamily || "Arial",
      fontSize: shape.fontSize || 16,
      fontStyle: this.getFontStyle(shape.fontWeight),
      fill: shape.fill || "#000000",
      align: shape.textAlign || "left",
      verticalAlign: shape.verticalAlign || "top",
      lineHeight: shape.lineHeight || 1.5,
      draggable: !shape.locked,
    });

    this.setupShapeEvents(text, shape.id);
    return text;
  }

  /**
   * Update Konva node with shape data
   */
  private updateKonvaNode(node: Konva.Shape, shape: Shape): void {
    node.setAttrs({
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
      rotation: shape.rotation,
      opacity: shape.opacity,
      visible: shape.visible,
      draggable: !shape.locked,
    });

    switch (shape.type) {
      case "rectangle": {
        const rect = node as Konva.Rect;
        const rShape = shape as Rectangle;
        rect.fill(rShape.fill);
        rect.stroke(rShape.stroke);
        rect.strokeWidth(rShape.strokeWidth || 0);
        rect.cornerRadius(rShape.cornerRadius || 0);
        break;
      }
      case "circle": {
        const circle = node as Konva.Circle;
        const cShape = shape as Circle;
        const radius = Math.min(shape.width, shape.height) / 2;
        const centerX = shape.x + shape.width / 2;
        const centerY = shape.y + shape.height / 2;
        circle.x(centerX);
        circle.y(centerY);
        circle.radius(radius);
        circle.fill(cShape.fill);
        circle.stroke(cShape.stroke);
        circle.strokeWidth(cShape.strokeWidth || 0);
        break;
      }
      case "text": {
        const text = node as Konva.Text;
        const tShape = shape as Text;
        text.text(tShape.text);
        text.fontFamily(tShape.fontFamily || "Arial");
        text.fontSize(tShape.fontSize || 16);
        text.fontStyle(this.getFontStyle(tShape.fontWeight));
        text.fill(tShape.fill || "#000000");
        text.align(tShape.textAlign || "left");
        text.verticalAlign(tShape.verticalAlign || "top");
        text.lineHeight(tShape.lineHeight || 1.5);
        break;
      }
    }
  }

  /**
   * Setup event handlers for shape
   */
  private setupShapeEvents(node: Konva.Shape, shapeId: string): void {
    node.on("click", () => {
      this.emit("shape:click", { type: "shape:click", shapeId });
    });

    node.on("dragmove", () => {
      const pos = node.position();
      this.emit("shape:drag", {
        type: "shape:drag",
        shapeId,
        x: pos.x,
        y: pos.y,
      });
    });

    node.on("dragend", () => {
      // Update shape position in shapes array
      const shapeIndex = this.shapes.findIndex((s) => s.id === shapeId);
      if (shapeIndex !== -1) {
        const shape = this.shapes[shapeIndex];
        const pos = node.position();

        // Create updated shape with new position
        let updatedShape: Shape;
        // For circle, adjust position based on center
        if (shape.type === "circle") {
          updatedShape = {
            ...shape,
            x: pos.x - shape.width / 2,
            y: pos.y - shape.height / 2,
          };
        } else {
          updatedShape = {
            ...shape,
            x: pos.x,
            y: pos.y,
          };
        }

        // Update shapes array - create new array to avoid mutating frozen array
        this.shapes = [
          ...this.shapes.slice(0, shapeIndex),
          updatedShape,
          ...this.shapes.slice(shapeIndex + 1),
        ];
      }

      const pos = node.position();
      this.emit("shape:dragend", {
        type: "shape:dragend",
        shapeId,
        x: pos.x,
        y: pos.y,
      });
    });
  }

  /**
   * Get font style from fontWeight
   */
  private getFontStyle(fontWeight?: string | number): string {
    if (!fontWeight) return "normal";
    if (typeof fontWeight === "number") {
      return fontWeight >= 600 ? "bold" : "normal";
    }
    return fontWeight;
  }

  /**
   * Emit event to handlers
   */
  private emit(event: RendererEventType, data: RendererEvent): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }
}
