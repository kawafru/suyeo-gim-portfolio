"use client";

import { type Dispatch, type SetStateAction, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const projects = [
  { id: "01", slug: "drrpv", title: "MEOVV — DDI RO RI PERFORMANCE VIDEO", type: "collection", year: "2026", tone: "limen", image: "/meovv-ddi-ro-ri.jpg", note: "CUSTOM GARMENTS PRODUCTION FOR MEOVV - DDI RO RI PERFORMANCE VIDEO\nMEOVV THE 2ND EP ALBUM [BITE NOW]" },
  { id: "02", slug: "lemonade", title: "AESPA — LEMONADE MUSIC VIDEO", type: "collection", year: "2026", tone: "lemonade", image: "/aespa-lemonade-05.webp", note: "CUSTOM GARMENTS PRODUCTION FOR AESPA - LEMONADE MUSIC VIDEO\nLEMONADE, THE 2ND ALBUM\nSMCU SEASON 3" },
  { id: "03", slug: "resistance", title: "ENHYPEN — RESISTANCE", type: "development", year: "2026", tone: "resistance", image: "/enhypen-resistance.jpg", note: "Performance costume development." },
  { id: "04", slug: "loop", title: "I.O.I — LOOP", type: "graphics", year: "2026", tone: "graphic project-fourth", image: "/project-04-we-meet.jpg", note: "CUSTOM GARMENTS PRODUCTION FOR I.O.I\n2026 I.O.I CONCERT TOUR: LOOP" },
  { id: "05", slug: "irene-i-will", title: "IRENE - 2026 ASIA TOUR [I-WILL]", type: "collection", year: "2026", tone: "irene", image: "/irene-i-will-01.jpg", note: "CUSTOM GARMENTS PRODUCTION FOR IRENE\n2026 ASIA TOUR [I-WILL]" },
];

type PortfolioView = "home" | "about" | "cv" | "work" | "project";

type PortfolioClientProps = {
  initialView?: PortfolioView;
  initialFilter?: string;
  initialProjectId?: string;
};

const meovvDetailOriginalImages = [
  "/meovv-detail-01.jpg",
  "/meovv-detail-02.jpg",
  "/meovv-detail-03.jpg",
  "/meovv-detail-04.jpg",
  "/meovv-detail-05.jpg",
  "/meovv-detail-06.jpg",
  "/meovv-detail-07.jpg",
  "/meovv-detail-08.jpg",
  "/meovv-detail-09.jpg",
  "/meovv-detail-10.jpg",
];

const meovvDetailImages = meovvDetailOriginalImages.map((image) => image.replace(".jpg", "-preview.jpg"));

const aespaDetailOriginalImages = [
  "/aespa-detail-01.jpg",
  "/aespa-detail-02.jpg",
  "/aespa-detail-03.jpg",
  "/aespa-detail-04.jpg",
  "/aespa-detail-05.jpg",
  "/aespa-detail-06.jpg",
];

const aespaDetailImages = aespaDetailOriginalImages.map((image) => image.replace(".jpg", "-preview.jpg"));

const ioiLoopDetailOriginalImages = Array.from(
  { length: 7 },
  (_, index) => `/ioi-loop-${String(index + 1).padStart(2, "0")}.jpg`,
);

const ioiLoopDetailImages = ioiLoopDetailOriginalImages.map((image) => image.replace(".jpg", "-preview.jpg"));
const ioiLoopDetailImageRatios = [4 / 3, 2048 / 1366, 2048 / 1366, 3098 / 1935, 3098 / 1936, 2048 / 1366, 4 / 3];
const ioiLoopDetailOriginalWidths = [2736, 2048, 2048, 3098, 3098, 2048, 3072];

const ireneDetailImages = Array.from(
  { length: 6 },
  (_, index) => `/irene-i-will-${String(index + 1).padStart(2, "0")}.jpg`,
);
const ireneDetailImageRatios = [4096 / 2730, 2731 / 4096, 1366 / 2048, 683 / 1024, 2730 / 4095, 2731 / 4096];
const ireneDetailImageWidths = [4096, 2731, 1366, 683, 2730, 2731];
const ireneReferenceImages = [
  "/irene-reference-01.jpeg",
  "/irene-reference-02.png",
  "/irene-reference-03.jpeg",
  "/irene-reference-04.jpeg",
];
const ireneChloeImages = Array.from(
  { length: 4 },
  (_, index) => `/irene-chloe-${String(index + 1).padStart(2, "0")}.jpg`,
);
const ireneBaseSilhouetteImages = Array.from(
  { length: 6 },
  (_, index) => `/irene-base-silhouette-${String(index + 1).padStart(2, "0")}.jpeg`,
);
const ireneLayeringImages = Array.from(
  { length: 3 },
  (_, index) => `/irene-layering-${String(index + 1).padStart(2, "0")}.jpeg`,
);
const ireneFinalImages = Array.from(
  { length: 6 },
  (_, index) => `/irene-final-${String(index + 1).padStart(2, "0")}.jpeg`,
);
const ireneDevelopmentViewerImages = [...ireneReferenceImages, ...ireneChloeImages, ...ireneBaseSilhouetteImages, ...ireneLayeringImages, ...ireneFinalImages];

function AnimatedVideoLightbox({ src, poster, label, onClosed }: { src: string; poster?: string; label: string; onClosed: () => void }) {
  const [closing, setClosing] = useState(false);
  const close = useCallback(() => {
    if (closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClosed();
      return;
    }
    setClosing(true);
    window.setTimeout(onClosed, 260);
  }, [closing, onClosed]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close]);

  return (
    <div className={`project-lightbox video-lightbox ${closing ? "is-closing" : "is-opening"}`} role="dialog" aria-modal="true" aria-label={label} onClick={close}>
      <div className="project-lightbox-backdrop" />
      <button className="project-lightbox-close" type="button" aria-label="Close video viewer" onClick={close} />
      <div className="project-lightbox-media" onClick={(event) => event.stopPropagation()}>
        <video src={src} poster={poster} autoPlay loop muted playsInline controls aria-label={label} />
      </div>
    </div>
  );
}

const ioiLoopReferenceOriginalImages = Array.from(
  { length: 11 },
  (_, index) => `/ioi-loop-reference-${String(index + 1).padStart(2, "0")}.jpg`,
);

const ioiLoopReferenceImages = ioiLoopReferenceOriginalImages.map((image) => image.replace(".jpg", "-preview.jpg"));
const ioiLoopReferenceImageRatios = [720 / 1280, 1200 / 1800, 474 / 842, 958 / 1200, 1080 / 1620, 1200 / 1922, 1168 / 1752, 720 / 1080, 681 / 1022, 1199 / 1499, 304 / 454];
const ioiLoopReferenceOriginalWidths = [720, 1200, 474, 958, 1080, 1200, 1168, 720, 681, 1199, 304];

const ioiCatwalkOriginalImages = Array.from(
  { length: 9 },
  (_, index) => `/ioi-catwalk-${String(index + 1).padStart(2, "0")}.png`,
);

const ioiCatwalkImages = ioiCatwalkOriginalImages.map((image) => image.replace(".png", "-preview.jpg"));
const ioiCatwalkImageRatios = [3460 / 1492, 3440 / 2384, 3346 / 2402, 3402 / 2446, 3402 / 2446, 3368 / 2178, 3402 / 2446, 3402 / 2446, 3402 / 1884];
const ioiCatwalkOriginalWidths = [3460, 3440, 3346, 3402, 3402, 3368, 3402, 3402, 3402];

const ioiFabricOriginalImages = Array.from(
  { length: 8 },
  (_, index) => `/ioi-fabric-${String(index + 1).padStart(2, "0")}.jpg`,
);

const ioiFabricImages = ioiFabricOriginalImages.map((image) => image.replace(".jpg", "-preview.jpg"));
const ioiFabricImageRatios = Array(8).fill(4 / 3);
const ioiFabricOriginalWidths = Array(8).fill(5712);
const ioiFabricViewImage = "/ioi-fabric-09.png";
const ioiFabricViewPreviewImage = "/ioi-fabric-09-preview.jpg";

const ioiPatternOriginalImages = [
  "/ioi-pattern-01.jpg",
  "/ioi-pattern-03.png",
  "/ioi-pattern-02.png",
];
const ioiPatternImages = ioiPatternOriginalImages.map((image) => image.replace(/\.(jpg|png)$/, "-preview.jpg"));
const ioiPatternOriginalWidths = [4032, 1100, 966];

const ioiFittingOriginalImages = [
  "/ioi-fitting-01.jpg",
  "/ioi-fitting-02.jpg",
];
const ioiFittingImages = ioiFittingOriginalImages.map((image) => image.replace(".jpg", "-preview.jpg"));
const ioiFittingOriginalWidths = [4032, 4032];

const ioiAccessoryReferenceImages = Array.from(
  { length: 12 },
  (_, index) => `/ioi-accessory-reference-${String(index + 1).padStart(2, "0")}.jpg`,
);
const ioiAccessoryReferenceRatios = [1, 2 / 3, 2 / 3, 4 / 5, 4 / 5, 1, 2 / 3, 2 / 3, 2 / 3, 11 / 14, 1, 1];
const ioiAccessoryReferenceWidths = [736, 736, 736, 736, 736, 736, 736, 736, 736, 330, 736, 736];

const ioiFinalGarmentOriginalImages = Array.from(
  { length: 3 },
  (_, index) => `/ioi-final-garment-${String(index + 1).padStart(2, "0")}.jpg`,
);
const ioiFinalGarmentImages = ioiFinalGarmentOriginalImages.map((image) => image.replace(".jpg", "-preview.jpg"));
const ioiFinalGarmentRatios = Array(3).fill(3);
const ioiFinalGarmentWidths = Array(3).fill(5400);

const ioiAccessoryDevelopmentOriginalImages = [
  "/ioi-accessory-development-01.jpg",
  "/ioi-accessory-development-02.png",
  "/ioi-accessory-development-03.png",
  "/ioi-accessory-development-04.png",
  "/ioi-accessory-development-05.png",
];
const ioiAccessoryDevelopmentImages = ioiAccessoryDevelopmentOriginalImages.map((image) => image.replace(/\.(jpg|png)$/, "-preview.jpg"));
const ioiAccessoryDevelopmentRatios = [3 / 4, 842 / 596, 843 / 596, 842 / 596, 843 / 596];
const ioiAccessoryDevelopmentWidths = [4284, 842, 843, 842, 843];

const ioiRevisedGarmentOriginalImages = [
  ...Array.from(
    { length: 5 },
    (_, index) => `/ioi-revised-garment-${String(index + 1).padStart(2, "0")}.jpg`,
  ),
  "/ioi-revised-garment-06.png",
];
const ioiRevisedGarmentImages = ioiRevisedGarmentOriginalImages.map((image) => image.replace(/\.(jpg|png)$/, "-preview.jpg"));
const ioiRevisedGarmentWidths = [4284, 4284, 3024, 4284, 4284, 1084];

const meovvFabricOriginalImages = [
  "/meovv-fabric-01.jpg",
  "/meovv-fabric-02.jpg",
  "/meovv-fabric-03.jpg",
  "/meovv-fabric-04.webp",
  "/meovv-fabric-05.jpg",
  "/meovv-fabric-06.jpg",
  "/meovv-fabric-07.jpg",
];

const meovvFabricImages = meovvFabricOriginalImages.map((image) => image.replace(/\.(jpg|webp)$/, "-preview.jpg"));

const meovvFabricImageRatios = [2048 / 1536, 2048 / 1536, 2048 / 1536, 1260 / 952, 2048 / 1536, 4 / 3, 4 / 3];

const aespaNeonPunkOriginalImages = [
  "/aespa-neon-punk-01.jpg",
  "/aespa-neon-punk-02.jpg",
  "/aespa-neon-punk-03.jpg",
  "/aespa-neon-punk-04.jpg",
];

const aespaNeonPunkImages = aespaNeonPunkOriginalImages.map((image) => image.replace(".jpg", "-preview.jpg"));
const aespaNeonPunkImageRatios = [1.5, 1.5, 1.5, 1.5];

