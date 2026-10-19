# Tech radar

The `/tech-radar` page renders a Zalando-inspired tech radar from `technos.json`. Technos, quadrants
and rings come from that single file; quadrant and ring labels are translated in
`src/lib/translations/locales/*.json`.

## Editing `technos.json`

- `quadrants`: the categories, one sector each on the radar.
- `rings`: the opinion levels, from the center (best) outwards, each with a `color` used for its
  dots and legend headings.
- `entries`: the technos themselves. Each one needs:
  - `name`: displayed in the legend.
  - `quadrant`: must match one of the `quadrants` values.
  - `ring`: must match one of the `rings` names.
  - `link` (optional): makes the legend entry a link.

A typo in `quadrant` or `ring` fails the build with an explicit error instead of silently
dropping the entry.

Dot positions are computed deterministically (`radar.ts`): entries of the same quadrant and ring
are spread along the ring band, sorted alphabetically, so there is no coordinate to maintain by
hand.
