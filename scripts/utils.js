/* Converts a BigInt to a Base64URL string suitable for JWK.
 * Handles the leading zero byte requirement for positive integers. 
 * */
export function bigIntToBase64Url(value) {
    let hex = value.toString(16);

    if (hex.length % 2 !== 0)
        hex = '0' + hex;

    // Convert hex to Uint8Array
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++)
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);

    // Convert bytes to Base64
    let binary = '';
    for (let i = 0; i < bytes.length; i++)
        binary += String.fromCharCode(bytes[i]);

    const base64 = btoa(binary);

    // Convert to Base64URL (replace + with -, / with _, remove =)
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/* Converts an ArrayBuffer to a Base64 string */
const bufferToBase64 = (buffer) => {
    const array = new Uint8Array(buffer);
    const binaryString = Array.from(array)
        .map((char) => String.fromCharCode(char))
        .join("");
    return btoa(binaryString);
};

export const spkiToPEM = (keyData) => {
    const base64 = bufferToBase64(keyData);
    return `-----BEGIN PUBLIC KEY-----\n${base64}\n-----END PUBLIC KEY-----\n`;
};

export const pkcs8ToPEM = (keyData) => {
    const base64 = bufferToBase64(keyData);
    return `-----BEGIN PRIVATE KEY-----\n${base64}\n-----END PRIVATE KEY-----\n`;
};