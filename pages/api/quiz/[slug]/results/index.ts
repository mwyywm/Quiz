import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  const result = await prisma?.quiz.findUnique({
    where: {
      slug: slug as string,
    },
    select: {
      id: true,
      title: true,
      results: {
        select: {
          id: true,
          score: true,
          total: true,
        },
      },
    },
  });

  return res.json(result);
}
