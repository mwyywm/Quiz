import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import slugify from "../../utils/slugify";

// /api/newquiz POST - Create a new quiz
export default async function quizHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  if (req.method === "POST") {
    try {
      const result = await prisma.quiz.create({
        data: {
          title: body.title,
          slug: slugify(body.title),
          description: body.description,
          questions: {
            createMany: {
              data: body.questions, // array of objects holding questions{question, correctAnswer, answers (array of answers)}
            },
          },
        },
      });
      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(405).end("Only POST requests are allowed");
  }
}
