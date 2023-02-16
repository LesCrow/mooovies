import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type MovieProps = {
  id: string;
  title: string;
  director: {
    name: string;
  } | null;
  genre: {
    name: string;
  } | null;
  year: Date;
  seen: boolean;
};

const Movie: React.FC<{ movie: MovieProps }> = ({ movie }) => {
  const directorName = movie.director ? movie.director.name : "Unknown author";
  const releaseDateToDateFormat = new Date(movie.year);
  const releaseDate = movie.year
    ? releaseDateToDateFormat.getFullYear()
    : "Unknown date";

  return (
    <div
      className="p-6"
      onClick={() => Router.push("/p/[id]", `/p/${movie.id}`)}
    >
      <h2>{movie.title}</h2>
      <small>By {directorName}</small>
      <p>{releaseDate}</p>
      {/* <ReactMarkdown children={movie.title} /> */}
    </div>
  );
};

export default Movie;
