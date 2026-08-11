import BackgroundMusic from "@/components/BackgroundMusic/BackgroundMusic";
import Countdown from "@/components/Countdown/Countdown";
import Hero from "@/components/Hero/ Hero";
import OurStory from "@/components/OurStory/OurStory";
import RSVP from "@/components/RSVP/RSVP";
import Schedule from "@/components/Schedule/Schedule";
import ThankYou from "@/components/ThankYou/ThankYou";
import WeddingDetails from "@/components/WeddingDetails/WeddingDetails";
import Welcome from "@/components/Welcome/Welcome";

export default function Home({
  guestName = "guest",
  partnerName = "",
  isOpen = false,
}) {
  return (
    <main className="mx-auto w-full max-w-lg xl:max-w-xl bg-[#FCF8F3]">
      {/* <BackgroundMusic play={isOpen} /> */}
      <Hero />
      <Welcome guestName={guestName} partnerName={partnerName} />
      <Countdown />
      <OurStory />
      <WeddingDetails />
      <Schedule />
      <RSVP />
      <ThankYou />
    </main>
  );
}