<!-- <a name="readme-top"></a> -->

# RSA key reconstructor

Simple website to reconstruct and export RSA keys from primes `p`, `q` and public exponent `e`. 

I created it for my personal use, but wanted to share it.

### What this does

Let's imagine you want to quickly test a private key but only have the primes `p` & `q` and the public exponent `e` of the key. You can paste them into this tool and it will reconstruct the private key for you.

⚠️ **Disclaimer**: Do not use it to create real world (production) private keys, this is intended for specific usage.

For more details it:
1. Calculate Euler's totient `Φ(N) = (p - 1) * (q - 1)` from your input
2. Find `d` that satisfy `(d * e) ≡ 1 mod Φ(N)`, by computing the [modular multiplicative inverse](https://en.wikipedia.org/wiki/Modular_multiplicative_inverse) of `e mod Φ(N)`, where `e` is the choosen public exponent.
3. Generate the private key using previously computed or given parameters. For now it only use the signature scheme `RSASSA-PKCS1-v1_5` and `SHA-256` as digest algorithm (see [here](https://developer.mozilla.org/en-US/docs/Web/API/RsaHashedImportParams) for more).
4. Export the private key to PEM format, trhough [PKCS8](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey#format) format.

### Run locally

Run a simple server locally from the repo source, for example with python http.server module:

```bash
python -m http.server 8000
```

Then access it in your favorite browser: `http://localhost:8000`

### Roadmap

- [x] Style
- [X] Export public key
- [ ] Support different key sizes
- [ ] Support different algorithms
- [ ] Support different export formats

### Contributing

Feel free to open PR, I review those :)

### Built With 

- Pure HTML/JS
- The [SubtleCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->
