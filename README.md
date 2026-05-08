<!-- <a name="readme-top"></a> -->

# RSA key reconstructor

Simple website to reconstruct and export RSA keys from primes `p`, `q` and public exponent `e`.


This is what is performed:
1. Calculate Euler's totient `Φ(N) = (p - 1) * (q - 1)`
2. Find `d` that satisfy `(d * e) ≡ 1 mod Φ(N)`, by computing the [modular multiplicative inverse](https://en.wikipedia.org/wiki/Modular_multiplicative_inverse) of `e mod Φ(N)`, where `e` is the choosen public exponent.
3. Generate the private key using previously computed or given parameters. For now it only use the signature scheme `RSASSA-PKCS1-v1_5` and `SHA-256` as digest algorithm (see [here](https://developer.mozilla.org/en-US/docs/Web/API/RsaHashedImportParams) for more).
4. Export the private key to PEM format, trhough [PKCS8](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey#format) format.

### Start the website

Run a simple server locally from the repo source, for example with python http.server module:

```bash
python -m http.server 8000
```

Then access it in your favorite browser: `http://localhost:8000`

### Roadmap

- [ ] Style
- [ ] Export public key
- [ ] Support different key sizes
- [ ] Support different algorithms
- [ ] Support different export formats

### Contributing

Feel free to open PR, I review those :)

### Built With 

- Pure HTML/JS
- The [SubtleCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->