const enhypenConceptOriginalImages = Array.from({ length: 12 }, (_, index) => `/enhypen-concept-${String(index + 1).padStart(2, "0")}.jpg`);
const enhypenConceptImages = enhypenConceptOriginalImages.map((image) => image.replace(".jpg", "-preview.jpg"));
const enhypenConceptImageRatios = [...Array(11).fill(2400 / 1687), 1684 / 1191];

const enhypenTechnicalOriginalImages = Array.from({ length: 4 }, (_, index) => `/enhypen-technical-${String(index + 1).padStart(2, "0")}.jpg`);
const enhypenTechnicalImages = enhypenTechnicalOriginalImages.map((image) => image.replace(".jpg", "-preview.jpg"));

const enhypenBuildProcessOriginalImages = [
  "/enhypen-build-process-01.jpg",
  "/enhypen-build-process-laser-cut.png",
  "/enhypen-build-process-02.jpg",
  "/enhypen-build-process-03.jpg",
];
const enhypenBuildProcessImages = enhypenBuildProcessOriginalImages.map((image) => image.replace(/\.(jpg|png)$/, "-preview.jpg"));

const enhypenLookGroups = [
  { caption: "BLACK DRAPE VEST", count: 3 },
  { caption: "OFF-WHITE DRAPE VEST", count: 2 },
  { caption: "MIKADO SILK JACKET", count: 4 },
  { caption: "BLACK LEATHER FRINGE SLEEVELESS COAT", count: 3 },
  { caption: "BLACK COWL NECK VEST", count: 3 },
  { caption: "RING CAPE ACCESSORY", count: 3 },
].map((group, groupIndex, groups) => {
  const start = groups.slice(0, groupIndex).reduce((total, item) => total + item.count, 0);
  const originals = Array.from({ length: group.count }, (_, imageIndex) => `/enhypen-look-${String(start + imageIndex + 1).padStart(2, "0")}.jpg`);
  return { ...group, originals, previews: originals.map((image) => image.replace(".jpg", "-preview.jpg")) };
});

const enhypenLookOriginalImages = enhypenLookGroups.flatMap((group) => group.originals);

const meovvMemberGroups = [
  { name: "ANNA", images: ["/meovv-anna-front.jpg", "/meovv-anna-side.jpg"] },
  { name: "SOOIN", images: ["/meovv-sooin-front.jpg", "/meovv-sooin-side.jpg"] },
  { name: "NARIN", images: ["/meovv-narin-front.jpg", "/meovv-narin-side.jpg"] },
  { name: "GAWON", images: ["/meovv-gawon-front.jpg", "/meovv-gawon-side.jpg"] },
  { name: "ELLA", images: ["/meovv-ella-front.jpg", "/meovv-ella-side.jpg"] },
  { name: "ELLA (REVISED)", images: ["/meovv-ella-revised-front.jpg", "/meovv-ella-revised-side.jpg"] },
].map((member) => ({
  ...member,
  previews: member.images.map((image) => image.replace(".jpg", "-preview.jpg")),
}));

const meovvProcessImages = [
  "/meovv-process-reference.webp",
  ...meovvMemberGroups.flatMap((member) => member.images),
];

const aespaProcessOriginalImages = [
  "/aespa-process-01.webp",
  "/aespa-process-02.webp",
  "/aespa-process-03.jpg",
  "/aespa-process-04.jpg",
  "/aespa-giselle-01.jpg",
  "/aespa-giselle-02.jpg",
  "/aespa-ningning-01.jpg",
  "/aespa-ningning-02.jpg",
  "/aespa-winter-01.jpg",
  "/aespa-winter-02.jpg",
  "/aespa-karina-alternate-01.jpg",
  "/aespa-karina-alternate-02.jpg",
  "/aespa-karina-01.jpg",
  "/aespa-karina-02.jpg",
  "/aespa-accessory-01.jpg",
  "/aespa-accessory-02.jpg",
  "/aespa-accessory-03.jpg",
  "/aespa-uniform-reference-v2.png",
  "/aespa-uniform-sample-01.jpg",
  "/aespa-uniform-sample-02.jpg",
  "/aespa-uniform-component-band.jpg",
  "/aespa-embroidery-spec.webp",
  "/aespa-embroidery-patch-01.jpg",
  "/aespa-embroidery-patch-02.jpg",
  "/aespa-uniform-winter-01.jpg",
  "/aespa-uniform-winter-02.jpg",
  "/aespa-uniform-giselle-01.jpg",
  "/aespa-uniform-giselle-02.jpg",
  "/aespa-neon-reference.jpg",
  "/aespa-neon-dye-01.jpg",
  "/aespa-neon-dye-02.jpg",
  "/aespa-neon-dye-03.jpg",
  "/aespa-neon-lace-01.jpg",
  "/aespa-neon-lace-02.jpg",
  "/aespa-neon-lace-03.jpg",
  "/aespa-neon-lace-04.jpg",
  "/aespa-neon-final-01.jpg",
  "/aespa-neon-final-02.jpg",
];

const aespaProcessPreviewImages = [
  "/aespa-process-01-preview.jpg",
  "/aespa-process-02-preview.jpg",
  "/aespa-process-03-preview.jpg",
  "/aespa-process-04-preview.jpg",
  "/aespa-giselle-01-preview.jpg",
  "/aespa-giselle-02-preview.jpg",
  "/aespa-ningning-01-preview.jpg",
  "/aespa-ningning-02-preview.jpg",
  "/aespa-winter-01-preview.jpg",
  "/aespa-winter-02-preview.jpg",
  "/aespa-karina-alternate-01-preview.jpg",
  "/aespa-karina-alternate-02-preview.jpg",
  "/aespa-karina-01-preview.jpg",
  "/aespa-karina-02-preview.jpg",
  "/aespa-accessory-01-preview.jpg",
  "/aespa-accessory-02-preview.jpg",
  "/aespa-accessory-03-preview.jpg",
  "/aespa-uniform-reference-v2.png",
  "/aespa-uniform-sample-01-preview.jpg",
  "/aespa-uniform-sample-02-preview.jpg",
  "/aespa-uniform-component-band-preview.jpg",
  "/aespa-embroidery-spec-preview.jpg",
  "/aespa-embroidery-patch-01-preview.jpg",
  "/aespa-embroidery-patch-02-preview.jpg",
  "/aespa-uniform-winter-01-preview.jpg",
  "/aespa-uniform-winter-02-preview.jpg",
  "/aespa-uniform-giselle-01.jpg",
  "/aespa-uniform-giselle-02.jpg",
  "/aespa-neon-reference-preview.jpg",
  "/aespa-neon-dye-01-preview.jpg",
  "/aespa-neon-dye-02-preview.jpg",
  "/aespa-neon-dye-03-preview.jpg",
  "/aespa-neon-lace-01-preview.jpg",
  "/aespa-neon-lace-02-preview.jpg",
  "/aespa-neon-lace-03-preview.jpg",
  "/aespa-neon-lace-04-preview.jpg",
  "/aespa-neon-final-01-preview.jpg",
  "/aespa-neon-final-02-preview.jpg",
];

const aespaProcessOriginalWidths = [
  2048, 2048, 2048, 2048,
  1536, 1536, 1536, 1536, 1536, 1536, 1536, 1536, 1536, 1536, 1536, 1536, 1536,
  2048,
  1536, 1536, 1536, 1434, 2048, 2048, 1536, 1536, 1536, 1536,
  1170, 1536, 1536, 1536, 1536, 1536, 1536, 1536, 1536, 1536,
];

const aespaProcessPreviewWidths = aespaProcessOriginalImages.map((_, index) => index < 2 || index === 17 ? 1536 : 1024);

const aespaMemberGroups = [
  { name: "GISELLE", startIndex: 4, imageCount: 2 },
  { name: "NINGNING", startIndex: 6, imageCount: 2 },
  { name: "WINTER", startIndex: 8, imageCount: 2 },
  { name: "KARINA", startIndex: 12, imageCount: 2 },
  { name: "KARINA ALTERNATE", startIndex: 10, imageCount: 2 },
  { name: "ACCESSORY", startIndex: 14, imageCount: 3 },
];

