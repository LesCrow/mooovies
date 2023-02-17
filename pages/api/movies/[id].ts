import { METHODS } from "http";
import { NextApiResponse, NextApiRequest } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const movie = await prisma.movie.findUniqueOrThrow({
          where: {
            id: id as string,
          },
        });
        res.status(200).json(movie);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
      break;

    case "PUT":
      try {
        const { title, directorId, genreId, seen, year } = req.body;
        const updatedMovie = await prisma.movie.update({
          where: {
            id: id as string,
          },
          data: {
            title: title,
            directorId: directorId,
            genreId: genreId,
            seen: seen,
            year: year,
          },
        });
        res.status(200).json(updatedMovie);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
      break;

    case "DELETE":
      try {
        const deletedMovie = await prisma.movie.delete({
          where: {
            id: id as string,
          },
        });
        res.status(200).json(deletedMovie);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
