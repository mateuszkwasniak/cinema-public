import Repertoire from "../components/repertoire/Repertoire";
import { MongoClient } from "mongodb";

const RepertoirePage = ({ repertoire }) => {
  return <Repertoire repertoire={repertoire} />;
};

export default RepertoirePage;

export async function getStaticProps() {
  let client;
  try {
    client = await MongoClient.connect("mongoURL");

    const db = client.db();

    const mondayCollection = db.collection("monday");
    const cursor = mondayCollection.aggregate([
      {
        $lookup: {
          from: "films",
          localField: "filmId",
          foreignField: "_id",
          as: "rep_films",
        },
      },
    ]);

    const repertoire = await cursor.toArray();

    return {
      props: {
        repertoire,
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      notFound: true,
    };
  }
}