function ProjectImageCarousel({
  images,
  title,
  compact = false,
  imageRatios,
  lightboxImages,
  previewImageWidth,
  originalImageWidths,
  imageSizes,
  autoScroll = true,
  showCarouselArrows = false,
  singleSlide = false,
  draggable = true,
  autoDirection,
  seamless = false,
}: {
  images: string[];
  title: string;
  compact?: boolean;
  imageRatios?: number[];
  lightboxImages?: string[];
  previewImageWidth?: number;
  originalImageWidths?: number[];
  imageSizes?: string;
  autoScroll?: boolean;
  showCarouselArrows?: boolean;
  singleSlide?: boolean;
  draggable?: boolean;
  autoDirection?: -1 | 1;
  seamless?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const dragDistanceRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const releaseVelocityRef = useRef(0);
  const carouselTargetOffsetRef = useRef<number | null>(null);
  const pressedImageRef = useRef<number | null>(null);
  const pressedImageElementRef = useRef<HTMLImageElement | null>(null);
  const sourceImageElementRef = useRef<HTMLImageElement | null>(null);
  const openingRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const openingRef = useRef(false);
  const closingRef = useRef(false);
  const lightboxOpenRef = useRef(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxBackdropRef = useRef<HTMLDivElement>(null);
  const lightboxImageRef = useRef<HTMLImageElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [manualIndex, setManualIndex] = useState(0);

  const finishClosingLightbox = useCallback(() => {
    if (sourceImageElementRef.current) sourceImageElementRef.current.style.visibility = "";
    sourceImageElementRef.current = null;
    openingRectRef.current = null;
    lightboxOpenRef.current = false;
    closingRef.current = false;
    setLightboxIndex(null);
  }, []);

  const closeLightbox = useCallback(() => {
    if (lightboxIndex === null || closingRef.current) return;
    const overlay = lightboxRef.current;
    const backdrop = lightboxBackdropRef.current;
    const enlargedImage = lightboxImageRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!overlay || !backdrop || !enlargedImage || reduceMotion) {
      finishClosingLightbox();
      return;
    }

    closingRef.current = true;
    backdrop.getAnimations().forEach((animation) => animation.cancel());
    enlargedImage.getAnimations().forEach((animation) => animation.cancel());
    const animations: Animation[] = [];
    animations.push(backdrop.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 340,
      easing: "ease-in-out",
      fill: "forwards",
    }));
    overlay.querySelectorAll<HTMLElement>(".project-lightbox-arrow,.project-lightbox-close").forEach((control) => {
      control.getAnimations().forEach((animation) => animation.cancel());
      animations.push(control.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: "ease-out", fill: "forwards" }));
    });
    animations.push(enlargedImage.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 340,
      easing: "ease-in-out",
      fill: "forwards",
    }));

    Promise.allSettled(animations.map((animation) => animation.finished)).then(finishClosingLightbox);
  }, [finishClosingLightbox, lightboxIndex]);

  useLayoutEffect(() => {
    if (singleSlide) {
      offsetRef.current = 0;
      if (trackRef.current) trackRef.current.style.transform = "translate3d(0, 0, 0)";
      return;
    }
    let frame = 0;
    let initialized = false;
    let previous = performance.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = (now: number) => {
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage || stage.clientWidth === 0) {
        frame = requestAnimationFrame(animate);
        return;
      }

      const cycleWidth = track.scrollWidth / 3;
      if (cycleWidth === 0) {
        frame = requestAnimationFrame(animate);
        return;
      }
      if (!initialized) {
        offsetRef.current = cycleWidth;
        initialized = true;
      }

      const elapsed = Math.min(now - previous, 32);
      if (!draggingRef.current && !lightboxOpenRef.current) {
        const targetOffset = carouselTargetOffsetRef.current;
        if (!autoScroll && targetOffset !== null) {
          const distance = targetOffset - offsetRef.current;
          if (Math.abs(distance) <= .5) {
            offsetRef.current = targetOffset;
            carouselTargetOffsetRef.current = null;
          } else {
            offsetRef.current += distance * (1 - Math.exp(-elapsed / 105));
          }
        } else if (Math.abs(releaseVelocityRef.current) > 0.025) {
          offsetRef.current += releaseVelocityRef.current * elapsed;
          releaseVelocityRef.current *= Math.exp(-elapsed / 115);
        } else {
          releaseVelocityRef.current = 0;
          if (autoScroll && !reduceMotion) offsetRef.current += elapsed * 0.108 * (autoDirection ?? (compact ? 1 : -1));
        }
      }

      while (offsetRef.current >= cycleWidth * 2) {
        offsetRef.current -= cycleWidth;
        if (carouselTargetOffsetRef.current !== null) carouselTargetOffsetRef.current -= cycleWidth;
      }
      while (offsetRef.current < cycleWidth) {
        offsetRef.current += cycleWidth;
        if (carouselTargetOffsetRef.current !== null) carouselTargetOffsetRef.current += cycleWidth;
      }
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      previous = now;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [autoDirection, autoScroll, compact, images.length, singleSlide]);

  useLayoutEffect(() => {
    if (lightboxIndex === null || !openingRef.current) return;
    openingRef.current = false;
    const origin = openingRectRef.current;
    const enlargedImage = lightboxImageRef.current;
    const backdrop = lightboxBackdropRef.current;
    const overlay = lightboxRef.current;
    if (!origin || !enlargedImage || !backdrop || !overlay) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      backdrop.style.opacity = "1";
      return;
    }

    const finalRect = enlargedImage.getBoundingClientRect();
    const scaleX = origin.width / Math.max(finalRect.width, 1);
    const scaleY = origin.height / Math.max(finalRect.height, 1);
    const translateX = origin.left - finalRect.left;
    const translateY = origin.top - finalRect.top;
    enlargedImage.animate([
      { transform: `matrix(${scaleX}, 0, 0, ${scaleY}, ${translateX}, ${translateY})`, opacity: .96 },
      { transform: "matrix(1, 0, 0, 1, 0, 0)", opacity: 1 },
    ], {
      duration: 520,
      easing: "cubic-bezier(.22, .61, .36, 1)",
      fill: "both",
    });
    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 380,
      easing: "ease-out",
      fill: "both",
    });
    overlay.querySelectorAll<HTMLElement>(".project-lightbox-arrow,.project-lightbox-close").forEach((control) => {
      control.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 180,
        delay: 170,
        easing: "ease-out",
        fill: "both",
      });
    });
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => current === null ? null : (current - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => current === null ? null : (current + 1) % images.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeLightbox, images.length, lightboxIndex]);

  useEffect(() => () => {
    if (sourceImageElementRef.current) sourceImageElementRef.current.style.visibility = "";
  }, []);

  const beginDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable || event.button !== 0) return;
    draggingRef.current = true;
    carouselTargetOffsetRef.current = null;
    releaseVelocityRef.current = 0;
    dragDistanceRef.current = 0;
    lastPointerXRef.current = event.clientX;
    lastPointerTimeRef.current = event.timeStamp;
    const imageButton = (event.target as HTMLElement).closest<HTMLElement>("[data-image-index]");
    pressedImageRef.current = imageButton ? Number(imageButton.dataset.imageIndex) : null;
    pressedImageElementRef.current = imageButton?.querySelector<HTMLImageElement>("img") ?? null;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const delta = event.clientX - lastPointerXRef.current;
    const elapsed = Math.max(event.timeStamp - lastPointerTimeRef.current, 1);
    dragDistanceRef.current += Math.abs(delta);
    offsetRef.current -= delta;
    const instantVelocity = -delta / elapsed;
    releaseVelocityRef.current = Math.max(-2.4, Math.min(2.4, releaseVelocityRef.current * 0.55 + instantVelocity * 0.45));
    lastPointerXRef.current = event.clientX;
    lastPointerTimeRef.current = event.timeStamp;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>, allowOpen = true) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const pressedImage = pressedImageRef.current;
    const pressedImageElement = pressedImageElementRef.current;
    pressedImageRef.current = null;
    pressedImageElementRef.current = null;
    if (allowOpen && pressedImage !== null && pressedImageElement && dragDistanceRef.current <= 6) {
      const rect = pressedImageElement.getBoundingClientRect();
      openingRectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
      sourceImageElementRef.current = pressedImageElement;
      openingRef.current = true;
      lightboxOpenRef.current = true;
      pressedImageElement.style.visibility = "hidden";
      setLightboxIndex(pressedImage);
    }
  };

  const showPrevious = () => {
    setLightboxIndex((current) => current === null ? null : (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setLightboxIndex((current) => current === null ? null : (current + 1) % images.length);
  };

  const nudgeCarousel = (direction: -1 | 1) => {
    if (singleSlide) {
      setManualIndex((current) => (current + direction + images.length) % images.length);
      return;
    }
    const stage = stageRef.current;
    if (!stage) return;
    releaseVelocityRef.current = 0;
    const step = Math.max(stage.clientWidth * .72, 180);
    carouselTargetOffsetRef.current = (carouselTargetOffsetRef.current ?? offsetRef.current) + direction * step;
  };

  const openSingleSlide = (event: React.MouseEvent<HTMLButtonElement>) => {
    const image = event.currentTarget.querySelector("img");
    if (!image) return;
    const rect = image.getBoundingClientRect();
    openingRectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    sourceImageElementRef.current = image;
    openingRef.current = true;
    lightboxOpenRef.current = true;
    image.style.visibility = "hidden";
    setLightboxIndex(manualIndex);
  };

  return (
    <>
      <div
        className={`project-media-carousel${compact ? " is-compact" : ""}${singleSlide ? " is-single-slide" : ""}${seamless ? " is-seamless" : ""}`}
        ref={stageRef}
        role="region"
        aria-label={`${title} image carousel. ${draggable ? "Drag left or right" : "Use the previous and next buttons"} to browse.`}
        data-testid="project-media-carousel"
        style={singleSlide ? { aspectRatio: `${imageRatios?.[0] ?? 16 / 9}` } : undefined}
        onPointerDown={draggable ? beginDrag : undefined}
        onPointerMove={draggable ? moveDrag : undefined}
        onPointerUp={draggable ? endDrag : undefined}
        onPointerCancel={draggable ? (event) => endDrag(event, false) : undefined}
      >
        <div className="project-media-track" ref={trackRef}>
          {singleSlide ? (
            <button
              className="project-media-slide"
              key={images[manualIndex]}
              type="button"
              aria-label={`Open image ${manualIndex + 1} of ${images.length}`}
              style={{ aspectRatio: `${imageRatios?.[0] ?? 16 / 9}` }}
              onClick={openSingleSlide}
            >
              <img
                src={images[manualIndex]}
                alt={`${title}, image ${manualIndex + 1}`}
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </button>
          ) : [...images, ...images, ...images].map((image, index) => {
            const imageIndex = index % images.length;
            return (
              <button
                className="project-media-slide"
                key={`${image}-${index}`}
                type="button"
                data-image-index={imageIndex}
                aria-label={`Open image ${imageIndex + 1} of ${images.length}`}
                style={{ aspectRatio: `${imageRatios?.[imageIndex] ?? 16 / 9}` }}
              >
                <img
                  src={image}
                  alt={`${title}, image ${imageIndex + 1}`}
                  draggable={false}
                  loading={index === images.length ? "eager" : "lazy"}
                  fetchPriority={index === images.length ? "high" : "auto"}
                  decoding="async"
                />
              </button>
            );
          })}
        </div>
        {showCarouselArrows ? (
          <>
            <button
              className="project-media-carousel-arrow is-previous"
              type="button"
              aria-label={`Previous ${title} images`}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => nudgeCarousel(-1)}
            />
            <button
              className="project-media-carousel-arrow is-next"
              type="button"
              aria-label={`Next ${title} images`}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => nudgeCarousel(1)}
            />
          </>
        ) : null}
      </div>

      {lightboxIndex !== null ? (
        <div
          className="project-lightbox"
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
          data-testid="project-lightbox"
          onClick={closeLightbox}
        >
          <div className="project-lightbox-backdrop" ref={lightboxBackdropRef} />
          <button className="project-lightbox-close" type="button" aria-label="Close image viewer" onClick={closeLightbox}>×</button>
          <button className="project-lightbox-arrow is-previous" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); showPrevious(); }}>‹</button>
          <div className="project-lightbox-media" onClick={(event) => event.stopPropagation()}>
            <img ref={lightboxImageRef} src={(lightboxImages ?? images)[lightboxIndex]} alt={`${title}, enlarged image ${lightboxIndex + 1}`} />
          </div>
          <button className="project-lightbox-arrow is-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); showNext(); }}>›</button>
        </div>
      ) : null}
    </>
  );
}

function MeovvDevelopmentDetails() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const openingRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const shouldAnimateOpenRef = useRef(false);
  const closingRef = useRef(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const finishClose = useCallback(() => {
    closingRef.current = false;
    openingRectRef.current = null;
    setViewerIndex(null);
  }, []);

  const closeViewer = useCallback(() => {
    if (viewerIndex === null || closingRef.current) return;
    const overlay = lightboxRef.current;
    const backdrop = backdropRef.current;
    const image = imageRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!overlay || !backdrop || !image || reduceMotion) {
      finishClose();
      return;
    }

    closingRef.current = true;
    backdrop.getAnimations().forEach((animation) => animation.cancel());
    image.getAnimations().forEach((animation) => animation.cancel());
    const animations: Animation[] = [
      backdrop.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 340, easing: "ease-in-out", fill: "forwards" }),
      image.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 340, easing: "ease-in-out", fill: "forwards" }),
    ];
    overlay.querySelectorAll<HTMLElement>(".project-lightbox-arrow,.project-lightbox-close").forEach((control) => {
      control.getAnimations().forEach((animation) => animation.cancel());
      animations.push(control.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: "ease-out", fill: "forwards" }));
    });
    Promise.allSettled(animations.map((animation) => animation.finished)).then(finishClose);
  }, [finishClose, viewerIndex]);

  useLayoutEffect(() => {
    if (viewerIndex === null || !shouldAnimateOpenRef.current) return;
    shouldAnimateOpenRef.current = false;
    const origin = openingRectRef.current;
    const image = imageRef.current;
    const backdrop = backdropRef.current;
    const overlay = lightboxRef.current;
    if (!origin || !image || !backdrop || !overlay) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      backdrop.style.opacity = "1";
      return;
    }

    const finalRect = image.getBoundingClientRect();
    const scaleX = origin.width / Math.max(finalRect.width, 1);
    const scaleY = origin.height / Math.max(finalRect.height, 1);
    const translateX = origin.left - finalRect.left;
    const translateY = origin.top - finalRect.top;
    image.animate([
      { transform: `matrix(${scaleX}, 0, 0, ${scaleY}, ${translateX}, ${translateY})`, opacity: .96 },
      { transform: "matrix(1, 0, 0, 1, 0, 0)", opacity: 1 },
    ], { duration: 520, easing: "cubic-bezier(.22, .61, .36, 1)", fill: "both" });
    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 380, easing: "ease-out", fill: "both" });
    overlay.querySelectorAll<HTMLElement>(".project-lightbox-arrow,.project-lightbox-close").forEach((control) => {
      control.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, delay: 170, easing: "ease-out", fill: "both" });
    });
  }, [viewerIndex]);

  useEffect(() => {
    if (viewerIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") {
        shouldAnimateOpenRef.current = false;
        setViewerIndex((current) => current === null ? null : (current - 1 + meovvProcessImages.length) % meovvProcessImages.length);
      }
      if (event.key === "ArrowRight") {
        shouldAnimateOpenRef.current = false;
        setViewerIndex((current) => current === null ? null : (current + 1) % meovvProcessImages.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeViewer, viewerIndex]);

  const openViewer = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const image = event.currentTarget.querySelector("img");
    if (!image) return;
    const rect = image.getBoundingClientRect();
    openingRectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    shouldAnimateOpenRef.current = true;
    setViewerIndex(index);
  };

  const showPrevious = () => {
    shouldAnimateOpenRef.current = false;
    setViewerIndex((current) => current === null ? null : (current - 1 + meovvProcessImages.length) % meovvProcessImages.length);
  };

  const showNext = () => {
    shouldAnimateOpenRef.current = false;
    setViewerIndex((current) => current === null ? null : (current + 1) % meovvProcessImages.length);
  };

  return (
    <div className="meovv-development">
      <button className="meovv-reference-image" type="button" onClick={(event) => openViewer(event, 0)} aria-label="Open reference and technical drawing">
        <img src="/meovv-process-reference.webp" alt="MEOVV reference, technical drawing and illustration" decoding="async" />
      </button>
      <div className="meovv-section-caption">REFERENCE + TECHNICAL DRAWING / ILLUSTRATION</div>

      <ProjectImageCarousel
        images={meovvFabricImages}
        lightboxImages={meovvFabricOriginalImages}
        imageRatios={meovvFabricImageRatios}
        previewImageWidth={1024}
        originalImageWidths={[2048, 2048, 2048, 1260, 2048, 2400, 2400]}
        imageSizes="24vw"
        title="MEOVV fabric selection"
        compact
      />
      <div className="meovv-section-caption is-fabric">FABRIC SELECTION</div>

      <div className="meovv-member-grid">
        {meovvMemberGroups.map((member, memberIndex) => (
          <article className="meovv-member-pair" key={member.name} aria-label={`${member.name} garment views`}>
            {member.images.map((image, imageIndex) => {
              const staticIndex = 1 + memberIndex * 2 + imageIndex;
              return (
                <div className="meovv-member-photo" key={image}>
                  <button type="button" onClick={(event) => openViewer(event, staticIndex)} aria-label={`Open ${member.name} ${imageIndex === 0 ? "front" : "side"} view`}>
                    <img
                      src={member.previews[imageIndex]}
                      alt={`${member.name} ${imageIndex === 0 ? "front" : "side"} garment view`}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                  {imageIndex === 0 ? <div className="meovv-member-name">{member.name}</div> : null}
                </div>
              );
            })}
          </article>
        ))}
      </div>

      {viewerIndex !== null ? (
        <div className="project-lightbox" ref={lightboxRef} role="dialog" aria-modal="true" aria-label="MEOVV detail image viewer" onClick={closeViewer}>
          <div className="project-lightbox-backdrop" ref={backdropRef} />
          <button className="project-lightbox-close" type="button" aria-label="Close image viewer" onClick={closeViewer}>×</button>
          <button className="project-lightbox-arrow is-previous" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); showPrevious(); }}>‹</button>
          <div className="project-lightbox-media" onClick={(event) => event.stopPropagation()}>
            <img ref={imageRef} src={meovvProcessImages[viewerIndex]} alt={`MEOVV enlarged detail image ${viewerIndex + 1}`} />
          </div>
          <button className="project-lightbox-arrow is-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); showNext(); }}>›</button>
        </div>
      ) : null}
    </div>
  );
}

