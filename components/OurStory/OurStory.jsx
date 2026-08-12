import { motion } from "framer-motion";

const stories = [
  {
    year: "2022",
    title: "First Meeting",
    image: "/images/our_story/first-meeting.png",
    description:
      "Sometimes the most beautiful stories begin when you least expect them. Our paths crossed, and a simple hello became the start of something extraordinary.",
  },
  {
    year: "2022",
    title: "First Date",
    image: "/images/our_story/first-date.png",
    description:
      "Our first date was filled with laughter, long conversations, and a feeling that we had known each other forever.",
  },
  {
    year: "2025",
    title: "The Proposal",
    image: "/images/our_story/proposal.png",
    description:
      "One unforgettable moment, one heartfelt question, and one joyful 'Yes!' marked the beginning of our forever.",
  },
  {
    year: "2026",
    title: "Our Pre-wedding",
    image: "/images/our_story/pre-wedding.png",
    description:
      "Now we can't wait to celebrate the next chapter of our journey with the people we love most.",
  },
];

export default function OurStory() {
  return (
    <section className="story" id="story">

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Our Story
      </motion.h2>

      <motion.p
        className="story-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: .2 }}
        viewport={{ once: true }}
      >
        Every love story is beautiful,
        but ours is our favorite.
      </motion.p>

      <div className="timeline">

        {stories.map((story, index) => (
          <motion.div
            key={story.title}
            className={`timeline-item ${
              index % 2 === 0 ? "left" : "right"
            }`}
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -80 : 80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: .8,
            }}
          >

            <div className="timeline-image">
              <img src={story.image} alt={story.title} />
            </div>

            <div className="timeline-content">

              <span>{story.year}</span>

              <h3>{story.title}</h3>

              <p>{story.description}</p>

            </div>
          </motion.div>
        ))}

      </div>

    </section>
  );
}