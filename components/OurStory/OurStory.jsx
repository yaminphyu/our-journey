import { motion } from "framer-motion";

const stories = [
  {
    year: "2022",
    title: "First Meeting",
    image: "/images/our_story/first-meeting.png",
    description:
      "Long, long ago, two souls met at 'Seoul K Noodle', just for a little meetup before a trip to Mandalay. Little did they know, how that distance would bring them closer, as that very trip gave them another excuse to meet again with souvenirs in hand",
  },
  {
    year: "2022",
    title: "First Date",
    image: "/images/our_story/first-date.png",
    description:
      "Not-so-long after, the boy introduced the girl to his pack. That night, at midnight to be precise, two hearts finally admitted what they already knew that 'They were in love'",
  },
  {
    year: "2025",
    title: "The Proposal",
    image: "/images/our_story/proposal.png",
    description:
      "In Da Lat, Vietnam, where the mountains meet the clouds and nature makes peace with serenity, two hearts tied their strings a little tighter, promising to keep them attached for eternity",
  },
  {
    year: "2026",
    title: "Our Pre-wedding",
    image: "/images/our_story/pre-wedding.png",
    description:
      "Another trip to Da Nang, Vietnam, became another landmark along the way, tying those strings tighter and almost the tightest. They kept their memories in photographs, just like Ed Sheeran",
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
        A quick walkthrough from 2022 to 2026.
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