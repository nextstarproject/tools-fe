import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { useBeforeUnload } from "react-router-dom";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import zhCNDay from "dayjs/locale/zh-cn";
import enUSDay from "dayjs/locale/en";
import { useAppDispatch, useAppSelector } from "@project-self/store/store";
import { selectGlobalState } from "@project-self/store/selector";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Logger from "@project-self/utils/logger";
import GlobalLoading from "@project-self/components/global-loading/global-loading";
import { setLanguage, setLoading } from "@project-self/rtk/global-slice";
import RootRoutes from "@project-self/routes/routes";
import { I18nextProvider, getI18n } from "nsp-i18n";
import { defaultLanguage } from "@project-self/utils/default-language";

dayjs.extend(relativeTime);

const App = () => {
	const globalState = useAppSelector(selectGlobalState);
	const dispatch = useAppDispatch();
	useEffect(() => {
		const init = async function () {
			const fpPromise = FingerprintJS.load({
				monitoring: false,
			});
			const fp = await fpPromise;
			const result = await fp.get();
			window._FINGERPRINT_ = result.visitorId;
			Logger.LogInformation({
				controllerName: "App",
				actionName: "Init",
				message: `fingerprint: ${result.visitorId}`,
				externalData: {
					result: result,
					userAgent: navigator.userAgent,
				},
			});
			const language = defaultLanguage();
			dispatch(setLanguage(language));
			dispatch(setLoading(false));
		};
		init().then();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (globalState.language == "zh-CN") {
			dayjs.locale(zhCNDay);
		} else {
			dayjs.locale(enUSDay);
		}
	}, [globalState.language]);

	useBeforeUnload((event) => {
		if (globalState.beforeUnload.status) {
			event.stopPropagation();
			// Cancel the event as stated by the standard.
			event.preventDefault();
			// Chrome requires returnValue to be set.
			event.returnValue = "";
		}
	});

	return (
		<ConfigProvider locale={globalState.language == "zh-CN" ? zhCN : enUS}>
			<I18nextProvider i18n={getI18n()} defaultNS={"translation"}>
				{globalState.loading && <GlobalLoading />}
				{!globalState.loading && <RootRoutes />}
			</I18nextProvider>
		</ConfigProvider>
	);
};

export default App;
