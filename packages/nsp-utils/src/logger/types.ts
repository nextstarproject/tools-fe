export type SeverityLevel = "fatal" | "error" | "warning" | "log" | "info" | "debug";

export interface ILoggerInfo {
	controllerName?: string;
	actionName?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error?: any;
	message?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	externalData?: any;
}

export interface ILoggerInfoWithLevel extends ILoggerInfo {
	level?: SeverityLevel;
}

export interface ILoggerInfoWithTime extends ILoggerInfoWithLevel {
	date?: Date;
}