function useAnimatedStaticViewer(
  viewerIndex: number | null,
  setViewerIndex: Dispatch<SetStateAction<number | null>>,
  imageCount: number,
) {
  const openingRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const shouldAnimateOpenRef = useRef(false);
  const closingRef = useRef(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const finishClose = useCallback(() => {
    closingRef.current = false;
    openingRectRef.current = null;
    setViewerIndex(null);
  }, [setViewerIndex]);

  const closeViewer = useCallback(() => {
    if (viewerIndex === null || closingRef.current) return;
    const overlay = lightboxRef.current;
    const backdrop = backdropRef.current;
    const image = imageRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!overlay || !backdrop || !image || reduceMotion) {
      finishClose();
      return;
    }
    closingRef.current = true;
    backdrop.getAnimations().forEach((animation) => animation.cancel());
    image.getAnimations().forEach((animation) => animation.cancel());
    const animations: Animation[] = [
      backdrop.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 340, easing: "ease-in-out", fill: "forwards" }),
      image.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 340, easing: "ease-in-out", fill: "forwards" }),
    ];
    overlay.querySelectorAll<HTMLElement>(".project-lightbox-arrow,.project-lightbox-close").forEach((control) => {
      control.getAnimations().forEach((animation) => animation.cancel());
      animations.push(control.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: "ease-out", fill: "forwards" }));
    });
    Promise.allSettled(animations.map((animation) => animation.finished)).then(finishClose);
  }, [finishClose, viewerIndex]);

  const animateOpen = useCallback(() => {
    if (viewerIndex === null || !shouldAnimateOpenRef.current) return;
    const origin = openingRectRef.current;
    const image = imageRef.current;
    const backdrop = backdropRef.current;
    const overlay = lightboxRef.current;
    if (!origin || !image || !backdrop || !overlay) return;
    if (!image.complete || image.naturalWidth === 0) return;
    shouldAnimateOpenRef.current = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      backdrop.style.opacity = "1";
      return;
    }
    const finalRect = image.getBoundingClientRect();
    const scaleX = origin.width / Math.max(finalRect.width, 1);
    const scaleY = origin.height / Math.max(finalRect.height, 1);
    const translateX = origin.left - finalRect.left;
    const translateY = origin.top - finalRect.top;
    image.animate([
      { transform: `matrix(${scaleX}, 0, 0, ${scaleY}, ${translateX}, ${translateY})`, opacity: .96 },
      { transform: "matrix(1, 0, 0, 1, 0, 0)", opacity: 1 },
    ], { duration: 520, easing: "cubic-bezier(.22, .61, .36, 1)", fill: "both" });
    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 380, easing: "ease-out", fill: "both" });
    overlay.querySelectorAll<HTMLElement>(".project-lightbox-arrow,.project-lightbox-close").forEach((control) => {
      control.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, delay: 170, easing: "ease-out", fill: "both" });
    });
  }, [viewerIndex]);

  useLayoutEffect(() => {
    animateOpen();
  }, [animateOpen]);

  useEffect(() => {
    if (viewerIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") setViewerIndex((current) => current === null ? null : (current - 1 + imageCount) % imageCount);
      if (event.key === "ArrowRight") setViewerIndex((current) => current === null ? null : (current + 1) % imageCount);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeViewer, imageCount, setViewerIndex, viewerIndex]);

  const openViewer = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const image = event.currentTarget.querySelector("img");
    if (!image) return;
    const rect = image.getBoundingClientRect();
    openingRectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    shouldAnimateOpenRef.current = true;
    setViewerIndex(index);
  };

  const showPrevious = () => setViewerIndex((current) => current === null ? null : (current - 1 + imageCount) % imageCount);
  const showNext = () => setViewerIndex((current) => current === null ? null : (current + 1) % imageCount);
  return { lightboxRef, backdropRef, imageRef, openViewer, closeViewer, showPrevious, showNext, animateOpen };
}

