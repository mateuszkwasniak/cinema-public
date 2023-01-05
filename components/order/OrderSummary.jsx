import Image from "next/image";
import { useContext } from "react";
import { OrderContext } from "../../store/order-context";
import classes from "./ordersummary.module.scss";

import { motion } from "framer-motion";

import summaryImg from "../../public/images/summary.jpg";

const OrderSummary = () => {
  const { order } = useContext(OrderContext);

  const orderVariants = {
    init: { opacity: 0 },
    final: {
      opacity: 1,
      transition: {
        duration: 1,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      className={classes.orderSummary}
      variants={orderVariants}
      initial="init"
      animate="final"
    >
      <motion.h2 variants={orderVariants}>
        Twoja rezerwacja przebiegła pomyślnie {order.name}.{" "}
      </motion.h2>
      <motion.p variants={orderVariants}>
        Numer rezerwacji to: &nbsp;
        <span>{order.orderNum}</span>
      </motion.p>
      <motion.h3 variants={orderVariants}>Szczegóły rezerwacji:</motion.h3>
      <motion.article variants={orderVariants}>
        Film: {order.film} <br /> Data: {new Date().toLocaleDateString("pl-PL")}
        <br />
        Godzina: {order.hour}
        <br />
        Sala: {order.hall}
        <br />
        {order?.seats &&
          Object.entries(order.seats).map((seat) => {
            return (
              <>
                <span>
                  Rząd: {seat[0]} Miejsce: {seat[1].join(", ")}
                </span>
                <br />
              </>
            );
          })}
      </motion.article>
      <motion.p variants={orderVariants} className={classes.info}>
        Prosimy o odbiór biletów w kasach lub automatach, maksymalnie 15 minut
        przed seansem, podając numer rezerwacji.
      </motion.p>
      <Image src={summaryImg} alt="cinema"></Image>
    </motion.div>
  );
};

export default OrderSummary;
