import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { reservation: reservationId, reservedSeats, name, mail } = req.body;

  try {
    if (Object.keys(reservedSeats).length === 0) {
      throw new Error("Pusta rezerwacja!");
    }
    const client = await MongoClient.connect("mongoURL");

    const db = client.db();
    const reservationsCollection = db.collection("reservations");
    const reservationCursor = reservationsCollection.find({
      _id: reservationId,
    });

    const reservation = await reservationCursor.toArray();
    let seatsReservedDb = reservation[0].reservations;

    //sprawdzenie czy uzytkownik nie probuje zarezerwowac miejsc juz zajetych
    for (const row in reservedSeats) {
      for (const seat of reservedSeats[row]) {
        if (seatsReservedDb?.[row]?.includes(seat)) {
          throw new Error("Użytkownik próbuje zarezerwować zajęte miejsce!");
        }
      }
    }

    //zarezerowanie miejsc dla uzytkownika:
    for (const row in reservedSeats) {
      for (const seat of reservedSeats[row]) {
        if (seatsReservedDb?.[row]) {
          seatsReservedDb?.[row].push(seat);
        } else {
          seatsReservedDb = { ...seatsReservedDb, [row]: [seat] };
        }
      }
    }

    reservationsCollection.updateOne(
      {
        _id: reservationId,
      },
      {
        $set: { reservations: seatsReservedDb },
      }
    );
    //Zapisanie danych zamowienia w bazie
    let orderNum = Math.floor(1000 + Math.random() * 9000);

    const ordersCollection = db.collection("orders");
    let orderCursor = ordersCollection.find({ orderNum: orderNum });
    let orders = await orderCursor.toArray();
    //sprawdzenie czy dany numer zamowienia nie istnieje juz w bazie
    while (orders.length !== 0) {
      orderNum = Math.floor(1000 + Math.random() * 9000);
      orderCursor = ordersCollection.find({ orderNum: orderNum });
      orders = await orderCursor.toArray();
    }

    const order = {
      name,
      mail,
      orderNum,
      film: reservation[0].film,
      hour: reservation[0].hour,
      hall: reservation[0].hall,
      seats: reservedSeats,
    };

    ordersCollection.insertOne(order);

    //przekierowanie usera do podsumowania zamowienia
    res.status(200).json({ order });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      msg: "Coś poszło nie tak...",
    });
  }
}
