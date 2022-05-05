import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET specific quiz by id

// TODO: we should not select correctAnswer. Change this later.
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
      questions: {
        select: {
          id: true,
          question: true,
          correctAnswer: true,
          answers: true,
        },
      },
    },
  });
  return res.json(result);
}
