// tools/refresh-secrets/lib/github-client.js
//
// All direct communication with GitHub's Secrets API lives here.
// Nothing above this layer should know GitHub's endpoint shapes.

const { Octokit } = require("@octokit/rest");

function createClient(githubPat) {
    return new Octokit({ auth: githubPat });
}

/**
 * Fetches the repo's public key, used to encrypt secret values before
 * sending them. GitHub requires this — it will reject plaintext values.
 */
async function getRepoPublicKey(octokit, owner, repo) {
    const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/actions/secrets/public-key",
        { owner, repo }
    );
    return { key: data.key, keyId: data.key_id };
}

/**
 * Writes a single encrypted secret to the repo. `encryptedValueBase64`
 * must already be encrypted via encryptor.encryptSecret().
 */
async function putSecret(octokit, owner, repo, secretName, encryptedValueBase64, keyId) {
    await octokit.request(
        "PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}",
        {
            owner,
            repo,
            secret_name: secretName,
            encrypted_value: encryptedValueBase64,
            key_id: keyId,
        }
    );
}

module.exports = { createClient, getRepoPublicKey, putSecret };
