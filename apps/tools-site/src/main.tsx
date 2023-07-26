import ReactDOM from "react-dom/client";
import App from "@project-self/routes/App";
import "@project-self/main.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@project-self/store/store";
import { initI18nConfig } from "@project-self/configs/i18n-config";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/browser";
import { getRelativeBasePath } from "@project-self/utils/env-detect";
import { initDevHelper } from "@project-self/utils/dev-helper";
import { userManager } from "@project-self/utils/auth/user-manager";
import { OidcProvider } from "redux-oidc";
import * as nspUtils from "nsp-utils";

if (import.meta.env.NSP_LANGUAGE == "true") {
	initI18nConfig();
}

if (import.meta.env.NSP_SENTRY == "true") {
	Sentry.init({
		dsn: import.meta.env.NSP_SENTRY_KEY,
		integrations: [
			new BrowserTracing(),
			new Sentry.Integrations.Breadcrumbs({ console: true }),
		],
		environment: import.meta.env.NSP_SENTRY_ENV,
		maxBreadcrumbs: 20,
		// We recommend adjusting this value in production, or using tracesSampler
		// for finer control
		tracesSampleRate: 1.0,
	});
}

initDevHelper(store, nspUtils);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		{/*// @ts-expect-error type error*/}
		<OidcProvider store={store} userManager={userManager}>
			<BrowserRouter basename={getRelativeBasePath()}>
				<App />
			</BrowserRouter>
		</OidcProvider>
	</Provider>
);
