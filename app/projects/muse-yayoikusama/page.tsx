import MuseGallery from "../muse-gallery";

const images = Array.from(
  { length: 8 },
  (_, index) => `/projects/muse-yayoikusama/yayoi-kusama-${String(index + 1).padStart(2, "0")}.jpg`,
);

export default function MuseYayoiKusamaPage() {
  return <MuseGallery title="PROJECT MUSE: YAYOI KUSAMA" year="2025" images={images} />;
}
