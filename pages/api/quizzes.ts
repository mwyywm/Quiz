import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// api/quizzes GET ALL Quizzes
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prisma.quiz.findMany({
    select: {
      title: true,
      description: true,
      questions: {
        select: {
          question: true,
        },
      },
    },
  });
  res.json(result);
}
