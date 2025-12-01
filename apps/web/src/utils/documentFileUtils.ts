/**
 * Browser-specific document file utilities
 */

import {
  CanvasDocument,
  serializeDocument,
  deserializeDocument,
} from "@figma-clone/core";

/**
 * Export document as downloadable JSON file
 */
export function exportDocumentToFile(
  doc: CanvasDocument,
  filename?: string
): void {
  const json = serializeDocument(doc);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || `${doc.name || "document"}.figma-clone.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Load document from file input
 */
export async function loadDocumentFromFile(
  file: File
): Promise<CanvasDocument> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const json = event.target?.result as string;
        const document = deserializeDocument(json);
        resolve(document);
      } catch (error) {
        reject(new Error("Failed to parse document file"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsText(file);
  });
}
