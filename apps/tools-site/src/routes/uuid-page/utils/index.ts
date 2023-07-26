import { toUpper } from "lodash";
import { UUIDType, UuidGeneratorFormat } from "../types";

export const UuidFormatExecute = (val: string, format: number): string => {
	if ((format & UuidGeneratorFormat.Uppercase) == UuidGeneratorFormat.Uppercase) {
		val = toUpper(val);
	}
	if ((format & UuidGeneratorFormat.Braces) == UuidGeneratorFormat.Braces) {
		val = "{" + val + "}";
	}
	if ((format & UuidGeneratorFormat.Hyphens) == UuidGeneratorFormat.Hyphens) {
		val = val.replaceAll("-", "");
	}
	return val;
};

export const UuidGenerator = (type: UUIDType, format: number): string => {
	switch (type) {
		case UUIDType.v4:
			return UuidFormatExecute(self.crypto.randomUUID(), format);
		default:
			return UuidFormatExecute("00000000-0000-0000-0000-000000000000", format);
	}
};
