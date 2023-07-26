export type ErrorLevel = "error" | "warning";

export interface IServiceResponse<T> {
	message: string;
	errorLevel: ErrorLevel;
	success: boolean;
	data: T;
}
