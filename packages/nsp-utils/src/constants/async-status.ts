/**
 * Common Async Status Enum
 * None: No async operation is in progress
 * Pending: Async operation is in progress
 * Fulfilled: Async operation is completed successfully
 * Rejected: Async operation is completed with error
 */

export enum AsyncStatus {
	None,
	Pending,
	Fulfilled,
	Rejected,
}
