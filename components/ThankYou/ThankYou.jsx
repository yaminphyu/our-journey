import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function ThankYou() {
  return (
    <section className="thank-you" id="thank-you">

      {/* Floating Floral Decoration */}
      <motion.div
        className="flowers flex justify-center items-center gap-4"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        🌸 ✨ 🌸
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Thank You
      </motion.h2>

      {/* Message */}
      <motion.p
        className="message"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        Thank you for being with us this far.
        <br />
        See you on October 30th.
      </motion.p>

      <motion.div
        className="heart"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      >

        <Heart size={44} color="#7A1E2C" fill="#7A1E2C" className="mx-3 mb-8" />
        {/* ❤️ */}
      </motion.div>

      <motion.p
        className="footer-message"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        With love,
      </motion.p>

      <motion.h3
        className="couple"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        Oak & Yamin
      </motion.h3>

      <motion.p
        className="date"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
      >
        30 • 10 • 2026
      </motion.p>

    </section>
  );
}