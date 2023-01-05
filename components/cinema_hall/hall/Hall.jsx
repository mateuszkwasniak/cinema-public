import { useEffect, useContext, useState } from "react";
import Row from "../row/Row";
import Link from "next/link";
import { useRouter } from "next/router";
import OrderForm from "../../order/OrderForm";
import classes from "./hall.module.scss";
import { OrderContext } from "../../../store/order-context";

import { motion } from "framer-motion";

const Hall = ({
  rowsCount,
  seatsCount,
  excludedSeats,
  film,
  hour,
  date,
  hall,
  reservations,
  reservationId,
}) => {
  const [selectedSeats, setSelectedSeats] = useState({});
  const [showReserveButton, setShowReserveButton] = useState(false);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { setOrder } = useContext(OrderContext);

  const rows = [];
  const resDate = date.toLocaleDateString("pl-PL");

  const reserveHandler = async () => {
    if (
      name === "" ||
      mail === "" ||
      !mail.includes("@") ||
      Object.keys(selectedSeats).length === 0
    )
      return;

    setLoading(true);
    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mail,
          reservation: reservationId,
          reservedSeats: selectedSeats,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg);
      } else {
        const data = await response.json();
        setOrder(data.order);
        setMail("");
        setName("");
        setSelectedSeats({});
        setLoading(false);
        router.replace("/summary");
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      Object.keys(selectedSeats).length !== 0 &&
      name !== "" &&
      mail !== "" &&
      mail.includes("@")
    ) {
      setShowReserveButton(true);
    } else {
      setShowReserveButton(false);
    }
  }, [selectedSeats, name, mail]);

  for (let i = 1; i <= rowsCount; i++) {
    rows.push(
      <div className={classes.rowWrapper} key={i}>
        <span>{i}</span>
        <Row
          seatsCount={seatsCount}
          id={i}
          excludedSeats={excludedSeats?.[i] || []}
          reservedSeats={reservations?.[i] || []}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        ></Row>
        <span>{i}</span>
      </div>
    );
  }

  return (
    <motion.div
      className={classes.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={classes.left}>
        <div className={classes.hall}>
          <div className={classes.screen}>
            <div className={classes.partA} />
            <div className={classes.partB} />
          </div>
          {rows}
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.legend}>
          <div className={classes.top}>
            <h3>{film}</h3>
            <h4>Sala: {hall}</h4>
            <p>Data: {resDate}</p>
            <p>Godzina: {hour}</p>
          </div>
          <div className={classes.mid}>
            <div className={classes.info}>
              <div style={{ backgroundColor: "green" }} />
              <p>Dostępne</p>
            </div>
            <div className={classes.info}>
              <div style={{ backgroundColor: "orange" }} />
              <p>Wybrane</p>
            </div>
            <div className={classes.info}>
              <div style={{ backgroundColor: "#777" }} />
              <p>Zarezerwowane</p>
            </div>
          </div>
          <div className={classes.bottom}>
            <OrderForm
              setName={setName}
              setMail={setMail}
              name={name}
              mail={mail}
            />
          </div>
          {showReserveButton && (
            <button className={classes.reserve} onClick={reserveHandler}>
              {loading ? (
                <motion.div
                  className={classes.spinner}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                />
              ) : (
                "Rezerwuj"
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Hall;
