import { computeKeyParameters, computeKeysAndExport } from "./scripts/rsaController.js";

document
    .getElementById("compute-key-params")
    .addEventListener("click", computeKeyParameters);

document
    .getElementById("compute-private")
    .addEventListener("click", computeKeysAndExport);

