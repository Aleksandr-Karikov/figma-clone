/**
 * Document and artboard types
 */

import { Shape } from '../shapes/types';

/**
 * Artboard - frame that contains a group of shapes
 */
export interface Artboard {
  /** Unique identifier (UUID) */
  id: string;
  /** Artboard name */
  name: string;
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Width */
  width: number;
  /** Height */
  height: number;
  /** Background color */
  backgroundColor?: string;
  /** IDs of shapes belonging to artboard */
  shapeIds: string[];
}

/**
 * Canvas document - container for all shapes and artboards
 */
export interface CanvasDocument {
  /** Unique identifier (UUID) */
  id: string;
  /** Document name */
  name: string;
  /** Array of all shapes */
  shapes: Shape[];
  /** Array of artboards */
  artboards: Artboard[];
  /** Canvas width */
  width: number;
  /** Canvas height */
  height: number;
  /** Background color */
  backgroundColor?: string;
  /** Version for synchronization */
  version: number;
  /** Created timestamp */
  createdAt: Date;
  /** Updated timestamp */
  updatedAt: Date;
}

