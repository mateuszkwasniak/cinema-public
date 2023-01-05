import Image from "next/image";
import React from "react";
import classes from "./film.module.scss";
import { motion } from "framer-motion";

const Film = ({ details }) => {
  return (
    <motion.div
      className={classes.film}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Image
        width={1000}
        height={1000}
        src={details.poster2}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          opacity: 0.2,
          width: "100%",
          objectFit: "cover",
        }}
      ></Image>
      <div className={classes.details}>
        <h2 className={classes.title}>{details.title}</h2>
        <p className={classes.director}>
          <span>Reżyser: </span>
          {details.director}
        </p>
        <p className={classes.length}>
          <span>Czas: </span> {details.length} minut
        </p>
        <p className={classes.genre}>
          <span>Gatunek: </span> {details.genre.join(" | ")}
        </p>
        <p className={classes.stars}>
          <span>Aktorzy:</span> {details.stars.join(" | ")}
        </p>
        <p className={classes.description}>{details.description}</p>
      </div>
    </motion.div>
  );
};

export default Film;
