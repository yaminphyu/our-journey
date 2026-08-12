import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const petals = [
  {
    left: "8%",
    x: -20,
    duration: 10,
    delay: 0,
  },
  {
    left: "18%",
    x: 30,
    duration: 12,
    delay: 2,
  },
  {
    left: "30%",
    x: -15,
    duration: 9,
    delay: 4,
  },
  {
    left: "42%",
    x: 25,
    duration: 13,
    delay: 1,
  },
  {
    left: "55%",
    x: -30,
    duration: 11,
    delay: 3,
  },
  {
    left: "67%",
    x: 20,
    duration: 10,
    delay: 5,
  },
  {
    left: "78%",
    x: -25,
    duration: 14,
    delay: 2,
  },
  {
    left: "88%",
    x: 15,
    duration: 9,
    delay: 4,
  },
  {
    left: "95%",
    x: -20,
    duration: 12,
    delay: 1,
  },
  {
    left: "50%",
    x: 30,
    duration: 11,
    delay: 6,
  },
];

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
          {petals.map((petal, index) => (
            <motion.div
              key={index}
              className="petal"
              style={{
                left: petal.left,
              }}
              animate={{
                y: ["-10vh", "110vh"],
                x: [0, petal.x],
                rotate: [0, 360],
              }}
              transition={{
                duration: petal.duration,
                repeat: Infinity,
                delay: petal.delay,
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
