import { motion } from "framer-motion";

const PETALS = Array.from({ length: 18 });

export default function FloatingPetals() {
  return (
    <>
      {PETALS.map((_, index) => {
        const left = Math.random() * 100;
        const duration = 10 + Math.random() * 10;
        const delay = Math.random() * 6;
        const size = 18 + Math.random() * 22;

        return (
          <motion.div
            key={index}
            className="petal"
            style={{
              left: `${left}%`,
            }}
            animate={{
              y: ["-10vh", "110vh"],
              x: [0, Math.random() * 80 - 40],
              rotate: [0, 360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
          >
            🌸
          </motion.div>
          // <motion
          //   key={index}
          //   src="/images/petal.png"
          //   alt=""
          //   className="petal"
          //   style={{
          //     left: `${left}%`,
          //     width: size,
          //   }}
          //   initial={{
          //     y: "-10vh",
          //     opacity: 0,
          //     rotate: 0,
          //   }}
          //   animate={{
          //     y: "110vh",
          //     opacity: [0, 1, 1, 0],
          //     x: [0, -40, 20, -30, 0],
          //     rotate: [0, 120, 240, 360],
          //   }}
          //   transition={{
          //     duration,
          //     repeat: Infinity,
          //     ease: "linear",
          //     delay,
          //   }}
          // />
        );
      })}
    </>
  );
}