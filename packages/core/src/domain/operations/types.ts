/**
 * Operation types and interfaces
 */

/**
 * Operation type discriminator
 */
export type OperationType = 
  | 'create-shape'
  | 'update-shape'
  | 'delete-shape'
  | 'move-shape'
  | 'batch';

/**
 * Base operation interface
 */
export interface IOperation {
  /** Operation ID */
  id: string;
  /** Operation type */
  type: OperationType;
  /** Timestamp */
  timestamp: Date;
  /** User ID (for collaboration) */
  userId?: string;
  /** Execute operation */
  execute(): void;
  /** Undo operation */
  undo(): void;
  /** Redo operation (same as execute for most operations) */
  redo(): void;
}

/**
 * Operation history for undo/redo
 */
export interface OperationHistory {
  /** Operations array */
  operations: IOperation[];
  /** Current position in history */
  currentIndex: number;
  /** Maximum history size */
  maxSize: number;
}

