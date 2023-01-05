import React from "react";
import classes from "./orderform.module.scss";

const OrderForm = ({ setMail, setName, name, mail }) => {
  return (
    <div className={classes.order}>
      <form>
        <div className={classes.wrapper}>
          <label htmlFor="name">Imię</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
          ></input>
        </div>
        <div className={classes.wrapper}>
          <label htmlFor="email">Adres email</label>
          <input
            type="mail"
            id="email"
            value={mail}
            onChange={(e) => setMail(e.target.value.trim())}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
