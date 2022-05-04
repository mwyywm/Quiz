import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prisma.quiz.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      questions: true,
    },
  });
  res.json(result);
}
