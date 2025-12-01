/**
 * Base operation class
 */

import { IOperation, OperationType } from './types';

/**
 * Generate UUID v7-like ID
 */
function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `${timestamp}-${random}`;
}

/**
 * Base operation class implementing IOperation
 */
export abstract class BaseOperation implements IOperation {
  id: string;
  type: OperationType;
  timestamp: Date;
  userId?: string;

  constructor(type: OperationType, userId?: string) {
    this.id = generateId();
    this.type = type;
    this.timestamp = new Date();
    this.userId = userId;
  }

  abstract execute(): void;
  abstract undo(): void;

  redo(): void {
    this.execute();
  }
}

