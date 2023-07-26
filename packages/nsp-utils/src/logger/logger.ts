import { ILoggerInfo, ILoggerInfoWithLevel, ILoggerInfoWithTime, SeverityLevel } from "./types";

function switchLevelColor(level?: SeverityLevel): string {
	switch (level) {
		case "debug":
			return "#8c8c8c";
		case "info":
			return "#13c2c2";
		case "log":
			return "#1677ff";
		case "warning":
			return "#faad14";
		case "error":
			return "#fa541c";
		case "fatal":
			return "#faad14";
		default:
			return "#8c8c8c";
	}
}

export const getLogger = (extend: (info: ILoggerInfoWithTime, message: string) => void) => {
	const basic = (info: ILoggerInfoWithLevel) => {
		const loggerInfo: ILoggerInfoWithTime = info as ILoggerInfoWithTime;
		loggerInfo.date = new Date();

		const temp = `Controller: ${loggerInfo.controllerName}, Action: ${loggerInfo.actionName}, Message: ${loggerInfo.message} Level: ${loggerInfo.level}, Error: ${loggerInfo.error}, Date: ${loggerInfo.date}, external: ${loggerInfo.externalData}`;

		// eslint-disable-next-line no-console
		console.log("%c" + temp, `color:${switchLevelColor(loggerInfo.level)};`);
		// eslint-disable-next-line no-console
		console.log(loggerInfo);
		// extend execute
		extend(loggerInfo, temp);
	};

	/**
	 * @description 日志等级：*
	 */
	const LogTrace = (info: ILoggerInfo) => {
		const _info = info as ILoggerInfoWithLevel;
		_info.level = "log";
		basic(_info);
	};

	/**
	 * @description 日志等级：**
	 */
	const LogInformation = (info: ILoggerInfo) => {
		const _info = info as ILoggerInfoWithLevel;
		_info.level = "info";
		basic(_info);
	};

	/**
	 * @description 日志等级：***
	 */
	const LogWarning = (info: ILoggerInfo) => {
		const _info = info as ILoggerInfoWithLevel;
		_info.level = "warning";
		basic(_info);
	};

	/**
	 * @description 日志等级：****
	 */
	const LogError = (info: ILoggerInfo) => {
		const _info = info as ILoggerInfoWithLevel;
		_info.level = "error";
		basic(_info);
	};

	/**
	 * @description 日志等级：*****
	 */
	const LogFatal = (info: ILoggerInfo) => {
		const _info = info as ILoggerInfoWithLevel;
		_info.level = "fatal";
		basic(_info);
	};

	return {
		LogInformation,
		LogTrace,
		LogWarning,
		LogError,
		LogFatal,
	};
};
