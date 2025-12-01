/**
 * Canvas store using Zustand + Immer
 */

import { create } from "zustand";
import { produce } from "immer";
import {
  CanvasDocument,
  Shape,
  Selection,
  createDocument,
} from "@figma-clone/core";
import {
  IOperation,
  CreateShapeOperation,
  UpdateShapeOperation,
  DeleteShapeOperation,
  MoveShapeOperation,
} from "@figma-clone/core";

/**
 * Canvas store state
 */
export interface CanvasState {
  // Document
  document: CanvasDocument | null;

  // Selection
  selection: Selection;

  // Operation history
  operations: IOperation[];
  currentOperationIndex: number;
  maxHistorySize: number;

  // Actions
  setDocument: (document: CanvasDocument) => void;
  createNewDocument: (name: string, width?: number, height?: number) => void;

  // Shape actions
  addShape: (shape: Shape) => void;
  updateShape: (shapeId: string, updates: Partial<Shape>) => void;
  deleteShape: (shapeId: string) => void;
  moveShape: (shapeId: string, x: number, y: number) => void;

  // Selection actions
  selectShape: (shapeId: string) => void;
  selectShapes: (shapeIds: string[]) => void;
  deselectAll: () => void;

  // Operation actions
  addOperation: (operation: IOperation) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Internal update handler
  _updateShapes: (shapes: Shape[]) => void;
}

/**
 * Create canvas store
 */
export const useCanvasStore = create<CanvasState>()((set, get) => ({
  // Initial state
  document: null,
  selection: {
    shapeIds: [],
  },
  operations: [],
  currentOperationIndex: -1,
  maxHistorySize: 50,

  // Document actions
  setDocument: (document) =>
    set(
      produce((state: CanvasState) => {
        state.document = document;
        state.selection = { shapeIds: [] };
        state.operations = [];
        state.currentOperationIndex = -1;
      })
    ),

  createNewDocument: (name, width = 1920, height = 1080) =>
    set(
      produce((state: CanvasState) => {
        state.document = createDocument(name, width, height);
        state.selection = { shapeIds: [] };
        state.operations = [];
        state.currentOperationIndex = -1;
      })
    ),

  // Shape actions
  addShape: (shape) => {
    const state = get();
    if (!state.document) return;

    const operation = new CreateShapeOperation(
      { shape },
      state.document.shapes,
      (shapes) => {
        get()._updateShapes(shapes);
      }
    );

    operation.execute();
    state.addOperation(operation);
  },

  updateShape: (shapeId, updates) => {
    const state = get();
    if (!state.document) return;

    const operation = new UpdateShapeOperation(
      { shapeId, updates },
      state.document.shapes,
      (shapes) => {
        get()._updateShapes(shapes);
      }
    );

    operation.execute();
    state.addOperation(operation);
  },

  deleteShape: (shapeId) => {
    const state = get();
    if (!state.document) return;

    const operation = new DeleteShapeOperation(
      { shapeId },
      state.document.shapes,
      (shapes) => {
        get()._updateShapes(shapes);
      }
    );

    operation.execute();
    state.addOperation(operation);

    // Remove from selection if selected
    if (state.selection.shapeIds.includes(shapeId)) {
      state.deselectAll();
    }
  },

  moveShape: (shapeId, x, y) => {
    const state = get();
    if (!state.document) return;

    const operation = new MoveShapeOperation(
      { shapeId, x, y },
      state.document.shapes,
      (shapes) => {
        get()._updateShapes(shapes);
      }
    );

    operation.execute();
    state.addOperation(operation);
  },

  // Selection actions
  selectShape: (shapeId) =>
    set(
      produce((state: CanvasState) => {
        state.selection = {
          shapeIds: [shapeId],
        };
      })
    ),

  selectShapes: (shapeIds) =>
    set(
      produce((state: CanvasState) => {
        state.selection = {
          shapeIds: [...shapeIds],
        };
      })
    ),

  deselectAll: () =>
    set(
      produce((state: CanvasState) => {
        state.selection = {
          shapeIds: [],
        };
      })
    ),

  // Operation actions
  addOperation: (operation) =>
    set(
      produce((state: CanvasState) => {
        // Remove operations after current index (if any)
        if (state.currentOperationIndex < state.operations.length - 1) {
          state.operations = state.operations.slice(
            0,
            state.currentOperationIndex + 1
          );
        }

        // Add new operation
        state.operations.push(operation);
        state.currentOperationIndex = state.operations.length - 1;

        // Limit history size
        if (state.operations.length > state.maxHistorySize) {
          state.operations.shift();
          state.currentOperationIndex = state.operations.length - 1;
        }
      })
    ),

  undo: () => {
    const state = get();
    if (!state.canUndo()) return;

    const operation = state.operations[state.currentOperationIndex];
    operation.undo();

    set(
      produce((state: CanvasState) => {
        state.currentOperationIndex -= 1;
      })
    );
  },

  redo: () => {
    const state = get();
    if (!state.canRedo()) return;

    set(
      produce((state: CanvasState) => {
        state.currentOperationIndex += 1;
        const operation = state.operations[state.currentOperationIndex];
        operation.redo();
      })
    );
  },

  canUndo: () => {
    const state = get();
    return state.currentOperationIndex >= 0;
  },

  canRedo: () => {
    const state = get();
    return state.currentOperationIndex < state.operations.length - 1;
  },

  // Internal update handler
  _updateShapes: (shapes) =>
    set(
      produce((state: CanvasState) => {
        if (state.document) {
          state.document.shapes = shapes;
          state.document.version += 1;
          state.document.updatedAt = new Date();
        }
      })
    ),
}));
