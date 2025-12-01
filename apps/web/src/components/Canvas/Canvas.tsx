/**
 * Canvas component - main component for displaying and interacting with shapes
 */

import React, { useEffect, useRef } from "react";
import { useCanvasStore } from "@/store/canvasStore";
import { createRenderer, IRenderer } from "@figma-clone/core";

interface CanvasProps {
  width?: number;
  height?: number;
}

export const Canvas: React.FC<CanvasProps> = ({
  width = 1920,
  height = 1080,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<IRenderer | null>(null);

  const document = useCanvasStore((state) => state.document);
  const selection = useCanvasStore((state) => state.selection);
  const selectShape = useCanvasStore((state) => state.selectShape);
  const deselectAll = useCanvasStore((state) => state.deselectAll);
  const moveShape = useCanvasStore((state) => state.moveShape);

  // Initialize renderer
  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = createRenderer("konva");
    renderer.init(containerRef.current, width, height);
    rendererRef.current = renderer;

    // Handle renderer events
    renderer.on("shape:click", (event) => {
      if (event.shapeId) {
        selectShape(event.shapeId);
      }
    });

    renderer.on("canvas:click", () => {
      deselectAll();
    });

    renderer.on("shape:dragend", (event) => {
      if (event.shapeId) {
        const shape = renderer.getShape(event.shapeId);
        if (shape) {
          moveShape(event.shapeId, shape.x, shape.y);
        }
      }
    });

    return () => {
      renderer.destroy();
      rendererRef.current = null;
    };
  }, [width, height, selectShape, deselectAll, moveShape]);

  // Sync renderer with document shapes
  useEffect(() => {
    if (!rendererRef.current || !document) return;

    rendererRef.current.sync(document.shapes);
  }, [document?.shapes, document?.version]);

  // Sync selection with renderer
  useEffect(() => {
    if (!rendererRef.current) return;

    rendererRef.current.setSelection(selection.shapeIds);
  }, [selection.shapeIds]);

  return (
    <div
      ref={containerRef}
      className="canvas-container"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: document?.backgroundColor || "#ffffff",
      }}
    />
  );
};

