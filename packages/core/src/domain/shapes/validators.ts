/**
 * Shape validation functions
 */

import { Shape, Rectangle, Circle, Text } from "./types";

/**
 * Validate base shape properties
 */
function validateBaseShape(shape: Shape): string[] {
  const errors: string[] = [];

  if (!shape.id || typeof shape.id !== "string") {
    errors.push("Shape must have a valid id");
  }

  if (typeof shape.x !== "number" || !isFinite(shape.x)) {
    errors.push("Shape x must be a valid number");
  }

  if (typeof shape.y !== "number" || !isFinite(shape.y)) {
    errors.push("Shape y must be a valid number");
  }

  if (
    typeof shape.width !== "number" ||
    shape.width <= 0 ||
    !isFinite(shape.width)
  ) {
    errors.push("Shape width must be a positive number");
  }

  if (
    typeof shape.height !== "number" ||
    shape.height <= 0 ||
    !isFinite(shape.height)
  ) {
    errors.push("Shape height must be a positive number");
  }

  if (typeof shape.rotation !== "number" || !isFinite(shape.rotation)) {
    errors.push("Shape rotation must be a valid number");
  }

  if (
    typeof shape.opacity !== "number" ||
    shape.opacity < 0 ||
    shape.opacity > 1 ||
    !isFinite(shape.opacity)
  ) {
    errors.push("Shape opacity must be between 0 and 1");
  }

  if (typeof shape.visible !== "boolean") {
    errors.push("Shape visible must be a boolean");
  }

  if (typeof shape.locked !== "boolean") {
    errors.push("Shape locked must be a boolean");
  }

  return errors;
}

/**
 * Validate rectangle shape
 */
function validateRectangle(shape: Rectangle): string[] {
  const errors = validateBaseShape(shape);

  if (
    shape.strokeWidth !== undefined &&
    (typeof shape.strokeWidth !== "number" || shape.strokeWidth < 0)
  ) {
    errors.push("Rectangle strokeWidth must be a non-negative number");
  }

  if (
    shape.cornerRadius !== undefined &&
    (typeof shape.cornerRadius !== "number" || shape.cornerRadius < 0)
  ) {
    errors.push("Rectangle cornerRadius must be a non-negative number");
  }

  return errors;
}

/**
 * Validate circle shape
 */
function validateCircle(shape: Circle): string[] {
  const errors = validateBaseShape(shape);

  if (
    shape.strokeWidth !== undefined &&
    (typeof shape.strokeWidth !== "number" || shape.strokeWidth < 0)
  ) {
    errors.push("Circle strokeWidth must be a non-negative number");
  }

  return errors;
}

/**
 * Validate text shape
 */
function validateText(shape: Text): string[] {
  const errors = validateBaseShape(shape);

  if (typeof shape.text !== "string") {
    errors.push("Text shape must have a text string");
  }

  if (
    shape.fontSize !== undefined &&
    (typeof shape.fontSize !== "number" || shape.fontSize <= 0)
  ) {
    errors.push("Text fontSize must be a positive number");
  }

  if (
    shape.lineHeight !== undefined &&
    (typeof shape.lineHeight !== "number" || shape.lineHeight <= 0)
  ) {
    errors.push("Text lineHeight must be a positive number");
  }

  const validTextAlign = ["left", "center", "right", "justify"];
  if (shape.textAlign && !validTextAlign.includes(shape.textAlign)) {
    errors.push(`Text textAlign must be one of: ${validTextAlign.join(", ")}`);
  }

  const validVerticalAlign = ["top", "middle", "bottom"];
  if (
    shape.verticalAlign &&
    !validVerticalAlign.includes(shape.verticalAlign)
  ) {
    errors.push(
      `Text verticalAlign must be one of: ${validVerticalAlign.join(", ")}`
    );
  }

  return errors;
}

/**
 * Validate any shape
 */
export function validateShape(shape: Shape): {
  valid: boolean;
  errors: string[];
} {
  let errors: string[] = [];

  switch (shape.type) {
    case "rectangle":
      errors = validateRectangle(shape);
      break;
    case "circle":
      errors = validateCircle(shape);
      break;
    case "text":
      errors = validateText(shape);
      break;
    default:
      errors.push(`Unknown shape type: ${(shape as Shape).type}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
