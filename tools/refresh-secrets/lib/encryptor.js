// tools/refresh-secrets/lib/encryptor.js
//
// Encrypts a plaintext secret value against a GitHub repo's public key,
// using libsodium's sealed box construction — the exact format GitHub's
// Secrets API requires. Once encrypted, only GitHub (holding the
// matching private key) can decrypt it; not even this script can.

const sodium = require("libsodium-wrappers");

/**
 * @param {string} publicKeyBase64 - the repo's public key, base64-encoded,
 *   as returned by GET /repos/{owner}/{repo}/actions/secrets/public-key
 * @param {string} secretValue - the plaintext value to encrypt (e.g. a cookie)
 * @returns {Promise<string>} base64-encoded encrypted value, ready to PUT
 */
async function encryptSecret(publicKeyBase64, secretValue) {
    await sodium.ready;

    const publicKeyBytes = sodium.from_base64(
        publicKeyBase64,
        sodium.base64_variants.ORIGINAL
    );
    const secretBytes = sodium.from_string(secretValue);

    const encryptedBytes = sodium.crypto_box_seal(secretBytes, publicKeyBytes);

    return sodium.to_base64(encryptedBytes, sodium.base64_variants.ORIGINAL);
}

module.exports = { encryptSecret };
