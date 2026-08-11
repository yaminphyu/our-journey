import { motion } from "framer-motion";

const schedule = [
  {
    time: "5:00 PM",
    icon: "🌸",
    title: "Guest Arrival",
    desc: "Welcome drinks & registration",
  },
  {
    time: "5:30 PM",
    icon: "💒",
    title: "Wedding Ceremony",
    desc: "Exchange of vows",
  },
  {
    time: "6:00 PM",
    icon: "📸",
    title: "Photo Session",
    desc: "Family & friends",
  },
  {
    time: "6:30 PM",
    icon: "🍽",
    title: "Dinner Reception",
    desc: "Dinner will be served",
  },
  {
    time: "7:00 PM",
    icon: "🎂",
    title: "Cake Cutting",
    desc: "Celebrate with us",
  },
  {
    time: "7:30 PM",
    icon: "💃",
    title: "First Dance",
    desc: "Our first dance together",
  },
  {
    time: "8:00 PM",
    icon: "🎉",
    title: "Party Time",
    desc: "Let's celebrate!",
  },
];

export default function Schedule() {
  return (
    <section className="schedule">

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

            {/* Time */}
            <div className="schedule-time-label">
              {item.time}
            </div>

            {/* Timeline Icon */}
            <div className="schedule-icon">
              {item.icon}
            </div>

            {/* Content */}
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

// import { motion } from "framer-motion";

// const schedule = [
//   {
//     time: "5:00 PM",
//     icon: "🌸",
//     title: "Guest Arrival",
//     desc: "Welcome drinks & registration",
//   },
//   {
//     time: "5:30 PM",
//     icon: "💒",
//     title: "Wedding Ceremony",
//     desc: "Exchange of vows",
//   },
//   {
//     time: "6:00 PM",
//     icon: "📸",
//     title: "Photo Session",
//     desc: "Family & friends",
//   },
//   {
//     time: "6:30 PM",
//     icon: "🍽",
//     title: "Dinner Reception",
//     desc: "Dinner will be served",
//   },
//   {
//     time: "7:00 PM",
//     icon: "🎂",
//     title: "Cake Cutting",
//     desc: "Celebrate with us",
//   },
//   {
//     time: "7:30 PM",
//     icon: "💃",
//     title: "First Dance",
//     desc: "Our first dance together",
//   },
//   {
//     time: "8:00 PM",
//     icon: "🎉",
//     title: "Party Time",
//     desc: "Let's celebrate!",
//   },
// ];

// export default function Schedule() {
//   return (
//     <section className="schedule">

//       <h2>Wedding Schedule</h2>

//       <p className="subtitle">
//         Friday • October 30, 2026
//       </p>

//       <div className="schedule-time">

//         {schedule.map((item, index) => (
//           <motion.div
//             key={index}
//             className="schedule-item"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{
//               delay: index * 0.15,
//             }}
//           >
//             <div className="schedule-time">
//               {item.time}
//             </div>

//             <div className="schedule-icon">
//               {item.icon}
//             </div>

//             <div className="schedule-content">
//               <h3>{item.title}</h3>
//               <p>{item.desc}</p>
//             </div>
//           </motion.div>
//         ))}

//       </div>
//     </section>
//   );
// }