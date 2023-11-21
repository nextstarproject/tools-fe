import * as digest from "./digest";
import * as normal from "./normal";
import * as rsaCrypto from "./rsa-crypto";
import * as ecdsaCrypto from "./ecdsa-crypto";

// encrypt RSA-OAEP AES-CTR AES-CBC AES-GCM
// decrypt RSA-OAEP AES-CTR AES-CBC AES-GCM
// sign RSASSA-PKCS1-v1_5 RSA-PSS ECDSA HMAC
// verify RSASSA-PKCS1-v1_5 RSA-PSS ECDSA HMAC
// deriveKey ECDH HKDF PBKDF2
// deriveBits ECDH HKDF PBKDF2
// wrapKey RSA-OAEP AES-CTR AES-CBC AES-GCM AES-KW
// unwrapKey RSA-OAEP AES-CTR AES-CBC AES-GCM AES-KW

export namespace NspSubtleCrypto {
	/**
	 * @description 字符串 base64 hex 和 ArrayBuffer 互相转换方法
	 */
	export import Convert = normal;
	/**
	 * @description 摘要算法
	 */
	export import Digest = digest;
	/**
	 * @description Rsa 相关方法和处理
	 */
	export import RsaCrypto = rsaCrypto;
	/**
	 * @description Ecdsa 相关方法和处理
	 */
	export import EcdsaCrypto = ecdsaCrypto;
}
