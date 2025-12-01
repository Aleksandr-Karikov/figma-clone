/**
 * Renderer interface - abstraction over graphics library
 */

import { Shape } from "../../domain/shapes/types";

/**
 * Renderer event types
 */
export type RendererEventType =
  | "shape:click"
  | "shape:drag"
  | "shape:dragend"
  | "canvas:click";

/**
 * Renderer event handler
 */
export type RendererEventHandler = (event: RendererEvent) => void;

/**
 * Renderer event
 */
export interface RendererEvent {
  type: RendererEventType;
  shapeId?: string;
  x?: number;
  y?: number;
  [key: string]: unknown;
}

/**
 * Bounding box
 */
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Renderer interface - abstraction for all graphics operations
 */
export interface IRenderer {
  /**
   * Initialize renderer with container element
   */
  init(container: HTMLElement, width: number, height: number): void;

  /**
   * Add or update a shape
   */
  addShape(shape: Shape): void;

  /**
   * Update an existing shape
   */
  updateShape(shape: Shape): void;

  /**
   * Remove a shape
   */
  removeShape(shapeId: string): void;

  /**
   * Get shape by ID
   */
  getShape(shapeId: string): Shape | undefined;

  /**
   * Sync all shapes (replace current shapes with new ones)
   */
  sync(shapes: Shape[]): void;

  /**
   * Clear all shapes
   */
  clear(): void;

  /**
   * Get bounding box for shape
   */
  getBoundingBox(shapeId: string): BoundingBox | undefined;

  /**
   * Hit test - check if point hits a shape
   */
  hitTest(x: number, y: number): string | undefined;

  /**
   * Subscribe to renderer events
   */
  on(event: RendererEventType, handler: RendererEventHandler): void;

  /**
   * Unsubscribe from renderer events
   */
  off(event: RendererEventType, handler: RendererEventHandler): void;

  /**
   * Destroy renderer and cleanup
   */
  destroy(): void;
}
