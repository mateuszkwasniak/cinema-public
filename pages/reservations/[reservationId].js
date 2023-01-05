import Hall from "../../components/cinema_hall/hall/Hall";
import { MongoClient } from "mongodb";
import React from "react";

const ReservationPage = ({ reservation }) => {
  console.log(reservation);

  return (
    <>
      <Hall
        key={reservation._id}
        rowsCount={reservation.rows}
        seatsCount={reservation.seats}
        excludedSeats={reservation.excluded}
        film={reservation.film}
        hour={reservation.hour}
        hall={reservation.hall}
        reservationId={reservation._id}
        reservations={reservation.reservations}
        date={new Date()}
      />
    </>
  );
};

export default ReservationPage;

export async function getServerSideProps(context) {
  const { reservationId } = context.params;

  try {
    const client = await MongoClient.connect("mongoURL");

    const db = client.db();
    const reservationsCollection = db.collection("reservations");
    const reservationCursor = reservationsCollection.find({
      _id: reservationId,
    });

    const reservation = await reservationCursor.toArray();

    return {
      props: {
        reservation: reservation[0],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
