# refresh-secrets

A local-only script that refreshes your `LEETCODE_SESSION` and `LEETCODE_CSRF_TOKEN` GitHub Actions secrets — without manual DevTools copy-pasting.

It opens a real visible browser, you log into LeetCode exactly as you always do, and the script reads the resulting session cookies, encrypts them using your repo's public key, and pushes both secrets to GitHub automatically. **Your password never touches this code.**

This never runs in CI — it only runs on your own machine.

---

## One-time setup

```bash
cd tools/refresh-secrets
npm install
cp .env.example .env
```

Open `.env` and fill in the three values (each one has an inline comment explaining where to get it):

| Variable | What it is |
|---|---|
| `GITHUB_PAT` | A fine-grained PAT with **Secrets: write** on this repo only |
| `GITHUB_OWNER` | Your GitHub username |
| `GITHUB_REPO` | Your repo name (default: `leetcode-journey`) |

> **Where to create the PAT:** GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token. Select only this repo, grant only "Secrets: write" under Repository permissions.

---

## Usage

```bash
npm start
```

A browser window opens. Log into LeetCode normally — no special steps. Once the session cookie appears, the script encrypts it and updates both secrets. You'll see a confirmation line when it's done.

---

## How it works

```
You log in → Puppeteer reads LEETCODE_SESSION + csrftoken cookies
           → libsodium encrypts each value with the repo's public key
           → Octokit PUTs the encrypted values to GitHub Secrets API
           → GitHub Actions can now decrypt and use them in CI
```

Encryption uses GitHub's required sealed-box construction (libsodium `crypto_box_seal`). Once encrypted, only GitHub holds the private key — not even this script can read back what it sent.

---

## File structure

```
tools/refresh-secrets/
├── refresh.js          # entry point — run this
├── lib/
│   ├── encryptor.js    # libsodium sealed-box encryption
│   └── github-client.js  # GitHub Secrets API calls
├── .env.example        # copy to .env and fill in
└── package.json
```