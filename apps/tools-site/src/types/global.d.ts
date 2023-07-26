import "../../../../configs/global";

/**
 * @description Unique to the current program
 * @link https://learntypescript.dev/04/l4-interfaces#declaration-merging
 */
interface Window {
	_APIFOX_ENDPOINT_: string;
	_APIFOX_TOKEN_: string;
}
