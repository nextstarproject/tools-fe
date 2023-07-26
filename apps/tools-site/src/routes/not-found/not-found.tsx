import { Button, Result } from "antd";
import { useTranslation } from "nsp-i18n";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	return (
		<section className="flex items-center justify-center pt-20">
			<Result
				status="404"
				title="404"
				subTitle={t("COMMON.NotFound")}
				extra={
					<Button
						type="primary"
						onClick={() => {
							navigate("/");
						}}
					>
						{t("COMMON.BackHome")}
					</Button>
				}
			/>
		</section>
	);
};

export default NotFound;
