import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { id: "hero", label: "Home", icon: "🏠" },
  { id: "welcome", label: "Welcome", icon: "💌" },
  { id: "countdown", label: "Countdown", icon: "⏳" },
  { id: "story", label: "Our Story", icon: "💕" },
  { id: "details", label: "Details", icon: "💍" },
  { id: "gallery", label: "Gallery", icon: "📸" },
  { id: "schedule", label: "Schedule", icon: "🌸" },
  { id: "location", label: "Location", icon: "📍" },
  { id: "rsvp", label: "RSVP", icon: "💌" },
];

export default function FloatingNav({
  isSidebar,
  setIsSidebar,
}) {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setIsSidebar(false);
  };

  return (
    <div className="floating-nav">

      {/* Navigation */}
      <button
        type="button"
        className="floating-nav-trigger"
        onClick={() => setIsSidebar((prev) => !prev)}
        aria-label="Open navigation"
      >
        {isSidebar ? "×" : "☰"}
      </button>

      <AnimatePresence>
        {isSidebar && (
          <motion.div
            className="floating-nav-menu"
            initial={{
              opacity: 0,
              x: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: 20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="floating-nav-item"
                onClick={() => scrollToSection(item.id)}
              >
                <span className="floating-nav-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}