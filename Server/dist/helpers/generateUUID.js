import { randomBytes } from "crypto";
var generateUUID = function () {
    var bytes = randomBytes(16);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    return bytes.toString("hex").toUpperCase();
};
export default generateUUID;
