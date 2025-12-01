/**
 * Document factories for creating documents with valid defaults
 */

import { CanvasDocument, Artboard } from "./types";

/**
 * Generate UUID v7-like ID (simplified version)
 */
function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `${timestamp}-${random}`;
}

/**
 * Create a new canvas document
 */
export function createDocument(
  name: string,
  width: number = 1920,
  height: number = 1080,
  options?: Partial<
    Omit<
      CanvasDocument,
      "id" | "name" | "width" | "height" | "version" | "createdAt" | "updatedAt"
    >
  >
): CanvasDocument {
  const now = new Date();
  return {
    id: generateId(),
    name,
    width,
    height,
    shapes: [],
    artboards: [],
    backgroundColor: "#ffffff",
    version: 1,
    createdAt: now,
    updatedAt: now,
    ...options,
  };
}

/**
 * Create a new artboard
 */
export function createArtboard(
  name: string,
  x: number,
  y: number,
  width: number,
  height: number,
  options?: Partial<
    Omit<Artboard, "id" | "name" | "x" | "y" | "width" | "height" | "shapeIds">
  >
): Artboard {
  return {
    id: generateId(),
    name,
    x,
    y,
    width,
    height,
    backgroundColor: "#ffffff",
    shapeIds: [],
    ...options,
  };
}
