/**
 * Hook for keyboard shortcuts
 * Business logic hook - belongs to web app, not UI package
 */

import { useEffect } from "react";
import { useCanvasStore, CanvasState } from "@/store/canvasStore";

export function useKeyboardShortcuts() {
  const deleteShape = useCanvasStore((state: CanvasState) => state.deleteShape);
  const selection = useCanvasStore((state: CanvasState) => state.selection);
  const undo = useCanvasStore((state: CanvasState) => state.undo);
  const redo = useCanvasStore((state: CanvasState) => state.redo);
  const canUndo = useCanvasStore((state: CanvasState) => state.canUndo);
  const canRedo = useCanvasStore((state: CanvasState) => state.canRedo);
  const saveDocument = useCanvasStore(
    (state: CanvasState) => state.saveDocument
  );
  const canvasDocument = useCanvasStore((state: CanvasState) => state.document);
  const selectAll = useCanvasStore((state: CanvasState) => state.selectAll);
  const duplicateSelectedShapes = useCanvasStore(
    (state: CanvasState) => state.duplicateSelectedShapes
  );
  const moveSelectedShapes = useCanvasStore(
    (state: CanvasState) => state.moveSelectedShapes
  );

  useEffect(() => {
    const handleKeyDown = (event: Event) => {
      const e = event as unknown as {
        key: string;
        ctrlKey: boolean;
        metaKey: boolean;
        shiftKey: boolean;
        preventDefault: () => void;
      };

      // Delete selected shapes
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selection.shapeIds.length > 0
      ) {
        e.preventDefault();
        // Delete in reverse order to maintain correct indices
        [...selection.shapeIds].reverse().forEach((shapeId) => {
          deleteShape(shapeId);
        });
        return;
      }

      // Undo (Ctrl/Cmd + Z)
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        if (canUndo()) {
          undo();
        }
        return;
      }

      // Redo (Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y)
      if (
        ((e.ctrlKey || e.metaKey) && e.key === "z" && e.shiftKey) ||
        ((e.ctrlKey || e.metaKey) && e.key === "y")
      ) {
        e.preventDefault();
        if (canRedo()) {
          redo();
        }
        return;
      }

      // Save (Ctrl/Cmd + S)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (canvasDocument) {
          saveDocument();
        }
        return;
      }

      // Select All (Ctrl/Cmd + A)
      if ((e.ctrlKey || e.metaKey) && e.key === "a") {
        e.preventDefault();
        selectAll();
        return;
      }

      // Duplicate (Ctrl/Cmd + D)
      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        if (selection.shapeIds.length > 0) {
          duplicateSelectedShapes();
        }
        return;
      }

      // Arrow keys - move selected shapes (only if not in input)
      const target = (e as any).target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      if (!isInput && selection.shapeIds.length > 0) {
        const step = e.shiftKey ? 10 : 1; // Shift + arrow = 10px, regular = 1px

        if (e.key === "ArrowLeft") {
          e.preventDefault();
          moveSelectedShapes(-step, 0);
          return;
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          moveSelectedShapes(step, 0);
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          moveSelectedShapes(0, -step);
          return;
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          moveSelectedShapes(0, step);
          return;
        }
      }
    };

    if (typeof window !== "undefined" && window.document) {
      window.document.addEventListener("keydown", handleKeyDown);
      return () => {
        window.document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [
    selection.shapeIds,
    deleteShape,
    undo,
    redo,
    canUndo,
    canRedo,
    saveDocument,
    canvasDocument,
    selectAll,
    duplicateSelectedShapes,
    moveSelectedShapes,
  ]);
}
