import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const petals = [...Array(10)];

export default function SplashScreen({ onOpen }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleOpen = () => {
    setFadeOut(true);

    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {petals.map((_, i) => (
            <motion.div
              key={i}
              className="petal"
              style={{
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: ["-10vh", "110vh"],
                x: [0, Math.random() * 80 - 40],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            >
              🌸
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
            }}
          >
            <h1 className="couple-name">Oak ♥ Yamin</h1>
          </motion.div>

          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
            }}
          >
            Together with their families
          </motion.p>

          <motion.p
            className="invite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1,
            }}
          >
            Request the pleasure of your presence
          </motion.p>

          <motion.button
            className="open-btn"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleOpen}
          >
            Open Invitation
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}