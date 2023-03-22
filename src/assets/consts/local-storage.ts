export const ProjectName = _PROJECT_NAMESPACE_;
export const AccessTokenKey = "api-access-token";

export const CookieReadKey = "cookie-read-key";
export const enum HttpStatusCode {
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

export const DefaultRouteBreadcrumb: Record<string, string> = {
    "/dashboard": "仪表板",
    "/notification": "消息中心",
    "/safety/one-way-encryption": "单向加密",
    "/safety/hmac": "HMAC",
    "/safety/hmac/11": "HMAC11",
    "/safety/rsa-use": "RSA 加解密",
};

export const ApiToken = "PRh7eQ7K7OUJVZPDnR9ihcMe2VMS93OL";

export const PageLocalStorage = {
    RsaGeneratePublicKey: "rsa-generate-public-key",
    RsaGeneratePrivateKey: "rsa-generate-private-key",
};
