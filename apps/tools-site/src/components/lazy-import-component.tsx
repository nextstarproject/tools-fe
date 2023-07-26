import GlobalLoading from "@project-self/components/global-loading/global-loading";
import React, { LazyExoticComponent } from "react";

export const LazyImportComponent = (props: {
	lazyChildren: LazyExoticComponent<() => JSX.Element>;
}) => {
	return (
		<React.Suspense fallback={<GlobalLoading />}>
			<props.lazyChildren />
		</React.Suspense>
	);
};
