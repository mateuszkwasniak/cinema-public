import React from "react";
import classes from "./navigation.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";

const Navigation = () => {
  const navVariants = {
    init: { y: -100 },
    final: {
      y: 0,
      transition: {
        type: "tween",
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const childrenVariants = {
    init: { opacity: 0, scale: 1 },
    final: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className={classes.navigation}
      variants={navVariants}
      initial="init"
      animate="final"
    >
      <motion.div className={classes.logo} variants={childrenVariants}>
        <Link href="/">
          <p>
            CINEMA
            <br />
            TOWN
          </p>
        </Link>
      </motion.div>
      <nav>
        <ul>
          <motion.li
            variants={childrenVariants}
            whileHover={{ scale: [1, 1.05, 1], transition: { duration: 0.4 } }}
          >
            <Link href="/rep">Repertuar</Link>
          </motion.li>
          <motion.li
            variants={childrenVariants}
            whileHover={{ scale: [1, 1.05, 1], transition: { duration: 0.4 } }}
          >
            <Link href="/films">Oferty</Link>
          </motion.li>
          <motion.li
            variants={childrenVariants}
            whileHover={{ scale: [1, 1.05, 1], transition: { duration: 0.4 } }}
          >
            <Link href="/films">Kontakt</Link>
          </motion.li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default Navigation;
