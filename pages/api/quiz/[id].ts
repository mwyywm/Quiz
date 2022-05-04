import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// get specific quiz
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const result = await prisma.quiz.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      title: true,
      description: true,
      questions: true,
    },
  });
  return res.json(result);
}
