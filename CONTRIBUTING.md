# Contributing

This is primarily a personal learning archive, but it's structured as an open template. Contributions that improve usability for others are welcome — particularly around topic tag coverage.

## Extending topic mappings

The sole configuration file for categorization is [`config/tag-folder-map.json`](config/tag-folder-map.json). It maps LeetCode's topic tag names to folder names under `solutions/`.

To add coverage for a new topic, append to the map:

```json
{
  "Segment Tree": "SegmentTree",
  "Monotonic Stack": "MonotonicStack"
}
```

Tag names are case-sensitive and must match LeetCode's tags exactly. The canonical value is visible at the bottom of any problem page on LeetCode, or via their GraphQL API (`topicTags[].name`).

The `_default` key determines the fallback folder when no tag in a problem's tag list matches any entry in the map:

```json
{
  "_default": "Misc"
}
```

## Reporting issues

Authentication failures (sync workflow failing with a 403 or session error) are almost always caused by an expired session cookie — this is expected behavior, not a bug. Refer to the [Session expiry](README.md#session-expiry) section in the main README.

For anything else, open an issue with:
- The expected behavior
- The actual behavior
- The relevant step log from the failed workflow run (Actions tab → failed run → expand the failing step)

## Out of scope

The following are intentionally not part of this project:

- **Upstream sync behavior** — changes to how `joshcai/leetcode-sync` fetches submissions are out of scope; raise those upstream.
- **Dashboards or visualizations** — the repo is designed to stay as plain files. The AI agent integration covers the analysis use case.
- **Solution annotations or editorials** — solutions are stored as submitted; notes belong in a separate system.

## License

MIT
