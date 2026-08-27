import { motion } from "framer-motion";
import { Beer, BottleWine, Cake, Camera, Gamepad2, Gem, PartyPopper, Shirt, UsersRound, Utensils, Video } from "lucide-react";

const schedule = [
  {
    time: "5:00 PM",
    icon: <UsersRound size={32} color="#7A1E2C" className="mx-3" />,
    title: "Guest Arrival",
    desc: "Welcome drinks & registration",
  },
  {
    time: "5:30 PM",
    icon: <Gem size={32} color="#7A1E2C" className="mx-3" />,
    title: "Wedding Ceremony",
    desc: "Exchange of vows",
  },
  {
    time: "6:00 PM",
    icon: <Cake size={32} color="#7A1E2C" className="mx-3" />,
    title: "Cake Cutting",
    desc: "A sweet moment to celebrate",
  },
  {
    time: "6:15 PM",
    icon: <Utensils size={32} color="#7A1E2C" className="mx-3" />,
    title: "Dinner",
    desc: "Enjoy a delicious dinner together",
  },
  {
    time: "6:30 PM",
    icon: <Camera size={32} color="#7A1E2C" className="mx-3" />,
    title: "Photo Session",
    desc: "Capture memories with family & friends",
  },
  {
    time: "7:00 PM",
    icon: <Video size={32} color="#7A1E2C" className="mx-3" />,
    title: "Video Session",
    desc: "Creating beautiful memories together",
  },
  {
    time: "7:30 PM",
    icon: <Beer size={32} color="#7A1E2C" className="mx-3" />,
    title: "Break Time",
    desc: "Relax & have a break",
  },
  {
    time: "7:50 PM",
    icon: <Shirt size={32} color="#7A1E2C" className="mx-3" />,
    title: "Grand Entrance",
    desc: "A special entrance in our second look",
  },
  {
    time: "8:00 PM",
    icon: <BottleWine size={32} color="#7A1E2C" className="mx-3" />,
    title: "Champagne Toast",
    desc: "Raise a glass to love & happiness",
  },
  {
    time: "8:15 PM",
    icon: <UsersRound size={32} color="#7A1E2C" className="mx-3" />,
    title: "Guest Wishes",
    desc: "Warm wishes from family & friends",
  },
  {
    time: "8:30 PM",
    icon: <Gamepad2 size={32} color="#7A1E2C" className="mx-3" />,
    title: "Game Time",
    desc: "Fun games & joyful moments",
  },
  {
    time: "9:00 PM",
    icon: <PartyPopper size={32} color="#7A1E2C" className="mx-3" />,
    title: "Party Time",
    desc: "Let's celebrate together!",
  },
];

export default function Schedule() {
  return (
    <section className="schedule" id="schedule">

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Wedding Schedule
      </motion.h2>

      <motion.p
        className="schedule-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Friday • October 30, 2026
      </motion.p>

      <div className="schedule-timeline">

        {schedule.map((item, index) => (
          <motion.div
            key={item.time + item.title}
            className="schedule-item"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
            }}
          >

            <div className="schedule-time-label">
              {item.time}
            </div>

            <div className="schedule-icon">
              {item.icon}
            </div>

            <div className="schedule-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>

          </motion.div>
        ))}

      </div>

    </section>
  );
}
