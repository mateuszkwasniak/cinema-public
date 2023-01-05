import React from "react";
import Film from "../../components/film/Film";
import { MongoClient } from "mongodb";

const FilmPage = ({ details }) => {
  return <Film details={details} />;
};

export default FilmPage;

export async function getStaticProps(context) {
  const {
    params: { filmId },
  } = context;

  try {
    const client = await MongoClient.connect("mongoURL");

    const db = client.db();
    const filmsCollection = db.collection("films");
    const filmCursor = filmsCollection.find({ _id: filmId });
    const details = await filmCursor.toArray();

    return {
      props: {
        details: details[0],
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const client = await MongoClient.connect("mongoURL");
    const db = client.db();
    const filmsCollection = db.collection("films");
    const filmCursor = filmsCollection.find({});
    const films = await filmCursor.toArray();
    const filmIds = films.map((film) => {
      return { params: { filmId: film._id } };
    });

    return {
      paths: filmIds,
      fallback: false,
    };
  } catch (error) {
    console.log(error.message);
    return {
      paths: [],
      fallback: false,
    };
  }
}
