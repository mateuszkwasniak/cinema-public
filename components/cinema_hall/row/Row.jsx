import classes from "./row.module.scss";

const Row = ({
  seatsCount,
  excludedSeats,
  id,
  setSelectedSeats,
  selectedSeats,
  reservedSeats,
}) => {
  let seatNumber = 1;
  const seats = [];

  const selectSeatHandler = (seatNum) => {
    console.log("Seat " + seatNum + " Row " + id + " selected");

    if (selectedSeats?.[id]?.includes(seatNum)) {
      setSelectedSeats((prev) => {
        let selected = { ...prev };
        if (selected[id].length === 1) {
          delete selected[id];
        } else {
          selected[id] = selected[id].filter((seat) => seat !== seatNum);
        }
        return selected;
      });
    } else {
      setSelectedSeats((prev) => {
        let selected = { ...prev };
        if (selected?.[id]) {
          selected[id].push(seatNum);
        } else {
          selected = { ...selected, [id]: [seatNum] };
        }

        return selected;
      });
    }
  };

  for (let i = seatNumber; i <= seatsCount; i++) {
    const seatNum = seatNumber;
    if (excludedSeats.includes(i)) {
      seats.push(<div className={classes.excludedSeat} key={i} />);
    } else if (reservedSeats?.includes(seatNum)) {
      seats.push(
        <div className={classes.reservedSeat} key={i}>
          {seatNum}
        </div>
      );
      seatNumber++;
    } else {
      seats.push(
        <div
          className={`${classes.validSeat} ${
            selectedSeats?.[id]?.includes(seatNum) && classes.selectedSeat
          }`}
          onClick={() => {
            selectSeatHandler(seatNum);
          }}
          key={i}
        >
          {seatNum}
        </div>
      );
      seatNumber++;
    }
  }

  return <div className={classes.row}>{seats}</div>;
};

export default Row;
