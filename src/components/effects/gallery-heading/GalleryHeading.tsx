"use client";

import { useMemo } from "react";
import source from "./gallery-heading.source.html?raw";

/**
 * Hosts the supplied Gallery Heading HTML unchanged except for its two
 * headline strings. Canvas renderer, gradient artwork, timing, and layout
 * stay authored by the source document.
 */
function buildScene() {
  return source
    .replace(
      "{ s:'NEW GRAINIENT',    top:930,  w:1370, fill:'#d0d0d0' }",
      "{ s:'CERTIFICATES',      top:930,  w:1370, fill:'#d0d0d0' }",
    )
    .replace(
      "{ s:'COLLECTION ADDED', top:1114, w:1775, fill:'#ffffff' }",
      "{ s:'ACHIEVEMENTS',      top:1114, w:1775, fill:'#ffffff' }",
    );
}

export function GalleryHeading() {
  const srcDoc = useMemo(() => buildScene(), []);

  return (
    <div className="certificate-gallery-heading" aria-label="Certificates gallery heading">
      <iframe
        title="Certificates gallery heading animation"
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        loading="eager"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
