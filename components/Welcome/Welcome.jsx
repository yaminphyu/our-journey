import { getStorageData } from "@/hooks/Commom";
import { motion } from "framer-motion";

export default function Welcome({
  guestName = "guest",
  partnerName = "",
}) {
  const updatedGuestName = guestName || getStorageData("name") || "guest";
  const updatedPartnerName = partnerName || getStorageData("partner") || "";
  
  return (
    <section className="welcome" id="welcome">

      {/* Floral Decoration */}
      <motion.div
        className="welcome-flower"
        initial={{ opacity: 0, scale: .6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        🌸 🌿 🌸
      </motion.div>

      {/* Guest Name */}
      <motion.p
        className="welcome-guest"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: .2 }}
      >
        Dear {updatedGuestName} {updatedPartnerName && `& ${updatedPartnerName}`},
      </motion.p>

      {/* Title */}
      <motion.h2
        className="welcome-title"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: .4 }}
      >
        You're Invited
      </motion.h2>

      {/* Message */}
      <motion.p
        className="welcome-message"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: .6 }}
      >
        Together with our families,
        <br />
        we joyfully invite you
        <br />
        to celebrate the beginning
        <br />
        of our forever.
      </motion.p>

      <motion.p
        className="welcome-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        We would be honored to have you
        <br />
        with us on our special day.
      </motion.p>

    </section>
  );
}