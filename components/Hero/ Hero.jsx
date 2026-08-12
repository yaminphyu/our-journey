import { motion } from "framer-motion";
import FloatingPetals from "./FloatingPetals";

export default function Hero() {
  const handleScroll = () => {
  const section = document.getElementById("welcome");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="hero" id="hero">

      <FloatingPetals />
      <div className="hero-overlay" />

      <div className="hero-content">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >

          <motion.p
            className="hero-subtitle"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ delay: .2 }}
          >
            We're Getting Married
          </motion.p>

          <motion.h1
            className="hero-title"
            initial={{ scale: .8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: .8
            }}
          >
            oak
            <span>&</span>
            yamin
          </motion.h1>

          <motion.h3
            className="hero-date"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: .6
            }}
          >
            October 30, 2026
          </motion.h3>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: .8
            }}
          >
            Together with our families,
            we invite you to celebrate
            the beginning of our forever.
          </motion.p>

        </motion.div>
      </div>

      <motion.div
        className="scroll"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2
        }}
        onClick={handleScroll}
      >
        ↓
      </motion.div>
    </section>
  );
}