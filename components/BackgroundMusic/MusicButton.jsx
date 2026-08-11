import { useState } from "react";

export default function MusicButton({
  audioRef,
}) {
  const [playing, setPlaying] = useState(true);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <button
      className="music-btn absolute"
      onClick={toggleMusic}
    >
      {playing ? "🎵" : "🔇"}
    </button>
  );
}