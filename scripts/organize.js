// scripts/organize.js
//
// Moves newly-synced LeetCode solution FOLDERS (each problem gets its
// own folder like "0006-zigzag-conversion/" containing README.md +
// solution file) into per-topic subfolders, using LeetCode's own
// topicTags as ground truth instead of guessing.
//
// Requires Node 18+ (uses the built-in global fetch).

const fs = require("fs");
const path = require("path");

// ---- Config -----------------------------------------------------------

// Must match the `destination-folder` input in your workflow yaml.
// Use "." if you didn't set destination-folder (files land at repo root).
const DEST_FOLDER = process.env.DEST_FOLDER || ".";

const TAG_MAP_PATH = path.join(__dirname, "..", "config", "tag-folder-map.json");
const REQUEST_DELAY_MS = 350; // be polite to LeetCode's public endpoint

// ---- Helpers ------------------------------------------------------------

function loadTagMap() {
  const raw = fs.readFileSync(TAG_MAP_PATH, "utf-8");
  return JSON.parse(raw);
}

// Folder names from leetcode-sync look like "0006-zigzag-conversion".
// Strip the zero-padded number prefix to get LeetCode's titleSlug.
function folderNameToSlug(folderName) {
  return folderName.replace(/^\d+-/, "").toLowerCase();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchTopicTags(slug) {
  const query = `
    query questionTopicTags($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        topicTags { name }
      }
    }
  `;

  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Referer": `https://leetcode.com/problems/${slug}/`,
      "User-Agent": "Mozilla/5.0 (compatible; leetcode-organizer/1.0)",
    },
    body: JSON.stringify({
      query,
      variables: { titleSlug: slug },
    }),
  });

  if (!res.ok) {
    console.warn(`  [warn] GraphQL request failed for "${slug}": ${res.status}`);
    return [];
  }

  const json = await res.json();
  const tags = json?.data?.question?.topicTags;
  if (!tags) {
    console.warn(`  [warn] No question data returned for slug "${slug}"`);
    return [];
  }
  return tags.map((t) => t.name);
}

function resolveFolder(tags, tagMap) {
  for (const tag of tags) {
    if (tagMap[tag]) return tagMap[tag];
  }
  return tagMap["_default"] || "Misc";
}

// Returns top-level directories that are NOT already a known topic
// folder (e.g. skips "Arrays", "SQL-DBMS" — only picks up freshly
// synced, unsorted problem folders like "0006-zigzag-conversion").
function getUnorganizedProblemFolders(dir, knownFolders) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !knownFolders.has(name));
}

// ---- Main ---------------------------------------------------------------

async function main() {
  const tagMap = loadTagMap();
  const knownFolders = new Set(Object.values(tagMap));

  if (!fs.existsSync(DEST_FOLDER)) {
    console.log(`Destination folder "${DEST_FOLDER}" does not exist yet. Nothing to organize.`);
    return;
  }

  const problemFolders = getUnorganizedProblemFolders(DEST_FOLDER, knownFolders);

  if (problemFolders.length === 0) {
    console.log("No new unsorted problem folders found. Nothing to organize.");
    return;
  }

  console.log(`Found ${problemFolders.length} problem folder(s) to categorize in "${DEST_FOLDER}".`);

  const summary = [];

  for (const problemFolder of problemFolders) {
    const slug = folderNameToSlug(problemFolder);
    console.log(`Processing "${problemFolder}" -> slug "${slug}"`);

    const tags = await fetchTopicTags(slug);
    const folder = resolveFolder(tags, tagMap);

    const targetParent = path.join(DEST_FOLDER, folder);
    if (!fs.existsSync(targetParent)) {
      fs.mkdirSync(targetParent, { recursive: true });
    }

    const sourcePath = path.join(DEST_FOLDER, problemFolder);
    const targetPath = path.join(targetParent, problemFolder);

    fs.renameSync(sourcePath, targetPath);
    summary.push({ problemFolder, slug, tags, folder });

    await sleep(REQUEST_DELAY_MS);
  }

  console.log("\n--- Organize summary ---");
  for (const item of summary) {
    console.log(
      `${item.problemFolder} -> ${item.folder}  (tags: ${item.tags.join(", ") || "none found"})`
    );
  }
}

main().catch((err) => {
  console.error("organize.js failed:", err);
  process.exit(1);
});