/**
 * Shared types for selection, transform, and collaboration
 */

/**
 * Selection state
 */
export interface Selection {
  /** Selected shape IDs */
  shapeIds: string[];
  /** Selection bounding box (optional) */
  bounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

/**
 * Transformation data for shapes
 */
export interface Transform {
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Width */
  width: number;
  /** Height */
  height: number;
  /** Rotation in degrees */
  rotation: number;
  /** Scale X factor */
  scaleX?: number;
  /** Scale Y factor */
  scaleY?: number;
}

/**
 * User data for real-time collaboration
 */
export interface User {
  /** User ID (UUID) */
  id: string;
  /** User name */
  name: string;
  /** Avatar URL (optional) */
  avatar?: string;
  /** Cursor/selection color */
  color: string;
  /** Current cursor position (optional) */
  cursor?: {
    x: number;
    y: number;
  };
}
