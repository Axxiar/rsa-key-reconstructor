import * as dom from "./dom.js";
import { gcd, modInverse } from "./rsaMath.js";
import { bigIntToBase64Url, pkcs8ToPEM, spkiToPEM } from "./utils.js";

const RSA_ALG_CONFIG = {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256"
};

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

function buildBasicJWK(n, e, alg = "RS256") {
    return {
        kty: "RSA",
        n: bigIntToBase64Url(n),
        e: bigIntToBase64Url(e),
        alg: alg
    };
}

async function importRsaKey(jwk, keyUsages) {
    return window.crypto.subtle.importKey(
        "jwk",
        jwk,
        RSA_ALG_CONFIG,
        true,
        keyUsages
    );
}

async function exportRsaKey(key, format) {
    return window.crypto.subtle.exportKey(format, key);
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
        ...buildBasicJWK(n, e),
        d: bigIntToBase64Url(d),
        p: bigIntToBase64Url(p),
        q: bigIntToBase64Url(q),
        dp: bigIntToBase64Url(dp),
        dq: bigIntToBase64Url(dq),
        qi: bigIntToBase64Url(qi)
    };

    return importRsaKey(privateKeyJWK, ["sign"]);
}

async function importRsaPublicKey(n, e) {
    const publicKeyJWK = buildBasicJWK(n, e);
    return importRsaKey(publicKeyJWK, ["verify"]);
}

export async function exportPrivateKey(p, q, e, d, format = "pkcs8") {
    const pvKey = await importRsaPrivateKey(p, q, e, d);
    return exportRsaKey(pvKey, format);
}

export async function exportPublicKey(n, e, format="spki") {
    const pubKey = await importRsaPublicKey(n, e);
    return exportRsaKey(pubKey, format);
}

export async function computeKeysAndExport() {
    const { p, q, e, phi } = dom.readInputs();
    if (!p || !q) {
        alert("p and q are needed here too");
        return;
    }

    const d = computePrivateExponent(e, phi);
    if (!d) return;

    const pkcs8Buffer = await exportPrivateKey(p, q, e, d)
    const spkiBuffer = await exportPublicKey(p * q, e);

    dom.dText().value = d;
    dom.privateText().value = pkcs8ToPEM(pkcs8Buffer);
    dom.publicText().value = spkiToPEM(spkiBuffer);
}
