import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic({ play }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    if (play) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [play]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.log("Unable to play music:", error);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    const nextMuted = !isMuted;

    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/music/wedding.mp3" type="audio/mpeg" />
      </audio>

      <div className="absolute left-1/2 top-1 z-50 flex w-[calc(100%-32px)] max-w-sm xl:max-w-lg -translate-x-1/2 items-center justify-between rounded-full border border-[#6B1F2B]/20 bg-[#FCF8F3]/95 px-3 py-2 shadow-[0_8px_30px_rgba(107,31,43,0.18)] backdrop-blur-md">
        {/* Music information */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Music disc */}
          <div
            className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C99A8A] bg-[#F0DED8] ${
              isPlaying ? "animate-[spin_6s_linear_infinite]" : ""
            }`}
          >
            {/* Inner ring */}
            <div className="absolute inset-1.25 rounded-full border border-[#6B1F2B]/20" />

            <Music2
              size={17}
              strokeWidth={1.5}
              className="text-[#6B1F2B]"
            />
          </div>

          {/* Song title */}
          <div className="min-w-0">
            <p className="truncate text-[12px] font-medium tracking-[0.12em] text-[#4A121C]">
              Our Wedding Song
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-[0.18em] text-[#8B3A46]">
                {isPlaying ? "Playing" : "Paused"}
              </span>

              {/* Sound animation */}
              {isPlaying && (
                <div className="flex h-3 items-end gap-0.5">
                  <span className="h-2 w-0.5 animate-pulse rounded-full bg-[#8B3A46]" />
                  <span className="h-3 w-0.5 animate-pulse rounded-full bg-[#8B3A46] [animation-delay:150ms]" />
                  <span className="h-1.5 w-0.5 animate-pulse rounded-full bg-[#8B3A46] [animation-delay:300ms]" />
                  <span className="h-2.5 w-0.5 animate-pulse rounded-full bg-[#8B3A46] [animation-delay:450ms]" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="ml-3 flex shrink-0 items-center gap-1">
          {/* Mute */}
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#6B1F2B] transition hover:bg-[#F0DED8]"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? (
              <VolumeX size={16} strokeWidth={1.5} />
            ) : (
              <Volume2 size={16} strokeWidth={1.5} />
            )}
          </button>

          {/* Play / pause */}
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B1F2B] text-[#FCF8F3] shadow-[0_4px_12px_rgba(107,31,43,0.25)] transition hover:scale-105 hover:bg-[#4A121C] active:scale-95"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause
                size={17}
                fill="currentColor"
                strokeWidth={1.5}
              />
            ) : (
              <Play
                size={17}
                fill="currentColor"
                strokeWidth={1.5}
                className="ml-0.5"
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
