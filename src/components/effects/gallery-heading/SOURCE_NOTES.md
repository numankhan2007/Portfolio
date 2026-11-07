## Gallery Heading source

This integration uses the supplied Gallery Heading HTML as its renderer:

- `gallery-heading.source.html` is retained unchanged from the verified upstream source.
- Runtime adaptation changes only the two visible headline strings to `CERTIFICATES` and `ACHIEVEMENTS`.
- The original Canvas 2D renderer, gradient tile artwork, tile geometry, canvas scaling, labels, and 15.015-second continuous orbit are preserved.
- The source runs inside a sandboxed iframe with `allow-scripts` only. Removing the iframe releases its document and animation resources.
- No ThreeUI package or external assets are required.

Upstream: [Meng To / threeui](https://github.com/MengTo/threeui), revision
`68802d5428071ada5c20db8094b1649e6bb770ed`.

Source file:
`src/shaders/neuform-isolated/sources/gallery-heading.html`

The source project is MIT-licensed; see `THIRD_PARTY_LICENSE.txt`.
