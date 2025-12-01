/**
 * Toolbar component for creating shapes
 */

import React, { useRef } from "react";
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
  const saveDocument = useCanvasStore((state) => state.saveDocument);
  const loadDocument = useCanvasStore((state) => state.loadDocument);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSave = () => {
    if (document) {
      saveDocument();
    }
  };

  const handleLoad = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await loadDocument(file);
      } catch (error) {
        alert("Failed to load document. Please check the file format.");
        console.error(error);
      }
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="toolbar flex gap-2 p-4 bg-gray-100 border-b items-center">
      <div className="flex gap-2 border-r pr-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!document}
          title="Save document (Ctrl+S)"
        >
          Save
        </button>
        <button
          onClick={handleLoad}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          title="Load document"
        >
          Load
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".figma-clone.json,.json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div className="flex gap-2 border-r pr-4">
        <button
          onClick={() => handleCreateShape("rectangle")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!document}
          title="Add Rectangle"
        >
          Rectangle
        </button>
        <button
          onClick={() => handleCreateShape("circle")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!document}
          title="Add Circle"
        >
          Circle
        </button>
        <button
          onClick={() => handleCreateShape("text")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!document}
          title="Add Text"
        >
          Text
        </button>
      </div>
    </div>
  );
};

