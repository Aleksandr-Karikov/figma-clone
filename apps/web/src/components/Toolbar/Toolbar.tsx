/**
 * Toolbar component for creating shapes
 */

import React from "react";
import { useCanvasStore } from "@/store/canvasStore";
import {
  createRectangle,
  createCircle,
  createText,
  ShapeType,
} from "@figma-clone/core";

export const Toolbar: React.FC = () => {
  const document = useCanvasStore((state) => state.document);
  const addShape = useCanvasStore((state) => state.addShape);

  const handleCreateShape = (type: ShapeType) => {
    if (!document) return;

    // Create shape in center of canvas
    const x = document.width / 2 - 100;
    const y = document.height / 2 - 50;

    let shape;
    switch (type) {
      case "rectangle":
        shape = createRectangle(x, y, 200, 100);
        break;
      case "circle":
        shape = createCircle(x, y, 200, 200);
        break;
      case "text":
        shape = createText(x, y, "Hello, World!");
        break;
    }

    if (shape) {
      addShape(shape);
    }
  };

  return (
    <div className="toolbar flex gap-2 p-4 bg-gray-100 border-b">
      <button
        onClick={() => handleCreateShape("rectangle")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={!document}
      >
        Rectangle
      </button>
      <button
        onClick={() => handleCreateShape("circle")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={!document}
      >
        Circle
      </button>
      <button
        onClick={() => handleCreateShape("text")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={!document}
      >
        Text
      </button>
    </div>
  );
};

