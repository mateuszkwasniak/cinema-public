import { useState, useEffect } from "react";
import Link from "next/link";
import classes from "./slider.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import img1 from "../../public/images/PFwide8.jpg";
import img3 from "../../public/images/LSTSBwide2.jpg";
import img2 from "../../public/images/LOBwide3.jpg";

const images = [
  { img: img1, title: "Pulp Fiction", filmId: "63ab2f7860f5f72b3f0c2a91" },
  { img: img2, title: "Żywot Briana", filmId: "63ab2f8a60f5f72b3f0c2a92" },
  { img: img3, title: "Porachunki", filmId: "63ab2f9460f5f72b3f0c2a93" },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = images.length;

  const goLeftHandler = () => {
    if (currentSlide === 0) {
      setCurrentSlide(images.length - 1);
    } else {
      setCurrentSlide((slide) => slide - 1);
    }
  };

  const goRightHandler = () => {
    if (currentSlide === slidesCount - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((slide) => slide + 1);
    }
  };

  useEffect(() => {
    const myTimeout = setTimeout(
      () => {
        goRightHandler();
      },

      5000
    );
    return () => {
      clearTimeout(myTimeout);
    };
  }, [currentSlide]);

  return (
    <motion.div
      className={classes.sliderContainer}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div className={classes.dots}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${classes.dot} ${
              currentSlide === index && classes.active
            }`}
          ></div>
        ))}
      </motion.div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className={`${classes.btn} ${classes.left}`}
        onClick={goLeftHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(245, 233, 201)"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className={`${classes.btn} ${classes.right}`}
        onClick={goRightHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(245, 233, 201)"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </motion.button>
      <motion.div
        onPanEnd={(_, info) => {
          if (info.delta.x > 0) goLeftHandler();
          else goRightHandler();
        }}
        className={classes.slides}
        style={{
          width: `${slidesCount * 100}vw`,
        }}
        animate={{
          x: `-${100 * currentSlide}vw`,
          transition: { type: "tween", duration: 0.8 },
        }}
        whileTap={{ cursor: "grabbing" }}
      >
        {images.map((img, index) => (
          <div className={classes.slide} key={index}>
            <div className={classes.imgWrapper}>
              <div className={classes.column}>
                <h2>{img.title}</h2>
                <motion.button
                  className={classes.ticket}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link href={{ pathname: "/rep", query: { id: img.filmId } }}>
                    KUP BILET
                  </Link>
                </motion.button>
              </div>
              <Image
                src={img.img}
                alt="poster"
                onPointerDown={(e) => e.preventDefault()}
              ></Image>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Slider;
