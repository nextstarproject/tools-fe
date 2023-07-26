import { Col, ColorPicker, Row, Space, Typography, theme } from "antd";
import type { Color } from "antd/es/color-picker";
import { Alpha2Hex, ColorAlphaHexType } from "nsp-utils";
import { useState } from "react";

const ColorPage = () => {
	const { token } = theme.useToken();
	const [primaryColor, setPrimaryColor] = useState<Color | string>(token.colorPrimary);
	return (
		<section>
			<ColorPicker
				className={"w-8"}
				size="large"
				defaultValue={primaryColor}
				value={primaryColor}
				onChange={(e) => setPrimaryColor(e)}
			/>
			<Row>
				<Col span={24}>
					<Space>
						<ColorPicker
							value={primaryColor}
							size="large"
							disabled
							showText={(color) => (
								<Typography.Paragraph
									style={{ margin: 0 }}
									copyable={{ text: color.toHex() }}
								>
									HEX(A): {color.toHex()}
								</Typography.Paragraph>
							)}
						/>
						{/* <Input value={(primaryColor as Color)?.toHex()} readOnly /> */}
					</Space>
				</Col>
				<Col span={24}>
					<Space>
						<ColorPicker
							value={primaryColor}
							size="large"
							disabled
							showText={(color) => (
								<Typography.Paragraph
									style={{ margin: 0 }}
									copyable={{ text: color.toHexString() }}
								>
									#HEX(A): {color.toHexString()}
								</Typography.Paragraph>
							)}
						/>
						{/* <Input value={(primaryColor as Color)?.toHexString()} readOnly /> */}
					</Space>
				</Col>
				<Col span={24}>
					<Space>
						<ColorPicker
							value={primaryColor}
							size="large"
							disabled
							showText={(color) => (
								<Typography.Paragraph
									style={{ margin: 0 }}
									copyable={{ text: color.toHsbString() }}
								>
									HSB(A): {color.toHsbString()}
								</Typography.Paragraph>
							)}
						/>
						{/* <Input value={(primaryColor as Color)?.toHsbString()} readOnly /> */}
					</Space>
				</Col>
				<Col span={24}>
					<Space>
						<ColorPicker
							value={primaryColor}
							size="large"
							disabled
							showText={(color) => (
								<Typography.Paragraph
									style={{ margin: 0 }}
									copyable={{ text: color.toRgbString() }}
								>
									RGB(A): {color.toRgbString()}
								</Typography.Paragraph>
							)}
						/>
						{/* <Input value={(primaryColor as Color)?.toRgbString()} readOnly /> */}
					</Space>
				</Col>
			</Row>
		</section>
	);
};

export default ColorPage;
