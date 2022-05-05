import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prisma.question.findMany({
    select: {
      id: true,
      quiz: true,
      question: true,
      correctAnswer: true,
      answers: true,
    },
  });
  res.json(result);
}
