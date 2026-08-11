import { useEffect, useRef } from "react";
import MusicButton from "./MusicButton";

export default function BackgroundMusic({ play }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (play) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [play]);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/music/wedding.mp3" type="audio/mpeg" />
      </audio>
      <MusicButton audioRef={audioRef} />
    </>
  );
}