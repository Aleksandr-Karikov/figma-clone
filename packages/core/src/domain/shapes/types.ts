/**
 * Shape types and interfaces
 * All shapes extend BaseShape and add type-specific properties
 */

/**
 * Shape type discriminator
 */
export type ShapeType = "rectangle" | "circle" | "text";

/**
 * Base interface for all shapes on canvas
 */
export interface BaseShape {
  /** Unique identifier (UUID v7) */
  id: string;
  /** Shape type discriminator */
  type: ShapeType;
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Width */
  width: number;
  /** Height */
  height: number;
  /** Rotation in degrees */
  rotation: number;
  /** Opacity (0-1) */
  opacity: number;
  /** Visibility flag */
  visible: boolean;
  /** Lock flag */
  locked: boolean;
  /** Extension metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Rectangle shape
 */
export interface Rectangle extends BaseShape {
  type: "rectangle";
  /** Fill color */
  fill?: string;
  /** Stroke color */
  stroke?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Corner radius */
  cornerRadius?: number;
}

/**
 * Circle shape
 */
export interface Circle extends BaseShape {
  type: "circle";
  /** Fill color */
  fill?: string;
  /** Stroke color */
  stroke?: string;
  /** Stroke width */
  strokeWidth?: number;
}

/**
 * Text shape
 */
export interface Text extends BaseShape {
  type: "text";
  /** Text content */
  text: string;
  /** Font family */
  fontFamily?: string;
  /** Font size */
  fontSize?: number;
  /** Font weight */
  fontWeight?: string | number;
  /** Text color */
  fill?: string;
  /** Text alignment */
  textAlign?: "left" | "center" | "right" | "justify";
  /** Vertical alignment */
  verticalAlign?: "top" | "middle" | "bottom";
  /** Line height */
  lineHeight?: number;
}

/**
 * Union type of all shapes
 */
export type Shape = Rectangle | Circle | Text;
