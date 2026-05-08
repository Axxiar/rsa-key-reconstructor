export function gcd(a, b) {
    while (b !== 0n) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

/* Extended Euclidean Algorithm */
export function modInverse(e, phi) {
    let m0 = phi;
    let x0 = 0n;
    let x1 = 1n;

    if (phi === 1n) return 0n;

    while (e > 1n) {
        let q = e / phi; // implicitly integer division since BigInts

        let temp = phi;
        phi = e % phi;
        e = temp;

        temp = x0;
        x0 = x1 - q * x0;
        x1 = temp;
    }

    if (x1 < 0n)
        x1 += m0;
    return x1;
}
