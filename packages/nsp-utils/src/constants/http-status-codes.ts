/**
 * https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
 */
enum HttpStatusCodes {
	OK = 200,
	Created = 201,
	MovedPermanently = 301,
	Found = 302,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	InternalServerError = 500,
	ServiceUnavailable = 503,
}

export { HttpStatusCodes };
