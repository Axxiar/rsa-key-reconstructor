import * as dom from "./dom.js";
import { gcd, modInverse } from "./rsaMath.js";
import { bigIntToBase64Url, pkcs8ToPEM } from "./utils.js";

export function computeKeyParameters() {
    const { p, q } = dom.readInputs();

    if (!p || !q) {
        alert("Enter valid p and q");
        return;
    }

    const n = p * q;
    phi = (p - 1n) * (q - 1n);

    dom.nText().value = n;
    dom.phiText().value = phi;
}

function computePrivateExponent(e, phi) {
    if (!e || !phi) {
        alert("Compute phi and enter e first");
        return;
    }

    if (gcd(e, phi) !== 1n) {
        alert("e must be coprime with phi(N)");
        return;
    }
    return modInverse(e, phi);
}

async function importRsaPrivateKey(p, q, e, d) {
    const n = p * q;

    // Calculate CRT parameters
    // dp = d mod (p-1)
    // dq = d mod (q-1)
    // qi = q^-1 mod p
    const dp = d % (p - 1n);
    const dq = d % (q - 1n);
    const qi = modInverse(q, p);

    const privateKeyJWK = {
        kty: "RSA",
        n: bigIntToBase64Url(n),
        e: bigIntToBase64Url(e),
        d: bigIntToBase64Url(d),
        p: bigIntToBase64Url(p),
        q: bigIntToBase64Url(q),
        dp: bigIntToBase64Url(dp),
        dq: bigIntToBase64Url(dq),
        qi: bigIntToBase64Url(qi),
        alg: "RS256"
    };

    return window.crypto.subtle.importKey(
        "jwk",
        privateKeyJWK,
        {
            name: "RSASSA-PKCS1-v1_5", // Or "RSA-OAEP" for encryption
            hash: "SHA-256"
        },
        true,
        ["sign"] // Or ["decrypt"] if using RSA-OAEP
    );
}

export async function exportPrivateKey(p, q, e, d, format="pkcs8") {
    const pvKey = await importRsaPrivateKey(p, q, e, d);
    return window.crypto.subtle.exportKey(format, pvKey);
}

export async function computePrivateKeyAndExport() {
    const { p, q, e, phi } = dom.readInputs();
    if (!p || !q) {
        alert("p and q are needed here too");
        return;
    }

    const d = computePrivateExponent(e, phi);
    if (!d) return;

    const pkcs8Buffer = await exportPrivateKey(p, q, e, d)
    // TODO: export public.

    dom.dText().value = d;
    dom.privateText().value = pkcs8ToPEM(pkcs8Buffer);
}
