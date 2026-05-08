export const nText = () => document.getElementById("n");
export const phiText = () => document.getElementById("phi");
export const dText = () => document.getElementById("d");
export const pText = () => document.getElementById("p");
export const qText = () => document.getElementById("q");
export const eText = () => document.getElementById("e");
export const publicText = () => document.getElementById("public");
export const privateText = () => document.getElementById("private");

function resetSecondParams() {
    nText().value = "";
    phiText().value = "";
}

function resetFirstParams() {
    pText().value = "";
    qText().value = "";
}

function resetResults() {
    dText().value = "";
    publicText().value = "";
    privateText().value = "";
}

export function readInputs() {
    return {
        p: BigInt(pText().value),
        q: BigInt(qText().value),
        e: BigInt(eText().value),
        phi: phiText().value ? BigInt(phiText().value) : null
    };
}

document.getElementById("reset-first").addEventListener("click", resetFirstParams);
document.getElementById("reset-second").addEventListener("click", resetSecondParams);
document.getElementById("reset-results").addEventListener("click", resetResults);
