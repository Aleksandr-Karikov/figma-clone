/**
 * Document serialization utilities
 */

import { CanvasDocument } from "./types";

/**
 * Serialize document to JSON string
 * Handles Date objects by converting them to ISO strings
 */
export function serializeDocument(document: CanvasDocument): string {
  const serializable = {
    ...document,
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  };
  return JSON.stringify(serializable, null, 2);
}

/**
 * Deserialize document from JSON string
 * Converts ISO date strings back to Date objects
 */
export function deserializeDocument(json: string): CanvasDocument {
  const parsed = JSON.parse(json);
  return {
    ...parsed,
    createdAt: new Date(parsed.createdAt),
    updatedAt: new Date(parsed.updatedAt),
  };
}
