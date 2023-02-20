import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const movies = await prisma.movie.findMany();
        res.status(200).json(movies);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
      break;

    case "POST":
      try {
        const { api_id, toWatch, favourite } = req.body;

        const newBook = await prisma.movie.create({
          data: {
            api_id: api_id,
            toWatch: toWatch,
            favourite: favourite,
          },
        });
        res.status(200).json(newBook);
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
