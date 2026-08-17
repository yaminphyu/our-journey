
import { useState } from "react";
import { motion } from "framer-motion";

export default function RSVP() {
  const [form, setForm] = useState({
    name: "",
    guests: 1,
    message: "",
    attending: true,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", text: string }
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
 
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    setLoading(true);
    setStatus(null);
 
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
 
      const result = await response.json();
 
      if (!response.ok) {
        throw new Error(result.message);
      }
 
      setStatus({
        type: "success",
        text: "Thank you — your RSVP has been received.",
      });
 
      setForm({
        name: "",
        guests: 1,
        message: "",
        attending: true,
      });
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rsvp" id="rsvp">

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        RSVP
      </motion.h2>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: .2 }}
        viewport={{ once: true }}
      >
        We'd love to celebrate with you.
        Please let us know if you'll be joining us.
      </motion.p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select
          name="guests"
          value={form.guests}
          onChange={handleChange}
        >
          {[1,2,3,4,5].map(n => (
            <option key={n}>{n}</option>
          ))}
        </select>

        <textarea
          placeholder="Leave us a lovely message..."
          name="message"
          value={form.message}
          onChange={handleChange}
        />

        <label className="checkbox">

          <input
            type="checkbox"
            name="attending"
            checked={form.attending}
            onChange={handleChange}
          />

          I will be attending

        </label>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : "Confirm Attendance"}
        </button>

        {status && (
          <p
            className={status.type === "success" ? "success" : "error"}
          >
            {status.text}
          </p>
        )}

      </form>

    </section>
  );
}