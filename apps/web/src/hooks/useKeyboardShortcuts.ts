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
    };

    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selection.shapeIds, deleteShape, undo, redo, canUndo, canRedo]);
}
