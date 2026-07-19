"use client";

import { useCallback, useEffect, useState } from "react";

type FabricCarouselProps = {
  images: string[];
  title: string;
};

export default function FabricCarousel({ images, title }: FabricCarouselProps) {
  const [index, setIndex] = useState(0);
  const [pageInput, setPageInput] = useState("001");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerClosing, setViewerClosing] = useState(false);

  const previous = useCallback(() => setIndex((current) => (current - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((current) => (current + 1) % images.length), [images.length]);
  const digits = Math.max(3, String(images.length).length);
  useEffect(() => setPageInput(String(index + 1).padStart(digits, "0")), [digits, index]);

  const commitPage = () => {
    const requested = Number.parseInt(pageInput, 10);
    if (Number.isFinite(requested)) setIndex(Math.min(images.length, Math.max(1, requested)) - 1);
    else setPageInput(String(index + 1).padStart(digits, "0"));
  };
  const closeViewer = useCallback(() => {
    setViewerClosing(true);
    window.setTimeout(() => {
      setViewerOpen(false);
      setViewerClosing(false);
    }, 260);
  }, []);

  useEffect(() => {
    if (!viewerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeViewer, next, previous, viewerOpen]);

  return (
    <>
      <div className="fabric-carousel" role="region" aria-label={`${title} image carousel`}>
        <button className="project-media-carousel-arrow is-previous" type="button" aria-label="Previous image" onClick={previous} />
        <button className="fabric-carousel-image" type="button" aria-label={`Open image ${index + 1} of ${images.length}`} onClick={() => setViewerOpen(true)}>
          <img src={images[index]} alt={`${title} page ${index + 1}`} draggable={false} decoding="async" />
        </button>
        <button className="project-media-carousel-arrow is-next" type="button" aria-label="Next image" onClick={next} />
        <div className="fabric-carousel-count">
          <input
            value={pageInput}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={digits}
            aria-label={`Go to page, maximum ${images.length}`}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => setPageInput(event.currentTarget.value.replace(/\D/g, "").slice(0, digits))}
            onBlur={() => setPageInput(String(index + 1).padStart(digits, "0"))}
            onKeyDown={(event) => {
              if (event.key === "Enter") { commitPage(); event.currentTarget.blur(); }
              if (event.key === "Escape") { setPageInput(String(index + 1).padStart(digits, "0")); event.currentTarget.blur(); }
            }}
          /> / {String(images.length).padStart(digits, "0")}
        </div>
      </div>

      {viewerOpen ? (
        <div className={`project-lightbox fabric-lightbox${viewerClosing ? " is-closing" : " is-opening"}`} role="dialog" aria-modal="true" aria-label={`${title} image viewer`} onClick={closeViewer}>
          <div className="project-lightbox-backdrop" />
          <button className="project-lightbox-close" type="button" aria-label="Close image viewer" onClick={closeViewer} />
          <button className="project-lightbox-arrow is-previous" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); previous(); }} />
          <div className="project-lightbox-media" onClick={(event) => event.stopPropagation()}>
            <img key={images[index]} src={images[index]} alt={`${title} page ${index + 1} enlarged`} draggable={false} />
          </div>
          <button className="project-lightbox-arrow is-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); next(); }} />
        </div>
      ) : null}
    </>
  );
}
