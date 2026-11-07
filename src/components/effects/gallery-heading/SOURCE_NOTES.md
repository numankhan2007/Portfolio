## Gallery Heading source attribution

The Canvas 2D renderer is adapted from the Gallery Heading source in
[Meng To's threeui repository](https://github.com/MengTo/threeui), revision
`68802d5428071ada5c20db8094b1649e6bb770ed`.

Canonical source file:
`src/shaders/neuform-isolated/sources/gallery-heading.html`

SHA-256: `8e42d2d5b497` (source revision supplied by the implementation brief).

The local integration retains the Canvas 2D ring projection, tile ordering,
canvas sizing, and headline compositing. It adapts the headline for the
Certificates section, replaces the original gradient artwork with a matte
palette shaded by deterministic procedural noise, changes tile proportions to
4:3, and changes the clock to hover-driven eased orbit. The source document is
kept alongside the local wrapper for auditability.

The upstream project is MIT-licensed; its license text is included in
`THIRD_PARTY_LICENSE.txt`.
