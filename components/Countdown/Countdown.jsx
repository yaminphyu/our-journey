import { useEffect, useState } from "react";

export default function Countdown() {
  const weddingDate = new Date("2026-10-30T17:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();

      const distance = weddingDate - now;

      if (distance <= 0) {
        clearInterval(timer);

        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),

        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        ),

        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        ),

        seconds: Math.floor(
          (distance % (1000 * 60)) / 1000
        ),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown">

      <h4 className="countdown-subtitle">
        Counting Down
      </h4>

      <h2 className="countdown-title">
        Until We Say "I Do"
      </h2>

      <div className="countdown-wrapper">

        <TimeCard value={timeLeft.days} label="Days" />

        <TimeCard value={timeLeft.hours} label="Hours" />

        <TimeCard value={timeLeft.minutes} label="Minutes" />

        <TimeCard value={timeLeft.seconds} label="Seconds" />

      </div>

    </section>
  );
}

function TimeCard({ value, label }) {
  return (
    <div className="time-card">

      <div className="time-number">
        {String(value).padStart(2, "0")}
      </div>

      <div className="time-label">
        {label}
      </div>

    </div>
  );
}