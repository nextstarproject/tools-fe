import * as Sentry from "@sentry/react";
import { ILoggerInfoWithTime, getLogger } from "nsp-utils";

const loggerExtend = (info: ILoggerInfoWithTime, message: string) => {
	if (
		import.meta.env.NSP_SENTRY == "true" &&
		(info.level == "fatal" || info.level == "error" || info.level == "warning")
	) {
		Sentry.withScope((scope) => {
			scope.setLevel(info.level ?? "debug");
			if (window._FINGERPRINT_ != undefined) {
				scope.setTag("fingerprint", window._FINGERPRINT_);
			}
			if (info.level == "fatal" || info.level == "error") {
				Sentry.captureException(info);
			} else {
				Sentry.captureMessage(message, info.level ?? "info");
			}
		});
	}
};

const logger = getLogger(loggerExtend);

export default logger;
