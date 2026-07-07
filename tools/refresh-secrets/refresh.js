// tools/refresh-secrets/refresh.js
//
// Run this locally (never in CI) whenever your sync workflow starts
// failing due to an expired LeetCode session. Opens a real browser,
// you log in manually, and it handles the rest.
//
// Usage: node refresh.js

require("dotenv").config();
const puppeteer = require("puppeteer");
const { execSync } = require("child_process");
const fs = require("fs");

// Probe common system Chrome/Chromium paths so the script works across machines
// without any config. Falls back to Puppeteer's bundled binary if none found.
function resolveBrowser() {
    const candidates = [
        // Linux
        "/usr/bin/google-chrome-stable",
        "/usr/bin/google-chrome",
        "/usr/bin/chromium-browser",
        "/usr/bin/chromium",
        // macOS
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        // Windows
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    ];
    const found = candidates.find((p) => fs.existsSync(p));
    if (found) {
        return found;
    }
    // Fall back to Puppeteer's bundled binary
    return puppeteer.executablePath();
}

const { encryptSecret } = require("./lib/encryptor");
const {
    createClient,
    getRepoPublicKey,
    putSecret,
} = require("./lib/github-client");

const LOGIN_TIMEOUT_MS = 3 * 60 * 1000; // 3 minutes
const POLL_INTERVAL_MS = 2000;

function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        console.error(`Missing required .env value: ${name}`);
        console.error("Copy .env.example to .env and fill it in first.");
        process.exit(1);
    }
    return value;
}

async function waitForLoginCookie(page) {
    const start = Date.now();

    while (Date.now() - start < LOGIN_TIMEOUT_MS) {
        const cookies = await page.cookies("https://leetcode.com");
        const sessionCookie = cookies.find((c) => c.name === "LEETCODE_SESSION");

        if (sessionCookie) {
            return cookies;
        }

        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }

    throw new Error(
        `Timed out after ${LOGIN_TIMEOUT_MS / 1000}s waiting for login. Run again and log in a bit faster, or check for a CAPTCHA/2FA step.`
    );
}

async function main() {
    const githubPat = requireEnv("GITHUB_PAT");
    const owner = requireEnv("GITHUB_OWNER");
    const repo = requireEnv("GITHUB_REPO");

    console.log("Launching browser — log into LeetCode when the window opens...");

    const browser = await puppeteer.launch({
        headless: false,
        executablePath: resolveBrowser(),
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://leetcode.com/accounts/login/", {
        waitUntil: "networkidle2",
    });

    let cookies;
    try {
        cookies = await waitForLoginCookie(page);
    } catch (err) {
        console.error(err.message);
        await browser.close();
        process.exit(1);
    }

    console.log("Login detected. Extracting session cookies...");

    const sessionCookie = cookies.find((c) => c.name === "LEETCODE_SESSION");
    const csrfCookie = cookies.find((c) => c.name === "csrftoken");

    if (!sessionCookie || !csrfCookie) {
        console.error("Could not find both required cookies. Aborting without changing any secrets.");
        await browser.close();
        process.exit(1);
    }

    await browser.close();

    console.log("Fetching repo public key...");
    const octokit = createClient(githubPat);
    const { key, keyId } = await getRepoPublicKey(octokit, owner, repo);

    console.log("Encrypting and updating secrets...");

    const encryptedSession = await encryptSecret(key, sessionCookie.value);
    await putSecret(octokit, owner, repo, "LEETCODE_SESSION", encryptedSession, keyId);

    const encryptedCsrf = await encryptSecret(key, csrfCookie.value);
    await putSecret(octokit, owner, repo, "LEETCODE_CSRF_TOKEN", encryptedCsrf, keyId);

    console.log(`Done. Both secrets updated at ${new Date().toISOString()}.`);
    console.log("Your sync workflow should work again on its next run.");
}

main().catch((err) => {
    console.error("refresh.js failed:", err);
    process.exit(1);
});