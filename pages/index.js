import BackgroundMusic from "@/components/BackgroundMusic/BackgroundMusic";
import Countdown from "@/components/Countdown/Countdown";
import FloatingNav from "@/components/FloatingNav/FloatingNav";
import Hero from "@/components/Hero/ Hero";
import OurStory from "@/components/OurStory/OurStory";
import RSVP from "@/components/RSVP/RSVP";
import Schedule from "@/components/Schedule/Schedule";
import ThankYou from "@/components/ThankYou/ThankYou";
import WeddingDetails from "@/components/WeddingDetails/WeddingDetails";
import Welcome from "@/components/Welcome/Welcome";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Gallery from "@/components/Gallery";

export default function Home({
  guestName = "guest",
  partnerName = "",
  isOpen = false,
}) {
  const [isSidebar, setIsSidebar] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsSidebar(false);
  };

  return (
    <main className="relative mx-auto w-full max-w-lg xl:max-w-xl bg-[#FCF8F3]">
      <div className="fixed top-0 left-0 z-50 w-full h-auto bg-amber-300">
        <BackgroundMusic play={isOpen} />
      </div>
      <div className="relative w-full">
        <Hero />
        <Welcome guestName={guestName} partnerName={partnerName} />
        <Countdown />
        <OurStory />
        <WeddingDetails />
        <Gallery />
        <Schedule />
        <RSVP />
        <ThankYou />

        <FloatingNav isSidebar={isSidebar} setIsSidebar={setIsSidebar} />

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              className="scroll-top-button"
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}