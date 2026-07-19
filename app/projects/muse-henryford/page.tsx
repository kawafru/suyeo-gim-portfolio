import MuseGallery from "../muse-gallery";

const images = Array.from(
  { length: 18 },
  (_, index) => `/projects/muse-henryford/henry-ford-${String(index + 3).padStart(2, "0")}.jpg`,
);

export default function MuseHenryFordPage() {
  return <MuseGallery title="PROJECT MUSE: HENRY FORD" year="2025" images={images} />;
}
