import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const photos = [
  // first dress
  {
    src: "/images/gallery/first-1.jpg",
    alt: "Our journey",
    className: "gallery-large",
  },
  {
    src: "/images/gallery/first-2.jpg",
    alt: "Forever together",
    className: "gallery-small",
  },
  {
    src: "/images/gallery/first-3.jpg",
    alt: "Love and laughter",
    className: "gallery-small",
  },
  {
    src: "/images/gallery/first-4.jpg",
    alt: "Beautiful memories",
    className: "gallery-medium",
  },

  // second dress
  {
    src: "/images/gallery/second-1.jpg",
    alt: "Our favorite moment",
    className: "gallery-large",
  },
  {
    src: "/images/gallery/second-2.jpg",
    alt: "A beautiful memory",
    className: "gallery-small",
  },
  {
    src: "/images/gallery/second-3.jpg",
    alt: "Together",
    className: "gallery-small",
  },
  {
    src: "/images/gallery/second-4.jpg",
    alt: "Beautiful memories",
    className: "gallery-medium",
  },

  // third dress
  {
    src: "/images/gallery/third-1.jpg",
    alt: "Our journey",
    className: "gallery-large",
  },
  {
    src: "/images/gallery/third-2.jpg",
    alt: "Love and laughter",
    className: "gallery-small",
  },
  {
    src: "/images/gallery/third-3.jpg",
    alt: "Forever together",
    className: "gallery-small",
  },
  {
    src: "/images/gallery/third-4.jpg",
    alt: "Beautiful memories",
    className: "gallery-medium",
  },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  return (
    <section className="gallery" id="gallery">

      {/* Header */}
      <motion.div
        className="gallery-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="gallery-flower">
          ✿
        </div>

        <p className="gallery-subtitle">
          A Few Beautiful Moments
        </p>

        <h2>Our Memories</h2>

        <p className="gallery-description">
          A collection of moments we treasure
          and memories we will carry forever.
        </p>
      </motion.div>

      {/* Gallery */}
      <div className="gallery-grid">

        {photos.map((photo, index) => (
          <motion.button
            key={photo.src}
            type="button"
            className={`gallery-item ${photo.className}`}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
            }}
            whileHover={{
              scale: 1.02,
            }}
            onClick={() => setSelectedPhoto(photo)}
          >
            {/* <img
              src={photo.src}
              alt={photo.alt}
              loading={index < 2 ? "eager" : "lazy"}
            /> */}

            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 250px"
              className="gallery-image"
              loading={index < 2 ? "eager" : "lazy"}
            />
            <div className="gallery-overlay">
              <span>♡</span>
            </div>
          </motion.button>
        ))}

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="gallery-lightbox-content"
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="gallery-close"
                onClick={closeLightbox}
              >
                ×
              </button>

              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
