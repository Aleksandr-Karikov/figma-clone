/**
 * Shape factories for creating shapes with valid defaults
 */

import { Rectangle, Circle, Text, ShapeType } from "./types";

/**
 * Generate UUID v7-like ID (simplified version)
 * In production, use a proper UUID v7 library
 */
function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `${timestamp}-${random}`;
}

/**
 * Create a rectangle shape
 */
export function createRectangle(
  x: number,
  y: number,
  width: number,
  height: number,
  options?: Partial<
    Omit<Rectangle, "id" | "type" | "x" | "y" | "width" | "height">
  >
): Rectangle {
  return {
    id: generateId(),
    type: "rectangle",
    x,
    y,
    width,
    height,
    rotation: 0,
    opacity: 1,
    visible: true,
    locked: false,
    fill: "#3b82f6",
    stroke: undefined,
    strokeWidth: 0,
    cornerRadius: 0,
    ...options,
  };
}

/**
 * Create a circle shape
 */
export function createCircle(
  x: number,
  y: number,
  width: number,
  height: number,
  options?: Partial<
    Omit<Circle, "id" | "type" | "x" | "y" | "width" | "height">
  >
): Circle {
  return {
    id: generateId(),
    type: "circle",
    x,
    y,
    width,
    height,
    rotation: 0,
    opacity: 1,
    visible: true,
    locked: false,
    fill: "#3b82f6",
    stroke: undefined,
    strokeWidth: 0,
    ...options,
  };
}

/**
 * Create a text shape
 */
export function createText(
  x: number,
  y: number,
  text: string,
  options?: Partial<Omit<Text, "id" | "type" | "x" | "y" | "text">>
): Text {
  return {
    id: generateId(),
    type: "text",
    x,
    y,
    width: 200,
    height: 50,
    rotation: 0,
    opacity: 1,
    visible: true,
    locked: false,
    text,
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: 16,
    fontWeight: "normal",
    fill: "#000000",
    textAlign: "left",
    verticalAlign: "top",
    lineHeight: 1.5,
    ...options,
  };
}

/**
 * Factory function to create shape by type
 */
export function createShape(
  type: ShapeType,
  x: number,
  y: number,
  width: number,
  height: number,
  options?: Record<string, unknown>
): Rectangle | Circle | Text {
  switch (type) {
    case "rectangle":
      return createRectangle(
        x,
        y,
        width,
        height,
        options as Partial<Rectangle>
      );
    case "circle":
      return createCircle(x, y, width, height, options as Partial<Circle>);
    case "text":
      return createText(
        x,
        y,
        (options?.text as string) || "Text",
        options as Partial<Text>
      );
    default:
      throw new Error(`Unknown shape type: ${type}`);
  }
}