function EnhypenDevelopmentDetails() {
  const staticViewerImages = [
    "/enhypen-main-theme-original.jpg",
    ...enhypenTechnicalOriginalImages,
    ...enhypenBuildProcessOriginalImages,
    ...enhypenLookOriginalImages,
  ];
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const viewer = useAnimatedStaticViewer(viewerIndex, setViewerIndex, staticViewerImages.length);

  return (
    <div className="enhypen-development">
      <section className="enhypen-main-theme" aria-label="ENHYPEN main theme and key concept analysis">
        <button type="button" onClick={(event) => viewer.openViewer(event, 0)} aria-label="Open ENHYPEN main theme image in viewer">
          <img
            src="/enhypen-main-theme-original-preview.jpg"
            alt="ENHYPEN Resistance main theme and key concept analysis"
            decoding="async"
          />
        </button>
        <div className="aespa-section-caption">MAIN THEME + KEY CONCEPT ANALYSIS</div>
      </section>

      <section className="enhypen-process-block" aria-label="ENHYPEN concept research and reference">
        <ProjectImageCarousel
          images={enhypenConceptImages}
          lightboxImages={enhypenConceptOriginalImages}
          imageRatios={enhypenConceptImageRatios}
          previewImageWidth={1024}
          originalImageWidths={[2400, 2400, 2400, 2400, 2400, 2400, 2400, 2400, 2400, 2400, 2400, 1684]}
          imageSizes="48vw"
          title="ENHYPEN concept research and reference"
          compact
        />
        <div className="aespa-section-caption">CONCEPT RESEARCH + REFERENCE</div>
      </section>

      <section className="enhypen-process-block" aria-label="ENHYPEN technical drawings and additional reference">
        <div className="enhypen-technical-grid">
          {enhypenTechnicalImages.map((image, index) => (
            <button type="button" key={image} onClick={(event) => viewer.openViewer(event, index + 1)} aria-label={`Open ENHYPEN technical image ${index + 1} in viewer`}>
              <img
                src={image}
                alt={`ENHYPEN technical drawing and additional reference ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
        <div className="aespa-section-caption">TECHNICAL DRAWING + ADDITIONAL REFERENCE</div>
      </section>

      <section className="enhypen-process-block" aria-label="ENHYPEN inner top draping and custom hardware development">
        <div className="enhypen-build-process-strip">
          {enhypenBuildProcessImages.map((image, index) => (
            <button type="button" key={image} onClick={(event) => viewer.openViewer(event, 5 + index)} aria-label={`Open ENHYPEN construction process image ${index + 1} in viewer`}>
              <img src={image} alt={`ENHYPEN inner top draping and custom hardware development ${index + 1}`} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
        <div className="aespa-section-caption">INNER TOP DRAPING PROCESS + LASER CUT FOR LEATHER FRINGE + CUSTOM HARDWARE DEVELOPMENT FOR CAPE ACCESSORY</div>
      </section>

      <section className="enhypen-look-development" aria-label="ENHYPEN completed garment looks">
        <div className="enhypen-look-pair is-drape-comparison">
          {enhypenLookGroups.slice(0, 2).map((group, groupIndex) => {
            const imageOffset = groupIndex === 0 ? 0 : enhypenLookGroups[0].count;
            return (
              <article className={`enhypen-look-group ${groupIndex === 0 ? "is-black-drape" : ""}`} key={group.caption}>
                <div className="enhypen-drape-comparison-content">
                  <div className="enhypen-look-images" style={{ gridTemplateColumns: `repeat(${group.count}, minmax(0, 1fr))` }}>
                    {group.previews.map((image, imageIndex) => (
                      <button type="button" key={image} onClick={(event) => viewer.openViewer(event, 9 + imageOffset + imageIndex)} aria-label={`Open ${group.caption} image ${imageIndex + 1} in viewer`}>
                        <img src={image} alt={`${group.caption} garment view ${imageIndex + 1}`} loading="lazy" decoding="async" />
                      </button>
                    ))}
                  </div>
                  {groupIndex === 0 ? (
                  <div className="aespa-jacket-note enhypen-drape-note">
                    <div className="aespa-jacket-note-label">NOTE</div>
                    <div className="aespa-jacket-note-copy">
                      <p>The draped vest inner pieces are shaped with hand-formed pleats and completed with precise hand stitching.</p>
                    </div>
                  </div>
                  ) : null}
                </div>
                <div className="enhypen-look-caption">{groupIndex === 0 ? "BLACK DRAPE VEST" : group.caption}</div>
              </article>
            );
          })}
        </div>

        {enhypenLookGroups.slice(2).map((group, groupIndex) => {
          const groupPosition = groupIndex + 2;
          const imageOffset = enhypenLookGroups.slice(0, groupPosition).reduce((total, item) => total + item.count, 0);
          return (
            <article className="enhypen-look-group is-full" key={group.caption}>
              <div className="enhypen-look-images" style={{ gridTemplateColumns: `repeat(${group.count}, minmax(0, 1fr))` }}>
                {group.previews.map((image, imageIndex) => (
                  <button type="button" key={image} onClick={(event) => viewer.openViewer(event, 9 + imageOffset + imageIndex)} aria-label={`Open ${group.caption} image ${imageIndex + 1} in viewer`}>
                    <img src={image} alt={`${group.caption} garment view ${imageIndex + 1}`} loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
              <div className="enhypen-look-caption">{group.caption}</div>
            </article>
          );
        })}
      </section>

      {viewerIndex !== null ? (
        <div className="project-lightbox" ref={viewer.lightboxRef} role="dialog" aria-modal="true" aria-label="ENHYPEN original image viewer" onClick={viewer.closeViewer}>
          <div className="project-lightbox-backdrop" ref={viewer.backdropRef} />
          <button className="project-lightbox-close" type="button" aria-label="Close image viewer" onClick={viewer.closeViewer}>×</button>
          <button className="project-lightbox-arrow is-previous" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); viewer.showPrevious(); }}>‹</button>
          <div className="project-lightbox-media" onClick={(event) => event.stopPropagation()}>
            <img ref={viewer.imageRef} src={staticViewerImages[viewerIndex]} onLoad={viewer.animateOpen} alt={`ENHYPEN original enlarged image ${viewerIndex + 1}`} />
          </div>
          <button className="project-lightbox-arrow is-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); viewer.showNext(); }}>›</button>
        </div>
      ) : null}
    </div>
  );
}

function IoiLoopDevelopmentDetails() {
  const [fabricViewOpen, setFabricViewOpen] = useState(false);
  const [fabricViewClosing, setFabricViewClosing] = useState(false);
  const [staticViewerIndex, setStaticViewerIndex] = useState<number | null>(null);
  const staticViewerImages = [...ioiPatternOriginalImages, ...ioiFittingOriginalImages, ...ioiRevisedGarmentOriginalImages];
  const viewer = useAnimatedStaticViewer(staticViewerIndex, setStaticViewerIndex, staticViewerImages.length);

  const closeFabricView = useCallback(() => {
    if (fabricViewClosing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFabricViewOpen(false);
      return;
    }
    setFabricViewClosing(true);
    window.setTimeout(() => {
      setFabricViewOpen(false);
      setFabricViewClosing(false);
    }, 260);
  }, [fabricViewClosing]);

  useEffect(() => {
    if (!fabricViewOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFabricView();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [fabricViewOpen, closeFabricView]);

  return (
    <div className="ioi-loop-development">
      <ProjectImageCarousel
        images={ioiLoopReferenceImages}
        lightboxImages={ioiLoopReferenceOriginalImages}
        imageRatios={ioiLoopReferenceImageRatios}
        previewImageWidth={1024}
        originalImageWidths={ioiLoopReferenceOriginalWidths}
        imageSizes="24vw"
        title="I.O.I Loop silhouette reference and detail research"
        compact
      />
      <div className="meovv-section-caption is-fabric">SILHOUETTE REFERENCE + DETAIL RESEARCH</div>

      <section className="ioi-fabric-selection" aria-label="I.O.I fabric selection">
        <ProjectImageCarousel
          images={ioiFabricImages}
          lightboxImages={ioiFabricOriginalImages}
          imageRatios={ioiFabricImageRatios}
          previewImageWidth={1600}
          originalImageWidths={ioiFabricOriginalWidths}
          imageSizes="24vw"
          title="I.O.I fabric selection"
          compact
          autoDirection={-1}
          seamless
        />
        <div className="meovv-section-caption ioi-fabric-caption">
          <div>FABRIC SELECTION</div>
          <button type="button" onClick={() => setFabricViewOpen(true)} aria-label="View I.O.I fabric selection board">( VIEW )</button>
        </div>
      </section>

      <section className="ioi-catwalk-presentation" aria-label="I.O.I Catwalk presentation">
        <ProjectImageCarousel
          images={ioiCatwalkImages}
          lightboxImages={ioiCatwalkOriginalImages}
          imageRatios={ioiCatwalkImageRatios}
          previewImageWidth={1600}
          originalImageWidths={ioiCatwalkOriginalWidths}
          imageSizes="24vw"
          title="I.O.I Catwalk presentation"
          compact
          autoScroll={false}
          showCarouselArrows
          singleSlide
          draggable={false}
        />
        <div className="meovv-section-caption is-fabric">CATWALK PRESENTATION</div>
      </section>

      <section className="ioi-static-section" aria-label="I.O.I pattern development, revision and draping">
        <div className="ioi-pattern-layout">
          {ioiPatternImages.map((image, index) => (
            <button className={`ioi-pattern-image is-image-${index + 1}`} type="button" key={image} onClick={(event) => viewer.openViewer(event, index)} aria-label={`Open I.O.I pattern development image ${index + 1} in viewer`}>
              <img
                src={image}
                alt={`I.O.I pattern development, revision and draping ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
          <div className="aespa-jacket-note ioi-pattern-note">
            <div className="aespa-jacket-note-label">NOTE</div>
            <div className="aespa-jacket-note-copy">
              <p>The garment patterns were developed using each member&apos;s existing body-measurement charts as a reference. Draping was then carried out to align with the silhouette and concept of each look.</p>
            </div>
          </div>
        </div>
        <div className="meovv-section-caption is-fabric">PATTERN DEVELOPMENT AND REVISION + DRAPING</div>
      </section>

      <section className="ioi-static-section" aria-label="I.O.I fitting">
        <div className="ioi-static-image-grid is-two">
          {ioiFittingImages.map((image, index) => (
            <button type="button" key={image} onClick={(event) => viewer.openViewer(event, ioiPatternImages.length + index)} aria-label={`Open I.O.I fitting image ${index + 1} in viewer`}>
              <img src={image} alt={`I.O.I fitting ${index + 1}`} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
        <div className="meovv-section-caption is-fabric">FITTING</div>
      </section>

      <section className="ioi-static-section" aria-label="I.O.I selected additional accessory detail research">
        <ProjectImageCarousel
          images={ioiAccessoryReferenceImages}
          lightboxImages={ioiAccessoryReferenceImages}
          imageRatios={ioiAccessoryReferenceRatios}
          originalImageWidths={ioiAccessoryReferenceWidths}
          imageSizes="24vw"
          title="I.O.I selected additional accessory detail research"
          compact
        />
        <div className="meovv-section-caption is-fabric">ADDITIONAL ACCESSORY DETAIL RESEARCH</div>
      </section>

      <section className="ioi-static-section" aria-label="I.O.I final garments">
        <ProjectImageCarousel
          images={ioiFinalGarmentImages}
          lightboxImages={ioiFinalGarmentOriginalImages}
          imageRatios={ioiFinalGarmentRatios}
          previewImageWidth={1800}
          originalImageWidths={ioiFinalGarmentWidths}
          imageSizes="90vw"
          title="I.O.I final garment presentation"
          compact
          autoScroll={false}
          showCarouselArrows
          singleSlide
          draggable={false}
        />
        <div className="meovv-section-caption is-fabric">FINAL GARMENT</div>
      </section>

      <section className="ioi-static-section" aria-label="I.O.I accessory design and development">
        <ProjectImageCarousel
          images={ioiAccessoryDevelopmentImages}
          lightboxImages={ioiAccessoryDevelopmentOriginalImages}
          imageRatios={ioiAccessoryDevelopmentRatios}
          previewImageWidth={1600}
          originalImageWidths={ioiAccessoryDevelopmentWidths}
          imageSizes="24vw"
          title="I.O.I accessory design and development"
          compact
          autoDirection={-1}
          seamless
        />
        <div className="meovv-section-caption is-fabric">ACCESSORY DESIGN + DEVELOPMENT</div>
      </section>

      <section className="ioi-static-section" aria-label="I.O.I revised garments with accessory">
        <div className="ioi-revised-garment-grid">
          {ioiRevisedGarmentImages.map((image, index) => (
            <button type="button" key={image} onClick={(event) => viewer.openViewer(event, ioiPatternImages.length + ioiFittingImages.length + index)} aria-label={`Open I.O.I revised garment image ${index + 1} in viewer`}>
              <img src={image} alt={`I.O.I revised garment with accessory ${index + 1}`} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
        <div className="meovv-section-caption is-fabric">REVISED GARMENT WITH ACCESSORY</div>
      </section>

      {fabricViewOpen ? (
        <div className={`project-lightbox fabric-lightbox ${fabricViewClosing ? "is-closing" : "is-opening"}`} role="dialog" aria-modal="true" aria-label="I.O.I fabric selection board" onClick={closeFabricView}>
          <div className="project-lightbox-backdrop" />
          <button className="project-lightbox-close" type="button" aria-label="Close fabric selection board" onClick={closeFabricView} />
          <div className="project-lightbox-media" onClick={(event) => event.stopPropagation()}>
            <img src={ioiFabricViewImage} alt="I.O.I fabric selection material board" />
          </div>
        </div>
      ) : null}

      {staticViewerIndex !== null ? (
        <div className="project-lightbox" ref={viewer.lightboxRef} role="dialog" aria-modal="true" aria-label="I.O.I process image viewer" onClick={viewer.closeViewer}>
          <div className="project-lightbox-backdrop" ref={viewer.backdropRef} />
          <button className="project-lightbox-close" type="button" aria-label="Close image viewer" onClick={viewer.closeViewer} />
          <button className="project-lightbox-arrow is-previous" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); viewer.showPrevious(); }} />
          <div className="project-lightbox-media" onClick={(event) => event.stopPropagation()}><img ref={viewer.imageRef} src={staticViewerImages[staticViewerIndex]} onLoad={viewer.animateOpen} alt={`I.O.I process original enlarged image ${staticViewerIndex + 1}`} /></div>
          <button className="project-lightbox-arrow is-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); viewer.showNext(); }} />
        </div>
      ) : null}
    </div>
  );
}

function AespaDevelopmentDetails() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [videoViewerOpen, setVideoViewerOpen] = useState(false);
  const openingRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const shouldAnimateOpenRef = useRef(false);
  const closingRef = useRef(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.6) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    }, { threshold: [0, 0.6, 1] });

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  const finishClose = useCallback(() => {
    closingRef.current = false;
    openingRectRef.current = null;
    setViewerIndex(null);
  }, []);

  const closeViewer = useCallback(() => {
    if (viewerIndex === null || closingRef.current) return;
    const overlay = lightboxRef.current;
    const backdrop = backdropRef.current;
    const image = imageRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!overlay || !backdrop || !image || reduceMotion) {
      finishClose();
      return;
    }

    closingRef.current = true;
    backdrop.getAnimations().forEach((animation) => animation.cancel());
    image.getAnimations().forEach((animation) => animation.cancel());
    const animations: Animation[] = [
      backdrop.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 340, easing: "ease-in-out", fill: "forwards" }),
      image.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 340, easing: "ease-in-out", fill: "forwards" }),
    ];
    overlay.querySelectorAll<HTMLElement>(".project-lightbox-arrow,.project-lightbox-close").forEach((control) => {
      control.getAnimations().forEach((animation) => animation.cancel());
      animations.push(control.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: "ease-out", fill: "forwards" }));
    });
    Promise.allSettled(animations.map((animation) => animation.finished)).then(finishClose);
  }, [finishClose, viewerIndex]);

  useLayoutEffect(() => {
    if (viewerIndex === null || !shouldAnimateOpenRef.current) return;
    shouldAnimateOpenRef.current = false;
    const origin = openingRectRef.current;
    const image = imageRef.current;
    const backdrop = backdropRef.current;
    const overlay = lightboxRef.current;
    if (!origin || !image || !backdrop || !overlay) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      backdrop.style.opacity = "1";
      return;
    }

    const finalRect = image.getBoundingClientRect();
    const scaleX = origin.width / Math.max(finalRect.width, 1);
    const scaleY = origin.height / Math.max(finalRect.height, 1);
    const translateX = origin.left - finalRect.left;
    const translateY = origin.top - finalRect.top;
    image.animate([
      { transform: `matrix(${scaleX}, 0, 0, ${scaleY}, ${translateX}, ${translateY})`, opacity: .96 },
      { transform: "matrix(1, 0, 0, 1, 0, 0)", opacity: 1 },
    ], { duration: 520, easing: "cubic-bezier(.22, .61, .36, 1)", fill: "both" });
    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 380, easing: "ease-out", fill: "both" });
    overlay.querySelectorAll<HTMLElement>(".project-lightbox-arrow,.project-lightbox-close").forEach((control) => {
      control.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, delay: 170, easing: "ease-out", fill: "both" });
    });
  }, [viewerIndex]);

  useEffect(() => {
    if (viewerIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") {
        shouldAnimateOpenRef.current = false;
        setViewerIndex((current) => current === null ? null : (current - 1 + aespaProcessOriginalImages.length) % aespaProcessOriginalImages.length);
      }
      if (event.key === "ArrowRight") {
        shouldAnimateOpenRef.current = false;
        setViewerIndex((current) => current === null ? null : (current + 1) % aespaProcessOriginalImages.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeViewer, viewerIndex]);

  const openViewer = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const image = event.currentTarget.querySelector("img");
    if (!image) return;
    const rect = image.getBoundingClientRect();
    openingRectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    shouldAnimateOpenRef.current = true;
    setViewerIndex(index);
  };

  const showPrevious = () => {
    shouldAnimateOpenRef.current = false;
    setViewerIndex((current) => current === null ? null : (current - 1 + aespaProcessOriginalImages.length) % aespaProcessOriginalImages.length);
  };

  const showNext = () => {
    shouldAnimateOpenRef.current = false;
    setViewerIndex((current) => current === null ? null : (current + 1) % aespaProcessOriginalImages.length);
  };

  const renderImage = (index: number, alt: string, sizes = "100vw") => (
    <button type="button" onClick={(event) => openViewer(event, index)} aria-label={`Open ${alt}`}>
      <img
        src={aespaProcessPreviewImages[index]}
        alt={alt}
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
      />
    </button>
  );

  return (
    <div className="aespa-development">
      <div className="aespa-section-heading">RETROSPECTIVE LOOK</div>

      <div className="aespa-full-image">
        {renderImage(0, "AESPA concept research and reference")}
        <div className="aespa-section-caption">CONCEPT RESEARCH + REFERENCE</div>
      </div>

      <div className="aespa-full-image">
        {renderImage(1, "AESPA technical drawing")}
        <div className="aespa-section-caption">TECHNICAL DRAWING</div>
      </div>

      <div className="aespa-image-pair" aria-label="AESPA fabric dyeing process">
        <div className="aespa-pair-photo">
          {renderImage(2, "AESPA fabric dyeing process, image 1", "50vw")}
          <div className="aespa-section-caption">FABRIC DYEING PROCESS</div>
        </div>
        <div className="aespa-pair-photo">
          {renderImage(3, "AESPA fabric dyeing process, image 2", "50vw")}
        </div>
      </div>

      <div className="meovv-member-grid aespa-member-grid">
        {aespaMemberGroups.map((member) => (
          <article className={`meovv-member-pair${member.imageCount === 3 ? " is-triple" : ""}`} key={member.name} aria-label={`${member.name} garment views`}>
            {Array.from({ length: member.imageCount }, (_, imageOffset) => {
              const index = member.startIndex + imageOffset;
              return (
                <div className="meovv-member-photo" key={aespaProcessOriginalImages[index]}>
                  {renderImage(index, `${member.name} garment view ${imageOffset + 1}`, member.imageCount === 3 ? "17vw" : "25vw")}
                  {imageOffset === 0 ? <div className="meovv-member-name">{member.name}</div> : null}
                </div>
              );
            })}
          </article>
        ))}
      </div>

      <div className="aespa-section-heading is-uniform">UNIFORM LOOK</div>
      <div className="aespa-full-image is-last">
        {renderImage(17, "AESPA uniform reference and technical drawing")}
        <div className="aespa-section-caption">REFERENCE + TECHNICAL DRAWING</div>
      </div>

      <div className="aespa-uniform-continuation">
        <div className="aespa-image-triplet" aria-label="AESPA sample jacket production and components without buttons">
          {renderImage(18, "AESPA uniform sample jacket production, image 1", "34vw")}
          {renderImage(19, "AESPA uniform sample jacket production, image 2", "34vw")}
          {renderImage(20, "AESPA uniform jacket component without button", "34vw")}
        </div>
        <div className="aespa-section-caption">SAMPLE JACKET PRODUCTION + COMPONENTS W/O BUTTON</div>

        <div className="aespa-patch-feature-grid">
          <div className="aespa-patch-content">
            <div className="aespa-patch-media">
              <div className="aespa-full-image aespa-embroidery-spec">
                {renderImage(21, "AESPA embroidery patch specification", "50vw")}
              </div>
              <div className="aespa-image-pair" aria-label="AESPA embroidery patches">
                <div className="aespa-pair-photo">{renderImage(22, "AESPA embroidery patch set", "25vw")}</div>
                <div className="aespa-pair-photo">{renderImage(23, "AESPA embroidery wordmark patch", "25vw")}</div>
              </div>
              <div className="aespa-jacket-note">
                <div className="aespa-jacket-note-label">NOTE</div>
                <div className="aespa-jacket-note-copy">
                  <p>
                    An elastic band is routed across the back toward each armhole. It is rolled into the opening of the back dart to conceal the two bands that extend toward the armholes, while a short additional band connects them at the center.
                  </p>
                  <p>
                    This construction supports wide movements and greater mobility on stage, while turning the functional detail into a distinct design element.
                  </p>
                </div>
              </div>
            </div>
            <div className="aespa-section-caption">EMBROIDERY PATCH CONSTRUCTION</div>
          </div>

          <div className="aespa-video-block video-viewer-trigger" onClick={() => setVideoViewerOpen(true)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setVideoViewerOpen(true); }} aria-label="Open AESPA jacket fit test video">
            <video
              ref={videoRef}
              src="/aespa-jacket-fit-test.mp4"
              poster="/aespa-jacket-fit-test-poster.jpg"
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="AESPA jacket fit and back dart band functionality testing"
            />
            <div className="aespa-section-caption">JACKET FIT + BACK DART BAND FUNCTIONALITY TESTING</div>
          </div>
        </div>

        <div className="meovv-member-grid aespa-member-grid aespa-uniform-member-grid">
          {[
            { name: "WINTER", startIndex: 24, imageCount: 2 },
            { name: "KARINA", startIndex: 26, imageCount: 1 },
            { name: "GISELLE", startIndex: 27, imageCount: 1 },
          ].map((member) => (
            <article className={`meovv-member-pair${member.imageCount === 1 ? " is-single" : ""}`} key={`uniform-${member.name}`} aria-label={`${member.name} uniform jacket views`}>
              {Array.from({ length: member.imageCount }, (_, imageOffset) => {
                const index = member.startIndex + imageOffset;
                return (
                  <div className="meovv-member-photo" key={aespaProcessOriginalImages[index]}>
                    {renderImage(index, `${member.name} uniform jacket view ${imageOffset + 1}`, "25vw")}
                    {imageOffset === 0 ? <div className="meovv-member-name">{member.name}</div> : null}
                  </div>
                );
              })}
            </article>
          ))}
        </div>
      </div>

      <div className="aespa-section-heading is-neon-punk">NEON PUNK LOOK</div>
      <ProjectImageCarousel
        images={aespaNeonPunkImages}
        lightboxImages={aespaNeonPunkOriginalImages}
        imageRatios={aespaNeonPunkImageRatios}
        previewImageWidth={1536}
        originalImageWidths={[3072, 3072, 3072, 3072]}
        imageSizes="48vw"
        title="AESPA neon punk look"
        compact
      />

      <div className="aespa-neon-process">
        <div className="aespa-neon-reference-layout">
          <div className="aespa-neon-reference-image">
            {renderImage(28, "Neon punk reference garment", "50vw")}
          </div>
          <div className="aespa-jacket-note aespa-neon-note">
            <div className="aespa-jacket-note-label">NOTE</div>
            <div className="aespa-jacket-note-copy">
              <p>
                To recreate the reference piece without repeating its original cord-like finish, multiple layers of fabric were dyed in colors developed for the concept. After drying, the tones were checked and adjusted through repeated trials until a consistent match was achieved. The materials were then treated and refined into hand-cut strands with a controlled, fur-like texture.
              </p>
              <p>
                For the finished top, lace fabrics were layered inside the garment to build depth and support. Each strand was shaped to follow the silhouette and individually hand-stitched over the surface, allowing the texture to remain tactile while preserving the intended form.
              </p>
            </div>
          </div>
          <div className="aespa-section-caption aespa-neon-reference-caption">REFERENCE</div>
        </div>

        <section className="aespa-neon-process-block" aria-label="Dyeing process and color adjustments">
          <div className="aespa-neon-image-grid is-three">
            {renderImage(29, "Dyeing process and color adjustment 1", "33vw")}
            {renderImage(30, "Dyeing process and color adjustment 2", "33vw")}
            {renderImage(31, "Dyeing process and color adjustment 3", "33vw")}
          </div>
          <div className="aespa-section-caption">DYEING PROCESS + COLOR ADJUSTMENTS</div>
        </section>

        <section className="aespa-neon-process-block" aria-label="Lace fabrics for layering and drying process">
          <div className="aespa-neon-image-grid is-four">
            {renderImage(32, "Lace fabric and drying process 1", "25vw")}
            {renderImage(33, "Lace fabric and drying process 2", "25vw")}
            {renderImage(34, "Lace fabric and drying process 3", "25vw")}
            {renderImage(35, "Lace fabric and drying process 4", "25vw")}
          </div>
          <div className="aespa-section-caption">LACE FABRICS FOR LAYERING + DRYING PROCESS</div>
        </section>

        <section className="aespa-neon-process-block" aria-label="Final neon punk garment">
          <div className="aespa-neon-image-grid is-two">
            {renderImage(36, "Final neon punk garment 1", "50vw")}
            {renderImage(37, "Final neon punk garment 2", "50vw")}
          </div>
          <div className="aespa-section-caption">FINAL GARMENT</div>
        </section>
      </div>

      {viewerIndex !== null ? (
        <div className="project-lightbox" ref={lightboxRef} role="dialog" aria-modal="true" aria-label="AESPA detail image viewer" onClick={closeViewer}>
          <div className="project-lightbox-backdrop" ref={backdropRef} />
          <button className="project-lightbox-close" type="button" aria-label="Close image viewer" onClick={closeViewer}>×</button>
          <button className="project-lightbox-arrow is-previous" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); showPrevious(); }}>‹</button>
          <div className="project-lightbox-media" onClick={(event) => event.stopPropagation()}>
            <img ref={imageRef} src={aespaProcessOriginalImages[viewerIndex]} alt={`AESPA enlarged detail image ${viewerIndex + 1}`} />
          </div>
          <button className="project-lightbox-arrow is-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); showNext(); }}>›</button>
        </div>
      ) : null}
      {videoViewerOpen ? <AnimatedVideoLightbox src="/aespa-jacket-fit-test.mp4" poster="/aespa-jacket-fit-test-poster.jpg" label="AESPA jacket fit test video viewer" onClosed={() => setVideoViewerOpen(false)} /> : null}
    </div>
  );
}

