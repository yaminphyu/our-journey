import { motion } from "framer-motion";

const ladyCodes = [
  { code: "#430012", name: "Deep Burgundy" },
  { code: "#6D001D", name: "Deep Red" },
  { code: "#666B33", name: "Olive Green" },
  { code: "#E0A6A5", name: "Blush Pink" },
  { code: "#ECBBB1", name: "Light Pink" },
  { code: "#C1C9B1", name: "Light Green" },
];

const guyCodes = [
  { code: "#000000", name: "Black" },
  { code: "#430012", name: "Deep Burgundy" },
  { code: "#373C1C", name: "Deep Forest Green" },
  // { code: "#4F2E19", name: "Brown" },
  { code: "#343434", name: "Charcoal Gray" },
  // { code: "#3A3A3A", name: "Charcoal" },
  // { code: "#8C725B", name: "Warmed Taupe" },
  { code: "#F2E6D5", name: "Ivory" },

];

export default function WeddingDetails() {
  return (
    <section className="details">

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Wedding Details
      </motion.h2>

      <motion.p
        className="details-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: .2 }}
        viewport={{ once: true }}
      >
        We can't wait to celebrate this special day with you.
      </motion.p>

      <div className="details-grid">

        {/* Ceremony */}

        <motion.div
          className="detail-card"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="icon">💒</div>

          <h3>Ceremony</h3>

          <p>Friday</p>

          <p>October 30, 2026</p>

          <p>5:30 PM</p>

          <p>
          Dawn to Dust
          </p>

          <a
            href="https://maps.app.goo.gl/N5ovg37wdc8WcbHTA"
            target="_blank"
            rel="noreferrer"
          >
            View Map
          </a>
        </motion.div>

        {/* Reception */}

        <motion.div
          className="detail-card"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: .2 }}
          viewport={{ once: true }}
        >
          <div className="icon">🍽</div>

          <h3>Reception</h3>

          <p>5:30 PM</p>

          <p>Grand Ballroom</p>

          <p>Dinner & Celebration</p>
        </motion.div>

        {/* Dress Code */}

        <motion.div
          className="detail-card"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: .4 }}
          viewport={{ once: true }}
        >
          <div className="icon">👔</div>

          <h3>Dress Code</h3>

          <div className="dress-group">

            <strong>Ladies</strong>

            <div className="colors">

              {
                ladyCodes.map((color, index) => (
                  <span
                    key={index}
                    className="color"
                    style={{ background: color?.code, border: color?.border || "none" }}
                  />
                ))
              }

            </div>

            <strong>Gentlemen</strong>

            <div className="colors">

              {
                guyCodes.map((color, index) => (
                  <span
                    key={index}
                    className="color"
                    style={{ background: color?.code, border: color?.border || "none" }}
                  />
                ))
              }

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}