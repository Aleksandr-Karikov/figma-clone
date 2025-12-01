/**
 * Renderer factory for creating renderer instances
 */

import { IRenderer } from './IRenderer';
import { KonvaRenderer } from './KonvaRenderer';

/**
 * Renderer type
 */
export type RendererType = 'konva';

/**
 * Create a renderer instance
 */
export function createRenderer(type: RendererType = 'konva'): IRenderer {
  switch (type) {
    case 'konva':
      return new KonvaRenderer();
    default:
      throw new Error(`Unknown renderer type: ${type}`);
  }
}