function IreneDevelopmentDetails() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [videoViewer, setVideoViewer] = useState<"layering" | "final" | null>(null);
  const layeringVideoRef = useRef<HTMLVideoElement>(null);
  const finalVideoRef = useRef<HTMLVideoElement>(null);

  const closeViewer = useCallback(() => {
    if (viewerIndex === null || isClosing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setViewerIndex(null);
      return;
    }
    setIsClosing(true);
    window.setTimeout(() => {
      setViewerIndex(null);
      setIsClosing(false);
    }, 260);
  }, [isClosing, viewerIndex]);

  const showPrevious = useCallback(() => {
    setViewerIndex((current) => current === null ? null : (current - 1 + ireneDevelopmentViewerImages.length) % ireneDevelopmentViewerImages.length);
  }, []);

  const showNext = useCallback(() => {
    setViewerIndex((current) => current === null ? null : (current + 1) % ireneDevelopmentViewerImages.length);
  }, []);

  useEffect(() => {
    if (viewerIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeViewer, showNext, showPrevious, viewerIndex]);

  useEffect(() => {
    const videos = [layeringVideoRef.current, finalVideoRef.current].filter((video): video is HTMLVideoElement => Boolean(video));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      });
    }, { threshold: [0, 0.35, 0.6] });
    videos.forEach((video) => observer.observe(video));
    return () => {
      observer.disconnect();
      videos.forEach((video) => video.pause());
    };
  }, []);

  return (
    <section className="irene-development" aria-label="IRENE development images">
      <div className="irene-reference-grid">
        {ireneReferenceImages.map((image, index) => (
          <button type="button" className="irene-reference-image" key={image} onClick={() => setViewerIndex(index)} aria-label={`Open IRENE garment reference ${index + 1}`}>
            <img src={image} alt={`IRENE garment reference ${index + 1}`} loading="lazy" decoding="async" />
          </button>
        ))}
        <aside className="aespa-jacket-note irene-reference-note">
          <div className="aespa-jacket-note-label">NOTE</div>
          <div className="aespa-jacket-note-copy">
            <p>
              The references were generated with AI and supplied as the creative direction for the garments. The request was to develop each piece as closely as possible to the provided references.
            </p>
          </div>
        </aside>
      </div>
      <div className="aespa-section-caption">REFERENCE</div>

      <div className="irene-chloe-section">
        <div className="irene-chloe-grid">
          {ireneChloeImages.map((image, index) => (
            <button type="button" key={image} onClick={() => setViewerIndex(ireneReferenceImages.length + index)} aria-label={`Open Chloé archive sample image ${index + 1}`}>
              <img src={image} alt={`Chloé archive collection sample ${index + 1}`} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
        <div className="aespa-section-caption irene-chloe-caption">
          SAMPLE FROM <a href="https://www.chloe.com/" target="_blank" rel="noreferrer">CHLOÉ</a> ARCHIVE COLLECTION
        </div>
      </div>

      <div className="irene-base-silhouette-section">
        <div className="irene-base-silhouette-grid">
          {ireneBaseSilhouetteImages.map((image, index) => (
            <button type="button" key={image} onClick={() => setViewerIndex(ireneReferenceImages.length + ireneChloeImages.length + index)} aria-label={`Open base silhouette image ${index + 1}`}>
              <img src={image} alt={`Base silhouette for beaded lace dress and ostrich fur ${index + 1}`} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
        <div className="aespa-section-caption">BASE SILHOUETTE FOR BEADED LACE DRESS + OSTRICH FUR</div>
      </div>

      <div className="irene-layering-section">
        <div className="irene-layering-layout">
          <div className="irene-layering-left">
            <div className="irene-layering-images">
              {ireneLayeringImages.map((image, index) => (
                <button type="button" key={image} onClick={() => setViewerIndex(ireneReferenceImages.length + ireneChloeImages.length + ireneBaseSilhouetteImages.length + index)} aria-label={`Open layering and hand stitching image ${index + 1}`}>
                  <img src={image} alt={`Layering and hand stitching process ${index + 1}`} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
            <aside className="aespa-jacket-note irene-layering-note">
              <div className="aespa-jacket-note-label">NOTE</div>
              <div className="aespa-jacket-note-copy">
                <p>
                  Mesh and multiple layers of beaded fabric were combined over the primary lace base, then carefully built up through a meticulous hand-stitching process to create depth, dimension, and a richly articulated surface.
                </p>
              </div>
            </aside>
          </div>
          <video ref={layeringVideoRef} className="video-viewer-trigger" src="/irene-layering-process.mp4" loop muted playsInline preload="metadata" tabIndex={0} aria-label="Open layering and hand stitching process video" onClick={() => setVideoViewer("layering")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setVideoViewer("layering"); }} />
        </div>
        <div className="aespa-section-caption">LAYERING + HAND STITCHING</div>
      </div>

      <div className="irene-final-section">
        <div className="irene-final-layout">
          <div className="irene-final-images">
            {ireneFinalImages.map((image, index) => (
              <button type="button" key={image} onClick={() => setViewerIndex(ireneReferenceImages.length + ireneChloeImages.length + ireneBaseSilhouetteImages.length + ireneLayeringImages.length + index)} aria-label={`Open final garment image ${index + 1}`}>
                <img src={image} alt={`IRENE final garment ${index + 1}`} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
          <video ref={finalVideoRef} className="video-viewer-trigger" src="/irene-final-garment.mp4" loop muted playsInline preload="metadata" tabIndex={0} aria-label="Open IRENE final garment video" onClick={() => setVideoViewer("final")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setVideoViewer("final"); }} />
        </div>
        <div className="aespa-section-caption">FINAL GARMENT</div>
      </div>

      {viewerIndex !== null ? (
        <div className={`project-lightbox fabric-lightbox ${isClosing ? "is-closing" : "is-opening"}`} role="dialog" aria-modal="true" aria-label="Chloé archive sample image viewer" onClick={closeViewer}>
          <div className="project-lightbox-backdrop" />
          <button className="project-lightbox-close" type="button" aria-label="Close image viewer" onClick={closeViewer} />
          <button className="project-lightbox-arrow is-previous" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); showPrevious(); }} />
          <div className="project-lightbox-media" onClick={(event) => event.stopPropagation()}>
            <img src={ireneDevelopmentViewerImages[viewerIndex]} alt={`IRENE development, enlarged image ${viewerIndex + 1}`} />
          </div>
          <button className="project-lightbox-arrow is-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); showNext(); }} />
        </div>
      ) : null}
      {videoViewer === "layering" ? <AnimatedVideoLightbox src="/irene-layering-process.mp4" label="Layering and hand stitching process video viewer" onClosed={() => setVideoViewer(null)} /> : null}
      {videoViewer === "final" ? <AnimatedVideoLightbox src="/irene-final-garment.mp4" label="IRENE final garment video viewer" onClosed={() => setVideoViewer(null)} /> : null}
    </section>
  );
}

export default function PortfolioClient({
  initialView = "home",
  initialFilter = "work",
  initialProjectId,
}: PortfolioClientProps) {
  const [filter, setFilter] = useState(initialFilter);
  const [active, setActive] = useState(0);
  const [view, setView] = useState<PortfolioView>(initialProjectId ? "project" : initialView);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(() => projects.find((project) => project.id === initialProjectId) ?? null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaderLeaving, setIsLoaderLeaving] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const savedOffsetsRef = useRef<Record<string, number>>({});
  const restoreCarouselOnReturnRef = useRef(false);
  const draggingRef = useRef(false);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const releaseVelocityRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const pressedProjectRef = useRef<(typeof projects)[number] | null>(null);
  const visible = filter === "work" ? projects : projects.filter((p) => p.type === filter);
  const selectedDetailImages = selectedProject?.id === "01"
    ? meovvDetailImages
    : selectedProject?.id === "02"
      ? aespaDetailImages
      : selectedProject?.id === "04"
        ? ioiLoopDetailImages
      : selectedProject?.id === "05"
        ? ireneDetailImages
      : null;
  const selectedDetailOriginalImages = selectedProject?.id === "01"
    ? meovvDetailOriginalImages
    : selectedProject?.id === "02"
      ? aespaDetailOriginalImages
      : selectedProject?.id === "04"
        ? ioiLoopDetailOriginalImages
      : selectedProject?.id === "05"
        ? ireneDetailImages
      : null;

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    let completed = 0;
    const preloadSources = initialView === "work"
        ? (initialFilter === "work" ? projects.map((project) => project.image) : [])
        : [];
    const total = preloadSources.length;

    const finishAsset = () => {
      completed += 1;
    };

    const preloaders = preloadSources.map((source) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        const decoded = image.decode ? image.decode().catch(() => undefined) : Promise.resolve();
        decoded.finally(finishAsset);
      };
      image.onerror = finishAsset;
      image.src = source;
      return image;
    });

    const startedAt = performance.now();
    const updateProgress = (now: number) => {
      if (cancelled) return;
      const elapsedProgress = Math.min(99, Math.floor((now - startedAt) / (total === 0 ? 6 : 18)));
      const displayedProgress = completed === total ? elapsedProgress : Math.min(98, elapsedProgress);
      setLoadingProgress(displayedProgress);

      if (completed === total && elapsedProgress >= 99) {
        setIsLoaderLeaving(true);
        window.setTimeout(() => {
          if (!cancelled) setIsLoading(false);
        }, 320);
        return;
      }
      frame = requestAnimationFrame(updateProgress);
    };

    frame = requestAnimationFrame(updateProgress);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      preloaders.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [initialFilter, initialView]);

  useEffect(() => {
    const handleHistoryNavigation = (event: PopStateEvent) => {
      const path = window.location.pathname;
      const projectSlug = path.startsWith("/works/") ? path.slice("/works/".length).split("/")[0] : null;
      const projectId = event.state?.projectId;
      const project = projects.find((item) => item.id === projectId || item.slug === projectSlug);
      if (project && projectSlug) {
        setSelectedProject(project);
        setView("project");
        return;
      }
      if (path === "/works") {
        restoreCarouselOnReturnRef.current = true;
        setFilter("work");
        setView("work");
        return;
      }
      if (path === "/collection") {
        setFilter("collection");
        setView("work");
        return;
      }
    };

    window.addEventListener("popstate", handleHistoryNavigation);
    return () => window.removeEventListener("popstate", handleHistoryNavigation);
  }, []);

  useEffect(() => {
    if (isLoading || view !== "project" || !selectedProject) return;
    let cancelled = false;
    const preloaders: HTMLImageElement[] = [];
    const previewSources = Array.from(new Set(selectedProject.id === "01" ? [
      ...meovvDetailImages,
      ...meovvFabricImages,
      "/meovv-process-reference.webp",
      ...meovvMemberGroups.flatMap((member) => member.previews),
    ] : selectedProject.id === "02" ? [
      ...aespaDetailImages,
      ...aespaProcessPreviewImages,
      ...aespaNeonPunkImages,
    ] : selectedProject.id === "04" ? [
      ...ioiLoopDetailImages,
      ...ioiLoopReferenceImages,
      ...ioiFabricImages,
      ioiFabricViewPreviewImage,
      ...ioiCatwalkImages,
      ...ioiPatternImages,
      ...ioiFittingImages,
    ] : selectedProject.id === "05" ? [
      ...ireneDetailImages,
      ...ireneReferenceImages,
      ...ireneChloeImages,
      ...ireneBaseSilhouetteImages,
      ...ireneLayeringImages,
      ...ireneFinalImages,
    ] : []));
    const originalSources = Array.from(new Set(selectedProject.id === "01" ? [
      ...meovvDetailOriginalImages,
      ...meovvFabricOriginalImages,
      ...meovvMemberGroups.flatMap((member) => member.images),
    ] : selectedProject.id === "02" ? [
      ...aespaDetailOriginalImages,
      ...aespaProcessOriginalImages,
      ...aespaNeonPunkOriginalImages,
    ] : selectedProject.id === "04" ? [
      ...ioiLoopDetailOriginalImages,
      ...ioiLoopReferenceOriginalImages,
      ...ioiFabricOriginalImages,
      ioiFabricViewImage,
      ...ioiCatwalkOriginalImages,
    ] : selectedProject.id === "05" ? [
      ...ireneDetailImages,
      ...ireneReferenceImages,
      ...ireneChloeImages,
      ...ireneBaseSilhouetteImages,
      ...ireneLayeringImages,
      ...ireneFinalImages,
    ] : []));

    const preload = (sources: string[], priority: "auto" | "low") => {
      if (cancelled) return;
      sources.forEach((source) => {
        const image = new Image();
        image.decoding = "async";
        image.fetchPriority = priority;
        image.src = source;
        preloaders.push(image);
      });
    };

    const previewTimer = window.setTimeout(() => preload(previewSources, "auto"), 0);
    const originalTimer = window.setTimeout(() => preload(originalSources, "low"), 350);
    return () => {
      cancelled = true;
      window.clearTimeout(previewTimer);
      window.clearTimeout(originalTimer);
      preloaders.length = 0;
    };
  }, [isLoading, selectedProject, view]);

  useLayoutEffect(() => {
    if (view !== "work" || visible.length < 2 || !trackRef.current) return;
    let initialized = false;
    let frame = 0;
    let previous = performance.now();
    const animate = (now: number) => {
      const track = trackRef.current;
      if (!track) return;
      const parsedGap = Number.parseFloat(getComputedStyle(track).getPropertyValue("--slide-gap"));
      const gap = Number.isFinite(parsedGap) ? parsedGap : 28;
      const firstCycleSlides = Array.from(track.querySelectorAll<HTMLElement>(".slide")).slice(0, visible.length);
      const slideWidths = firstCycleSlides.map((slide) => slide.offsetWidth + gap);
      const cycleWidth = slideWidths.reduce((total, width) => total + width, 0) || 1;
      if (!initialized) {
        const rememberedOffset = restoreCarouselOnReturnRef.current ? savedOffsetsRef.current[filter] : undefined;
        offsetRef.current = rememberedOffset ?? cycleWidth;
        if (rememberedOffset === undefined) {
          releaseVelocityRef.current = 0;
          setActive(0);
        }
        restoreCarouselOnReturnRef.current = false;
        while (offsetRef.current >= cycleWidth * 2) offsetRef.current -= cycleWidth;
        while (offsetRef.current < cycleWidth) offsetRef.current += cycleWidth;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        initialized = true;
      }
      const elapsed = Math.min(now - previous, 32);
      if (!draggingRef.current) {
        if (Math.abs(releaseVelocityRef.current) > 0.025) {
          offsetRef.current += releaseVelocityRef.current * elapsed;
          // A short, firm inertial glide: preserve the release speed, then
          // progressively brake and hand control back to the auto-scroll.
          releaseVelocityRef.current *= Math.exp(-elapsed / 105);
        } else {
          releaseVelocityRef.current = 0;
          offsetRef.current += elapsed * 0.0624;
        }
      }
      if (offsetRef.current >= cycleWidth * 2) offsetRef.current -= cycleWidth;
      if (offsetRef.current < cycleWidth) offsetRef.current += cycleWidth;
      savedOffsetsRef.current[filter] = offsetRef.current;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      const positionInCycle = ((offsetRef.current % cycleWidth) + cycleWidth) % cycleWidth;
      let accumulatedWidth = 0;
      let nextActive = 0;
      for (let index = 0; index < slideWidths.length; index += 1) {
        if (positionInCycle < accumulatedWidth + slideWidths[index]) {
          nextActive = index;
          break;
        }
        accumulatedWidth += slideWidths[index];
      }
      setActive((currentIndex) => currentIndex === nextActive ? currentIndex : nextActive);
      previous = now;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [view, filter, visible.length]);

  const beginDrag = (event: React.PointerEvent<HTMLElement>) => {
    draggingRef.current = true;
    releaseVelocityRef.current = 0;
    lastPointerX.current = event.clientX;
    lastPointerTime.current = event.timeStamp;
    dragDistanceRef.current = 0;
    const projectButton = (event.target as HTMLElement).closest<HTMLElement>("[data-project-id]");
    pressedProjectRef.current = projects.find((project) => project.id === projectButton?.dataset.projectId) ?? null;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event: React.PointerEvent<HTMLElement>) => {
    if (!draggingRef.current) return;
    const delta = event.clientX - lastPointerX.current;
    dragDistanceRef.current += Math.abs(delta);
    const elapsed = Math.max(event.timeStamp - lastPointerTime.current, 1);
    const instantVelocity = -delta / elapsed;
    offsetRef.current -= delta;
    releaseVelocityRef.current = Math.max(-2.4, Math.min(2.4, releaseVelocityRef.current * 0.55 + instantVelocity * 0.45));
    lastPointerX.current = event.clientX;
    lastPointerTime.current = event.timeStamp;
  };

  const openProject = (project: (typeof projects)[number]) => {
    if (dragDistanceRef.current > 6) return;
    savedOffsetsRef.current[filter] = offsetRef.current;
    setSelectedProject(project);
    setView("project");
    window.history.pushState({ projectId: project.id }, "", `/works/${project.slug}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  const endDrag = (event: React.PointerEvent<HTMLElement>, allowOpen = true) => {
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const pressedProject = pressedProjectRef.current;
    pressedProjectRef.current = null;
    if (allowOpen && pressedProject && dragDistanceRef.current <= 6) openProject(pressedProject);
  };
  const showCarousel = (nextFilter: string, restoreFromProject = false) => {
    restoreCarouselOnReturnRef.current = restoreFromProject;
    if (!restoreFromProject) {
      delete savedOffsetsRef.current[nextFilter];
      offsetRef.current = 0;
      releaseVelocityRef.current = 0;
    }
    setFilter(nextFilter);
    setActive(0);
    setView("work");
    const nextPath = nextFilter === "collection" ? "/collection" : "/works";
    if (restoreFromProject) window.history.replaceState({}, "", nextPath);
    else window.history.pushState({}, "", nextPath);
  };

  return (
    <main className={`site ${view}`}>
      {isLoading ? (
        <div className={`site-loader${isLoaderLeaving ? " is-leaving" : ""}`} role="status" aria-label={`Loading ${loadingProgress} percent`}>
          <span>{String(loadingProgress).padStart(2, "0")}</span>
        </div>
      ) : null}
      <header className="nav">
        <a className="wordmark" href="/" aria-label="Home">
          <span>suyeo</span> gim
        </a>

        <nav className="nav-groups" aria-label="Portfolio navigation">
          <div className="nav-group">
            <a className={filter === "work" && (view === "work" || view === "project") ? "active" : ""} href="/works">works</a>
            <a href="/projects">projects</a>
            <a className={filter === "collection" && view === "work" ? "active" : ""} href="/collection">collection</a>
          </div>
          <div className="nav-group secondary">
            <a className={view === "about" ? "active" : ""} href="/about">about</a>
            <a className={view === "cv" ? "active" : ""} href="/cv">cv</a>
          </div>
        </nav>

        <div className="index">{view === "project" ? "" : view === "work" ? "works" : view}</div>
      </header>

      {view === "home" ? (
        <section className="home-view">
          <p>suyeo gim</p>
          <p>fashion designer</p>
          <p>seoul / milano</p>
        </section>
      ) : view === "work" ? (
        <section className="slideshow-view" aria-live="polite">
          <div className="slide-stage" role="region" aria-label="Selected work slideshow. Drag left or right to browse." onPointerDown={beginDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={(event) => endDrag(event, false)}>
            <div className="slide-track" ref={trackRef}>
            {[...visible, ...visible, ...visible].map((project, idx) => (
              <article key={`${project.id}-${idx}`} className={`slide ${project.tone}`} aria-label={project.title}>
                <span className="slide-title">{project.title}</span>
                {filter === "work" && project.image ? (
                  <button className="slide-art has-photo" data-project-id={project.id} aria-label={`Open ${project.title} project`}>
                    <img className={`slide-photo${project.id === "02" ? " slide-photo--lemonade" : ""}`} src={project.image} alt={project.title} draggable={false} loading={idx < visible.length ? "eager" : "lazy"} fetchPriority={idx < visible.length ? "high" : "auto"} decoding="async" />
                  </button>
                ) : (
                  <span className="slide-art"><i /><i /><i /></span>
                )}
              </article>
            ))}
            </div>
          </div>
          <div className="carousel-count">{String(active + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}</div>
        </section>
      ) : view === "project" && selectedProject ? (
        <section className="project-detail">
          <header className="project-detail-head">
            <div className="project-detail-identity">
              <div className="project-detail-title">{selectedProject.title}</div>
              <div className="project-detail-year">Completed: {selectedProject.year}</div>
            </div>
            <button className="project-detail-back" onClick={() => showCarousel("work", true)} aria-label="Back to works">( Back )</button>
          </header>

          {selectedDetailImages ? (
            <ProjectImageCarousel
              images={selectedDetailImages}
              lightboxImages={selectedDetailOriginalImages ?? undefined}
              imageRatios={selectedProject.id === "04" ? ioiLoopDetailImageRatios : selectedProject.id === "05" ? ireneDetailImageRatios : undefined}
              previewImageWidth={selectedProject.id === "04" ? 1024 : 1536}
              originalImageWidths={selectedProject.id === "04" ? ioiLoopDetailOriginalWidths : selectedProject.id === "05" ? ireneDetailImageWidths : selectedDetailOriginalImages?.map(() => 2048)}
              imageSizes="70vw"
              title={selectedProject.title}
            />
          ) : (
            <figure className="project-detail-hero">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </figure>
          )}

          <div className={`project-overview${selectedProject.id === "01" || selectedProject.id === "02" || selectedProject.id === "03" || selectedProject.id === "04" || selectedProject.id === "05" ? " is-meovv" : ""}`}>
            <h2>Overview:</h2>
            <p>{selectedProject.note}</p>
          </div>

          <div className="project-details-label">Detail Images ({selectedProject.id === "01" ? 20 : selectedProject.id === "02" ? 42 : selectedProject.id === "03" ? 38 : selectedProject.id === "04" ? 34 : selectedProject.id === "05" ? 23 : 0})</div>
          {selectedProject.id === "01" ? <MeovvDevelopmentDetails /> : null}
          {selectedProject.id === "02" ? <AespaDevelopmentDetails /> : null}
          {selectedProject.id === "03" ? <EnhypenDevelopmentDetails /> : null}
          {selectedProject.id === "04" ? <IoiLoopDevelopmentDetails /> : null}
          {selectedProject.id === "05" ? <IreneDevelopmentDetails /> : null}
          <div className="project-detail-bottom-nav">
            <button className="project-detail-back" onClick={() => showCarousel("work", true)} aria-label="Back to works">( Back )</button>
          </div>
        </section>
      ) : view === "about" ? (
        <section className="about-view">
          <div className="intro">
            <p>Suyeo Gim is a Seoul and Milan-based fashion designer working across collection design, creative direction, and visual development.</p>
            <p>His practice is shaped by experience in a couture stage-costume atelier, immersion in cultures across the United States and Europe, and collaborations with a range of artists. He translates diverse ideas and cultural references into forms that invite the wearer to move beyond convention, reveal individual beauty and character, and experience transformation and evolution.</p>
            <p>Drawing inspiration from the beauty of everyday life, he approaches each garment as more than a functional object: each design carries a message and proposes an idea, becoming an artwork through fluid silhouettes, considered fit, organic construction, functional details, and purposeful materials.</p>
          </div>
          <div className="details">
            <div><h2>services</h2><p>Fashion design<br/>Concept development<br/>Creative direction<br/>Technical development<br/>Brand identity</p></div>
            <div><h2>practice</h2><p>Collection research<br/>Garment development<br/>Visual storytelling<br/>Image direction</p></div>
          </div>
          <footer><a href="mailto:fvrkimm@gmail.com">fvrkimm@gmail.com</a><a href="https://www.instagram.com/kawafru/" target="_blank" rel="noreferrer">instagram ↗</a><span>Seoul / Milano</span></footer>
        </section>
      ) : (
        <section className="cv-view">
          <div className="cv-grid">
            <div><h2>education</h2><p>BFA Fashion Design &amp; Accessories, Istituto Marangoni Milan</p></div>
            <div><h2>experience</h2><p>Argent, Design Assistant<br/>ACBC, Marketing Assistant<br/>Independent commissions</p></div>
            <div><h2>proficiency</h2><p className="proficiency-list">
              Garment / Concept Design<br/>
              Collection Development<br/>
              Fashion Illustration<br/>
              Technical Drawing
              <span className="cv-spacer" aria-hidden="true" />
              Digital Marketing<br/>
              Ad Campaign
              <span className="cv-spacer" aria-hidden="true" />
              Adobe Photoshop<br/>
              <span className="software-indent">Illustrator<br/>InDesign</span>
            </p></div>
            <div><h2>contact</h2><p><a href="mailto:fvrkimm@gmail.com">fvrkimm@gmail.com</a><br/><a href="https://www.instagram.com/kawafru/" target="_blank" rel="noreferrer">instagram ↗</a></p></div>
          </div>
        </section>
      )}
    </main>
  );
}
