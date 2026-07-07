# Contributing

Thanks for checking this out. This repo is primarily a personal learning archive, but it's designed as an open template — contributions that make it more useful for other people are welcome.

## Extending the topic mapping

The only file you'll ever need to touch is [`config/tag-folder-map.json`](config/tag-folder-map.json). It maps LeetCode's official topic tags to the folder names used inside `solutions/`.

To add a new category:

```json
{
  "Segment Tree": "SegmentTree",
  "Monotonic Stack": "MonotonicStack"
}
```

Tag names must match LeetCode's tags exactly — they're case-sensitive. You can find the exact string by opening any LeetCode problem and reading the tags listed at the bottom of the problem page.

The `_default` key controls where problems land when no tag matches:

```json
{
  "_default": "Misc"
}
```

## Reporting issues

If the sync workflow stops working — usually because a session cookie expired — that's expected behavior, not a bug. See the [Session refresh](README.md#keeping-it-running-when-your-session-expires) section in the main README.

For anything else, open an issue describing:
- What you expected to happen
- What actually happened
- The relevant workflow run log (Actions tab → failed run → expand the failing step)

## Things that are out of scope

- Changing how `joshcai/leetcode-sync` works — that's an upstream dependency
- Adding dashboards, visualizations, or web UIs — keep the repo plain files
- Storing solution explanations or editorial notes — solutions stay as submitted

## License

MIT — do whatever you want with this, just don't hold me liable.
