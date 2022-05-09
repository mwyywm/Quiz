import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { slug, id } = req.query;
  const result = await prisma.quiz.findUnique({
    where: {
      slug: slug as string,
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
