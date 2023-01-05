import React from "react";
import classes from "./footer.module.scss";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      className={classes.footer}
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      transition={{ type: "tween" }}
    >
      <div className={classes.top}>
        <div className={classes.column}>
          <h3>O NAS</h3>
          <p>Cinema Town Poland</p>
          <p>Pracuj z nami</p>
          <p>Kontakt</p>
        </div>
        <div className={classes.column}>
          <h3>LINKI</h3>
          <p>Global Town Holdings</p>
          <p>Reklama w kinie</p>
          <p>Forum</p>
        </div>
        <div className={classes.column}>
          <h3>INFORMACJE</h3>
          <p>Regulacje</p>
          <p>Polityka prywatności</p>
          <p>Polityka cookies</p>
        </div>
        <div className={classes.column}>
          <h3>OBSERWUJ NAS</h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Tweeter</p>
        </div>
      </div>
      <div className={classes.bottom}>
        <p>Wszystkie prawa zastrzeżone Cinema Town 2022 &copy;</p>
      </div>
    </motion.div>
  );
};

export default Footer;
