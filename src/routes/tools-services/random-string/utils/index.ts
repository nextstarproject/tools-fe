import {
    ICryptoRandomStringOptions,
    RandomStringType,
} from "@project-self/routes/tools-services/random-string/types";
import CryptoJS from "crypto-js";
import { Buffer } from "buffer";

const GenerateForCustomCharacters = (length: number, characters: string[]) => {
    // Generating entropy is faster than complex math operations, so we use the simplest way
    const characterCount = characters.length;
    const maxValidSelector =
        Math.floor(0x10000 / characterCount) * characterCount - 1; // Using values above this will ruin distribution when using modular division
    const entropyLength = 2 * Math.ceil(1.1 * length); // Generating a bit more than required so chances we need more than one pass will be really low
    let string = "";
    let stringLength = 0;

    while (stringLength < length) {
        // In case we had many bad values, which may happen for character sets of size above 0x8000 but close to it
        const entropy = Buffer.from(
            CryptoJS.lib.WordArray.random(entropyLength).toString()
        );
        let entropyPosition = 0;

        while (entropyPosition < entropyLength && stringLength < length) {
            const entropyValue = entropy.readUInt16LE(entropyPosition);
            entropyPosition += 2;
            if (entropyValue > maxValidSelector) {
                // Skip values which will ruin distribution when using modular division
                continue;
            }

            string += characters[entropyValue % characterCount];
            stringLength++;
        }
    }

    return string;
};

const CryptoRandomString = (options: ICryptoRandomStringOptions): string => {
    const { length, type, characters } = options;

    if (!(length >= 0 && isFinite(length))) {
        return "Expected a `length` to be a non-negative finite number";
    }

    if (type == RandomStringType.Custom && characters == undefined) {
        return "type is custom characters not undefined";
    }

    if (type === RandomStringType.UrlSafe) {
        return GenerateForCustomCharacters(
            length,
            CryptoRandomStringCharacters.urlSafeCharacters
        );
    }

    if (type === RandomStringType.Numeric) {
        return GenerateForCustomCharacters(
            length,
            CryptoRandomStringCharacters.numericCharacters
        );
    }

    if (type === RandomStringType.Distinguishable) {
        return GenerateForCustomCharacters(
            length,
            CryptoRandomStringCharacters.distinguishableCharacters
        );
    }

    if (type === RandomStringType.AsciiPrintable) {
        return GenerateForCustomCharacters(
            length,
            CryptoRandomStringCharacters.asciiPrintableCharacters
        );
    }

    if (type === RandomStringType.Alphanumeric) {
        return GenerateForCustomCharacters(
            length,
            CryptoRandomStringCharacters.alphanumericCharacters
        );
    }

    if (type === RandomStringType.Custom && characters != undefined) {
        return GenerateForCustomCharacters(length, characters.split(""));
    }
    return "";
};

export const CryptoRandomStringCharacters = {
    urlSafeCharacters:
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~".split(
            ""
        ),
    numericCharacters: "0123456789".split(""),
    distinguishableCharacters: "CDEHKMPRTUWXY012458".split(""),
    asciiPrintableCharacters:
        "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".split(
            ""
        ),
    alphanumericCharacters:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
            ""
        ),
    customDefaultCharacters:
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789".split(
            ""
        ),
};

export default CryptoRandomString;
