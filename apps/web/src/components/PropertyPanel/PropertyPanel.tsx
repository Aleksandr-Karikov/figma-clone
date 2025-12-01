/**
 * Property panel for editing selected shape properties
 */

import React from "react";
import { useCanvasStore, CanvasState } from "@/store/canvasStore";
import { Shape, Rectangle, Circle, Text } from "@figma-clone/core";

export const PropertyPanel: React.FC = () => {
  const document = useCanvasStore((state: CanvasState) => state.document);
  const selection = useCanvasStore((state: CanvasState) => state.selection);
  const updateShape = useCanvasStore((state: CanvasState) => state.updateShape);

  // Get selected shape
  const selectedShape: Shape | undefined =
    selection.shapeIds.length === 1 && document
      ? document.shapes.find((s: Shape) => s.id === selection.shapeIds[0])
      : undefined;

  if (!selectedShape) {
    return (
      <div className="property-panel w-64 bg-white border-l p-4">
        <h3 className="text-sm font-semibold mb-4">Properties</h3>
        <p className="text-sm text-gray-500">No shape selected</p>
      </div>
    );
  }

  const handleUpdate = (updates: Partial<Shape>) => {
    updateShape(selectedShape.id, updates);
  };

  return (
    <div className="property-panel w-64 bg-white border-l p-4 overflow-y-auto">
      <h3 className="text-sm font-semibold mb-4">Properties</h3>

      {/* Position & Size */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-gray-700 mb-2">
          Position & Size
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">X</label>
            <input
              type="number"
              value={selectedShape.x}
              onChange={(e) =>
                handleUpdate({ x: parseFloat(e.target.value) || 0 })
              }
              className="w-full px-2 py-1 text-sm border rounded"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Y</label>
            <input
              type="number"
              value={selectedShape.y}
              onChange={(e) =>
                handleUpdate({ y: parseFloat(e.target.value) || 0 })
              }
              className="w-full px-2 py-1 text-sm border rounded"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Width</label>
            <input
              type="number"
              value={selectedShape.width}
              onChange={(e) =>
                handleUpdate({ width: parseFloat(e.target.value) || 0 })
              }
              className="w-full px-2 py-1 text-sm border rounded"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Height</label>
            <input
              type="number"
              value={selectedShape.height}
              onChange={(e) =>
                handleUpdate({ height: parseFloat(e.target.value) || 0 })
              }
              className="w-full px-2 py-1 text-sm border rounded"
            />
          </div>
        </div>
      </div>

      {/* Rotation & Opacity */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-gray-700 mb-2">Transform</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Rotation</label>
            <input
              type="number"
              value={selectedShape.rotation}
              onChange={(e) =>
                handleUpdate({ rotation: parseFloat(e.target.value) || 0 })
              }
              className="w-full px-2 py-1 text-sm border rounded"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Opacity</label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={selectedShape.opacity}
              onChange={(e) =>
                handleUpdate({ opacity: parseFloat(e.target.value) || 0 })
              }
              className="w-full px-2 py-1 text-sm border rounded"
            />
          </div>
        </div>
      </div>

      {/* Type-specific properties */}
      {selectedShape.type === "rectangle" && (
        <RectangleProperties shape={selectedShape} onUpdate={handleUpdate} />
      )}
      {selectedShape.type === "circle" && (
        <CircleProperties shape={selectedShape} onUpdate={handleUpdate} />
      )}
      {selectedShape.type === "text" && (
        <TextProperties shape={selectedShape} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

interface RectanglePropertiesProps {
  shape: Rectangle;
  onUpdate: (updates: Partial<Rectangle>) => void;
}

const RectangleProperties: React.FC<RectanglePropertiesProps> = ({
  shape,
  onUpdate,
}) => {
  return (
    <div className="mb-4">
      <h4 className="text-xs font-medium text-gray-700 mb-2">Rectangle</h4>
      <div className="space-y-2">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Fill</label>
          <input
            type="color"
            value={shape.fill || "#3b82f6"}
            onChange={(e) => onUpdate({ fill: e.target.value })}
            className="w-full h-8 border rounded"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Stroke</label>
          <input
            type="color"
            value={shape.stroke || "#000000"}
            onChange={(e) => onUpdate({ stroke: e.target.value })}
            className="w-full h-8 border rounded"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            Stroke Width
          </label>
          <input
            type="number"
            min="0"
            value={shape.strokeWidth || 0}
            onChange={(e) =>
              onUpdate({ strokeWidth: parseFloat(e.target.value) || 0 })
            }
            className="w-full px-2 py-1 text-sm border rounded"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            Corner Radius
          </label>
          <input
            type="number"
            min="0"
            value={shape.cornerRadius || 0}
            onChange={(e) =>
              onUpdate({ cornerRadius: parseFloat(e.target.value) || 0 })
            }
            className="w-full px-2 py-1 text-sm border rounded"
          />
        </div>
      </div>
    </div>
  );
};

interface CirclePropertiesProps {
  shape: Circle;
  onUpdate: (updates: Partial<Circle>) => void;
}

const CircleProperties: React.FC<CirclePropertiesProps> = ({
  shape,
  onUpdate,
}) => {
  return (
    <div className="mb-4">
      <h4 className="text-xs font-medium text-gray-700 mb-2">Circle</h4>
      <div className="space-y-2">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Fill</label>
          <input
            type="color"
            value={shape.fill || "#3b82f6"}
            onChange={(e) => onUpdate({ fill: e.target.value })}
            className="w-full h-8 border rounded"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Stroke</label>
          <input
            type="color"
            value={shape.stroke || "#000000"}
            onChange={(e) => onUpdate({ stroke: e.target.value })}
            className="w-full h-8 border rounded"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            Stroke Width
          </label>
          <input
            type="number"
            min="0"
            value={shape.strokeWidth || 0}
            onChange={(e) =>
              onUpdate({ strokeWidth: parseFloat(e.target.value) || 0 })
            }
            className="w-full px-2 py-1 text-sm border rounded"
          />
        </div>
      </div>
    </div>
  );
};

interface TextPropertiesProps {
  shape: Text;
  onUpdate: (updates: Partial<Text>) => void;
}

const TextProperties: React.FC<TextPropertiesProps> = ({ shape, onUpdate }) => {
  return (
    <div className="mb-4">
      <h4 className="text-xs font-medium text-gray-700 mb-2">Text</h4>
      <div className="space-y-2">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Content</label>
          <textarea
            value={shape.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            className="w-full px-2 py-1 text-sm border rounded"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Font Size</label>
          <input
            type="number"
            min="1"
            value={shape.fontSize || 16}
            onChange={(e) =>
              onUpdate({ fontSize: parseFloat(e.target.value) || 16 })
            }
            className="w-full px-2 py-1 text-sm border rounded"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            Font Family
          </label>
          <input
            type="text"
            value={shape.fontFamily || "Arial"}
            onChange={(e) => onUpdate({ fontFamily: e.target.value })}
            className="w-full px-2 py-1 text-sm border rounded"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Color</label>
          <input
            type="color"
            value={shape.fill || "#000000"}
            onChange={(e) => onUpdate({ fill: e.target.value })}
            className="w-full h-8 border rounded"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Text Align</label>
          <select
            value={shape.textAlign || "left"}
            onChange={(e) =>
              onUpdate({
                textAlign: e.target.value as
                  | "left"
                  | "center"
                  | "right"
                  | "justify",
              })
            }
            className="w-full px-2 py-1 text-sm border rounded"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </div>
      </div>
    </div>
  );
};
