import { useState, useEffect, createRef } from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "./repertoire.module.scss";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Repertoire = ({ repertoire }) => {
  const [date, setDate] = useState(new Date());
  const router = useRouter();

  let filmRefs = {};
  repertoire?.forEach((el) => {
    filmRefs = { ...filmRefs, [el.filmId]: createRef() };
  });

  useEffect(() => {
    const filmId = router?.query.id;
    filmRefs[`${filmId}`]?.current?.scrollIntoView();
  }, [filmRefs, router.query]);

  return (
    <motion.div
      className={classes.repertoire}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1>
        Repertuar w dniu: &nbsp;
        <span className={classes.date}>
          {date.toLocaleDateString("pl-PL", { weekday: "long" }).toUpperCase()}
        </span>
        &nbsp;-
        <span className={classes.date}>
          &nbsp;{date.toLocaleDateString("pl-PL")}
        </span>
      </h1>

      {repertoire?.map((film, index) => (
        <div
          className={classes.film}
          key={film._id}
          id={index}
          ref={filmRefs[film.filmId]}
        >
          <Link href={`/films/${film.rep_films[0]._id}`}>
            <Image
              src={film.rep_films[0].poster}
              alt="poster"
              width={"350"}
              height={"500"}
            ></Image>
          </Link>
          <div className={classes.column}>
            <h3>{film.rep_films[0].title}</h3>
            <div className={classes.genre}>
              {film.rep_films[0].genre.map((gen) => (
                <span>{gen}</span>
              ))}
            </div>
            <span className={classes.director}>
              {film.rep_films[0].director}
            </span>
            <div className={classes.hours}>
              {film.hours.map((hour, index) => (
                <Link
                  key={index}
                  className={classes.hour}
                  href={`/reservations/${hour[1]}`}
                >
                  {hour[0]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default Repertoire;
